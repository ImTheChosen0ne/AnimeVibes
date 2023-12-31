from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class CommentReply(db.Model):
    __tablename__ = "comment_reply"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    commentId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('comments.id')), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    comment = db.Column(db.String(100), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    comment_reply = db.relationship("Comment", back_populates="comment_reply")
    user_comment_reply = db.relationship("User", back_populates="comment_reply")

    def formatted_updatedAt(self):
        return self.updatedAt.strftime('%B-%d')

    def formatted_createdAt(self):
        return self.createdAt.strftime('%B-%d')

    def to_dict(self):
        return {
            "id": self.id,
            "commentId": self.commentId,
            "userId": self.userId,
            "comment": self.comment,
            "createdAt": self.formatted_createdAt(),
            "updatedAt": self.formatted_updatedAt()
       }
