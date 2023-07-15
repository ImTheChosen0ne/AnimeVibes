from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text


def seed_messages():
    for message in [
        {
            "chatId": 1,
            "userId": 1,
            "message": "Hey!!"
        },
            {
            "chatId": 1,
            "userId": 2,
            "message": "Whats going on?"
        },
            {
            "chatId": 1,
            "userId": 1,
            "message": "Not much just scrolling through AnimeVibes"
        },
            {
            "chatId": 1,
            "userId": 2,
            "message": "It's one sweet app!"
        },
            {
            "chatId": 2,
            "userId": 1,
            "message": "Whats going on!?"
        },
            {
            "chatId": 2,
            "userId": 1,
            "message": "Hellooooo"
        },
            {
            "chatId": 2,
            "userId": 1,
            "message": "Im sad youre not answering"
        },
            {
            "chatId": 3,
            "userId": 4,
            "message": "hi!"
        },
        {
            "chatId": 3,
            "userId": 1,
            "message": "Hey, what ya doing here?"
        },
        {
            "chatId": 3,
            "userId": 4,
            "message": "Looking at some cool vids!"
        },
        {
            "chatId": 3,
            "userId": 1,
            "message": "Ahh same here!"
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
