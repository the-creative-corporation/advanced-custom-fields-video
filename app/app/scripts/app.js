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
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('youtube');
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
      $rootScope.settings = $q.defer();
  }]);
  
  window.addEventListener("message", function(event){
    //$rootScope.settings.resolve();
    console.log('message messaged :P', event);
    angular.module('appApp').constant('config', event.data);
    angular.bootstrap(document, ['appApp']);
  });  
  
  window.test = function(){
    var testData = {
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
