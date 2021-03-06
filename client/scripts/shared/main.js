(function() {
  'use strict';
  angular.module('app.controllers', ['nvd3']).controller('AppCtrl', [
    '$scope', '$rootScope', function($scope, $rootScope) {
      var $window;
      $window = $(window);
      $scope.main = {
        brand: 'Flock Focus',
        name: 'Tara Neier'
      };
      $scope.pageTransitionOpts = [
        {
          name: 'Fade up',
          "class": 'animate-fade-up'
        }, {
          name: 'Scale up',
          "class": 'ainmate-scale-up'
        }, {
          name: 'Slide in from right',
          "class": 'ainmate-slide-in-right'
        }, {
          name: 'Flip Y',
          "class": 'animate-flip-y'
        }
      ];
      $scope.admin = {
        layout: 'wide',
        menu: 'vertical',
        fixedHeader: true,
        fixedSidebar: true,
        pageTransition: $scope.pageTransitionOpts[0]
      };
          $scope.chartPalette = [
              '#5B90BF', '#A2BF8A','#ECCC87', '#AB434C', '#B58DAE','#616775','#c16069','#949fb2'
          ]
      $scope.$watch('admin', function(newVal, oldVal) {
        if (newVal.menu === 'horizontal' && oldVal.menu === 'vertical') {
          $rootScope.$broadcast('nav:reset');
          return;
        }
        if (newVal.fixedHeader === false && newVal.fixedSidebar === true) {
          if (oldVal.fixedHeader === false && oldVal.fixedSidebar === false) {
            $scope.admin.fixedHeader = true;
            $scope.admin.fixedSidebar = true;
          }
          if (oldVal.fixedHeader === true && oldVal.fixedSidebar === true) {
            $scope.admin.fixedHeader = false;
            $scope.admin.fixedSidebar = false;
          }
          return;
        }
        if (newVal.fixedSidebar === true) {
          $scope.admin.fixedHeader = true;
        }
        if (newVal.fixedHeader === false) {
          $scope.admin.fixedSidebar = false;
        }
      }, true);
      return $scope.color = {
        primary: '#5B90BF',
        success: '#A3BE8C',
        info: '#B48EAD',
        infoAlt: '#AB7967',
        warning: '#EBCB8B',
        danger: '#BF616A',
        gray: '#DCDCDC'
      };
    }
  ]).controller('HeaderCtrl', ['$scope', function($scope) {}]).controller('NavContainerCtrl', ['$scope', function($scope) {}]).controller('NavCtrl', [
    '$scope', 'taskStorage', 'filterFilter', function($scope, taskStorage, filterFilter) {
      var tasks;
      tasks = $scope.tasks = taskStorage.get();
      $scope.taskRemainingCount = filterFilter(tasks, {
        completed: false
      }).length;
      return $scope.$on('taskRemaining:changed', function(event, count) {
        return $scope.taskRemainingCount = count;
      });
    }
  ]).controller('CoopCtrl', ['$scope', function($scope) {}]).controller('NavContainerCtrl', ['$scope', function($scope) {}]).controller('NavCtrl', [
    '$scope',  function($scope) {

    }
  ]).controller('ProdChartCtrl', ['$scope', 'flockService','chartService',
                          function($scope,  flockService, chartService) {
      $scope.prodData;
      $scope.prodOptions = {
        chart: {
          type: 'linePlusBarChart',
          height: 450,
          margin: {top: 30, right: 60, bottom: 50, left: 90},
          x: function (d, i) {return Date.parse(d[0])},
          y: function(d){return d[1]},
          //color: (d3.scale.category10().range()),
            color:  chartService.getPalette(),
          tooltipContent:(function(key, x, y, e, graph) {
	        return '<h3>' + key + '</h3><p>' + d3.format(',.02f')(y) + ' at ' + d3.time.format(x) + '</p>' }),
          xAxis: {axisLabel: 'Date', tickFormat: function(d){ return d3.time.format('%x')(new Date (d))}},
          y1Axis: {axisLabel: 'Qty', tickFormat: d3.format(',f') },
          y2Axis: {axisLabel: 'Total Gms', tickFormat: d3.format(',.02f') },

          showValues: true,
          valueFormat: function(d){
                return d3.format(',.f')(d);
            },
            transitionDuration: 1200
        }
      }
      getProdData();
      function getProdData() {
        chartService.getData('prod')
            .success(function (data) {
              $scope.prodData = data;

            })
            .error(function (error) {
              $scope.status = 'Unable to load customer data: ' + error.message;
            })
      };

    }
  ]).controller('DashboardCtrl', ['$scope', 'flockService','chartService',
                          function($scope,  flockService, chartService) {
      $scope.flock;
      $scope.status;
      $scope.sitesData;
      $scope.sitesOptions = {
        chart: {
            type: 'pieChart',
            height: 400,
            x: function(d){ return d.label; },
            y: function(d){ return d.value; },
            showValues: true,
            valueFormat: function(d){
                return d3.format(',.f')(d);
            },
            transitionDuration: 1200
        }};
      $scope.eggsData;


      $scope.gramsData;
      $scope.pieOptions = {
        chart: {
          type: 'pieChart',
          height: 450,
          x: function(d){ return d.label; },
          y: function(d){ return d.value; },
          showValues: true,
          valueFormat: function(d){
                return d3.format(',.f')(d);
            },
          transitionDuration: 1200,
            color: chartService.getPalette()
        }
      }


      getFlock();
      getSites();
      getEggs();
      getGrams();
      function getFlock() {
        flockService.getFlock(1)
            .success(function (data) {
              $scope.flock = data;
              initCharts();
            })
            .error(function (error) {
              $scope.status = 'Unable to load customer data: ' + error.message;
            })
      };

      function getSites() {
        chartService.getData('sites')
            .success(function (data) {
              $scope.sitesData = data;
            })
            .error(function (error) {
              $scope.status = 'Unable to load customer data: ' + error.message;
            })
      };
      function getEggs(){
        chartService.getData('eggs')
            .success(function (data) {
              $scope.eggsData = data;
            })
            .error(function (error) {
              $scope.status = 'Unable to load customer data: ' + error.message;
            })
      };
      function getGrams(){
        chartService.getData('grams')
            .success(function (data) {
              $scope.gramsData = data;
            })
            .error(function (error) {
              $scope.status = 'Unable to load customer data: ' + error.message;
            })
      };

      function initCharts() {
        $scope.percentDay = {
          percent: $scope.flock.percent_day,
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
        $scope.percentWeek = {
          percent: $scope.flock.percent_week,
          options: {
            animate: {
              duration: 1000,
              enabled: false
            },
            barColor: $scope.color.info,
            lineCap: 'round',
            size: 120,
            lineWidth: 5
          }
        };
        $scope.percentMonth = {
          percent: $scope.flock.percent_month,
          options: {
            animate: {
              duration: 1000,
              enabled: false
            },
            barColor: $scope.color.warning,
            lineCap: 'round',
            size: 120,
            lineWidth: 5
          }
        };
        $scope.percentQuarter = {
          percent: $scope.flock.percent_quarter,
          options: {
            animate: {
              duration: 1000,
              enabled: false
            },
            barColor: $scope.color.danger,
            lineCap: 'round',
            size: 120,
            lineWidth: 5
          }
        };

      }

  }])

  ;

}).call(this);
