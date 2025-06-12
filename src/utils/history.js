export function saveToHistory(entry) {
  const history = JSON.parse(localStorage.getItem("timerHistory")) || [];
  const newEntry = { ...entry, timestamp: new Date().toISOString() };
  localStorage.setItem("timerHistory", JSON.stringify([newEntry, ...history]));
}

export function getHistory() {
  return JSON.parse(localStorage.getItem("timerHistory")) || [];
}