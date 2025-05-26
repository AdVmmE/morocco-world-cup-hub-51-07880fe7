
-- Morocco World Cup 2030 Database Schema
-- Generated for Laravel 12 API

-- Create database
CREATE DATABASE IF NOT EXISTS morocco_worldcup_2030;
USE morocco_worldcup_2030;

-- Users table
CREATE TABLE users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NULL,
    country VARCHAR(100) NULL,
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    
    INDEX idx_email_role (email, role)
);

-- Host Cities table
CREATE TABLE host_cities (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    attractions JSON NOT NULL,
    image VARCHAR(255) NOT NULL,
    image_alt VARCHAR(255) NULL,
    population INT NOT NULL,
    stadium VARCHAR(255) NOT NULL,
    distance_from_airport DECIMAL(8,2) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    
    INDEX idx_name (name)
);

-- Stadiums table
CREATE TABLE stadiums (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    image VARCHAR(255) NOT NULL,
    status ENUM('Operational', 'Under Construction', 'Planned') NOT NULL,
    progress INT NOT NULL DEFAULT 0,
    description TEXT NOT NULL,
    features JSON NOT NULL,
    matches INT NOT NULL DEFAULT 0,
    start_date DATE NOT NULL,
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    
    INDEX idx_city_status (city, status),
    INDEX idx_coordinates (latitude, longitude)
);

-- Matches table
CREATE TABLE matches (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    home_team VARCHAR(100) NOT NULL,
    away_team VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(255) NOT NULL,
    stadium_id BIGINT UNSIGNED NOT NULL,
    `group` VARCHAR(50) NULL,
    round VARCHAR(50) NULL,
    home_score INT NULL,
    away_score INT NULL,
    status ENUM('scheduled', 'live', 'completed') NOT NULL DEFAULT 'scheduled',
    highlight_url VARCHAR(255) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    
    INDEX idx_date_status (date, status),
    INDEX idx_teams (home_team, away_team),
    INDEX idx_stadium (stadium_id),
    FOREIGN KEY (stadium_id) REFERENCES stadiums(id) ON DELETE CASCADE
);

-- Tickets table
CREATE TABLE tickets (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    match_id BIGINT UNSIGNED NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    available INT NOT NULL,
    max_per_person INT NOT NULL,
    seat_type VARCHAR(100) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    
    INDEX idx_match_category (match_id, category),
    INDEX idx_available (available),
    FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE
);

-- User Tickets table (Pivot table for user ticket purchases)
CREATE TABLE user_tickets (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    ticket_id BIGINT UNSIGNED NOT NULL,
    quantity INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    purchase_date TIMESTAMP NOT NULL,
    status ENUM('active', 'used', 'cancelled', 'refunded') NOT NULL DEFAULT 'active',
    owner_name VARCHAR(255) NOT NULL,
    owner_email VARCHAR(255) NOT NULL,
    seat_number VARCHAR(255) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    
    INDEX idx_user_status (user_id, status),
    INDEX idx_ticket (ticket_id),
    INDEX idx_purchase_date (purchase_date),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE
);

-- News table
CREATE TABLE news (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    summary VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image VARCHAR(255) NOT NULL,
    tags JSON NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    
    INDEX idx_category_date (category, created_at),
    FULLTEXT idx_search (title, summary, content)
);

-- Personal Access Tokens table (for Laravel Sanctum)
CREATE TABLE personal_access_tokens (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tokenable_type VARCHAR(255) NOT NULL,
    tokenable_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    token VARCHAR(64) NOT NULL UNIQUE,
    abilities TEXT NULL,
    last_used_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    
    INDEX idx_tokenable (tokenable_type, tokenable_id)
);

-- Sample Data Inserts

-- Insert Host Cities
INSERT INTO host_cities (name, description, attractions, image, population, stadium, distance_from_airport, created_at, updated_at) VALUES
('Casablanca', 'Morocco''s largest city and economic capital, known for its modern architecture and vibrant culture.', 
 '["Hassan II Mosque", "Royal Palace", "Old Medina", "Corniche Beach", "Morocco Mall"]', 
 'https://images.unsplash.com/photo-1539650116574-75c0c6bbf66b', 3500000, 'Grand Stade de Casablanca', 35.5, NOW(), NOW()),
('Rabat', 'The capital city of Morocco, featuring beautiful historical sites and government buildings.', 
 '["Hassan Tower", "Kasbah of the Udayas", "Royal Palace", "Chellah Necropolis", "Mohammed V Mausoleum"]', 
 'https://images.unsplash.com/photo-1570197788417-0e82375c9371', 1200000, 'Stade Moulay Abdallah', 15.2, NOW(), NOW()),
('Marrakech', 'The Red City, famous for its historic medina, souks, and stunning architecture.', 
 '["Jemaa el-Fnaa Square", "Bahia Palace", "Saadian Tombs", "Majorelle Garden", "Koutoubia Mosque"]', 
 'https://images.unsplash.com/photo-1597212618440-806262de4f6b', 928000, 'Stade de Marrakech', 8.5, NOW(), NOW()),
('Tangier', 'A port city bridging Africa and Europe, known for its international character.', 
 '["Kasbah Museum", "Cape Spartel", "Hercules Caves", "Grand Socco", "American Legation Museum"]', 
 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91', 950000, 'Grand Stade de Tanger', 25.0, NOW(), NOW()),
('Fez', 'The spiritual and cultural heart of Morocco, home to the world''s oldest university.', 
 '["Fes el-Bali Medina", "Al-Qarawiyyin University", "Bou Inania Madrasa", "Chouara Tannery", "Royal Palace of Fez"]', 
 'https://images.unsplash.com/photo-1551200036-2d0ad8b91640', 1150000, 'Stade de Fès', 18.3, NOW(), NOW());

-- Insert Stadiums
INSERT INTO stadiums (name, city, capacity, image, status, progress, description, features, matches, start_date, latitude, longitude, created_at, updated_at) VALUES
('Grand Stade de Casablanca', 'Casablanca', 93000, 'https://images.unsplash.com/photo-1522778119026-d647f0596c20', 'Under Construction', 75, 
 'The largest stadium in Morocco and Africa, featuring state-of-the-art facilities and sustainable design.', 
 '["Retractable roof", "LED lighting system", "VIP suites", "Underground parking", "Solar panels", "Rainwater harvesting"]', 
 8, '2025-01-15', 33.5731, -7.5898, NOW(), NOW()),
('Stade Moulay Abdallah', 'Rabat', 65000, 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d', 'Operational', 100, 
 'A modern stadium located in the capital, known for its excellent acoustics and fan experience.', 
 '["Modern sound system", "LED scoreboard", "Premium hospitality areas", "Accessible facilities", "High-speed WiFi"]', 
 6, '2023-08-20', 34.0209, -6.8416, NOW(), NOW()),
('Stade de Marrakech', 'Marrakech', 45000, 'https://images.unsplash.com/photo-1577223625816-7546f13df25d', 'Under Construction', 60, 
 'A stadium designed to blend with the traditional architecture of the Red City.', 
 '["Traditional Moroccan design", "Climate control", "Local materials", "Cultural exhibition space", "Panoramic views"]', 
 4, '2025-06-10', 31.6295, -7.9811, NOW(), NOW()),
('Grand Stade de Tanger', 'Tangier', 68000, 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2', 'Operational', 100, 
 'A coastal stadium offering spectacular views of the Mediterranean Sea.', 
 '["Sea view", "Wind-resistant design", "Modern facilities", "International standard pitch", "Media center"]', 
 5, '2024-03-12', 35.7595, -5.8340, NOW(), NOW()),
('Stade de Fès', 'Fez', 35000, 'https://images.unsplash.com/photo-1574629810360-7efbbe195018', 'Planned', 25, 
 'A compact stadium designed to provide an intimate atmosphere for football matches.', 
 '["Intimate atmosphere", "Historic city integration", "Modern amenities", "Cultural center", "Local craftsmanship"]', 
 3, '2026-01-05', 34.0181, -5.0078, NOW(), NOW());

-- Insert Sample Matches
INSERT INTO matches (home_team, away_team, date, time, stadium_id, `group`, round, status, created_at, updated_at) VALUES
('Morocco', 'Qualifier A1', '2030-06-10', '18:00', 1, 'Group A', NULL, 'scheduled', NOW(), NOW()),
('Spain', 'Qualifier B2', '2030-06-11', '15:00', 4, 'Group B', NULL, 'scheduled', NOW(), NOW()),
('Portugal', 'Qualifier C3', '2030-06-11', '18:00', 2, 'Group C', NULL, 'scheduled', NOW(), NOW()),
('Morocco', 'Qualifier A3', '2030-06-14', '15:00', 1, 'Group A', NULL, 'scheduled', NOW(), NOW()),
('Winner Group A', 'Runner-up Group B', '2030-06-28', '18:00', 1, NULL, 'Round of 16', 'scheduled', NOW(), NOW()),
('Winner Match 1', 'Winner Match 2', '2030-07-03', '18:00', 1, NULL, 'Quarter Finals', 'scheduled', NOW(), NOW()),
('Winner Match 5', 'Winner Match 6', '2030-07-07', '21:00', 1, NULL, 'Semi Finals', 'scheduled', NOW(), NOW()),
('Winner Match 7', 'Winner Match 8', '2030-07-13', '18:00', 1, NULL, 'Final', 'scheduled', NOW(), NOW());

-- Insert Sample Tickets
INSERT INTO tickets (match_id, category, price, currency, available, max_per_person, seat_type, created_at, updated_at) VALUES
(1, 'Category 1', 150.00, 'USD', 5000, 4, 'Premium', NOW(), NOW()),
(1, 'Category 2', 100.00, 'USD', 8000, 6, 'Standard', NOW(), NOW()),
(1, 'Category 3', 60.00, 'USD', 12000, 8, 'Economy', NOW(), NOW()),
(2, 'Category 1', 120.00, 'USD', 4500, 4, 'Premium', NOW(), NOW()),
(2, 'Category 2', 80.00, 'USD', 7500, 6, 'Standard', NOW(), NOW()),
(8, 'Category 1', 500.00, 'USD', 2000, 2, 'Premium', NOW(), NOW()),
(8, 'Category 2', 350.00, 'USD', 4000, 4, 'Standard', NOW(), NOW()),
(8, 'Category 3', 200.00, 'USD', 8000, 6, 'Economy', NOW(), NOW());

-- Insert Sample News
INSERT INTO news (title, summary, content, author, category, image, tags, created_at, updated_at) VALUES
('Morocco 2030 World Cup Stadium Construction Ahead of Schedule', 
 'Latest updates on stadium construction progress across Morocco show promising developments.', 
 'The construction of World Cup stadiums across Morocco is progressing remarkably well, with several venues ahead of their original timeline. The Grand Stade de Casablanca, set to be the largest stadium in Africa, has reached 75% completion and is expected to be ready for testing by early 2029...', 
 'Ahmed Benali', 'Infrastructure', 'https://images.unsplash.com/photo-1522778119026-d647f0596c20', 
 '["World Cup", "Morocco", "Stadium", "Construction", "Infrastructure"]', 
 NOW(), NOW()),
('FIFA Announces Additional Sustainability Measures for Morocco 2030', 
 'New environmental initiatives to make the tournament more sustainable and eco-friendly.', 
 'FIFA has announced comprehensive sustainability measures for the Morocco portion of the 2030 World Cup, including renewable energy adoption, waste reduction programs, and carbon offset initiatives...', 
 'Fatima Al-Rashid', 'Environment', 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3', 
 '["FIFA", "Sustainability", "Environment", "Green Energy", "Morocco"]', 
 NOW(), NOW()),
('Ticket Sales Begin for Morocco 2030 World Cup Matches', 
 'Fans can now purchase tickets for matches hosted in Moroccan stadiums.', 
 'The official ticket sales for World Cup matches in Morocco have begun, with priority given to Moroccan residents and FIFA members. Tickets are available across multiple categories and price ranges...', 
 'Omar Mansouri', 'Tickets', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018', 
 '["Tickets", "Sales", "Morocco", "World Cup", "Fans"]', 
 NOW(), NOW());

-- Insert Admin User
INSERT INTO users (name, email, password, role, created_at, updated_at) VALUES
('Admin User', 'admin@morocco2030.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', NOW(), NOW());

-- Insert Sample Regular User
INSERT INTO users (name, email, password, phone, country, role, created_at, updated_at) VALUES
('John Doe', 'john@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1234567890', 'USA', 'user', NOW(), NOW());
