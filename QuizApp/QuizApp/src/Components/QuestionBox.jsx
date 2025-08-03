import "./QuestionBox.css";
import "./Container.css";
import { useState } from "react";
import { MathJax } from "better-react-mathjax";

export default function QuestionBox({ n, updateScore, finish, ans, genAns }) {
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
    if (!lock) {
      const selectedLi = e.target;
      clearAllClasses();
      const correctAnswer = ans[currentIndex].Ans;

      if (correctAnswer === option.toString()) {
        updateScore();
        selectedLi.classList.add("correct");
      } else {
        selectedLi.classList.add("wrong");

        const allOptions = document.querySelectorAll(".op");
        allOptions.forEach((optionEl) => {
          if (optionEl.textContent === ans[currentIndex][`O${correctAnswer}`]) {
            optionEl.classList.add("correct");
          }
        });
      }
      setLock(true);
    }
  }

  function clearAllClasses() {
    const allOptions = document.querySelectorAll(".op");
    allOptions.forEach((option) => {
      option.classList.remove("correct", "wrong");
    });
  }

  return (
    <div className="container">
      {ans.length > 0 ? (
        <div className="qBox">
          <p className="Num">{ans[currentIndex].QuestionNumber}</p>

          <MathJax>
            {`\\[${ans[currentIndex].Question}\\]`}
          </MathJax>

          <ul className="ops">
            <li onClick={(e) => check(e, 1)} className="op">
              <MathJax>{`\\(${ans[currentIndex].O1}\\)`}</MathJax>
            </li>
            <li onClick={(e) => check(e, 2)} className="op">
              <MathJax>{`\\(${ans[currentIndex].O2}\\)`}</MathJax>
            </li>
            <li onClick={(e) => check(e, 3)} className="op">
              <MathJax>{`\\(${ans[currentIndex].O3}\\)`}</MathJax>
            </li>
            <li onClick={(e) => check(e, 4)} className="op">
              <MathJax>{`\\(${ans[currentIndex].O4}\\)`}</MathJax>
            </li>
          </ul>
          {currentIndex !== -1 && (
            <button onClick={ans.length - 1 > currentIndex ? handleNext : finish}>
              {currentIndex < ans.length - 1 ? "Next" : "Finish"}
            </button>
          )}
        </div>
      ) : (
        <div>
          <p>
            <b id="head">Ready?</b>
            <br />
            Click to get started
          </p>
          <div className="btnn">
            <button className="btn" onClick={genAns}>
              Generate Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
}