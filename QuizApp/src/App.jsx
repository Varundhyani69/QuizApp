import { useState } from 'react';
import './App.css';
import axios from 'axios';
import Container from "./Components/Container.jsx";
function App() {
  let [q,setQ] = useState("");
  const [ans, setAns] = useState([]); 
  let [n,setN] = useState(5);
  function updateQ(topic){
    setQ(topic);
  }
  function number(p){
    setN(p);
  }
  const[difficulty,setDifficulty] = useState("medium");
  function updateDifficulty(d) {
    setDifficulty(d);
  }

  async function genAns() {
    try {
      const res = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDqr8DHMpw5gn9o4S1PIiVjacZ1OS85TeI",
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text: `Based on the topic ${q} give me ${n} mcq with 4 options along with answer with ${difficulty} difficulty level without any extra explanation or text stored in an object in this way:
                  [
                    {
                      QuestionNumber: "1",
                      Question: "whatever question is",
                      O1: "option 1",
                      O2: "option 2",
                      O3: "option 3",
                      O4: "option 4",
                      Ans: "1" // correct option number only
                    },
                    {
                      Question number: "2",
                      Question: "whatever question is",
                      O1: "option 1",
                      O2: "option 2",
                      O3: "option 3",
                      O4: "option 4",
                      Ans: "2"
                    }, //same goes for rest
                  ]
                  `
                }
              ]
            }
          ]
        }
      });

      const response = res.data.candidates[0].content.parts[0].text.trim();

      const jsonStart = response.indexOf("[");
      const jsonEnd = response.lastIndexOf("]") + 1; 
      const jsonString = response.slice(jsonStart, jsonEnd);
      
      const newMCQ = JSON.parse(jsonString);
      
      setAns(...ans,newMCQ);
      

    } catch (error) {
      console.error("Error generating answer:", error);
    }
  }

  

  return (
    <div className="App">
      
      <Container updateDifficulty={updateDifficulty} number={number} n={n} genAns={genAns}  ans={ans} updateQ={updateQ}/>
    </div>
  );
}

export default App;
