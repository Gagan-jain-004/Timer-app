import React, { useState, useEffect } from "react";
import Timer from "./components/Timer";
import Stopwatch from "./components/Stopwatch";
import History from "./components/History";
import Header from "./components/Header";

export default function App() {
  const [view, setView] = useState("timer");

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header setView={setView} />
      <main className="p-4 max-w-2xl mx-auto">
        {view === "timer" && <Timer />}
        {view === "stopwatch" && <Stopwatch />}
        {view === "history" && <History />}
      </main>
    </div>
  );
}
