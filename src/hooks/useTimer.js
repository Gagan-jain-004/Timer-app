import { useState, useRef, useEffect } from "react";

export function useTimer(initialValue) {
  const [timeLeft, setTimeLeft] = useState(initialValue);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = (duration) => {
    setTimeLeft(duration);
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(initialValue);
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  return { timeLeft, isRunning, start, pause, reset, setTimeLeft };
}
