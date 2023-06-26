from app.models import db, Post, User,environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():

    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)
    user4 = User.query.get(4)
    user5 = User.query.get(5)
    user6 = User.query.get(6)
    user7 = User.query.get(7)
    user8 = User.query.get(8)
    user9 = User.query.get(9)
    user10 = User.query.get(10)
    user11 = User.query.get(11)
    user12 = User.query.get(12)



    post1 = Post(
        userId=1,
        caption="Just finished watching the latest episode of My Hero Academia! The action scenes were mind-blowing. Can't wait for the next one! #anime #MyHeroAcademia",
        video="https://capstone-tiktok.s3.amazonaws.com/Video_4_dxlpb0.mp4",
        post_favorites = [user1, user3, user6, user8],
        post_likes = [user1, user2, user3]
    )
    post2 = Post(
        userId=2,
        caption="Throwback to one of my all-time favorite anime series, Attack on Titan! The storyline and character development are simply incredible. #anime #AttackOnTitan",
        video="https://capstone-tiktok.s3.amazonaws.com/Video_3_iegkos.mp4",
        post_favorites = [user1],
        post_likes = [user3, user8, user9]

    )
    post3 = Post(
        userId=3,
        caption="Just started watching Demon Slayer, and I'm already hooked! The animation and fight sequences are stunning. Highly recommend it! #anime #DemonSlayer",
        video="https://capstone-tiktok.s3.amazonaws.com/Video_2_gpq9hh.mp4",
        post_favorites = [user1, user5, user12, user11],
        post_likes = [user11]
    )
    post4 = Post(
        userId=4,
        caption="Recently discovered One Punch Man, and it's hilarious! Saitama's overpowered character and deadpan humor make it a must-watch. #anime #OnePunchMan",
        video="https://capstone-tiktok.s3.amazonaws.com/Video_1_s9gzxb.mp4",
        post_favorites = [user10, user7, user3, user8],
        post_likes = [user10]
    )
    post5 = Post(
        userId=5,
        caption="Just binged the entire season of Jujutsu Kaisen, and it blew my mind! The animation, characters, and supernatural elements are top-notch. #anime #JujutsuKaisen",
        video="https://capstone-tiktok.s3.amazonaws.com/Video_ntblmx.mp4",
        post_favorites = [user3],
        post_likes = [user1, user2, user3]
    )
    post6 = Post(
        userId=6,
        caption="When your favorite anime character comes to life...cosplay level: 100! 🎭 #AnimeCosplay #OtakuLife",
        video="https://capstone-tiktok.s3.amazonaws.com/Video_3.mov",
        post_favorites = [user1],
        post_likes = [user5]
    )
    post7 = Post(
        userId=7,
        caption="That epic anime fight scene got me like...🔥 Can't stop watching! #AnimeAction #BingeWorthy",
        video="https://capstone-tiktok.s3.amazonaws.com/Video.mov",
        post_favorites = [user12],
        post_likes = [user2, user4, user7]
    )
    post8 = Post(
        userId=8,
        caption="Just a casual day with my anime squad, saving the world one episode at a time! 💪 #AnimeHeroes #Teamwork",
        video="https://capstone-tiktok.s3.amazonaws.com/Video_1(2).mov",
        post_favorites = [user1, user6, user7, user9],
        post_likes = [user2]
    )
    post9 = Post(
        userId=9,
        caption="When the anime opening hits and you can't resist dancing along! 🎵 #AnimeSoundtrack #WeebLife",
        video="https://capstone-tiktok.s3.amazonaws.com/Video_1(1).mov",
        post_favorites = [user1, user6, user3, user10],
        post_likes = [user11]
    )
    post10 = Post(
        userId=10,
        caption="Caught in an anime love triangle...who will win my heart? 💔 #AnimeRomance #ShipGoals",
        video="https://capstone-tiktok.s3.amazonaws.com/Video(2).mov",
        post_favorites = [user12],
        post_likes = [user2, user9, user4]
    )
    post11 = Post(
        userId=11,
        caption="Attempting to recreate that jaw-dropping anime food...did I nail it? 🍜 #AnimeFoodie #CookingChallenge",
        video="https://capstone-tiktok.s3.amazonaws.com/Video(1).mov",
        post_favorites = [user4],
        post_likes = [user8]
    )
    post12 = Post(
        userId=12,
        caption="Anime marathon night! Snacks? Check. Blanket fort? Check. Let's dive into this epic adventure! 📺 #AnimeMarathon #StayCozy",
        video="https://capstone-tiktok.s3.amazonaws.com/Video_1.mov",
        post_favorites = [user12],
        post_likes = [user10, user11, user5]
    )
    post13 = Post(
        userId=2,
        caption="Living out my anime dream as a magical girl! Transforming powers activated! ✨ #MagicalGirlVibes #CosplayMagic",
        video="https://capstone-tiktok.s3.amazonaws.com/Video_3(1).mov",
        post_favorites = [user1, user5, user2, user7],
        post_likes = [user6]
    )
    post14 = Post(
        userId=7,
        caption="Cosplaying as my favorite anime character at a convention! The hype is unreal! 🎉 #AnimeConvention #CosplayCommunity",
        video="https://capstone-tiktok.s3.amazonaws.com/Video_2(1).mov",
        post_favorites = [user12, user3, user7, user9],
        post_likes = [user9]
    )
    post15 = Post(
        userId=1,
        caption="Sharing my latest anime artwork! Drawing my beloved characters brings me joy. 🎨 #AnimeArt #FanArtist",
        video="https://capstone-tiktok.s3.amazonaws.com/Video_2.mov",
        post_favorites = [user6],
        post_likes = [user4, user3, user9]
    )

    all_posts = [post1, post2, post3, post4, post5, post6, post7, post8, post9, post10, post11, post12, post13, post14, post15 ]
    _ = [db.session.add(post) for post in all_posts]
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))
    db.session.commit()
