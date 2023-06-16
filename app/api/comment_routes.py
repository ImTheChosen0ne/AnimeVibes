# from flask import Blueprint, request
# from flask_login import current_user, login_required
# from app.forms import CommentForm
# from app.models import db, Comment, CommentReply


# comment_routes = Blueprint('comments', __name__)

# @comment_routes.route('/')
# def get_posts():
#     comments = Comment.query.all()
#     return {'comments': [comment.to_dict() for comment in comments]}

# @comment_routes.route('/new',methods =['POST'])
# def create_comment():
#     form = CommentForm()

#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         comment = Comment(
#             postId = request.json['postId'],
#             userId=current_user.id,
#             comment=form.data["comment"],
#         )
#         db.session.add(comment)
#         db.session.commit()

#         return {'comment': comment.to_dict()}
#     else:
#         print(form.errors)

# @comment_routes.route('/<int:commentId>', methods = ["PUT"])
# def update_comment(commentId):
#     comment = Comment.query.get(commentId)
#     form = CommentForm()

#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         if form.data["comment"]:
#             comment.review = form.data["comment"]

#         db.session.commit()
#         return {'comment': comment.to_dict()}
#     else:
#         print(form.errors)

# @comment_routes.route('/<int:commentId>', methods = ["DELETE"])
# def delete_comment(commentId):
#     comment = Comment.query.get(commentId)
#     deleted_comment = {'comment': comment.to_dict()}
#     db.session.delete(comment)
#     db.session.commit()
#     return deleted_comment


# @comment_routes.route('<int:commentId>/replyComments',methods =['POST'])
# def create_reply_comment(commentId, postId):
#     form = CommentForm()

#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         commentReply = CommentReply(
#             postId=postId,
#             commentId = commentId,
#             userId=current_user.id,
#             comment=form.data["comment"],
#         )
#         db.session.add(commentReply)
#         db.session.commit()

#         return {'commentReply': commentReply.to_dict()}
#     else:
#         print(form.errors)

# @comment_routes.route('<int:commentId>/replyComments/<int:replyCommentId>', methods = ["PUT"])
# def update_reply_comment(commentId, replyCommentId):
#     commentReply = CommentReply.query.get(replyCommentId)
#     form = CommentForm()

#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         if form.data["comment"]:
#             commentReply.comment = form.data["comment"]

#         db.session.commit()
#         return {'commentReply': commentReply.to_dict()}
#     else:
#         print(form.errors)

# @comment_routes.route('<int:commentId>/replyComments/<int:replyCommentId>', methods = ["DELETE"])
# def delete_reply_comment(commentId, replyCommentId):
#     commentReply = CommentReply.query.get(replyCommentId)
#     deleted_comment_reply = {'commentReply': commentReply.to_dict()}
#     db.session.delete(commentReply)
#     db.session.commit()
#     return deleted_comment_reply
