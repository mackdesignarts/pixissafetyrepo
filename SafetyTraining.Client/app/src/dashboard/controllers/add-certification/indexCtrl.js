/**
 * Created by Tony Mack on 3/2/14.
 */

'use strict';

app.controller('dashboardAdd-certificationIndexCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    var coursesTaken = new api('CoursesTaken');
        
    $scope.addCert = function (cert, form) {
        if (form.$invalid) return false;
        var success = true;
        var failedOn = [];
        //modified to allow certs with no instructor
        if (cert.InstructorID == null) {
            cert.InstructorID = ' ';
            cert.InstructorID.id = ' ';
        }
        //
            cert.InstructorID = cert.InstructorID.id;
        $.each(cert.Employees, function (index, employee) {
            coursesTaken.create({ EmployeeID: employee.id, CourseID: cert.CourseID.id, CertificationDate: cert.CertificationDate, InstructorID: cert.InstructorID }).error(function () {
                success = false;
                failedOn.push(employee);
            });
        });
        if (!success)
            console.log(failedOn);
        $scope.$close(cert);
    };
        
    $scope.cancel = function(){
        $scope.$dismiss('cancel');
    };
        
    init();

    function init() {

    }

}]);
