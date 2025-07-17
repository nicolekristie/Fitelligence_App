import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./Components/NavBar.jsx";
import Home from "./Components/Home.jsx";
import LoginForm from "./Components/LoginForm.jsx";
import RegistrationForm from "./Components/RegistrationForm.jsx";
import FitnessSurvey from "./Components/FitnessSurvey";
import ProgressTracking from "./Components/ProgressTracking.jsx";
import Profile from "./Components/Profile.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import Chat from "./Components/Chat.jsx";
import Welcome from "./Components/Welcome.jsx";
import ChatRecipe from "./Components/ChatRecipe.jsx";
import { UserProvider } from "./Components/Context/userContext.jsx";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route
              path="/fitness-survey"
              element={
                <ProtectedRoute>
                  <FitnessSurvey />
                </ProtectedRoute>
              }
            />
            <Route path="/progress" element={<ProgressTracking />} />
            {/* Redirect old workouts route to new progress route */}
            <Route
              path="/workouts"
              element={<Navigate to="/progress" replace />}
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/welcome"
              element={
                <ProtectedRoute>
                  <Welcome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat-recipe"
              element={
                <ProtectedRoute>
                  <ChatRecipe />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
