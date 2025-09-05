-- Buat database
CREATE DATABASE IF NOT EXISTS nikkedb;
USE nikkedb;

--Buat Tabel NikkeGuide
CREATE TABLE nikke (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nama VARCHAR(255) NOT NULL,
    Link VARCHAR(300) NOT NULL,
);

--Buat Tabel user
CREATE TABLE users (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('User', 'Admin') NOT NULL DEFAULT 'User',
  created_at TIMESTAMP DEFAULT ,
  Image VARCHAR(255) DEFAULT NULL
);
