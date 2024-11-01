/**
 * Created by garykovar on 7/5/17.
 */

(function(d, script) {
	script = d.createElement('script');
	script.type = 'text/javascript';
	script.async = true;
	script.defer = true;
	script.onload = function(){
		// remote script has loaded
	};
	script.src = 'https://maps.googleapis.com/maps/api/js?key=' + wp_maps_api + '&libraries=places&callback=initAutocomplete';
	d.getElementsByTagName('head')[0].appendChild(script);
}(document));

var placeSearch, autocomplete;

function initAutocomplete() {
	// Create the autocomplete object, restricting the search to geographical
	// location types.
	autocomplete = new google.maps.places.Autocomplete(
		/** @type {!HTMLInputElement} */(document.getElementById('_wp_places')) );

	// When the user selects an address from the dropdown, populate the address
	// fields in the form.
	autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
	// Get the place details from the autocomplete object.
	var place = autocomplete.getPlace();

	document.getElementById('wp_place_id').value=place.place_id;
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var geolocation = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			var circle = new google.maps.Circle({
				center: geolocation,
				radius: position.coords.accuracy
			});
			autocomplete.setBounds(circle.getBounds());
		});
	}
}