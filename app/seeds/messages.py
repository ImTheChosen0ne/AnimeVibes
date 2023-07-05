from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text


def seed_messages():
    for message in [
        {
            "chatId": 1,
            "userId": 1,
            "message": "Testing testing"
        },
            {
            "chatId": 1,
            "userId": 2,
            "message": "yes yes I hear you"
        },
            {
            "chatId": 1,
            "userId": 1,
            "message": "are you sure though"
        },
            {
            "chatId": 1,
            "userId": 2,
            "message": "uh yes very sure"
        },
            {
            "chatId": 2,
            "userId": 1,
            "message": "sup stranger"
        },
            {
            "chatId": 2,
            "userId": 1,
            "message": "are you leaving me on read?"
        },
            {
            "chatId": 2,
            "userId": 1,
            "message": ":("
        },
            {
            "chatId": 3,
            "userId": 4,
            "message": "hi best friend"
        },
        {
            "chatId": 3,
            "userId": 1,
            "message": "best friend??"
        },
        {
            "chatId": 3,
            "userId": 4,
            "message": "too forward?"
        },
        {
            "chatId": 3,
            "userId": 1,
            "message": "oof"
        },
    ]:
        db.session.add(Message(**message))
    db.session.commit()

def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))

    db.session.commit()
