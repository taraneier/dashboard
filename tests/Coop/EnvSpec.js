describe('AstroChartCtrl', function(){
    beforeEach(module('app'));
    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));
    describe('AstroChartCtrl', function(){
        var $scope, controller;

        beforeEach(function(){
            $scope = {};
            controller = $controller('AstroChartCtrl', { $scope: $scope });
        });
        it('should have chart defined', inject(function($controller) {
            //expect($scope.cameras.length).not.toEqual(0);
            expect($scope.astroOptions.chart.type).toEqual('linePlusBarChart');
        }));

        //it('should have access to api data', inject(function($controller) {
        //    expect($controller.getData).toBeTruthy();
        //}));


    });
});
