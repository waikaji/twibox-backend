-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.10.2-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table twibox.campaigns
CREATE TABLE IF NOT EXISTS `campaigns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `title` varchar(100) DEFAULT '',
  `description` text DEFAULT '',
  `image_filename` text DEFAULT '',
  `url` text DEFAULT '',
  `downloader` int(11) DEFAULT 0,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table twibox.campaigns: ~4 rows (approximately)
/*!40000 ALTER TABLE `campaigns` DISABLE KEYS */;
INSERT INTO `campaigns` (`id`, `id_user`, `title`, `description`, `image_filename`, `url`, `downloader`, `created_at`, `updated_at`) VALUES
	(1, 5, 'Twibbon 1', 'Hello Everyone', 'a59e46cc2929ea496fca460580e55005.png', 'http://localhost:1000/frame/a59e46cc2929ea496fca460580e55005.png', 2, '2022-12-10', '2022-12-10'),
	(2, 5, 'Twibbon 2', 'Hello Everyone', '756c4139af646d11b63f2a22ba9fbe9a.png', 'http://localhost:1000/frame/756c4139af646d11b63f2a22ba9fbe9a.png', 0, '2022-12-10', '2022-12-10'),
	(3, 5, 'Twibbon 3', 'Hello Everyone', '13c97d64513b6da49ecc761d72b031fe.png', 'http://localhost:1000/frame/13c97d64513b6da49ecc761d72b031fe.png', 0, '2022-12-10', '2022-12-10'),
	(4, 5, 'Twibbon 4', 'Hello Everyone', 'be2e6ae3f92828e5f34e61c1b968373e.png', 'http://localhost:1000/frame/be2e6ae3f92828e5f34e61c1b968373e.png', 0, '2022-12-11', '2022-12-11');
/*!40000 ALTER TABLE `campaigns` ENABLE KEYS */;

-- Dumping structure for table twibox.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `image_filename` text DEFAULT '',
  `url` text DEFAULT '',
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table twibox.users: ~1 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `email`, `password`, `image_filename`, `url`, `created_at`, `updated_at`) VALUES
	(5, 'wira', 'wira@gmail.com', '$2b$10$BTiy3M8n41vHH2Ue4IYUfOcqpQJ3eFvJzX3LmvRZcoOxzz512UG0m', '07afcca825f5ba705a7f9b25b24dfd4e.jpg', 'http://localhost:1000/avatar/07afcca825f5ba705a7f9b25b24dfd4e.jpg', '2022-12-10', '2022-12-11');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
