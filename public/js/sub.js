function tabSubButton(){
	$(".subButton").click(function() {
		switch($(this).attr('class')){
			case "delete subButton":
				tabSubButtonDelete(this)
				break;
			case "edit subButton":
				appearButtonEditConsole(this)
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
	buttonArray = getFromStorage("irkitJsData");　	// ボタンデータ配列を取り出し
	localStorage.removeItem("irkitJsData") 				// 取り出してから一度削除
	targetId 		= $(dom).parent("li").attr("data-button-id");

	$("#editButtonName").click(function() {
		var editButtonNameBodyVal = $("#editButtonNameBody").val();

		if(editButtonNameBodyVal[0] != undefined){
			
			buttonArray[targetId].buttonName = editButtonNameBodyVal

			$("#editButtonName").off();
			$("#editButtonNameConsole").hide(0, function() {
				$(this).remove()
			});
			$(".appearButtonShadow").hide(0, function() {
				$(this).remove()
			});
		}else{
			console.log("名前を入れて下さい")
		}
		storeToStorageSimple(buttonArray, "irkitJsData") // 新しいデータを格納
		$(".buttonList").children('li').remove()
		initFunction()
	});

}


function appearButtonEditConsole(dom){
	$.ajax({
		url: 'edit.html',
		type: 'GET',
		dataType: 'html'
	})
	.done(function(source) {
		$("body").prepend('<div class="appearButtonShadow"></div>')
		$("#contents").append(source).addClass('none').delay(define.a).removeClass('none');
		tabSubButtonEdit(dom)
	})
	.fail(function() {
		console.log("error");
	})
}

function tabSubButtonSortUp(dom){
	buttonArray = getFromStorage("irkitJsData");　	// ボタンデータ配列を取り出し
	localStorage.removeItem("irkitJsData") 				// 取り出してから一度削除
	targetId 		= Number($(dom).parent("li").attr("data-button-id"));

	buttonArray[targetId].buttonId 		= targetId + 1 //ボタンデータを更新
	buttonArray[targetId+1].buttonId 	= targetId //ボタンデータを更新

	current = $(dom).parent("li").css("top")
	prev 		= $(dom).parent("li").prev("li").css("top")

	$(dom).parent("li").attr('data-button-id', targetId + 1);
	$(dom).parent("li").prev("li").attr('data-button-id', targetId);

	holdItem = $(dom).parent("li").prev("li");

	$(dom).parent("li").animate({
		"top": prev
	},define.a,function(){

		$(this).after(holdItem)
		$(holdItem).animate({
			"top": current
		}, define.a)
	});

	buttonIdSort(buttonArray)
	storeToStorageSimple(buttonArray, "irkitJsData") // 新しいデータを格納
}

function tabSubButtonSortDown(dom){
	buttonArray = getFromStorage("irkitJsData");　// ボタンデータ配列を取り出し
	localStorage.removeItem("irkitJsData") // 取り出してから一度削除
	targetId 		= Number($(dom).parent("li").attr("data-button-id"));

	buttonArray[targetId].buttonId 		= targetId - 1 //ボタンデータを更新
	buttonArray[targetId-1].buttonId 	= targetId 		 //ボタンデータを更新

	current = $(dom).parent("li").css("top")
	next 		= $(dom).parent("li").next("li").css("top")

	$(dom).parent("li").attr('data-button-id', targetId - 1);
	$(dom).parent("li").next("li").attr('data-button-id', targetId);

	holdItem = $(dom).parent("li").next("li");

	$(dom).parent("li").animate({
		"top": next
	},define.a,function(){

		$(this).before(holdItem)
		$(holdItem).animate({
			"top": current
		}, define.a)
	});

	buttonIdSort(buttonArray)
	storeToStorageSimple(buttonArray, "irkitJsData") // 新しいデータを格納
}