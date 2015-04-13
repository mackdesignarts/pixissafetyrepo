/**
 * Created by Tony Mack on 3/2/14.
 */

'use strict';

app.controller('medicalsNewCtrl', ['$scope', '$stateParams', 'api', '$q', function ($scope, $stateParams, api, $q) {

    $scope.Employee = new api('Employee');

    $scope.addMedical = function (med, form) {
        if (form.$invalid) return false;
        //modified to accept meds without med test
        if (med.MedicalTestID == null) {
            med.MedicalTestID = ' ';
            med.MedicalTestID.id = ' ';
        }
            
        var mtDate = updateDate('mtDate');
        var promises = [];
        med.MedicalTestID.forEach(function (element, index, array) {
            var promise = (new api('EmployeeMedical')).create({ EmployeeID: $scope.employee.EmployeeID, MedicalTestDate: mtDate, MedicalTestID: element.id, MedicalNote: med.MedicalNote, Deleted: false });
            promises.push(promise);

            //(new api('EmployeeMedical')).create({ EmployeeID: $scope.employee.EmployeeID, MedicalTestDate: med.MedicalTestDate, MedicalTestID: element.id, MedicalNote: med.MedicalNote })
            //     .success(function () {
            //         $scope.$close(med)
            //     });
        });

        $q.all(promises)
            .then(function (results) {
                $scope.$close(med);
            });

    };

    $scope.cancel = function () {
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
