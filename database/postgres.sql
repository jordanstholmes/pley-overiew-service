
-- DROP TYPE IF EXISTS picture_category;

-- CREATE TYPE picture_category AS ENUM('food', 'drinks');

DROP TABLE IF EXISTS images;
-- DROP TABLE IF EXISTS restaurants;

-- CREATE TABLE restaurants (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(50),
--   address TEXT,
--   phone VARCHAR(50),
--   website VARCHAR(2083),
--   googleMap VARCHAR(2083),
--   cost INTEGER
-- );

CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(50),
  image VARCHAR(2083),
  description VARCHAR(5000),
  posted VARCHAR(255),
  category picture_category,
  restaurant INTEGER,
  FOREIGN KEY (restaurant)
    REFERENCES restaurants(id)
    ON DELETE CASCADE
);

-- COPY restaurants(id,name,address,phone,website,googleMap,cost)
-- FROM '/Users/jordanholmes/Documents/SDC/overview/database/seedFiles/restaurants.csv'
-- DELIMITER ',' CSV QUOTE '"';

COPY images(id, user_name, image, description, posted, category, restaurant)
FROM '/Users/jordanholmes/Documents/SDC/overview/database/seedFiles/images.csv'
DELIMITER ',' CSV QUOTE '"';
