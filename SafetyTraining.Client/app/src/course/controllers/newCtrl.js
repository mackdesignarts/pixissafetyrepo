/**
 * Created by Tony Mack on 3/2/14.
 */

'use strict';

app.controller('courseNewCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    $scope.add = function (course, form) {
        if (form.$invalid) return false;
        course.CertAgency = course.CertificationAgencyID.text
        course.CertificationAgencyID = course.CertificationAgencyID.id;
        (new api('Course')).create(course).success(function (data) {
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
