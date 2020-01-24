# HARMONI - Scrum team 2

Harmoni er en nettbasert applikasjon for å samle informasjon om arrangementer, slik at arrangører, artister og publikum kan holde oversikt over tidspunkter, artister, personale, billetter og mer.

## Oppsett:

Når man første gang skal kjøre applikasjonen, kjør:
npm install
i client mappen og i server mappen.

Så kjør følgende SQL på databasen du vil bruke:

```sql

DROP TABLE IF EXISTS `schedule`;
DROP TABLE IF EXISTS `rider`;
DROP TABLE IF EXISTS `misc_file`;
DROP TABLE IF EXISTS `event_artist`;
DROP TABLE IF EXISTS `event_ticket`;
DROP TABLE IF EXISTS `event_organiser`;
DROP TABLE IF EXISTS `event_volunteer`;
DROP TABLE IF EXISTS `event`;
DROP TABLE IF EXISTS `location`;
DROP TABLE IF EXISTS `artist`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `volunteer_type`;
DROP TABLE IF EXISTS `ticket_type`;
DROP TABLE IF EXISTS `organiser`;
DROP TABLE IF EXISTS `admin`;


CREATE TABLE IF NOT EXISTS `user`(
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `hash` VARCHAR(60) NULL DEFAULT NULL,
  `salt` VARCHAR(30) NULL DEFAULT NULL,
  `name` VARCHAR(60) NULL DEFAULT NULL,
  `tlf` VARCHAR(45) NULL DEFAULT NULL,
  `image` VARCHAR(200) NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `email` (`email` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE TABLE IF NOT EXISTS `artist`(
  `user_id` INT(11) NOT NULL,
  `artist_name` VARCHAR(60) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_artist_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE TABLE IF NOT EXISTS `location`(
  `location_id` INT(11) NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(100) NULL DEFAULT NULL,
  `name` VARCHAR(100) NOT NULL,
  `postcode` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`location_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE TABLE IF NOT EXISTS `event`(
  `event_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(60) NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `image` VARCHAR(200) NULL DEFAULT NULL,
  `start` DATETIME NULL DEFAULT NULL,
  `status` TEXT NULL DEFAULT NULL,
  `is_public` TINYINT(1) NOT NULL DEFAULT '0',
  `location_id` INT(11) NULL DEFAULT NULL,
  `venue` VARCHAR(60) NULL DEFAULT NULL,
  `end` DATETIME NULL DEFAULT NULL,
  `cancel` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`event_id`),
  INDEX `fk_event_location_idx` (`location_id` ASC) ,
  CONSTRAINT `fk_event_location`
    FOREIGN KEY (`location_id`)
    REFERENCES `location` (`location_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE TABLE IF NOT EXISTS `event_artist`(
  `event_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `contract` VARCHAR(200) NULL DEFAULT NULL,
  `notes` TEXT NULL DEFAULT NULL,
  `accepted` TINYINT(1) NULL DEFAULT '0',
  PRIMARY KEY (`event_id`, `user_id`),
  INDEX `fk_artist_has_event_event1_idx` (`event_id` ASC) ,
  INDEX `fk_event_artists_artist1_idx` (`user_id` ASC) ,
  CONSTRAINT `fk_artist_has_event_event1`
    FOREIGN KEY (`event_id`)
    REFERENCES `event` (`event_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_event_artists_artist1`
    FOREIGN KEY (`user_id`)
    REFERENCES `artist` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE TABLE IF NOT EXISTS `organiser`(
  `organiser_id` INT(11) NOT NULL AUTO_INCREMENT,
  `organiser_email` VARCHAR(100) NOT NULL,
  `name` VARCHAR(60) NOT NULL,
  `image` VARCHAR(200) NULL DEFAULT NULL,
  `description` VARCHAR(200) NULL DEFAULT NULL,
  `tlf` VARCHAR(45) NULL DEFAULT NULL,
  `website` VARCHAR(200) NULL DEFAULT NULL,
  `address` VARCHAR(100) NULL DEFAULT NULL,
  `hash` VARCHAR(60) NOT NULL,
  `salt` VARCHAR(30) NOT NULL,
  `verified` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`organiser_id`),
  UNIQUE INDEX `organiser_email` (`organiser_email` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE TABLE IF NOT EXISTS `event_organiser`(
  `event_id` INT(11) NOT NULL,
  `organiser_id` INT(11) NOT NULL,
  PRIMARY KEY (`event_id`, `organiser_id`),
  INDEX `fk_event_has_organiser_organiser1_idx` (`organiser_id` ASC) ,
  INDEX `fk_event_has_organiser_event1_idx` (`event_id` ASC) ,
  CONSTRAINT `fk_event_has_organiser_event1`
    FOREIGN KEY (`event_id`)
    REFERENCES `event` (`event_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_event_has_organiser_organiser1`
    FOREIGN KEY (`organiser_id`)
    REFERENCES `organiser` (`organiser_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE TABLE IF NOT EXISTS `ticket_type`(
  `ticket_type_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(60) NOT NULL,
  `description` VARCHAR(200) NULL DEFAULT NULL,
  `organiser_id` INT(11) NOT NULL,
  PRIMARY KEY (`ticket_type_id`),
  INDEX `fk_ticket_type_organiser1_idx` (`organiser_id` ASC) ,
  CONSTRAINT `fk_ticket_type_organiser1`
    FOREIGN KEY (`organiser_id`)
    REFERENCES `organiser` (`organiser_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE TABLE IF NOT EXISTS `event_ticket`(
  `event_id` INT(11) NOT NULL,
  `ticket_type_id` INT(11) NOT NULL,
  `price` INT(11) NULL DEFAULT NULL,
  `amount` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`event_id`, `ticket_type_id`),
  INDEX `fk_event_has_ticket_type_ticket_type1_idx` (`ticket_type_id` ASC) ,
  INDEX `fk_event_has_ticket_type_event1_idx` (`event_id` ASC) ,
  CONSTRAINT `fk_event_has_ticket_type_event1`
    FOREIGN KEY (`event_id`)
    REFERENCES `event` (`event_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_event_has_ticket_type_ticket_type1`
    FOREIGN KEY (`ticket_type_id`)
    REFERENCES `ticket_type` (`ticket_type_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE TABLE IF NOT EXISTS `volunteer_type`(
  `volunteer_type_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `organiser_id` INT(11) NOT NULL,
  PRIMARY KEY (`volunteer_type_id`, `organiser_id`),
  INDEX `fk_volunteer_type_organiser1_idx` (`organiser_id` ASC) ,
  CONSTRAINT `fk_volunteer_type_organiser1`
    FOREIGN KEY (`organiser_id`)
    REFERENCES `organiser` (`organiser_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE TABLE IF NOT EXISTS `event_volunteer` (
  `user_id` INT(11) NOT NULL,
  `event_id` INT(11) NOT NULL,
  `volunteer_type_id` INT(11) NOT NULL,
  PRIMARY KEY (`user_id`, `event_id`, `volunteer_type_id`),
  INDEX `fk_user_has_event_event1_idx` (`event_id` ASC) ,
  INDEX `fk_user_has_event_user1_idx` (`user_id` ASC) ,
  INDEX `fk_event_vaulenteers_volunteer_type1_idx` (`volunteer_type_id` ASC) ,
  CONSTRAINT `fk_event_vaulenteers_volunteer_type1`
    FOREIGN KEY (`volunteer_type_id`)
    REFERENCES `volunteer_type` (`volunteer_type_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_has_event_event1`
    FOREIGN KEY (`event_id`)
    REFERENCES `event` (`event_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_has_event_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE TABLE IF NOT EXISTS `misc_file` (
  `file_id` INT(11) NOT NULL,
  `file` VARCHAR(200) NULL DEFAULT NULL,
  `event_id` INT(11) NOT NULL,
  PRIMARY KEY (`file_id`),
  INDEX `fk_misc_files_event1_idx` (`event_id` ASC) ,
  CONSTRAINT `fk_misc_files_event1`
    FOREIGN KEY (`event_id`)
    REFERENCES `event` (`event_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE TABLE IF NOT EXISTS `rider` (
  `rider_id` INT(11) NOT NULL AUTO_INCREMENT,
  `rider_file` VARCHAR(200) NOT NULL,
  `event_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`rider_id`),
  INDEX `fk_rider_event_artists1_idx` (`event_id` ASC, `user_id` ASC) ,
  CONSTRAINT `fk_rider_event_artists1`
    FOREIGN KEY (`event_id` , `user_id`)
    REFERENCES `event_artist` (`event_id` , `user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE TABLE IF NOT EXISTS `schedule` (
  `schedule_id` INT(11) NOT NULL AUTO_INCREMENT,
  `task` TEXT NOT NULL,
  `time` DATETIME NOT NULL,
  `event_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`schedule_id`, `event_id`, `user_id`),
  INDEX `fk_schedule_event_artists1_idx` (`event_id` ASC, `user_id` ASC) ,
  CONSTRAINT `fk_schedule_event_artists1`
    FOREIGN KEY (`event_id` , `user_id`)
    REFERENCES `event_artist` (`event_id` , `user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


CREATE TABLE IF NOT EXISTS `admin` (
  `admin_id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `hash` VARCHAR(60) NULL DEFAULT NULL,
  `salt` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE INDEX `email` (`email` ASC)
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- Lager admin bruker med epost og passord (admin@harmoni.com, ertertert)
INSERT INTO admin(email, hash, salt) VALUES ('admin@harmoni.com', '$2a$10$DMmirWNz2wh9WjnGHTCkquLagqBHzjZEVphp0be3KwM1X6suN6cQy', '$2a$10$DMmirWNz2wh9WjnGHTCkqu');

```

## Kjøre klienten:
Fra hovedmappen:

```sh
cd Client
npm install
npm start 
```

## Kjøre serveren: 
Serverkoden kreven en mysql-database for å kjøre.
Endre dataene i Server/src/config/dbCredentials.js til en mysql-database du har tilgang til.

 Fra hovedmappen:

  ```sh
  cd Server
  npm install
  npm start 
  ```

## Åpne applikasjon:
http://localhost:3000

Advarsel: Prosjektet er bare testet i nettleserene Chrome og Firefox.