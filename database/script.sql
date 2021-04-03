CREATE DATABASE proyecto;
USE proyecto;

-- Usuario TABLA
CREATE TABLE users (
  id INT(11) NOT NULL,
  nombre VARCHAR(16) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  descripcion VARCHAR(100),
  dia INT(11),
  mes VARCHAR(30), 
  ano INT(11),
  contrasena VARCHAR(60) NOT NULL);

ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;


-- Streaming TABLE
CREATE TABLE streaming (
  id INT(11) NOT NULL,
  titulo VARCHAR(150) NOT NULL,
  nombre VARCHAR(150) NOT NULL,
  url VARCHAR(255) NOT NULL,
  descripcion TEXT,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE streaming
  ADD PRIMARY KEY (id);

ALTER TABLE streaming
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;
