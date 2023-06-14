from app.models import db, Post, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():

    user = User.query.get(1)

    post1 = Post(
        userId=1,
        caption="Just finished watching the latest episode of My Hero Academia! The action scenes were mind-blowing. Can't wait for the next one! #anime #MyHeroAcademia",
        video="https://res.cloudinary.com/dtsmhx07q/video/upload/v1686714352/Video_4_dxlpb0.mov"
    )
    post2 = Post(
        userId=1,
        caption="Throwback to one of my all-time favorite anime series, Attack on Titan! The storyline and character development are simply incredible. #anime #AttackOnTitan",
        video="https://res.cloudinary.com/dtsmhx07q/video/upload/v1686714351/Video_3_iegkos.mov"
    )
    post3 = Post(
        userId=2,
        caption="Just started watching Demon Slayer, and I'm already hooked! The animation and fight sequences are stunning. Highly recommend it! #anime #DemonSlayer",
        video="https://res.cloudinary.com/dtsmhx07q/video/upload/v1686714351/Video_2_gpq9hh.mov"
    )
    post4 = Post(
        userId=3,
        caption="Recently discovered One Punch Man, and it's hilarious! Saitama's overpowered character and deadpan humor make it a must-watch. #anime #OnePunchMan",
        video="https://res.cloudinary.com/dtsmhx07q/video/upload/v1686714351/Video_1_s9gzxb.mov"
    )
    post5 = Post(
        userId=3,
        caption="Just binged the entire season of Jujutsu Kaisen, and it blew my mind! The animation, characters, and supernatural elements are top-notch. #anime #JujutsuKaisen",
        video="https://res.cloudinary.com/dtsmhx07q/video/upload/v1686714351/Video_ntblmx.mov"
    )

    all_posts = [post1, post2, post3, post4, post5 ]
    _ = [db.session.add(post) for post in all_posts]
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))
    db.session.commit()
