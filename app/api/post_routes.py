from flask import Blueprint, request
from flask_login import current_user, login_required
from app.forms import PostForm
from app.models import db, Post


post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def get_posts():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}
