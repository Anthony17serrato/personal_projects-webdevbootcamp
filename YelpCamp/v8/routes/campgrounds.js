var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
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
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){
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

//Edit Campground route
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req,res){	
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campground/edit", {campground: foundCampground});
	});
});
//update cground route
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership , function(req, res){
	//find and update cground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});

});

//destroy campground route
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership , function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	});
});

//add new cground
router.post("/campgrounds", middleware.isLoggedIn, function(req, res){
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id ,
		username: req.user.username
	}
	var newCampground = {name: name, price: price, image: image, description: desc, author: author};

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