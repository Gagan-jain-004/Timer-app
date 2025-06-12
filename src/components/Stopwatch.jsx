import React, { useState, useEffect, useRef } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const handleLap = () => {
    setLaps([...laps, time]);
  };

  const format = (ms) => {
    const date = new Date(ms);
    return date.toISOString().substr(11, 12);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-5xl font-mono">{format(time)}</div>
      <div className="space-x-2">
        {!running && <button onClick={() => setRunning(true)} className="btn">Start</button>}
        {running && <button onClick={() => setRunning(false)} className="btn">Pause</button>}
        <button onClick={() => { setTime(0); setLaps([]); }} className="btn">Reset</button>
        {running && <button onClick={handleLap} className="btn">Lap</button>}
      </div>
      <ul className="w-full max-w-xs text-left">
        {laps.map((lap, index) => (
          <li key={index}>Lap {index + 1}: {format(lap)}</li>
        ))}
      </ul>
    </div>
  );
}