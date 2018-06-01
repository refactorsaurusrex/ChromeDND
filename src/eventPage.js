chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name !== 'chrome-dnd-snooze') return;
    endSnoozeAuto();
});
