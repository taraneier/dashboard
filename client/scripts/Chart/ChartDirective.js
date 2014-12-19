(function() {
  'use strict';
  angular.module('app.chart.directives', []).directive('gaugeChart', [
    function() {
      return {
        restrict: 'A',
        scope: {
          data: '=',
          options: '='
        },
        link: function(scope, ele, attrs) {
          var data, gauge, options;
          data = scope.data;
          options = scope.options;
          gauge = new Gauge(ele[0]).setOptions(options);
          gauge.maxValue = data.maxValue;
          gauge.animationSpeed = data.animationSpeed;
          return gauge.set(data.val);
        }
      };
    }
  ]).directive('chartjsChart', [
    function() {
      return {
        restrict: 'A',
        scope: {
          data: '=',
          options: '=',
          type: '='
        },
        link: function(scope, ele, attrs) {
          var ctx, data, myChart, options, type;
          data = scope.data;
          options = scope.options;
          type = scope.type.toLowerCase();
          ctx = ele[0].getContext("2d");
          switch (type) {
            case 'line':
              return myChart = new Chart(ctx).Line(data, options);
            case 'bar':
              return myChart = new Chart(ctx).Bar(data, options);
            case 'radar':
              return myChart = new Chart(ctx).Radar(data, options);
            case 'polararea':
              return myChart = new Chart(ctx).PolarArea(data, options);
            case 'pie':
              return myChart = new Chart(ctx).Pie(data, options);
            case 'doughnut':
              return myChart = new Chart(ctx).Doughnut(data, options);
          }
        }
      };
    }
  ]).directive('chartjsWithLegend', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          var canvas, helpers, legendHolder, moduleData, moduleDoughnut;
          canvas = ele[0];
          moduleData = [
            {
              value: 300,
              color: "#BF616A",
              highlight: "rgba(191,97,106,0.9)",
              label: "Red"
            }, {
              value: 50,
              color: "#A3BE8C",
              highlight: "rgba(163,190,140,0.9)",
              label: "Green"
            }, {
              value: 100,
              color: "#EBCB8B",
              highlight: "rgba(235,203,139,0.9)",
              label: "Yellow"
            }, {
              value: 40,
              color: "#949FB1",
              highlight: "#A8B3C5",
              label: "Grey"
            }, {
              value: 120,
              color: "#4D5360",
              highlight: "#616774",
              label: "Dark Grey"
            }
          ];
          moduleDoughnut = new Chart(canvas.getContext("2d")).Doughnut(moduleData, {
            responsive: true
          });
          legendHolder = document.createElement("div");
          legendHolder.innerHTML = moduleDoughnut.generateLegend();
          helpers = Chart.helpers;
          helpers.each(legendHolder.firstChild.childNodes, function(legendNode, index) {
            helpers.addEvent(legendNode, "mouseover", function() {
              var activeSegment;
              activeSegment = moduleDoughnut.segments[index];
              activeSegment.save();
              activeSegment.fillColor = activeSegment.highlightColor;
              moduleDoughnut.showTooltip([activeSegment]);
              activeSegment.restore();
            });
          });
          helpers.addEvent(legendHolder.firstChild, "mouseout", function() {
            moduleDoughnut.draw();
          });
          return canvas.parentNode.parentNode.appendChild(legendHolder.firstChild);
        }
      };
    }
  ]).directive('flotChart', [
    function() {
      return {
        restrict: 'A',
        scope: {
          data: '=',
          options: '='
        },
        link: function(scope, ele, attrs) {
          var data, options, plot;
          data = scope.data;
          options = scope.options;
          return plot = $.plot(ele[0], data, options);
        }
      };
    }
  ]).directive('flotChartRealtime', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          var data, getRandomData, plot, totalPoints, update, updateInterval;
          data = [];
          totalPoints = 300;
          getRandomData = function() {
            var i, prev, res, y;
            if (data.length > 0) {
              data = data.slice(1);
            }
            while (data.length < totalPoints) {
              prev = (data.length > 0 ? data[data.length - 1] : 50);
              y = prev + Math.random() * 10 - 5;
              if (y < 0) {
                y = 0;
              } else {
                if (y > 100) {
                  y = 100;
                }
              }
              data.push(y);
            }
            res = [];
            i = 0;
            while (i < data.length) {
              res.push([i, data[i]]);
              ++i;
            }
            return res;
          };
          update = function() {
            plot.setData([getRandomData()]);
            plot.draw();
            setTimeout(update, updateInterval);
          };
          data = [];
          totalPoints = 300;
          updateInterval = 200;
          plot = $.plot(ele[0], [getRandomData()], {
            series: {
              lines: {
                show: true,
                fill: true
              },
              shadowSize: 0
            },
            yaxis: {
              min: 0,
              max: 100
            },
            xaxis: {
              show: false
            },
            grid: {
              hoverable: true,
              borderWidth: 1,
              borderColor: '#eeeeee'
            },
            colors: ["#5B90BF"]
          });
          return update();
        }
      };
    }
  ]).directive('sparkline', [
    function() {
      return {
        restrict: 'A',
        scope: {
          data: '=',
          options: '='
        },
        link: function(scope, ele, attrs) {
          var data, options, sparkResize, sparklineDraw;
          data = scope.data;
          options = scope.options;
          sparkResize = void 0;
          sparklineDraw = function() {
            return ele.sparkline(data, options);
          };
          $(window).resize(function(e) {
            clearTimeout(sparkResize);
            return sparkResize = setTimeout(sparklineDraw, 200);
          });
          return sparklineDraw();
        }
      };
    }
  ]);

}).call(this);
