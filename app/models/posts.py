from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    caption = db.Column(db.String(255), nullable=False)
    video = db.Column(db.String, nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship("User", back_populates="posts")
    comments = db.relationship("Comment", back_populates="post", cascade="all, delete-orphan")

    post_favorites = db.relationship(
        "User",
        secondary='favorites',
        back_populates="user_favorites",
    )

    post_likes = db.relationship(
        "User",
        secondary='likes',
        back_populates="user_likes",
    )

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "caption": self.caption,
            "video": self.video,
            "user": self.user.to_dict(),
            "comments": [comment.to_dict() for comment in self.comments],
            # "likes": self.post_likes,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt
       }

    def to_dict_favorites(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "video": self.video,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt
       }

    def to_dict_likes(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "video": self.video,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt
       }
