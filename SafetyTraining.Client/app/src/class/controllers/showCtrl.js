/**
 * Created by Tony Mack on 3/2/14.
 */

'use strict';

app.controller('classShowCtrl', ['$scope', '$stateParams', 'api', '$location',function ($scope, $stateParams, api, $location) {
    $scope.ClassService = new api('Class');        

    init();
    function init() {

        $scope.ClassService.getById($stateParams.id, { expand: ['ClassAttendees/Employee', 'ClassAttendees/Employee/TLCompany', 'ClassSessions/Course', 'Instructor', 'Region', 'LocationCode'] }).success(function (data) {
            $scope.class = data;
        });

    }

}]);