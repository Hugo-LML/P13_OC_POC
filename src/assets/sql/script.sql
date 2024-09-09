CREATE TABLE `USER` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastname` VARCHAR(100) NOT NULL,
  `firstname` VARCHAR(100) NOT NULL,
  `birthdate` DATE NOT NULL,
  `address` VARCHAR(255) NOT NULL
);

CREATE TABLE `AGENCY` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `address` VARCHAR(255) NOT NULL
);

CREATE TABLE `CATEGORY` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL
);

CREATE TABLE `VEHICLE` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `category_id` INT,
  `brand` VARCHAR(50) NOT NULL,
  `model` VARCHAR(50) NOT NULL,
  `numberplate` VARCHAR(20) NOT NULL,
  FOREIGN KEY (`category_id`) REFERENCES CATEGORY(`id`)
);

CREATE TABLE `OFFER` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `agency_start_id` INT,
  `agency_end_id` INT,
  `category_id` INT,
  `date_start` DATETIME NOT NULL,
  `date_end` DATETIME NOT NULL,
  `price` VARCHAR(255) NOT NULL,
  FOREIGN KEY (`agency_start_id`) REFERENCES AGENCY(`id`),
  FOREIGN KEY (`agency_end_id`) REFERENCES AGENCY(`id`),
  FOREIGN KEY (`category_id`) REFERENCES CATEGORY(`id`)
);

CREATE TABLE `LOCATION` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT,
  `agency_start_id` INT,
  `agency_end_id` INT,
  `vehicle_id` INT,
  `date_start` DATETIME NOT NULL,
  `date_end` DATETIME NOT NULL,
  `price` VARCHAR(255) NOT NULL,
  `state` ENUM('reserved', 'ongoing', 'completed', 'cancelled') NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES User(`id`),
  FOREIGN KEY (`agency_start_id`) REFERENCES AGENCY(`id`),
  FOREIGN KEY (`agency_end_id`) REFERENCES AGENCY(`id`),
  FOREIGN KEY (`vehicle_id`) REFERENCES VEHICLE(`id`)
);