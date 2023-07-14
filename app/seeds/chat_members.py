from app.models import db, ChatMember, environment, SCHEMA
from sqlalchemy.sql import text


def seed_chat_members():
    for conversationUsers in [
        {
            "chatId":1,
            "userId":1
        },
         {
            "chatId":1,
            "userId":2
        },
         {
            "chatId":2,
            "userId":1
        },
         {
            "chatId":2,
            "userId":3
        },
         {
            "chatId":3,
            "userId":1
        },
         {
            "chatId":3,
            "userId":4
        },
         {
            "chatId":4,
            "userId":2
        },
         {
            "chatId":4,
            "userId":3
        },
         {
            "chatId":5,
            "userId":2
        },
         {
            "chatId":5,
            "userId":4
        },

    ]:
        db.session.add(ChatMember(**conversationUsers))
    db.session.commit()

def undo_chat_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.chat_members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM chat_members"))

    db.session.commit()
