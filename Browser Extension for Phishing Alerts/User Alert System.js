// Display a warning banner if a phishing site is detected
function showAlert(url) {
    const alertBanner = document.createElement("div");
    alertBanner.style = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: red;
        color: white;
        text-align: center;
        padding: 10px;
        z-index: 9999;
    `;
    alertBanner.innerText = `Warning: The site "${url}" is potentially dangerous!`;
    document.body.prepend(alertBanner);
}

chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "alertUser") {
        showAlert(message.url);
    }
});
