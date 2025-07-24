import { useState, useEffect } from "react";
import Chat from "./Chat";
import { useUser } from "./Context/userContext.jsx";
import { Navigate, useNavigate } from "react-router-dom";

export default function FitnessSurvey() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    goal: "",
    fitness_level: "",
    days_per_week: 3,
    minutes_per_session: 30,
    injuries: "",
    equipment: [],
  });

  const [message, setMessage] = useState("");
  const [showChat, setShowChat] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEquipmentChange = (e) => {
    // Destructure the value of the checkbox and whether it was checked or unchecked
    const { value, checked } = e.target;

    // Update form state using the previous state
    setForm((prev) => {
      // Create a Set from the current equipment array to avoid duplicates
      const eq = new Set(prev.equipment);

      // If the checkbox is checked, add the value to the Set
      // If unchecked, remove the value from the Set
      if (checked) {
        eq.add(value);
      } else {
        eq.delete(value);
      }

      // Return the new form state with the updated equipment array
      return {
        ...prev, // keep the rest of the form fields unchanged
        equipment: Array.from(eq), // convert Set back to array for storing in state
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      setMessage("User not authenticated. Please log in again.");
      return;
    }

    //Send fitness survey data to backend
    // Try PUT first, fallback to POST if no survey exists
    let res = await fetch("/api/fitness-survey", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, user_id: user.id }),
    });

    let data = await res.json();
    if (res.ok) {
      setMessage("Survey updated successfully.");
      // Optionally redirect or show confirmation
      navigate("/welcome");
    } else if (res.status === 404) {
      // No survey exists, create new
      res = await fetch("/api/fitness-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, user_id: user.id }),
      });
      data = await res.json();
      if (res.ok) {
        setMessage("Survey created successfully.");
        // navigate("/welcome");
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } else {
      setMessage(data.error || "Something went wrong");
    }
  };

  return (
    <div className="container mt-5">
      {!user ? (
        <div className="text-center">
          <p>Loading user data...</p>
        </div>
      ) : !showChat ? (
        <>
          <h2 className="mb-4">Fitness Survey</h2>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Fitness Goal</label>
              <select
                className="form-select"
                name="goal"
                onChange={handleChange}
                required
              >
                <option value="">Select a goal</option>
                <option value="muscle gain">Muscle Gain</option>
                <option value="weight loss">Weight Loss</option>
                <option value="endurance">Endurance</option>er Workout Manager API
                <option value="overall health">Overall Health</option>
                <option value="stress reduction">Stress Reduction</option>
                <option value="toning">Endurance</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Fitness Level</label>
              <select
                className="form-select"
                name="fitness_level"
                onChange={handleChange}
                required
              >
                <option value="">Select your level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Days per Week</label>
              <input
                type="number"
                className="form-control"
                name="days_per_week"
                value={form.days_per_week}
                onChange={handleChange}
                min="1"
                max="7"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Minutes per Session</label>
              <input
                type="number"
                className="form-control"
                name="minutes_per_session"
                value={form.minutes_per_session}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label">Injuries or Limitations</label>
              <textarea
                className="form-control"
                name="injuries"
                rows="3"
                onChange={handleChange}
              ></textarea>
            </div>

            <fieldset className="col-12">
              <legend className="col-form-label pt-3">
                Select the equipment You Have Access To
              </legend>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="dumbbells"
                  id="dumbbells"
                  onChange={handleEquipmentChange}
                />
                <label className="form-check-label" htmlFor="dumbbells">
                  Dumbbells
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="resistance bands"
                  id="resistanceBands"
                  onChange={handleEquipmentChange}
                />
                <label className="form-check-label" htmlFor="resistanceBands">
                  Resistance Bands
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="yoga mat"
                  id="yogaMat"
                  onChange={handleEquipmentChange}
                />
                <label className="form-check-label" htmlFor="yogaMat">
                  Yoga Mat
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="pull-up bar"
                  id="pullUpBar"
                  onChange={handleEquipmentChange}
                />
                <label className="form-check-label" htmlFor="pullUpBar">
                  Pull-up Bar
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="treadmill"
                  id="cardio-treadmill"
                  onChange={handleEquipmentChange}
                />
                <label className="form-check-label" htmlFor="cardio-treadmill">
                  Treadmill{" "}
                </label>
              </div>
            </fieldset>

            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Submit Survey
              </button>
            </div>

            {message && (
              <div className="alert alert-info mt-3" role="alert">
                {message}
              </div>
            )}
          </form>
        </>
      ) : (
        <Chat userId={user?.id} goal={form.goal} />
      )}
    </div>
  );
}
