import React, { useState, useEffect } from "react";
import { useTimer } from "../hooks/useTimer";
import { saveToHistory } from "../utils/history";

export default function Timer() {
  const [input, setInput] = useState(60);
  const {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
    setTimeLeft,
  } = useTimer(input);
  const total = input;
  const [showAlert, setShowAlert] = useState(false);
  const [audio] = useState(new Audio("/alarm.mp3"));

  const handleStart = () => {
    start(input);
  };

  const handleComplete = () => {
    if (Notification.permission === "granted") {
      new Notification("⏰ Timer finished!");
    }
    audio.play();
    saveToHistory({ type: "Timer", duration: input });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 4000);
  };

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      handleComplete();
    }
  }, [timeLeft]);

  useEffect(() => {
    if (!isRunning) setTimeLeft(input);
  }, [input]);

  const circleRadius = 50;
  const circumference = 2 * Math.PI * circleRadius;
  const offset = circumference - (timeLeft / total) * circumference;

  return (
    <div className="space-y-4 flex flex-col items-center">
      <input
        type="number"
        min="1"
        className="border p-2 rounded w-full max-w-xs text-black"
        value={input}
        onChange={(e) => setInput(Number(e.target.value))}
      />

      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={circleRadius}
          stroke="gray"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={circleRadius}
          stroke="blue"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
      </svg>

      <div className="text-5xl font-mono">{timeLeft}s</div>
      <div className="space-x-2">
        {!isRunning && (
          <button onClick={handleStart} className="btn">
            Start
          </button>
        )}
        {isRunning && (
          <button onClick={pause} className="btn">
            Pause
          </button>
        )}
        <button onClick={reset} className="btn">
          Reset
        </button>
      </div>

      {showAlert && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow animate-pulse z-50">
          ⏰ Timer Completed!
        </div>
      )}
    </div>
  );
}