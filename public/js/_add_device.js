function add_device_init(){
	console.log("add_device is excuted")
	add_device_getKey()
}

function add_device_getKey(){
	getClientKey = getFromStorage("clientkey");
	getDeviceKey = getFromStorage("devicekey");
	getDeviceId = getFromStorage("deviceid");
	$("#display_clientkey").text(getClientKey);
	$("#display_devicekey").text(getDeviceKey);
	$("#display_deviceid").text(getDeviceId);
}

function add_device_getDeviceId(){
	console.log("add_device_getDeviceId is excuted")
	$("#addDeviceInputButton").click(function() {		
		setClientKey = $("#addDeviceTextArea_clientkey").val();
		setDeviceKey = $("#addDeviceTextArea_devicekey").val();
		setDeviceId = $("#addDeviceTextArea_deviceid").val();

		storeToStorageSimple(setClientKey,"clientkey")
		storeToStorageSimple(setDeviceKey,"devicekey")
		storeToStorageSimple(setDeviceId,"deviceid")

		storeToStorageSimple(true,"addDeviceFlag")
		
		$.ajax({
			url: define.url.door,
			type: 'POST',
			dataType: 'json',
			data: {
				clientkey: getFromStorage("clientkey"),
				deviceid: getFromStorage("deviceid")
			},
		})
		.done(function() {
			console.log("door check is success");
		})
		.fail(function() {
			localStorage.clear();
			console.log("door check is error");
		})
		.always(function() {
			console.log("door check is complete");
			location.reload(true)
		});
	});
}