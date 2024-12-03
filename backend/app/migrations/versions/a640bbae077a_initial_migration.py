from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'your_revision_id'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    # Создание таблицы category
    op.create_table(
        'category',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('title', sa.String, nullable=False),
        sa.Column('gender', sa.String, nullable=False),
        sa.Column('image', sa.Integer, nullable=False)
    )

    # Создание таблицы user
    op.create_table(
        'user',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('email', sa.String, nullable=False),
        sa.Column('hashed_password', sa.String, nullable=False)
    )

    # Создание таблицы card
    op.create_table(
        'card',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('title', sa.String, nullable=False),
        sa.Column('price', sa.Float, nullable=False),
        sa.Column('category_id', sa.Integer, sa.ForeignKey('category.id'), nullable=False),
        sa.Column('quantity', sa.Integer, nullable=False),
        sa.Column('description', sa.String, nullable=True),
        sa.Column('sale', sa.Float, nullable=True),
        sa.Column('new', sa.Boolean, nullable=False),
        sa.Column('flag', sa.Boolean, nullable=False),
        sa.Column('image', sa.Integer, nullable=False)
    )

    # Создание таблицы cart
    op.create_table(
        'cart',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('user_id', sa.Integer, sa.ForeignKey('user.id'), nullable=False),
        sa.Column('card_id', sa.Integer, sa.ForeignKey('card.id'), nullable=False),
        sa.Column('quantity', sa.Integer, nullable=False)
    )

    # Создание таблицы review
    op.create_table(
        'review',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('stars', sa.Integer, nullable=False),
        sa.Column('description', sa.String, nullable=True),
        sa.Column('user_id', sa.Integer, sa.ForeignKey('user.id'), nullable=False),
        sa.Column('card_id', sa.Integer, sa.ForeignKey('card.id'), nullable=False)
    )

    # Вставка данных в таблицу category
    op.execute("""
    INSERT INTO category (title, gender, image) VALUES
    ('T-Shirts', 'Male', 1),
    ('Dresses', 'Female', 2),
    ('Jeans', 'Unisex', 3),
    ('Jackets', 'Male', 4),
    ('Shoes', 'Female', 5),
    ('Accessories', 'Unisex', 6);
    """)

    # Вставка данных в таблицу user
    op.execute("""
    INSERT INTO "user" (email, hashed_password) VALUES
    ('alice@example.com', 'hashed_password_1'),
    ('bob@example.com', 'hashed_password_2'),
    ('charlie@example.com', 'hashed_password_3'),
    ('diana@example.com', 'hashed_password_4'),
    ('eve@example.com', 'hashed_password_5');
    """)

    # Вставка данных в таблицу card
    op.execute("""
    INSERT INTO card (title, price, category_id, quantity, description, sale, new, flag, image) VALUES
    ('Cotton T-Shirt', 20, 1, 50, 'A comfortable cotton T-Shirt', NULL, TRUE, FALSE, 1),
    ('Summer Dress', 40, 2, 30, 'A stylish summer dress', 5, TRUE, TRUE, 2),
    ('Blue Jeans', 35, 3, 40, 'Classic blue jeans', NULL, FALSE, FALSE, 3),
    ('Leather Jacket', 80, 4, 20, 'A durable leather jacket', 10, FALSE, TRUE, 4),
    ('High Heels', 60, 5, 25, 'Elegant high heels', NULL, TRUE, FALSE, 5),
    ('Winter Scarf', 15, 6, 60, 'Warm winter scarf', NULL, FALSE, FALSE, 6),
    ('Casual Shirt', 25, 1, 35, 'A casual shirt for everyday wear', NULL, TRUE, FALSE, 7),
    ('Evening Gown', 120, 2, 15, 'An elegant evening gown', 20, FALSE, TRUE, 8),
    ('Black Jeans', 30, 3, 45, 'Classic black jeans', NULL, FALSE, FALSE, 9),
    ('Denim Jacket', 50, 4, 25, 'A stylish denim jacket', 5, TRUE, TRUE, 10),
    ('Sneakers', 55, 5, 30, 'Comfortable sneakers for everyday wear', NULL, TRUE, FALSE, 11),
    ('Winter Hat', 10, 6, 70, 'Warm winter hat', NULL, FALSE, FALSE, 12);
    """)

    # Вставка данных в таблицу cart
    op.execute("""
    INSERT INTO cart (user_id, card_id, quantity) VALUES
    (1, 1, 2),
    (2, 2, 1),
    (3, 3, 1),
    (4, 4, 1),
    (5, 5, 1),
    (1, 6, 3),
    (2, 7, 2),
    (3, 8, 1),
    (4, 9, 1),
    (5, 10, 1);
    """)

    # Вставка данных в таблицу review
    op.execute("""
    INSERT INTO review (stars, description, user_id, card_id) VALUES
    (5, 'Great quality T-Shirt!', 1, 1),
    (4, 'Beautiful summer dress', 2, 2),
    (3, 'Comfortable jeans', 3, 3),
    (5, 'Durable and stylish jacket', 4, 4),
    (4, 'Elegant and comfortable heels', 5, 5),
    (3, 'Warm and cozy scarf', 1, 6),
    (5, 'Perfect for casual wear', 2, 7),
    (4, 'Gorgeous evening gown', 3, 8),
    (3, 'Classic black jeans', 4, 9),
    (5, 'Stylish and comfortable denim jacket', 5, 10),
    (4, 'Comfortable sneakers', 1, 11),
    (3, 'Warm winter hat', 2, 12);
    """)

def downgrade():
    # Удаление данных из таблиц
    op.execute("DELETE FROM category;")
    op.execute("DELETE FROM \"user\";")
    op.execute("DELETE FROM card;")
    op.execute("DELETE FROM cart;")
    op.execute("DELETE FROM review;")
    # Удаление таблиц
    op.drop_table('review')
    op.drop_table('cart')
    op.drop_table('card')
    op.drop_table('user')
    op.drop_table('category')
