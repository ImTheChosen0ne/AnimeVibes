from app.models import Chat, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_chats():
    for chat in [
        {},
        {},
        {},
        {},
        {}
    ]:
        db.session.add(Chat(**chat))
    db.session.commit()

def undo_chats():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.chats RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM chatss"))

    db.session.commit()
