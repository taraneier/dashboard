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

    }])
  .directive('bird',['$interval', function($interval){

      return{
          restrict: 'E',
          scope: {
            cam: '='
          },
          //templateURL: 'camera.html',
          template: '<img ng-src="http://{{cam.host}}/cgi-bin/CGIProxy.fcgi?cmd=snapPicture2&usr=dashboard&pwd=EaM@WFmALJ28&t=" width="1164" name="{{cam.host}}" id="{{cam.id}}">',
          link: function (scope, element, attrs){
              var timeoutId;

              function imgUrl(host) {
                  var date = new Date();
                  var url = 'http://' + host + '/cgi-bin/CGIProxy.fcgi?cmd=snapPicture2&usr=dashboard&pwd=EaM@WFmALJ28&t=' + Math.floor(date.getTime() / 1000);
                  return url;
              }

              function updateImage() {
                  if (element[0].parentNode.classList.contains('active')) {
                      element[0].children[0].src = imgUrl(element[0].children[0].name);
                  }
              }

              element.on('$destroy', function() {
                $interval.cancel(timeoutId);
              });
              updateImage();
              // start the UI update process; save the timeoutId for canceling
              timeoutId = $interval(function() {
                updateImage(); // update DOM
              }, 5000);
        }
    }
  }]);

}).call(this);

