var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
//index
router.get("/campgrounds", function(req, res){
	//Get all campgrounds from db
	Campground.find({}, function(err, campgrounds){
		if(err){
			console.log("err");
		}else {
			res.render("campground/index", {campgrounds:campgrounds});
		}
	});
});
router.get("/campgrounds/new", function(req, res){
	res.render("campground/new.ejs");
});
//Show shows more info about one cground
router.get("/campgrounds/:id", function(req, res){
	//find campground provided the id
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render("campground/show", {campground: foundCampground});
		}
	});
	//res.send("One day this will be a show page.");
});
router.post("/campgrounds", function(req, res){
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

module.exports = router;