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
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      setTimeout(() => {
        navigate("/welcome");
      }, 1500);
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
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
        setTimeout(() => {
          navigate("/welcome");
        }, 1500);
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } else {
      setMessage(data.error || "Something went wrong");
    }
  };

  return (
    <div className="container mt-5">
      <style>{`
        .fitness-survey-card {
          background: linear-gradient(135deg, #232323 0%, #b31217 100%);
          border-radius: 24px;
          box-shadow: 0 4px 32px rgba(179,18,23,0.18);
          padding: 2.5rem 2.5rem 2rem 2.5rem;
          margin: 0 auto;
          max-width: 700px;
        }
        .fitness-survey-heading {
          color: #fff;
          font-size: 2.4rem;
          font-weight: 900;
          text-shadow: 0 2px 12px #b31217, 0 2px 18px #000;
          letter-spacing: 2px;
          margin-bottom: 1.5rem;
        }
        .fitness-survey-label, .fitness-survey-legend {
          color: #fff;
          font-weight: 700;
          font-size: 1.18rem;
          text-shadow: 0 1px 4px #b31217, 0 2px 8px #000;
        }
        .fitness-survey-input, .fitness-survey-select, .fitness-survey-textarea {
          background: #232323;
          color: #fff;
          border: 2px solid #b31217;
          border-radius: 10px;
        }
        .fitness-survey-select, .fitness-survey-days-select, .fitness-survey-minutes-select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-image: url('data:image/svg+xml;utf8,<svg fill="white" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1.5em;
          padding-right: 2.5em;
        }
        .fitness-survey-select:focus, .fitness-survey-days-select:focus, .fitness-survey-minutes-select:focus {
          outline: 2px solid #ff2a2a;
        }
        .form-check-label, .fitness-survey-equipment-label {
          color: #fff;
          font-weight: 700;
          font-size: 1.08rem;
          text-shadow: 0 1px 4px #b31217, 0 2px 8px #000;
        }
        .btn-primary {
          background: linear-gradient(90deg, #b31217 0%, #ff2a2a 100%);
          border: none;
          font-weight: 700;
          font-size: 1.1rem;
          color: #fff;
          box-shadow: 0 0 12px #b31217;
          border-radius: 10px;
          padding: 0.7rem 2.2rem;
        }
        .btn-primary:hover, .btn-primary:focus {
          background: linear-gradient(90deg, #ff2a2a 0%, #b31217 100%);
          box-shadow: 0 0 18px #ff2a2a;
          color: #fff;
        }
        .fitness-survey-icon {
          font-size: 2.2rem;
          color: #ff2a2a;
          margin-right: 12px;
          vertical-align: middle;
        }
      `}</style>
      {!user ? (
        <div className="text-center">
          <p>Loading user data...</p>
        </div>
      ) : !showChat ? (
        <div className="fitness-survey-card">
          <h2 className="fitness-survey-heading mb-4">
            <span
              className="fitness-survey-icon"
              role="img"
              aria-label="profile"
            >
              👤
            </span>
            My Profile Fitness Survey
          </h2>
          <form onSubmit={handleSubmit} className="row g-4">
            <div className="col-md-6">
              <label className="form-label fitness-survey-label">
                Fitness Goal
              </label>
              <select
                className="form-select fitness-survey-select"
                name="goal"
                onChange={handleChange}
                required
              >
                <option value="">Select a goal</option>
                <option value="muscle gain">Muscle Gain</option>
                <option value="weight loss">Weight Loss</option>
                <option value="endurance">Endurance</option>
                <option value="overall health">Overall Health</option>
                <option value="stress reduction">Stress Reduction</option>
                <option value="toning">Improved Sleep</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label fitness-survey-label">
                Fitness Level
              </label>
              <select
                className="form-select fitness-survey-select"
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
              <label className="form-label fitness-survey-label">
                Days per Week
              </label>
              <input
                type="number"
                className="form-control fitness-survey-input"
                name="days_per_week"
                value={form.days_per_week}
                onChange={handleChange}
                min="1"
                max="7"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fitness-survey-label">
                Minutes per Session
              </label>
              <input
                type="number"
                className="form-control fitness-survey-input"
                name="minutes_per_session"
                value={form.minutes_per_session}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label fitness-survey-label">
                Injuries or Limitations
              </label>
              <textarea
                className="form-control fitness-survey-textarea"
                name="injuries"
                rows="3"
                onChange={handleChange}
              ></textarea>
            </div>

            <fieldset className="col-12">
              <legend className="col-form-label pt-3 fitness-survey-legend">
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
                  <span className="fitness-survey-equipment-label">
                    Dumbbells
                  </span>
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
                  <span className="fitness-survey-equipment-label">
                    Resistance Bands
                  </span>
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
                  <span className="fitness-survey-equipment-label">
                    Yoga Mat
                  </span>
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
                  <span className="fitness-survey-equipment-label">
                    Pull-up Bar
                  </span>
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
                  <span className="fitness-survey-equipment-label">
                    Treadmill
                  </span>
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
        </div>
      ) : (
        <Chat userId={user?.id} goal={form.goal} />
      )}
    </div>
  );
}
