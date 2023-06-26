from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():

    comment1 = Comment(
        userId=1,
        postId=1,
        comment="This show was one of my favorites!",
    )
    comment2 = Comment(
        userId=2,
        postId=2,
        comment="Never seen it but I want to start it!",
    )
    comment3 = Comment(
        userId=3,
        postId=3,
        comment="This is one of my top 3 anime!",
    )
    comment4 = Comment(
        userId=4,
        postId=4,
        comment="This show looks pretty sweet I must say.",
    )
    comment5 = Comment(
        userId=5,
        postId=5,
        comment="Loves this show. I could watch this over and over.",
    )
    comment6 = Comment(
        userId=6,
        postId=3,
        comment="This show goes crazy!",
    )
    comment7 = Comment(
        userId=7,
        postId=7,
        comment="Some of these fight scenes go hard in this.",
    )
    comment8 = Comment(
        userId=8,
        postId=9,
        comment="Can't beat this show!",
    )
    comment9 = Comment(
        userId=9,
        postId=12,
        comment="Never seen this but this video makes me want to watch.",
    )
    comment10 = Comment(
        userId=10,
        postId=15,
        comment="Nothing here beats Demon Slayer",
    )
    comment11 = Comment(
        userId=11,
        postId=13,
        comment="Naruto nine tails had a crazy rage mode.",
    )
    comment12 = Comment(
        userId=12,
        postId=8,
        comment="One piece is a good one but I don't know if its #1",
    )
    comment13 = Comment(
        userId=1,
        postId=2,
        comment="Beast is the hardest one!",
    )
    comment14 = Comment(
        userId=2,
        postId=14,
        comment="Here is a classic. I love it!",
    )
    comment15 = Comment(
        userId=3,
        postId=10,
        comment="This is far one of the best. I've just recently watched",
    )
    comment16 = Comment(
        userId=4,
        postId=1,
        comment="This season was the best season so far.",
    )
    comment17 = Comment(
        userId=5,
        postId=11,
        comment="I could use some of that food right now",
    )
    comment18 = Comment(
        userId=6,
        postId=5,
        comment="Love this! Enjoy your content!",
    )
    comment19 = Comment(
        userId=7,
        postId=14,
        comment="This is all I watched as a child.",
    )
    comment20 = Comment(
        userId=8,
        postId=5,
        comment="Nothing beats Naruto!",
    )


    all_comments = [comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8, comment9, comment10, comment11, comment12, comment13, comment14, comment15, comment16, comment17, comment18, comment19, comment20 ]
    _ = [db.session.add(comment) for comment in all_comments]
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
    db.session.commit()
