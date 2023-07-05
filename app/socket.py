from flask_socketio import SocketIO, emit
from .models import Message, Chat, db
import os

socketio = SocketIO()


if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://animevibes.onrender.com",
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)

# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)


# handle direct messages - parameter is bananable but must use the same in the front end
@socketio.on("direct_message")
def handle_direct_message(data):

    # handle data by creating a new direct message
    message = Message(
        message= data['message'],
        chatId = data['chatId'],
        userId = data['userId'],
    )
    # add to seesion and commit
    db.session.add(message)
    # conversation = Chat.query.get(data['chatId'])
    # conversation.updated_at = datetime.utcnow()
    db. session.commit()
    info = message.to_dict()
    # temp['created_at'] = temp['created_at'].strftime("%m/%d/%Y, %H:%M:%S")
    emit("direct_message", info, broadcast=True)

@socketio.on("delete_direct_message")
def delete_message(data):
    message = Message.query.get(data['id'])
    info = message.to_dict()
    db.session.delete(message)

    db.session.commit()
    emit("delete_direct_message", info,broadcast=True)
