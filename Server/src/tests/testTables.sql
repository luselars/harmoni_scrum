-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0;
SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE =
        'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema supertestdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema supertestdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `supertestdb` DEFAULT CHARACTER SET latin1;
USE `supertestdb`;

-- -----------------------------------------------------
-- Table `supertestdb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `supertestdb`.`user`
(
    `user_id`     INT(11)      NOT NULL AUTO_INCREMENT,
    `email`       VARCHAR(100) NULL DEFAULT NULL,
    `hash`        VARCHAR(60)  NULL DEFAULT NULL,
    `salt`        VARCHAR(30)  NULL DEFAULT NULL,
    `name`        VARCHAR(60)  NULL DEFAULT NULL,
    `tlf`         VARCHAR(45)  NULL DEFAULT NULL,
    `image`       VARCHAR(200) NULL DEFAULT NULL,
    `description` TEXT         NULL DEFAULT NULL,
    PRIMARY KEY (`user_id`),
    UNIQUE INDEX `email` (`email` ASC)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 90
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `supertestdb`.`artist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `supertestdb`.`artist`
(
    `user_id`     INT(11)     NOT NULL,
    `artist_name` VARCHAR(60) NULL DEFAULT NULL,
    PRIMARY KEY (`user_id`),
    CONSTRAINT `fk_artist_user1`
        FOREIGN KEY (`user_id`)
            REFERENCES `supertestdb`.`user` (`user_id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `supertestdb`.`location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `supertestdb`.`location`
(
    `location_id` INT(11)      NOT NULL AUTO_INCREMENT,
    `address`     VARCHAR(100) NULL DEFAULT NULL,
    `name`        VARCHAR(100) NOT NULL,
    `postcode`    INT(11)      NULL DEFAULT NULL,
    PRIMARY KEY (`location_id`)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 15
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `supertestdb`.`event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `supertestdb`.`event`
(
    `event_id`    INT(11)      NOT NULL AUTO_INCREMENT,
    `name`        VARCHAR(60)  NULL     DEFAULT NULL,
    `description` TEXT         NULL     DEFAULT NULL,
    `image`       VARCHAR(200) NULL     DEFAULT NULL,
    `start`       DATETIME     NULL     DEFAULT NULL,
    `status`      TEXT         NULL     DEFAULT NULL,
    `is_public`   TINYINT(4)   NOT NULL DEFAULT '0',
    `location_id` INT(11)      NULL     DEFAULT NULL,
    `venue`       VARCHAR(60)  NULL     DEFAULT NULL,
    `end`         DATETIME     NULL     DEFAULT NULL,
    PRIMARY KEY (`event_id`),
    INDEX `fk_event_location_idx` (`location_id` ASC),
    CONSTRAINT `fk_event_location`
        FOREIGN KEY (`location_id`)
            REFERENCES `supertestdb`.`location` (`location_id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 157
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `supertestdb`.`event_artist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `supertestdb`.`event_artist`
(
    `event_id` INT(11)      NOT NULL,
    `user_id`  INT(11)      NOT NULL,
    `contract` VARCHAR(200) NULL DEFAULT NULL,
    `notes`    TEXT         NULL DEFAULT NULL,
    `accepted` TINYINT(1)   NULL DEFAULT '0',
    PRIMARY KEY (`event_id`, `user_id`),
    INDEX `fk_artist_has_event_event1_idx` (`event_id` ASC),
    INDEX `fk_event_artists_artist1_idx` (`user_id` ASC),
    CONSTRAINT `fk_artist_has_event_event1`
        FOREIGN KEY (`event_id`)
            REFERENCES `supertestdb`.`event` (`event_id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    CONSTRAINT `fk_event_artists_artist1`
        FOREIGN KEY (`user_id`)
            REFERENCES `supertestdb`.`artist` (`user_id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `supertestdb`.`organiser`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `supertestdb`.`organiser`
(
    `organiser_id`    INT(11)      NOT NULL AUTO_INCREMENT,
    `organiser_email` VARCHAR(100) NOT NULL,
    `name`            VARCHAR(60)  NOT NULL,
    `image`           VARCHAR(200) NULL DEFAULT NULL,
    `description`     VARCHAR(200) NULL DEFAULT NULL,
    `tlf`             VARCHAR(45)  NULL DEFAULT NULL,
    `website`         VARCHAR(200) NULL DEFAULT NULL,
    `address`         VARCHAR(100) NULL DEFAULT NULL,
    `hash`            VARCHAR(60)  NOT NULL,
    `salt`            VARCHAR(30)  NOT NULL,
    PRIMARY KEY (`organiser_id`),
    UNIQUE INDEX `organiser_email` (`organiser_email` ASC)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 26
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `supertestdb`.`event_organiser`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `supertestdb`.`event_organiser`
(
    `event_id`     INT(11) NOT NULL,
    `organiser_id` INT(11) NOT NULL,
    PRIMARY KEY (`event_id`, `organiser_id`),
    INDEX `fk_event_has_organiser_organiser1_idx` (`organiser_id` ASC),
    INDEX `fk_event_has_organiser_event1_idx` (`event_id` ASC),
    CONSTRAINT `fk_event_has_organiser_event1`
        FOREIGN KEY (`event_id`)
            REFERENCES `supertestdb`.`event` (`event_id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    CONSTRAINT `fk_event_has_organiser_organiser1`
        FOREIGN KEY (`organiser_id`)
            REFERENCES `supertestdb`.`organiser` (`organiser_id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `supertestdb`.`ticket_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `supertestdb`.`ticket_type`
(
    `ticket_type_id` INT(11)      NOT NULL AUTO_INCREMENT,
    `name`           VARCHAR(60)  NOT NULL,
    `description`    VARCHAR(200) NULL DEFAULT NULL,
    `organiser_id`   INT(11)      NOT NULL,
    PRIMARY KEY (`ticket_type_id`),
    INDEX `fk_ticket_type_organiser1_idx` (`organiser_id` ASC),
    CONSTRAINT `fk_ticket_type_organiser1`
        FOREIGN KEY (`organiser_id`)
            REFERENCES `supertestdb`.`organiser` (`organiser_id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 2
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `supertestdb`.`event_ticket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `supertestdb`.`event_ticket`
(
    `event_id`       INT(11) NOT NULL,
    `ticket_type_id` INT(11) NOT NULL,
    `price`          INT(11) NULL DEFAULT NULL,
    PRIMARY KEY (`event_id`, `ticket_type_id`),
    INDEX `fk_event_has_ticket_type_ticket_type1_idx` (`ticket_type_id` ASC),
    INDEX `fk_event_has_ticket_type_event1_idx` (`event_id` ASC),
    CONSTRAINT `fk_event_has_ticket_type_event1`
        FOREIGN KEY (`event_id`)
            REFERENCES `supertestdb`.`event` (`event_id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    CONSTRAINT `fk_event_has_ticket_type_ticket_type1`
        FOREIGN KEY (`ticket_type_id`)
            REFERENCES `supertestdb`.`ticket_type` (`ticket_type_id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `supertestdb`.`volunteer_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `supertestdb`.`volunteer_type`
(
    `volunteer_type_id` INT(11)      NOT NULL AUTO_INCREMENT,
    `name`              VARCHAR(100) NOT NULL,
    `organiser_id`      INT(11)      NOT NULL,
    PRIMARY KEY (`volunteer_type_id`, `organiser_id`),
    INDEX `fk_volunteer_type_organiser1_idx` (`organiser_id` ASC),
    CONSTRAINT `fk_volunteer_type_organiser1`
        FOREIGN KEY (`organiser_id`)
            REFERENCES `supertestdb`.`organiser` (`organiser_id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `supertestdb`.`event_volunteer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `supertestdb`.`event_volunteer`
(
    `user_id`           INT(11) NOT NULL,
    `event_id`          INT(11) NOT NULL,
    `volunteer_type_id` INT(11) NOT NULL,
    PRIMARY KEY (`user_id`, `event_id`, `volunteer_type_id`),
    INDEX `fk_user_has_event_event1_idx` (`event_id` ASC),
    INDEX `fk_user_has_event_user1_idx` (`user_id` ASC),
    INDEX `fk_event_vaulenteers_volunteer_type1_idx` (`volunteer_type_id` ASC),
    CONSTRAINT `fk_event_vaulenteers_volunteer_type1`
        FOREIGN KEY (`volunteer_type_id`)
            REFERENCES `supertestdb`.`volunteer_type` (`volunteer_type_id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    CONSTRAINT `fk_user_has_event_event1`
        FOREIGN KEY (`event_id`)
            REFERENCES `supertestdb`.`event` (`event_id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    CONSTRAINT `fk_user_has_event_user1`
        FOREIGN KEY (`user_id`)
            REFERENCES `supertestdb`.`user` (`user_id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `supertestdb`.`misc_file`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `supertestdb`.`misc_file`
(
    `file_id`  INT(11)      NOT NULL,
    `file`     VARCHAR(200) NULL DEFAULT NULL,
    `event_id` INT(11)      NOT NULL,
    PRIMARY KEY (`file_id`),
    INDEX `fk_misc_files_event1_idx` (`event_id` ASC),
    CONSTRAINT `fk_misc_files_event1`
        FOREIGN KEY (`event_id`)
            REFERENCES `supertestdb`.`event` (`event_id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `supertestdb`.`rider`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `supertestdb`.`rider`
(
    `rider_id`   INT(11)      NOT NULL AUTO_INCREMENT,
    `rider_file` VARCHAR(200) NOT NULL,
    `event_id`   INT(11)      NOT NULL,
    `user_id`    INT(11)      NOT NULL,
    PRIMARY KEY (`rider_id`),
    INDEX `fk_rider_event_artists1_idx` (`event_id` ASC, `user_id` ASC),
    CONSTRAINT `fk_rider_event_artists1`
        FOREIGN KEY (`event_id`, `user_id`)
            REFERENCES `supertestdb`.`event_artist` (`event_id`, `user_id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `supertestdb`.`schedule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `supertestdb`.`schedule`
(
    `schedule_id` INT(11)  NOT NULL AUTO_INCREMENT,
    `task`        TEXT     NOT NULL,
    `time`        DATETIME NOT NULL,
    `event_id`    INT(11)  NOT NULL,
    `user_id`     INT(11)  NOT NULL,
    PRIMARY KEY (`schedule_id`, `event_id`, `user_id`),
    INDEX `fk_schedule_event_artists1_idx` (`event_id` ASC, `user_id` ASC),
    CONSTRAINT `fk_schedule_event_artists1`
        FOREIGN KEY (`event_id`, `user_id`)
            REFERENCES `supertestdb`.`event_artist` (`event_id`, `user_id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = latin1;


SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;
