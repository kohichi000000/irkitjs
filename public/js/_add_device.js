function add_device_init(){
	console.log("add_device is excuted")
	add_device_getKey()
}

function add_device_getKey(){
	getClientKey = getFromStorage("clientkey");
	$("#display_clientkey").text(getClientKey);
}