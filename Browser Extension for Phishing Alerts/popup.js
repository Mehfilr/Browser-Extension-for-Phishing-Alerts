// popup.js

// Fetch the existing blocklist from storage
chrome.storage.sync.get('blockedUrls', (data) => {
  const blockedUrls = data.blockedUrls || [];
  updateBlocklistDisplay(blockedUrls);
});

// Handle adding a new URL to the blocklist
document.getElementById('addButton').addEventListener('click', () => {
  const urlInput = document.getElementById('urlInput');
  const urlToAdd = urlInput.value.trim();
  if (urlToAdd) {
    chrome.storage.sync.get('blockedUrls', (data) => {
      const blockedUrls = data.blockedUrls || [];
      blockedUrls.push(urlToAdd);
      chrome.storage.sync.set({ blockedUrls: blockedUrls });
      updateBlocklistDisplay(blockedUrls);
      urlInput.value = ''; // Clear the input
    });
  }
});

// Update the blocklist display
function updateBlocklistDisplay(blockedUrls) {
  const blocklistElement = document.getElementById('blocklist');
  blocklistElement.innerHTML = ''; // Clear existing list
  blockedUrls.forEach((url) => {
    const listItem = document.createElement('li');
    listItem.textContent = url;
    blocklistElement.appendChild(listItem);
  });
}
