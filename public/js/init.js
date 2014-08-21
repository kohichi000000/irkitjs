var define = {
      w: function(){ return $(window).width() },
      h: function(){ return $(window).height() },
      s: function(){ return $(document).scrollTop() },
      b: 480,
      a: 1000,
      // a: 200,
      url:{
      	messages: "https://api.getirkit.com/1/messages",
				clients: 	"https://api.getirkit.com/1/clients",
				apps: 		"https://api.getirkit.com/1/apps",
				devices: 	"https://api.getirkit.com/1/devices"
      },
		  status:{
		  	account: 	true,
		  	data: 		true
		  }
    };

	buttonArray = [];
	irkitJsDataStore = {};


function buttonListMaker(){
  if(define.status.data){
    buttonArray = JSON.parse(localStorage.getItem("irkitJsData"));
    newButtonArray = [];

    for (var i = 0; i < buttonArray.length; i++) {

      newButtonObj = {
        buttonId:   i,
        buttonData: buttonArray[i].buttonData,
        buttonName: buttonArray[i].buttonName
      }

      newButtonArray.push(newButtonObj)

      $("ul.buttonList")
      .prepend('
        <li data-button-id="'+ i +'">
          <button class="remoteControllers">' + buttonArray[i]["buttonName"] + '</button>
          <div class="delete subButton"></div>
          <div class="edit subButton"></div>
          <div class="sortUp subButton"></div>
          <div class="sortDown subButton"></div>
        </li>
      ');
    };
    if(newButtonArray.length != 0){
      localStorage.removeItem("irkitJsData");
      storeToStorageSimple(newButtonArray,"irkitJsData")
    }
  }
}

// function buttonIdSort(array,i){
//   array[i].buttonId = i
//   localStorage.setItem("irkitJsData" , JSON.stringify(e[key]));
// }

function initFunction(){
  getAppsKey();
  initContentHeight()
  ajaxLinkClick();
  buttonListMaker()
  addButton();
  tapButton();
  tabSubButton();
  dataInitialize();
}

function registerFunction(){
  getAppsKey()
  getClientkey()
  getWifiSetting()
  selectVisualControll()
  getSerializeKey()
  initContentHeight()
  ajaxLinkClick()
}

$(window).load(function() {
  ajaxGetPageInit();
});