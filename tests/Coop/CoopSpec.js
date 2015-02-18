describe('CameraCtrl', function(){
    beforeEach(module('app'));
    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));
    describe('$scope.cameras', function(){
        var $scope, controller;

        beforeEach(function(){
            $scope = {};
            controller = $controller('CameraCtrl', { $scope: $scope });
        });
        it('should have cameras defined', inject(function($controller) {
            expect($scope.cameras.length).not.toEqual(0);
        }));

        it('should have a camera host', inject(function($controller) {
            expect($scope.cameras[0].host).toBeTruthy();
        }));


    });
});
