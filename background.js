chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "sendToDiscord",
    title: "Send to Discord",
    contexts: ["selection", "image"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sendToDiscord") {
    if (info.selectionText) {
      sendToWebhook(info.selectionText);
    } else if (info.srcUrl) {
      sendToWebhook(info.srcUrl);
    }
  }
});

function sendToWebhook(content) {
  chrome.storage.sync.get('webhookUrl', function(data) {
    const webhookUrl = data.webhookUrl;

    if (!webhookUrl) {
      alert('Please configure your webhook URL in the extension popup.');
      return;
    }

    fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Message sent to Discord");
      })
      .catch(error => {
        console.error("Error sending message to Discord:", error);
      });
  });
}
