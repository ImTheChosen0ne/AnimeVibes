from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .comments import seed_comments, undo_comments
from .comment_replies import seed_comment_relpies, undo_comment_replies
from .chat_members import seed_chat_members, undo_chat_members
from .chats import seed_chats, undo_chats
from .messages import seed_messages, undo_messages

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_posts()
        undo_comments()
        undo_comment_replies()
        undo_chats()
        undo_chat_members()
        undo_messages()
    seed_users()
    seed_posts()
    seed_comments()
    seed_comment_relpies()
    seed_chats()
    seed_chat_members()
    seed_messages()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_posts()
    undo_comments()
    undo_comment_replies()
    undo_chats()
    undo_chat_members()
    undo_messages()
    # Add other undo functions here
