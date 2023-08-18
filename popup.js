document.addEventListener('DOMContentLoaded', function() {
  const webhookInput = document.getElementById('webhookInput');
  const saveButton = document.getElementById('saveButton');

  // Load the saved webhook URL when the popup is opened
  chrome.storage.sync.get('webhookUrl', function(data) {
    webhookInput.value = data.webhookUrl || '';
  });

  // Save the webhook URL when the user clicks the save button
  saveButton.addEventListener('click', function() {
    const webhookUrl = webhookInput.value;
    chrome.storage.sync.set({ 'webhookUrl': webhookUrl }, function() {
      alert('Webhook URL saved.');
    });
  });
});
