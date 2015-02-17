// Karma configuration
// Generated on Fri Feb 13 2015 09:03:47 GMT-0800 (PST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        {pattern: 'client/bower_components/angular/*.js', watched:false, included: true, served: true},
        //'client/bower_components/angular/angular.min.js',
        //'client/bower_components/angular/angular.min.js.map',
        {pattern: 'client/bower_components/angular-mocks/*.js', watched:false, included:true, served: true},

        'client/bower_components/angular-route/angular-route.js',
        'client/bower_components/angular-animate/angular-animate.js',
        'client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'client/bower_components/jquery.easy-pie-chart/dist/angular.easypiechart.js',
        'client/bower_components/angular-ui-tree/dist/angular-ui-tree.js',
        'client/bower_components/ngmap/build/scripts/ng-map.js',
        'client/bower_components/d3/d3.js',
        'client/bower_components/nvd3/nv.d3.js',
        'client/bower_components/angular-nvd3/dist/angular-nvd3.js',
        'client/scripts/app.js',
        'client/scripts/shared/config.js',
        'client/bower_components/ng-tags-input/ng-tags-input.js',
        'client/bower_components/angular-loading-bar/build/loading-bar.js',
        'client/scripts/shared/main.js',
        'client/scripts/shared/directives.js',
        'client/scripts/shared/localize.js',
        'client/scripts/shared/Nav.js',
        'client/scripts/UI/UICtrl.js',
        'client/scripts/UI/UIDirective.js',
        'client/scripts/UI/UIService.js',
        'client/scripts/Form/FormDirective.js',
        'client/scripts/Form/FormCtrl.js',
        'client/scripts/Form/FormValidation.js',
        'client/scripts/Table/TableCtrl.js',
        'client/scripts/Task/Task.js',
        'client/scripts/Chart/ChartCtrl.js',
        'client/scripts/Chart/ChartDirective.js',
        'client/scripts/Page/PageCtrl.js',



        'client/scripts/environment/EnvChartCtrl.js',
        'client/scripts/coop/CoopCtrl.js',
        'client/scripts/flock/FlockCtrl.js',
        'tests/**/*Spec.js',


    ],


    // list of files to exclude
    exclude: [
        '**/*.min.js'
        //'**/*.md',
        //'**/*.gzip',
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
