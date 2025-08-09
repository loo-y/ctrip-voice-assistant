// popup.js
document.addEventListener('DOMContentLoaded', function() {
  const statusEl = document.getElementById('status');
  const toggleBtn = document.getElementById('toggle-btn');
  
  // 检查当前标签页是否为携程旅行网站
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const currentTab = tabs[0];
    if (currentTab.url && currentTab.url.includes('vacations.ctrip.com')) {
      statusEl.textContent = '已激活';
      statusEl.style.color = 'green';
      toggleBtn.textContent = '与页面交互';
    } else {
      statusEl.textContent = '未激活';
      statusEl.style.color = 'red';
      toggleBtn.textContent = '仅在携程旅行网站可用';
      toggleBtn.disabled = true;
    }
  });
});