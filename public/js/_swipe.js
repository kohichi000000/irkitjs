function controllerSwiper(){

}

function buttonPress_initialize(){
	$(".buttonList").children('li').hammer().on("panleft panright panend pancancel tap press",function(ev){
		console.log(this)
		console.log(ev)
		console.log(ev.type)

		var buttonId = $(this).attr("data-button-id")
		var pressTimer;
		switch(ev.type){
			case("press"):
				console.log("press is excuted")
				break;
			case("tap"):
				// clearInterval(pressTimer);
				ajaxPost(getFromStorage("irkitJsData")[buttonId]["buttonData"])
				break;
			case("panright"):
				$(this).find('.sortUp').addClass('active')

				if(ev.gesture.distance > 52){
					$(this).find('.sortUp').removeClass('active')
					$(this).find('.sortDown').addClass('active')
				}

				$(this).find("button").css('left', ev.gesture.distance + "px");

				if(ev.gesture.distance > 104){
					console.log("over 104px")
					$(this).find('button').css("left", "104px")
				}
				break;
			case("panleft"):
				$(this).find('.edit').addClass('active')

				if(parseInt($(this).find("button").css('left')) <= 0){
					$(this).find("button").css('left', -ev.gesture.distance + "px")
				}else{
					$(this).find("button").css('left', ev.gesture.distance + "px")
				}

				if(ev.gesture.distance > 52){
					$(this).find('.edit').removeClass('active')
					$(this).find('.delete').addClass('active')
				}

				if(ev.gesture.distance > 104){
					$(this).find('button').css("left", "-104px")
				}
				break;
			case("panend"):
				$(this).find('button').animate({"left": "0px"}, define.a)
				tabSubButton(ev.gesture.distance , this)
				break;
		}
	})
}

// var testTimer;

// function startTimer(){
// 	testTimer=setInterval(function(){
// 		繰り返し処理させたいコード
// 	} , 1000);
// }

// function stopTimer(){
// clearInterval(testTimer);
// }

// 「発火」させたいタイミングで
// startTimer();

// 「停止」させたいタイミングで
// stopTimer()；