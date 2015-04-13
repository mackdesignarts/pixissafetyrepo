/**
 *
 */

'use strict';

app.controller('sessionNewCtrl', ['$scope', '$stateParams', 'api', 'odata', '$rootScope', function ($scope, $stateParams, api, odata, $rootScope) {

    $scope.ClassService = new api('Class');
    $scope.ClassSession = new api('ClassSession');


    $scope.class = {};


    $scope.addSessions = function (newSession, form) {
        if (form.$invalid) return false;
        var classID = $scope.class.ClassID;

        $scope.ClassSession.create({ ClassID: classID, CourseID: newSession.Item.id }).success(function (data) {
                $scope.$close(data);
            });
        

    };


    $scope.cancel = function () {
        $scope.$dismiss('cancel');
    };


    init();

    function init() {
        updateGrid()
    }

    function updateGrid() {
        $scope.ClassService.getById($stateParams.id, { expand: ['ClassSessions'] }).success(function (data) {
            $scope.class = data;
        });
    }
      
}]);
