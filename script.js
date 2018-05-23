const geo = navigator.geolocation;

geo.getCurrentPosition((position) => {
	weather.fetch('GET', `https://fcc-weather-api.glitch.me/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
		.then(data => {
			weather.show(JSON.parse(data));
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
	show(response) {
		let data = response;
		document.getElementById('clouds').innerHTML = response.clouds.all; 
		document.getElementById('winds').innerHTML = response.wind.speed; 
		document.getElementById('pop').innerHTML = response.main.humidity;
		document.getElementById('temperature').innerHTML = Math.round(response.main.temp);
		document.getElementById('max').innerHTML = response.main.temp_max;
		document.getElementById('min').innerHTML = response.main.temp_min;
		document.getElementById('city').innerHTML = response.name;
		document.getElementById('country').innerHTML = response.sys.country;
		document.getElementById('desc').innerHTML = response.weather[0].main;
		document.getElementById('icon').innerHTML = `<img src="${response.weather["0"].icon}" style="height: 150px;width: 175px;"></img>`;
	},
	convert() {
		let unit = document.getElementById('unit');
		let temp = document.getElementById('temperature');
		let max = document.getElementById('max');
		let min = document.getElementById('min');
		
		let temps = [temp, min, max];
		console.log(temps);
		switch(unit.innerHTML) {
			case '℉':
				temps.map(element => {
					unit.innerText = '℃';
					element.innerHTML = Math.round((element.innerHTML - 32) * 5 / 9)
				});
				break;
			case '℃':
				temps.map(element => {
					unit.innerText = '℉';
					element.innerHTML = Math.round(element.innerHTML * 9 / 5 + 32);
				});
				break;
		}
	}
}

document.getElementById('unit').addEventListener('click', function() {
	weather.convert();
});

// 	url + ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime(), true); //prevents caching API response by adding new Date object to params
