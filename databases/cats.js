var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cat_app", { useNewUrlParser: true });

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});
//cat contains necessary methods
//singular name gets pluralized
 var Cat = mongoose.model("Cat", catSchema);
// var george = new Cat({
// 	name: "George",
// 	age: 11,
// 	temperament: "Grouchy"
// });
// george.save(function(err,cat){
// 	if(err){
// 		console.log("something went wrong, terribly wrong")
// 	}else{
// 		console.log("theres a new cat in town");
// 		console.log(cat);
// 	}
// });

Cat.find({}, function(err, cats){
	if(err){
		console.log("God damn it this shits not working");
		console.log(err);
	}
	else {
		console.log("Heres those cats you requested mate...");
		console.log(cats);
	}
});
//simpler way to make cat
Cat.create({
	name: "Snow white",
	age: 15,
	temperament: "Bland"
}, function(err, cat){
	if(err){
		console.log("something went wrong, terribly wrong");
		console.log(err);
	}else {
		console.log(cat);
	}
});