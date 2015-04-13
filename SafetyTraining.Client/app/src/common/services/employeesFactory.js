/**
 * Created by Tony Mack on 3/1/14.
 */

'use strict';

app.factory('employees', ['dataService', '$filter','odata', function (dataService, $filter, odata) {

    var EmployeeObject = {};
        
    EmployeeObject.employees = {
        total: 0,
        data: []
    };

    EmployeeObject.getEmployees = function (page, ipp, filter, orderBy, reverse, cb) {
        var data = {page: page, ipp: ipp, filter: filter, orderBy: orderBy, reverse: reverse};
        if (angular.isObject(page))
            data = page;

        // get the data from API.
        return dataService.get('odata/Employee'+odata.queryString(data)).success(function(resp){
            EmployeeObject.employees.total = resp['odata.count'];
            angular.copy(resp.Data, EmployeeObject.employees.data);
            if (angular.isFunction(cb))
                cb(resp);
        });
    };

    EmployeeObject.getEmployeeById = function(id, cb){
        return dataService.get('odata/Employee/' + id).success(function (resp) {
            if (angular.isFunction(cb))
            cb(resp)
        });
    };

    EmployeeObject.updateEmployee = function(id, data, cb){
        return dataService.put('odata/Employee/' + id, data).success(function (resp) {
            if(angular.isFunction(cb))
                cb(resp)
        });
    };

    EmployeeObject.createEmployee = function(data, cb){
        return dataService.post('odata/Employee/', data).success(function (resp) {
            if (angular.isFunction(cb))
                cb(resp)
        });
    };

    // Removes employee, not terminate, more destructive
    EmployeeObject.removeEmployee = function(id, cb){
        return dataService['delete']('odata/Employee/' + id).success(function (resp) {
            if (angular.isFunction(cb))
                cb(resp)
        });
    };

    EmployeeObject.getAll = function (filter, orderBy, reverse, cb) {
            
        var data = { filter: filter, orderBy: orderBy, reverse: reverse };
        if (angular.isObject(filter))
            data = filter;
        return dataService.get('odata/Employee' + odata.queryString(data)).success(function (resp) {
            angular.copy(resp.value, EmployeeObject.employees.data);
            if (angular.isFunction(cb))
                cb(resp);
        });
    };

    return EmployeeObject;
}]);
