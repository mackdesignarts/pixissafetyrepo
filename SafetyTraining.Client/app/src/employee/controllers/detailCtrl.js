/**
 * Created by Tony Mack on 3/1/14.
 */

'use strict';

app.controller('employeeDetailCtrl', ['$scope', '$stateParams', 'api', '$filter', '$q', function ($scope, $stateParams, api, $filter, $q) {

    $scope.Employee = new api('Employee');

    $scope.MedicalTests = new api('MedicalTest');
    $scope.EmployeeMedicalRequired = new api('EmployeeMedicalRequired');

    //$scope.MedicalT

    $scope.getCourse = function (course) {
        return (new api('Course')).getById(course.CourseID).success(function (data) {
            $.extend(course, data);
        });
    };

    $scope.getMedical = function (employeeMedical) {
        return (new api('EmployeeMedical')).getById(employeeMedical.EmployeeMedicalID).success(function (data) {
            $.extend(employeeMedical, data);
        });
    };
       
    $scope.saveEdit = function (form, edit) {
        var transactions = [];
        edit.DBID = edit.DBID && edit.DBID.id;
        edit.Occupation = edit.Occupation && edit.Occupation.id;
        edit.EmployeeStatusID = edit.EmployeeStatusID && edit.EmployeeStatusID.id;
        $.each(edit.EmployeeMedicalRequireds, function (index, medical) {
            var match = $filter('filter')(edit.EmployeeMedicalRequiredsSelect, { id: medical.MedicalTestID }).length;
            if (!match) {
                transactions.push($scope.EmployeeMedicalRequired.remove(medical.EmployeeMedicalRequiredID));
            }

        });
        $.each(edit.EmployeeMedicalRequiredsSelect, function (index, medical) {
            var match = $filter('filter')(edit.EmployeeMedicalRequireds, { MedicalTestID: medical.id }).length;
            if (!match) {
                transactions.push($scope.EmployeeMedicalRequired.create({ EmployeeID: edit.EmployeeID, MedicalTestID: medical.id }));
            }

        });
        if (form.$invald) return false;
        //edit.DBID = edit.DBID;

        delete edit['TLCompany'];
        delete edit.CoursesTakens;
        delete edit.EmployeeStatu;
        delete edit.EmployeeMedicalRequiredsSelect;
        delete edit.EmployeeMedicalRequireds;
        delete edit.EmployeeMedicals;
        delete edit.EmployeeNotes1
        transactions.push($scope.Employee.update($stateParams.id, edit));

        $q.all(transactions).then(function () {
            $scope.tab[0] = true;
            init();
        });
    }

    $scope.terminate = function (employee) {
        var updated = {};
        employee.DBID = employee.DBID.id || employee.DBID;
        employee.TerminationDate = new Date();
        angular.copy(employee, updated);
        delete employee['TLCompany'];
        delete employee.CoursesTakens;
         
        $scope.Employee.update($stateParams.id, employee).success(function () {
            $scope.employee = updated;
            $scope.tab[0] = true;
        });
    }

    $scope.reinstate = function (employee) {
        var updated = {};
        employee.DBID = employee.DBID.id || employee.DBID;
        employee.TerminationDate = null;
        angular.copy(employee, updated);
        delete employee['TLCompany'];
        delete employee.CoursesTakens;
        delete employee.EmployeeStatu;
        $scope.Employee.update($stateParams.id, employee).success(function () {
            $scope.employee = updated;
            $scope.tab[0] = true;
        });
    }

    $scope.expires = function (course, showDate) {
        var start = new Date(course.CertificationDate);
        var now = new Date();
        if(course.RenewalPeriodMonths === 0)
            return "Never";

        start.setMonth(start.getMonth() + course.RenewalPeriodMonths);

        if (start < now) {
            course.Expired = true;
            if(!showDate)
                return "Expired";
        }

        course.Expires = Math.abs((start.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
        if (course.Expires <= 31 && !showDate)
            return "Expires in " + course.Expires + "days";

        return start;
    };

    init();

    function init() {
        $scope.Employee.getById($stateParams.id, { expand: ['CoursesTakens', 'EmployeeMedicals', 'TLCompany', 'EmployeeStatu', 'EmployeeNotes1', 'EmployeeMedicalRequireds/MedicalTest'] }).success(function (data) {
            $scope.employee = data;
            $scope.employee.EmployeeMedicalRequiredsSelect = [];
            $.each(data.EmployeeMedicalRequireds, function (index, item) {
                $scope.employee.EmployeeMedicalRequiredsSelect.push({ id: item.MedicalTestID, text: item.MedicalTest.MedicalTest1 });
            });
        });
            
    }
     
}]);
