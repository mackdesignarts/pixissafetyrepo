/**
 *
 */

'use strict';

app.controller('attendeeEditCtrl', ['$scope', '$stateParams', 'api', 'odata', '$rootScope', function ($scope, $stateParams, api, odata, $rootScope) {

    $scope.ClassService = new api('Class');

    init();

    function init() {
        updateGrid()
    }

    function updateGrid() {
        
    }
      
}]);