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
    .controller('MonitorCtrl',['$scope', 'monitorService','$interval', function($scope, monitorService, $interval){


        var gaugeOpts= {
                  lines: 12,
                  angle: 0,
                  lineWidth: 0.47,
                  pointer: {
                    length: 0.6,
                    strokeWidth: 0.03,
                    color: '#000000'
                  },
                  limitMax: 'false',
                  strokeColor: '#E0E0E0',
                  generateGradient: true,
                  percentColors: [[0.0, $scope.color.success], [1.0, $scope.color.success]]
              };
            $scope.lightChart1 = new Gauge(document.getElementById('light1')).setOptions(gaugeOpts);
            $scope.lightChart1.maxValue = 1000;
            $scope.lightChart1.animationSpeed = 42;
            $scope.lightChart1.set(500);

            $scope.t0 = new Gauge(document.getElementById('t0')).setOptions(gaugeOpts);
            $scope.t0.maxValue = 80;
            $scope.t0.animationSpeed = 42;
            $scope.t0.set(50);

            $scope.t1 = new Gauge(document.getElementById('t1')).setOptions(gaugeOpts);
            $scope.t1.maxValue = 80;
            $scope.t1.animationSpeed = 42;
            $scope.t1.set(50);


            $scope.t2 = new Gauge(document.getElementById('t2')).setOptions(gaugeOpts);
            $scope.t2.maxValue = 80;
            $scope.t2.animationSpeed = 42;
            $scope.t2.set(50);

        getMonLatest();

        $interval(function(){
            getMonLatest();
        },5000);
        function getMonLatest() {
            monitorService.getLatest(1)
            .success(function (data) {
              $scope.monitor = data;
                    if (data.door){
                        $scope.monitor.door = "Closed";
                    } else {
                        $scope.monitor.door = "Open";
                    }
                $scope.lightChart1.set($scope.monitor.lum);
                    $scope.t0.set($scope.monitor.t0);
                    $scope.t1.set($scope.monitor.t1);
                    $scope.t2.set($scope.monitor.t2);
                initCharts();
            })
            .error(function (error) {
              $scope.status = 'Unable to load data: ' + error.message;
            })
      };
        function initCharts() {
            $scope.humidity = {
                percent: $scope.monitor.hum,
                options: {
                    animate: {
                        duration: 1000,
                        enabled: false
                    },
                    barColor: $scope.color.success,
                    lineCap: 'round',
                    size: 120,
                    lineWidth: 5
                }
            };
        }

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
              }, 1000);
        }
    }
  }]);

}).call(this);

