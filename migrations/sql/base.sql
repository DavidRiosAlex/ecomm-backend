-- Crear tabla: Usuario si no existe
CREATE TABLE IF NOT EXISTS Usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    direccion TEXT,
    telefono VARCHAR(20),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear table: Tags si no existe
CREATE TABLE IF NOT EXISTS Tag (
    name VARCHAR(40) NOT NULL PRIMARY KEY,
    descripcion VARCHAR(200) DEFAULT NULL
);

-- Crear table: Tags si no existe
CREATE TABLE IF NOT EXISTS User_Tag (
    id_usuario INT NOT NULL,
    tag VARCHAR(40) NOT NULL,
    PRIMARY KEY (id_usuario, tag),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (tag) REFERENCES Tag(name) ON DELETE CASCADE
);

-- Crear tabla: Sessions si no existe
CREATE TABLE IF NOT EXISTS Sessions (
    id_sesion SERIAL PRIMARY KEY,
    id_usuario INT,
    token VARCHAR(255) NOT NULL,
    fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_expiracion TIMESTAMP,
    estado VARCHAR(10) CHECK (estado IN ('activa', 'expirada')) DEFAULT 'activa',
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE SET NULL
);

-- Crear tabla: Categoria si no existe
CREATE TABLE IF NOT EXISTS Categoria (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    categoria_padre INT,
    FOREIGN KEY (categoria_padre) REFERENCES Categoria(id_categoria) ON DELETE SET NULL
);

-- Crear tabla: Producto si no existe
CREATE TABLE IF NOT EXISTS Producto (
    id_producto SERIAL PRIMARY KEY,
    id_categoria INT,
    nombre VARCHAR(255) NOT NULL,
    imagen VARCHAR(255),
    descripcion TEXT,
    precio NUMERIC(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria) ON DELETE SET NULL
);

-- Crear tabla: Carrito si no existe
CREATE TABLE IF NOT EXISTS Carrito (
    id_carrito SERIAL PRIMARY KEY,
    id_usuario INT,
    id_sesion INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_ultima_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(15) CHECK (estado IN ('activo', 'abandonado', 'convertido')) DEFAULT 'activo',
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE SET NULL,
    FOREIGN KEY (id_sesion) REFERENCES Sessions(id_sesion) ON DELETE SET NULL,
    CONSTRAINT check_usuario_o_sesion CHECK (
        (id_usuario IS NOT NULL AND id_sesion IS NULL) OR 
        (id_usuario IS NULL AND id_sesion IS NOT NULL)
    )
);

-- Crear tabla: Carrito_Producto si no existe
CREATE TABLE IF NOT EXISTS Carrito_Producto (
    id_carrito INT,
    id_producto INT,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario NUMERIC(10,2) NOT NULL,
    PRIMARY KEY (id_carrito, id_producto),
    FOREIGN KEY (id_carrito) REFERENCES Carrito(id_carrito) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto) ON DELETE CASCADE
);

-- Crear tabla: Orden si no existe
CREATE TABLE IF NOT EXISTS Orden (
    id_orden SERIAL PRIMARY KEY,
    id_usuario INT,
    carrito_id INT,
    fecha_orden TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total NUMERIC(10,2) NOT NULL,
    estado VARCHAR(15) CHECK (estado IN ('pendiente', 'enviado', 'entregado', 'cancelado')) DEFAULT 'pendiente',
    direccion_envio TEXT NOT NULL,
    metodo_pago VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE SET NULL,
    FOREIGN KEY (carrito_id) REFERENCES Carrito(id_carrito) ON DELETE SET NULL
);

-- Crear tabla: Orden_Producto si no existe
CREATE TABLE IF NOT EXISTS Orden_Producto (
    id_orden INT,
    id_producto INT,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario NUMERIC(10,2) NOT NULL,
    PRIMARY KEY (id_orden, id_producto),
    FOREIGN KEY (id_orden) REFERENCES Orden(id_orden) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto) ON DELETE CASCADE
);
