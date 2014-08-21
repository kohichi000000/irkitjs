function tabSubButton(){
	$(".subButton").click(function() {
		switch($(this).attr('class')){
			case "delete subButton":
				tabSubButtonDelete(this)
				break;
			case "edit subButton":
				tabSubButtonEdit(this)
				break;
			case "sortUp subButton":
				tabSubButtonSortUp(this)
				break;
			case "sortDown subButton":
				tabSubButtonSortDown(this)
				break;
		}
	});
}

function tabSubButtonDelete(dom){
	buttonArray = getFromStorage("irkitJsData");
	targetId 		= $(dom).parent("li").attr("data-button-id");

	buttonArray.splice(targetId,1)
	localStorage.removeItem("irkitJsData")

	storeToStorageSimple(buttonArray, "irkitJsData")
	
	$(dom).parent("li").animate({
		"margin-left": '-50%',
		"opacity": '0'
	},
	define.a, function() {
		$(this).remove()
	});
}

function tabSubButtonEdit(dom){

}

function tabSubButtonSortUp(dom){

}

function tabSubButtonSortDown(dom){

}