(function() {
  'use strict';
  angular.module('app', ['config', 'env.controllers','app.coop','app.flock','ngRoute', 'ngAnimate', 'ui.bootstrap', 'easypiechart', 'ui.tree', 'ngMap', 'ngTagsInput', 'angular-loading-bar', 'app.controllers', 'app.directives', 'app.localization', 'app.nav', 'app.ui.ctrls', 'app.ui.directives', 'app.ui.services', 'app.form.validation', 'app.ui.form.ctrls', 'app.ui.form.directives', 'app.tables', 'app.task', 'app.chart.ctrls', 'app.chart.directives', 'app.page.ctrls']).config([
    '$routeProvider', function($routeProvider) {
      var routes, setRoutes;
      routes = ['dashboard', 'flock/birds', 'production/crosstab', 'production/charts', 'environment/weather','environment/astro','coop/cameras','coop/monitor', 'ui/typography', 'ui/buttons', 'ui/icons', 'ui/grids', 'ui/widgets', 'ui/components', 'ui/boxes', 'ui/timeline', 'ui/nested-lists', 'ui/pricing-tables', 'ui/maps', 'tables/static', 'tables/dynamic', 'tables/responsive', 'forms/elements', 'forms/layouts', 'forms/validation', 'forms/wizard', 'charts/charts', 'charts/flot', 'charts/chartjs', 'pages/404', 'pages/500', 'pages/blank', 'pages/forgot-password', 'pages/invoice', 'pages/lock-screen', 'pages/profile', 'pages/signin', 'pages/signup', 'mail/compose', 'mail/inbox', 'mail/single', 'tasks/tasks'];
      setRoutes = function(route) {
        var config, url;
        url = '/' + route;
        config = {
          templateUrl: 'views/' + route + '.html'
        };
        $routeProvider.when(url, config);
        return $routeProvider;
      };
      routes.forEach(function(route) {
        return setRoutes(route);
      });
      return $routeProvider.when('/', {
        redirectTo: '/dashboard'
      }).when('/404', {
        templateUrl: 'views/pages/404.html'
      }).otherwise({
        redirectTo: '/404'
      });
    }
  ])
     
  .factory('flockService', ['$http','apiHost', function($http, apiHost){
       var FLOCK_URL_PATTERN = '//' + apiHost + '/api/flocks/';
        var dataFactory = {};
        dataFactory.getFlock = function(id){
          return $http.get(FLOCK_URL_PATTERN + id + '/');
        }

      return dataFactory;
      }
  ])
  .factory('birdService', ['$http','apiHost', function($http, apiHost){
       var BIRD_URL_PATTERN = '//' + apiHost + '/api/birds/';
        var dataFactory = {};
        dataFactory.getBirds = function(id) {
            if (id.size > 0) {
                BIRD_URL_PATTERN =+  id + '/';
            }
            return $http.get(BIRD_URL_PATTERN);
        }

      return dataFactory;
      }
  ])
  .factory('chartService',['$http','apiHost',function($http,apiHost){
        var chartUrls = {};
        chartUrls['sites'] = '/stats/eggsbysite';
        chartUrls['grams'] = '/stats/gramsbybird';
        chartUrls['eggs'] = '/stats/eggsbybird';
        chartUrls['prod'] = '/stats/overview';
        chartUrls['weather'] = '/weather/daily';
        chartUrls['astro'] = '/weather/sun';


        var chartFactory = {};
        chartFactory.getData = function(name){
            var url = '//' + apiHost + chartUrls[name];
            return $http.get(url);//.success(function (data){
              //return data;
            //});
        }
        chartFactory.getPalette = function(){
             return ['#5B90BF', '#A2BF8A','#ECCC87', '#AB434C', '#B58DAE','#616775','#c16069','#949fb2' ];
        }
        return chartFactory;
      }
  ])
  .factory('tableService',['$http','apiHost',function($http,apiHost) {
          var url = '//' + apiHost + '/stats/crosstab';
          var dataFactory = {};
          dataFactory.getData = function(){
              return $http.get(url);
          }
          return dataFactory;
    }
  ])
    .factory('monitorService',['$http','apiHost',function($http,apiHost) {
          var url = '//' + apiHost ;
          var lastUrl =  url += '/coop/alldata';
          var dataFactory = {};
          dataFactory.getLatest = function(){
              return $http.get(lastUrl);
          }
          return dataFactory;
    }
  ])
}).call(this);
