import { useState, useEffect } from "react";

const App = () => {
  const [clipboardHistory, setClipboardHistory] = useState<string[]>([]);

  useEffect(() => {
    chrome.storage.local.get("clipboardHistory", (data) => {
      setClipboardHistory(data.clipboardHistory || []);
    });
  }, []);

  const clearHistory = () => {
    chrome.storage.local.set({ clipboardHistory: [] }, () => {
      setClipboardHistory([]);
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Clipboard Manager</h1>
      {clipboardHistory.length > 0 ? (
        <ul className="mb-4">
          {clipboardHistory.map((item, index) => (
            <li key={index} className="p-2 border-b">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p>No clipboard history available.</p>
      )}
      <button
        onClick={clearHistory}
        className="bg-red-500 text-white py-2 px-4 rounded"
      >
        Clear History
      </button>
    </div>
  );
};

export default App;
