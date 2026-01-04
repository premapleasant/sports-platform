CREATE DATABASE sports_platform;
USE sports_platform;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sport VARCHAR(50),
  league VARCHAR(100),
  teams VARCHAR(100),
  startTime VARCHAR(50)
);

CREATE TABLE favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  gameId INT,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (gameId) REFERENCES games(id)
);

INSERT INTO games (sport, league, teams, startTime) VALUES
('Cricket', 'IPL', 'CSK vs MI', '2026-01-05 19:30'),
('Football', 'EPL', 'Arsenal vs Chelsea', '2026-01-06 22:00'),
('Tennis', 'ATP', 'Nadal vs Djokovic', '2026-01-07 18:00');
