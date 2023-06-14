from app.models import db, Post, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():

    user = User.query.get(1)

    post1 = Post(
        userId=1,
        caption="Just finished watching the latest episode of My Hero Academia! The action scenes were mind-blowing. Can't wait for the next one! #anime #MyHeroAcademia",
        video="https://drive.google.com/file/d/1-PFLpECdS6kw2pQTqfTHBciCFy4VRaxl/preview"
    )
    post2 = Post(
        userId=1,
        caption="Throwback to one of my all-time favorite anime series, Attack on Titan! The storyline and character development are simply incredible. #anime #AttackOnTitan",
        video="https://drive.google.com/file/d/1-PFO5cANW_LPhGDtF27Ozt8ih8bukWrx/preview"
    )
    post3 = Post(
        userId=2,
        caption="Just started watching Demon Slayer, and I'm already hooked! The animation and fight sequences are stunning. Highly recommend it! #anime #DemonSlayer",
        video="https://drive.google.com/file/d/1-KvrHDhAyIFgnpm0Y4VwOC6qJBzWHMYD/preview"
    )
    post4 = Post(
        userId=3,
        caption="Recently discovered One Punch Man, and it's hilarious! Saitama's overpowered character and deadpan humor make it a must-watch. #anime #OnePunchMan",
        video="https://drive.google.com/file/d/1-Jp5HqQQkVZhTUBAZTWzZoOCd7nIzdRH/preview"
    )
    post5 = Post(
        userId=3,
        caption="Just binged the entire season of Jujutsu Kaisen, and it blew my mind! The animation, characters, and supernatural elements are top-notch. #anime #JujutsuKaisen",
        video="https://drive.google.com/file/d/1-AwDk3JVHyHDuoLNdMDqx2kolIuVOZNT/preview"
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
