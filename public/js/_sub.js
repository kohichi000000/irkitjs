function tabSubButton(e,dom){
	checkNum = parseInt($(dom).find('button').css("left"))
	
	console.log(checkNum)

	if(checkNum < 0){
		console.log("right button is excuted")
		if(e > 0 && e < 52){
		console.log("appearButtonEditConsole is excuted")
			appearButtonEditConsole(dom)
		}else if(e > 52 && e < 104){
			tabSubButtonDelete(dom)
		}	
	}else if(checkNum > 0){
		if(e > 0 && e < 52){
			tabSubButtonSortUp(dom)
		}else if(e > 52 && e < 104){
			tabSubButtonSortDown(dom)
		}
	}
}

function tabSubButtonDelete(dom){
	buttonArray = getFromStorage("irkitJsData");
	targetId 		= $(dom).attr("data-button-id");

	buttonArray.splice(targetId,1)
	localStorage.removeItem("irkitJsData")
	storeToStorageSimple(buttonArray, "irkitJsData")
	
	$(dom).animate({
		"margin-left": '-50%',
		"opacity": '0'
	},
	define.a, function() {
		$(this).remove()
		buttonListPosition()
	});
}

function tabSubButtonEdit(dom){
	buttonArray = getFromStorage("irkitJsData");　	// ボタンデータ配列を取り出し
	targetId 		= $(dom).attr("data-button-id");

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
		localStorage.removeItem("irkitJsData") 				// 取り出してから一度削除
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

	console.log("tabSubButtonSortUp is excuted")

	buttonArray = getFromStorage("irkitJsData");　	// ボタンデータ配列を取り出し
	targetId 		= Number($(dom).attr("data-button-id"));
	if(buttonArray[targetId+1] == undefined) return false;

	localStorage.removeItem("irkitJsData") 				// 取り出してから一度削除

	buttonArray[targetId].buttonId 		= targetId + 1 //ボタンデータを更新
	buttonArray[targetId+1].buttonId 	= targetId //ボタンデータを更新

	current = $(dom).css("top")
	prev 		= $(dom).prev("li").css("top")

	$(dom).attr('data-button-id', targetId + 1);
	$(dom).prev("li").attr('data-button-id', targetId);

	holdItem = $(dom).prev("li");

	$(dom).animate({
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
	targetId 		= Number($(dom).attr("data-button-id"));
	if(buttonArray[targetId-1] == undefined) return false;

	localStorage.removeItem("irkitJsData") // 取り出してから一度削除

	buttonArray[targetId].buttonId 		= targetId - 1 //ボタンデータを更新
	buttonArray[targetId-1].buttonId 	= targetId 		 //ボタンデータを更新

	current = $(dom).css("top")
	next 		= $(dom).next("li").css("top")

	$(dom).attr('data-button-id', targetId - 1);
	$(dom).next("li").attr('data-button-id', targetId);

	holdItem = $(dom).next("li");

	$(dom).animate({
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