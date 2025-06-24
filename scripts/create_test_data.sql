-- Test foydalanuvchilar yaratish
INSERT INTO users_user (username, first_name, last_name, email, role, is_staff, is_active, is_superuser, date_joined, password) VALUES
('admin_user', 'Admin', 'User', 'admin@test.com', 'admin', 1, 1, 0, datetime('now'), 'pbkdf2_sha256$600000$test$hash'),
('cook_user', 'Cook', 'User', 'cook@test.com', 'cook', 0, 1, 0, datetime('now'), 'pbkdf2_sha256$600000$test$hash');

-- Bolalar ma'lumotlari
INSERT INTO children_child (name, age, group_name, allergies, special_diet, is_active) VALUES
('Ali Karimov', 5, 'Kichik guruh', '', '', 1),
('Malika Tosheva', 4, 'Kichik guruh', 'Yong''oq', '', 1),
('Bobur Rahimov', 6, 'Katta guruh', '', 'Vegetarian', 1),
('Zarina Usmonova', 5, 'O''rta guruh', '', '', 1),
('Jasur Alimov', 4, 'Kichik guruh', 'Sut', '', 1);

-- Mahsulotlar
INSERT INTO products_product (name, unit, category, minimum_stock, current_stock, price_per_unit) VALUES
('Un', 'kg', 'Asosiy', 50.0, 100.0, 3500.0),
('Guruch', 'kg', 'Asosiy', 30.0, 80.0, 8000.0),
('Go''sht', 'kg', 'Protein', 20.0, 45.0, 45000.0),
('Sabzi', 'kg', 'Sabzavot', 15.0, 25.0, 4000.0),
('Piyoz', 'kg', 'Sabzavot', 10.0, 30.0, 3000.0),
('Yog''', 'litr', 'Yog''', 5.0, 15.0, 12000.0),
('Tuz', 'kg', 'Ziravorlar', 2.0, 8.0, 2000.0),
('Shakar', 'kg', 'Shirinlik', 10.0, 20.0, 7000.0);

-- Ovqat turlari
INSERT INTO meals_mealtype (name, description) VALUES
('Nonushta', 'Ertalabki ovqat'),
('Tushlik', 'Kunduzi ovqat'),
('Kechki ovqat', 'Kechqurun ovqat'),
('Atishtirik', 'Qo''shimcha ovqat');

-- Ovqat standartlari
INSERT INTO meals_mealstandard (meal_type_id, product_id, amount_per_child) VALUES
(1, 1, 0.05),  -- Nonushta: Un 50g
(1, 8, 0.01),  -- Nonushta: Shakar 10g
(2, 2, 0.08),  -- Tushlik: Guruch 80g
(2, 3, 0.06),  -- Tushlik: Go'sht 60g
(2, 4, 0.03),  -- Tushlik: Sabzi 30g
(2, 5, 0.02),  -- Tushlik: Piyoz 20g
(2, 6, 0.01),  -- Tushlik: Yog' 10ml
(2, 7, 0.002); -- Tushlik: Tuz 2g

-- Portion standartlari
INSERT INTO meals_portionstandard (product_id, standard_portion, age_group) VALUES
(1, 0.05, 'Kichik'),
(1, 0.07, 'O''rta'),
(1, 0.09, 'Katta'),
(2, 0.06, 'Kichik'),
(2, 0.08, 'O''rta'),
(2, 0.10, 'Katta'),
(3, 0.04, 'Kichik'),
(3, 0.06, 'O''rta'),
(3, 0.08, 'Katta');
