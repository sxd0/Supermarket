-- Очистка таблиц
TRUNCATE TABLE category RESTART IDENTITY CASCADE;
TRUNCATE TABLE "user" RESTART IDENTITY CASCADE;
TRUNCATE TABLE card RESTART IDENTITY CASCADE;
TRUNCATE TABLE cart RESTART IDENTITY CASCADE;
TRUNCATE TABLE review RESTART IDENTITY CASCADE;
TRUNCATE TABLE alembic_version RESTART IDENTITY CASCADE;

-- Вставка данных в таблицу category
INSERT INTO category (title, gender, image) VALUES
('T-Shirts', 'Male', 'image1.jpg'),
('Dresses', 'Female', 'image2.jpg'),
('Jeans', 'Unisex', 'image3.jpg'),
('Jackets', 'Male', 'image4.jpg'),
('Shoes', 'Female', 'image5.jpg'),
('Accessories', 'Unisex', 'image6.jpg');

-- Вставка данных в таблицу user
INSERT INTO "user" (email, hashed_password, name, surname) VALUES
('alice@example.com', 'hashed_password_1', 'Alice', 'Smith'),
('bob@example.com', 'hashed_password_2', 'Bob', 'Johnson'),
('charlie@example.com', 'hashed_password_3', 'Charlie', 'Brown'),
('diana@example.com', 'hashed_password_4', 'Diana', 'Prince'),
('123@123.123', 'hashed_password_4', '123', 'Prince'),
('eve@example.com', 'hashed_password_5', 'Eve', 'Adams');

-- Вставка данных в таблицу card
INSERT INTO card (title, price, category_id, quantity, description, sale, new, flag, image, size) VALUES
('Cotton T-Shirt', 20, 1, 50, 'A comfortable cotton T-Shirt', NULL, TRUE, FALSE, 'image1.jpg', 'M'),
('Summer Dress', 40, 2, 30, 'A stylish summer dress', 5, TRUE, TRUE, 'image2.jpg', 'S'),
('Blue Jeans', 35, 3, 40, 'Classic blue jeans', NULL, FALSE, FALSE, 'image3.jpg', 'L'),
('Leather Jacket', 80, 4, 20, 'A durable leather jacket', 10, FALSE, TRUE, 'image4.jpg', 'XL'),
('High Heels', 60, 5, 25, 'Elegant high heels', NULL, TRUE, FALSE, 'image5.jpg', 'M'),
('Winter Scarf', 15, 6, 60, 'Warm winter scarf', NULL, FALSE, FALSE, 'image6.jpg', 'One Size');

-- Вставка данных в таблицу cart
INSERT INTO cart (user_id, card_id, quantity) VALUES
(1, 1, 2),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 5, 1);

-- Вставка данных в таблицу review
INSERT INTO review (stars, description, user_id, card_id) VALUES
(5, 'Great quality T-Shirt!', 1, 1),
(4, 'Beautiful summer dress', 2, 2),
(3, 'Comfortable jeans', 3, 3),
(5, 'Durable and stylish jacket', 4, 4),
(4, 'Elegant and comfortable heels', 5, 5);
