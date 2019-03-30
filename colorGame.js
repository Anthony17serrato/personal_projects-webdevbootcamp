var numberofsq = 6;
var colors = generateRandomColors(numberofsq);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colordisplay = document.querySelector("h1 span");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var reset = document.querySelector("#reset");
var easy = document.querySelector("#easybtn");
var hard = document.querySelector("#hardbtn");

easy.addEventListener("click", function(){
	easy.classList.add("selected");
	hard.classList.remove("selected");
	numberofsq = 3;
	colors = generateRandomColors(numberofsq);
	pickedColor = pickColor();
	colordisplay.textContent = pickedColor;
	h1.style.backgroundColor = "steelblue";
	for(var i = 0; i <squares.length; i++){
		if(colors[i]){
			squares[i].style.backgroundColor = colors[i];
		}else{
			squares[i].style.display = "none";
		}
	}
});
hard.addEventListener("click", function(){
	easy.classList.remove("selected");
	hard.classList.add("selected");
	numberofsq = 6;
	colors = generateRandomColors(numberofsq);
	pickedColor = pickColor();
	colordisplay.textContent = pickedColor;
	h1.style.backgroundColor = "steelblue";
	for(var i = 0; i <squares.length; i++){	
		squares[i].style.backgroundColor = colors[i];
		squares[i].style.display = "block";
	}
});
reset.addEventListener("click", function(){
	colors = generateRandomColors(numberofsq);
	pickedColor = pickColor();
	colordisplay.textContent = pickedColor;
	refreshui();
	this.textContent = "New Colors";
	messageDisplay.textContent = "";
	h1.style.backgroundColor = "steelblue";
});
colordisplay.textContent = pickedColor;
refreshui();
function refreshui(){
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = colors[i];
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.backgroundColor;
			if (clickedColor === pickedColor){
				messageDisplay.textContent = "Correct";
				changeColors(this.style.backgroundColor);
				reset.textContent = "Play Again?";
				h1.style.backgroundColor = clickedColor;
			}else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}
function changeColors(color){
	for(var i = 0; i < colors.length; i++){
		squares[i].style.backgroundColor = color;
	}
}
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}
function generateRandomColors(num){
	var arr = [];
	for(var i = 0; i < num; i++){
		arr[i] = randomColor();
	}
	return arr;
}
function randomColor(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb("+ r + ", " + g + ", "+ b + ")";
}
