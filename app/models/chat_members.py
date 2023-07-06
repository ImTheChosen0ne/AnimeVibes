from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class ChatMember(db.Model):
    __tablename__ = 'chat_members'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    chatId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('chats.id')), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    chat = db.relationship("Chat", back_populates="chat_members")
    user = db.relationship("User", back_populates="chat_members")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'chatId': self.chatId,
            'username': self.user.username,
            'profile_pic': self.user.profile_pic,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
