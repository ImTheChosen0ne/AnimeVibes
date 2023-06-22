from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length, URL
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS

class PostForm(FlaskForm):
    caption = StringField("Caption", validators=[DataRequired(), Length(min=1,max=255)])
    # video = StringField("Video", validators=[DataRequired()])
    video = FileField("Video File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Submit")
