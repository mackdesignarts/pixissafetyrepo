/**
 * Created by Tony Mack on 3/2/14.
 */

'use strict';

app.controller('scheduleIndexCtrl', ['$scope', '$stateParams', 'api', '$location', function ($scope, $stateParams, api, $location) {
    $scope.ClassService = new api('Class');

    $scope.Sessions = [];

    $scope.add = function (Class, form) {
        $scope.$broadcast('show-errors-check-validity');

        if (form.$invalid) return false;
        Class.ScheduledEndTime = new Date("1/1/2000 " + Class.ScheduledEndTime + ":00");
        Class.ScheduledStartTime = new Date("1/1/2000 " + Class.ScheduledStartTime + ":00");
        Class.ScheduledEndDate = Class.ScheduledEndDate || Class.ScheduledStartDate;

        Class.ScheduledStartDate = updateDate('scheduledStartDate');
        Class.ScheduledEndDate = updateDate('scheduledEndDate');

        Class.Zip = Class.Zip.trim();

        if (Class.InstructorID) {
            Class.InstructorID = Class.InstructorID.id;
        }
        Class.LocationCodeID = Class.LocationCodeID.id;
        Class.RegionID = $scope.user.regionId;

        var attendees = [];
        var courses = [];

        if (Class.ClassAttendees) {
            for (var i = 0; i < Class.ClassAttendees.length; i++) {
                attendees.push({ EmployeeID: Class.ClassAttendees[i].id });
            }
        }

        for (var i = 0; i < $scope.Sessions.length; i++) {
            courses.push({ CourseID: $scope.Sessions[i].CourseID.id });
        }

        Class.ClassAttendees = attendees;
        Class.ClassSessions = courses;

        (new api('Class')).create(Class).success(function (data) {
            //                $scope.$close(data);
            $location.path('/class');
        });
    };
    $scope.locationChanged = function (Class) {

        var id = Class.LocationCodeID.id;
        if (id !== "") {
            $scope.LocationCodeService.getById(id).success(function (data) {
                Class.StreetAddress1 = data.LocationAddress;
                Class.StreetAddress2 = "";
                Class.City = data.LocationCity;
                Class.State = data.LocationState;
                Class.Zip = data.LocationZip;
            });
        }
    };

    $scope.addSession = function () {
        $scope.Sessions.push({ CourseID: 0 });
    };
    $scope.removeSession = function (idx) {
        var sessionToRemove = $scope.Sessions[idx];
        $scope.Sessions.splice(idx, 1);
    };
    //$scope.submit = function () {
    //    //alert($scope.class.InstructorID);
    //    if ($scope.class.InstructorID == undefined) { alert("Please select an instructor."); return; }
    //    if ($scope.class.ClassName == null) { alert("Class Name is required."); return; }
    //    if ($scope.class.ScheduledStartDate == null) { alert("Scheduled Start Date is required."); return; }
    //    if ($scope.class.LocationCodeID == undefined) { alert("Please select a Location."); return; }
    //    document.forms['addClass'].submit();

    //};
    $scope.cancel = function () {
        $location.path('/class');
    };

    init();
    function init() {
        $scope.Sessions.push({ CourseID: 0 });
    }


    function updateDate(fId) {
        var iD = $('#' + fId).val();
        if (iD != '') {
            var month = parseInt(iD.split('/')[0]);
            var day = parseInt(iD.split('/')[1]);
            var year = parseInt(iD.split('/')[2]);
            var mDate = new Date(year, month - 1, day);
            return mDate;
        }
    }

}]);
