/*************************
Pixis | Safety Training App 

httpFactory

Auth: TmAck.072 <tonymclaughlin72@gmail.com> 
Date: 4/5/15
*************************/

'use strict';

// Generic web API URI builder and http services
app.factory('httpFactory', function($q, $http) {
    var urlPrefix = "api/";
    return {
        get: function(urlExt, query) {        
            $http.get(urlPrefix + urlExt + query)
            .success(function(data, status, headers, config) {
                return data;
            })
            .error(function (data, status, headers, config) {
                // TODO: add error handler
                console.log("There was an error: " + data);
            });
        },

        post: function(urlExt, obj) {    
            $http.post(urlPrefix + urlExt, obj)
            .success(function(data, status, headers, config) {
                return data;
            })
            .error(function (data, status, headers, config) {
                // TODO: add error handler
                console.log("There was an error: " + data);
            });
        }
    };
})