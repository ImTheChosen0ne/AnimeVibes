from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange

class PostForm(FlaskForm):
    caption = StringField("Caption", validators=[DataRequired(), Length(max=255)])
    video = StringField("Video", validators=[DataRequired()])
    submit = SubmitField("Submit")
