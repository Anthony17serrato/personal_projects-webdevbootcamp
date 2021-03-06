var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	seedDB = require("./seeds");
seedDB();

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.get("/", function(req, res){
	res.render("landing");
});
app.get("/campgrounds", function(req, res){
	//Get all campgrounds from db
	Campground.find({}, function(err, campgrounds){
		if(err){
			console.log("err");
		}else {
			res.render("index", {campgrounds:campgrounds});
		}
	});
});
app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});
//Show shows more info about one cground
app.get("/campgrounds/:id", function(req, res){
	//find campground provided the id
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render("show", {campground: foundCampground});
		}
	});
	//res.send("One day this will be a show page.");
});
app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	//create new campground and save to database
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		}else {
			res.redirect("/campgrounds");
		}
	});
});

app.listen(3000, function(){
	console.log("Yelpcamp server On.")
});