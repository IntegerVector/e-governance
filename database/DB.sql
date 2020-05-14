SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE USER 'eg-user'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
GRANT SELECT, INSERT, UPDATE ON egovernance.* TO 'eg-user'@'localhost';


CREATE DATABASE IF NOT EXISTS `egovernance` DEFAULT CHARACTER SET cp1251 COLLATE cp1251_general_ci;
USE `egovernance`;

DROP TABLE IF EXISTS `Permissions`;
CREATE TABLE `Permissions` (
  `permissionId` int PRIMARY KEY AUTO_INCREMENT,
  `permission` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

TRUNCATE TABLE `Permissions`;

INSERT INTO `Permissions` (`permissionId`, `permission`) VALUES
(1, 'ReadDocs'),
(2, 'ReadUsers'),
(3, 'UploadDocs'),
(4, 'AddUser'),
(5, 'UpdateUser'),
(6, 'UpdateYourself'),
(7, 'DeleteUser'),
(8, 'DeleteDocs'),
(9, 'GrantPermissions');

-- --------------------------------------------------------

DROP TABLE IF EXISTS `UserType`;
CREATE TABLE `UserType` (
  `userTypeId` int PRIMARY KEY AUTO_INCREMENT,
  `type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

TRUNCATE TABLE `UserType`;

INSERT INTO `UserType` (`userTypeId`, `type`) VALUES
(1, 'user'),
(2, 'administrator');

-- --------------------------------------------------------

DROP TABLE IF EXISTS `UserStatus`;
CREATE TABLE `UserStatus` (
  `userStatusId` int PRIMARY KEY AUTO_INCREMENT,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

TRUNCATE TABLE `UserStatus`;

INSERT INTO `UserStatus` (`userStatusId`, `status`) VALUES
(1, 'Active'),
(2, 'Banned'),
(3, 'Deleted');

-- --------------------------------------------------------

DROP TABLE IF EXISTS `UserTypePermissions`;
CREATE TABLE `UserTypePermissions` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `userTypeId` int NOT NULL,
  `permissionId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

TRUNCATE TABLE `UserTypePermissions`;

INSERT INTO `UserTypePermissions` (`id`, `userTypeId`, `permissionId`) VALUES
(1, 2, 1),
(2, 2, 2),
(3, 2, 3),
(4, 2, 4),
(5, 2, 5),
(6, 2, 6),
(7, 2, 7),
(8, 2, 8),
(9, 2, 9),
(10, 1, 1),
(11, 1, 3),
(12, 1, 6);

-- --------------------------------------------------------

DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `userId` int PRIMARY KEY AUTO_INCREMENT,
  `userToken` varchar(64) NOT NULL,
  `userFirstName` varchar(50) NOT NULL,
  `userLastName` varchar(50) NOT NULL,
  `userPatronymic` varchar(50) NOT NULL,
  `userPhoneNumber` varchar(15),
  `userSPhoneNumber` varchar(15),
  `userEmail` varchar(100),
  `userSEmail` varchar(100),
  `userBirthDate` char(10) NOT NULL,
  `userTypeId` int NOT NULL,
  `userStatusId` int NOT NULL,
  `sys_AddedBy` int,
  `sys_AddedDate` char(10),
  `sys_UpdatedDate` char(10),
  `sys_UpdatedBy` int,
  `sys_DeletedBy` int,
  `sys_DeletedDate` char(10),
  `validFrom` char(10) NOT NULL,
  `validTo` char(10),
  `userDataId` int
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;


TRUNCATE TABLE `User`;

INSERT INTO `User` (`userId`, `userToken`, `userFirstName`, `userLastName`, `userPatronymic`, `userPhoneNumber`, `userSPhoneNumber`, `userEmail`, `userSEmail`, `userBirthDate`, `userTypeId`, `userStatusId`, `sys_AddedBy`, `sys_AddedDate`, `sys_UpdatedDate`, `sys_UpdatedBy`, `sys_DeletedBy`, `sys_DeletedDate`, `validFrom`, `validTo`, `userDataId`) VALUES
(1, 'MzQ1MDk4MzQ1MTIzNjc4OTg3MzQ1MTIzNTY3NjU0MDk4MTIzNTY3MTIzNTY3ODkw', 'Just', 'Admin', 'NoName', '123123123', NULL, 'example@mail.org', NULL, '1970-01-01', 2, 1, NULL, NULL, NULL, NULL, NULL, NULL, '1970-01-01', NULL, 1);

-- --------------------------------------------------------

DROP TABLE IF EXISTS `UserData`;
CREATE TABLE `UserData` (
  `userDataId` int PRIMARY KEY AUTO_INCREMENT,
  `login` varchar(32) NOT NULL,
  `pass` varchar(1000) NOT NULL,
  `profilePicturePath` char(64),
  `userDocumentsId` int
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

INSERT INTO `UserData` (`userDataId`, `login`, `pass`, `profilePicturePath`, `userDocumentsId`) VALUES
(1, 'admin', '$2b$10$TGPsUycXjhQe37cGedauL.8twG1u5wiNlEhg8Ycz.ZohWQVkHhDYq', '/files/user-data', NULL);

-- --------------------------------------------------------

DROP TABLE IF EXISTS `DocumentTypes`;
CREATE TABLE `DocumentTypes` (
  `documentTypeId` int PRIMARY KEY AUTO_INCREMENT,
  `typeName` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

INSERT INTO `DocumentTypes` (`documentTypeId`, `typeName`) VALUES (1, 'PDF'), (2, 'CSV'), (3, 'HTML');

-- --------------------------------------------------------

DROP TABLE IF EXISTS `Documents`;
CREATE TABLE `Documents` (
  `documentId` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `path` varchar(200) NOT NULL,
  `documentType` int NOT NULL,
  `sys_AddedBy` int,
  `sys_AddedDate` char(10),
  `sys_UpdatedDate` char(10),
  `sys_UpdatedBy` int,
  `sys_DeletedBy` int,
  `sys_DeletedDate` char(10)
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

INSERT INTO `Documents` (`documentId`, `name`, `path`, `documentType`, `sys_AddedBy`, `sys_AddedDate`, `sys_UpdatedBy`, `sys_UpdatedDate`, `sys_DeletedBy`, `sys_DeletedDate`) VALUES
(1, 'Academic Vacation Template', '/files/documents/acad_vacation_template.html', 3, 1, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

DROP TABLE IF EXISTS `UsersDocuments`;
CREATE TABLE `UsersDocuments` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `userDataId` int NOT NULL,
  `documentId` int NOT NULL,
  `needsActions` BOOLEAN NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

INSERT INTO `UsersDocuments` (`id`, `userDataId`, `documentId`, `needsActions`) VALUES
(1, 1, 1, false);

-- --------------------------------------------------------

ALTER TABLE `Permissions` AUTO_INCREMENT=10;
ALTER TABLE `UserType` AUTO_INCREMENT=10;
ALTER TABLE `UserStatus` AUTO_INCREMENT=10;
ALTER TABLE `UserTypePermissions` AUTO_INCREMENT=20;
ALTER TABLE `User` AUTO_INCREMENT=10;
ALTER TABLE `UserData` AUTO_INCREMENT=10;
ALTER TABLE `DocumentTypes` AUTO_INCREMENT=10;
ALTER TABLE `Documents` AUTO_INCREMENT=10;
ALTER TABLE `UsersDocuments` AUTO_INCREMENT=10;


ALTER TABLE `UserTypePermissions`
  ADD CONSTRAINT `ut_fk` FOREIGN KEY (`userTypeId`) REFERENCES `UserType` (`userTypeId`),
  ADD CONSTRAINT `p_fk` FOREIGN KEY (`permissionId`) REFERENCES `Permissions` (`permissionId`);

ALTER TABLE `User`
  ADD CONSTRAINT `ut2_fk` FOREIGN KEY (`userTypeId`) REFERENCES `UserType` (`userTypeId`),
  ADD CONSTRAINT `us_fk` FOREIGN KEY (`userStatusId`) REFERENCES `UserStatus` (`userStatusId`),
  ADD CONSTRAINT `ud_fk` FOREIGN KEY (`userDataId`) REFERENCES `UserData` (`userDataId`);

ALTER TABLE `Documents`
  ADD CONSTRAINT `dt_fk` FOREIGN KEY (`documentType`) REFERENCES `DocumentTypes` (`documentTypeId`);

ALTER TABLE `UsersDocuments`
  ADD CONSTRAINT `udi_fk` FOREIGN KEY (`userDataId`) REFERENCES `UserData` (`userDataId`),
  ADD CONSTRAINT `di_fk` FOREIGN KEY (`documentId`) REFERENCES `Documents` (`documentId`);

-- To Do: extend UserData table with additional data

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;