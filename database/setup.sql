CREATE DATABASE IF NOT EXISTS money_advise_hub;
USE money_advise_hub;

CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    meta_description TEXT,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE analytics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page_url VARCHAR(255),
    visitor_ip VARCHAR(45),
    visit_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO articles (title, slug, content, meta_description, category) VALUES
('Investment Apps Guide', 'investment-apps-beginners', 'Complete investment guide', 'Best investment apps for beginners', 'finance'),
('Mortgage Guide', 'mortgage-refinancing-guide', 'Mortgage refinancing tips', 'Complete mortgage guide for US residents', 'mortgage');