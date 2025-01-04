import "./QuestionBox.css";
import "./Container.css";
import { useState } from "react";

export default function QuestionBox({n,updateScore, finish, ans, genAns}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lock, setLock] = useState(false);

    function handleNext() {
        if (currentIndex < ans.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
        clearAllClasses();
        setLock(false);
    }

    function check(e, option) {
        if (lock === false) {
            const selectedLi = e.target;
            clearAllClasses();
            if (ans[currentIndex].Ans === option.toString()) {
                updateScore();
                selectedLi.classList.add("correct");
            } else {
                selectedLi.classList.add("wrong");
            }
            setLock(true);
        }
    }

    function clearAllClasses() {
        const allOptions = document.querySelectorAll('.op');
        allOptions.forEach(option => {
            option.classList.remove('correct', 'wrong');
        });
    }

    return (
        <div className="container">
            {ans.length > 0 ? (
                <div className="qBox">
                    <p className="qu"><strong>Question:</strong> {ans[currentIndex].Question}</p>
                    <ul className="ops">
                        <li onClick={(e) => check(e, 1)} className="op">{ans[currentIndex].O1}</li>
                        <li onClick={(e) => check(e, 2)} className="op">{ans[currentIndex].O2}</li>
                        <li onClick={(e) => check(e, 3)} className="op">{ans[currentIndex].O3}</li>
                        <li onClick={(e) => check(e, 4)} className="op">{ans[currentIndex].O4}</li>
                    </ul>
                    {currentIndex !== -1 && (
                        <button 
                            onClick={ans.length -1> currentIndex ? handleNext : finish} 
                        >
                            {currentIndex < ans.length - 1 ? "Next" : "Finish"}
                        </button>
                    )}
                </div>
            ) : (
                <div>
                    <p><b id="head">Ready?</b><br />Click to get started</p>
                    <div className="btnn">
                    <button className="btn" onClick={genAns}>Generate Question</button>
                    </div>
                    
                </div>
            )}
        </div>
    );
}
