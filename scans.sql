CREATE DATABASE IF NOT EXISTS QRTracker;

USE QRTracker;

-- Eliminar tabla existente si existe para recrearla con nuevos campos
DROP TABLE IF EXISTS scans;

CREATE TABLE scans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip VARCHAR(45) NULL,
    user_agent TEXT NULL,
    referer VARCHAR(500) NULL,
    year INT GENERATED ALWAYS AS (YEAR(timestamp)) STORED,
    month INT GENERATED ALWAYS AS (MONTH(timestamp)) STORED,
    day INT GENERATED ALWAYS AS (DAY(timestamp)) STORED,
    hour INT GENERATED ALWAYS AS (HOUR(timestamp)) STORED,
    INDEX idx_fecha (fecha),
    INDEX idx_timestamp (timestamp),
    INDEX idx_year_month (year, month),
    INDEX idx_hour (hour)
);

-- Insertar algunos datos de ejemplo para pruebas
INSERT INTO scans (fecha, hora, ip, user_agent) VALUES 
(CURDATE(), CURTIME(), '127.0.0.1', 'Mozilla/5.0 (Test Browser)'),
(DATE_SUB(CURDATE(), INTERVAL 1 DAY), '14:30:00', '192.168.1.100', 'Mozilla/5.0 (Chrome Test)'),
(DATE_SUB(CURDATE(), INTERVAL 2 DAY), '09:15:00', '10.0.0.1', 'Mozilla/5.0 (Firefox Test)');
