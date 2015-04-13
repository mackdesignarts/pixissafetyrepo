/**
 * Created by Tony Mack on 3/1/14.
 */

'use strict';

app.controller('calendarIndexCtrl', ['$scope', '$stateParams', 'api', 'odata', '$rootScope', '$http', function ($scope, $stateParams, api, odata, $rootScope, $http) {        

    $("#ClassCalendar").fullCalendar({
        events: function (start, end, timezone, callback) {          
                
            var start = start.toISOString()
                end = end.toISOString();

            $.ajax({
                url: 'api/Calendar?start=' + start + "&end=" + end,
                dataType: 'json',
                beforeSend: function (XMLHttpRequest) {XMLHttpRequest.setRequestHeader("Accept", "application/json");},
                error: function () { alert("issue");},
                success: function (doc) {
                    var events = [];
                        
                    alert(doc);
                    $(doc).find('ClassName').each(function () {
                        alert($(this));
                    //    events.push({
                    //        title: $(this).attr('title'),
                    //        start: $(this).attr('start') // will be parsed
                    //    });
                    });
                    alert(events);
                    // callback(events);
                }
            });
        }
    });
}]);



