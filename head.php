<link rel="stylesheet" href="<?php echo plugin_dir_url(__FILE__); ?>/css/main.css" />
<script type="text/javascript">
  window.acfYoutubeInit = function(iframe) {
    var $ = jQuery, input = $(iframe).siblings('input'), target = iframe.contentWindow.ntYoutubeFetch, sanitized;
    target.callback = function(data) {
      var sanitized = encodeURIComponent(JSON.stringify(data));
      input.val(sanitized);
      $(iframe).height(target.getHeight());
    }
    target.APIKey = 'AIzaSyBUi36u48h1eFld14jwUajKKpiI61UMyDM';

    target.r = sanitized;
    window.t = target;
    target.$apply();
    //FIXME: smells like a kludge.
    $(iframe).height(target.getHeight());
  }

</script>
<script type="text/javascript">
  window.acfVideoInit = function(iframe) {
    var $ = jQuery;
    input = $(iframe).siblings('input'),
    UID = Math.floor( Math.random() * 10000000000 );

    //LISTEN TO DATA BROADCAST FROM IFRAME
    function listen(){
      window.addEventListener("message", function(event){
        var sanitized, iWindow = iframe.contentWindow;
        //$rootScope.settings.resolve();
        console.log('message passed up :)', event);
        if (event.data.UID === UID){//match UID to make sure we're dealing with correct field;
          $(iframe).height(iWindow.$(iWindow.document).height());//resize our iframe to fit new size;
          sanitized = encodeURIComponent(JSON.stringify(data));
          input.val(sanitized);        
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
    listen();
  }
</script>
