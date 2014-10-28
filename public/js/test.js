function buttonPress(e){
	console.log(e.type)
	console.log("buttonPress is excuted")
	if(e.type == 'release'){
		console.log(e.type)
		console.log("buttonPress is released")
	}
}