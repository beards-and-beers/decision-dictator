
// APP STRUCTURE

//CODE
//

$(document).ready(function() {

//////// FIREBASE ///////
// <script src="https://www.gstatic.com/firebasejs/4.6.2/firebase.js"></script>

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCLL3aCBdebJC_74YWY04BLw48vJPBL1kM",
    authDomain: "decision-dictator.firebaseapp.com",
    databaseURL: "https://decision-dictator.firebaseio.com",
    projectId: "decision-dictator",
    storageBucket: "",
    messagingSenderId: "1029892439948"
  };
  firebase.initializeApp(config);



//////// GLOBAL STUFF ///////

// grabs values from page_submitData_Region (Screen 1)	
	var database = firebase.database();
	var user_choosedLocation;
	var user_choosedBiz;
	var apiResults;









//////// METHODS ///////
	var app = {
		// app scope global variables
		zomato_startAtResult: (Math.floor(Math.random() * 20) + (-1)),
		zomato_resultsToReturn:5,
	

		setup: function() {
		//hide unused panels on startup
		$("#page_resultsListRegion").hide();
		$("#page_resultRegion").hide();

		},


		// results_brewery: function(location) {
		// 	// http://api.brewerydb.com/v2/locations?key=aa416dc9ba758638ac327b58ee7ee727&locality=raleigh
		// 	var APIKey_brewery = "aa416dc9ba758638ac327b58ee7ee727";
		// 	var brewery_endpoint = "locations";
		// 	// var brewery_variable_location = "&locality=";
		// 	var brewery_location_value = location;

		// 	// assign the locality, a city name
		// 	if (brewery_location_value===1.1) {
		// 		brewery_location_value="raleigh";
		// 	}
		// 	if (brewery_location_value===1.2) {
		// 		brewery_location_value="durham";
		// 	}
		// 	if (brewery_location_value===1.3) {
		// 		brewery_location_value="chapel%20hill";
		// 	}
		// 	console.log(brewery_location_value);

		// 	var queryURL_brewery = "http://api.brewerydb.com/v2/" + brewery_endpoint + "?key=" + APIKey_brewery + "&locality=" + brewery_location_value;
		// 	alert(queryURL_brewery);

		// 	// AJAX Call
		// 	$.ajax({
		// 		url: queryURL_brewery,
		// 		method: "GET",
		// 		headers: {
		// 			"APIkey": "aa416dc9ba758638ac327b58ee7ee727"
		// 		}
		// 		}).done(function(dataBrewery) {
		// 			this.brewery_data = dataBrewery;
		// 			console.log(this.brewery_data);
		// 	});
		// },

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
					// console.log(apiResults);
					// console.log(apiResults.restaurants[2].restaurant.name);
					// console.log(apiResults.restaurants[2].restaurant.url);
					// console.log(apiResults.restaurants[2].restaurant.location.address);
					// console.log("The array is " + apiResults.restaurants.length);

					// // console.log( "Random is " + (Math.floor(Math.random() * 6) + (-1)) );  

					
					// // var's with specific info
					// var name = apiResults.restaurants[i].restaurant.name;
					// var url = apiResults.restaurants[i].restaurant.url;
					// var address = apiResults.restaurants[i].restaurant.location.address;

					
					//info from object could run through an array
					// 	for (var i = 0; i < apiResults.length; i++) {
					// 	var name = apiResults[i].restaurants.restaurant.name;

					//put the info into the results table
					// $("#page_resultsList_01").append("<td>" + name + "</td>");
					//or
					// $("#results-body > tbody").append("<tr><td>" + name + "</td><td>" + url + "</td><td>" + address + "</td></tr>");


					for (var i = 0; i < apiResults.restaurants.length; i++) {
						var step1_name = apiResults.restaurants[i].restaurant.name;
						var step1_type = apiResults.restaurants[i].restaurant.cuisines;

						$("#results_body > tbody").append("<tr><td>" + step1_name + "</td><<td>" + step1_type + "</td></tr>");
					}

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

		//show results panels
		$("#page_resultsListRegion").show();
		$("#page_resultRegion").show();
		//hide inputs form
		$("#page_submitData_Region").hide();

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

//// LISTENERS FOR page_submitData_Region //// 
	$(document).on("click", "#btn_submitBiz", function() {

		//hide results region
			$("#page_resultsListRegion").hide();
			$("#page_btn_seeRecent").hide();


		// pick random number
		var random_Number = (Math.floor(Math.random() * 30) + (-1));

		// grab content
		var final_name = apiResults.restaurants[random_Number].restaurant.name;
		var final_type = apiResults.restaurants[random_Number].restaurant.cuisines;
		var final_url = apiResults.restaurants[random_Number].restaurant.url;
		var final_address = apiResults.restaurants[random_Number].restaurant.location.address;

		database.ref().push({
			final_name,
			final_type,
			final_url,
			final_address

		});

		// send to page
		$("#page_result").html(	
			"<h4>" + final_name + "</h4>" +
			"<p>Type:" + final_type + "</p>" +
			"<p><a href=" + final_url + "\' target=\'_blank\'>View Details</a></p>" +
			"<p>Address: " + final_address + "</p>"
			);

		// <iframe
		// frameborder=\'0\' style=\'border:0\'
		// src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCESenekQcughAYOyVVPMtujw3ETMQ9Vzg
		// &q=Moonlight+Pizza,Raleigh+NC" allowfullscreen>
		// </iframe>

		// use google api
		// var apiKey_google = AIzaSyCESenekQcughAYOyVVPMtujw3ETMQ9Vzg;

		// replace the spaces in final_address with %20

		// write the google map to the page
		// $("#page_result").html(	
		// 	"frameborder=\'0\' style=\'border:0\' src=" + 
		// 	"https://www.google.com/maps/embed/v1/place?" + apiKey_google + "&q=" +
		// 	theformattedaddress + "\' allowscreen"

		// 	);

	});

		$(document).on("click", "#btn_seeRecent", function() {

			$("#page_resultsListRegion").show();

			// database.ref().on("child_added", function(snapshot) {
			// 	console.log(snapshot.val().final_name);
			// 	console.log(snapshot.val().final_type);
			// 	});

			database.ref().orderByChild("timestamp").limitToLast(5).on("child_added", function(snapshot){
				console.log(snapshot.val().final_name);
				console.log(snapshot.val().final_type);

				var pulled_name = (snapshot.val().final_name);
				var pulled_type = (snapshot.val().final_type);


				$("#results_body > tbody").prepend("<tr><td>" + pulled_name + "</td><<td>" + pulled_type + "</td></tr>");
			})
		});

	$(document).on("click", "#btn_tryAgain", function() {
		
	});

});