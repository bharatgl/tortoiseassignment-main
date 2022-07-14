import React, { useRef, useState, useEffect } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./styles.css";
import MainPage from "../../pages/MainPage";
import { MAX, options } from "../../constants/constants";

const NewKeyboard = (props) => {
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const myRef = useRef();

  const [counter, setcounter] = useState(0);
  const [isStart, setisStart] = useState(false);
  const [isPause, setisPause] = useState(true);
  const [timer, settimer] = useState(0);
  const [ans, setans] = useState("");

  const randomStringGenerator = () => {
    let str = "";
    for (let i = 0; i < 1; i++) {
      str = str + options[Math.floor(Math.random() * 10) % MAX];
    }
    return str;
  };

  const [alphabet, setAlphabet] = useState(randomStringGenerator());
  const [cardText, setCardText] = useState(alphabet);

  useEffect(() => {
    let interval = null;
    if (isStart && isPause === false) {
      interval = setInterval(() => {
        settimer((timer) => timer + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isStart, isPause]);

  const highScore = localStorage.getItem("highScore")
    ? localStorage.getItem("highScore")
    : 0;

  const handleStart = () => {
    setisStart(true);
    setisPause(false);
  };

  const generateText = () => {
    const alpha = randomStringGenerator();
    setAlphabet(alpha);
    setCardText(alpha);
  };

  const handleReset = () => {
    setans("");
    setcounter(0);
    generateText();
    setisStart(false);
    settimer(0);
  };

  const handlePenalty = () => {
    settimer(timer + 500);
  };
  const checkAns = (e) => {
    const userInput = e.target.value;
    const iscounterwer =
      userInput.charAt(userInput.length - 1).toLowerCase() === alphabet;
    if (iscounterwer) setcounter(counter + 1);
    else handlePenalty();
    setans(userInput.toUpperCase());
    if (userInput.length >= 20) {
      const isSuccess = highScore ? timer <= highScore : true;
      setisStart(false);
      if (isSuccess) {
        setCardText("success");
        localStorage.setItem("highScore", timer);
      } else setCardText("failure");
    } else {
      generateText();
    }
  };

  const onChange = (input) => {
    setInput(input);
    console.log("Input changed", input);
  };

  const onKeyPress = (button) => {
    console.log("Button pressed", button);
  };

  const onChangeInput = (event) => {
    console.log(event.target.value);
    const input = event.target.value;
    setInput(ans);
    setans(input);

    myRef.current.setInput(ans);
  };
  console.log("input - ", input);

  return (
    <div>
      <MainPage
        cardText={cardText}
        timer={timer}
        highScore={highScore}
        ans={ans}
        checkAns={checkAns}
        isStart={isStart}
        handleReset={handleReset}
        handleStart={handleStart}
      />
      <input
        value={ans}
        placeholder={"Tap on the virtual keyboard to start"}
        onChange={checkAns}
      />
      <Keyboard
        keyboardRef={(r) => (myRef.current = r)}
        layoutName={layout}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </div>
  );
};

export default NewKeyboard;
