var p1Button = document.querySelector("#p1");
var p2Button = document.getElementById("p2");
var reset = document.querySelector("#reset");
var p1Display = document.querySelector("#p1Display");
var p2Display = document.querySelector("#p2Display");
var numsel = document.querySelector("#numsel");
var p1Score = 0;
var p2Score = 0;
var maxscore = 5;
p1Button.addEventListener("click", function(){
	if(p1Score < maxscore) {
		p1Score++;
		p1Display.textContent = p1Score;
		if(p1Score===maxscore){
			p1Display.style.color = "green";
		}
	}
});
p2Button.addEventListener("click", function(){
	if(p2Score < maxscore) {
		p2Score++;
		p2Display.textContent = p2Score;
		if(p2Score===maxscore){
			p2Display.style.color = "green";
		}
	}
});
reset.addEventListener("click", function(){
	p1Score = 0;
	p2Score = 0;
	p1Display.textContent = 0;
	p2Display.textContent = 0;
	p1Display.style.color = "black";
	p2Display.style.color = "black";
});
numsel.addEventListener("change", function(){
	maxscore = numsel.value;
	document.querySelector("p span").textContent = numsel.value;
})
