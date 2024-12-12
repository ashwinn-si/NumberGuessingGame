import './style.css'
import RandomNumberGenerator from "./RandomNumberGenerator";
import {useState,useEffect} from "react";
function App() {
    const [targetNumber, setTargetNumber] = useState(RandomNumberGenerator());
    const[correctGuessFlag, setCorrectGuessFlag] = useState(false);
    const [guess_number,setGuess] = useState(-1);
    const [feedback_name,setFeedbackName] = useState("");
    const [feedback_class,setFeedbackClass] = useState("");
    const[counter,setCounter] = useState(5);
    useEffect(()=>{
        if (guess_number === "" || isNaN(guess_number)) {
            setFeedbackName("Waiting");
            setFeedbackClass("");
            return;
        }
        if(targetNumber > guess_number){
            setFeedbackName("Lower");
            setFeedbackClass("lower");
        }else if(targetNumber < guess_number){
            setFeedbackName("Higher");
            setFeedbackClass("higher");
        }else{
            setFeedbackName("Correct Guess");
            setFeedbackClass("correct");
            setCorrectGuessFlag(true);
            const interval = setInterval(() => {
                setCounter((prev) => prev - 1);
            }, 1000);
            setTimeout(()=>{
                clearInterval(interval);
                setTargetNumber(RandomNumberGenerator());
                setCorrectGuessFlag(false);
                setCounter(5);
                setGuess(-1);
            }, 5000);
        }
    },[guess_number,targetNumber]);

    return (
    <>
      <div className="container">
          <div className={"header-container"}><p className="header">Number Guess Game</p></div>
          <div className="main-container">
              <p>guess the Number [1-100]</p>
              {!correctGuessFlag ? <input type={"number"} onChange={event => {
                  setGuess(event.target.value)
              }}></input> : null}
              {guess_number !== -1 ? <p>You guess : <span className={`${feedback_class} text_displayer`}>{feedback_name}</span></p> : null}
              {
                  correctGuessFlag ? <div className="result">
                      New Number Generating in: <p>{counter}</p>
                  </div> : null
              }
          </div>

      </div>
    </>
    );
}
export default  App;
