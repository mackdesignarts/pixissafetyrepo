/**
 * Created by Tony Mack on 3/2/14.
 */

'use strict';

app.controller('noteEditCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    $scope.EmployeeNotes = new api('EmployeeNotes');

    $scope.employeeId = $stateParams.id;

    $scope.EmployeeNotes.getById($stateParams.note).success(function (data) {
        $scope.note = data;
    })
        
    $scope.editNote = function (note, form) {
        if (form.$invalid) return false;
        $scope.EmployeeNotes.update(note.EmployeeNoteID, note).success(function () {
            $scope.$close(note);
        });
    };

        
    $scope.cancel = function(){
        $scope.$dismiss('cancel');
    };

}]);
