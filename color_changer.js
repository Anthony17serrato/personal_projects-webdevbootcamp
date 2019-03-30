var button = document.querySelector("button");
var clicked = false;
button.addEventListener("click", function(){
	var body = document.querySelector("body");
	if(clicked){
		body.style.background = "white";
	}else{
		body.style.background = "blue";
	}
	clicked = !clicked;
});