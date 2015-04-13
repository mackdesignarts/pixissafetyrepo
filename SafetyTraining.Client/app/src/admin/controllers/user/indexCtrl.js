/**
 * Created by Tony Mack on 3/1/14.
 */

'use strict';

app.controller('adminUserIndexCtrl', ['$scope', '$stateParams', 'api', '$rootScope', 'odata', '$location', function ($scope, $stateParams, api, $rootScope, odata, $location) {

    $scope.UserService = new api('User');
        
    $scope.users = $scope.UserService.grid;
        
    $scope.grid = {
        search: '',
        status: 1,
        page: 1,
        filter: { },
        orderBy: 'UserName',
        ipp: 30,
        reverse: false,
        expand: []
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
        $scope.UserService.getAll($scope.grid.filter, $scope.grid.expand).success(function (data) {
            $scope.all = data;
        });
    };

    function updateGrid() {
        var andQ = [];
        var qwords = $scope.grid.search.replace(',', '').split(' ');
        $.each(qwords, function (i, word) {
            andQ.push({ or: [{ Email: { contains: word } }, { UserName: { contains: word } }] });
        });
        $scope.grid.filter.and = andQ;
        $scope.UserService.get($scope.grid.page, $scope.grid.ipp, $scope.grid.filter, $scope.grid.orderBy, $scope.grid.reverse, $scope.grid.expand);
    }

}]);

