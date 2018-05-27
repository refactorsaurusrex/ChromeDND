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
  chrome.contentSettings['notifications'].clear({ });
  var options = {
    type: "basic",
    title: "Do Not Disturb Has Ended",
    message: "All the attention you need and crave is on its way!",
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAARFQTFRF//////8A/78A/7Yk/78g48Yc7cgS7swR778g8MMe8cYc8skb8r8a88IY88UX9MgW68Qd7sQa78UZ78cY8MEX8MMX7sIc78Ya8MIa8cUY8cQX8sUb8sYa8sIa78IY78MY78QY8MUX8cQY8cUY8MQa8cUa8cQZ78QY78Ua8MQa8MQa8MQZ8cUa8MMa8MUY8MMY8MQa8MUa78Qa8MMZ8MUZ8MUa8MMZ8MQZ8MQZ8MUZ8cQY78Ua8MQZ8MQZ78QZ8MQZ8MQZ8MMZ8MQZ8MQZ8MMZ8MQZ8MQa8MQZ8MQZ8MQa8MQZ8MQZ8MQZ7d4b7d8b7eAb7eEb7eIb7tQa7tYa7tsb7twb78kZ780a8MQZ8MUZ8McZbru3BwAAAE10Uk5TAAEEBwgJDg8QERITFBUWFxoeHyAhIi4xMjU4OTo7P0BBQkpLV1hbX2FjZGdtd4iJi4yUmqaqq6yur7GzurvEzM7W2ODj5/D2+Pr7/P39/WFcAAACpklEQVRYw+VXa5vZQBSeLLrWUreSdlnqUq1FsWi1LnVZGreVCOvw/39IkwnLRDLRZ3zp0/fLTDLnfWfmzO0chOhoNhETrgGumQScAM5/UiCe504F4nX/2QIdSJ8K9CBD49zkfYePMrR3Nbsg2LVaAoTbg4Uvf6MTyEM/+PoRmgK/qyaTu0oNqgfrYB/yOgFf/1jhJ2T1Q2z9vjvm9316g+Cxgv2LTS04L59K8V7s0bfvjE2R2W/u7mt3DBjjbjHCISs+2eAqDYDAoOSy4mtNAbXiKAzhBMOCQ20LmPOxQkUpYk9giKeY0lih8BX5yj1CuRGYYJRD6L4SoO/Cq8e9+WYtL2eiOFvK683+3+OV5Tbe87fyXHrFXN7uFaz4uV3vC1EiIC52o8jR+TFt/tuVdIKVNohRzIjnz7hx6dD8//IsGeD5RVsLvJqhcid+JFAHoRpVyoLWvyFfUdDGUEDI05gCcZziPYBJGLnw/tmsJBOssB+GLpQFaKc5YhKJbz9uUQn3sJBMscAGJcR94o08weH9vxXNBUQ8iQFnsgQRrC9LFMjYJGIiUMQemNME5tgLRROBrtq4lqhYqzZdYz43tpzBbg5jYyd48fyWdIElNvIS76dThXJ587htRheYYSNlEe2Ypry8Te2MCEmUwhWRLiBioxRKChqvyS7APAV2J15uGZk3EvtWZj5MbMeZz9rOv1A8rVqC7DvdBng4/0oLTwB6cSI+gWnDc/6liqJVAb4fCXz4VQ793bWO3J/fXPJhudzTxv64Mj7vrAEGa4jDGmSxhnmsgSb5O+zRh7q2Bw9VgQy2o5OW3iALDWqwTYT7qAo1fbjPwzREC/eJhMMtQEKfcKA2lGkJB4EM9E5TnjR0zs6Z/PX3Bllb5uP/lHheMPm2Tv//AMw4I4hSAbGOAAAAAElFTkSuQmCC'
  }
  chrome.notifications.create(options)
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
