from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(
        username='Demo', email='demo@aa.io', password='password', bio='Here for the Anime!', name="DemoUser", profile_pic="https://static1.squarespace.com/static/5c8a7b5cca525b3868731c5d/t/5efaaf94ba3a2c05d16cc6d5/1593487252811/NGC_avatars-02.png")
    sasuke = User(
        username='SasukeUchiha', email='sasuke@aa.io', password='password', bio='Vengeful avenger seeking redemption and power.', name="Sasuke", profile_pic="https://cdn.shopify.com/s/files/1/0046/2779/1960/files/sasuke_uchiha.jpg?v=1584818680")
    sakura  = User(
        username='SakuraHaruno ', email='sakura@aa.io', password='password', bio='Skilled kunoichi with a blossoming inner strength.', name="Sakura", profile_pic="https://cdn.myanimelist.net/images/characters/3/73370.jpg")
    monkey  = User(
        username='MonkeyLuffy', email='monkey@aa.io', password='password', bio='Rubber-bodied pirate on an adventurous quest for freedom.', name="Monkey", profile_pic="https://steemitimages.com/1280x0/http://i50.photobucket.com/albums/f331/venitaaresa/luffy2_zpsytpwrang.jpg")
    tanjiro = User(
        username='TanjiroKamado', email='tanjiro @aa.io', password='password', bio='Determined demon slayer fueled by love and resilience.', name="Tanjiro", profile_pic="https://pm1.aminoapps.com/7339/ab1f98b1ad4d365807a5a90d9a6d3cd3f80ad54cr1-736-736v2_hq.jpg")
    nezuko = User(
        username='NezukoKamado', email='nezuko@aa.io', password='password', bio='Silent demon-turned-protector with fierce loyalty.', name="Nezuko", profile_pic="https://wallpapersmug.com/large/f4f82c/angry-kamado-nezuko-anime.jpg")
    naruto = User(
        username='NarutoUzumaki', email='naruto@aa.io', password='password', bio='Energetic ninja dreaming of becoming the Hokage.', name="Naruto", profile_pic="https://w0.peakpx.com/wallpaper/638/468/HD-wallpaper-naruto-live-naruto-uzumaki-portrait-manga.jpg")
    satoru = User(
        username='SatoruGojo', email='satoru@aa.io', password='password', bio='Enigmatic sorcerer with unparalleled skill and charisma.', name="Satoru", profile_pic="https://media.distractify.com/brand-img/K3YMRN7w7/1280x670/why-does-gojo-wear-a-mask-1621289501369.png")
    yuji = User(
        username='YujiItadori', email='yuji@aa.io', password='password', bio='Fearless exorcist with a compassionate heart.', name="Yuji", profile_pic="https://cdn.pixabay.com/photo/2021/03/14/12/19/sukuna-6094183_1280.jpg")
    izuku = User(
        username='IzukuMidoriya', email='izuku@aa.io', password='password', bio='Quirkless hero-in-training striving to save others.', name="Izuku", profile_pic="https://64.media.tumblr.com/316659501dc6f0db36ca0df55c16b9e9/5da25045d004f90c-8c/s1280x1920/df732aab72ff19f02a0fb1e70e19b5d7bbea7a27.jpg")
    toshinori = User(
        username='ToshinoriYagi', email='toshinori@aa.io', password='password', bio='Mighty symbol of peace hiding a heroic secret.', name="All Might", profile_pic="https://freeaddon.com/wp-content/uploads/2018/06/all-might-2.jpg")
    goku = User(
        username='Goku', email='goku@aa.io', password='password', bio='Legendary Saiyan warrior constantly seeking new challenges.', name="Goku", profile_pic="https://www.skinit.com/media/catalog/product/cache/9dbe6a0c16a5b581719a1aa389879cfc/d/r/drgnbz15_50.jpg")

    demo.followers.append(sasuke)
    demo.followers.append(monkey)
    demo.followers.append(tanjiro)
    demo.followers.append(naruto)
    demo.followers.append(yuji)
    demo.followers.append(toshinori)
    demo.followers.append(goku)
    demo.followers.append(nezuko)


    sasuke.followers.append(demo)
    sasuke.followers.append(sasuke)
    sasuke.followers.append(nezuko)
    sasuke.followers.append(naruto)
    sasuke.followers.append(satoru)
    sasuke.followers.append(izuku)
    sasuke.followers.append(toshinori)
    sasuke.followers.append(goku)

    sakura.followers.append(demo)
    sakura.followers.append(sasuke)
    sakura.followers.append(monkey)
    sakura.followers.append(tanjiro)
    sakura.followers.append(nezuko)
    sakura.followers.append(naruto)
    sakura.followers.append(yuji)
    sakura.followers.append(izuku)

    monkey.followers.append(sasuke)
    monkey.followers.append(monkey)
    monkey.followers.append(nezuko)
    monkey.followers.append(naruto)
    monkey.followers.append(satoru)
    monkey.followers.append(yuji)

    tanjiro.followers.append(monkey)
    tanjiro.followers.append(tanjiro)
    tanjiro.followers.append(nezuko)

    nezuko.followers.append(monkey)
    nezuko.followers.append(tanjiro)
    nezuko.followers.append(naruto)
    nezuko.followers.append(yuji)
    nezuko.followers.append(izuku)

    naruto.followers.append(tanjiro)
    naruto.followers.append(nezuko)
    naruto.followers.append(naruto)
    naruto.followers.append(satoru)

    satoru.followers.append(monkey)
    satoru.followers.append(tanjiro)
    satoru.followers.append(nezuko)
    satoru.followers.append(naruto)
    satoru.followers.append(izuku)

    yuji.followers.append(tanjiro)
    yuji.followers.append(naruto)
    yuji.followers.append(nezuko)
    yuji.followers.append(satoru)
    yuji.followers.append(yuji)
    yuji.followers.append(izuku)
    yuji.followers.append(toshinori)

    izuku.followers.append(naruto)
    izuku.followers.append(satoru)
    izuku.followers.append(izuku)
    izuku.followers.append(toshinori)
    izuku.followers.append(goku)

    toshinori.followers.append(nezuko)
    toshinori.followers.append(naruto)
    toshinori.followers.append(satoru)
    toshinori.followers.append(yuji)
    toshinori.followers.append(izuku)
    toshinori.followers.append(toshinori)
    toshinori.followers.append(goku)
    toshinori.followers.append(demo)
    toshinori.followers.append(sakura)

    goku.followers.append(nezuko)
    goku.followers.append(naruto)
    goku.followers.append(satoru)
    goku.followers.append(yuji)
    goku.followers.append(izuku)
    goku.followers.append(toshinori)
    goku.followers.append(goku)
    goku.followers.append(sakura)

    db.session.add(demo)
    db.session.add(sasuke)
    db.session.add(sakura)
    db.session.add(monkey)
    db.session.add(tanjiro)
    db.session.add(nezuko)
    db.session.add(naruto)
    db.session.add(satoru)
    db.session.add(yuji)
    db.session.add(izuku)
    db.session.add(toshinori)
    db.session.add(goku)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
