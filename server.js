// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Restaurant reservations (DATA)
// =============================================================
var reservations = [

];

var waitlist = [


];

// Routes
// =============================================================

// Basic route that sends user to home and add pages
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/reservation", function(req, res) {
  res.sendFile(path.join(__dirname, "reservation.html"));
});

app.get("/table", function(req, res) {
  res.sendFile(path.join(__dirname, "table.html"));
});
// Displays all reservations
app.get("/api/table", function(req, res) {
  return res.json(reservations);
});

// Displays waitlist
app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});


if (reservations.length < 5){
// Create New reservation - takes in JSON input
app.post("/api/table", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newRes = req.body;

  // Using a RegEx Pattern to remove spaces from new reservation
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newRes.routeName = newRes.name.replace(/\s+/g, "").toLowerCase();

  console.log(newRes);

  reservations.push(newRes);

  res.json(newRes);
});
}
else {
  app.post("/api/waitlist", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newRes = req.body;
  
    // Using a RegEx Pattern to remove spaces from new reservation
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newRes.routeName = newRes.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newRes);
  
    waitlist.push(newRes);
  
    res.json(newRes);
  });
}
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
