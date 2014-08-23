function controllerSwiper(){
	var myElement = $('#myElement').hammer();

	defPos = 0
	$(".buttonList").children('li').hammer().on("panleft panright panend tap press", function(ev){
		if(ev.type == "panleft"){
			console.log()
			$(this).find('.edit').addClass('active')

			if(ev.gesture.distance > 52){
				$(this).find('.edit').removeClass('active')
				$(this).find('.delete').addClass('active')
			}
			
			$(this).find('button').css('left', defPos-ev.gesture.distance);
			// defPos = defPos - ev.gesture.distance

		}else if(ev.type == "panright"){

			$(this).find('.sortUp').addClass('active')

			if(ev.gesture.distance > 52){
				$(this).find('.sortUp').removeClass('active')
				$(this).find('.sortDown').addClass('active')
			}

			$(this).find('button').css('left', defPos + ev.gesture.distance);
			defPos = ev.gesture.distance

		}else if(ev.type == "panend"){
			$(this).find('button').animate({"left": "0px"}, define.a)
			defPos = 0
			console.log("pan is end")
		}
	})
}
