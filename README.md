# Fitelligence_App

> **Live Demo:** [https://fitelligence.shebuilds.it.com/](https://fitelligence.shebuilds.it.com/) is live!

## Overview

Fitelligence is a modern, AI-powered fitness and nutrition web application. It provides personalized workout plans, recipe suggestions, progress tracking, and a user-friendly chat interface with an AI coach. The app is built with React, Node.js, Express, and OpenAI GPT-4, and features a visually appealing, responsive design.

---

## Features

- **AI Chat Coach:** Interactive chat for fitness advice and recipe suggestions, powered by OpenAI GPT-4.
- **Personalized Recipes:** Get meal plans and recipes tailored to your fitness goals, dietary preferences, and available equipment.
- **Progress Tracking:** Review your fitness journey and chat history with the AI coach.
- **Fitness Survey:** Fill out a survey to customize your workout and nutrition recommendations.
- **Profile Management:** Edit your profile, upload an avatar, and view membership details.
- **Recipe History:** Browse your previous AI-generated recipes.
- **Responsive Design:** Works seamlessly on desktop and mobile devices.
- **Modern UI:** Custom gradients, rounded corners, motivational text, and emoji sequences for an engaging experience.

---

## Tech Stack

- **Frontend:** React, react-bootstrap, react-router-dom, FontAwesome, custom CSS
- **Backend:** Node.js, Express, OpenAI API, PostgreSQL
- **Authentication:** JWT-based user authentication
- **Streaming AI Responses:** Real-time streaming of AI chat and recipe responses

---

## Main Pages & Components

- **Home:** Welcome page with motivational images, feature cards, and call-to-action buttons (Get Started, Login)
- **Profile:** User profile with avatar upload, editable details, and tabs for About and Fitness Survey
- **FitnessSurvey:** Custom survey form for fitness goals, equipment, and limitations
- **ChatRecipe:** Chat interface for recipe suggestions, with food images, motivational text, and emoji sequence
- **ProgressTracking:** View chat history and progress with the AI coach
- **RecipeHistory:** Browse previous recipe responses, with reduced spacing for clarity
- **Workouts:** Gallery and chat history for fitness conversations

---

## Visual & UX Highlights

- Red-black gradient backgrounds for main sections
- Rounded corners and glowing button effects
- Custom scrollbars and sticky input sections
- Motivational text and emoji sequences
- Responsive image rows and feature cards

---

## Project Structure

```
Fitelligence/
├── client/
│   └── fitelligenceApp/
│       ├── src/
│       │   ├── Components/
│       │   │   ├── Home.jsx
│       │   │   ├── Profile.jsx
│       │   │   ├── FitnessSurvey.jsx
│       │   │   ├── ChatRecipe.jsx
│       │   │   ├── ProgressTracking.jsx
│       │   │   ├── RecipeHistory.jsx
│       │   │   ├── Workouts.jsx
│       │   │   └── ...
│       │   ├── assets/
│       │   │   ├── images/
│       │   │   └── videos/
│       │   └── ...
│       ├── public/
│       └── package.json
├── server/
│   ├── index.js
│   ├── routes/
│   │   ├── fitness_survey.js
│   │   ├── profile.js
│   │   ├── login.js
│   │   ├── register.js
│   │   └── ...
│   ├── db.js
│   └── ...
├── README.md
└── ...
```

---

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nicolekristie/Fitelligence_App.git
   cd Fitelligence_App
   ```
2. **Install dependencies:**
   - Frontend:
     ```bash
     cd client/fitelligenceApp
     npm install
     ```
   - Backend:
     ```bash
     cd ../../server
     npm install
     ```
3. **Configure environment variables:**
   - Add your OpenAI API key and database credentials to `.env` in the server folder.
4. **Start the development servers:**
   - Backend:
     ```bash
     npm start
     ```
   - Frontend:
     ```bash
     cd client/fitelligenceApp
     npm run dev
     ```

---

## Usage

- Register or log in to access personalized features.
- Complete the fitness survey for tailored recommendations.
- Chat with the AI coach for recipes and fitness advice.
- Track your progress and review your recipe history.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

This project is licensed under the MIT License.
