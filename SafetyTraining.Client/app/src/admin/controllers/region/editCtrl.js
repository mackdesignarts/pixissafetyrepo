/**
 * Created by Tony Mack on 3/1/14.
 */

'use strict';


app.controller('adminRegionEditCtrl', ['$scope', '$stateParams', 'api', '$state', function ($scope, $stateParams, api, $state) {

    $scope.RegionService = new api('Region');

    $scope.edit = {};

    $scope.saveEdit = function (edit, form) {
        var updated = {};
        angular.copy(edit, updated);
        if (form.$invald) return false;
        var data = { Director: updated.Director.id, Region: updated.Region};
        $scope.RegionService.patch($stateParams.id, data).success(function () {
            $state.go('app.admin.region.index');
        });
    }

    init();

    function init() {
        $scope.RegionService.getById($stateParams.id, { expand: ['Instructor'] }).success(function (data) {
            $scope.region = data;
            angular.copy($scope.region, $scope.edit)
        });
    }

}]);

