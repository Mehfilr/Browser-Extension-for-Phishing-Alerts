// Content Script: Monitor URLs and send for analysis
chrome.webNavigation.onCompleted.addListener((details) => {
    const url = details.url;
    chrome.runtime.sendMessage({ action: "analyzeURL", url });
});
