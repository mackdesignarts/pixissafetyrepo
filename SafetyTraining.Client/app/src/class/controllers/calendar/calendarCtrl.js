/**
 * Created by Tony Mack on 3/1/14.
 */

'use strict';

app.controller('calendarCalendarCtrl', ['$scope', '$stateParams', 'api', 'odata', '$rootScope', '$http', function ($scope, $stateParams, api, odata, $rootScope, $http) {
    $scope.filter = {
        Instructor: false
    };

    $scope.$watch('filter.Instructor', function () {
        $("#ClassCalendar").fullCalendar('refetchEvents');
    });

    $("#ClassCalendar").fullCalendar({
        events: function (start, end, callback) {
            var qsObj = {
                filter: {
                    and: [
                        { ScheduledStartDate: { '>=': start } },
                        { ScheduledStartDate: { '<=': end } }
                    ]
                },
                expand: ['Instructor', 'ClassAttendees']
            };

            if ($scope.filter.Instructor) {
                qsObj.filter.and.push({ InstructorID: $scope.filter.Instructor.id });
            }

            $http.get('api/Class' + odata.queryString(qsObj)).success(function (doc) {
                callback($.map(doc["value"], convertToEvent));
            });
        }
    });

    function stringToColour(str) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        var colour = '#';
        for (var i = 0; i < 3; i++) {
            var value = (hash >> (i * 8)) & 0xFF;
            colour += ('00' + value.toString(16)).substr(-2);
        }
        return colour;
    }

    function getContrastYIQ(hexcolor) {
        if (hexcolor.charAt(0) === '#') {
            hexcolor = hexcolor.substr(1);
        }
        var r = parseInt(hexcolor.substr(0, 2), 16);
        var g = parseInt(hexcolor.substr(2, 2), 16);
        var b = parseInt(hexcolor.substr(4, 2), 16);
        var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? 'black' : 'white';
    }

    function convertToEvent(data) {
        var bgColor = stringToColour(data.Instructor && data.Instructor.InstructorName || 'Unknown');
        return {
            id: data.ClassID,
            title: data.ClassName + '\n\r' + data.ClassAttendees.length + ' Attendee' + (data.ClassAttendees.length !== 1 ? 's' : ''),
            start: data.ScheduledStartDate,
            end: data.ScheduledEndDate,
            backgroundColor: bgColor,
            textColor: getContrastYIQ(bgColor),
            allDay: true,
            url: '#!/class/detail/' + data.ClassID
        };
    };

}]);




