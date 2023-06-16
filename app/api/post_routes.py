from flask import Blueprint, request
from flask_login import current_user, login_required
from app.forms import PostForm, CommentForm
from app.models import db, Post, Comment, CommentReply

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def get_posts():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}

@post_routes.route('/new', methods=["POST"])
@login_required
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
@login_required
def edit_post(postId):
    post = Post.query.get(postId)
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

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
@login_required
def delete_post(postId):
    post = Post.query.get(postId)
    deleted_post = {'post': post.to_dict()}
    db.session.delete(post)
    db.session.commit()
    return deleted_post

@post_routes.route('<int:postId>/comments',methods =['POST'])
def create_comment(postId):
    form = CommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment = Comment(
            postId = postId,
            userId=current_user.id,
            comment=form.data["comment"],
        )
        db.session.add(comment)
        db.session.commit()

        return {'comment': comment.to_dict()}
    else:
        print(form.errors)

@post_routes.route('<int:postId>/comments/<int:commentId>', methods = ["PUT"])
def update_comment(postId, commentId):
    comment = Comment.query.get(commentId)
    form = CommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if form.data["comment"]:
            comment.comment = form.data["comment"]

        db.session.commit()
        return {'comment': comment.to_dict()}
    else:
        print(form.errors)

@post_routes.route('<int:postId>/comments/<int:commentId>', methods = ["DELETE"])
def delete_comment(postId, commentId):
    comment = Comment.query.get(commentId)
    deleted_comment = {'comment': comment.to_dict()}
    db.session.delete(comment)
    db.session.commit()
    return deleted_comment

@post_routes.route('/<int:postId>/comments/<int:commentId>/replyComments',methods =['POST'])
def create_reply_comment(commentId, postId):
    form = CommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        commentReply = CommentReply(
            commentId = commentId,
            userId=current_user.id,
            comment=form.data["comment"],
        )
        db.session.add(commentReply)
        db.session.commit()

        return {'commentReply': commentReply.to_dict()}
    else:
        print(form.errors)

@post_routes.route('/<int:postId>/comments/<int:commentId>/replyComments/<int:replyCommentId>', methods = ["PUT"])
def update_reply_comment(commentId, replyCommentId):
    commentReply = CommentReply.query.get(replyCommentId)
    form = CommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if form.data["comment"]:
            commentReply.comment = form.data["comment"]

        db.session.commit()
        return {'commentReply': commentReply.to_dict()}
    else:
        print(form.errors)

@post_routes.route('/<int:postId>/comments/<int:commentId>/replyComments/<int:replyCommentId>', methods = ["DELETE"])
def delete_reply_comment(commentId, replyCommentId):
    commentReply = CommentReply.query.get(replyCommentId)
    deleted_comment_reply = {'commentReply': commentReply.to_dict()}
    db.session.delete(commentReply)
    db.session.commit()
    return deleted_comment_reply
