/**
 * Created by Tony Mack on 3/1/14.
 */

'use strict';

app.controller('crewDetailCtrl', ['$scope', '$stateParams', 'api', '$filter', '$q', function ($scope, $stateParams, api, $filter, $q) {

    $scope.Crew = new api('Crew');
    $scope.CrewDetailService = new api('CrewDetail');

    $scope.saveEdit = function (form, edit) {

        delete edit['CrewDetails'];
        delete edit['Region'];
        delete edit['LocationCode'];
        delete edit['odata.metadata'];

        $scope.Crew.patch(edit.CrewID, { CrewName: edit.CrewName, LocationCodeID: edit.LocationCodeID.id }).success(function (data) {
            init();
            $scope.tab[0] = true;
                
        });
    }

    $scope.removeMember = function (id) {
        $scope.CrewDetailService.remove(id);
        init();
        $scope.tab[0] = true;
    }


    init();

    function init() {
        $scope.Crew.getById($stateParams.id, { expand: ['CrewDetails', 'CrewDetails/Employee', 'Region', 'LocationCode'] }).success(function (data) {
            $scope.crew = data;
            //$scope.employee.EmployeeMedicalRequiredsSelect = [];
            //$.each(data.EmployeeMedicalRequireds, function (index, item) {
            //    $scope.employee.EmployeeMedicalRequiredsSelect.push({ id: item.MedicalTestID, text: item.MedicalTest.MedicalTest1 });
            //});
        });

    }

}]);
