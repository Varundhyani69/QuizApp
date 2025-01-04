import "./Container.css";
import { useState, useEffect } from "react";
import StartPage from "./StartPage";
import QuestionBox from "./QuestionBox";
import ScorePage from "./scorePage.jsx";

export default function Container({updateDifficulty,n,number, genAns, ans, q, updateQ }) {
  const [subm, setSubm] = useState(false);
  const [scorePage, setScorePage] = useState(false);
  const [score, setScore] = useState(0);
  const [reaction, setReaction] = useState("");
  const [retry, setRetry] = useState(false);
  const [reactionClass, setReactionClass] = useState("");
  
  useEffect(() => {
    if (scorePage) {
      if (score <= 5) {
        setReaction(`Try Again! You just scored ${score}/${n}`);
        setReactionClass("poor");
      } else if (score > 5 && score < 8) {
        setReaction(`Good! You scored ${score}/${n}`);
        setReactionClass("good");
      } else {
        setReaction(`Amazing! You scored ${score}/${n}`);
        setReactionClass("amazing");
      }
    }
  }, [score, scorePage]);

  function finish() {
    setScorePage(true);
    console.log("ScorePage set to true");
  }

  function updateScore() {
    setScore((prevScore) => prevScore + 1);
  }

  function sub() {
    setSubm(true);
    console.log("handleCheck is called");
  }

  function restart() {
    setSubm(false);
    setScorePage(false);
    setScore(0);
    setRetry(true);
  }

  return (
    <>
    <h1 className='head'>Quiz App</h1>
    <div className="Container">
      
      {!subm ? (
        <StartPage updateDifficulty={updateDifficulty}  n={n} number={number} q={q} sub={sub} updateQ={updateQ} />
      ) : !scorePage ? (
        <QuestionBox updateScore={updateScore} finish={finish} genAns={genAns} ans={ans} />
      ) : !retry ? (
        <ScorePage reactionClass={reactionClass} reaction={reaction} restart={restart} />
      ) : (
        <StartPage updateDifficulty={updateDifficulty} n={n} q={q} sub={sub} updateQ={updateQ} />
      )}
    </div>
    </>
    
  );
}
