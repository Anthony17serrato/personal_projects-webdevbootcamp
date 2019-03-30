var express = require("express");
var app = express();
app.use(express.static("public"));

app.get("/",function(req, res){
	res.render("home.ejs");
	//res.send("<h1>Welcome to the home page</h1><h2>Blia blah blah</h2>");
});
app.get("/fallinlovewith/:thing", function(req, res){
	//res.send("You fell in love with "+req.params.thing);
	res.render("love.ejs", {thingvar: req.params.thing});
});
app.get("/posts", function(req, res){
	var posts = [
		{title: "post1", author: "Suzzy"},
		{title: "my cool bunny", author: "Charlse"},
		{title: "hiphop bunny", author: "joog"}
	]
	res.render("posts.ejs", {posts: posts});
});

app.listen(3000, function(){
	console.log("server listening");
});