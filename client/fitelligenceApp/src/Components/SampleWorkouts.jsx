import { useEffect, useState } from "react";

function SampleWorkouts() {
  const [images, setImages] = useState([]);
  const [exerciseMap, setExerciseMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch images
    fetch("https://wger.de/api/v2/exerciseimage/?limit=16")
      .then((res) => res.json())
      .then((imgData) => {
        setImages(imgData.results);
        // Get unique exercise IDs from images
        const exerciseIds = imgData.results.map((img) => img.exercise);
        // Fetch exercise details for those IDs
        // Wger API does not support multiple IDs in one request, so fetch all and filter
        fetch("https://wger.de/api/v2/exercise/?language=2&limit=500")
          .then((res) => res.json())
          .then((exData) => {
            // Build a map of exercise ID to name
            const map = {};
            exData.results.forEach((ex) => {
              if (exerciseIds.includes(ex.id)) {
                map[ex.id] = ex.name;
              }
            });
            setExerciseMap(map);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching exercise names:", error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error fetching workout images:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading sample workout images...</div>;

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          margin: "32px 0 24px 0",
          color: "#1976d2",
          fontWeight: 700,
        }}
      >
        Sample Workout Images
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "24px",
          justifyItems: "center",
          alignItems: "start",
          padding: "0 16px",
        }}
      >
        {images.map((img) => (
          <div
            key={img.id}
            style={{
              textAlign: "center",
              background: "#f8f9fa",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              padding: "16px",
            }}
          >
            <img
              src={img.image}
              alt={exerciseMap[img.exercise] || `Exercise ${img.exercise}`}
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "12px",
              }}
            />
            <div
              style={{ fontWeight: 500, color: "#333", fontSize: "1.05rem" }}
            >
              {exerciseMap[img.exercise] || `Exercise ${img.exercise}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SampleWorkouts;
