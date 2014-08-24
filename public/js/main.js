function tapButton(){
	// $(".remoteControllers").click(function(e) {
	// 	ajaxPost(getFromStorage("irkitJsData")[$(this).parent().attr('data-button-id')]["buttonData"])
	// });
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
		console.log("success");
	})
	.fail(function(XMLHttpRequest, textStatus, errorThrown) {
		console.log(XMLHttpRequest);
	});
}