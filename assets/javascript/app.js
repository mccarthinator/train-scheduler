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
// Creating a variable to reference the database.
    var database = firebase.database();


// When users click "submit"
$("#submit-bid").on("click", function(event) {
      
// This line prevents the page from refreshing when a user hits "enter".
	event.preventDefault();

//global vars
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

// this is snapshotting user input and pushing it to firebase, I think.
database.ref().on("child_added", function(childSnapshot) { 
    var name = childSnapshot.val().NAME;    
    var destination = childSnapshot.val().DESTINATION;
    var trainTime = childSnapshot.val().TRAINTIME;
    var frequency = childSnapshot.val().FREQUENCY;

            var firstTimeConverted = moment(trainTime, "HH:mm");
            console.log("TEST: " + firstTimeConverted);


            var now = moment();
            console.log("CURRENT TIME: " + moment(now).format("HH:mm"));


            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            console.log("DIFFERENCE IN TIME: " + diffTime);


            var tRemainder = diffTime % frequency;
            console.log("REMAINDER: " + tRemainder);

                // Minutes Until Train
            var tMinutesTilTrain = frequency - tRemainder;
            console.log("MINUTES UNTIL TRAIN: " + tMinutesTilTrain);

                // Next Train
            var nextTrain = moment().add(tMinutesTilTrain, "minutes");
            var theNextTrain = moment(nextTrain).format("hh:mm"); 
            
            console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


            var newRow = $("<tr>"); 
            newRow.html("<td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + theNextTrain + "</td><td>" + tMinutesTilTrain + "</td>");
            
            $('#dataentry').append(newRow);   

});








