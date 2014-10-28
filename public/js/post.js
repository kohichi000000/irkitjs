function ajaxPost(e,ev){
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
		window.setTimeout(function(){
			$(ev.target).find(".checkmark").addClass('active').animate({
				"opacity": 0
			}, define.a*4, function(){
				$(this).remove();
			})
		},define.a*2)
		console.log("success");
	})
	.fail(function(XMLHttpRequest, textStatus, errorThrown) {
		return false;
	})
	.complete(function(e){
		console.log("complete");
	})
}

function ajaxPostPre(e){
	$(e.target).append('
    <div class="checkmark"></div>
	')
}