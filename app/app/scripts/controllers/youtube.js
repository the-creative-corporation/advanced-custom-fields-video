'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:YoutubeCtrl
 * @description
 * # YoutubeCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('YoutubeCtrl',['$scope', '$rootScope', '$http', 'config', function ($scope, $rootScope, $http, config) {
       if (config.youtube.video){
         
       };
       $scope.fetch = function(id){
          $rootScope.youtubeReady.promise.then(function(){
              var baseURL = 'https://www.googleapis.com/youtube/v3',
                  resource = '/videos?',
                  parts = 'part=' + encodeURIComponent( 'id,contentDetails,player,snippet' ),
                  url = baseURL + resource + parts + '&id=' + id + '&key=' + config.youtube.APIKey;
              $http({method: 'GET', url: url}).success(function(data, status, headers, config) {
                  //console.log('data!', data);
                  $scope.r = data.items[0];
                  storage.save({    
                    video_type : 'youtube',                  
                    video : $scope.r
                  });                  
              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              });
          });
        };
  }]);
