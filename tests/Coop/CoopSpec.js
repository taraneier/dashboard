describe('app', function() {
  // Instantiate a new version of my module before each test

    beforeEach(module('app'));

    describe('CameraCtrl', function(){
          // Before each unit test, instantiate a new instance
          // of the controller
        //beforeEach(inject(function($controller, ctrl) {
          //    scope = $rootScope.$new();
          //    ctrl = $controller('CameraCtrl', {'$scope': scope});
          //    console.log("omg" + ctrl);
        //}));

        it('should have cameras defined', inject(function($controller) {
            var $scope = {};
            $controller('CameraCtrl', {$scope: $scope});
            expect($scope.cameras.length).not.toEqual(0);
        }));

        it('should have a camera host', inject(function($controller) {
            var $scope = {};
            $controller('CameraCtrl', {$scope: $scope});
            var item = $scope.cameras[0];
            expect(item.host).toBeTruthy();
        }));
    });
});
