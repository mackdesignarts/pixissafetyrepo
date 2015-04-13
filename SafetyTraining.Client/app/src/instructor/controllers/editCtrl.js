/**
 * Created by Tony Mack on 3/2/14.
 */

'use strict';

app.controller('instructorEditCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    (new api('Instructor')).getById($stateParams.id).success(function (data) {
        $scope.instructor = data;
    });
    $scope.edit = function (instructor, form) {
        if (form.$invalid) return false;
        instructor.RegionID = instructor.RegionID.id;
        (new api('Instructor')).update(instructor.InstructorID, instructor).success(function (data) {
            $scope.$close(data);
        });
    };
        
    $scope.cancel = function(){
        $scope.$dismiss('cancel');
    };
        
    init();

    function init() {

    }

}]);
