SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `egovernance` DEFAULT CHARACTER SET cp1251 COLLATE cp1251_general_ci;
USE `egovernance`;

DROP TABLE IF EXISTS `Permissions`;
CREATE TABLE `Permissions` (
  `permissionId` int(11) NOT NULL,
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
  `userTypeId` int(11) NOT NULL,
  `type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

TRUNCATE TABLE `UserType`;

INSERT INTO `UserType` (`userTypeId`, `type`) VALUES
(1, 'user'),
(2, 'administrator');

-- --------------------------------------------------------

DROP TABLE IF EXISTS `UserStatus`;
CREATE TABLE `UserStatus` (
  `userStatusId` int(11) NOT NULL,
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
  `id` int(11) NOT NULL,
  `userTypeId` int(11) NOT NULL,
  `permissionId` int(11) NOT NULL
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
  `userId` int(11) NOT NULL,
  `userToken` varchar(64) NOT NULL,
  `userFirstName` varchar(50) NOT NULL,
  `userLastName` varchar(50) NOT NULL,
  `userPatronymic` varchar(50) NOT NULL,
  `userPhoneNumber` varchar(15),
  `userSPhoneNumber` varchar(15),
  `userEmail` varchar(100),
  `userSEmail` varchar(100),
  `userBirthDate` date NOT NULL,
  `userTypeId` int(11) NOT NULL,
  `userStatusId` int(11) NOT NULL,
  `sys_AddedBy` int(11),
  `sys_AddedDate` date,
  `sys_UpdatedDate` date,
  `sys_UpdatedBy` int(11),
  `sys_DeletedBy` int(11),
  `sys_DeletedDate` date,
  `validFrom` date NOT NULL,
  `validTo` date,
  `documentDataId` int(11)
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;


TRUNCATE TABLE `User`;

INSERT INTO `User` (`userId`, `userToken`, `userFirstName`, `userLastName`, `userPatronymic`, `userPhoneNumber`, `userSPhoneNumber`, `userEmail`, `userSEmail`, `userBirthDate`, `userTypeId`, `userStatusId`, `sys_AddedBy`, `sys_AddedDate`, `sys_UpdatedDate`, `sys_UpdatedBy`, `sys_DeletedBy`, `sys_DeletedDate`, `validFrom`, `validTo`, `documentDataId`) VALUES
(0, 'MzQ1MDk4MzQ1MTIzNjc4OTg3MzQ1MTIzNTY3NjU0MDk4MTIzNTY3MTIzNTY3ODkw', 'Андрій', 'Рубан', 'Миколайович', '123123123', NULL, 'andrii.ruban@nure.ua', NULL, '1998-12-25', 2, 1, NULL, NULL, NULL, NULL, NULL, NULL, '2020-01-01', NULL, 0);

-- --------------------------------------------------------

DROP TABLE IF EXISTS `UserData`;
CREATE TABLE `UserData` (
  `userDataId` int(11) NOT NULL,
  `login` varchar(32) NOT NULL,
  `pass` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

INSERT INTO `UserData` (`userDataId`, `login`, `pass`) VALUES
(0, 'admin', 'admin');

-- Adding Primary keys:

ALTER TABLE `Permissions` ADD PRIMARY KEY (`permissionId`);
ALTER TABLE `UserType` ADD PRIMARY KEY (`userTypeId`);
ALTER TABLE `UserStatus` ADD PRIMARY KEY (`userStatusId`);
ALTER TABLE `UserTypePermissions` ADD PRIMARY KEY (`id`);
ALTER TABLE `User` ADD PRIMARY KEY (`userId`);
ALTER TABLE `UserData` ADD PRIMARY KEY (`userDataId`);

-- Adding Foreign keys:

ALTER TABLE `UserTypePermissions`
  ADD CONSTRAINT `ut_fk` FOREIGN KEY (`userTypeId`) REFERENCES `UserType` (`userTypeId`),
  ADD CONSTRAINT `p_fk` FOREIGN KEY (`permissionId`) REFERENCES `Permissions` (`permissionId`);

ALTER TABLE `User`
  ADD CONSTRAINT `ut2_fk` FOREIGN KEY (`userTypeId`) REFERENCES `UserType` (`userTypeId`),
  ADD CONSTRAINT `us_fk` FOREIGN KEY (`userStatusId`) REFERENCES `UserStatus` (`userStatusId`),
  ADD CONSTRAINT `ud_fk` FOREIGN KEY (`documentDataId`) REFERENCES `UserData` (`userDataId`);

-- To Do: extend UserData table with additional data

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;