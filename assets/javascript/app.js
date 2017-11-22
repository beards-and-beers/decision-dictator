
// APP STRUCTURE
// Scotts last minute update

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
	var recentResultsTotal=5;
	var zomato_startAtResult;
	var zomato_resultsToReturn=5;


//////// METHODS ///////
	var app = {
		setup: function() {
			// clears
			$("#page_selectedResult").html(" ");
			$("#page_recentResultsList_region > table > tbody").html(" ");
			$("#page_resultsList_table > table > tbody").html(" ");

			// hide panels
			$("#page_recentResultsList_region").hide();
			$("#page_errorCard_Region").hide();
			$("#page_resultsList_region").hide();
			$("#page_selectedResult_region").hide();

			// recent results
			$("#page_recentBtns").show();
			$("#btn_seeRecent").show();
			$("#btn_hideRecent").hide();

			// submit panel
			$("#page_submitData_Region").show();
		},


		results_zomato: function(location, food) {

			var queryURL_zomato;
			var zomato_cuisine = food;
			var zomato_location_value = location;
			var zomato_location_zone = 0;

			$("#page_resultsList_region").show();
			// $("#page_resultsList_loading").show();
			$("#page_submitData_Region").hide();


			// LOCATION
			// assign the entity_id associated with the zone of the city
			// Raleigh
			if (zomato_location_value==="aa") {
				zomato_location_value=95008;
				zomato_location_zone ="zone";
			};
			// Durham
			if (zomato_location_value==="ab") {
				zomato_location_value=95011;
				zomato_location_zone ="zone";
			};
			// Chapel Hill / subzone
			if (zomato_location_value==="ac") {
				zomato_location_value=119506;
				zomato_location_zone ="subzone";
			};

			// CUSISINE
			if (zomato_cuisine==="ba") {
			// everything
			// set query
				queryURL_zomato = "https://developers.zomato.com/api/v2.1/search?entity_id=" + zomato_location_value + "&entity_type=" + zomato_location_zone + "&start=" + this.random_startingPoint() + "&count=" + zomato_resultsToReturn;
			};

			// AJAX Call
			$.ajax({
				url: queryURL_zomato,
				method: "GET",
				headers: {"user-key": "262a8901410f92714e29cd56d11b11bf"}
				})

				.done(function(dataZomato){
					// hide
					$("#page_resultsList_loading").hide();

					apiResults = dataZomato;
					for (var i = 0; i < apiResults.restaurants.length; i++) {
						var step1_name = apiResults.restaurants[i].restaurant.name;
						var step1_type = apiResults.restaurants[i].restaurant.cuisines;
						$("#results_body > tbody").append("<tr><td>" + step1_name + "</td><<td>" + step1_type + "</td></tr>");
					}
			 })
		},


		random_startingPoint: function() {
			zomato_startAtResult = (Math.floor(Math.random() * 100) + (0));
			console.log(zomato_startAtResult);
				return zomato_startAtResult ;
		}

	}

////// RUN APP //////
	app.setup();

//// SUBMIT FORM //// 
	$(document).on("click", "#btn_submitCard", function() {
		// hide
		$("#page_errorCard_Region").hide();
		$("#page_recentResultsList_region").hide();
		$("#page_recentBtns").hide();
		
		// grab the selected values from the form
		user_choosedLocation = $('select.input-location').find(':selected').data('city');
		user_choosedBiz = $('select.input-bizType').find(':selected').data('biz');

		if (user_choosedBiz==="empty" || user_choosedLocation==="empty") {
			$("#page_errorCard_Region").show();
		} else {app.results_zomato(user_choosedLocation, user_choosedBiz)};
	});

//// RECENT RESULTS
	// show
	$(document).on("click", "#btn_seeRecent", function() {
		// hide
		$(this).hide();
		// show
		$("#btn_hideRecent").show();
		
		database.ref().orderByChild("timestamp").limitToLast(recentResultsTotal).on("child_added", function(snapshot){
			console.log(snapshot);
			// stash in variable
			var pulled_name = (snapshot.val().final_name);
			var pulled_type = (snapshot.val().final_type);
			// display on page 
			$("#page_recentResultsList_table > table > tbody").prepend("<tr><td>" + pulled_name + "</td><<td>" + pulled_type + "</td></tr>");
		})

		$("#page_recentResultsList_region").show();
	});
	// hide
	$(document).on("click", "#btn_hideRecent", function() {
		//clear
		$("#page_recentResultsList_table > table > tbody").html(" ");
		// hide
		$(this).hide();
		$("#page_recentResultsList_region").hide();
		// show
		$("#btn_seeRecent").show(); 	
		
	});


	//// GET THE RESULT //// 
	$(document).on("click", "#btn_dictateNow", function() {

		// pick random number
		var random_Number = (Math.floor(Math.random() * 5) + (0));

		// select a business and grab content for display
		var final_name = apiResults.restaurants[random_Number].restaurant.name;
		var final_type = apiResults.restaurants[random_Number].restaurant.cuisines;
		var final_url = apiResults.restaurants[random_Number].restaurant.url;
		var final_address = apiResults.restaurants[random_Number].restaurant.location.address;

		// use google api to display map
		var apiKey_google = "key=AIzaSyCESenekQcughAYOyVVPMtujw3ETMQ9Vzg";
		var final_address_machine = final_address;
		final_address_machine = encodeURIComponent(final_address_machine);
		var api_url_google =  "https://www.google.com/maps/embed/v1/place?" + apiKey_google + "&q=" + final_address_machine;
		
		// show
		$("#page_selectedResult_region").show();
		// display result on page
		$("#page_selectedResult").html(	
			"<h4>" + final_name + "</h4>" +
			"<p>" + final_type + "</p>" +
			"<p>Address: " + final_address + "</p>" +
			"<p><a href=" + final_url + "\' target=\'_blank\'>View Details</a></p>" +
			"<iframe frameborder=\'0\' style=\'border:0\' src=\'" + api_url_google + "\' allowfullscreen></iframe>"
			);

		// send result to database
		database.ref().push({
			final_name,
			final_type,
			final_url,
			final_address
		});

		// clear
		$("#page_recentResultsList_table > table > tbody").html(" ");
		// hide
		$("#page_recentResultsList_region").hide();
		$("#page_resultsList_region").hide();


	});


	//// TRY AGAIN //// 
	$(document).on("click", "#btn_tryAgain", function() {

		app.setup();

	});

});