function activateSnooze() {

  chrome.contentSettings['notifications'].set({
    'primaryPattern': '<all_urls>',
    'setting': 'block'
  });

  var delay = parseFloat(this.dataset.snooze);
  chrome.alarms.create("chrome-dnd-snooze", {delayInMinutes: delay} );
  chrome.browserAction.setIcon({path: 'images\\bell-red-16.png'});
  chrome.browserAction.setPopup({popup: 'dnd-active.html'});
  window.close();
}

function endSnooze() {
  chrome.contentSettings['notifications'].set({
    'primaryPattern': '<all_urls>',
    'setting': 'allow'
  });

  chrome.browserAction.setIcon({path: 'images\\bell-gray-16.png'});
  chrome.browserAction.setPopup({popup: 'dnd-inactive.html'});
  window.close();
}

var startOptions = document.querySelectorAll('.dnd-start');
Array.prototype.forEach.call(startOptions, function(el, i){
  el.addEventListener('click', activateSnooze);
});

var endItem = document.getElementById('dnd-end');
if (endItem !== null)
  endItem.addEventListener('click', endSnooze);

var timeRemainingElement = document.getElementById('time-remaining');
if (timeRemainingElement !== null) {
  chrome.alarms.get('chrome-dnd-snooze', function(alarm){
    var minutes = (alarm.scheduledTime - Date.now()) / 1000 / 60;
    var timeRemaining = 0;

    if (minutes > 60) {
      var timeString = (minutes / 60).toString();
      var index = timeString.indexOf(".");
      timeRemaining = timeString.substring(0, index + 2) + 'h';
    } else if (minutes < 1) {
      timeRemaining = "1m";
    } else {
      timeRemaining = ~~minutes + 'm';
    }

    timeRemainingElement.innerText = timeRemaining;
  });
}
