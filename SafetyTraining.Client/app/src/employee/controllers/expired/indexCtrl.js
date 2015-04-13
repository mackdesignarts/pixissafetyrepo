/**
 * Created by Tony Mack on 3/1/14.
 */

'use strict';

app.controller('expiredIndexCtrl', ['$scope', '$stateParams', 'api', '$rootScope', 'odata', function ($scope, $stateParams, api, $rootScope, odata) {

    $scope.EmployeeService = new api('Employee');
    $scope.CoursesServices = new api('Course');
    $scope.CoursesTakenSearch = new api('CoursesTakenSearch');

    $scope.expiredCerts = $scope.CoursesTakenSearch.grid;

    $scope.expOptions = [{ name: '', val: '' }, { name: 'Yes', val: 'YES' }, { name: 'No', val: 'NO' }];

    $scope.odata = function () {
        return odata.queryString({ filter: $scope.grid.filter, orderBy: $scope.grid.orderBy, reverse: $scope.grid.reverse });
    };

    $scope.$on('CompanyChange', updateGrid);

    $scope.grid = {
        search: '',
        page: 1,
        filter: {},
        orderBy: 'EmployeeLastName',
        ipp: 30,
        reverse: false,
        FirstName: '',
        LastName: '',
        CourseDesc: '',
        Location: '',
        TLEmployee: '',
        EmployeeStatusID: '',
        Expired: ''
    };

    $scope.$watchCollection('grid', function (newVal, oldVal) {
        updateGrid()
    });

    init();

    function init() {
        updateGrid()
    }

    function updateGrid() {
        var statusID = $scope.grid.EmployeeStatusID.id == undefined ? '' : $scope.grid.EmployeeStatusID.id;
        var qs = "&Sort=" + $scope.grid.orderBy + "&Expired="+$scope.grid.Expired+"&DBID=" + ($rootScope.CompanyId && $rootScope.CompanyId.id || $rootScope.CompanyId || '') + "&FirstName=" + $scope.grid.FirstName + "&LastName=" + $scope.grid.LastName + "&CourseDesc=" + $scope.grid.CourseDesc + "&TLEmployee=" + $scope.grid.TLEmployee + "&Location=" + $scope.grid.Location + "&EmployeeStatusID=" + statusID;
        $scope.CoursesTakenSearch.get($scope.grid.page, $scope.grid.ipp, {}, $scope.grid.orderBy, $scope.grid.reverse, null, qs);
    }

}]);