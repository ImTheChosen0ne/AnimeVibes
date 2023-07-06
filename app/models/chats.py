from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Chat(db.Model):
    __tablename__ = 'chats'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    messages = db.relationship("Message",back_populates="chat", cascade="delete-orphan, all")
    chat_members = db.relationship("ChatMember", back_populates="chat", cascade="delete-orphan, all")

    def to_dict(self):
        return {
            "id": self.id,
            "chatMembers": [member.to_dict() for member in self.chat_members],
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt
        }
