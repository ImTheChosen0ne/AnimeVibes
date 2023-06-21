from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length
from app.models import User

class ProfileForm(FlaskForm):
    profile_pic = StringField('profilePic')
    bio = StringField('bio', validators=[Length(max=50)])
    name = StringField('name', validators=[Length(max=25)])
