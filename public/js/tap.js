function button_tap_devide (ev) {
  var buttonId = $(ev.target).parent('li').attr('data-button-id');
  switch(ev.type){
    case 'tap':
      button_excute_tap(ev, buttonId);
      break;
    case 'doubletap':
      break;
  }
}