function controllerSwiper(){
	defPos = 0

	$(".buttonList").children('li').hammer().on("panleft panright panend tap press", function(ev){
		if(ev.type == "tap"){
			ajaxPost(getFromStorage("irkitJsData")[$(this).parent().attr('data-button-id')]["buttonData"])
		}else if(ev.type == "panleft"){

			$(this).find('.edit').addClass('active')

			if(ev.gesture.distance > 52){
				$(this).find('.edit').removeClass('active')
				$(this).find('.delete').addClass('active')
			}

			
			$(this).find('button').css('left', defPos-ev.gesture.distance);
			// defPos = defPos - ev.gesture.distance

			if(defPos-ev.gesture.distance < -104){
				$(this).find('button').css("left", "-104px")
			}

		}else if(ev.type == "panright"){

			$(this).find('.sortUp').addClass('active')

			if(defPos + ev.gesture.distance > 52){
				$(this).find('.sortUp').removeClass('active')
				$(this).find('.sortDown').addClass('active')
			}

			$(this).find('button').css('left', defPos + ev.gesture.distance);
			defPos = ev.gesture.distance

			if(defPos + ev.gesture.distance > 104){
				console.log("over 104px")
				$(this).find('button').css("left", "104px")
			}
			// console.log(ev)

		}else if(ev.type == "panend"){
			$(this).find('button').animate({"left": "0px"}, define.a)
			tabSubButton(defPos + ev.gesture.distance , this)
			defPos = 0
		}
	})
}
