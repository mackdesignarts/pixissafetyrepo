
'use strict';

app.controller('membersNewCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    var CrewDetailService = new api('CrewDetail');
        

    $scope.addMember = function (add, form) {
        if (form.$invalid) return false;
        var success = true;
        var failedOn = [];
        $.each(add.Employees, function (index, employee) {
           
            CrewDetailService.create({ EmployeeID: employee.id, CrewID: $stateParams.id }).error(function () {
                success = false;
                failedOn.push(employee);
            });
           
        });
        if (!success)
            console.log(failedOn);
        $scope.$close(add);
    }



    $scope.cancel = function () {
        $scope.$dismiss('cancel');
    };

    init();

    function init() {

    }

}]);