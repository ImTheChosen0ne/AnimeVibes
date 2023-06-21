from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length

class CommentForm(FlaskForm):
    comment = StringField("Comment", validators=[DataRequired(), Length(min=1, max=100)])
    submit = SubmitField("Submit")
