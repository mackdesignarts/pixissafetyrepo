/**
 *
 */

'use strict';

app.controller('classIndexCtrl', ['$scope', '$stateParams', 'api', 'odata', '$rootScope', function ($scope, $stateParams, api, odata, $rootScope) {

    $scope.ClassService = new api('Class');

    $scope.classes = $scope.ClassService.grid;

    $scope.expOptions = [{ name: '', val: '' }, { name: 'Yes', val: 'YES' }, { name: 'No', val: 'NO' }];

    $scope.grid = {
        search: '',
        status: 1,
        page: 1,
        filter: {},
        orderBy: ['ClassName'],
        ipp: 30,
        reverse: false,
        expand: ['ClassAttendees', 'Instructor']
    };

    $scope.$watchCollection('grid', function (newVal, oldVal) {
        updateGrid();
    });


    $scope.odata = function () {

        return odata.queryString({ filter: $scope.grid.filter, orderBy: $scope.grid.orderBy, reverse: $scope.grid.reverse });
    };

    init();

    function init() {
        updateGrid()
    }

    function updateGrid() {
        var andQ = [];
        var qwords = $scope.grid.search.replace(',', '').split(' ');

        $.each(qwords, function (i, word) {
            if (!isNaN(parseInt(word)))
                word = word+'!'; //add '!' to recognize int as string in odata filter  
            andQ.push({ ClassName: { contains: word } });
        });
        //isNaN()

        if ($scope.grid.Completed != undefined && $scope.grid.Completed != '')
            andQ.push({ Completed: { '=': $scope.grid.Completed == 'YES' ? true : false } });

        if ($scope.grid.ScheduledStartDate != undefined && $scope.grid.ScheduledStartDate != '')
            andQ.push({ ScheduledStartDate: { '>': $scope.grid.ScheduledStartDate } });

        if ($scope.grid.ScheduledEndDate != undefined && $scope.grid.ScheduledEndDate != '')
            andQ.push({ ScheduledEndDate: { '<': $scope.grid.ScheduledEndDate } });

        if ($scope.grid.Instructor != undefined && $scope.grid.Instructor != null)
            andQ.push({ InstructorID: { '=': $scope.grid.Instructor.id } });

        $scope.grid.filter.and = andQ;
        $scope.ClassService.get($scope.grid.page, $scope.grid.ipp, $scope.grid.filter, $scope.grid.orderBy, $scope.grid.reverse, $scope.grid.expand);

    }

}]);
