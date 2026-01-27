// Claude Wide Chat - Content Script
// Applies user settings from storage to CSS variables

const DEFAULT_SETTINGS = {
  maxWidth: 90,
  sidePadding: 2,
  textAlign: 'left'
};

function applySettings(settings) {
  const root = document.documentElement;
  root.style.setProperty('--cwc-max-width', `${settings.maxWidth}%`);
  root.style.setProperty('--cwc-side-padding', `${settings.sidePadding}%`);
  root.style.setProperty('--cwc-text-align', settings.textAlign);
}

// Load and apply settings on page load
chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
  applySettings(settings);
});

// Listen for settings changes from popup
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync') {
    const newSettings = {};
    if (changes.maxWidth) newSettings.maxWidth = changes.maxWidth.newValue;
    if (changes.sidePadding) newSettings.sidePadding = changes.sidePadding.newValue;
    if (changes.textAlign) newSettings.textAlign = changes.textAlign.newValue;
    
    chrome.storage.sync.get(DEFAULT_SETTINGS, (current) => {
      applySettings({ ...current, ...newSettings });
    });
  }
});
