import React, { useState, useEffect } from "react";
import Buttons from "../components/buttons/Buttons";
import Card from "../components/Card";
import Inputs from "../components/inputs/Inputs";
import StopWatch from "../components/StopWatch";

const MainPage = (props) => {

  return (
    <>
      <p className="text-white text1 pt-5">Type The Alphabet</p>
      <p className="text-white">
        Typing Game to see how fast you type. Timer starts when you do :&#41;
      </p>
      <Card value={props.cardText} />
      <div className="form-group">
        <StopWatch time={props.timer} highScore={props.highScore} />
        <div className="input-group">
          <Inputs answer={props.ans} checkAnswer={props.checkAns} isActive={props.isStart} />
          <Buttons
            isActive={props.isStart || props.ans.length >= 20}
            handleReset={props.handleReset}
            handleStart={props.handleStart}
          />
        </div>
      </div>
    </>
  );
};

export default MainPage;
