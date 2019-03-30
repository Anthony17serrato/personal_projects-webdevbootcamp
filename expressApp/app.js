var express = require("express");
var app = express();
// "/" => "hi there!"
//get = http verb
app.get("/", function(req,res){
	res.send("Hi There!");
});
// "/bye" > "Goodbye!"
app.get("/bye", function(req, res){
	res.send("Goodbye");
});
// "/dog" > "Meow!"
app.get("/dog", function(req, res){
	res.send("Meow");
});
//custom paths
app.get("/r/:subredditName", function(req,res){
	res.send(req.params.subredditName);
});
app.get("/r/:subredditName/comments/:id/:titile/", function(req,res){
	res.send("welcome to a comments");
});
//throw all if path invalid
app.get("*", function(req, res){
	res.send("invalid url");
});

//tell express to listen for requests (start server)
app.listen(3000, function(){
	console.log("server start");
});
