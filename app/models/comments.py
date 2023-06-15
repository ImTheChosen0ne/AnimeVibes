from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment(db.Model):
    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    postId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    comment = db.Column(db.String(1000), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship("User", back_populates="comments")
    post = db.relationship("Post", back_populates="comments")
    comment_reply = db.relationship("CommentReply", back_populates="comment_reply", cascade="all, delete-orphan")


    def formatted_updatedAt(self):
        return self.updatedAt.strftime('%B-%d')

    def formatted_createdAt(self):
        return self.createdAt.strftime('%B-%d')

    def to_dict(self):
        return {
            "id": self.id,
            "postId": self.postId,
            "userId": self.userId,
            "user": self.user.to_dict_comment_user(),
            "comment": self.comment,
            "commentReply": [comment.to_dict() for comment in self.comment_reply],
            "createdAt": self.formatted_createdAt(),
            "updatedAt": self.formatted_updatedAt()
       }
