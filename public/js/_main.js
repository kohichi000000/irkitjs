function ajaxPost(e){
	$.ajax({
		type: "POST",
		url: define.url.messages,
		data: {
			clientkey: getFromStorage("clientkey"),
			deviceid: getFromStorage("deviceid"),
			message: JSON.stringify(e)
		},
		cache: false,
		timeout: 1000
	})
	.done(function(json){
		console.log("success");
	})
	.fail(function(XMLHttpRequest, textStatus, errorThrown) {
		return false;
	})
	.complete(function(e){
		// console.log(e)
	})
}

function ajaxPostHold(num){
	console.log("ajaxPostHold is excuted")
	ajaxPost(getFromStorage("irkitJsData")[num]["buttonData"])
}

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

	var getButtonData = $.ajax({
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
		console.log("ajaxGet is success")
		return json.message
	})
	.fail(function(XMLHttpRequest, textStatus, errorThrown) {
		console.log("get is error")
	});

	var strToObj = (new Function("return " + getButtonData.responseText))();
	return strToObj.message // 'aの値'
}

function addButtonName(){
	$("#addButtonName").click(function() {
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

	$("ul.buttonList").children('li').remove()
	location.reload(true)
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
		location.reload(true)
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
	if(!outerLink){	
		$.ajax({
			url: link,
			type: 'GET',
			dataType: 'html'
		})
		.done(function(e) {
			console.log(link + " ajaxGetPage is success")
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
						window.history.pushState(null,null,"?ref=#" + checkUrl);
					})
					if(checkUrl == "home.html"){
						// initFunction()
					}else if(checkUrl.match(/init./)){
						if(checkUrl == 'init.wifi.html') {
						  getWifiSetting(ajaxGetPageStore("init.serialize.html"),ajaxGetPageStore("init.thanks.html"))
						}
						registerFunction()
					}
			})
		})
	}else{
		location.href(link)
		return
	}
}

function ajaxGetPageStore(link){
	var storeHtml = 
	$.ajax({
		url: link,
		type: 'GET',
		dataType: 'html',
		async: false
	})
	.done(function(e) {
		console.log("ajaxGetPageStore is success")
		return e;
	})
	return storeHtml.responseText
}

function ajaxGetPageInit(){
	initVerifyer();

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
