$("ul").on("click", "li", function(){
	// $(this).css("color", "gray");
	// $(this).css("text-decoration", "line-through");
	// if($(this).css("color") === "rgb(128, 128, 128)"){
	// 	$(this).css({
	// 		color: "black",
	// 		textDecoration: "none"
	// 	});
	// }
	// else {
	// 	$(this).css({
	// 		color: "gray",
	// 		textDecoration: "line-through"
	// 	});
	// }
	//do styling on css
	$(this).toggleClass("completed");
});
//click x to  delete todo
$("ul").on("click", "span", function(event){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	//stops bubling
	event.stopPropagation();
});
$("input[type='text']").keypress(function(event){
	
	//enterkey code js
	if(event.which === 13) {
		var todoText = $(this).val();
		$(this).val("");
		//create new li and add to ul
		$("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText +"</li>");
	}
});
$(".fa-plus").click(function(){
	$("input[type= 'text']").fadeToggle();
});