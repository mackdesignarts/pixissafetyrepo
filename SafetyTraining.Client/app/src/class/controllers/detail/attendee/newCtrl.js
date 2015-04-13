/**
 *
 */

'use strict';

app.controller('attendeeNewCtrl', ['$scope', '$stateParams', 'api', 'odata', '$rootScope', function ($scope, $stateParams, api, odata, $rootScope) {

    $scope.Class = new api('Class');
    $scope.ClassAttendee = new api('ClassAttendee');
        
    $scope.class = {};
    $scope.AttendeesCount = 0;

    $scope.addAttendees = function (attendees, form) {
        if (form.$invalid) return false;
        var classID = $scope.class.ClassID;
        $scope.AttendeesCount = attendees.length;
        for (var i = 0; i < attendees.length; i++) {
            $scope.ClassAttendee.create({ ClassID: classID, EmployeeID: attendees[i].id }).success(function (data) {
                $scope.close();
            });
        }
  
    };
    $scope.close = function () {
        $scope.AttendeesCount--;

        if ($scope.AttendeesCount <= 0) {
            $scope.$close();
        }
    };
    $scope.cancel = function () {
        $scope.$dismiss('cancel');
    };

    init();

    function init() {
        $scope.Class.getById($stateParams.id, { expand: ['ClassAttendees'] }).success(function (data) {
            $scope.class = data;
        });
    }
      
}]);
