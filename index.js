var express = require("express");
var bodyParser = require("body-parser");
var app = express();




app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

var destination = ["Denver", "Boston"];
var complete = ["Seattle"];


//post route for adding new destination 
app.post("/adddestination", function(req, res) {
    var newdestination = req.body.newdestination;
    //add the new destination from the post route
    destination.push(newdestination);
    res.redirect("/");
});

app.post("/removedestination", function(req, res) {
    var completedestination = req.body.check;
    //check for the "typeof" the different completed destination, then add into the complete destination
    if (typeof completedestination === "string") {
        complete.push(completedestination);
        //check if the completed destination already exits in the destination when checked, then remove it
        destination.splice(destination.indexOf(completedestination), 1);
    } else if (typeof completedestination === "object") {
        for (var i = 0; i < completedestination.length; i++) {
            complete.push(completedestination[i]);
            destination.splice(destination.indexOf(completedestination[i]), 1);
        }
    }
    res.redirect("/");
});

app.get("/", function(req, res) {
    res.render("index", { destination: destination, complete: complete });
});

app.listen(3000, function() {
    console.log("server is running on port 3000");
});