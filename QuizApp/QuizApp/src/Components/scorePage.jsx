import "./scorePage.css";
export default function ScorePage({ reactionClass, reaction, restart }) {


    return (
        <div>

            <h2 className={`reaction ${reactionClass}`}
                id="finalScore">{reaction}</h2>
            <br />
            <button onClick={restart}>Restart</button>
        </div>
    )
}