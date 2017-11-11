
// APP STRUCTURE

//CODE
//

$(document).ready(function() {

//////// FIREBASE ///////
// <script src="https://www.gstatic.com/firebasejs/4.6.2/firebase.js"></script>
// <script>
//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyCLL3aCBdebJC_74YWY04BLw48vJPBL1kM",
//     authDomain: "decision-dictator.firebaseapp.com",
//     databaseURL: "https://decision-dictator.firebaseio.com",
//     projectId: "decision-dictator",
//     storageBucket: "",
//     messagingSenderId: "1029892439948"
//   };
//   firebase.initializeApp(config);
// </script>


//////// GLOBAL STUFF ///////

// grabs values from page_submitData_Region (Screen 1)	
var user_choosedLocation;
var user_choosedBiz;







//////// METHODS ///////
		var app = {
			// app scope global variables
			zomato_startAtResult:0,
			zomato_resultsToReturn:5,
			zomato_data:0,

			brewery_data:0,

			setup: function() {
			// hide sections of app not using

			},

			results_brewery: function(location) {
				// http://api.brewerydb.com/v2/locations?key=aa416dc9ba758638ac327b58ee7ee727&locality=raleigh
				var APIKey_brewery = "aa416dc9ba758638ac327b58ee7ee727";
				var brewery_endpoint = "locations";
				// var brewery_variable_location = "&locality=";
				var brewery_location_value = location;

				// assign the locality, a city name
				if (brewery_location_value===1.1) {
					brewery_location_value="raleigh";
				}
				if (brewery_location_value===1.2) {
					brewery_location_value="durham";
				}
				if (brewery_location_value===1.3) {
					brewery_location_value="chapel%20hill";
				}
				console.log(brewery_location_value);

				var queryURL_brewery = "http://api.brewerydb.com/v2/" + brewery_endpoint + "?key=" + APIKey_brewery + "&locality=" + brewery_location_value;
				alert(queryURL_brewery);

				// AJAX Call
				$.ajax({
					url: queryURL_brewery,
					method: "GET",
					headers: {
						"APIkey": "aa416dc9ba758638ac327b58ee7ee727"
					}
					}).done(function(dataBrewery) {
						this.brewery_data = dataBrewery;
						console.log(this.brewery_data);
				});
			},

			results_zomato: function(location) {
				var zomato_location = location;

				// assign the entity_id associated with the zone of the city
				if (zomato_location===1.1) {
					zomato_location=95008;
				};


				var queryURL_zomato = "https://developers.zomato.com/api/v2.1/search?entity_id=" + zomato_location + "&entity_type=zone&start=" + this.zomato_startAtResult + "&count=" + this.zomato_resultsToReturn;

				// AJAX Call
				$.ajax({
					url: queryURL_zomato,
					method: "GET",
					headers: {
						"user-key": "262a8901410f92714e29cd56d11b11bf"
					}
					}).done(function(dataZomato) {
						this.zomato_data = dataZomato;
						console.log(this.zomato_data);
				});
			}

		}

////// RUN APP //////
		app.setup();


//// LISTENERS FOR page_submitData_Region //// 
		$(document).on("click", "#btn_submitCard", function() {

			// grab the selected values from the form
			user_choosedLocation = $('select.input-location').find(':selected').data('city');
			var user_choosedBiz = $('select.input-bizType').find(':selected').data('biz');
			console.log("User choosed: " + user_choosedLocation + " and " + user_choosedBiz);

			// user_choosedBiz 2.0 = Empty - Error
			// user_choosedBiz 2.1 = Food/Zomato API
			// user_choosedBiz 2.2 = Beer/Brewery API

			// user_choosedLocation 1.1 = Raleigh

			// the biz determines the api, the location is passed so we can change search parameters (not wired up yet)
			if (user_choosedBiz===2.1) {
				console.log("zomato fired")
				app.results_zomato(user_choosedLocation);
			}

			else if (user_choosedBiz===2.2) {
				console.log("brewery fired")
				app.results_brewery(user_choosedLocation);
			};

		});

});