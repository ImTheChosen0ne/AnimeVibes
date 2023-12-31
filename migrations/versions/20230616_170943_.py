"""empty message

Revision ID: d8fe5910a33f
Revises: 14eabc034c1f
Create Date: 2023-06-16 17:09:43.602866

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd8fe5910a33f'
down_revision = '14eabc034c1f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('follows',
    sa.Column('follower', sa.Integer(), nullable=False),
    sa.Column('followed', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['followed'], ['users.id'], ),
    sa.ForeignKeyConstraint(['follower'], ['users.id'], ),
    sa.PrimaryKeyConstraint('follower', 'followed'),
    sa.UniqueConstraint('follower', 'followed')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('follows')
    # ### end Alembic commands ###