/**
 * Created by Tony Mack on 3/1/14.
 */

'use strict';


app.controller('adminUserCompaniesEditCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {

    $scope.User = new api('User');
    $scope.CompanyService = new api('Company');

    $scope.companies = $scope.CompanyService.grid;

    $scope.grid = {
        search: '',
        page: 1,
        filter: {},
        orderBy: ['Company_Name'],
        ipp: 30,
        reverse: false,
        expand: []
    };

    $scope.$watch('grid', function (newVal, oldVal) {
        updateGrid()
    }, true);

    $scope.$on('CompanyChange', updateGrid);

    $scope.odata = function () {
        return odata.queryString({ filter: $scope.grid.filter, orderBy: $scope.grid.orderBy, reverse: $scope.grid.reverse });
    };

    function updateGrid() {
        $scope.CompanyService.get($scope.grid.page, $scope.grid.ipp, $scope.grid.filter, $scope.grid.orderBy, $scope.grid.reverse, $scope.grid.expand);
    }

       
    $scope.saveEdit = function (edit, form) {
        var updated = {};
        edit.DBID = edit.DBID.id;
        edit.Occupation = edit.Occupation.id;
        edit.UserStatusID = edit.UserStatusID.id;
        angular.copy(edit, updated);
        if (form.$invald) return false;
        delete edit['TLCompany'];
        delete edit.CompanysTakens;
        delete edit.UserStatu;
        $scope.User.update($stateParams.id, edit).success(function () {
            $scope.user = updated;
            $scope.user.Password = '';
            $scope.user.ConfirmPassword = ''
            $scope.tab[0] = true;
        });
        location.reload()
    }

    init();

    function init() {
        $scope.User.getById($stateParams.id, { expand: ['UserAccesses'] }).success(function (data) {
            $scope.user = data;
        });
        updateGrid();
    }

}]);

