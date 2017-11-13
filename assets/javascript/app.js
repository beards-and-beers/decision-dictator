
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
	var apiResults;







//////// METHODS ///////
	var app = {
		// app scope global variables
		zomato_startAtResult:0,
		zomato_resultsToReturn:5,
		

		brewery_data:0,

		setup: function() {
		// hide sections of app not using

		},

		results_zomato: function(location, food) {
			// console.log("location " + location);
			// console.log("food " + food);
			var queryURL_zomato;

			var zomato_cuisine = food;
			console.log(zomato_cuisine);
			
			var zomato_location_value = location;
			var zomato_location_zone = 0;

			// associate cuisine cateogry with value

			// assign the entity_id associated with the zone of the city
			//Raleigh
			if (zomato_location_value===1.1) {
				zomato_location_value=95008;
				zomato_location_zone ="zone";
			};
			//Durham
			if (zomato_location_value===1.2) {
				zomato_location_value=95011;
				zomato_location_zone ="zone";
			};
			//Chapel Hill / subzone
			if (zomato_location_value===1.3) {
				zomato_location_value=119506;
				zomato_location_zone ="subzone";
			};

			if (zomato_cuisine===2.1) {
			// everything
			console.log("everything fired");
				queryURL_zomato = "https://developers.zomato.com/api/v2.1/search?entity_id=" + zomato_location_value + "&entity_type=" + zomato_location_zone + "&start=" + this.zomato_startAtResult + "&count=" + this.zomato_resultsToReturn;

			};

			console.log(queryURL_zomato);
			// AJAX Call
			$.ajax({
				url: queryURL_zomato,
				method: "GET",
				headers: {
					"user-key": "262a8901410f92714e29cd56d11b11bf"
				}
				})

				.done(function(dataZomato) {
					apiResults = dataZomato;
					// broken down results from API
					console.log(apiResults);
					console.log(apiResults.restaurants["0"].restaurant.name);
					console.log(apiResults.restaurants["0"].restaurant.url);
					console.log(apiResults.restaurants["0"].restaurant.location.address)
					
					// var's with specific info
					var name = apiResults.restaurants["0"].restaurant.name;
					var url = apiResults.restaurants["0"].restaurant.url;
					var address = apiResults.restaurants["0"].restaurant.location.address;

					
					//info from object could run through an array
					// 	for (var i = 0; i < apiResults.length; i++) {
					// 	var name = apiResults[i].restaurants.restaurant.name;

					//put the info into the results table
					// $("#page_resultsList_01").append("<td>" + name + "</td>");
					//or
					// $("#results-body > tbody").append("<tr><td>" + name + "</td><td>" + url + "</td><td>" + address + "</td></tr>");

			 	})
			
				



			
		}

	}

////// RUN APP //////
	app.setup();
		// hide divs
		$("#page_errorCard_Region").hide();

//// LISTENERS FOR page_submitData_Region //// 
	$(document).on("click", "#btn_submitCard", function() {
		// hide error div if it is currently open
		$("#page_errorCard_Region").hide();

		// grab the selected values from the form
		user_choosedLocation = $('select.input-location').find(':selected').data('city');
		user_choosedBiz = $('select.input-bizType').find(':selected').data('biz');

		// user_choosedLocation = parseInt(user_choosedLocation);
		// user_choosedBiz = parseInt(user_choosedBiz);

		// console.log("User choosed: " + user_choosedLocation + " and " + user_choosedBiz);


		if (user_choosedBiz==="2.0" || user_choosedLocation==="1.0") {
			// show error div
			$("#page_errorCard_Region").show();
		};

		
		// NOT SURE WHY sometime strings work ans sometimes they dont
		if (user_choosedBiz===2.1 && user_choosedLocation!=="1.0") {
			app.results_zomato(user_choosedLocation, user_choosedBiz);
		};


		if (user_choosedBiz===2.2 && user_choosedLocation!=="1.0") {
			app.results_zomato(user_choosedLocation, user_choosedBiz);
		};

		
	});



});