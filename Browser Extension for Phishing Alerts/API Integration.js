// Background Script: Check URL against a phishing database
async function analyzeURL(url) {
    const apiEndpoint = "https://example-phishing-api.com/check";
    const response = await fetch(`${apiEndpoint}?url=${encodeURIComponent(url)}`);
    const result = await response.json();

    if (result.isPhishing) {
        chrome.runtime.sendMessage({ action: "alertUser", url });
    }
}

chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "analyzeURL") {
        analyzeURL(message.url);
    }
});
