-- base de datos
CREATE DATABASE likeme; 

--para moverse a la base de datos 
\c likeme;

--Crear la tabla posts si no existe
CREATE TABLE IF NOT EXISTS posts(id SERIAL PRIMARY KEY, titulo VARCHAR(255) NOT NULL, img VARCHAR(255) NOT NULL, descripcion TEXT NOT NULL, likes INTEGER NOT NULL DEFAULT 0);

-- Insertar datos (opcional, a manera de prueba)
INSERT INTO posts (titulo, img, descripcion, likes) VALUES ('Pizza de Pepperoni', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Supreme_pizza.jpg/800px-Supreme_pizza.jpg', 'Pizza de pepperoni con una base crujiente y mucho queso derretido', 0),
('Pizza Margarita', 'https://picsum.photos/400/300', 'Pizza Margarita con albahaca, tomate y queso mozzarella', 0);

