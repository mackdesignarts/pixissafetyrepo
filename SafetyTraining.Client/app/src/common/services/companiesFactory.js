/**
 * Created by Tony Mack on 3/1/14.
 */

'use strict';

app.factory('companies', ['dataService', '$filter', 'odata', function (dataService, $filter, odata) {

    var CompanyObject = {};
        
    CompanyObject.companies = {
        total: 0,
        data: []
    };

    CompanyObject.getCompanies = function(page, ipp, filter, orderBy, reverse) {
        var data = { page: page, ipp: ipp, filter: filter, orderBy: 'asc', reverse: reverse };
        if (angular.isObject(page))
            data = page;

        // get the data from API.
        return dataService.get('odata/Company' + odata.queryString(data)).success(function (resp) {
            EmployeeObject.employees.total = resp['odata.count'];
            angular.copy(resp.Data, EmployeeObject.employees.data);
            if (angular.isFunction(cb))
                cb(resp);
        });
    };

    CompanyObject.getCompanyById = function(id){
        return dataService.get('odata/Company(\'' + id + '\')');
    };

    CompanyObject.updateCompany = function(id, data){
        return dataService.put('odata/Company(\'' + id + '\')',data);
    };

    CompanyObject.createCompany = function (data) {
        return dataService.post('odata/Company');
    };

    // Removes company, not terminate, more destructive
    CompanyObject.removeCompany = function(id){
        // TODO: remove fakeness and hook up API
        fakeCompanies.slice(id,1);
    };

    CompanyObject.getAll = function(){
        // TODO: remove fakeness and hook up API
        return angular.copy(fakeCompanies);
    };

    return CompanyObject;
}]);
