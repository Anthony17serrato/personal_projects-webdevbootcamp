var lis = document.querySelectorAll("li");
for(var i = 0; i < lis.length; i++){
	lis[i].addEventListener("mouseover", function(){
		this.style.color = "green";
	});
	lis[i].addEventListener("mouseout", function(){
		this.style.color = "black";
	});
	lis[i].addEventListener("click",function(){
		//lets css handle styling by using class
		this.classList.toggle("done");	
						//can use add in other scenario if you dont want to toggle
	});
}

