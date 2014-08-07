<link rel="stylesheet" href="<?php echo plugin_dir_url(__FILE__); ?>/css/main.css" />
<script type="text/javascript">

var Manager = (function(iframe){
    var $ = jQuery,
    input = $(iframe).siblings('input'),
    UID = Math.floor( Math.random() * 10000000000 ),
    iWindow = iframe.contentWindow,
    Manager = this;
    
    //RESIZE IFRAME
    Manager.resize = function(){
      setTimeout(function(){
        $(iframe).height(iWindow.$(iWindow.document).height());//resize our iframe to fit new size;            
      }, 500);      
    }
    //LISTEN TO DATA BROADCAST FROM IFRAME
    function listen(){
      window.addEventListener("message", function(event){
        var sanitized;
        //$rootScope.settings.resolve();
        console.log('message passed up :)', event);
        if (event.data.UID === UID){//match UID to make sure we're dealing with correct field
          sanitized = encodeURIComponent(JSON.stringify(event.data.data));
          input.val(sanitized);
          Manager.resize();     
        }
      });
    }    
    
    //LOAD DATA INTO IFRAME
    function setData(){
      var data, sanitized;
      try {
        sanitized = JSON.parse(decodeURIComponent(input.val()));
      } catch(err) {
        console.log('error', err, input.val(), 'x');
        sanitized = false;
      }    
      data = {
        init : true,
        UID : UID,
        video : sanitized,
        youtube : {
          APIKey : 'AIzaSyBUi36u48h1eFld14jwUajKKpiI61UMyDM'
        },
        vimeo : {
          accessToken : '4fec9c74d7d247685ac39e3910ad5407'
        }
      };    
      iframe.contentWindow.postMessage(data, "*");
    }
    setData();
    Manager.resize();
    setTimeout(function(){//lazy;
    	Manager.resize();
    },1500);
    listen();	
});
  window.acfVideos = [];
  window.acfVideoInit = function(iframe) {
	acfVideos.push(new Manager(iframe) );
  }
  delete Manager;
</script>
