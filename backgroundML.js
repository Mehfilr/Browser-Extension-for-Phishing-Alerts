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



let model;

async function loadModel() {
  model = await tf.loadLayersModel('path/to/your/model.json');
}

async function checkForPhishing(url) {
  const features = extractFeatures(url); // Implement this function to extract features
  const inputTensor = tf.tensor2d([features]);
  const prediction = model.predict(inputTensor);
  const isPhishing = prediction.dataSync()[0] > 0.5; // Adjust threshold as needed

  if (isPhishing) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon128.png',
      title: 'Phishing Alert!',
      message: `The URL ${url} is suspected of phishing.`,
      priority: 2
    });
  }
}