from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():

    comment1 = Comment(
        userId=1,
        postId=1,
        comment="This show was one of my favorites!",
    )
    comment2 = Comment(
        userId=1,
        postId=2,
        comment="Never seen it but I want to start it!",
    )
    comment3 = Comment(
        userId=2,
        postId=3,
        comment="This is one of my top 3 anime!",
    )
    comment4 = Comment(
        userId=3,
        postId=4,
        comment="This show looks pretty sweet I must say.",
    )
    comment5 = Comment(
        userId=3,
        postId=5,
        comment="Loves this show. I could watch this over and over.",
    )

    all_comments = [comment1, comment2, comment3, comment4, comment5 ]
    _ = [db.session.add(comment) for comment in all_comments]
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
    db.session.commit()
