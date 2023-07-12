from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db, Post, Message, ChatMember, Chat
from app.forms import ProfileForm, MessageForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
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

@user_routes.route('/<int:userId>', methods=["PUT"])
def edit_profile(userId):
    user = User.query.get(userId)
    form = ProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if form.data["name"]:
            user.name = form.data["name"]
        if form.data["profile_pic"]:
            user.profile_pic = form.data["profile_pic"]
        if form.data["bio"]:
            user.bio = form.data["bio"]
        db.session.commit()
        return {'user': user.to_dict()}

    if form.errors:
        print(form.errors)

# #post/create a new user conversation
@user_routes.route('/<int:userId>/chats', methods=['POST'])
@login_required
def create_Chat(userId):
    # Get the user IDs from the request body
    user_ids = request.json.get('userIds', [])

    # Create a new chat
    chat = Chat()
    db.session.add(chat)
    db.session.commit()

    # Create chat members for each user in the chat
    chat_members = []
    for user_id in user_ids:
        chat_member = ChatMember(userId=user_id, chatId=chat.id)
        chat_members.append(chat_member)
        db.session.add(chat_member)

    db.session.commit()

    # Return the created chat and chat members
    return {
        "chat": chat.to_dict(),
        "chatMembers": [member.to_dict() for member in chat_members]
    }


# # delete a user conversation
@user_routes.route('/<int:userId>/chats/<int:id>', methods=['DELETE'])
def delete_Chat(userId, id):
    chat = Chat.query.get(id)
    deleted_chat = {'chat': chat.to_dict()}
    db.session.delete(chat)
    db.session.commit()
    return deleted_chat

@user_routes.route('<int:userId>/messages/<int:id>', methods=['DELETE'])
def delete_message(userId, id):
    message = Message.query.get(id)
    deleted_message = {'message': message.to_dict()}
    db.session.delete(message)
    db.session.commit()

    return deleted_message
