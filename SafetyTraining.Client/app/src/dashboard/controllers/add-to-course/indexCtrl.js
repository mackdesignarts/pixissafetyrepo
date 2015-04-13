/**
 * Created by Tony Mack on 3/2/14.
 */

'use strict';

app.controller('add-to-courseIndexCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {
        
    $scope.add = function(cert){
        if($scope.addToCourse.$invalid) return false;
        $.each(cert.employees,function(index, employee){
            (new api('CoursesTaken')).create({EmployeeID: $scope.employee.EmployeeID, CourseID: cert.CourseID, CertificationDate: cert.CertificationDate});
        });
        $scope.$close(cert);
    };
        
    $scope.cancel = function(){
        $scope.$dismiss('cancel');
    };
        
    init();

    function init() {

    }

}]);
