-- Crear tabla: Users si no existe
CREATE TABLE IF NOT EXISTS Users (
    id_user SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear table: Tags si no existe
CREATE TABLE IF NOT EXISTS Tag (
    name VARCHAR(40) NOT NULL PRIMARY KEY,
    description VARCHAR(200) DEFAULT NULL
);

-- Crear table: Tags si no existe
CREATE TABLE IF NOT EXISTS User_Tag (
    id_user INT NOT NULL,
    tag VARCHAR(40) NOT NULL,
    PRIMARY KEY (id_user, tag),
    FOREIGN KEY (id_user) REFERENCES Users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (tag) REFERENCES Tag(name) ON DELETE CASCADE
);

-- Crear tabla: Sessions si no existe
CREATE TABLE IF NOT EXISTS Sessions (
    id_session SERIAL PRIMARY KEY,
    id_user INT,
    token VARCHAR(255) NOT NULL,
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiration_date TIMESTAMP,
    status VARCHAR(10) CHECK (status IN ('activa', 'expirada')) DEFAULT 'activa',
    FOREIGN KEY (id_user) REFERENCES Users(id_user) ON DELETE SET NULL
);

-- Crear tabla: Category si no existe
CREATE TABLE IF NOT EXISTS Category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    parent_category INT,
    FOREIGN KEY (parent_category) REFERENCES Category(id) ON DELETE SET NULL
);

-- Crear tabla: Product si no existe
CREATE TABLE IF NOT EXISTS Product (
    id SERIAL PRIMARY KEY,
    category_id INT,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Category(id) ON DELETE SET NULL
);

-- Crear tabla: Carrito si no existe
CREATE TABLE IF NOT EXISTS Carrito (
    id_cart SERIAL PRIMARY KEY,
    id_user INT,
    id_session INT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(15) CHECK (status IN ('activo', 'abandonado', 'convertido')) DEFAULT 'activo',
    FOREIGN KEY (id_user) REFERENCES Users(id_user) ON DELETE SET NULL,
    FOREIGN KEY (id_session) REFERENCES Sessions(id_session) ON DELETE SET NULL,
    CONSTRAINT check_user_o_session CHECK (
        (id_user IS NOT NULL AND id_session IS NULL) OR 
        (id_user IS NULL AND id_session IS NOT NULL)
    )
);

-- Crear tabla: Carrito_Producto si no existe
CREATE TABLE IF NOT EXISTS Carrito_Producto (
    id_cart INT,
    id_product INT,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10,2) NOT NULL,
    PRIMARY KEY (id_cart, id_product),
    FOREIGN KEY (id_cart) REFERENCES Carrito(id_cart) ON DELETE CASCADE,
    FOREIGN KEY (id_product) REFERENCES Product(id) ON DELETE CASCADE
);

-- Crear tabla: Orden si no existe
CREATE TABLE IF NOT EXISTS Orden (
    id_orden SERIAL PRIMARY KEY,
    id_user INT,
    carrito_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total NUMERIC(10,2) NOT NULL,
    status VARCHAR(15) CHECK (status IN ('pendiente', 'enviado', 'entregado', 'cancelado')) DEFAULT 'pendiente',
    address_envio TEXT NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES Users(id_user) ON DELETE SET NULL,
    FOREIGN KEY (carrito_id) REFERENCES Carrito(id_cart) ON DELETE SET NULL
);

-- Crear tabla: Orden_Producto si no existe
CREATE TABLE IF NOT EXISTS Orden_Producto (
    id_orden INT,
    id_product INT,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10,2) NOT NULL,
    PRIMARY KEY (id_orden, id_product),
    FOREIGN KEY (id_orden) REFERENCES Orden(id_orden) ON DELETE CASCADE,
    FOREIGN KEY (id_product) REFERENCES Product(id) ON DELETE CASCADE
);
