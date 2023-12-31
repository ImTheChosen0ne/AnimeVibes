"""empty message

Revision ID: 47ac6221d22e
Revises: 66e3231c5deb
Create Date: 2023-09-22 23:44:26.185553

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '47ac6221d22e'
down_revision = '66e3231c5deb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('bio',
               existing_type=sa.VARCHAR(length=100),
               type_=sa.String(length=150),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('bio',
               existing_type=sa.String(length=150),
               type_=sa.VARCHAR(length=100),
               existing_nullable=True)

    # ### end Alembic commands ###