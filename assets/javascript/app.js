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

