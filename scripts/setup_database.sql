-- Superuser yaratish uchun SQL
-- Bu faqat ma'lumot uchun, aslida manage.py createsuperuser ishlatish kerak

-- Test foydalanuvchilar yaratish
INSERT INTO users_user (
    username, first_name, last_name, email, is_staff, is_active, 
    date_joined, password, role, is_superuser
) VALUES 
('admin', 'Admin', 'User', 'admin@example.com', 1, 1, 
 datetime('now'), 'pbkdf2_sha256$600000$test$hash', 'admin', 1),
('cook', 'Cook', 'User', 'cook@example.com', 0, 1, 
 datetime('now'), 'pbkdf2_sha256$600000$test$hash', 'cook', 0);

-- Test mahsulotlar
INSERT INTO products_product (name, unit, stock_quantity, min_stock_level, price_per_unit, created_at, updated_at) VALUES
('Un', 'kg', 50.00, 10.00, 3500.00, datetime('now'), datetime('now')),
('Tuz', 'kg', 20.00, 5.00, 2000.00, datetime('now'), datetime('now')),
('Shakar', 'kg', 30.00, 8.00, 8000.00, datetime('now'), datetime('now')),
('Yog\'', 'l', 15.00, 3.00, 12000.00, datetime('now'), datetime('now')),
('Guruch', 'kg', 40.00, 10.00, 7000.00, datetime('now'), datetime('now'));

-- Test ovqat turlari
INSERT INTO meals_mealtype (name, description, created_at) VALUES
('Osh', 'An\'anaviy o''zbek oshi', datetime('now')),
('Sho''rva', 'Sabzavotli sho''rva', datetime('now')),
('Manti', 'Bug''da pishirilgan manti', datetime('now'));

-- Ovqat tarkiblari
INSERT INTO meals_mealingredient (meal_type_id, product_id, quantity_per_child) VALUES
(1, 5, 0.15), -- Osh uchun guruch
(1, 4, 0.02), -- Osh uchun yog'
(2, 1, 0.05), -- Sho'rva uchun un
(2, 2, 0.01); -- Sho'rva uchun tuz
