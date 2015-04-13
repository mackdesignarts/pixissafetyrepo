/**
 * Created by Tony Mack on 3/2/14.
 */

'use strict';

app.controller('crewNewCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    var CrewService = new api('Crew');
    var CrewDetailService = new api('CrewDetail');
    var Employee = new api('Employee');

    $scope.createCrew = function (employee, form) {
        if (form.$invalid) return false;
        var emplId = employee.Employee.id;
        var locaionCodeId = employee.LocationCodeID ? employee.LocationCodeID.id : undefined;

        CrewService.create({ CrewName: employee.Employee.text, CrewStatusID: 1, LocationCodeID: locaionCodeId, RegionID: $scope.user.regionId }).success(function (crew) {
            CrewDetailService.create({ CrewID: crew.CrewID, EmployeeID: emplId }).success($scope.$close)
        });

    };

    $scope.cancel = function () {
        $scope.$dismiss('cancel');
    };

    init();

    function init() {

    }

}]);
