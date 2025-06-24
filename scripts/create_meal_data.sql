-- Ovqat turlarini yaratish
INSERT INTO meals_mealtype (name, created_at) VALUES 
('Osh', datetime('now')),
('Makaron', datetime('now')),
('Kartoshka sho''rva', datetime('now')),
('Go''sht bilan guruch', datetime('now')),
('Sabzili guruch', datetime('now')),
('Go''shtli makaron', datetime('now')),
('Kartoshka qovurmasi', datetime('now')),
('Sabzi qovurmasi', datetime('now')),
('Pomidorli guruch', datetime('now')),
('Aralash sho''rva', datetime('now'));

-- Mahsulotlar yaratish (agar mavjud bo'lmasa)
INSERT OR IGNORE INTO products_product (name, unit) VALUES 
('Guruch', 'kg'),
('Go''sht', 'kg'),
('Sabzi', 'kg'),
('Piyoz', 'kg'),
('Kartoshka', 'kg'),
('Makaron', 'kg'),
('Yog''', 'kg'),
('Tuz', 'kg'),
('Sabzi yog''i', 'kg'),
('Pomidor', 'kg');

-- Zaxira yaratish
INSERT OR REPLACE INTO products_stocklot (product_id, quantity, updated_at) VALUES 
(1, 100, datetime('now')), -- Guruch
(2, 80, datetime('now')),  -- Go'sht
(3, 60, datetime('now')),  -- Sabzi
(4, 70, datetime('now')),  -- Piyoz
(5, 90, datetime('now')),  -- Kartoshka
(6, 50, datetime('now')),  -- Makaron
(7, 30, datetime('now')),  -- Yog'
(8, 20, datetime('now')),  -- Tuz
(9, 25, datetime('now')),  -- Sabzi yog'i
(10, 40, datetime('now')); -- Pomidor

-- Ovqat standartlarini yaratish
-- Osh uchun
INSERT INTO meals_mealstandard (meal_type_id, product_id, amount_per_child) VALUES 
(1, 1, 0.15), -- Guruch
(1, 2, 0.1),  -- Go'sht
(1, 3, 0.05), -- Sabzi
(1, 4, 0.03), -- Piyoz
(1, 7, 0.02); -- Yog'

-- Makaron uchun
INSERT INTO meals_mealstandard (meal_type_id, product_id, amount_per_child) VALUES 
(2, 6, 0.12), -- Makaron
(2, 2, 0.08), -- Go'sht
(2, 10, 0.04), -- Pomidor
(2, 4, 0.02), -- Piyoz
(2, 7, 0.015); -- Yog'

-- Kartoshka sho'rva uchun
INSERT INTO meals_mealstandard (meal_type_id, product_id, amount_per_child) VALUES 
(3, 5, 0.2),  -- Kartoshka
(3, 2, 0.06), -- Go'sht
(3, 3, 0.03), -- Sabzi
(3, 4, 0.02), -- Piyoz
(3, 7, 0.01); -- Yog'

-- Go'sht bilan guruch uchun
INSERT INTO meals_mealstandard (meal_type_id, product_id, amount_per_child) VALUES 
(4, 1, 0.13), -- Guruch
(4, 2, 0.12), -- Go'sht
(4, 4, 0.025), -- Piyoz
(4, 7, 0.02); -- Yog'

-- Sabzili guruch uchun
INSERT INTO meals_mealstandard (meal_type_id, product_id, amount_per_child) VALUES 
(5, 1, 0.14), -- Guruch
(5, 3, 0.08), -- Sabzi
(5, 4, 0.03), -- Piyoz
(5, 9, 0.02); -- Sabzi yog'i

-- Go'shtli makaron uchun
INSERT INTO meals_mealstandard (meal_type_id, product_id, amount_per_child) VALUES 
(6, 6, 0.13), -- Makaron
(6, 2, 0.09), -- Go'sht
(6, 10, 0.05), -- Pomidor
(6, 7, 0.015); -- Yog'

-- Kartoshka qovurmasi uchun
INSERT INTO meals_mealstandard (meal_type_id, product_id, amount_per_child) VALUES 
(7, 5, 0.18), -- Kartoshka
(7, 2, 0.07), -- Go'sht
(7, 4, 0.03), -- Piyoz
(7, 7, 0.025); -- Yog'

-- Sabzi qovurmasi uchun
INSERT INTO meals_mealstandard (meal_type_id, product_id, amount_per_child) VALUES 
(8, 3, 0.15), -- Sabzi
(8, 2, 0.08), -- Go'sht
(8, 4, 0.025), -- Piyoz
(8, 9, 0.02); -- Sabzi yog'i

-- Pomidorli guruch uchun
INSERT INTO meals_mealstandard (meal_type_id, product_id, amount_per_child) VALUES 
(9, 1, 0.12), -- Guruch
(9, 10, 0.06), -- Pomidor
(9, 2, 0.07), -- Go'sht
(9, 4, 0.02), -- Piyoz
(9, 7, 0.015); -- Yog'

-- Aralash sho'rva uchun
INSERT INTO meals_mealstandard (meal_type_id, product_id, amount_per_child) VALUES 
(10, 5, 0.1),  -- Kartoshka
(10, 3, 0.05), -- Sabzi
(10, 2, 0.08), -- Go'sht
(10, 4, 0.02), -- Piyoz
(10, 7, 0.01); -- Yog'
