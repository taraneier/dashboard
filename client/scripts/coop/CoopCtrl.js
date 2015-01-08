/**
 * Created by tneier on 1/5/15.
 */
(function() {
  'use strict';
var app = angular.module('app.coop', [])
    .controller('CameraCtrl', ['$scope', function($scope){
        $scope.cameras = [
            {name: 'Indoor',  id: 'indoor', host: 'dg1998.myfoscam.org:88'},
            {name: 'Outdoor', id: 'outdoor',host: 'dn0791.myfoscam.org:89'},
            {name: 'Garden',  id: 'garden', host: 'fv5036.myfoscam.org:90'}
        ];
    }])
  .directive('camera',['$interval', function($interval){

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
                  console.log(url);
                  return url;
              }

              function updateImage() {
                  element[0].children[0].src = imgUrl(element[0].children[0].name);
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

