chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name !== 'chrome-dnd-snooze') return;

    chrome.contentSettings['notifications'].set({
      'primaryPattern': '<all_urls>',
      'setting': 'allow'
    });

    chrome.browserAction.setIcon({path: 'images\\bell-gray-16.png'});
    chrome.browserAction.setPopup({popup: 'dnd-inactive.html'});

    // Display notification here
});
