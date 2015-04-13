/**
 * Created by Tony Mack on 3/2/14.
 */

'use strict';

app.controller('noteNewCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    $scope.EmployeeNotes = new api('EmployeeNotes');

    $scope.employeeId = $stateParams.id;
        
    $scope.addNote = function (note, form) {
        if (form.$invalid) return false;
        $scope.EmployeeNotes.create(note).success(function () {
            $scope.$close(note);
        });
    };

        
    $scope.cancel = function(){
        $scope.$dismiss('cancel');
    };

}]);
