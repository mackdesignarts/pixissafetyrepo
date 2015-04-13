/**
 * Created by Tony Mack on 3/1/14.
 */

'use strict';

app.controller('adminUserEditCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    $scope.CompanyService = new api('Company');

    $scope.UserCompanies = new api('UserCompanies');

    $scope.AccessFlagService = new api('UserAccessFlags');

    $scope.UserFlags = new api('UserAccesses');

    $scope.companies = $scope.CompanyService.grid;

    $scope.accessFlag = $scope.AccessFlagService.grid;

    $scope.grid = {
        search: '',
        page: 1,
        filter: {},
        orderBy: ['Company_Name'],
        ipp: 300,
        reverse: false,
        expand: []
    };

    $scope.$watch('grid', function (newVal, oldVal) {
        updateGrid()
    }, true);

    function updateGrid() {
        $scope.CompanyService.get($scope.grid.page, $scope.grid.ipp, $scope.grid.filter, $scope.grid.orderBy, $scope.grid.reverse, $scope.grid.expand);
    }

    $scope.accessGrid = {
        search: '',
        page: 1,
        filter: {},
        orderBy: ['Flag'],
        ipp: 300,
        reverse: false,
        expand: []
    };

    $scope.$watch('accessGrid', function (newVal, oldVal) {
        updateAccessGrid()
    }, true);

    function updateAccessGrid() {
        $scope.AccessFlagService.get($scope.accessGrid.page, $scope.accessGrid.ipp, $scope.accessGrid.filter, $scope.accessGrid.orderBy, $scope.accessGrid.reverse, $scope.accessGrid.expand);
    }

    $scope.User = new api('User');

    $scope.saveEdit = function (edit, form) {
        var updated = {};
        angular.copy(edit, updated);
        if (form.$invald) return false;
        var data = { UserName: edit.UserName, Email: edit.Email, RegionID: edit.RegionID.id };
        if (edit.Password) {
            data.Password = edit.Password;
        }
        $scope.User.patch($stateParams.id, data).success(function () {
            $scope.user = updated;
            $scope.user.Password = '';
            $scope.user.ConfirmPassword = ''
            $scope.tab[0] = true;
            $scope.edit = angular.copy($scope.user);
        });
    }

    $scope.toggleUserCompany = function (c, company) {
        if (c.selected) {
            $scope.UserCompanies.create({ UserID: $scope.user.UserID, CompanyID: company.DBID }).success(function (data) {
                c.UserCompanyID = data.UserCompanyID;
            }).error(function () {
                c.selected = false;
            });
        } else if (c.UserCompanyID) {
            $scope.UserCompanies.remove(c.UserCompanyID).success(function (data) {
                delete c.UserCompanyID
            }).error(function () {
                c.selected = true;
            });
        }
    };

    $scope.toggleUserFlag = function (c, flag) {
        if (c.selected) {
            $scope.UserFlags.create({ UserID: $scope.user.UserID, FlagID: flag.FlagID }).success(function (data) {
                c.UserAccessID = data.UserAccessID;
            }).error(function () {
                c.selected = false;
            });
        } else if (c.UserAccessID) {
            $scope.UserFlags.remove(c.UserAccessID).success(function (data) {
                delete c.UserAccessID
            }).error(function () {
                c.selected = true;
            });
        }
    };

    init();

    function init() {
        $scope.User.getById($stateParams.id, { expand: ['UserAccesses/UserAccessFlag1', 'UserCompanies'] }).success(function (data) {
            $scope.user = data;
            $scope.edit = angular.copy(data);
            $scope.edit.Password = '';
            $scope.userCompanies = {};
            $scope.userFlags = {};
            $.each(data.UserCompanies, function (i, company) {
                $scope.userCompanies[company.CompanyID] = { selected: true, UserCompanyID: company.UserCompanyID };
            });
            $.each(data.UserAccesses, function (i, flag) {
                $scope.userFlags[flag.FlagID] = { selected: true, UserAccessID: flag.UserAccessID };
            });
        });
    }

}]);

