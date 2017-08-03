// in keys.js
var KEYS = {
    apiKey: 'AIzaSyDO9Azjw5mtkjWVIOzB4-N6x9bLuwM0PH4'
};



//Bring in the keys object
var KEYS = KEYS || {};

// Initialize Firebase
  var config = {
    //apiKey: "AIzaSyDO9Azjw5mtkjWVIOzB4-N6x9bLuwM0PH4",
    apiKey: KEYS.apiKey,
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

//adds new data to firebase
	NAME:name, 
	DESTINATION:destination, 
	TRAINTIME:trainTime,
	FREQUENCY:frequency

	})
});

// this is snapshotting user input and pushing it to firebase..... I think.
database.ref().on("child_added", function(childSnapshot) { 
    var name = childSnapshot.val().NAME;    
    var destination = childSnapshot.val().DESTINATION;
    var trainTime = childSnapshot.val().TRAINTIME;
    var frequency = childSnapshot.val().FREQUENCY;

// making the momentJS code magic happen
    var firstTimeConverted = moment(trainTime, "HH:mm");

    // this represents what time it is every second in the real world
    var now = moment();
 
    // this shows the difference between the real time and the time until next train 
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    
    // this is the remainder (in mins) between the diffTime var and the frequency var
    var tRemainder = diffTime % frequency;
   

    // mins til next train
    var tMinutesTilTrain = frequency - tRemainder;
   

    var nextTrain = moment().add(tMinutesTilTrain, "minutes");
    var theNextTrain = moment(nextTrain).format("hh:mm"); 
    
    // makin new rows for each user train input, so they show up in the table
    var newRow = $("<tr>"); 
    newRow.html("<td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + theNextTrain + "</td><td>" + tMinutesTilTrain + "</td>");
    
    $('#dataentry').append(newRow);   

});
