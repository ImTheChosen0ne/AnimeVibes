from flask import Blueprint, request
from flask_login import current_user, login_required
from app.forms import PostForm
from app.models import db, Post


post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def get_posts():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}

@post_routes.route('/new', methods=["POST"])
def create_post():
    form = PostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        post = Post(
            userId=current_user.id,
            caption=form.data["caption"],
            video=form.data["video"]
            )
        db.session.add(post)
        db.session.commit()

        return {'post': post.to_dict()}

    if form.errors:
        print(form.errors)

@post_routes.route('/<int:postId>', methods=["PUT"])
def edit_post(postId):
    post = Post.query.get(postId)
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    print('hello')
    if form.validate_on_submit():
        if form.data["caption"]:
            post.caption = form.data["caption"]
        if form.data["video"]:
            post.video = form.data["video"]
        db.session.commit()
        return {'post': post.to_dict()}

    if form.errors:
        print(form.errors)

@post_routes.route('/<int:postId>', methods=["DELETE"])
def delete_post(postId):
    post = Post.query.get(postId)
    deleted_post = {'post': post.to_dict()}
    db.session.delete(post)
    db.session.commit()
    return deleted_post
