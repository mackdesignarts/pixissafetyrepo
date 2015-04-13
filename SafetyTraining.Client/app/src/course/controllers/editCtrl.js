/**
 * Created by Tony Mack on 3/2/14.
 */

'use strict';

app.controller('courseEditCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    (new api('Course')).getById($stateParams.id).success(function (data) {
        $scope.course = data;
    });
    $scope.edit = function (course, form) {
        if (form.$invalid) return false;
        course.CertAgency = course.CertificationAgencyID.text
        course.CertificationAgencyID = course.CertificationAgencyID.id;
        (new api('Course')).update(course.CourseID, course).success(function (data) {
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
