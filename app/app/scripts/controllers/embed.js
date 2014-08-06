'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:EmbedCtrl
 * @description
 * # EmbedCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('EmbedCtrl', ['$scope', '$rootScope', '$sce', 'config', 'storage', function ($scope, $rootScope, $sce, config, storage) {
       var type = 'embed';
       if ($rootScope.video.video_type === type){
         $scope.embed = $rootScope.video.video;
         $scope.trusted = $sce.trustAsHtml($scope.embed);
       }
       $scope.embed = null;
       $scope.fetch = function(){
          //console.log('raw: ', $scope.embed);
          $scope.trusted = $sce.trustAsHtml($scope.embed);
          storage.save({
            video_type : type,
            video : $scope.embed
          });
        };
  }]);
      //