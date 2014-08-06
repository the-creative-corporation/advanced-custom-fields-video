'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:VimeoCtrl
 * @description
 * # VimeoCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('VimeoCtrl', ['$scope', '$rootScope', '$http', 'config', 'storage', function ($scope, $rootScope, $http, config, storage) {
       var type = 'vimeo';
       if ($rootScope.video && $rootScope.video.video_type === type){
         $scope.r = $rootScope.video.video;
       };
       $scope.fetch = function(id){
          $rootScope.youtubeReady.promise.then(function(){
              var url = 'http://vimeo.com/api/v2/video/' + id + '.json';
              $http({method: 'GET', url: url}).success(function(data, status, headers, config) {
                  console.log('data!', data);
                  $scope.r = data[0];
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
      //