/**
 * Created by Tony Mack on 3/2/14.
 */

'use strict';

app.controller('userNewCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    $scope.add = function (user, form) {
        if (form.$invalid) return false;
        user.UserName = user.Email;
        (new api('User')).create(user).success(function (data) {
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
