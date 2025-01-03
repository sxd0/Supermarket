"""Add favourites in User and Update Type in Category, Card and Review

Revision ID: ce60e02cf1d5
Revises: 670b3484d516
Create Date: 2024-12-07 04:21:34.675806

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ce60e02cf1d5'
down_revision: Union[str, None] = '670b3484d516'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('card', sa.Column('gender', sa.String(), nullable=False))
    op.add_column('card', sa.Column('popular', sa.Boolean(), nullable=True))
    op.drop_column('card', 'flag')
    op.drop_column('category', 'image')
    op.drop_column('category', 'gender')
    op.alter_column('review', 'stars',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.add_column('user', sa.Column('favourite', sa.ARRAY(sa.Integer()), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'favourite')
    op.alter_column('review', 'stars',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.add_column('category', sa.Column('gender', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.add_column('category', sa.Column('image', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.add_column('card', sa.Column('flag', sa.BOOLEAN(), autoincrement=False, nullable=True))
    op.drop_column('card', 'popular')
    op.drop_column('card', 'gender')
    # ### end Alembic commands ###
