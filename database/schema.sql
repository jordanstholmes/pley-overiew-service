DROP DATABASE IF EXISTS overview;

CREATE DATABASE overview;

USE overview;

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

CREATE TABLE images (
  id INT NOT NULL AUTO_INCREMENT,
  user VARCHAR(30),
  image TEXT,
  description TEXT,
  posted VARCHAR(255),
  category VARCHAR(30),
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