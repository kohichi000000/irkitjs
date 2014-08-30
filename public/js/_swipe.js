function controllerSwiper(){
	// defPos = 0
	console.log("controllerSwiper is excuted")

	$(".buttonList").children('li').hammer().on("panleft panright panend tap press", function(ev){

		switch(ev.type){
			case("tap"):
				console.log($(this).attr('data-button-id'))
				ajaxPost(getFromStorage("irkitJsData")[$(this).attr('data-button-id')]["buttonData"])
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