import React, { useEffect, useState } from "react";
import { getHistory } from "../utils/history";

export default function History() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    setEntries(getHistory());
  }, []);

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">History</h2>
      <ul className="space-y-1">
        {entries.map((entry, index) => (
          <li key={index} className="p-2 bg-white dark:bg-gray-700 rounded shadow">
            {entry.type} - {entry.duration}s at {new Date(entry.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
