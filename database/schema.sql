DROP DATABASE IF EXISTS overview;

CREATE DATABASE overview;

USE overview;

CREATE TABLE images (
  id INT NOT NULL AUTO_INCREMENT,
  user VARCHAR(30),
  image TEXT,
  description TEXT,
  posted DATE,
  category VARCHAR(30),
  restaurant INT,
  PRIMARY KEY (ID)
);

CREATE TABLE restaurants (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50),
  address TEXT,
  phone TEXT,
  website TEXT,
  googleMap TEXT,
  cost INT,
  PRIMARY KEY (ID)
);