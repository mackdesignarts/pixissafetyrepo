/**
 * Created by Tony Mack on 3/1/14.
 */

'use strict';

app.controller('instructorIndexCtrl', ['$scope', '$stateParams', 'api', 'odata', function ($scope, $stateParams, api, odata) {

    $scope.InstructorService = new api('Instructor');

    $scope.instructors = $scope.InstructorService.grid;

    $scope.grid = {
        search: '',
        page: 1,
        filter: {},
        orderBy: ['InstructorName', 'CompanyId'],
        ipp: 30,
        reverse: false,
        expand: ['CoursesTakens', 'Region']
    };

    $scope.$watch('grid', function (newVal, oldVal) {
            updateGrid()
    },true);

    $scope.$on('CompanyChange', updateGrid);

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
            andQ.push({ InstructorName: { contains: word } });
        });
        $scope.grid.filter.and = andQ;
        $scope.InstructorService.get($scope.grid.page, $scope.grid.ipp, $scope.grid.filter, $scope.grid.orderBy, $scope.grid.reverse, $scope.grid.expand);
    }

}]);
