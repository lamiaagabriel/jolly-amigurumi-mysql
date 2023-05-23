------------------------- Categories

CREATE TABLE categories (
    id VARCHAR(22) NOT NULL PRIMARY KEY DEFAULT SUBSTR(MD5(RAND()), 1, 22),
    title VARCHAR(50) NOT NULL UNIQUE
);

-- Add Values
INSERT INTO 
	categories(title)
VALUES
	("Animals"), 
    ("Fantasy Creatures"),
    ("Food"),
    ("People and Characters"),
    ("Plants and Flowers"),
    ("Objects");


-------------------------- Products
CREATE TABLE products (
    id VARCHAR(22) NOT NULL PRIMARY KEY DEFAULT SUBSTR(MD5(RAND()), 1, 22),
    slug VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(50) NOT NULL,
    description TEXT,
    category_id VARCHAR(22) NOT NULL,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0,
    count_in_stock INT NOT NULL DEFAULT 0,
    discount INT NOT NULL DEFAULT 0 CHECK (discount >= 0 AND discount <= 100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- GET
SELECT products.*, GROUP_CONCAT(product_images.src) AS images
FROM products
LEFT JOIN product_images ON products.id = product_images.product_id
GROUP BY products.id;


-- Add Values
INSERT INTO 
    products(id, slug, title, description, category_id, price, countInStock, discount) 
VALUES
	('1', 'gray-shirt', 'Gray Shirt', "A popular Gray shirt Description. A popular Gray shirt Description. A popular Gray shirt Description. A popular Gray shirt Description. ", 'b616ad9d7ded02a6451714',75, 20, 12),
	('2', 'blue-shirt', 'Blue Shirt', "A popular Blue shirt Description. A popular Blue shirt Description. A popular Blue shirt Description. A popular Blue shirt Description. ", 'b616ad9d7ded02a6451714',75, 0, 12),
	('3', 'free-shirt', 'Free Shirt', "A popular shirt Description. A popular shirt Description. A popular shirt Description. A popular shirt Description. ", null, 75, 20, 12),
	('4', 'yellow-shirt', 'Yellow Shirt', "A popular Yellow shirt Description. A popular Yellow shirt Description. A popular Yellow shirt Description. A popular Yellow shirt Description.", "b616ad9d7ded02a6451714", 102, 5, 0);



SELECT *
FROM products 
JOIN product_images ON products.id = product_images.product;

-------------------------- Product Images
CREATE TABLE product_images (
    product_id VARCHAR(22) NOT NULL,
    src VARCHAR(225) NOT NULL,
    alt VARCHAR(225) NOT NULL

    
    FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-------------------------- Customers
CREATE TABLE customers (
    id VARCHAR(22) NOT NULL PRIMARY KEY DEFAULT SUBSTR(MD5(RAND()), 1, 22),
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    image VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-------------------------- Order
CREATE TABLE orders (
    id VARCHAR(22) NOT NULL PRIMARY KEY DEFAULT SUBSTR(MD5(RAND()), 1, 22),
    customer_id VARCHAR(50) NOT NULL,
    shipping_fees DECIMAL(10, 2) NOT NULL DEFAULT 0,
    payment_method VARCHAR(20) NOT NULL,
    status ENUM('placed', 'processing', 'shipped', 'delivered') NOT NULL DEFAULT 'placed',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-------------------------- Order Items
CREATE TABLE order_items (
    order_id VARCHAR(22) NOT NULL,
    product_id VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0,
    quantity INT NOT NULL,
    count_in_stock INT NOT NULL DEFAULT 0,
    discount INT NOT NULL DEFAULT 0 CHECK (discount >= 0 AND discount <= 100),
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-------------------------- Address
CREATE TABLE addresses (
    order_id VARCHAR(22) NOT NULL,
    name VARCHAR(50) NOT NULL,
    phone VARCHAR(12) NOT NULL,
    address_line VARCHAR(200) NOT NULL,
    city VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    zip VARCHAR(5) NOT NULL,
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE
);
