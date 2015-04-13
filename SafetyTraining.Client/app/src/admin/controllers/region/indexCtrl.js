/**
 * Created by Tony Mack on 3/1/14.
 */

'use strict';

app.controller('adminRegionIndexCtrl', ['$scope', '$stateParams', 'api', '$rootScope', 'odata', '$location', function ($scope, $stateParams, api, $rootScope, odata, $location) {

    $scope.RegionService = new api('Region');
        
    $scope.regions = $scope.RegionService.grid;
        
    $scope.grid = {
        search: '',
        status: 1,
        page: 1,
        filter: { },
        orderBy: 'Region1',
        ipp: 30,
        reverse: false,
        expand: ['Instructor']
    };

    $scope.$watchCollection('grid', function (newVal, oldVal) {
            updateGrid();
    });

    $scope.odata = function () {
        return odata.queryString({ filter: $scope.grid.filter, orderBy: $scope.grid.orderBy, reverse: $scope.grid.reverse });
    };

    init();

    function init() {
        updateGrid();
    }
        
    $scope.all = [];

    $scope.getAll = function () {
        $scope.RegionService.getAll($scope.grid.filter, $scope.grid.expand).success(function (data) {
            $scope.all = data;
        });
    };

    function updateGrid() {
        var andQ = [];
        var qwords = $scope.grid.search.replace(',', '').split(' ');
        $.each(qwords, function (i, word) {
            andQ.push({ or: [{ 'Instructor/InstructorName': { contains: word } }, { Region1: { contains: word } }] });
        });
        $scope.grid.filter.and = andQ;
        $scope.RegionService.get($scope.grid.page, $scope.grid.ipp, $scope.grid.filter, $scope.grid.orderBy, $scope.grid.reverse, $scope.grid.expand);
    }

}]);

