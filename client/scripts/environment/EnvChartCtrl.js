/**
 * Created by tneier on 1/1/15.
 */

(function() {
  'use strict';
  angular.module('env.controllers', ['nvd3']).controller('AstroChartCtrl', ['$scope', 'flockService','chartService',
                          function($scope,  flockService, chartService) {
      $scope.astroData;
      $scope.astroOptions = {
        chart: {
          type: 'linePlusBarChart',
          height: 450,
          margin: {top: 30, right: 60, bottom: 50, left: 90},
          x: function (d, i) {return Date.parse(d[0])},
          y: function(d){return d[1]},
          color: (d3.scale.category10().range()),
          tooltipContent:(function(key, x, y, e, graph) {
	        return '<h3>' + key + '</h3><p>' + d3.format(',.02f')(e.point[1]) + ' on ' + x + '</p>' }),
          xAxis: {axisLabel: 'Date', tickFormat: function(d){ return d3.time.format('%x')(new Date (d))}},
          y1Axis: {tickFormat: d3.format(',.02f') },
          y2Axis: {tickFormat: d3.format(',.f') },

          showValues: true,
          valueFormat: function(d){
                return d3.format(',.f')(d);
            },
            transitionDuration: 1200
        }
      };
      getData();
      function getData() {
        chartService.getData('astro')
            .success(function (data) {
              $scope.astroData = data;

            })
            .error(function (error) {
              $scope.status = 'Unable to load customer data: ' + error.message;
            })
      };

    }]).controller('EnvChartCtrl', ['$scope', 'flockService','chartService',
                          function($scope,  flockService, chartService) {
      $scope.weatherData;
      $scope.weatherOptions = {
        chart: {
          type: 'linePlusBarChart',
          height: 450,
          margin: {top: 30, right: 60, bottom: 50, left: 90},
          x: function (d, i) {return Date.parse(d[0])},
          y: function(d){return d[1]},
          color: (d3.scale.category10().range()),
          tooltipContent:(function(key, x, y, e, graph) {
	        return '<h3>' + key + '</h3><p>' + d3.format(',.02f')(y) + ' at ' + d3.time.format(x) + '</p>' }),
          xAxis: {axisLabel: 'Date', tickFormat: function(d){ return d3.time.format('%x')(new Date (d))}},
          y1Axis: {axisLabel: 'Inches', tickFormat: d3.format(',.1f') },
          y2Axis: {axisLabel: 'Deg F', tickFormat: d3.format(',.1f') },
          showValues: true,
          valueFormat: function(d){
                return d3.format(',.f')(d);
            },
            transitionDuration: 500
        }
      };


      getData();
      function getData() {
        chartService.getData('weather')
            .success(function (data) {
              $scope.weatherData = data;
            })
            .error(function (error) {
              $scope.status = 'Unable to load customer data: ' + error.message;
            })
      };

    }])

  ;

}).call(this);
