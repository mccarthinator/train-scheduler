 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDO9Azjw5mtkjWVIOzB4-N6x9bLuwM0PH4",
    authDomain: "train-scheduler-6d989.firebaseapp.com",
    databaseURL: "https://train-scheduler-6d989.firebaseio.com",
    projectId: "train-scheduler-6d989",
    storageBucket: "train-scheduler-6d989.appspot.com",
    messagingSenderId: "84618430914"
  };
  firebase.initializeApp(config);
  
// Create a variable to reference the database.
var database = firebase.database();


// When users click "submit"
$("#submit-bid").on("click", function(event) {
      // This line prevents the page from refreshing when a user hits "enter".
      event.preventDefault();
      //get input
      var name = $("#name").val().trim();
      var destination = $("#destination").val().trim();
      var trainTime = $("#trainTime").val().trim();
      var frequency = $("#frequency").val().trim();

  	database.ref().push({
    //add new data to firebase
	    NAME:name, 
  	 	DESTINATION:destination, 
    	TRAINTIME:trainTime,
  		FREQUENCY:frequency

	})
});



//look at lauren code for calculations 

database.ref().on("child_added", function(childSnapshot) { 
            var name = childSnapshot.val().NAME;    
            var destination = childSnapshot.val().DESTINATION;
            var trainTime = childSnapshot.val().TRAINTIME;
            var frequency = childSnapshot.val().FREQUENCY;

			var change = moment(trainTime).format("MM/DD/YY");
	        console.log(change);

	        var months = moment(change).diff(moment(), "months");
	        var monthsWorked = Math.abs(months);	

	        var billed = monthsWorked * frequency;	


            var newRow = $("<tr>"); 
            newRow.html("<td>" + name + "</td><td>" + destination + "</td><td>" + trainTime + "</td><td>" + frequency + "</td><td>" + monthsWorked + "</td><td>" + billed + "</td>");
            
            $('#dataentry').append(newRow);     
});
