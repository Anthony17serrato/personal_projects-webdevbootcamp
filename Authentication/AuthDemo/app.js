var express = require("express"), 
	app = express(),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	User = require("./models/user"),
	LocalStrategy = require("passport-local"),
	passportLocalMogoose = require("passport-local-mongoose");
mongoose.connect("mongodb://localhost:27017/auth_demo_app",  { useNewUrlParser: true });


app.set('view engine','ejs');
app.use(require("express-session")({
	secret: "Rusty is a dog",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==============
//routes
//==============
app.get("/", function(req, res){
	res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){
	res.render("secret");
});
//handle user signup
app.post("/register", function(req,res){
	User.register(new User({username: req.body.username}), req.body.password, function(err,user){
		if(err){
			console.log(err);
			return res.render('register');
		}
		//auth with strategy
		passport.authenticate("local")(req, res, function(){
			res.redirect("/secret");
		});
	});
});
//auth routs
app.get("/register", function(req,res){
	res.render("register");
});
//login routes
//render login form
app.get("/login", function(req, res){
	res.render("login");
});
//login logic\
//middleware
app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/secret"
}) ,function(req, res){

});
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.redirect("/login");
	}
}


app.listen(3000, function(){
	console.log("server started");
});