export const captureClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText();
    chrome.storage.local.get(["clipboardHistory"], (result) => {
      const updatedHistory = [text, ...(result.clipboardHistory || [])];
      chrome.storage.local.set({ clipboardHistory: updatedHistory });
    });
  } catch (error) {
    console.error("Failed to access clipboard", error);
  }
};
