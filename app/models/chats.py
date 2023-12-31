from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Chat(db.Model):
    __tablename__ = 'chats'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())

    messages = db.relationship("Message",back_populates="chat", cascade="delete-orphan, all")
    chat_members = db.relationship("ChatMember", back_populates="chat", cascade="delete-orphan, all")

    def formatted_updatedAt(self):
        return self.updatedAt.strftime('%-m/%-d/%Y')

    def formatted_createdAt(self):
        return self.createdAt.strftime('%-m/%-d/%Y')

    def to_dict(self):
        return {
            "id": self.id,
            "chatMembers": [member.to_dict() for member in self.chat_members],
            "createdAt": self.formatted_createdAt(),
            "updatedAt": self.formatted_updatedAt()
        }
