/**
 * Created by Tony Mack on 3/2/14.
 */

'use strict';

app.controller('instructorNewCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    $scope.add = function (instructor, form) {
        var data = instructor;
        data.RegionID = instructor.RegionID.id;
            
        if (form.$invalid) return false;

        (new api('Instructor')).create(data).success($scope.$close);
    };
        
    $scope.cancel = function(){
        $scope.$dismiss('cancel');
    };
        
    init();

    function init() {

    }

}]);
