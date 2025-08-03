import { useEffect, useState } from "react";
import "./StartPage.css";
export default function StartPage({ updateDifficulty, n, number, sub, q, updateQ, loading }) {
    const [checkE, setCheckE] = useState(false);
    const [error, setError] = useState("");
    const [difficulty, setDifficulty] = useState("medium");
    const [ques, setQues] = useState("");


    function updateDifficultyLevel(e) {
        setDifficulty(e.target.value);
        updateDifficulty(e.target.value);
    }
    function changeEvent(e) {
        setQues(e.target.value);
        updateQ(e.target.value);
    }


    function handleCheck() {

        if (ques === "") {
            setCheckE(true);
            setError("Enter a topic");
        }
        else if (n < 5) {
            setCheckE(true);
            setError("Number of questions should be at least 5");
        } else {
            setCheckE(false);
            setError("");
            sub();
        }
    }

    return (
        <div className="container">
            <label htmlFor="topic">ENTER THE TOPIC</label>
            <br />
            <br />
            <input
                type="text"
                placeholder="Enter Topic"
                name="topic"
                value={q}
                onChange={changeEvent}
                id="topic"
            />
            <br />
            <br />
            <input
                type="number"
                placeholder="Enter number of questions"
                max={100}
                min={5}
                className="num"
                value={n}
                onChange={(e) => number(parseInt(e.target.value) || 0)}
            />
            <br />
            <label htmlFor="difficulty">Difficulty Level:</label>&nbsp;&nbsp;
            <select onChange={updateDifficultyLevel} name="difficulty" value={difficulty} id="difficulty" >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            <br />
            {checkE && <p className="error">{error}</p>}
            <button onClick={handleCheck} type="button" disabled={loading}>
                {loading ? "Generating..." : "Generate"}
            </button>

        </div>
    );
}
