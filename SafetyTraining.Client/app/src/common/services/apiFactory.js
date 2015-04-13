/**
 * Created by Tony Mack on 3/1/14.
 */

'use strict';

app.factory('api', ['dataService', '$filter', 'odata', '$q', function (dataService, $filter, odata, $q) {

    function api(name) {
        this.name = name;
        this.baseUrl = 'api/' + name;

        this.grid = {
            total: 0,
            data: []
        };
    }

    api.prototype.get = function (page, ipp, filter, orderBy, reverse, expand, qs) {
        var data = { page: page, ipp: ipp, filter: filter, orderBy: orderBy, reverse: reverse, expand: expand },
            $this = this;
        if (angular.isObject(page))
            data = page;
        data.count = true;

        return dataService.get(this.baseUrl + odata.queryString(data) + (qs || '')).success(function (resp) {
            $this.grid.total = resp['odata.count']; // Total items in response
            angular.copy(resp.value, $this.grid.data);
        });
    };

    api.prototype.getById = function (id, data) {
        if (isNaN(id))
            id = "'" + id + "'";

        console.log(this.baseUrl + odata.queryString(data));
        console.log(odata.queryString(data));

        return dataService.get(this.baseUrl + '(' + id + ')' + odata.queryString(data));
    };

    api.prototype.update = function (id, data) {
        delete data['odata.metadata'];
        if (isNaN(id))
            id = "'" + id + "'";
        data.ModifiedOn = new Date();
        return dataService.put(this.baseUrl + '(' + id + ')', data);
    };

    api.prototype.patch = function (id, data) {
        delete data['odata.metadata'];
        if (isNaN(id))
            id = "'" + id + "'";
        data.ModifiedOn = new Date();
        return dataService({ method: 'PATCH', url: this.baseUrl + '(' + id + ')', data: data });
    };

    api.prototype.create = function (data) {
        data.ModifiedOn = data.CreatedOn = new Date();
        return dataService.post(this.baseUrl, data);
    };

    api.prototype.remove = function (id) {

        if (isNaN(id))
            id = "'" + id + "'";
        return dataService['delete'](this.baseUrl + '(' + id + ')');
    };

    api.prototype.getAll = function (data) {
        return dataService.get(this.baseUrl + odata.queryString(data));
    };

    return api;
}]);
