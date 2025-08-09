// options.js
document.addEventListener('DOMContentLoaded', function() {
  const speedSelect = document.getElementById('voice-speed');
  const langSelect = document.getElementById('voice-lang');
  const saveBtn = document.getElementById('save-btn');
  
  // 加载保存的设置
  chrome.storage.sync.get(['voiceSpeed', 'voiceLang'], function(result) {
    if (result.voiceSpeed) {
      speedSelect.value = result.voiceSpeed;
    }
    if (result.voiceLang) {
      langSelect.value = result.voiceLang;
    }
  });
  
  // 保存设置
  saveBtn.addEventListener('click', function() {
    chrome.storage.sync.set({
      voiceSpeed: speedSelect.value,
      voiceLang: langSelect.value
    }, function() {
      // 显示保存成功的提示
      const originalText = saveBtn.textContent;
      saveBtn.textContent = '设置已保存!';
      setTimeout(() => {
        saveBtn.textContent = originalText;
      }, 2000);
    });
  });
});