-- DROP existing tables 
DROP TABLE IF EXISTS ai_chat_responses;
DROP TABLE IF EXISTS fitness_survey;
DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS ai_recipe_responses;

-- USERS table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    username VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PROFILES table (linked to users)
CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    avatar_url TEXT,
    location VARCHAR(100),
    birthdate DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE fitness_survey (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  goal VARCHAR(50) NOT NULL,
  fitness_level VARCHAR(20) NOT NULL,
  days_per_week INTEGER NOT NULL,
  minutes_per_session INTEGER NOT NULL,
  injuries TEXT,
  equipment TEXT[],  -- array of strings
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI_CHAT_RESPONSES table (linked to users)
CREATE TABLE ai_chat_responses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    response_text TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add table for storing AI recipe responses
CREATE TABLE IF NOT EXISTS ai_recipe_responses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    response_text TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_ai_chat_responses_user_id ON ai_chat_responses(user_id);
CREATE INDEX idx_ai_chat_responses_timestamp ON ai_chat_responses(timestamp);


-- Sample Data
INSERT INTO users (firstname, lastname, username, email, password)
VALUES
('Jane', 'Doe', 'janedoe', 'jane@example.com', '$2b$12$exampleFakeHash1...'),
('John', 'Smith', 'jsmith', 'john@example.com', '$2b$12$exampleFakeHash2...');

INSERT INTO profiles (user_id, bio, location, birthdate)
VALUES
(1, 'Full-stack developer in Brooklyn.', 'Brooklyn, NY', '1990-01-15'),
(2, 'Loves React, Node.js and biking.', 'Chicago, IL', '1985-09-30');