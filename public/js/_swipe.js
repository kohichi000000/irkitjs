function button_init(){
	var buttonList = $(".buttonList").children('li');

	for (var i = 0; i < buttonList.length; i++) {
		var buttonObj = new Hammer(buttonList[i]);

		buttonObj.add(
			new Hammer.Press({
				// event: 'hold'
			})
		)
		buttonObj.on('panleft panright panend tap hold release', button_devide)
	};
}

function button_devide(ev){
	var buttonId = $(ev.target).parent('li').attr('data-button-id')
	switch(ev.type){
		case('panleft'):
			button_excute_panleft(ev, buttonId)
			break;
		case('panright'):
			button_excute_panright(ev, buttonId)
			break;
		case('panend'):
			button_excute_panend(ev, buttonId)
			break;
		case('tap'):
			button_excute_tap(ev, buttonId)
			break;
		case('release'):
			console.log("release is excuted")
			console.log(ev)
			break;
		case('hold'):
			console.log("hold is excuted")
			console.log(ev)
			button_excute_hold(ev, buttonId)
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
	ajaxPost(getFromStorage("irkitJsData")[buttonId]["buttonData"])
}

function button_excute_hold(ev,buttonId){

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