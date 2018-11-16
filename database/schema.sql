DROP DATABASE IF EXISTS overview;

CREATE DATABASE overview;

USE overview;

CREATE TABLE restaurants (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50),
  address TEXT,
  phone VARCHAR(50),
  website VARCHAR(2083),
  googleMap VARCHAR(2083),
  cost INT,
  PRIMARY KEY (ID)
);

CREATE TABLE images (
  id INT NOT NULL AUTO_INCREMENT,
  user VARCHAR(30),
  image VARCHAR(2083),
  description VARCHAR(5000),
  posted VARCHAR(255),
  category ENUM('food', 'drinks'),
  restaurant INT,
  PRIMARY KEY (ID),
  FOREIGN KEY (restaurant)
    REFERENCES restaurants(id)
    ON DELETE CASCADE
);

LOAD DATA INFILE '/Users/jordanholmes/Documents/SDC/overview/database/seedFiles/restaurants.csv'
INTO TABLE restaurants
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n';

LOAD DATA INFILE '/Users/jordanholmes/Documents/SDC/overview/database/seedFiles/images.csv'
INTO TABLE images
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n';