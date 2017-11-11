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

var APIKey_brewery = "aa416dc9ba758638ac327b58ee7ee727";

var queryURL_brewery = "http://api.brewerydb.com/v2/?key=" + APIKey_brewery;

var APIKey_zomato = "262a8901410f92714e29cd56d11b11bf";

var queryURL_zomato = "https://developers.zomato.com/api/v2.1/search?entity_id=95008&entity_type=zone&start=0&count=10";


	$.ajax({
		url: queryURL_brewery,
		method: "GET"
	}).done(function(response) {
		console.log(queryURL_brewery);
	});

	$.ajax({
		type: "POST",
		url: queryURL_zomato,
		headers: {
			"key": "262a8901410f92714e29cd56d11b11bf"
		}
	}).done(function(data) {
		console.log(data);
	});

