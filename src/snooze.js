function activateSnooze() {

  chrome.contentSettings['notifications'].set({
    'primaryPattern': '<all_urls>',
    'setting': 'block'
  });

  var delay = parseInt(this.dataset.snooze);
  chrome.alarms.create("chrome-dnd-snooze", {delayInMinutes: delay} );
  window.close();
}

var elements = document.querySelectorAll('.dnd-start');
Array.prototype.forEach.call(elements, function(el, i){
  el.addEventListener('click', activateSnooze);
});
