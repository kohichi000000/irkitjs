var define = {
      w: function(){ return $(window).width() },
      h: function(){ return $(window).height() },
      s: function(){ return $(document).scrollTop() },
      b: 480,
      a: 200,
      url:{
      	messages: "https://api.getirkit.com/1/messages",
				clients: 	"https://api.getirkit.com/1/clients",
				apps: 		"https://api.getirkit.com/1/apps",
				devices: 	"https://api.getirkit.com/1/devices"
      },
		  // irkit:      		"https://api.getirkit.com/1/messages",
		  // irkit_clients:  "https://api.getirkit.com/1/clients",
		  // irkit_apps:     "https://api.getirkit.com/1/apps",
		  // devices:      	"https://api.getirkit.com/1/devices",
		  status:{
		  	account: 	true,
		  	data: 		true
		  }
    };

   	buttonArray = [];
   	irkitJsDataStore = {};

function initVerifyer(){
	if(localStorage.email == undefined || localStorage.clientkey == undefined || localStorage.deviceid == undefined || localStorage.devicekey == undefined) define.status.account = false;
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

function buttonListMaker(){
	if(define.status.data){	
		buttonArray = JSON.parse(localStorage.getItem("irkitJsData")).buttonDataStore;

		for (var i = 0; i < buttonArray.length; i++) {
			$("ul.buttonList").prepend('<li data-button-id="'+ buttonArray[i]["buttonId"] +'"><button class="remoteControllers">'+ buttonArray[i]["buttonName"] +'</button></li>');
		};
	}
}

function addButton(){
	console.log("addButton is start")
	$(".addButton").click(function() {
		console.log("addButton is clicked")
		appearBottunConsole()
		console.log("addButton is end")
	});
}

function appearBottunConsole(){
	$.ajax({
		url: 'add.html',
		type: 'GET',
		dataType: 'html'
	})
	.done(function(source) {
		$("body").prepend('<div class="appearBottunShadow"></div>')
		$("#contents").append(source).addClass('none').delay(define.a).removeClass('none');
		addButtonName()
		// $("#addButtonNameConsole").hide(define.a)
		console.log("success");
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
		console.log(json)
		result = json.message
	})
	.fail(function(XMLHttpRequest, textStatus, errorThrown) {
		console.log(XMLHttpRequest)
		console.log(textStatus)
		console.log(errorThrown)
		console.log("get is error")
	});
	console.log("ajaxGet is end")
	return result;
}

function addButtonName(){
	console.log("addButtonName is start")
	$("#addButtonName").click(function() {
		var addButtonNameTextHtml;
		console.log("addButtonName is clicked")
		var addButtonNameBodyVal = $("#addButtonNameBody").val();

		if(addButtonNameBodyVal[0] != undefined){
			storeNewButton([ajaxGet(),addButtonNameBodyVal])
			$("#addButtonName").off();
			$("#addButtonNameConsole").hide(0, function() {
				$(this).remove()
			});
			$(".appearBottunShadow").hide(0, function() {
				$(this).remove()
			});
		}else{
			console.log("名前を入れてね")
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
	irkitJsDataStore.buttonDataStore = buttonArray;

	localStorage.setItem("irkitJsData" , JSON.stringify(irkitJsDataStore));

	$("ul.buttonList").prepend('<li data-button-id="'+ buttonObj.buttonId + '"><button class="remoteControllers">'+ buttonObj.buttonName +'</button></li>');
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

function getAppsKey(){
	console.log("getAppsKey is excuted")
	$('#getAppsKey').click(function(event){
		$.ajax({
			url: define.url.apps,
			type: 'POST',
			dataType: 'json',
			data: {
				email: $('#getAppsKeyBody').val()
			},
		})
		.done(function(e) {
			storeToStorageSimple($('#getAppsKeyBody').val(), "email")
			ajaxGetPage("init.clientkey.html")
		})
		.fail(function(e) {
			console.log(e)
		})
	});
}

function getClientkey(){
	console.log("getClientkey is excuted")
	$('#getClientKey').click(function(event) {
		$.ajax({
			url: define.url.clients,
			type: 'POST',
			dataType: 'json',
			data: {
				apikey: $('#getClientKeyBody').val()
			},
		})
		.done(function(e) {
			storeToStorageSimple($('#getClientKeyBody').val(),"apikey")
			storeToStorageSimple(e.clientkey,"clientkey")
			getDeviceId()
			ajaxGetPage("init.wifi.html")
		})
		.fail(function(e) {
			console.log(e);
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	});
}

function getDeviceId(){
	console.log("getDeviceId is excuted")
	console.log(getFromStorage("clientkey"))
	$.ajax({
		url: define.url.devices,
		type: 'POST',
		dataType: 'json',
		data: {
			clientkey: getFromStorage("clientkey")
		},
	})
	.done(function(e) {
		storeToStorage(e,"devicekey")
		storeToStorage(e,"deviceid")
	})
	.fail(function(e) {
		console.log(e);
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
}

function getWifiSetting(recieve){
	console.log("getWifiSetting is excuted")
	$("#wifiSetting").click(function() {
		$.ajax({
			url: define.url.clients,
			type: 'POST',
			dataType: 'json',
			data: {
				apikey: getFromStorage("clientkey")
			},
		})
		.done(function(e) {
			console.log(recieve)
			console.log(e)
			
			// ajaxGetPage("init.serialize.html")
		})
		.fail(function(e) {
			console.log(e);
			console.log("error");
		})
		.always(function() {
			console.log("complete");
			ajaxGetPage("init.serialize.html")
		});
	});
}

function getSerializeKey(){
	$('#getSerializedKey').click(function() {
		storeToStorageSimple($('#getSecurityType').val(),"securityType");
		storeToStorageSimple($('#getSsid').val(),"ssid");
		storeToStorageSimple($('#getPassword').val(),"password");

		var serialized = keyserializer.serialize({
		    security  : (function(e){
				    	switch(e){
				    		case "0":
						    	return keyserializer.SECURITY_WPA_WPA2
				    		case "1":
						    	return keyserializer.SECURITY_WEP
				    		case "2":
						    	return keyserializer.SECURITY_NONE
				    	}
		    })(getFromStorage("securityType")),
		    ssid      : getFromStorage("ssid"),
		    password  : getFromStorage("password"),
		    devicekey : getFromStorage("devicekey")
		});
		console.log(serialized)
		postSerializeKey(serialized)
		ajaxGetPage("init.thanks.html")
		ajaxLinkClick()
	});
}

function postSerializeKey(e){
	$.ajax({
		url: 'http://192.168.1.1/wifi',
		type: 'POST',
		data: e,
	})
	.done(function() {
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	console.log("ajax is end");
}

function tapButton(){
	$(".remoteControllers").click(function(e) {
		ajaxPost(getFromStorage("irkitJsData").buttonDataStore[$(this).parent().attr('data-button-id')]["buttonData"])
	});
}

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
	.done(function(json) {
		console.log("信号送信に成功しました");
	})
	.fail(function(XMLHttpRequest, textStatus, errorThrown) {
		console.log(XMLHttpRequest);
	});
}

function ajaxGetPageInit(){
	if(define.status.account == false){
		targetUrl = "init.mail.html"
		// targetUrl = "init.clientkey.html"
		// targetUrl = "init.wifi.html"
		// targetUrl = "init.serialize.html"
		// targetUrl = "init.thanks.html"
		$("body").addClass('initialize')
		$("nav").addClass('disabled')
	}else{
		targetUrl = "home.html"
		// targetUrl = "others.html"
	}
	$.ajax({
		url: targetUrl,
		type: 'GET',
		dataType: 'html'
	})
	.done(function(e) {
		$("#contents").prepend(e)
		getAppsKey();
		initContentHeight()
		buttonListMaker()
		addButton();
		tapButton();
	})
}

function ajaxLinkClick(){
	console.log("ajaxLinkClick is available")
	$("a").click(function(e) {
		ajaxGetPage($(this).attr('href'))
		return false;
	});
}

function ajaxGetPage(link){
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
				initContentHeight();
				ajaxLinkClick();
				$("#contents").children().css({
					"margin-left": '50%',
					"opacity": '0'
				}).animate({
					"margin-left": '0',
					"opacity": '1'
				},define.a,function(){
				})
				if(checkUrl == "home.html"){
					addButton()
					buttonListMaker()
				}else if(checkUrl == "init.clientkey.html"){
					getClientkey();
				}else if(checkUrl == "init.serialize.html"){
					getSerializeKey();
					selectVisualControll();
				}else if(checkUrl == "init.wifi.html"){
					getWifiSetting();
					ajaxLinkClick();
				}
		})
	})
}

function selectVisualControll(){
	var selectVal = function(e){
	 	switch(e){
			case "0":
	    	return "WPA_WPA2"
			case "1":
	    	return "WEP"
			case "2":
	    	return "NONE"
		}
	}
	$("#selectVisual").text(selectVal($("#getSecurityType").val()))
	$("#getSecurityType").change(function() {
		$("#selectVisual").text(selectVal($("#getSecurityType").val()))
	});
}

$(window).load(function() {
	initVerifyer();
	ajaxGetPageInit();
	ajaxLinkClick();
	console.log(getFromStorage("irkitJsData"))
});

$(window).resize(function() {
	// buttonListHeightAverager();
});
