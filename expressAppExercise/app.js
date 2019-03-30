var express = require("express");
var app = express();
app.get("/", function(req, res){
	res.send("Hi there, welcome to my assignment!");
});
app.get("/speak/:animal", function(req, res){
	if(req.params.animal === "pig"){
		res.send("the " +req.params.animal+ " says oink");
	}
	if(req.params.animal === "cow"){
		res.send("the " +req.params.animal+ " says moo");
	}
	if(req.params.animal === "dog"){
		res.send("the " +req.params.animal+ " says woof woof");
	}
});

app.get("/repeat/:query/:amount", function(req, res){
	var send ="";
	for(var i = 0; i<req.params.amount; i++){
		send += req.params.query;
		send += " ";
	}
	res.send(send);
});
app.get("*", function(req, res){
	res.send("page not found");
});
//tell express to listen for requests (start server)
app.listen(3000, function(){
	console.log("server start");
});