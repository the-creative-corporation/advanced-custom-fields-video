<link rel="stylesheet" href="<?php echo plugin_dir_url(__FILE__); ?>/css/main.css" />
<script type="text/javascript">
  var IframeManager = (function(iframe){
    var Manager = this;
    var iframe = iframe;
    var $ = jQuery;
    input = $(iframe).siblings('input'),
    UID = Math.floor( Math.random() * 10000000000 ),
    iWindow = iframe.contentWindow;
    
    this.iframe = iframe;
    this.iWindow = iWindow;
    this.input = input;
    this.UID = UID;
    //RESIZE IFRAME
    this.resize = function(){
      setTimeout(function(){
        $(iframe).height(iWindow.$(iWindow.document).height());//resize our iframe to fit new size;            
      }, 1000);      
    }
    //LISTEN TO DATA BROADCAST FROM IFRAME
    this.listen = function(){
      window.addEventListener("message", function(event){
        var sanitized;
        //$rootScope.settings.resolve();
        console.log('message passed up :)', event);
        if (event.data.UID === UID){//match UID to make sure we're dealing with correct field
          sanitized = encodeURIComponent(JSON.stringify(event.data.data));
          input.val(sanitized);
          resize();     
        }
      });
    }    
    
    //LOAD DATA INTO IFRAME
    this.setData = function(){
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
    Manager.setData();
    Manager.resize();
    Manager.listen();    
  });
  window.acfVideoIframes = [];
  window.acfVideoInit = function(iframe) {
    acfVideoIframes.push(new IframeManager(iframe));
  }
  delete IframeManager;
  
</script>
