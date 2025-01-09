chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    checkForPhishing(tab.url);
  }
});

async function checkForPhishing(url) {
  const apiKey = 'YOUR_API_KEY'; // Replace with your API key
  const response = await fetch(`https://api.phishing.com/check?url=${encodeURIComponent(url)}&apikey=${apiKey}`);
  const data = await response.json();

  if (data.isPhishing) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon128.png',
      title: 'Phishing Alert!',
      message: `The URL ${url} is suspected of phishing.`,
      priority: 2
    });
  }
}