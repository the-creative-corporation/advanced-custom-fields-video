'use strict';

/**
 * @ngdoc overview
 * @name appApp
 * @description
 * # appApp
 *
 * Main module of the application.
 */
angular
  .module('appApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch'
  ])
  .config(['$stateProvider', '$urlRouterProvider', 'config', function ($stateProvider, $urlRouterProvider, config) {
     var otherwise = 'youtube';
     switch(config.video_type){
       case "youtube":
       break;
       case "vimeo":
        console.log('vim');
        otherwise = 'vimeo';
       break;
       default:
       break;
     }
    
    $urlRouterProvider.otherwise(otherwise);
    $stateProvider
      .state('video', {
        abstract: true,
        template: '<ui-view/>'
      })
      .state('video.youtube', {
        url : '/youtube',
        templateUrl: 'views/youtube.html',
        controller: 'YoutubeCtrl',
        prettyName : 'youtube'
      })
      .state('video.vimeo', {
        url : '/vimeo',
        templateUrl: 'views/vimeo.html',
        controller: 'VimeoCtrl',
        prettyName: 'vimeo'
      });
  }])
  .run(['$document', '$rootScope', '$q', '$window', 'config', '$state', function($document, $rootScope, $q, $window, config, $state){
     $rootScope.state = $state;
     window.$rootScope = $rootScope;
     window.$state = $state;
      console.log('app started', config);
      var tag = $document[0].createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = $document[0].getElementsByTagName( 'script' )[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      $rootScope.youtubeReady = $q.defer();
      $window.onYouTubePlayerAPIReady = function() {
          $rootScope.youtubeReady.resolve();
          //$rootScope.$broadcast( 'onYouTubePlayerAPIReady' );
      };
  }]);
  
  //INIT APP WITH SOME PASSED IN PARAMS.
  window.addEventListener("message", function(event){
    if (!event.data.init){
      return;
    }
    //$rootScope.settings.resolve();
    console.log('message messaged :P', event);
    angular.module('appApp')
    .constant('config', event.data)
    .service('storage', [function(){
      return {
        save : function(data){
          var obj = {
            UID : event.data.UID,
            data : data
          };
          console.log('passing obj up : ', obj);
          event.source.postMessage(obj, "*");
        }
      };
    }]);
    angular.bootstrap(document, ['appApp']);
  });  
  
  window.test = function(){
    var testData, data;
    data = {
      "video_type":"vimeo",
      "video":{
        "id":101895020,
        "title":"STREETS - NEW YORK CITY",
        "description":"Shot with the Freefly TERO in the streets of Manhattan, Brooklyn and Queens.<br />\r\n<br />\r\nStabilized with the Freefly MōVI M10 and M15.<br />\r\n<br />\r\nShot on the Phantom Miro LC320S (1500-2000fps) and Red Epic Dragon<br />\r\n______________________________<br />\r\nBehind the Scenes clip: http://vimeo.com/100041841<br />\r\n______________________________<br />\r\n<br />\r\n<br />\r\nProduction: Freefly Systems // http://freeflysystems.com and Brooklyn Aerials // http://brooklynaerials.com<br />\r\n<br />\r\nDirector of Photography: Tim Sessler // http://timsessler.com<br />\r\n<br />\r\nCamera Operator: Brad Meier<br />\r\n<br />\r\nAssistant Camera: Cody White<br />\r\n_____________________<br />\r\n<br />\r\nMusic: Jonsi and Alex -  Stokkseyri <br />\r\n_____________________<br />\r\n<br />\r\nThanks to Tabb Firchau, Freefly, Abel Cine, Jon Lynn, Allan Potter, Daniel Nogueira, Michael Marantz, Autumn Kay Brookmire and everyone else involved in this project!",
        "url":"http://vimeo.com/101895020",
        "upload_date":"2014-07-28 01:48:31",
        "mobile_url":"http://vimeo.com/m/101895020",
        "thumbnail_small":"http://i.vimeocdn.com/video/484345272_100x75.jpg",
        "thumbnail_medium":"http://i.vimeocdn.com/video/484345272_200x150.jpg",
        "thumbnail_large":"http://i.vimeocdn.com/video/484345272_640.jpg",
        "user_id":2301076,
        "user_name":"Tim Sessler",
        "user_url":"http://vimeo.com/timsessler",
        "user_portrait_small":"http://i.vimeocdn.com/portrait/4828193_30x30.jpg",
        "user_portrait_medium":"http://i.vimeocdn.com/portrait/4828193_75x75.jpg",
        "user_portrait_large":"http://i.vimeocdn.com/portrait/4828193_100x100.jpg",
        "user_portrait_huge":"http://i.vimeocdn.com/portrait/4828193_300x300.jpg",
        "stats_number_of_likes":2827,
        "stats_number_of_plays":138536,
        "stats_number_of_comments":65,
        "duration":275,
        "width":1920,
        "height":816,
        "tags":"Freefly, Tero, RC car, HPI, MoVI, m10, m15, Vision Research, Phantom, Miro, Miro LC320, high speed, super slowmo, 1500fps, 2000fps, nyc, brooklyn, manhattan, red epic dragon, leica r",
        "embed_privacy":"anywhere"
      }
    }; 
    testData = {
      init : true,
      video : data,
      UID : Math.floor( Math.random() * 10000000000 ),
      youtube : {
        APIKey : 'AIzaSyBUi36u48h1eFld14jwUajKKpiI61UMyDM'
      },
      vimeo : {
        accessToken : '4fec9c74d7d247685ac39e3910ad5407'
      }
    };
    window.postMessage(testData, "*");
  };
  test();//lz
