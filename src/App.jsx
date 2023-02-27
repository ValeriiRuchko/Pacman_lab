import "./App.css";
import Field from "./components/Field";
import { useState } from "react";

function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="App">
      <Field score={score} setScore={setScore} />
      <h3 id="score">Score: {score}</h3>
    </div>
  );
}

export default App;
