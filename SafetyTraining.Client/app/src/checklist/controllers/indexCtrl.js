
'use strict';

app.controller('projectChecklistIndexCtrl', ['$scope', '$stateParams','api',  function ($scope, $stateParams, api) {
    
    var checklist = new api("Checklists");
    var jobs = new api("Jobs");

    checklist.getAll().success(function (data) {
        $scope.existingJobs = data.value;
    }).error(function (data) { console.log("Failed to load existing processes"); });

    jobs.getAll().success(function (data) {
        $scope.allJobs = data.value;
    }).error(function (data) {
        console.log("Failed to get jobs")
    });

    init();

   

    function init() {

    }

}]);



