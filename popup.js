// Claude Wide Chat - Popup Script

const DEFAULT_SETTINGS = {
  maxWidth: 90,
  sidePadding: 2,
  textAlign: 'left'
};

const maxWidthSlider = document.getElementById('maxWidth');
const sidePaddingSlider = document.getElementById('sidePadding');
const maxWidthValue = document.getElementById('maxWidthValue');
const sidePaddingValue = document.getElementById('sidePaddingValue');
const alignButtons = document.querySelectorAll('.align-btn');
const resetBtn = document.getElementById('reset');

// Load saved settings
chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
  maxWidthSlider.value = settings.maxWidth;
  sidePaddingSlider.value = settings.sidePadding;
  maxWidthValue.textContent = `${settings.maxWidth}%`;
  sidePaddingValue.textContent = `${settings.sidePadding}%`;
  
  // Set active alignment button
  alignButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.align === settings.textAlign);
  });
});

// Save on change
maxWidthSlider.addEventListener('input', (e) => {
  const value = parseInt(e.target.value);
  maxWidthValue.textContent = `${value}%`;
  chrome.storage.sync.set({ maxWidth: value });
});

sidePaddingSlider.addEventListener('input', (e) => {
  const value = parseInt(e.target.value);
  sidePaddingValue.textContent = `${value}%`;
  chrome.storage.sync.set({ sidePadding: value });
});

// Alignment buttons
alignButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    alignButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    chrome.storage.sync.set({ textAlign: btn.dataset.align });
  });
});

// Reset button
resetBtn.addEventListener('click', () => {
  chrome.storage.sync.set(DEFAULT_SETTINGS, () => {
    maxWidthSlider.value = DEFAULT_SETTINGS.maxWidth;
    sidePaddingSlider.value = DEFAULT_SETTINGS.sidePadding;
    maxWidthValue.textContent = `${DEFAULT_SETTINGS.maxWidth}%`;
    sidePaddingValue.textContent = `${DEFAULT_SETTINGS.sidePadding}%`;
    
    alignButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.align === DEFAULT_SETTINGS.textAlign);
    });
  });
});
