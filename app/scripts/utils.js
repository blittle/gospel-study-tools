export function throttle(callback, limit) {
  var wait = false;
  return function() {
    if (!wait) {
      callback.call();
      wait = true;
      setTimeout(function() {
        wait = false;
      }, limit);
    }
  }
}

export function msToTime(duration) {
		function getPlural(val) {
			return val === 1 ? '': 's';
		}
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

		if (hours) {
			return `${hours} hour${getPlural(hours)} and ${minutes} minute${getPlural(minutes)}`;
		}

		if (minutes) {
			return `${minutes} minute${getPlural(minutes)}`;
		}
}
