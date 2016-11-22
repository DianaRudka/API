-- phpMyAdmin SQL Dump
-- version 4.6.4deb1+deb.cihar.com~xenial.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Czas generowania: 22 Lis 2016, 10:13
-- Wersja serwera: 5.7.16-0ubuntu0.16.04.1
-- Wersja PHP: 7.0.8-0ubuntu0.16.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `test`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `books`
--

CREATE TABLE `books` (
  `id` int(10) NOT NULL,
  `author` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `book_desc` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `books`
--

INSERT INTO `books` (`id`, `author`, `name`, `book_desc`) VALUES
(1, 'Henryk Sienkiewicz', 'Potop', NULL),
(2, 'Henryk Sienkiewicz', 'Ogniem i mieczem', NULL),
(3, 'Robin Cook', 'Uprowadzenie', 'sf'),
(4, 'Robin Cook', 'Coma', 'Thriller medyczny'),
(22, 'Jo Nesbo', 'Pentagram', 'Kryminał skandynawski'),
(28, 'Jo Nesbo', 'Czerwone gardło', 'Kryminał skandynawski'),
(29, 'C.S. Lewis', 'Opowieści z Narni', 'Dla dzieci'),
(30, 'James Patterson', 'Kolekcjoner', 'Thriller'),
(31, 'Thomas Harris', 'Milczenie owiec', 'Kryminał'),
(32, 'JK Rowling', 'Harry Potter i insygnia śmierci', 'ostatnie książka o Harrym Potterze'),
(34, 'Paula Howkins', 'Dziewczyna z pociągu', 'kryminał brytyjski'),
(35, 'J.R.R Tolkien', 'Hobbit', 'książka o hobbicie'),
(36, 'J.R.R Tolkien', 'Władca pierścieni', 'Wycieczka w poszukiwaniu pierścienia');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `books`
--
ALTER TABLE `books`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
