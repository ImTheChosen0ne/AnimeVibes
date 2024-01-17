from flask_socketio import SocketIO, emit
from .models import Message, Chat, db
import os

socketio = SocketIO()


if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://animevibes.onrender.com",
        "https://animevibes.onrender.com"
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on("chat")
def handle_chat(data):

    message = Message(
        message = data['message'],
        chatId = data['chatId'],
        userId = data['userId'],
    )

    db.session.add(message)
    db. session.commit()

    emit("chat", message.to_dict(), broadcast=True)

@socketio.on("delete_message")
def delete_message(data):
    message = Message.query.get(data['id'])
    info = message.to_dict()
    db.session.delete(message)

    db.session.commit()
    emit("delete_message", info,broadcast=True)
