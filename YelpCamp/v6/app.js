var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment"),
	User = require("./models/user"),
	seedDB = require("./seeds");


seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//pasport config
app.use(require("express-session")({
	secret: "a secret",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//middleware for nav login
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});

//=================
//Routes
//=================
app.get("/", function(req, res){
	res.render("landing");
});
//index
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
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		}else {
			res.render("comment/new",{campground: campground});
		}
	});
	
});
app.post("/campgrounds/:id/comments", isLoggedIn,function(req, res){
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

//================
//auth Routes
//================

//show register form
app.get("/register", function(req,res){
	res.render("register");
});
//sign up logic
app.post("/register", function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req,res, function(){
			res.redirect("/campgrounds");
		});
	});
});
//show login form
app.get("/login", function(req, res){
	res.render("login");
});
//handle login logic
app.post("/login", passport.authenticate("local", {
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), function(req, res){
});
//logout route
app.get("/logout", function(req,res){
	req.logout();
	res.redirect("/campgrounds");
});
//middlewear
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


app.listen(3000, function(){
	console.log("Yelpcamp server On.")
});