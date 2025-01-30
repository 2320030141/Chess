import { useState } from "react";

export default function Home() {
  const [fen, setFen] = useState("");
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call your FastAPI backend for prediction
    const response = await fetch("https://your-vercel-backend-url/predict/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fen }),
    });

    const data = await response.json();
    setPrediction(data.prediction);
  };

  return (
    <div>
      <h1>Chess Deadlock Predictor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={fen}
          onChange={(e) => setFen(e.target.value)}
          placeholder="Enter FEN"
        />
        <button type="submit">Predict</button>
      </form>
      {prediction !== null && (
        <div>
          <p>Prediction: {prediction === 1 ? "Deadlock" : "Playable"}</p>
        </div>
      )}
    </div>
  );
}
