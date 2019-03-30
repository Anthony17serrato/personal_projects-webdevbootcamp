var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo__2");
var postModel = require("./models/post");
var User = require("./models/user");
// User.create({
// 	email: "bob@thebuilder.com",
// 	name: "Bob Belcher"
// });
postModel.create({
	title: "How to cook the best buger pt 4",
	content: "blasdfjsdlkjfsjd"
}, function(err, post){
	User.findOne({email: "bob@thebuilder.com"}, function(err, founduser){
		founduser.posts.push(post);
		founduser.save(function(err, data){
			console.log(data);
		});
	});
});
// User.findOne({email: "bob@thebuilder.com"}).populate("posts").exec(function(err, user){
// 	console.log(user);
// });

