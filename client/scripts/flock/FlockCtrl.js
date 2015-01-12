/**
 * Created by tneier on 1/5/15.
 */


(function() {
  'use strict';
var app = angular.module('app.flock', [])
    .controller('FlockCtrl', ['$scope','apiHost','birdService', function($scope, apiHost, birdService){
        $scope.birds;
        $scope.apiHost = apiHost;
        getBirds();
        function getBirds(){
            birdService.getBirds('')
            .success(function (data) {
              $scope.birds = data;
            })
            .error(function (error) {
              $scope.status = 'Unable to load customer data: ' + error.message;
            })
        }

    }]);

}).call(this);

