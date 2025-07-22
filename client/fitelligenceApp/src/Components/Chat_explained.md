# Chat.jsx Component Explanation

## Overview

This document explains the structure and logic of the `Chat.jsx` component in your Fitelligence app. The Chat component provides a user interface for chatting with the AI fitness coach, sending and receiving messages, and displaying related images and features.

---

## Imports

- **React**: For building the component and managing state.
- **Images**: Various images for the coach and fitness gallery.
- **PaperAirplaneIcon**: Icon for the send button.
- **ChatMessage**: Subcomponent for rendering individual chat messages.
- **RandomQuotes**: Subcomponent for displaying motivational quotes.
- **motion (framer-motion)**: For animated UI elements.
- **useUser**: Custom hook to get the current user from context.

---

## Props

- `userId`: The current user's ID (used for personalized chat and backend requests).
- `goal`: The user's fitness goal (from the fitness survey, used for personalized AI responses).

---

## State & Refs

- `messages`: Array of chat messages (user and AI).
- `input`: Current value of the chat input box.
- `isLoading`: Boolean indicating if a message is being processed.
- `messagesEndRef`: Ref for auto-scrolling to the latest message.
- `inputRef`: Ref for focusing the input box.
- `rotate`, `rotatePersonalized`: State for triggering image/text animations.

---

## User Context

- Uses `useUser()` to get the current user object, including their ID and other profile info.

---

## Effects

- **Auto-scroll**: When messages or loading state change, scrolls to the bottom of the chat.

---

## Message Submission Logic

- **handleSubmit**: Handles form submission when the user sends a message.
  - Prevents empty messages.
  - Adds the user's message to the chat history.
  - Sends a POST request to `/api/chat` with `{ message, userId, goal }`.
  - On success, adds the AI's response to the chat history.
  - Handles errors and displays a fallback message if the AI is unavailable.

---

## UI Layout

- **Left Column**: Displays coach image, animated info boxes ("Personalized AI Coaching", "Available 24/7"), and random motivational quotes.
- **Right Column**: Main chat card with:
  - Header (coach avatar and title)
  - Chat history (scrollable, styled)
  - Input form (text box and send button)
- **Image Gallery**: Below the chat, displays a gallery of fitness-related images with hover animations and descriptions.

---

## Subcomponents

- **ChatMessage**: Renders each message in the chat (user or AI).
- **RandomQuotes**: Shows a random motivational quote in the left column.

---

## Key Features

- Personalized AI chat using user ID and fitness goal.
- Animated UI elements for engagement.
- Responsive layout for desktop and mobile.
- Motivational and educational content (quotes, gallery).
- Error handling for failed AI responses.

---

## How Data Flows

1. User types a message and submits the form.
2. Message is added to local state and sent to the backend.
3. Backend responds with AI-generated advice, which is added to the chat.
4. Chat history is displayed, auto-scrolled, and updated in real time.
5. User's fitness goal and ID are included for personalized responses.

---

## Customization

- You can change images, add more gallery items, or adjust prompts for the AI.
- The chat logic can be extended to support more features (e.g., saving chat history, file uploads).

---

## Usage

Import and use the `Chat` component in your app, passing `userId` and `goal` as props:

```jsx
<Chat userId={user.id} goal={user.goal} />
```

---

## Contact

For further questions or improvements, contact your Fitelligence development team.
