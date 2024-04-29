-- Create two new databases --
CREATE DATABASE IF NOT EXISTS fitness_db;

-- Use fitness_db --
USE fitness_db;

-- See database in use --
SELECT DATABASE();

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE workout (
    id INT AUTO_INCREMENT PRIMARY KEY,
    workout VARCHAR(255) NOT NULL,
    weight INT NOT NULL,
    reps INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

-- commenting this section out for now
-- CREATE TABLE supplements (
--    id INT AUTO_INCREMENT PRIMARY KEY,
--    user_id INT NOT NULL,
--    supplement_name VARCHAR(100) NOT NULL,
--    intake_date DATE NOT NULL,
--    quantity FLOAT,
--    FOREIGN KEY (user_id) REFERENCES user(id)
-- );