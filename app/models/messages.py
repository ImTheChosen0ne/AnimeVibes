from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    chatId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('chats.id')), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    message = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    chat = db.relationship("Chat", back_populates="messages")
    user = db.relationship("User", back_populates="messages")

    def to_dict(self):
        return {
            'id': self.id,
            'chatId': self.chatId,
            'userId': self.userId,
            'message': self.message,
            # "user": self.user.to_dict(),
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
