from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from.favorites import favorites
from.likes import likes
from.followers import follows


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_pic = db.Column(db.String, default="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    bio = db.Column(db.String(150), default="No bio yet.")
    name = db.Column(db.String(25), default="Set a profile name.")

    posts = db.relationship("Post", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")
    comment_reply = db.relationship("CommentReply", back_populates="user_comment_reply")
    messages = db.relationship("Message", back_populates="user")
    chat_members = db.relationship("ChatMember", back_populates="user")


    user_favorites = db.relationship(
        "Post",
        secondary=favorites,
        back_populates="post_favorites",
        cascade="delete, all",
    )

    user_likes = db.relationship(
        "Post",
        secondary=likes,
        back_populates="post_likes",
        cascade="delete, all",
    )

    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=follows.c.followed == id,
        secondaryjoin=follows.c.follower == id,
        back_populates="followers",
        cascade="delete, all",
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_pic': self.profile_pic,
            'bio': self.bio,
            'name': self.name,
            'user_favorites': [favorite.to_dict_favorites() for favorite in self.user_favorites],
            'user_likes': [like.to_dict_likes() for like in self.user_likes],
            'followers': self.followers_to_dict(),
            'chats': [chat_member.chat.to_dict() for chat_member in self.chat_members],
            'messages': [message.to_dict() for message in self.messages]
        }

    def to_dict_comment_user(self):
        return {
            'id': self.id,
            'username': self.username,
            'profile_pic': self.profile_pic,
        }

    def followers_to_dict(self):
        return [{'id': follower.id, 'username': follower.username, 'profile_pic': follower.profile_pic, 'name': follower.name} for follower in self.followers]
