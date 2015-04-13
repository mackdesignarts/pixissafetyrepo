/**
 * Created by Tony Mack on 3/1/14.
 */

'use strict';

app.controller('expiringmedsIndexCtrl', ['$scope', '$stateParams', 'api', '$rootScope', 'odata', function ($scope, $stateParams, api, $rootScope, odata) {

    $scope.EmployeeService = new api('Employee');
    $scope.CoursesServices = new api('Course');
    $scope.MedicalSearch = new api('MedicalSearch');
    $scope.CoursesTakenSearch = new api('CoursesTakenSearch');

    $scope.meds = $scope.MedicalSearch.grid;

    $scope.odata = function () {
        return odata.queryString({ filter: $scope.grid.filter, orderBy: $scope.grid.orderBy, reverse: $scope.grid.reverse });
    };

    $scope.$on('CompanyChange', updateGrid);

    $scope.grid = {
        expiresIn : 90,
        search: '',
        page: 1,
        filter: {},
        orderBy: 'EmployeeLastName',
        ipp: 30,
        reverse: false,
        FirstName: '',
        LastName: '',
        MedicalTest: ''
    };

    $scope.$watchCollection('grid', function (newVal, oldVal) {
        updateGrid()
    });

    init();

    function init() {
        updateGrid()
    }

    function updateGrid() {
        var qs = "&Days=" + $scope.grid.expiresIn + "&Sort=" + $scope.grid.orderBy + "&Expired=No&DBID=" + ($rootScope.CompanyId && $rootScope.CompanyId.id || $rootScope.CompanyId || '') + "&FirstName=" + $scope.grid.FirstName + "&LastName=" + $scope.grid.LastName + "&MedicalTest=" + $scope.grid.MedicalTest
        $scope.MedicalSearch.get($scope.grid.page, $scope.grid.ipp, {}, $scope.grid.orderBy, $scope.grid.reverse, null, qs);
    }

}]);
