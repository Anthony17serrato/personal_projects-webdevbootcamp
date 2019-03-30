var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo");
//Post - title, content
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});
var postModel = mongoose.model("Post", postSchema);
//user -email, name
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});
var User = mongoose.model("User", userSchema);


// var newUser = new User({
// 	email: "charlie@brown2.edu",
// 	name: "charlie brown2"
// });
// newUser.posts.push({
// 	title: "How to Brew polyjuice Poyion",
// 	content: "Just kidding go to paotins clws"
// });
// newUser.save(function(err, user){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(user);
// 	}
// });
// var newPost = new postModel({
// 	title: "Reflections on Apples",
// 	content: "THey are delicious"
// });
// newPost.save(function(err, post){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(post);
// 	}
// });
User.findOne({name: "charlie brown2"}, function(err, user){
	if(err){
		console.log(err);
	}else{
		user.posts.push({
			title: "3 thing i hate",
			content: "Voldemort x3"
		});
		user.save(function(err, user){
			if (err) {
				// statement
				console.log(err);
			}else{
				console.log(user);
			}
		});
	}
});