function swipeTest(){

	$("#test").children('li').hammer().on("panleft panright panend tap press", function(ev){
		
		if(typeof(currentPosition) == "undefined"){
			currentPosition = 0;
		}

		switch(ev.type){
			case("panright"):
				$(this).css('left', ev.gesture.distance + "px");
				break;
			case("panleft"):
				if(parseInt($(this).css('left')) < 10){
					$(this).css('left', -ev.gesture.distance + "px")
				}else{
					$(this).css('left', ev.gesture.distance + "px")
				}
				break;
			case("panend"):
				currentPosition = 0;
				break;
		}
		// console.log(currentPosition)
	})
}

$(window).load(function() {
	swipeTest()	
});


// angle: -174.80557109226518
// center: Object
// changedPointers: Array[1]
// deltaTime: 87
// deltaX: -11
// deltaY: -1
// direction: 2
// distance: 11.045361017187261
// eventType: 2
// isFinal: false
// isFirst: false
// offsetDirection: 4
// pointerType: "mouse"
// pointers: Array[1]
// rotation: 0
// scale: 1
// srcEvent: MouseEvent
// target: button
// timeStamp: 1408961728395
// velocity: 0.1875
// velocityX: 0.1875
// velocityY: 0
// __proto__: Object