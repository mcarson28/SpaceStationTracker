$(document).ready(function() {

	var map;
	var mapmarker;
	var currentLatitude = 0;
	var currentLongitude = 0;


	initialize();
	setInterval(updateMarkers, 5000);

	function initialize(){
		var coordinates = getCurrentPosition();

		var mapProp = {
			center:new google.maps.LatLng(coordinates.latitude, coordinates.longitude),
			zoom:3,
			mapTypeId:google.maps.MapTypeId.ROADMAP
		};

		map = new google.maps.Map(document.getElementById('googleMap'),
			mapProp);

		mapmarker = new google.maps.Marker({
			position: new google.maps.LatLng(coordinates.latitude, coordinates.longitude),
			title:"ISS Position",
			map:map
		});

		updateCoordinatesOnPage(coordinates.latitude, coordinates.longitude);
	}

	function getCurrentPosition(){
		$.ajax({
			url: "https://api.wheretheiss.at/v1/satellites/25544"
		}).then(function(data) {
			currentLatitude = data.latitude;
			currentLongitude = data.longitude;
		});
		return {latitude: currentLatitude, longitude: currentLongitude};
	}

	function updateMarkers(){
		var coordinates = getCurrentPosition();
		currentLatitude = coordinates.latitude;
		currentLongitude = coordinates.longitude;
		updateCoordinatesOnPage(currentLatitude, currentLongitude);

		if (map.getBounds().contains(mapmarker.getPosition())){
			var newLatLng = new google.maps.LatLng(currentLatitude, currentLongitude);
			mapmarker.setPosition(newLatLng);
		}
		else{
			initialize();
		}
	}

	function updateCoordinatesOnPage(latitude, longitude){
		$('.Latitude').text("Latitude: " + latitude + " Degrees");
		$('.Longitude').text("Longitude: " + longitude + " Degrees");
	}
});







