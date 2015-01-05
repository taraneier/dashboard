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
          color: (d3.scale.category10().range()),
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

              var lineChart1 = {};
               lineChart1.data1 = [[1, 15], [2, 20], [3, 14], [4, 10], [5, 10], [6, 20], [7, 28], [8, 26], [9, 22]];
      //lineChart1.data1 = data[0].values;
      $scope.line1 = {};
      $scope.line1.data = [
        {
          data: lineChart1.data1,
          label: 'Average'
        }
      ];
      $scope.line1.options = {
        series: {
          lines: {
            show: true,
            fill: true,
            fillColor: {
              colors: [
                {
                  opacity: 0
                }, {
                  opacity: 0.3
                }
              ]
            }
          },
          points: {
            show: true,
            lineWidth: 2,
            fill: true,
            fillColor: "#ffffff",
            symbol: "circle",
            radius: 5
          }
        },
        colors: [$scope.color.primary, $scope.color.infoAlt],
        tooltip: true,
        tooltipOpts: {
          defaultTheme: false
        },
        grid: {
          hoverable: true,
          clickable: true,
          tickColor: "#f9f9f9",
          borderWidth: 1,
          borderColor: "#eeeeee"
        },
        xaxis: {
          ticks: [[1, 'Jan.'], [2, 'Feb.'], [3, 'Mar.'], [4, 'Apr.'], [5, 'May'], [6, 'June'], [7, 'July'], [8, 'Aug.'], [9, 'Sept.'], [10, 'Oct.'], [11, 'Nov.'], [12, 'Dec.']]
        }
      };
              //initCharts();
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
            transitionDuration: 1200
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
