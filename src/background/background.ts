chrome.runtime.onInstalled.addListener(() => {
  console.log("Clipboard Manager installed!");

  // Initialize clipboard history as an empty array if not already set
  chrome.storage.local.get("clipboardHistory", (result) => {
    if (!result.clipboardHistory) {
      chrome.storage.local.set({ clipboardHistory: [] }, () => {
        console.log("Clipboard history initialized!");
      });
    }
  });
});

// Listen for a command to save clipboard data
chrome.commands.onCommand.addListener((command) => {
  if (command === "save-clipboard") {
    // Access the currently active tab to retrieve the selected text
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];

      // Execute script to get the selected text from the current page
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTab.id! },
          func: getSelectedText,
        },
        (injectionResults) => {
          const selectedText = injectionResults[0].result; // Selected text from the page

          if (selectedText) {
            // Get current clipboard history
            chrome.storage.local.get("clipboardHistory", (result) => {
              const history = result.clipboardHistory || [];

              // Add new clipboard data (selected text) to the history
              history.unshift(selectedText); // Add at the beginning to keep the latest item at the top

              // Limit history to the latest 10 items (optional)
              if (history.length > 10) {
                history.pop(); // Remove the oldest item if there are more than 10
              }

              // Save updated clipboard history back to storage
              chrome.storage.local.set({ clipboardHistory: history }, () => {
                console.log("Clipboard data saved:", selectedText);
              });
            });
          } else {
            console.log("No text selected on the page.");
          }
        }
      );
    });
  }
});

// Function to get the selected text on the page
function getSelectedText() {
  return window.getSelection()?.toString();
}

// Listen for changes in storage (e.g., when clipboard data is updated)
chrome.storage.onChanged.addListener((changes) => {
  console.log("Storage updated:", changes);
});
