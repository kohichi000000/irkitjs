// function buttonPress_initialize(){
// var myElement = $(".buttonList").children('li')[0];
// var mc = new Hammer(myElement);

// console.log(myElement)
// console.log(mc)

// mc.add(
// 	new Hammer.Press({
// 		event: 'release',
// 		threshold:2000
// 	})
// )

// console.log(mc)
// console.log(mc.options)

// // mc.on("press panend release", buttonPress);
// // mc.on("quadrupletap", handleTaps);
// }

function buttonPress(e){
	console.log(e.type)
	console.log("buttonPress is excuted")
	if(e.type == 'release'){
		console.log(e.type)
		console.log("buttonPress is released")
	}
}