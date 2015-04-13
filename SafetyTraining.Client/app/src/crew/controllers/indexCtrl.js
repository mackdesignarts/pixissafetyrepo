/**
 * Created by Tony Mack on 3/1/14.
 */

'use strict';

app.controller('crewIndexCtrl', ['$scope', '$stateParams', 'api', 'odata', '$rootScope','$modal', function ($scope, $stateParams, api, odata, $rootScope, $modal) {


    $scope.CrewService = new api('Crew');
    var crewDetail = $scope.CrewDetailService = new api('CrewDetail');


    //$scope.EmployeeService = new api('Employee');
    //$scope.EmployeeCourseService = new api('EmployeeCourse');

    $scope.crews = $scope.CrewService.grid;

    $scope.addMember = function (crew) {
        $modal.open({
            templateUrl: 'templates/crew/add-to-crew/index.html',
            controller: function ($scope) {
                $scope.crew = crew;
                $scope.save = function (add, form) {
                    if (form.$invalid) return false;
                    var success = true;
                    var failedOn = [];
                    $.each(add.Employees, function (index, employee) {
                        crewDetail.create({ EmployeeID: employee.id, CrewID: crew.CrewID }).error(function () {
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
            }
        }).result.then(function (result) {

        });
    };


    $scope.foremanMember = function (crew, employee) {
        crew.CrewName = employee.EmployeeFirstName + ' ' + employee.EmployeeLastName;
        $scope.CrewService.patch(crew.CrewID, { CrewName: crew.CrewName });
    };

    $scope.grid = {
        search: '',
        page: 1,
        filter: {},
        orderBy: 'CrewName',
        ipp: 30,
        reverse: false,
        expand: ['Region', 'LocationCode']
    };

    $scope.$watch('grid', function (newVal, oldVal) {
        updateGrid();
    }, true);

    $scope.odata = function () {
        return odata.queryString({ filter: $scope.grid.filter, orderBy: $scope.grid.orderBy, reverse: $scope.grid.reverse });
    };

    $scope.$on('CompanyChange', updateGrid);

    init();

    function init() {
        updateGrid();
    }

    $scope.all = [];

    function updateGrid() {
        var andQ = [];
        var qwords = $scope.grid.search.replace(',', '').split(' ');
        $.each(qwords, function (i, word) {
            andQ.push({ or: [{ CrewName: { contains: word } }] });
        });

        //$scope.grid.filter.and = ($rootScope.CompanyId && $rootScope.CompanyId.id || $rootScope.CompanyId)? [
        //{ 'CrewDetails/any(details:': { ' ': "details/Employee/DBID eq '" + ($rootScope.CompanyId && $rootScope.CompanyId.id || $rootScope.CompanyId) + "')" } }].concat(andQ) : andQ;


        $scope.CrewService.get($scope.grid.page, $scope.grid.ipp, $scope.grid.filter, $scope.grid.orderBy, $scope.grid.reverse, $scope.grid.expand);
    }



    //$scope.EmployeeService = new api('Employee');
    //$scope.CrewService = new api('Crew');
    //$scope.EmployeeCourseService = new api('EmployeeCourse');
    //var crewDetail = $scope.CrewDetailService = new api('CrewDetail');
        
    //$scope.EmployeeService = new api('Employee');

    //$scope.crews = $scope.CrewService.grid;

    //$scope.addMember = function (crew) {
    //    $modal.open({
    //        templateUrl: 'templates/crew/add-to-crew/index.html',
    //        controller: function ($scope) {
    //            $scope.crew = crew;
    //            $scope.save = function (add, form) {
    //                if (form.$invalid) return false;
    //                var success = true;
    //                var failedOn = [];
    //                $.each(add.Employees, function (index, employee) {
    //                    crewDetail.create({ EmployeeID: employee.id, CrewID: crew.CrewID }).error(function () {
    //                        success = false;
    //                        failedOn.push(employee);
    //                    });
    //                });
    //                if (!success)
    //                    console.log(failedOn);
    //                $scope.$close(add);
    //            }
    //            $scope.cancel = function () {
    //                $scope.$dismiss('cancel');
    //            };
    //        }
    //    }).result.then(function (result) {

    //    });
    //};

    //$scope.removeMember = function (id) {
    //    $scope.CrewDetailService.remove(id);
    //}

    //$scope.foremanMember = function (crew, employee) {
    //    crew.CrewName = employee.EmployeeFirstName + ' ' + employee.EmployeeLastName;
    //    $scope.CrewService.patch(crew.CrewID, { CrewName: crew.CrewName });
    //};

    //$scope.grid = {
    //    search: '',
    //    page: 1,
    //    filter: {},
    //    orderBy: 'CrewName',
    //    ipp: 30,
    //    reverse: false,
    //    expand: ['CrewDetails','CrewDetails/Employee']
    //};

    //$scope.$watch('grid', function (newVal, oldVal) {
    //    updateGrid();
    //},true);

    //$scope.odata = function () {
    //    return odata.queryString({ filter: $scope.grid.filter, orderBy: $scope.grid.orderBy, reverse: $scope.grid.reverse });
    //};

    //$scope.$on('CompanyChange', updateGrid);

    //init();

    //function init() {
    //    updateGrid();
    //}

    //$scope.all = [];

    //function updateGrid() {
    //    var andQ = [];
    //    var qwords = $scope.grid.search.replace(',', '').split(' ');
    //    $.each(qwords, function (i, word) {
    //        andQ.push({ or: [{ CrewName: { contains: word } }] });
    //    });
    //    $scope.grid.filter.and = ($rootScope.CompanyId && $rootScope.CompanyId.id || $rootScope.CompanyId)? [
    //    { 'CrewDetails/any(details:': { ' ': "details/Employee/DBID eq '" + ($rootScope.CompanyId && $rootScope.CompanyId.id || $rootScope.CompanyId) + "')" } }].concat(andQ) : andQ;
    //    $scope.CrewService.get($scope.grid.page, $scope.grid.ipp, $scope.grid.filter, $scope.grid.orderBy, $scope.grid.reverse, $scope.grid.expand);
    //}

}]);