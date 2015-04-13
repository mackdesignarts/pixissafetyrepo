/**
 * Created by Tony Mack on 3/2/14.
 */

'use strict';

app.controller('employeeNewCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    var EmployeeService = new api('Employee');
    
    $scope.add = function (employee) {
        employee.DBID = employee.DBID.id;
        employee.EmployeeStatusID = 1;
        EmployeeService.create(employee).success($scope.$close);
    };
        
    $scope.cancel = function(){
        $scope.$dismiss('cancel');
    };
        
    init();

    function init() {

    }

}]);
