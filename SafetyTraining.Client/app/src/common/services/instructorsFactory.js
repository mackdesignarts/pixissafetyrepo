/**
 * Created by Tony Mack on 3/1/14.
 */

'use strict';

// TODO: decompose mocks at bottom

app.factory('instructors', ['dataService', '$filter', function (dataService, $filter) {

    var InstructorObject = {};
        
    InstructorObject.instructors = {
        total: 0,
        data: []
    };

    InstructorObject.getInstructors = function(page, ipp, filter, orderBy, reverse) {
        var data = {page: page, ipp: ipp, filter: filter, orderBy: orderBy, reverse: reverse};
        if (angular.isObject(page))
            data = page;
        data.page = data.page || 1;
        data.ipp = data.ipp || 30;

        // TODO: remove fakeness and hook up API
        // fakeness
        var respData = ($filter('orderBy')($filter('filter')(fakeInstructors, data.filter), data.orderBy, data.reverse));
        var resp = {
            Data: respData.slice((data.page - 1) * data.ipp, data.page * data.ipp),
            Count: respData && respData.length
        };

        // get the data from API.
        // dataService.get('/Api/Instructor',data).success(function(resp){
        InstructorObject.instructors.total = resp.Count;
        angular.copy(resp.Data, InstructorObject.instructors.data);
        // });
    };

    InstructorObject.getInstructorById = function(id){
        // TODO: remove fakeness and hook up API
        return angular.copy(fakeInstructors[id]);
    };

    InstructorObject.updateInstructor = function(id, data){
        // TODO: remove fakeness and hook up API
        data.InstructorID = id;
        fakeInstructors[id] = data;
    };

    InstructorObject.createInstructor = function(data){
        // TODO: remove fakeness and hook up API
        data.InstructorID = fakeInstructors.length;
        fakeInstructors.push(data);
    };

    // Removes instructor, not terminate, more destructive
    InstructorObject.removeInstructor = function(id){
        // TODO: remove fakeness and hook up API
        fakeInstructors.slice(id,1);
    };

    InstructorObject.getAll = function(){
        // TODO: remove fakeness and hook up API
        return angular.copy(fakeInstructors);
    };
       
    return InstructorObject;
}]);


var fakeInstructors = [
    {
        "InstructorId": 0,
        "InstructorName": "Rice Buchanan",
        "Status": "esse incididunt",
        "CompanyId": 4,
        "UnionHired": true,
        "CreatedOn": "1991-08-28T06:40:48+04:00",
        "CreatedBy": 9,
        "ModifiedOn": "1997-06-16T10:43:23+04:00",
        "ModifiedBy": 2
    },
    {
        "InstructorId": 1,
        "InstructorName": "Love Wilkinson",
        "Status": "adipisicing deserunt",
        "CompanyId": 9,
        "UnionHired": false,
        "CreatedOn": "2006-01-13T13:37:43+05:00",
        "CreatedBy": 10,
        "ModifiedOn": "2003-10-30T02:22:59+04:00",
        "ModifiedBy": 3
    },
    {
        "InstructorId": 2,
        "InstructorName": "Oneill Rose",
        "Status": "nulla tempor",
        "CompanyId": 10,
        "UnionHired": true,
        "CreatedOn": "1998-05-16T08:49:10+04:00",
        "CreatedBy": 8,
        "ModifiedOn": "1992-01-02T03:30:56+05:00",
        "ModifiedBy": 5
    },
    {
        "InstructorId": 3,
        "InstructorName": "Eugenia Banks",
        "Status": "ex et",
        "CompanyId": 8,
        "UnionHired": true,
        "CreatedOn": "1993-03-23T06:55:37+04:00",
        "CreatedBy": 4,
        "ModifiedOn": "2007-02-22T13:18:21+05:00",
        "ModifiedBy": 3
    },
    {
        "InstructorId": 4,
        "InstructorName": "Adams Kirk",
        "Status": "commodo culpa",
        "CompanyId": 7,
        "UnionHired": false,
        "CreatedOn": "1988-03-07T21:14:28+05:00",
        "CreatedBy": 8,
        "ModifiedOn": "1990-02-26T01:38:20+05:00",
        "ModifiedBy": 8
    },
    {
        "InstructorId": 5,
        "InstructorName": "Adrienne Wall",
        "Status": "pariatur velit",
        "CompanyId": 7,
        "UnionHired": true,
        "CreatedOn": "2012-10-14T16:18:23+04:00",
        "CreatedBy": 8,
        "ModifiedOn": "2014-01-11T14:40:37+05:00",
        "ModifiedBy": 8
    },
    {
        "InstructorId": 6,
        "InstructorName": "Mckinney Bates",
        "Status": "ullamco culpa",
        "CompanyId": 6,
        "UnionHired": true,
        "CreatedOn": "2011-08-05T20:35:03+04:00",
        "CreatedBy": 6,
        "ModifiedOn": "2000-01-02T13:32:44+05:00",
        "ModifiedBy": 5
    },
    {
        "InstructorId": 7,
        "InstructorName": "Cochran Walker",
        "Status": "amet anim",
        "CompanyId": 9,
        "UnionHired": true,
        "CreatedOn": "2009-01-29T17:21:19+05:00",
        "CreatedBy": 5,
        "ModifiedOn": "1996-07-03T16:57:34+04:00",
        "ModifiedBy": 4
    },
    {
        "InstructorId": 8,
        "InstructorName": "Howard Dickerson",
        "Status": "proident pariatur",
        "CompanyId": 3,
        "UnionHired": false,
        "CreatedOn": "2011-02-11T17:27:09+05:00",
        "CreatedBy": 7,
        "ModifiedOn": "1995-11-24T05:56:33+05:00",
        "ModifiedBy": 2
    },
    {
        "InstructorId": 9,
        "InstructorName": "Tonia Tucker",
        "Status": "qui dolor",
        "CompanyId": 8,
        "UnionHired": false,
        "CreatedOn": "1991-08-24T21:19:59+04:00",
        "CreatedBy": 1,
        "ModifiedOn": "1999-05-17T05:51:05+04:00",
        "ModifiedBy": 8
    },
    {
        "InstructorId": 10,
        "InstructorName": "Julianne Haynes",
        "Status": "anim voluptate",
        "CompanyId": 2,
        "UnionHired": false,
        "CreatedOn": "1996-08-13T18:43:43+04:00",
        "CreatedBy": 7,
        "ModifiedOn": "1991-12-11T14:53:10+05:00",
        "ModifiedBy": 2
    },
    {
        "InstructorId": 11,
        "InstructorName": "Warner Mcintyre",
        "Status": "sint amet",
        "CompanyId": 2,
        "UnionHired": false,
        "CreatedOn": "1989-12-03T00:01:45+05:00",
        "CreatedBy": 2,
        "ModifiedOn": "2013-02-06T09:18:10+05:00",
        "ModifiedBy": 1
    },
    {
        "InstructorId": 12,
        "InstructorName": "Hoffman Moody",
        "Status": "do consectetur",
        "CompanyId": 8,
        "UnionHired": true,
        "CreatedOn": "2005-04-26T23:12:24+04:00",
        "CreatedBy": 10,
        "ModifiedOn": "2005-06-10T13:32:19+04:00",
        "ModifiedBy": 3
    },
    {
        "InstructorId": 13,
        "InstructorName": "Carver Wolf",
        "Status": "sint nulla",
        "CompanyId": 4,
        "UnionHired": false,
        "CreatedOn": "1994-06-08T13:22:14+04:00",
        "CreatedBy": 6,
        "ModifiedOn": "2004-10-08T15:35:05+04:00",
        "ModifiedBy": 1
    },
    {
        "InstructorId": 14,
        "InstructorName": "Morgan Bauer",
        "Status": "officia mollit",
        "CompanyId": 9,
        "UnionHired": true,
        "CreatedOn": "2009-08-02T13:29:17+04:00",
        "CreatedBy": 7,
        "ModifiedOn": "1997-12-03T01:20:03+05:00",
        "ModifiedBy": 4
    }
];