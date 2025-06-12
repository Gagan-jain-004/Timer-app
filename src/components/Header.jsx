import React from "react";

export default function Header({ setView }) {
  return (
    <header className="p-4 flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-gray-800 shadow">
      <h1 className="text-2xl font-bold mb-2 sm:mb-0">⏱ Timer App</h1>
      <div className="space-x-2">
        <button onClick={() => setView("timer")} className="btn">Timer</button>
        <button onClick={() => setView("stopwatch")} className="btn">Stopwatch</button>
        <button onClick={() => setView("history")} className="btn">History</button>
      </div>
    </header>
  );
}