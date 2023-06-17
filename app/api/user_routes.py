from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, db, Post

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:userId>/favorites/posts/<int:postId>', methods=['PUT'])
def add_favorite(userId, postId):
    user = User.query.get(userId)
    post = Post.query.get(postId)
    post.post_favorites.append(user)

    db.session.commit()
    return {'user': user.to_dict()}

@user_routes.route('/<int:userId>/favorites/posts/<int:postId>', methods=['DELETE'])
def delete_favorite(userId, postId):
    user = User.query.get(userId)
    post = Post.query.get(postId)
    post.post_favorites.remove(user)

    db.session.commit()
    return {'user': user.to_dict()}

@user_routes.route('/<int:userId>/likes/posts/<int:postId>', methods=['PUT'])
def add_like(userId, postId):
    user = User.query.get(userId)
    post = Post.query.get(postId)
    post.post_likes.append(user)

    db.session.commit()
    return {'user': user.to_dict()}

@user_routes.route('/<int:userId>/likes/posts/<int:postId>', methods=['DELETE'])
def delete_like(userId, postId):
    user = User.query.get(userId)
    post = Post.query.get(postId)
    post.post_likes.remove(user)

    db.session.commit()
    return {'user': user.to_dict()}

# @user_routes.route('/<int:userId>/followers', methods=['GET'])
# @login_required
# def get_followers(userId):
#     user = User.query.get(userId)
#     followers = user.followers
#     return {'followers': [follower.to_dict() for follower in followers]}

@user_routes.route('/<int:userId>/followers/<int:followerId>', methods=['POST'])
def add_follower(userId, followerId):
    user = User.query.get(userId)
    follower = User.query.get(followerId)

    if follower not in user.followers:
        user.followers.append(follower)
        db.session.commit()

    return {'user': follower.to_dict()}

@user_routes.route('/<int:userId>/followers/<int:followerId>', methods=['DELETE'])
def remove_follower(userId, followerId):
    user = User.query.get(userId)
    follower = User.query.get(followerId)

    if follower in user.followers:
        user.followers.remove(follower)
        db.session.commit()

    return {'user': follower.to_dict()}
