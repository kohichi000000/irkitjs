function button_press_devide (ev) {
	var buttonId = $(ev.target).parent('li').attr('data-button-id')
	if(ev.type === 'press'){
		appearButtonEditConsole($(ev.target).parent('li'))
	}
}