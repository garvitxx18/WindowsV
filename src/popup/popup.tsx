import { useState, useEffect } from "react";

const Popup = () => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    chrome.storage.local.get(["clipboardHistory"], (result) => {
      setHistory(result.clipboardHistory || []);
    });
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="p-4 min-w-[300px]">
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 border rounded"
        onChange={(e) => {
          const query = e.target.value.toLowerCase();
          setHistory((prev) =>
            prev.filter((item) => item.toLowerCase().includes(query))
          );
        }}
      />
      <ul className="mt-4 space-y-2">
        {history.map((item, index) => (
          <li
            key={index}
            className="p-2 bg-gray-100 rounded shadow cursor-pointer hover:bg-gray-200"
            onClick={() => copyToClipboard(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Popup;
