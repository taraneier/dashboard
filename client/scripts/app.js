(function() {
  'use strict';
  angular.module('app', ['config', 'ngRoute', 'ngAnimate', 'ui.bootstrap', 'easypiechart', 'ui.tree', 'ngMap', 'ngTagsInput', 'angular-loading-bar', 'app.controllers', 'app.directives', 'app.localization', 'app.nav', 'app.ui.ctrls', 'app.ui.directives', 'app.ui.services', 'app.form.validation', 'app.ui.form.ctrls', 'app.ui.form.directives', 'app.tables', 'app.task', 'app.chart.ctrls', 'app.chart.directives', 'app.page.ctrls']).config([
    '$routeProvider', function($routeProvider) {
      var routes, setRoutes;
      routes = ['dashboard', 'ui/typography', 'ui/buttons', 'ui/icons', 'ui/grids', 'ui/widgets', 'ui/components', 'ui/boxes', 'ui/timeline', 'ui/nested-lists', 'ui/pricing-tables', 'ui/maps', 'tables/static', 'tables/dynamic', 'tables/responsive', 'forms/elements', 'forms/layouts', 'forms/validation', 'forms/wizard', 'charts/charts', 'charts/flot', 'charts/chartjs', 'pages/404', 'pages/500', 'pages/blank', 'pages/forgot-password', 'pages/invoice', 'pages/lock-screen', 'pages/profile', 'pages/signin', 'pages/signup', 'mail/compose', 'mail/inbox', 'mail/single', 'tasks/tasks'];
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
  .factory('chartService',['$http','apiHost',function($http,apiHost){
        var chartUrls = {};
        chartUrls['sites'] = '/stats/eggsbysite';
        chartUrls['grams'] = '/stats/gramsbybird';
        chartUrls['eggs'] = '/stats/eggsbybird';

        var chartFactory = {};
        chartFactory.getData = function(name){
            var url = '//' + apiHost + chartUrls[name];
            return $http.get(url);//.success(function (data){
              //return data;
            //});
        }
        return chartFactory;
      }
  ])

}).call(this);
