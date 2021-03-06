'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:YoutubeCtrl
 * @description
 * # YoutubeCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('YoutubeCtrl',['$scope', '$rootScope', '$http', 'config', 'storage', function ($scope, $rootScope, $http, config, storage) {
       var type = 'youtube';
       if ($rootScope.video && $rootScope.video.video_type === type){
         $scope.r = $rootScope.video.video;
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
                    video_type : type,                  
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
