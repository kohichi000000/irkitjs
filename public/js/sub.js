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
	buttonArray = getFromStorage("irkitJsData");　	// ボタンデータ配列を取り出し
	localStorage.removeItem("irkitJsData") 				// 取り出してから一度削除
	targetId 		= $(dom).parent("li").attr("data-button-id");

	appearButtonEditConsole()

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
		return;
	});

	storeToStorageSimple(buttonArray, "irkitJsData") // 新しいデータを格納
}


function appearButtonEditConsole(){
	$.ajax({
		url: 'edit.html',
		type: 'GET',
		dataType: 'html'
	})
	.done(function(source) {
		$("body").prepend('<div class="appearButtonShadow"></div>')
		$("#contents").append(source).addClass('none').delay(define.a).removeClass('none');
	})
	.fail(function() {
		console.log("error");
	})
}

function tabSubButtonSortUp(dom){
	buttonArray = getFromStorage("irkitJsData");　	// ボタンデータ配列を取り出し
	localStorage.removeItem("irkitJsData") 				// 取り出してから一度削除
	targetId 		= $(dom).parent("li").attr("data-button-id");

	console.log(buttonArray)

	buttonArray[targetId].buttonId 		= targetId + 1 //ボタンデータを更新
	buttonArray[targetId+1].buttonId 	= targetId - 1 //ボタンデータを更新

	$(dom).parent("li").animate({
		"margin-top": '-50px'
	},define.a,function(){
		$(dom).parent("li").next("li").animate({
			"margin-top": "50px"
		}, define.a)
	});

	console.log(buttonArray)

	storeToStorageSimple(buttonArray, "irkitJsData") // 新しいデータを格納
}

function tabSubButtonSortDown(dom){
	buttonArray = getFromStorage("irkitJsData");　// ボタンデータ配列を取り出し
	localStorage.removeItem("irkitJsData") // 取り出してから一度削除
	targetId 		= $(dom).parent("li").attr("data-button-id");

	console.log(buttonArray)

	buttonArray[targetId].buttonId 		= targetId - 1 //ボタンデータを更新
	buttonArray[targetId-1].buttonId 	= targetId + 1 //ボタンデータを更新

	console.log(buttonArray)

	storeToStorageSimple(buttonArray, "irkitJsData") // 新しいデータを格納
}