from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class ProfileForm(FlaskForm):
    profile_pic = StringField('profilePic')
    bio = StringField('bio')
    name = StringField('name')
