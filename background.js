// Background script listens for a click on the extension's icon
chrome.action.onClicked.addListener((tab) => {
    if (tab && tab.id) {
        // Inject the content.js script into the active tab
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"],
        }).then(() => {
            console.log("Script injected successfully.");
        }).catch((error) => {
            console.error("Error injecting script:", error);
        });
    } else {
        console.error("No active tab found.");
    }
});
