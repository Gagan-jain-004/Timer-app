import { useState, useRef, useEffect } from "react";

export function useStopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState([]);
  const [running, setRunning] = useState(false);
  const interval = useRef(null);

  useEffect(() => {
    if (running) {
      interval.current = setInterval(() => {
        setElapsed(prev => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval.current);
  }, [running]);

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setElapsed(0);
    setLaps([]);
  };
  const lap = () => setLaps([...laps, elapsed]);

  return { elapsed, running, laps, start, pause, reset, lap };
}
