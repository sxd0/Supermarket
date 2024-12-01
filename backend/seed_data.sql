-- Вставка данных в таблицу category
INSERT INTO category (title, gender, image) VALUES
('T-Shirts', 'Male', 1),
('Dresses', 'Female', 2),
('Jeans', 'Unisex', 3),
('Jackets', 'Male', 4),
('Shoes', 'Female', 5),
('Accessories', 'Unisex', 6);

-- Вставка данных в таблицу user
INSERT INTO `user` (email, hashed_password) VALUES
('alice@example.com', 'hashed_password_1'),
('bob@example.com', 'hashed_password_2'),
('charlie@example.com', 'hashed_password_3'),
('diana@example.com', 'hashed_password_4'),
('eve@example.com', 'hashed_password_5');

-- Вставка данных в таблицу card
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

-- Вставка данных в таблицу cart
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

-- Вставка данных в таблицу review
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
