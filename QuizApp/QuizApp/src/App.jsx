import { useState } from "react";
import "./App.css";
import axios from "axios";
import Container from "./Components/Container.jsx";

function App() {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState("medium");
  const [loading, setLoading] = useState(false);

  const updateTopic = (value) => setTopic(value);
  const updateQuestionCount = (value) => setNumQuestions(value);
  const updateDifficultyLevel = (level) => setDifficulty(level);

  const generateQuestions = async () => {
    if (!import.meta.env.VITE_GEMINI_API) {
      alert("API key not found. Please configure VITE_GEMINI_API in your .env file.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(import.meta.env.VITE_GEMINI_API, {
        contents: [
          {
            parts: [
              {
                text: `Based on the topic ${topic}, generate ${numQuestions} multiple-choice questions (MCQs) with 4 options each, along with the correct answer, at a ${difficulty} difficulty level. Format all mathematical expressions in proper LaTeX syntax (e.g., use \\int for integrals, \\frac for fractions). Store the output in a JSON array as follows, without any extra explanation or text outside the array:
                [
                  {
                    QuestionNumber: "1",
                    Question: "LaTeX formatted question, e.g., \\\\int_0^1 x^2 \\\\, dx",
                    O1: "option 1",
                    O2: "option 2",
                    O3: "option 3",
                    O4: "option 4",
                    Ans: "1"
                  },
                  ...
                ]`
              }
            ]
          }
        ]
      });

      const responseText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      const jsonStart = responseText.indexOf("[");
      const jsonEnd = responseText.lastIndexOf("]") + 1;
      const jsonString = responseText.slice(jsonStart, jsonEnd);

      try {
        const parsedQuestions = JSON.parse(jsonString);
        setQuestions((prev) => [...prev, ...parsedQuestions]);
      } catch (err) {
        console.error("JSON parse error:", err);
        alert("Failed to parse question data. Try again with a simpler topic.");
      }
    } catch (err) {
      console.error("Error fetching from Gemini API:", err);
      alert("Could not generate questions. Check your network or API configuration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Container
        updateDifficulty={updateDifficultyLevel}
        number={updateQuestionCount}
        n={numQuestions}
        genAns={generateQuestions}
        ans={questions}
        updateQ={updateTopic}
        loading={loading}
      />
    </div>
  );
}

export default App;
