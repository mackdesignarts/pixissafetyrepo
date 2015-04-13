/**
 * Created by Tony Mack on 3/2/14.
 */

'use strict';

app.controller('certificationNewCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    $scope.Employee = new api('Employee');
        
    $scope.addCert = function (cert, form) {
        if (form.$invalid) return false;
        //modified to accept certs without instructors
        if (cert.InstructorID == null) {
            cert.InstructorID = ' ';
            cert.InstructorID.id = ' ';
        }
        //
        (new api('CoursesTaken')).create({ EmployeeID: $scope.employee.EmployeeID, CourseID: cert.CourseID.id, CertificationDate: updateDate('certificationDate'), InstructorID: cert.InstructorID.id })
                .success(function () {
                    $scope.$close(cert)
                });
    };
        
    $scope.cancel = function(){
        $scope.$dismiss('cancel');
    };
        
    init();

    function init() {
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
