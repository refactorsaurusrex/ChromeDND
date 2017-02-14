chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name !== 'chrome-dnd-snooze') return;
    chrome.contentSettings['notifications'].set({
      'primaryPattern': '<all_urls>',
      'setting': 'allow'
    });
});
