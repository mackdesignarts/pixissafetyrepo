/**
 * Created by Tony Mack on 3/1/14.
 */

'use strict';

app.factory('courses', ['$rootScope', function ($rootScope) {

    function validateCerts(course, certs) {
        var DBID = $rootScope.CompanyId && $rootScope.CompanyId.id || $rootScope.CompanyId;
        certs = certs || course.CoursesTakens;

        if (!$.isArray(certs))
            certs = [certs];

        var validCerts = [];
        var invalidCerts = [];
        var today = new Date();

        $.each(certs, function (i, cert) {
            if (DBID && cert.Employee && cert.Employee.DBID !== DBID) return;
            var start = new Date(cert.CertificationDate);
            var end = new Date(cert.CertificationDate);

            end.setMonth(start.getMonth() + course.RenewalPeriodMonths);
            cert.ExpirationDate = end;

            if (course.RenewalPeriodMonths === 0 || end > today) {
                cert.Expires = Math.abs((end.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));
                cert.Expired = false;
                validCerts.push(cert);
            } else {
                cert.Expired = true;
                invalidCerts.push(cert);
            }
        });

        return {
            valid: validCerts,
            invalid: invalidCerts
        };
    }

    return {
        validateCerts: validateCerts
    };
}]);
