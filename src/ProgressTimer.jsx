import React, { Fragment, useEffect, useState } from 'react'

const ProgressTimer = () => {

    const [timerState, setTimerState] = useState({
        min: 0,
        sec: 30,
        angle: 0,
        isEnded: false,
        isDisplayed: false,
        isRotate: false,
        isCouterRotate: false
    });

    // Working the logic of the countdown
    const minutes = timerState.min * 60000;
    const seconds = timerState.sec * 1000;
    const setTime = minutes + seconds;
    const startTime = Date.now();
    const futureTime = startTime + setTime;

    const countDownTimer = () => {
        const currentTime = Date.now();
        const remainingTime = futureTime - currentTime;
        setTimerState({...timerState, angle: (remainingTime / setTime) * 360})

        if (timerState.angle > 180) {
            setTimerState({...timerState, isDisplayed: false});
            setTimerState({...timerState, isCouterRotate: false});
        } else {
            setTimerState({...timerState, isDisplayed: true});
            setTimerState({...timerState, isCouterRotate: true});
        }
    }

    useEffect(() => {
        setInterval(() => {
            countDownTimer();
        }, 1000);
    })

  return (
    <Fragment>
        <div className="">
            <div className="progress-container flex items-center justify-center">
                <div className="semicircle" style={timerState.isCouterRotate ? {transform: `rotate(${timerState.angle}deg)`, transition: "1s linear"}: {transform: 'rotate(180deg)', transition: "1s linear"}}></div>
                <div className="semicircle"></div>
                <div className="semicircle" style={timerState.isDisplayed ? {display: "block"}: {display: "none"}}></div>
                <div className="outermost-circle"></div>
            </div>
        </div>
    </Fragment>
  )
}

export default ProgressTimer