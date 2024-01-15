-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jan 15, 2024 at 06:39 PM
-- Server version: 5.7.39
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ticketing`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `start_date` text NOT NULL,
  `end_date` text NOT NULL,
  `location` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `description`, `start_date`, `end_date`, `location`) VALUES
(1, 'WRC Latvia 2024', 'The first WRC stage to take place in Latvia this decade!', '2024-07-18T19:01', '2024-07-21T19:02', 'Riga, Latvia'),
(2, 'Idaunis', 'Olegs laikam idk', '2024-01-16T17:03', '2024-01-18T17:03', 'Valka, Valkas pilsēta, Valka Municipality, Latvia'),
(6, 'MISFITS X DAZON', 'DAZN Boxings crossover series promoted by Misfits which sees the worlds biggest names in social media, entertainment, and lifestyle headlining blockbuster fight nights', '2024-01-16T18:00', '2024-01-17T19:00', 'Vtdt, Cēsis, Cēsu pilsēta, Cēsis Municipality, Latvia'),
(7, 'Dakar Rally 2024', 'Car go vroom', '2024-04-28T17:00', '2024-04-28T19:00', 'Dakar.Desert, Vildosola, Villa de Seris, Hermosillo, Sonora, Mexico'),
(8, '24h of Lemans', 'Cars go vroom for a long time', '2024-06-15T17:00', '2024-06-16T17:00', 'Le Mans, France');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `ticketName` text NOT NULL,
  `ticketAmount` int(11) NOT NULL,
  `ticketPrice` int(11) NOT NULL,
  `eventID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `ticketName`, `ticketAmount`, `ticketPrice`, `eventID`) VALUES
(1, 'Day 1', 10, 15, 1),
(2, 'Day 2', 10, 15, 1),
(3, 'Day 3', 10, 15, 1),
(4, 'Day 4', 10, 15, 1),
(5, 'All days', 10, 45, 1),
(6, 'Pensionariem', 1, 10, 2),
(7, 'Skolniekiem', 18, 1, 2),
(8, '1', 1, 1, 4),
(9, '1', 1, 1, 5),
(10, '1', 1, 1, 6),
(11, '1', 1, 1, 7),
(12, '1', 1, 1, 8);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `verified` text NOT NULL,
  `role` enum('admin','organiser','user') NOT NULL,
  `token` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `verified`, `role`, `token`) VALUES
(1, 'admin', 'regnars.klavins@gmail.com', '$2y$10$uxuYxa6VCaA.njzFD2BoW.ZT96npIoeRm06OdPs7bh/eEeAuAgfGy', 'yes', 'admin', '68a641912f92c58645e06ee49dae5224962828b5b0ed033d5fd124b7a5edc885');

-- --------------------------------------------------------

--
-- Table structure for table `verification`
--

CREATE TABLE `verification` (
  `id` int(11) NOT NULL,
  `token` text NOT NULL,
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `verification`
--

INSERT INTO `verification` (`id`, `token`, `userID`) VALUES
(2, 'c7tyo3qGHVTsYbIr', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `verification`
--
ALTER TABLE `verification`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `verification`
--
ALTER TABLE `verification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
