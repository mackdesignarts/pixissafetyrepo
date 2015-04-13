/**
 * Created by Tony Mack on 3/1/14.
 */

'use strict';

// TODO: decompose mocks at bottom

app.factory('employeeCourses', ['dataService', '$filter', function (dataService, $filter) {

    var EmployeeCourseObject = {};
        
    EmployeeCourseObject.employeeCourses = {
        total: 0,
        data: []
    };

    EmployeeCourseObject.getEmployeeCourses = function(page, ipp, filter, orderBy, reverse) {
        var data = {page: page, ipp: ipp, filter: filter, orderBy: orderBy, reverse: reverse};
        if (angular.isObject(page))
            data = page;
        data.page = data.page || 1;
        data.ipp = data.ipp || 30;

        // TODO: remove fakeness and hook up API
        // fakeness
        var respData = ($filter('orderBy')($filter('filter')(fakeEmployeeCourses, data.filter), data.orderBy, data.reverse));
        var resp = {
            Data: respData.slice((data.page - 1) * data.ipp, data.page * data.ipp),
            Count: respData && respData.length
        };

        // get the data from API.
        // dataService.get('/Api/EmployeeCourse',data).success(function(resp){
        EmployeeCourseObject.employeeCourses.total = resp.Count;
        angular.copy(resp.Data, EmployeeCourseObject.employeeCourses.data);
        // });
    };

    EmployeeCourseObject.getEmployeeCourseById = function(id){
        // TODO: remove fakeness and hook up API
        return angular.copy(fakeEmployeeCourses[id]);
    };

    EmployeeCourseObject.updateEmployeeCourse = function(id, data){
        // TODO: remove fakeness and hook up API
        data.EmployeeCourseID = id;
        fakeEmployeeCourses[id] = data;
    };

    EmployeeCourseObject.createEmployeeCourse = function(data){
        // TODO: remove fakeness and hook up API
        data.EmployeeCourseID = fakeEmployeeCourses.length;
        fakeEmployeeCourses.push(data);
    };

    // Removes employeeCourse, not terminate, more destructive
    EmployeeCourseObject.removeEmployeeCourse = function(id){
        // TODO: remove fakeness and hook up API
        fakeEmployeeCourses.slice(id,1);
    };

    EmployeeCourseObject.getAll = function(){
        // TODO: remove fakeness and hook up API
        return angular.copy(fakeEmployeeCourses);
    };

    return EmployeeCourseObject;
}]);


var fakeEmployeeCourses = [
    {
        "EmployeeCourseId": 0,
        "EmployeeCourseDescription": "Qui est ullamco nulla commodo eiusmod laborum proident",
        "CertificationAgencyID": 2,
        "CertAgency": "mollit laboris",
        "EmployeeCourseLength": 2,
        "EmployeeCourseLengthUnit": "Days",
        "RenewalPeriodMonths": 27,
        "CreatedOn": "2002-10-16T16:59:08+04:00",
        "CreatedBy": 9,
        "ModifiedOn": "2007-05-14T14:37:15+04:00",
        "ModifiedBy": 2
    },
    {
        "EmployeeCourseId": 1,
        "EmployeeCourseDescription": "Elit deserunt aliqua et dolore quis esse incididunt duis consectetur esse fugiat",
        "CertificationAgencyID": 3,
        "CertAgency": "proident consequat",
        "EmployeeCourseLength": 6,
        "EmployeeCourseLengthUnit": "Days",
        "RenewalPeriodMonths": 55,
        "CreatedOn": "2000-10-15T22:12:25+04:00",
        "CreatedBy": 9,
        "ModifiedOn": "2011-04-16T10:24:18+04:00",
        "ModifiedBy": 7
    },
    {
        "EmployeeCourseId": 2,
        "EmployeeCourseDescription": "Aliqua non minim elit esse veniam fugiat id et mollit irure mollit",
        "CertificationAgencyID": 10,
        "CertAgency": "qui nulla",
        "EmployeeCourseLength": 3,
        "EmployeeCourseLengthUnit": "Days",
        "RenewalPeriodMonths": 30,
        "CreatedOn": "2007-06-24T16:47:07+04:00",
        "CreatedBy": 7,
        "ModifiedOn": "1994-09-04T12:32:54+04:00",
        "ModifiedBy": 9
    },
    {
        "EmployeeCourseId": 3,
        "EmployeeCourseDescription": "Tempor excepteur irure deserunt nostrud consectetur ea",
        "CertificationAgencyID": 1,
        "CertAgency": "irure irure",
        "EmployeeCourseLength": 9,
        "EmployeeCourseLengthUnit": "Days",
        "RenewalPeriodMonths": 36,
        "CreatedOn": "1998-09-06T06:45:55+04:00",
        "CreatedBy": 4,
        "ModifiedOn": "1991-03-02T19:52:16+05:00",
        "ModifiedBy": 5
    },
    {
        "EmployeeCourseId": 4,
        "EmployeeCourseDescription": "Ea aliqua ad fugiat ut id tempor",
        "CertificationAgencyID": 2,
        "CertAgency": "enim pariatur",
        "EmployeeCourseLength": 6,
        "EmployeeCourseLengthUnit": "Days",
        "RenewalPeriodMonths": 57,
        "CreatedOn": "1994-02-13T17:15:19+05:00",
        "CreatedBy": 4,
        "ModifiedOn": "2008-02-15T15:44:36+05:00",
        "ModifiedBy": 9
    },
    {
        "EmployeeCourseId": 5,
        "EmployeeCourseDescription": "Veniam nisi sunt consequat exercitation",
        "CertificationAgencyID": 6,
        "CertAgency": "sunt deserunt",
        "EmployeeCourseLength": 5,
        "EmployeeCourseLengthUnit": "Days",
        "RenewalPeriodMonths": 36,
        "CreatedOn": "2007-04-06T23:49:27+04:00",
        "CreatedBy": 5,
        "ModifiedOn": "2006-01-30T11:08:17+05:00",
        "ModifiedBy": 4
    },
    {
        "EmployeeCourseId": 6,
        "EmployeeCourseDescription": "Laboris culpa in adipisicing nulla ipsum reprehenderit irure exercitation",
        "CertificationAgencyID": 4,
        "CertAgency": "duis incididunt",
        "EmployeeCourseLength": 2,
        "EmployeeCourseLengthUnit": "Days",
        "RenewalPeriodMonths": 21,
        "CreatedOn": "2003-07-17T09:00:57+04:00",
        "CreatedBy": 9,
        "ModifiedOn": "2000-07-07T15:05:25+04:00",
        "ModifiedBy": 10
    },
    {
        "EmployeeCourseId": 7,
        "EmployeeCourseDescription": "Qui aliquip nulla in ut officia eiusmod",
        "CertificationAgencyID": 10,
        "CertAgency": "esse velit",
        "EmployeeCourseLength": 5,
        "EmployeeCourseLengthUnit": "Days",
        "RenewalPeriodMonths": 43,
        "CreatedOn": "2000-09-18T01:28:03+04:00",
        "CreatedBy": 5,
        "ModifiedOn": "2002-01-14T03:10:06+05:00",
        "ModifiedBy": 10
    },
    {
        "EmployeeCourseId": 8,
        "EmployeeCourseDescription": "Culpa duis dolor eu voluptate ex labore dolore in magna cillum ullamco",
        "CertificationAgencyID": 4,
        "CertAgency": "laboris mollit",
        "EmployeeCourseLength": 6,
        "EmployeeCourseLengthUnit": "Days",
        "RenewalPeriodMonths": 21,
        "CreatedOn": "1993-06-14T09:10:14+04:00",
        "CreatedBy": 9,
        "ModifiedOn": "1995-05-04T18:49:52+04:00",
        "ModifiedBy": 1
    },
    {
        "EmployeeCourseId": 9,
        "EmployeeCourseDescription": "Minim deserunt do incididunt fugiat ad velit Lorem dolore ad ut laborum",
        "CertificationAgencyID": 8,
        "CertAgency": "culpa in",
        "EmployeeCourseLength": 7,
        "EmployeeCourseLengthUnit": "Days",
        "RenewalPeriodMonths": 57,
        "CreatedOn": "1998-03-13T11:03:11+04:00",
        "CreatedBy": 6,
        "ModifiedOn": "2009-03-17T10:03:08+04:00",
        "ModifiedBy": 7
    },
    {
        "EmployeeCourseId": 10,
        "EmployeeCourseDescription": "Elit cupidatat esse minim fugiat incididunt duis enim veniam",
        "CertificationAgencyID": 5,
        "CertAgency": "pariatur duis",
        "EmployeeCourseLength": 10,
        "EmployeeCourseLengthUnit": "Days",
        "RenewalPeriodMonths": 20,
        "CreatedOn": "1992-01-22T21:21:44+05:00",
        "CreatedBy": 9,
        "ModifiedOn": "2009-11-11T00:07:26+05:00",
        "ModifiedBy": 9
    },
    {
        "EmployeeCourseId": 11,
        "EmployeeCourseDescription": "Laboris voluptate veniam elit officia adipisicing duis velit aliquip ea dolor consectetur",
        "CertificationAgencyID": 10,
        "CertAgency": "nostrud est",
        "EmployeeCourseLength": 2,
        "EmployeeCourseLengthUnit": "Days",
        "RenewalPeriodMonths": 53,
        "CreatedOn": "2012-01-23T15:23:05+05:00",
        "CreatedBy": 2,
        "ModifiedOn": "2012-02-29T09:22:25+05:00",
        "ModifiedBy": 3
    },
    {
        "EmployeeCourseId": 12,
        "EmployeeCourseDescription": "Et commodo id commodo elit reprehenderit id et eiusmod Lorem ea laboris excepteur",
        "CertificationAgencyID": 6,
        "CertAgency": "incididunt ea",
        "EmployeeCourseLength": 5,
        "EmployeeCourseLengthUnit": "Days",
        "RenewalPeriodMonths": 26,
        "CreatedOn": "1990-12-06T20:15:38+05:00",
        "CreatedBy": 3,
        "ModifiedOn": "2013-02-16T19:28:09+05:00",
        "ModifiedBy": 9
    },
    {
        "EmployeeCourseId": 13,
        "EmployeeCourseDescription": "In anim irure commodo exercitation consequat pariatur magna",
        "CertificationAgencyID": 2,
        "CertAgency": "cupidatat ad",
        "EmployeeCourseLength": 2,
        "EmployeeCourseLengthUnit": "Days",
        "RenewalPeriodMonths": 36,
        "CreatedOn": "2006-06-08T05:36:54+04:00",
        "CreatedBy": 6,
        "ModifiedOn": "1988-08-21T01:05:32+04:00",
        "ModifiedBy": 5
    }
];