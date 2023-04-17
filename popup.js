// popup.js

function getCurrentMessage() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'getCurrentMessage' }, (response) => {
      document.getElementById('message-text').innerText = response.message || 'No message selected';
    });
  });
}

function generateReply() {
  const message = document.getElementById('message-text').innerText;
  if (message === 'No message selected') return;

  chrome.runtime.sendMessage({ action: 'generateReply', prompt: message }, (response) => {
    document.getElementById('reply-text').innerText = response.reply;
  });
}

function acceptReply() {
  const reply = document.getElementById('reply-text').innerText;
  if (reply === 'Click \'Generate Reply\' to start') return;
  // You can implement your own logic here to send the reply back to the Teams chat.
}

document.getElementById('generate-reply').addEventListener('click', generateReply);
document.getElementById('accept-reply').addEventListener('click', acceptReply);
getCurrentMessage();

