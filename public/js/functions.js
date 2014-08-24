function initVerifyer(){
	if(localStorage.email == undefined || localStorage.clientkey == undefined || localStorage.deviceid == undefined || localStorage.devicekey == undefined){
		define.status.account = false;
	};
	if(!localStorage.irkitJsData) define.status.data = false;
}

function initContentHeight(){
	if(define.status.account){
		$("#contents").height(define.h() - $("header").height() - $("nav").height())
	}else{
		var contentHeight = define.h() - $("header").height();
		var sectionHeight = $("section").height();

		$("#contents").height(contentHeight)
		$("section").css({"margin-top": Math.floor(((contentHeight - sectionHeight) / 2) - $("header").height()) })
	}
}

function addButton(){
	$(".addButton").click(function(){
		appearBottunConsole()
	});
}

function appearBottunConsole(){
	$.ajax({
		url: 'add.html',
		type: 'GET',
		dataType: 'html'
	})
	.done(function(source) {
		$("body").prepend('<div class="appearButtonShadow"></div>')
		$("#contents").append(source).addClass('none').delay(define.a).removeClass('none');
		addButtonName()
	})
	.fail(function() {
		console.log("error");
	})
}

function ajaxGet() {
	console.log("ajaxGet is start")
	$.ajax({
		type: "GET",
		url: define.url.messages,
		async: false,
		data: {
			clear: 1,
			clientkey: getFromStorage("clientkey")
		},
		cache: false,
		dataType: "json",
		timeout: 1000
	})
	.done(function(json) {
		// addButtonName(json.message)
		return json.message
	})
	.fail(function(XMLHttpRequest, textStatus, errorThrown) {
		console.log("get is error")
	});
}

function addButtonName(){
	$("#addButtonName").click(function() {
		// var addButtonNameTextHtml;
		var addButtonNameBodyVal = $("#addButtonNameBody").val();

		if(addButtonNameBodyVal[0] != undefined){
			storeNewButton([ajaxGet(),addButtonNameBodyVal])
			$("#addButtonName").off();
			$("#addButtonNameConsole").hide(0, function() {
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
}

function storeNewButton(button){
	buttonObj = {
		buttonId: 	buttonArray.length,
		buttonData: button[0],
		buttonName: button[1]
	}

	buttonArray.push(buttonObj)

	localStorage.setItem("irkitJsData" , JSON.stringify(buttonArray));

	// $("ul.buttonList").prepend('<li data-button-id="'+ buttonObj.buttonId + '"><button class="remoteControllers">'+ buttonObj.buttonName +'</button><div class="delete subButton"></div><div class="edit subButton"></div><div class="sortUp subButton"></div><div class="sortDown subButton"></div></li>');
	$("ul.buttonList").children('li').remove()
	initFunction()
}

function storeToStorage(e,key){
	localStorage.setItem(key , JSON.stringify(e[key]));
}

function storeToStorageSimple(e,key){
	localStorage.setItem(key , JSON.stringify(e));
}

function getFromStorage(key){
	return JSON.parse(localStorage.getItem(key))
}

function deleteFromStorage(key){
	return JSON.parse(localStorage.removeItem(key))
}

function dataInitialize(){
	$(".clear").click(function() {
		localStorage.clear();
		return false;
	});
}

function ajaxLinkClick(){
	$("a").click(function(e) {
		ajaxGetPage($(this).attr('href'), $(this).hasClass('outerLink'))
		return false;
	});
}

function ajaxGetPage(link, outerLink){
	console.log(outerLink)
	if(!outerLink){	
		$.ajax({
			url: link,
			type: 'GET',
			dataType: 'html'
		})
		.done(function(e) {
			checkUrl = this.url
			$("#contents").children().animate({
				"margin-left": "-50%",
				"opacity": "0"},
				define.a,
				function(){
					$(this).remove();
					$("#contents").prepend(e)
					initFunction();
					$("#contents").children().css({
						"margin-left": '50%',
						"opacity": '0'
					}).animate({
						"margin-left": '0',
						"opacity": '1'
					},define.a,function(){
					})
					if(checkUrl == "home.html"){
						// initFunction()
					}else if(checkUrl.match(/init./)){
						registerFunction()
					}
			})
		})
	}else{
		location.href(link)
		return
	}
}


function ajaxGetPageInit(){
	initVerifyer();
	ajaxLinkClick();

	if(define.status.account == false){
		if(localStorage.email == undefined){
			targetUrl = "init.mail.html"
		}else if(localStorage.clientkey == undefined && localStorage.deviceid == undefined && localStorage.devicekey == undefined){
			targetUrl = "init.clientkey.html"
		}else if(localStorage.securityType == undefined && localStorage.ssid == undefined && localStorage.password == undefined && localStorage.devicekey == undefined){
			targetUrl = "init.serialize.html"
		}
		$("body").addClass('initialize')
		$("nav").addClass('disabled')
	}else{
		targetUrl = "home.html"
	}
	$.ajax({
		url: targetUrl,
		type: 'GET',
		dataType: 'html'
	})
	.done(function(e) {
		$("#contents").prepend(e)
		if(targetUrl == "home.html"){
			initFunction()
		}else if(targetUrl.match(/init./)){
			registerFunction()
		}
	})
}

