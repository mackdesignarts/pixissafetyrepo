/**
 * Created by Tony Mack on 3/1/14.
 */

'use strict';

// TODO: decompose $HTTP into auth service

app.controller('loginIndexCtrl', ['$scope', '$window', '$stateParams', '$timeout', '$state', '$http', '$rootScope', function ($scope, $window, $stateParams, $timeout, $state, $http, $rootScope) {
    init();
    $scope.isBusy = false;
    $scope.login = function (creds) {
        
        var url = "/api/Auth";

        if ($scope.loginForm.$valid) {
            $scope.submitting = true;
            $scope.isBusy = true;
                
            $http.post(url, creds).success(function (data) {
                if (!data.Success) {
                    $scope.submitting = false;
                    $scope.loginForm.error = 'Could not log in, please check your username and password.';
                    console.log("Incorrect username / password.");
                } else {
                    $rootScope.user = data.User;
                    // Set UserID as token
                    $window.localStorage.setItem('token', data.User.id);
                    $state.go('app.dashboard');
                }
                $scope.isBusy = false;
                
            })
            .error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.isBusy = false;
            });

        }
    };

    function init() {

    }

}]);

