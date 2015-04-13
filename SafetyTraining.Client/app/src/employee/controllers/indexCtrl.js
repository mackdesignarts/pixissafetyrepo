/**
 * Created by Tony Mack on 3/1/14.
 */

'use strict';

app.controller('employeeIndexCtrl', ['$scope', '$stateParams', 'api', '$rootScope', 'odata', '$location', function ($scope, $stateParams, api, $rootScope, odata, $location) {
        
    $scope.EmployeeService = new api('Employee');        
    $scope.employees = $scope.EmployeeService.grid;
        
    $scope.grid = {
        search: '',
        status: 1,
        page: 1,
        filter: { },
        orderBy: ['EmployeeLastName', 'EmployeeFirstName'],
        ipp: 30,
        reverse: false,
        expand: ['LocationCode1']
    };

    $scope.$watchCollection('grid', function (newVal, oldVal) {
            updateGrid();
    });

    $scope.odata = function () {
        return odata.queryString({ filter: $scope.grid.filter, orderBy: $scope.grid.orderBy, reverse: $scope.grid.reverse });
    };

    $scope.$on('CompanyChange', updateGrid);

    function init() {
        if ($location.search().course)
            $scope.grid.expand.push('CoursesTakens');
        updateGrid();
    }
        
    $scope.all = [];

    $scope.getAll = function () {
        $scope.EmployeeService.getAll($scope.grid.filter, $scope.grid.expand).success(function (data) {
            $scope.all = data;
        });
    };

    function updateGrid() {

        var andQ = [];
        
        if ($location.search().course){
            andQ.push({ 'CoursesTakens/any(x:': { ' ': 'x/CourseID eq ' + $location.search().course + ' and x/Expired eq ' + $location.search().expired + ')' } });
        }
              
        var qwords = $scope.grid.search.replace(',', '').split(' ');
        
        $.each(qwords, function (i, word) {
            andQ.push({ 
                or: [
                    { EmployeeFirstName: { 
                        contains: word 
                        } 
                    },
                    { EmployeeLastName: { 
                        contains: word 
                    } 
                }
            ]});
        });

        $scope.grid.filter.and = [
            { DBID: $rootScope.CompanyId && $rootScope.CompanyId.id || $rootScope.CompanyId || { not: null } },
            {EmployeeStatusID: $scope.grid.status}
        ].concat(andQ);

        $scope.EmployeeService.get($scope.grid.page, $scope.grid.ipp, $scope.grid.filter, $scope.grid.orderBy, $scope.grid.reverse, $scope.grid.expand);
    }

    init();
    
}]);
