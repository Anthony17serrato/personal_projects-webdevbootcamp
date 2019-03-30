
//create array
var array = new Array();
array.push("hi");
//objects
var myObj = new Object();
myObj.hi ="hey"
var otherObj = {
	title: "hi",
	author: "ur mom",
	date: "idk"
}
//array of objects
var otherArray = [
{
	title: "hi",
	author: "ur mom",
	date: "idk"
},
{
	title: ["hi","i","am","array"],
	author: "ur mom",
	date: "idk"
}]
//method/function in object
var obj = {
	naem: "boy",
	addit: function(x,y){
		return x + y;
	}
}
//for loops just like java
//dom methods
//returns one item
document.getElementById("highlight");
//returns list of elements 
document.getElementByClassName("bolded");
//returns list
document.getElementByTagName("h1");
//css style selector, use css syntax # . etc..
//only returns one method
document.querySelector("#highlight");
//like above but returns all elements that match
document.querySelectorAll()//[0];
//example
var h1 = document.querySelector("li");
h1.style.color = "yellow";
h1.style.border = "5px solid pink";
//or
/*in css file
.some-claass {
	color: blue;
	fontSize: 5%;
}*/
h1.classList.add("some-claass");
			//.remove
			//.toggle
//retrieve textcontent, renders as string. 
h1.textContent = "text";
//preserves inner html, extracts html elements as string too 
h1.innerHTML = "text";
//renders as html
document.body.innerHTML = "<hl> hi there </h1>"
//manipulating atributes
//use getAtribute() and setAttribute()
//a tag with href atribute can be used to  change images
var link = document.querySelector("a");
link.getAtribute("href");
link.setAttribute("href","www.dogs.com");
//dom events
element.addEventListener("click", functionToCall());


