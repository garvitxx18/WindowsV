chrome.runtime.onInstalled.addListener(() => {
  console.log("Clipboard Manager installed!");
  chrome.storage.local.set({ clipboardHistory: [] }, () => {
    console.log("Clipboard history initialized!");
  });
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle-popup") {
    chrome.action.openPopup();
  }
});
chrome.commands.onCommand.addListener((command) => {
  if (command === "save-clipboard") {
    // Simulate clipboard data for now (you would replace this with real clipboard data)
    const clipboardData = "Simulated Clipboard Content";

    // Get the current clipboard history
    chrome.storage.local.get("clipboardHistory", (result) => {
      const history = result.clipboardHistory || [];

      // Add new clipboard data to the history
      history.unshift(clipboardData); // Add at the beginning to keep the latest item at the top

      // Limit history to the latest 10 items (optional)
      if (history.length > 10) {
        history.pop(); // Remove the oldest item if there are more than 10
      }

      // Save updated clipboard history back to storage
      chrome.storage.local.set({ clipboardHistory: history }, () => {
        console.log("Clipboard data saved!");
      });
    });
  }
});

chrome.storage.onChanged.addListener((changes) => {
  console.log("Storage updated:", changes);
});
