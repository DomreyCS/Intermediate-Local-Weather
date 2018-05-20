let geo = navigator.geolocation;

geo.getCurrentPosition(function(position){
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    weather.update(lat, lon);
});

let weather = {
    update(lat, lon) {
        let url = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`;
        let xhr = new XMLHttpRequest();
	// Handles API response
	xhr.onload = function(){
	    //update DOM
    	     if (this.readyState === 4 && this.status === 200) {
    	         console.log(JSON.parse(this.responseText));
    	     }
	};
	xhr.open('GET', url + ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime(), true); //prevents caching API response by adding new Date object to params
	xhr.send(null);
    }
}