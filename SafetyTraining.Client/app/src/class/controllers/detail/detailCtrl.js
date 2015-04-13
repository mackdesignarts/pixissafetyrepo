/**
 * Created by Tony Mack on 3/1/14.
 */

'use strict';

app.controller('detailDetailCtrl', ['$scope', '$stateParams', 'api', '$modal', '$q', function ($scope, $stateParams, api, $modal, $q) {
    var CoursesTaken = new api('CoursesTaken');
    $scope.Class = new api('Class');
    $scope.ClassAttendee = new api('ClassAttendee');
    $scope.ClassSession = new api('ClassSession');
    $scope.SigninAction = "SigninSheet?id=" + $stateParams.id;

    $scope.removeSession = function (itemToRemove) {
        $scope.ClassSession.remove(itemToRemove.ClassSessionID).success(init);
    };
  
    $scope.removeAttendee = function (itemToRemove) {
        $scope.ClassAttendee.remove(itemToRemove.ClassAttendeeID).success(init);
    };

    $scope.saveEdit = function (form, edit) {
            
        var updated = {};
        if (form.$invalid) return false;

        angular.copy(edit, updated);
        updated.InstructorID = updated.InstructorID && updated.InstructorID.id;
        updated.RegionID = updated.RegionID.id;
        updated.LocationCodeID = updated.LocationCodeID.id;
        delete updated.Instructor;
        delete updated['odata.metadata'];
        delete updated.Region;
        delete updated.LocationCode;
        delete updated.ClassAttendees;
        delete updated.ClassSessions;
        updated.ScheduledStartDate = updateDate('scheduleStDate');
        updated.ScheduledEndDate = updateDate('scheduleEndDate');

        $scope.Class.update($stateParams.id, updated).success(init);
    }

    init();

    function init() {
        $scope.Class.getById($stateParams.id, { expand: ['ClassAttendees/Employee', 'ClassAttendees/Employee/TLCompany', 'ClassSessions/Course', 'Instructor', 'Region', 'Region/Instructor', 'LocationCode', 'ClassSessions', 'ClassAttendees'] }).success(function (data) {
            $scope.class = data;
            if (data.Completed) {
                $scope.attended = [];
                angular.forEach(data.ClassAttendees, function (attendee) {
                    angular.forEach($scope.class.ClassSessions, function (course) {
                        CoursesTaken.get({ ipp: 1, filter: { and: [{ ClassID: data.ClassID }, { EmployeeID: attendee.EmployeeID }, { CourseID: course.CourseID }] }, expand: ['Employee', 'Employee/TLCompany', 'Course'] }).success(function (cert) {
                            if (cert['odata.count'] > 0) {
                                $scope.attended.push(cert.value[0]);
                            }
                        });
                    });
                })
            }
            $scope.tab[0] = true;
        });
    }

    $scope.openCompletedModal = function () {
        $modal.open({
            templateUrl: 'templates/class/detail/_complete.html',
            scope: $scope
        }).result.then(function (results) {
            var transactions = []
            $scope.Class.patch($scope.class.ClassID, { Completed: true });//, Zip: $scope.class.Zip.trim() 
            //$scope.class.Completed = true; //force set to true in order to hide 'Mark as complete' button
            angular.forEach(results.attendees, function (value, empId) {
                if (value) {
                    angular.forEach($scope.class.ClassSessions, function (course) {
                        transactions.push(CoursesTaken.create({ EmployeeID: empId, CourseID: course.CourseID, CertificationDate: $scope.class.ScheduledEndDate, ClassID: $scope.class.ClassID }));
                    });
                }
            });
            $q.all(transactions)['finally'](init);
        })
    }
     

    function updateDate(fId, obj) {
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
