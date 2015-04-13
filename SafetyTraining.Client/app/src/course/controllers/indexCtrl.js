/**
 * Created by Tony Mack on 3/1/14.
 */

'use strict';

app.controller('courseIndexCtrl', ['$scope', '$stateParams', 'api', 'odata', 'courses', '$rootScope', function ($scope, $stateParams, api, odata, courses, $rootScope) {

    $scope.CourseService = new api('Course');
        
    $scope.courses = $scope.CourseService.grid;
        
    $scope.grid = {
        search: '',
        page: 1,
        filter: {},
        orderBy: ['CertAgency', 'CourseDescription'],
        ipp: 30,
        reverse: false,
        expand: ['CoursesTakens']
    };

    $scope.$watch('grid', function (newVal, oldVal) {
            updateGrid()
    },true);

    $scope.$on('CompanyChange', updateGrid);

    $scope.odata = function () {
        return odata.queryString({ filter: $scope.grid.filter, orderBy: $scope.grid.orderBy, reverse: $scope.grid.reverse });
    };

    $scope.validateCerts = courses.validateCerts;

    init();

    function init() {
        updateGrid()
    }

    function updateGrid() {
        var andQ = [];
        var qwords = $scope.grid.search.replace(',', '').split(' ');
        $.each(qwords, function (i, word) {
            andQ.push({ or: [{ CertAgency: { contains: word } }, { CourseDescription: { contains: word } }] });
        });
        $scope.grid.filter.and = andQ;
        $scope.CourseService.get($scope.grid.page, $scope.grid.ipp, $scope.grid.filter, $scope.grid.orderBy, $scope.grid.reverse, $scope.grid.expand);
    }

}]);
