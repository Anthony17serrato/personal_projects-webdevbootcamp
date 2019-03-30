var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment"),
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
			res.render("campground/index", {campgrounds:campgrounds});
		}
	});
});
app.get("/campgrounds/new", function(req, res){
	res.render("campground/new.ejs");
});
//Show shows more info about one cground
app.get("/campgrounds/:id", function(req, res){
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
//============================
//Comments route
//============================
app.get("/campgrounds/:id/comments/new", function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		}else {
			res.render("comment/new",{campground: campground});
		}
	});
	
});
app.post("/campgrounds/:id/comments", function(req, res){
	//lookup cgroudnd with id
	Campground.findById(req.params.id, function(err, campground){
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				}else{
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
	//create commet
	//connect new comment to cground
	//redirect campground show page
});

app.listen(3000, function(){
	console.log("Yelpcamp server On.")
});