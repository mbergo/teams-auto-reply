// background.js

const apiKey = 'your_openai_api_key_here';
const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

async function generateReply(prompt) {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 0.8
    })
  });

  const data = await response.json();
  return data.choices[0].text.trim();
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'generateReply') {
    generateReply(request.prompt).then(reply => {
      sendResponse({ reply: reply });
    });
    return true;
  }
});

