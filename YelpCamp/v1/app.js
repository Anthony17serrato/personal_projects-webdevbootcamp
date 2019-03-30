var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var campgrounds = [
		{ name: "Salmon Creek", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f3c97ba0e9bcba_340.jpg"},
		{ name: "Granite Hill", image: "https://farm1.staticflickr.com/82/225912054_690e32830d.jpg"},
		{ name: "Mountain Goats Rest", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f3c97ba0e9bcba_340.jpg"}
];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("landing");
});
app.get("/campgrounds", function(req, res){
	
	res.render("campgrounds", {campgrounds: campgrounds});
});
app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});
app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});

app.listen(3000, function(){
	console.log("Yelpcamp server On.")
});