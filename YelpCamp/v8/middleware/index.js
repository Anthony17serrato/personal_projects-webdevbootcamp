//all middleware goes here
var Campground = require("../models/campground");
var Comment = require("../models/comment")
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		//does user own cground
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				req.flash("database error");
				res.redirect("back");
			}else{
				//does user own it?
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error", "permission denied");
					res.redirect("back");
				}
			}
		});
	}else{
		req.flash("error", "you must log in first.");
		res.redirect("back");
	}
}
middlewareObj.checkCommentOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		//does user own cground
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
					res.redirect("back");
			}else{
				//does user own it?
				if(foundComment.author.id.equals(req.user._id)){
					next();
				}else{
					res.redirect("back");
				}
			}
		});
	}else{
		req.flash("error", "you need to be logged in");
		res.redirect("back");
	}
}

module.exports = middlewareObj;