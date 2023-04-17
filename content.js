// content.js

function getCurrentMessage() {
  let selectedMessage = document.querySelector('.message.selected');
  if (selectedMessage) {
    let messageText = selectedMessage.querySelector('.message-body-content').innerText;
    return messageText;
  }
  return null;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getCurrentMessage') {
    sendResponse({ message: getCurrentMessage() });
  }
});

