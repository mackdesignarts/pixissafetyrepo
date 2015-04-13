/**
 * Created by Tony Mack on 3/4/14.
 */

'use strict';

app.factory('crews', ['dataService', '$filter', function (dataService, $filter) {

    var CrewObject = {};

    CrewObject.crews = {
        total: 0,
        data: []
    };

    CrewObject.getCrews = function(page, ipp, filter, orderBy, reverse) {
        var data = {page: page, ipp: ipp, filter: filter, orderBy: orderBy, reverse: reverse};
        if (angular.isObject(page))
            data = page;
        data.page = data.page || 1;
        data.ipp = data.ipp || 30;

        // TODO: remove fakeness and hook up API
        // fakeness
        var respData = ($filter('orderBy')($filter('filter')(fakeCrews, data.filter), data.orderBy, data.reverse));
        var resp = {
            Data: respData.slice((data.page - 1) * data.ipp, data.page * data.ipp),
            Count: respData && respData.length
        };

        // get the data from API.
        // dataService.get('/Api/Crew',data).success(function(resp){
        CrewObject.crews.total = resp.Count;
        angular.copy(resp.Data, CrewObject.crews.data);
        // });
    };

    CrewObject.getCrewById = function(id){
        // TODO: remove fakeness and hook up API
        return angular.copy(fakeCrews[id]);
    };

    CrewObject.updateCrew = function(id, data){
        // TODO: remove fakeness and hook up API
        data.CrewID = id;
        fakeCrews[id] = data;
    };

    CrewObject.createCrew = function(data){
        // TODO: remove fakeness and hook up API
        data.CrewID = fakeCrews.length;
        fakeCrews.push(data);
    };
        
    CrewObject.removeMember = function(id,memberId){
        var crew = CrewObject.getCrewById(id),
            members = crew.CrewMembers;
        members.splice(members.indexOf(memberId),1);
        crew.CrewMembers = members;
        CrewObject.updateCrew(id, crew);
    };

    // Removes crew, not terminate, more destructive
    CrewObject.removeCrew = function(id){
        // TODO: remove fakeness and hook up API
        fakeCrews.slice(id,1);
    };

    CrewObject.getAll = function(){
        // TODO: remove fakeness and hook up API
        return angular.copy(fakeCrews);
    };

    return CrewObject;
}]);
