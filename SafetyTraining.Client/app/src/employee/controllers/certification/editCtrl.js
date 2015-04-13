/**
 * Created by Tony Mack on 3/2/14.
 */

'use strict';

app.controller('certificationEditCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    $scope.Employee = new api('Employee');
    $scope.CoursesTaken = new api('CoursesTaken');
        
    $scope.editCert = function (cert, form) {
        if (form.$invalid) return false;

        var certDate = updateDate('certificationDate');

        $scope.CoursesTaken.patch($stateParams.cert, { EmployeeID: $scope.employee.EmployeeID, CourseID: cert.CourseID.id, CertificationDate: certDate, InstructorID: cert.InstructorID && cert.InstructorID.id || null })
            .success(function () {
                $scope.$close(cert)
            });
    };

    $scope.deleteCert = function (cert) {
        $scope.CoursesTaken.patch($stateParams.cert, {Deleted: true})
            .success(function () {
                cert.Deleted = true; //force set to true to hide immediately
                $scope.$close(cert);
            });
    }
        
    $scope.cancel = function(){
        $scope.$dismiss('cancel');
    };
        
    init();

    function init() {
        $scope.CoursesTaken.getById($stateParams.cert).success(function (data) {
            $scope.cert = data;
        });
        $scope.Employee.getById($stateParams.id).success(function (data) {
            $scope.employee = data;
        });
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
