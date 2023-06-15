from app.models import db, CommentReply, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comment_relpies():

    comment1 = CommentReply(
        userId=1,
        commentId=1,
        comment="Im with you! This is a good one",
    )
    comment2 = CommentReply(
        userId=1,
        commentId=2,
        comment="You definitly need ot get on this!",
    )
    comment3 = CommentReply(
        userId=2,
        commentId=3,
        comment="This better be your number 1!",
    )
    comment4 = CommentReply(
        userId=3,
        commentId=4,
        comment="Absolutely a great anime to watch",
    )
    comment5 = CommentReply(
        userId=3,
        commentId=5,
        comment="Im right there with you on this.",
    )

    all_comments = [comment1, comment2, comment3, comment4, comment5 ]
    _ = [db.session.add(comment) for comment in all_comments]
    db.session.commit()

def undo_comment_replies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comment_reply RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comment_reply"))
    db.session.commit()
