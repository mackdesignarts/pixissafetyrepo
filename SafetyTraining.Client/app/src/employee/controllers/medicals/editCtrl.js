/**
 * Created by Tony Mack on 3/2/14.
 */

'use strict';

app.controller('medicalsEditCtrl', ['$scope', '$stateParams', 'api', '$q', function ($scope, $stateParams, api, $q) {

    $scope.Employee = new api('Employee');
    $scope.EmployeeMedical = new api('EmployeeMedical');

    $scope.editMedical = function (med, form) {
        if (form.$invalid) return false;
        //modified to accept certs without instructors
        if (med.MedicalTestID == null) {
            med.MedicalTestID = ' ';
            med.MedicalTestID.id = ' ';
        }

        var medDate = updateDate('medicalDate');

        var promises = [];
        var promise = $scope.EmployeeMedical.patch($stateParams.med, { EmployeeID: $scope.employee.EmployeeID, MedicalTestID: med.MedicalTestID.id, MedicalTestDate: medDate, MedicalNote: med.MedicalNote })
        promises.push(promise);

        $q.all(promises)
            .then(function (results) {
                $scope.$close(med);
            });
    };


    $scope.cancel = function () {
        $scope.$dismiss('cancel');
    };


    $scope.deleteMed = function (med) {
        $scope.EmployeeMedical.patch($stateParams.med, { Deleted: true })
            .success(function () {
                med.Deleted = true; //force set to true to hide immediately
                $scope.$close(med);
            });
    }

    init();

    function init() {
        $scope.EmployeeMedical.getById($stateParams.med).success(function (data) {
            $scope.med = data;
        });
        $scope.Employee.getById($stateParams.id).success(function (data) {
            $scope.employee = data;
        });
    }
       

    $scope.$watch('med.MedicalTestDate', function (newVal, oldVal) {
        console.log(newVal);
        // medDate = newVal | newVal.getUTCDate();
        //  var mDate = newVal | newVal.getDate();
                
    })

    function updateDate(fId) {
        var iD = $('#' + fId).val();
        if (iD != '') {
            var month = parseInt(iD.split('/')[0]);
            var day = parseInt(iD.split('/')[1]);
            var year = parseInt(iD.split('/')[2]);
            var mDate = new Date(year, month-1, day);
            return mDate;
        }
    }

}]);
