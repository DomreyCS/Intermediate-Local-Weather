const geo = navigator.geolocation;

geo.getCurrentPosition((position) => {
	weather.fetch('GET', `https://fcc-weather-api.glitch.me/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
		.then(result => {
			console.log(result);
		});
});

let weather = {
	fetch(method, url) {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.open("GET", url, true);
			xhr.onload = function() {
				if (this.readyState === 4 && this.status === 200) {
					resolve(xhr.responseText);
				} else {
					reject({
						status: this.status,
						statusText: xhr.statusText
					});
				}
			};
			xhr.onerror = function() {
				reject({
					status: this.status,
					statusText: xhr.statusText
				});
			};
			xhr.send();
		})
	},
	show(unit) {
	    // conversion based on unit
	    // DOM manipulations
	}
}
// 	url + ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime(), true); //prevents caching API response by adding new Date object to params
