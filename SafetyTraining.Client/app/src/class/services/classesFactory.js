/**
 * Created by Ed on 10/5/14.
 */

'use strict';

app.factory('classes', ['dataService', '$filter', 'odata', function (dataService, $filter, odata) {
    
    alert("Service");
    
    var ClassObject = {};

    ClassObject.classes = {
        total: 0,
        data: []
    };

    ClassObject.getClasses = function (page, ipp, filter, orderBy, reverse, cb) {
        var data = { page: page, ipp: ipp, filter: filter, orderBy: orderBy, reverse: reverse };
        if (angular.isObject(page))
            data = page;

        // get the data from API.
        return dataService.get('odata/Classes' + odata.queryString(data)).success(function (resp) {
            ClassObject.classes.total = resp['odata.count'];
            angular.copy(resp.Data, ClassObject.classes.data);
            if (angular.isFunction(cb))
                cb(resp);
        });
    };

    ClassObject.getClassById = function (id, cb) {
        return dataService.get('odata/Classes/' + id).success(function (resp) {
            if (angular.isFunction(cb))
                cb(resp)
        });
    };

    ClassObject.updateClass = function (id, data, cb) {
        return dataService.put('odata/Classes/' + id, data).success(function (resp) {
            if (angular.isFunction(cb))
                cb(resp)
        });
    };

    ClassObject.createClass = function (data, cb) {
        return dataService.post('odata/Classes/', data).success(function (resp) {
            if (angular.isFunction(cb))
                cb(resp)
        });
    };

    // Removes employee, not terminate, more destructive
    ClassObject.removeClass = function (id, cb) {
        return dataService['delete']('odata/Classes/' + id).success(function (resp) {
            if (angular.isFunction(cb))
                cb(resp)
        });
    };

    ClassObject.getAll = function (filter, orderBy, reverse, cb) {
        alert("working");
        var data = { filter: filter, orderBy: orderBy, reverse: reverse };
        if (angular.isObject(filter))
            data = filter;
        return dataService.get('odata/Classes' + odata.queryString(data)).success(function (resp) {
            alert("here");
            angular.copy(resp.value, ClassObject.classes.data);
            if (angular.isFunction(cb))
                cb(resp);
        });
    };

    return ClassObject;
}]);

