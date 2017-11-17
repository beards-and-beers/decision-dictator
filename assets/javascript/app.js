
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
	var recentResultsTotal=5;









//////// METHODS ///////
	var app = {
		// app scope global variables

		zomato_startAtResult: (Math.floor(Math.random() * 20) + (0)),
		zomato_resultsToReturn:5,
	

		setup: function() {
		//hide unused panels on startup
		// $("#page_resultsListRegion").hide();
		// $("#page_resultRegion").hide();

		},

		results_zomato: function(location, food) {

			var queryURL_zomato;

			var zomato_cuisine = food;

			
			var zomato_location_value = location;
			var zomato_location_zone = 0;


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
			// console.log("everything fired");
				queryURL_zomato = "https://developers.zomato.com/api/v2.1/search?entity_id=" + zomato_location_value + "&entity_type=" + zomato_location_zone + "&start=" + this.zomato_startAtResult + "&count=" + this.zomato_resultsToReturn;

			};


			// console.log(queryURL_zomato);
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
					// console.log(apiResults);
					// console.log(apiResults.results_found);

					// clear anything in the display
					$("#results_body > tbody").html(" ");

					for (var i = 0; i < apiResults.restaurants.length; i++) {
						var step1_name = apiResults.restaurants[i].restaurant.name;
						var step1_type = apiResults.restaurants[i].restaurant.cuisines;

						$("#results_body > tbody").append("<tr><td>" + step1_name + "</td><<td>" + step1_type + "</td></tr>");
					}
			 	})
			}
		}

	
// $("#page_submitData_Region").hide(); // SUBMIT DATA
// $("#page_submitData_Region").show(); // SUBMIT DATA
// $("#page_page_btn_seeRecent").hide(); // SUBMIT DATA
// $("#page_resultsListRegion").hide(); // RESULT LIST
// $("#page_resultsListRegion").show(); // RESULT LIST
// $("#page_errorCard_Region").hide(); // ERROR CARD
// $("#page_errorCard_Region").show(); // ERROR CARD
////// RUN APP //////
	app.setup();
		// hide divs
		$("#page_errorCard_Region").hide();
		$("#btn_hideRecent").hide();

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

	// VIEW recent results listener
	$(document).on("click", "#btn_seeRecent", function() {
		// show region
		$("#page_resultsListRegion").show();
		// hode show button
		$(this).hide();
		// show the hide button
		$("#btn_hideRecent").show();
		
		// get database valuse
		database.ref().orderByChild("timestamp").limitToLast(recentResultsTotal).on("child_added", function(snapshot){

		// stash in variable
		var pulled_name = (snapshot.val().final_name);
		var pulled_type = (snapshot.val().final_type);

		// display on page
		$("#recentResultsList_body > tbody").prepend("<tr><td>" + pulled_name + "</td><<td>" + pulled_type + "</td></tr>");

		})
	});

	// HIDE recent results listener
	$(document).on("click", "#btn_hideRecent", function() {
		// show region#btn_seeRecent
		$("#page_resultsListRegion").hide();
		// hode show button
		$(this).hide();
		// show the show button
		$("#btn_seeRecent").show(); 	
		// clear results
		$("#recentResultsList_body > tbody").html("");

	});

	//// LISTENERS FOR page_submitData_Region //// 
	$(document).on("click", "#btn_dictateNow", function() {


		//hide results region
			// $("#page_resultsListRegion").hide();
			// $("#page_btn_seeRecent").hide();


		// pick random number
		var random_Number = (Math.floor(Math.random() * 5) + (0));
		console.log(random_Number);

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

		// use google api
		var apiKey_google = "key=AIzaSyCESenekQcughAYOyVVPMtujw3ETMQ9Vzg";
		var final_address_machine = final_address;
		final_address_machine = encodeURIComponent(final_address_machine);
		var api_url_google =  "https://www.google.com/maps/embed/v1/place?" + apiKey_google + "&q=" + final_address_machine;
		console.log(api_url_google);

		// send to page
		$("#page_result").html(	
			"<h4>" + final_name + "</h4>" +
			"<p>" + final_type + "</p>" +
			"<p><a href=" + final_url + "\' target=\'_blank\'>View Details</a></p>" +
			"<p>Address: " + final_address + "</p>" +
			"<iframe frameborder=\'0\' style=\'border:0\' src=\'" + api_url_google + "\' allowfullscreen></iframe>"
			);
		// replace the spaces in final_address with %20

		// write the google map to the page
		// $("#page_result").html(	
		// 	"frameborder=\'0\' style=\'border:0\' src=" + 
		// 	"https://www.google.com/maps/embed/v1/place?" + apiKey_google + "&q=" +
		// 	theformattedaddress + "\' allowscreen"

		// 	);

	});


	$(document).on("click", "#btn_tryAgain", function() {
		
	});

});