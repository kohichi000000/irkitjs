function getAppsKey(){

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
			console.log("getClientkey is success");
			storeToStorageSimple($('#getClientKeyBody').val(),"apikey")
			storeToStorageSimple(e.clientkey,"clientkey")
			getDeviceId()
		  getWifiSetting(ajaxGetPageStore("init.serialize.html"))
			ajaxGetPage("init.wifi.html")
		})
		.fail(function(e) {
			console.log("getClientkey is error");
		})
		.always(function() {
			console.log("getClientkey is complete");
		});
	});
}

function getDeviceId(){
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
		console.log("getDeviceId is success");
	})
	.fail(function(e) {
		console.log("getDeviceId is error");
	})
	.always(function() {
		console.log("getDeviceId is complete");
	});
}

function getWifiSetting(recieve){
	console.log(recieve)
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
			console.log("getWifiSetting is success")
			$("#contents").children().animate({
				"margin-left": "-50%",
				"opacity": "0"},
				define.a,
				function(){
					$(this).remove();
					$("#contents").prepend(recieve)
					initFunction();
					$("#contents").children().css({
						"margin-left": '50%',
						"opacity": '0'
					}).animate({
						"margin-left": '0',
						"opacity": '1'
					},define.a)
			})
		})
		.fail(function(e) {
			console.log("getWifiSetting is error");
		})
		.always(function() {
			console.log("getWifiSetting is complete");
			// ajaxGetPage("init.serialize.html")
		});
	});
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


