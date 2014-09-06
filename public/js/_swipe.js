function button_init(){
	var buttonParent = $(".buttonList");
	var buttonList = $(".buttonList").children('li');
	var buttonPos = button_swipe_makedata();

	for (var i = 0; i < buttonList.length; i++) {
		var buttonObj = new Hammer(buttonList[i]);

		buttonObj.add(
			new Hammer.Press({
				event: 'touchend'
			})
		)
		buttonObj.on('panleft panright panend tap press pressup touchend', button_devide)
	};

	if(buttonParent[0] != undefined){
		var buttonParentObj = new Hammer(buttonParent[0]);
		buttonParentObj.add(
			new Hammer.Pan({
				direction: Hammer.DIRECTION_VERTICAL,
				threshold:1
			})
		)
		buttonParentObj.on('pandown panup' , function(ev){
			button_swipe(ev,buttonPos)
		})
	}
}

function button_swipe_makedata(){
	var buttonList  = $(".buttonList").children('li');
	var buttonPos 	= [];

	for (var i = 0; i < buttonList.length; i++) {
		var buttonPosTaget = $(buttonList[i]).offset().top - $("header").height();
		var buttonPosParce = [buttonPosTaget,buttonPosTaget + ($(buttonList[i]).height() - 1)]
		buttonPos.push(buttonPosParce)
	};
	return buttonPos;
}

function button_swipe(ev,list){
	var buttonList  = $(".buttonList").children('li');
	var targetPos 	= ev.center.y - $("header").height();

	for (var i = 0; i < list.length; i++){
		if(list[i][0] < targetPos && list[i][1] > targetPos){
			if(!excutFlag){
				buttonId = Number($(buttonList[i]).attr('data-button-id'));

				ajaxPost(getFromStorage("irkitJsData")[buttonId]["buttonData"],ev)
				var excutFlag = true;
			}
		}
	};
}

function button_devide(ev){
	var buttonId = $(ev.target).parent('li').attr('data-button-id')
	switch(ev.type){
		case('tap'):
			button_excute_tap(ev, buttonId)
			break;
		case('press'):
			console.log("press is excuted")
			console.log(ev)
			button_excute_hold(ev, buttonId)
			break;
		case('pressup'):
			console.log("pressup is excuted")
			console.log(ev)
			button_stop_hold();
			break;
		case('panleft'):
			button_excute_panleft(ev, buttonId)
			break;
		case('panright'):
			button_excute_panright(ev, buttonId)
			break;
		case('panend'):
			button_excute_panend(ev, buttonId)
			break;
	}
}

function button_excute_panleft(ev,buttonId){
	$(ev.target).parent('li').find('.edit').addClass('active')

	if(parseInt($(ev.target).parent('li').find("button").css('left')) <= 0){
		$(ev.target).parent('li').find("button").css('left', -ev.distance + "px")
	}else{
		$(ev.target).parent('li').find("button").css('left', ev.distance + "px")
	}

	if(ev.distance > 52){
		$(ev.target).parent('li').find('.edit').removeClass('active')
		$(ev.target).parent('li').find('.delete').addClass('active')
	}
	if(ev.distance > 104){
		$(ev.target).parent('li').find('button').css("left", "-104px")
	}
}

function button_excute_panright(ev,buttonId){
	$(ev.target).parent('li').find('.sortUp').addClass('active')
	$(ev.target).parent('li').find("button").css('left', ev.distance + "px");

	if(ev.distance > 52){
		$(ev.target).parent('li').find('.sortUp').removeClass('active')
		$(ev.target).parent('li').find('.sortDown').addClass('active')
	}

	if(ev.distance > 104){
		$(ev.target).parent('li').find('button').css("left", "104px")
	}
}

function button_excute_panend(ev,buttonId){
	$(ev.target).parent('li').find('button').animate({"left": "0px"}, define.a)
	tabSubButton(ev.distance , $(ev.target).parent('li'))
}

function button_excute_tap(ev,buttonId){
	ajaxPostPre(ev);
	ajaxPost(getFromStorage("irkitJsData")[buttonId]["buttonData"],ev);
}

function button_excute_hold(ev,buttonId){
	button_hold_timer=setInterval(function(){
		button_excute_tap(ev,buttonId);
	},define.a*5);
}

function button_stop_hold(){
	clearInterval(button_hold_timer);
}
