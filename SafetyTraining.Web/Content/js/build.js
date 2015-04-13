/*************************
Pixis | Safety Training App 

App.js
==========================
Main Angular Module.Config 

Auth: TmAck.072 <tonymclaughlin72@gmail.com> 
Date: 3/11/15
*************************/

'use strict';

// TODO: decompose into module app.js files

var app = angular.module('pixis.safetyProject', [
    'ui.router', 
    'ngAnimate', 
    'ui.bootstrap', 
    'ngCsv', 
    'ui.select'
]);

app.config([ 
    '$urlRouterProvider', 
    '$stateProvider', 
    'routeResolverProvider', 
    '$controllerProvider', 
    '$compileProvider', 
    '$filterProvider', 
    '$provide', 
    '$locationProvider', 
    '$httpProvider',
    function (
        $urlRouterProvider, 
        $stateProvider, 
        routeResolverProvider, 
        $controllerProvider, 
        $compileProvider, 
        $filterProvider, 
        $provide, 
        $locationProvider, 
        $httpProvider) {
            
            /* State based routes */

            // Handle unmatched routes
            $urlRouterProvider
                .when('', '/')
                .when('index.html', '/');
                        
            // State configs
            $stateProvider
                
                // Authentication
                .state('login', {
                    url: "/",
                    views: {
                        content: {
                            templateUrl: 'Content/auth/views/authView.html',
                            controller: 'loginIndexCtrl'
                        }
                    }
                })

                .state('logout', {
                    url: "/logout",
                    views: {
                        content: {
                            templateUrl: '',
                            controller: ''
                        }
                    }
                })

                // App abstract state 
                .state('app', {
                    url: "app",
                    abstract: true, 
                    AuthUser: true,  
                    template: 'Content/common/views/_appLayout.html',
                    views: {
                        content: {
                            templateUrl: 'Content/common/views/_appLayout.html'
                        }
                    }              
                })
                
                // Dashboard
                .state('app.dashboard', {
                    url: "/dashboard",
                    templateUrl: 'Content/dashboard/views/dashboardView.html',
                    controller: 'dashboardIndexCtrl'
                })

                .state('app.dashboard.addToCourse', {
                    url: "/dashboard/add-to-course",
                    templateUrl: 'Content/dashboard/views/add-to-course/dashboardAddToCourseView.html',
                    controller: 'add-to-courseIndexCtrl'
                })
                
                .state('app.dashboard.addCert', {
                    url: "/dashboard/add-certification",
                    templateUrl: 'Content/dashboard/views/add-certification/dashboardAddCertificationView.html',
                    controller: 'dashboardAdd-certificationIndex'
                })
                
                // Checklist            
                .state('app.checklist', {
                    template: '<div data-ui-view=""></div>',
                })

                .state('app.checklist.index', {
                    url: "/checklist",
                    templateUrl: 'Content/checklist/views/checklistView.html',
                    controller: 'projectChecklistIndexCtrl'
                })

                .state('app.checklist.start', {
                    url: "/checklist/process",
                    templateUrl: 'Content/checklist/views/process/checklistProcessView.html',
                    controller: 'startProcessIndexCtrl'
                })

                .state('app.checklist.form', {
                    url: "/checklist/form",     // TODO: does not exist
                    templateUrl: 'Content/checklist/views/process/checklistProcessView.html',
                    controller: 'formProcessIndex'
                })

                // Admin           
                .state('app.admin', {
                    template: '<div data-ui-view=""></div>',
                })

                .state('app.admin.dashboard', {
                    url: "/admin",
                    templateUrl: 'Content/admin/views/adminView.html',
                    controller: 'adminDashboardIndexCtrl'
                })

                .state('app.admin.dashboard.new', {
                    url: "/admin/user/new",
                    modal: true,
                    templateUrl: 'Content/admin/views/user/adminUserNewView.html'
                })

                .state('app.admin.user', {
                    template: '<div data-ui-view=""></div>'
                })

                .state('app.admin.user.index', {
                    url: "/admin/user",
                    templateUrl: 'Content/admin/views/user/adminUserView.html',
                    controller: 'adminUserIndexCtrl'
                })

                .state('app.admin.user.edit', {
                    url: "/admin/user/:id",
                    templateUrl: 'Content/admin/views/user/adminUserEditView.html',
                    controller: 'adminUserEditCtrl'
                })

                .state('app.admin.user.editCompanies', {
                    url: "/admin/user/:id/companies",
                    templateUrl: 'Content/admin/views/user/adminUserEditView.html',
                    controller: 'adminUserCompaniesEditCtrl'
                })

                .state('app.admin.region', {
                    template: '<div data-ui-view=""></div>'
                })

                .state('app.admin.region.index', {
                    url: "/admin/region",
                    templateUrl: 'Content/admin/views/region/adminRegionView.html',
                    controller: 'adminRegionIndexCtrl'
                })

                .state('app.admin.region.edit', {
                    url: "/admin/region/:id",
                    templateUrl: 'Content/admin/views/region/adminRegionEditView.html',
                    controller: 'adminRegionEditCtrl'
                })

                // Class          
                .state('app.class', {
                    template: '<div data-ui-view=""></div>',
                })

                .state('app.class.index', {
                    url: "/class",
                    templateUrl: 'Content/class/views/classView.html'
                })

                .state('app.class.detail', {
                    url: "/class/detail/:id",
                    templateUrl: 'Content/class/views/classView.html',
                    controller: 'detailDetailCtrl'
                })

                .state('app.class.detail.addSession', {
                    url: "/class/detail/:id/session/new",
                    modal: true,
                    templateUrl: 'Content/class/views/detail/session/classDetailSessionNewView.html',
                    controller: 'sessionNewCtrl'
                })

                .state('app.class.detail.addAttendee', {
                    url: "/class/detail/:id/attendee/new",
                    modal: true,
                    templateUrl: 'Content/class/views/detail/attendee/classDetailAttendeeNewView.html',
                    controller: 'attendeeNewCtrl'
                })

                .state('app.class.schedule', {
                    url: "/class/schedule",
                    templateUrl: 'Content/class/views/schedule/classScheduleView.html'
                })

                .state('app.class.index.edit', {
                    url: "/class/:id",
                    modal: true,
                    templateUrl: 'Content/class/views/classView.html',    // TODO: correct view path and controller for app.class.index.edit?
                    controller: 'attendeeNewCtrl'
                })

                // Calendar        
                .state('app.calendar', {
                    url: "/class/calendar",
                    templateUrl: 'Content/class/views/calendar/classCalendarView.html',
                    controller: 'calendarCalendarCtrl'
                })

                // Courses
                .state('app.course', {
                    template: '<div data-ui-view=""></div>',
                })

                .state('app.course.index', {
                    url: "/course",
                    templateUrl: 'Content/course/views/courseView.html',
                    controller: 'courseIndexCtrl'
                })

                .state('app.course.index.new', {
                    url: "/course/new",
                    modal: true,
                    templateUrl: 'Content/course/views/courseNewView.html',
                    controller: 'courseNewCtrl'
                })

                .state('app.course.index.edit', {
                    url: "/course/:id",
                    modal: true,
                    templateUrl: 'Content/course/views/courseEditView.html',
                    controller: 'courseEditCtrl'
                })

                // Crew        
                .state('app.crew', {
                    template: '<div data-ui-view=""></div>',
                })

                .state('app.crew.index', {
                    url: "/crew",
                    templateUrl: 'Content/crew/views/crewView.html',
                    controller: 'crewIndexCtrl'
                })

                .state('app.crew.index.new', {
                    url: "/crew/new",
                    modal: true,
                    templateUrl: 'Content/crew/views/crewNewView.html',
                    controller: 'crewNewCtrl'
                })

                .state('app.crew.detail', {
                    url: "/crew/:id",
                    templateUrl: 'Content/crew/views/crewDetailView.html',
                    controller: 'crewDetailCtrl'
                })

                .state('app.crew.detail.addMember', {
                    url: "/crew/:id/members/new",
                    modal: true,
                    templateUrl: 'Content/crew/views/members/crewMembersNewView.html',  // TODO: found two views -> add-to-crew and crew members
                    controller: 'membersNewCtrl'
                })

                // Employee        
                .state('app.employee', {
                    template: '<div data-ui-view=""></div>',
                })

                .state('app.employee.index', {
                    url: "/employee",
                    templateUrl: 'Content/employee/views/employeeView.html',
                    controller: 'employeeIndexCtrl'
                })

                .state('app.employee.indexCerts', {
                    url: "/employee?course&expired",
                    templateUrl: 'Content/employee/views/employeeView.html',  // TODO: locate correct view and controller
                    controller: 'employeeIndexCtrl'
                })
                             
                .state('app.employee.expiredCerts', {
                    url: "/employee/expired",
                    templateUrl: 'Content/employee/views/expired/employeeExpiredView.html',  
                    controller: 'expiredIndexCtrl'
                })

                .state('app.employee.expiringCerts', {
                    url: "/employee/expiring",
                    templateUrl: 'Content/employee/views/expiring/employeeExpiringView.html',  
                    controller: 'expiringIndexCtrl'
                })

                .state('app.employee.expiringMedicals', {
                    url: "/employee/expiringmeds",
                    templateUrl: 'Content/employee/views/expiringmeds/employeeExpiringMedsView.html',  
                    controller: 'expiringmedsIndexCtrl'
                })

                .state('app.employee.index.new', {
                    url: "/employee/new",
                    modal: true,
                    templateUrl: 'Content/employee/views/employeeNewView.html',  
                    controller: 'employeeNewCtrl'
                })

                .state('app.employee.detail', {
                    url: "/employee/:id",
                    templateUrl: 'Content/employee/views/employeeDetailView.html',  
                    controller: 'employeeDetailCtrl'
                })

                .state('app.employee.detail.addCert', {
                    url: "/employee/:id/certification/new",
                    modal: true,
                    templateUrl: 'Content/employee/views/certification/employeeCertificationNewView.html',  
                    controller: 'certificationNewCtrl'
                })

                .state('app.employee.detail.editCert', {
                    url: "/employee/:id/certification/:cert/edit",
                    modal: true,
                    templateUrl: 'Content/employee/views/certification/employeeCertificationNewView.html',  
                    controller: 'certificationEditCtrl'
                })

                .state('app.employee.detail.addMedical', {
                    url: "/employee/:id/medicals/new",
                    modal: true,
                    templateUrl: 'Content/employee/views/medicals/employeeMedicalsNewView.html',  
                    controller: 'medicalsNewCtrl'
                })

                .state('app.employee.detail.editMedical', {
                    url: "/employee/:id/medicals/:med/edit",
                    modal: true,
                    templateUrl: 'Content/employee/views/medicals/employeeMedicalsEditView.html',  
                    controller: 'medicalsEditCtrl'
                })

                .state('app.employee.detail.addNote', {
                    url: "/employee/:id/note",
                    modal: true,
                    templateUrl: 'Content/employee/views/note/employeeNoteNewView.html',  
                    controller: 'noteNewCtrl'
                })

                .state('app.employee.detail.editNote', {
                    url: "/employee/:id/note/:note",
                    modal: true,
                    templateUrl: 'Content/employee/views/note/employeeNoteEditView.html',  
                    controller: 'noteEditCtrl'
                })
                
                // Instructor        
                .state('app.instructor', {
                    template: '<div data-ui-view=""></div>',
                })

                .state('app.instructor.index', {
                    url: "/instructor",
                    templateUrl: 'Content/instructor/views/instructorView.html',
                    controller: 'instructorIndexCtrl'
                })

                .state('app.instructor.index.new', {
                    url: "/instructor/new",
                    modal: true,
                    templateUrl: 'Content/instructor/views/instructorNewView.html',
                    controller: 'instructorNewCtrl'
                })

                .state('app.instructor.index.edit', {
                    url: "/instructor/:id",
                    modal: true,
                    templateUrl: 'Content/instructor/views/instructorEditView.html',
                    controller: 'instructorEditCtrl'
                })

                // User      
                .state('app.user', {
                    template: '<div data-ui-view=""></div>',
                })

                // Etc.
                .state('image', {
                    url: 'Content/imgs/:path'
                });
                       
            $locationProvider.html5Mode(true);

            // Interceptor for web tokens
            $httpProvider.interceptors.push('tokenFactoryInterceptor');


        }]).run(['$rootScope', '$http', '$state', '$stateParams', '$templateCache', '$location',
        function ($rootScope, $http, $state, $stateParams, $templateCache, $location) {
            $rootScope.hasAccess = function (flag) {
                return $.inArray(flag, $rootScope.user.access) > -1
            }
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            // REMOVE
            $rootScope.test = function(){
            $http.get("api/Checklists").success(function (data) {
                if (!data.Success) {
                    console.log("error");
                } else {
                    console.log(data);
                }
                
            })    
    }


            $rootScope.$on('$stateChangeError', function (e, to, toParams, from, fromParams, error) {
                if (error && error.action === 'redirect') {
                    $state.go(error.location,{target: $state.current.url.substring(1)});
                }
            });

        }]);

// Create generic factory to be used for AJAX requests.
app.factory('dataService', ['$http', function ($http) {
    return $http;
}]);

app.filter('sce', ['$sce', '$sceDelegate', function ($sce, $sceDelegate) {
    return function (str, parseAs) {
        parseAs = parseAs ? parseAs.toUpperCase() : 'HTML';
        return $sce.trustAs($sce[parseAs], str);
    }
}]);

app.animation('.animate-slide', function () {
    return {
        enter: function (element, done) {
            $(element[0]).hide().slideDown(done);
            return function (cancelled) {
                //this (optional) function will be called when the animation
                //completes or when the animation is cancelled (the cancelled
                //flag will be set to true if cancelled).
            };
        },
        leave: function (element, done) {
            $(element[0]).show().slideUp(done);
        },
        move: function (element, done) {
        },

        //animation that can be triggered before the class is added
        beforeAddClass: function (element, className, done) {
        },

        //animation that can be triggered after the class is added
        addClass: function (element, className, done) {
        },

        //animation that can be triggered before the class is removed
        beforeRemoveClass: function (element, className, done) {
        },

        //animation that can be triggered after the class is removed
        removeClass: function (element, className, done) {
        }
    };
});
app.animation('.animate-fade', function () {
    return {
        enter: function (element, done) {
            $(element[0]).hide().fadeIn(300, done);
            return function (cancelled) {
                //this (optional) function will be called when the animation
                //completes or when the animation is cancelled (the cancelled
                //flag will be set to true if cancelled).
            };
        },
        leave: function (element, done) {
            $(element[0]).show().fadeOut(300, done);
        },
        move: function (element, done) {
        },

        //animation that can be triggered before the class is added
        beforeAddClass: function (element, className, done) {
        },

        //animation that can be triggered after the class is added
        addClass: function (element, className, done) {
        },

        //animation that can be triggered before the class is removed
        beforeRemoveClass: function (element, className, done) {
        },

        //animation that can be triggered after the class is removed
        removeClass: function (element, className, done) {
        }
    };
});












/**
 * Created by Evan on 3/1/14.
 */

'use strict';

app.controller('adminDashboardIndexCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {

    init();

    function init() {

    }

}]);



'use strict';

app.controller('projectChecklistIndexCtrl', ['$scope', '$stateParams','api',  function ($scope, $stateParams, api) {
    
    var checklist = new api("Checklists");
    var jobs = new api("Jobs");

    checklist.getAll().success(function (data) {
        $scope.existingJobs = data.value;
    }).error(function (data) { console.log("Failed to load existing processes"); });

    jobs.getAll().success(function (data) {
        $scope.allJobs = data.value;
    }).error(function (data) {
        console.log("Failed to get jobs")
    });

    init();

   

    function init() {

    }

}]);




/**
 * Created by Evan on 3/1/14.
 */

'use strict';

// TODO: decompose $HTTP into auth service

app.controller('loginIndexCtrl', ['$scope', '$window', '$stateParams', '$timeout', '$state', '$http', '$rootScope', function ($scope, $window, $stateParams, $timeout, $state, $http, $rootScope) {
    init();
    $scope.isBusy = false;
    $scope.login = function (creds) {
        
        var url = "/api/Auth";

        if ($scope.loginForm.$valid) {
            $scope.submitting = true;
            $scope.isBusy = true;
                
            $http.post(url, creds).success(function (data) {
                if (!data.Success) {
                    $scope.submitting = false;
                    $scope.loginForm.error = 'Could not log in, please check your username and password.';
                    console.log("Incorrect username / password.");
                } else {
                    $rootScope.user = data.User;
                    // Set UserID as token
                    $window.localStorage.setItem('token', data.User.id);
                    $state.go('app.dashboard');
                }
                $scope.isBusy = false;
                
            })
            .error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.isBusy = false;
            });

        }
    };

    function init() {

    }

}]);


/*************************
Pixis | Safety Training App 

loginFactory.js

Auth: TmAck.072 <tonymclaughlin72@gmail.com> 
Date: 3/27/15
*************************/

'use strict';

app.factory('loginFactory', function($rootScope, $http){

return {
        login: function(creds) {
            //TODO: stub out $http with a promise
        }
    };    
});
/**
 *
 */

'use strict';

app.controller('classIndexCtrl', ['$scope', '$stateParams', 'api', 'odata', '$rootScope', function ($scope, $stateParams, api, odata, $rootScope) {

    $scope.ClassService = new api('Class');

    $scope.classes = $scope.ClassService.grid;

    $scope.expOptions = [{ name: '', val: '' }, { name: 'Yes', val: 'YES' }, { name: 'No', val: 'NO' }];

    $scope.grid = {
        search: '',
        status: 1,
        page: 1,
        filter: {},
        orderBy: ['ClassName'],
        ipp: 30,
        reverse: false,
        expand: ['ClassAttendees', 'Instructor']
    };

    $scope.$watchCollection('grid', function (newVal, oldVal) {
        updateGrid();
    });


    $scope.odata = function () {

        return odata.queryString({ filter: $scope.grid.filter, orderBy: $scope.grid.orderBy, reverse: $scope.grid.reverse });
    };

    init();

    function init() {
        updateGrid()
    }

    function updateGrid() {
        var andQ = [];
        var qwords = $scope.grid.search.replace(',', '').split(' ');

        $.each(qwords, function (i, word) {
            if (!isNaN(parseInt(word)))
                word = word+'!'; //add '!' to recognize int as string in odata filter  
            andQ.push({ ClassName: { contains: word } });
        });
        //isNaN()

        if ($scope.grid.Completed != undefined && $scope.grid.Completed != '')
            andQ.push({ Completed: { '=': $scope.grid.Completed == 'YES' ? true : false } });

        if ($scope.grid.ScheduledStartDate != undefined && $scope.grid.ScheduledStartDate != '')
            andQ.push({ ScheduledStartDate: { '>': $scope.grid.ScheduledStartDate } });

        if ($scope.grid.ScheduledEndDate != undefined && $scope.grid.ScheduledEndDate != '')
            andQ.push({ ScheduledEndDate: { '<': $scope.grid.ScheduledEndDate } });

        if ($scope.grid.Instructor != undefined && $scope.grid.Instructor != null)
            andQ.push({ InstructorID: { '=': $scope.grid.Instructor.id } });

        $scope.grid.filter.and = andQ;
        $scope.ClassService.get($scope.grid.page, $scope.grid.ipp, $scope.grid.filter, $scope.grid.orderBy, $scope.grid.reverse, $scope.grid.expand);

    }

}]);

/**
 * Created by Evan on 3/2/14.
 */

'use strict';

app.controller('classShowCtrl', ['$scope', '$stateParams', 'api', '$location',function ($scope, $stateParams, api, $location) {
    $scope.ClassService = new api('Class');        

    init();
    function init() {

        $scope.ClassService.getById($stateParams.id, { expand: ['ClassAttendees/Employee', 'ClassAttendees/Employee/TLCompany', 'ClassSessions/Course', 'Instructor', 'Region', 'LocationCode'] }).success(function (data) {
            $scope.class = data;
        });

    }

}]);
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


/**
 * Created by Evan on 3/1/14.
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

/**
 * Created by Evan on 3/1/14.
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

/**
 * Created by Evan on 3/1/14.
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

/**
 * Created by Evan on 3/4/14.
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

/**
 * Created by Evan on 3/1/14.
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
/**
 * Created by Evan on 3/1/14.
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
/**
 * Created by Evan on 3/1/14.
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
/**
 * Created by Evan on 3/1/14.
 */

'use strict';

// TODO: mocks at bottom

app.factory('locations', ['dataService', '$filter', function (dataService, $filter) {

    var LocationObject = {};
        
    LocationObject.locations = {
        total: 0,
        data: []
    };

    LocationObject.getLocations = function(page, ipp, filter, orderBy, reverse) {
        var data = {page: page, ipp: ipp, filter: filter, orderBy: orderBy, reverse: reverse};
        if (angular.isObject(page))
            data = page;
        data.page = data.page || 1;
        data.ipp = data.ipp || 30;

        // TODO: remove fakeness and hook up API
        // fakeness
        var respData = ($filter('orderBy')($filter('filter')(fakeLocations, data.filter), data.orderBy, data.reverse));
        var resp = {
            Data: respData.slice((data.page - 1) * data.ipp, data.page * data.ipp),
            Count: respData && respData.length
        };

        // get the data from API.
        // dataService.get('/Api/Location',data).success(function(resp){
        LocationObject.locations.total = resp.Count;
        angular.copy(resp.Data, LocationObject.locations.data);
        // });
    };

    LocationObject.getLocationById = function(id){
        // TODO: remove fakeness and hook up API
        return angular.copy(fakeLocations[id]);
    };

    LocationObject.updateLocation = function(id, data){
        // TODO: remove fakeness and hook up API
        data.LocationID = id;
        fakeLocations[id] = data;
    };

    LocationObject.createLocation = function(data){
        // TODO: remove fakeness and hook up API
        data.LocationID = fakeLocations.length;
        fakeLocations.push(data);
    };

    // Removes location, not terminate, more destructive
    LocationObject.removeLocation = function(id){
        // TODO: remove fakeness and hook up API
        fakeLocations.slice(id,1);
    };

    LocationObject.getAll = function(){
        // TODO: remove fakeness and hook up API
        return angular.copy(fakeLocations);
    };

    return LocationObject;
}]);

var fakeLocations = [
    {
        "LocationID": 0,
        "TLLocation": "Frolix",
        "LocationFirstName": "Ophelia",
        "LocationLastName": "Farmer",
        "LocationStatusID": false,
        "DBID": "sit nisi",
        "Occupation": "et enim",
        "Department": "laboris duis",
        "CreatedOn": "2008-01-26T12:41:45+05:00",
        "CreatedBy": 9,
        "ModifiedOn": "2009-10-13T13:37:26+04:00",
        "ModifiedBy": 8,
        "HireDate": "2001-04-07T23:21:18+04:00",
        "PositionId": 7
    },
    {
        "LocationID": 1,
        "TLLocation": "Zidant",
        "LocationFirstName": "Annette",
        "LocationLastName": "Mercado",
        "LocationStatusID": false,
        "DBID": "culpa Lorem",
        "Occupation": "mollit aute",
        "Department": "sint pariatur",
        "CreatedOn": "1998-02-28T20:44:30+05:00",
        "CreatedBy": 6,
        "ModifiedOn": "2010-01-18T00:48:35+05:00",
        "ModifiedBy": 3,
        "HireDate": "1996-07-25T16:44:27+04:00",
        "PositionId": 4
    },
    {
        "LocationID": 2,
        "TLLocation": "Pathways",
        "LocationFirstName": "Peck",
        "LocationLastName": "Obrien",
        "LocationStatusID": false,
        "DBID": "esse aliqua",
        "Occupation": "ullamco occaecat",
        "Department": "culpa ad",
        "CreatedOn": "1995-12-04T09:58:43+05:00",
        "CreatedBy": 6,
        "ModifiedOn": "1989-09-15T20:13:51+04:00",
        "ModifiedBy": 7,
        "HireDate": "1990-02-22T20:23:14+05:00",
        "PositionId": 6
    },
    {
        "LocationID": 3,
        "TLLocation": "Cosmetex",
        "LocationFirstName": "Scott",
        "LocationLastName": "Walter",
        "LocationStatusID": true,
        "DBID": "esse amet",
        "Occupation": "est do",
        "Department": "sunt enim",
        "CreatedOn": "1990-04-11T06:21:04+04:00",
        "CreatedBy": 2,
        "ModifiedOn": "2008-09-04T11:52:56+04:00",
        "ModifiedBy": 3,
        "HireDate": "2007-08-11T03:50:31+04:00",
        "PositionId": 9
    },
    {
        "LocationID": 4,
        "TLLocation": "Aquasseur",
        "LocationFirstName": "Booker",
        "LocationLastName": "Webb",
        "LocationStatusID": false,
        "DBID": "culpa et",
        "Occupation": "cupidatat deserunt",
        "Department": "officia officia",
        "CreatedOn": "1992-09-15T00:39:28+04:00",
        "CreatedBy": 5,
        "ModifiedOn": "2002-10-04T11:19:04+04:00",
        "ModifiedBy": 8,
        "HireDate": "1990-12-01T16:32:50+05:00",
        "PositionId": 6
    },
    {
        "LocationID": 5,
        "TLLocation": "Bunga",
        "LocationFirstName": "Trina",
        "LocationLastName": "Haney",
        "LocationStatusID": false,
        "DBID": "anim tempor",
        "Occupation": "laborum aliquip",
        "Department": "qui duis",
        "CreatedOn": "2010-04-03T00:29:23+04:00",
        "CreatedBy": 5,
        "ModifiedOn": "1998-07-17T03:58:11+04:00",
        "ModifiedBy": 9,
        "HireDate": "1994-01-01T19:51:23+05:00",
        "PositionId": 4
    },
    {
        "LocationID": 6,
        "TLLocation": "Austech",
        "LocationFirstName": "Alvarado",
        "LocationLastName": "James",
        "LocationStatusID": false,
        "DBID": "incididunt dolore",
        "Occupation": "aliqua exercitation",
        "Department": "occaecat irure",
        "CreatedOn": "2003-07-12T04:03:58+04:00",
        "CreatedBy": 5,
        "ModifiedOn": "2000-09-13T10:16:35+04:00",
        "ModifiedBy": 9,
        "HireDate": "1995-07-01T07:37:05+04:00",
        "PositionId": 2
    },
    {
        "LocationID": 7,
        "TLLocation": "Plexia",
        "LocationFirstName": "Alma",
        "LocationLastName": "Floyd",
        "LocationStatusID": true,
        "DBID": "duis enim",
        "Occupation": "ipsum elit",
        "Department": "ipsum consectetur",
        "CreatedOn": "1999-01-25T15:22:36+05:00",
        "CreatedBy": 8,
        "ModifiedOn": "1992-11-22T08:43:21+05:00",
        "ModifiedBy": 2,
        "HireDate": "1988-04-21T09:08:17+04:00",
        "PositionId": 8
    },
    {
        "LocationID": 8,
        "TLLocation": "Fitcore",
        "LocationFirstName": "Althea",
        "LocationLastName": "Marks",
        "LocationStatusID": false,
        "DBID": "eiusmod consectetur",
        "Occupation": "exercitation Lorem",
        "Department": "labore occaecat",
        "CreatedOn": "2014-02-12T05:18:11+05:00",
        "CreatedBy": 8,
        "ModifiedOn": "2014-02-18T02:29:36+05:00",
        "ModifiedBy": 10,
        "HireDate": "1989-08-08T05:41:40+04:00",
        "PositionId": 10
    },
    {
        "LocationID": 9,
        "TLLocation": "Lunchpod",
        "LocationFirstName": "Eloise",
        "LocationLastName": "Mclean",
        "LocationStatusID": false,
        "DBID": "consectetur consequat",
        "Occupation": "sunt veniam",
        "Department": "do laboris",
        "CreatedOn": "1998-12-21T22:02:15+05:00",
        "CreatedBy": 6,
        "ModifiedOn": "2007-11-07T00:22:24+05:00",
        "ModifiedBy": 1,
        "HireDate": "2011-07-03T10:58:31+04:00",
        "PositionId": 2
    },
    {
        "LocationID": 10,
        "TLLocation": "Comstar",
        "LocationFirstName": "Duke",
        "LocationLastName": "Vang",
        "LocationStatusID": true,
        "DBID": "aute tempor",
        "Occupation": "nisi ea",
        "Department": "ut esse",
        "CreatedOn": "2010-06-25T04:08:26+04:00",
        "CreatedBy": 5,
        "ModifiedOn": "1997-04-02T16:17:01+04:00",
        "ModifiedBy": 4,
        "HireDate": "1999-12-04T13:53:19+05:00",
        "PositionId": 2
    },
    {
        "LocationID": 11,
        "TLLocation": "Metroz",
        "LocationFirstName": "Ginger",
        "LocationLastName": "Mullins",
        "LocationStatusID": false,
        "DBID": "eiusmod id",
        "Occupation": "nisi cupidatat",
        "Department": "tempor incididunt",
        "CreatedOn": "2000-08-25T06:57:24+04:00",
        "CreatedBy": 3,
        "ModifiedOn": "1992-06-15T03:44:02+04:00",
        "ModifiedBy": 7,
        "HireDate": "2004-10-31T19:50:49+04:00",
        "PositionId": 7
    },
    {
        "LocationID": 12,
        "TLLocation": "Providco",
        "LocationFirstName": "Higgins",
        "LocationLastName": "Donaldson",
        "LocationStatusID": false,
        "DBID": "fugiat enim",
        "Occupation": "ullamco eiusmod",
        "Department": "laboris ipsum",
        "CreatedOn": "2008-01-16T17:55:40+05:00",
        "CreatedBy": 3,
        "ModifiedOn": "1992-10-02T11:10:50+04:00",
        "ModifiedBy": 8,
        "HireDate": "2012-02-15T02:33:41+05:00",
        "PositionId": 7
    },
    {
        "LocationID": 13,
        "TLLocation": "Egypto",
        "LocationFirstName": "Evangelina",
        "LocationLastName": "Gilliam",
        "LocationStatusID": true,
        "DBID": "nostrud consectetur",
        "Occupation": "excepteur et",
        "Department": "ut quis",
        "CreatedOn": "2007-07-01T13:05:02+04:00",
        "CreatedBy": 5,
        "ModifiedOn": "2011-01-13T13:41:52+05:00",
        "ModifiedBy": 5,
        "HireDate": "2010-03-16T15:55:10+04:00",
        "PositionId": 4
    },
    {
        "LocationID": 14,
        "TLLocation": "Medicroix",
        "LocationFirstName": "Dunn",
        "LocationLastName": "Short",
        "LocationStatusID": true,
        "DBID": "labore qui",
        "Occupation": "reprehenderit veniam",
        "Department": "adipisicing exercitation",
        "CreatedOn": "2011-02-10T02:38:56+05:00",
        "CreatedBy": 2,
        "ModifiedOn": "1996-07-17T00:08:47+04:00",
        "ModifiedBy": 10,
        "HireDate": "2008-10-01T08:38:18+04:00",
        "PositionId": 8
    },
    {
        "LocationID": 15,
        "TLLocation": "Glasstep",
        "LocationFirstName": "Gill",
        "LocationLastName": "Barrett",
        "LocationStatusID": true,
        "DBID": "sit aute",
        "Occupation": "veniam ipsum",
        "Department": "excepteur sunt",
        "CreatedOn": "2003-02-16T07:36:05+05:00",
        "CreatedBy": 8,
        "ModifiedOn": "1996-12-14T20:22:05+05:00",
        "ModifiedBy": 4,
        "HireDate": "1992-08-27T22:06:56+04:00",
        "PositionId": 8
    },
    {
        "LocationID": 16,
        "TLLocation": "Zytrax",
        "LocationFirstName": "Mullen",
        "LocationLastName": "Vance",
        "LocationStatusID": true,
        "DBID": "consequat sunt",
        "Occupation": "consectetur qui",
        "Department": "ea minim",
        "CreatedOn": "2003-07-05T09:22:02+04:00",
        "CreatedBy": 5,
        "ModifiedOn": "2003-05-24T14:39:44+04:00",
        "ModifiedBy": 7,
        "HireDate": "2003-10-22T13:59:24+04:00",
        "PositionId": 3
    },
    {
        "LocationID": 17,
        "TLLocation": "Corporana",
        "LocationFirstName": "Ellis",
        "LocationLastName": "Le",
        "LocationStatusID": false,
        "DBID": "culpa incididunt",
        "Occupation": "in voluptate",
        "Department": "occaecat non",
        "CreatedOn": "1998-06-16T20:52:11+04:00",
        "CreatedBy": 2,
        "ModifiedOn": "2004-07-29T04:23:43+04:00",
        "ModifiedBy": 6,
        "HireDate": "1999-03-22T20:03:35+04:00",
        "PositionId": 3
    },
    {
        "LocationID": 18,
        "TLLocation": "Bicol",
        "LocationFirstName": "Jenkins",
        "LocationLastName": "Suarez",
        "LocationStatusID": true,
        "DBID": "proident ullamco",
        "Occupation": "exercitation aliquip",
        "Department": "id commodo",
        "CreatedOn": "2014-02-04T11:57:39+05:00",
        "CreatedBy": 9,
        "ModifiedOn": "2006-08-01T10:22:44+04:00",
        "ModifiedBy": 7,
        "HireDate": "1989-05-08T11:30:04+04:00",
        "PositionId": 5
    },
    {
        "LocationID": 19,
        "TLLocation": "Zaggles",
        "LocationFirstName": "Norris",
        "LocationLastName": "Alexander",
        "LocationStatusID": true,
        "DBID": "do incididunt",
        "Occupation": "do deserunt",
        "Department": "ipsum Lorem",
        "CreatedOn": "2002-01-10T17:19:36+05:00",
        "CreatedBy": 9,
        "ModifiedOn": "1991-01-25T14:30:53+05:00",
        "ModifiedBy": 5,
        "HireDate": "1992-07-16T20:00:08+04:00",
        "PositionId": 5
    },
    {
        "LocationID": 20,
        "TLLocation": "Skyplex",
        "LocationFirstName": "Blackwell",
        "LocationLastName": "Erickson",
        "LocationStatusID": false,
        "DBID": "nisi cupidatat",
        "Occupation": "velit ut",
        "Department": "aliquip nulla",
        "CreatedOn": "1992-04-20T21:22:10+04:00",
        "CreatedBy": 1,
        "ModifiedOn": "2006-12-24T21:41:29+05:00",
        "ModifiedBy": 5,
        "HireDate": "1993-01-11T19:49:38+05:00",
        "PositionId": 6
    },
    {
        "LocationID": 21,
        "TLLocation": "Accusage",
        "LocationFirstName": "Glass",
        "LocationLastName": "Compton",
        "LocationStatusID": true,
        "DBID": "qui labore",
        "Occupation": "laboris cupidatat",
        "Department": "et proident",
        "CreatedOn": "2014-02-28T00:20:22+05:00",
        "CreatedBy": 10,
        "ModifiedOn": "1990-04-18T23:28:44+04:00",
        "ModifiedBy": 1,
        "HireDate": "1988-02-12T10:10:31+05:00",
        "PositionId": 9
    },
    {
        "LocationID": 22,
        "TLLocation": "Intergeek",
        "LocationFirstName": "Trudy",
        "LocationLastName": "Hall",
        "LocationStatusID": true,
        "DBID": "officia est",
        "Occupation": "dolore enim",
        "Department": "anim amet",
        "CreatedOn": "1988-02-20T22:56:32+05:00",
        "CreatedBy": 4,
        "ModifiedOn": "1991-04-09T06:58:03+04:00",
        "ModifiedBy": 2,
        "HireDate": "2005-08-27T03:02:44+04:00",
        "PositionId": 7
    },
    {
        "LocationID": 23,
        "TLLocation": "Enerforce",
        "LocationFirstName": "Chaney",
        "LocationLastName": "Tran",
        "LocationStatusID": false,
        "DBID": "in aliqua",
        "Occupation": "voluptate magna",
        "Department": "culpa consequat",
        "CreatedOn": "2013-07-16T12:46:11+04:00",
        "CreatedBy": 8,
        "ModifiedOn": "2013-10-02T17:07:37+04:00",
        "ModifiedBy": 4,
        "HireDate": "1988-04-27T11:02:08+04:00",
        "PositionId": 6
    },
    {
        "LocationID": 24,
        "TLLocation": "Farmex",
        "LocationFirstName": "Elba",
        "LocationLastName": "Hoffman",
        "LocationStatusID": true,
        "DBID": "consectetur commodo",
        "Occupation": "ad nisi",
        "Department": "id magna",
        "CreatedOn": "2006-10-27T15:14:28+04:00",
        "CreatedBy": 4,
        "ModifiedOn": "2008-10-25T22:56:25+04:00",
        "ModifiedBy": 5,
        "HireDate": "2010-11-06T03:19:21+04:00",
        "PositionId": 7
    },
    {
        "LocationID": 25,
        "TLLocation": "Soprano",
        "LocationFirstName": "Jolene",
        "LocationLastName": "Morrow",
        "LocationStatusID": false,
        "DBID": "minim proident",
        "Occupation": "laborum id",
        "Department": "dolore dolor",
        "CreatedOn": "1992-12-16T23:19:39+05:00",
        "CreatedBy": 2,
        "ModifiedOn": "1993-03-27T16:21:47+04:00",
        "ModifiedBy": 6,
        "HireDate": "2013-05-28T08:28:11+04:00",
        "PositionId": 6
    },
    {
        "LocationID": 26,
        "TLLocation": "Ecosys",
        "LocationFirstName": "Pat",
        "LocationLastName": "Frost",
        "LocationStatusID": false,
        "DBID": "exercitation sit",
        "Occupation": "fugiat occaecat",
        "Department": "anim eu",
        "CreatedOn": "2011-05-15T06:04:01+04:00",
        "CreatedBy": 1,
        "ModifiedOn": "2013-07-17T10:13:27+04:00",
        "ModifiedBy": 4,
        "HireDate": "2010-03-11T15:47:56+05:00",
        "PositionId": 9
    },
    {
        "LocationID": 27,
        "TLLocation": "Portalis",
        "LocationFirstName": "Cara",
        "LocationLastName": "Dennis",
        "LocationStatusID": true,
        "DBID": "sint non",
        "Occupation": "est duis",
        "Department": "consequat quis",
        "CreatedOn": "1991-07-08T18:30:08+04:00",
        "CreatedBy": 4,
        "ModifiedOn": "1995-02-09T13:24:20+05:00",
        "ModifiedBy": 3,
        "HireDate": "1988-06-24T09:37:22+04:00",
        "PositionId": 3
    },
    {
        "LocationID": 28,
        "TLLocation": "Geeknet",
        "LocationFirstName": "Lynn",
        "LocationLastName": "White",
        "LocationStatusID": true,
        "DBID": "ipsum cupidatat",
        "Occupation": "enim ut",
        "Department": "aliqua nisi",
        "CreatedOn": "1988-05-05T18:08:41+04:00",
        "CreatedBy": 6,
        "ModifiedOn": "1989-05-30T01:11:26+04:00",
        "ModifiedBy": 7,
        "HireDate": "1999-03-27T17:59:12+04:00",
        "PositionId": 8
    },
    {
        "LocationID": 29,
        "TLLocation": "Comvene",
        "LocationFirstName": "Salinas",
        "LocationLastName": "Dunn",
        "LocationStatusID": false,
        "DBID": "culpa aliquip",
        "Occupation": "consectetur consectetur",
        "Department": "dolor laboris",
        "CreatedOn": "2007-03-29T04:15:11+04:00",
        "CreatedBy": 1,
        "ModifiedOn": "2005-06-09T23:34:24+04:00",
        "ModifiedBy": 2,
        "HireDate": "1999-01-24T13:37:45+05:00",
        "PositionId": 9
    },
    {
        "LocationID": 30,
        "TLLocation": "Geoforma",
        "LocationFirstName": "Frye",
        "LocationLastName": "Cline",
        "LocationStatusID": false,
        "DBID": "fugiat elit",
        "Occupation": "tempor ad",
        "Department": "deserunt pariatur",
        "CreatedOn": "1998-02-14T14:40:07+05:00",
        "CreatedBy": 6,
        "ModifiedOn": "1989-09-10T09:36:10+04:00",
        "ModifiedBy": 1,
        "HireDate": "2005-05-10T02:01:19+04:00",
        "PositionId": 2
    },
    {
        "LocationID": 31,
        "TLLocation": "Quizmo",
        "LocationFirstName": "Wilder",
        "LocationLastName": "Holloway",
        "LocationStatusID": false,
        "DBID": "non reprehenderit",
        "Occupation": "sit incididunt",
        "Department": "quis cillum",
        "CreatedOn": "2007-03-31T22:39:31+04:00",
        "CreatedBy": 2,
        "ModifiedOn": "2003-11-04T00:26:39+05:00",
        "ModifiedBy": 9,
        "HireDate": "2006-10-05T05:28:46+04:00",
        "PositionId": 5
    },
    {
        "LocationID": 32,
        "TLLocation": "Orbiflex",
        "LocationFirstName": "Hollie",
        "LocationLastName": "Hill",
        "LocationStatusID": true,
        "DBID": "ex ullamco",
        "Occupation": "ullamco non",
        "Department": "cillum est",
        "CreatedOn": "1991-07-16T06:40:42+04:00",
        "CreatedBy": 5,
        "ModifiedOn": "2012-04-12T23:10:40+04:00",
        "ModifiedBy": 10,
        "HireDate": "1996-02-20T21:28:07+05:00",
        "PositionId": 9
    },
    {
        "LocationID": 33,
        "TLLocation": "Pasturia",
        "LocationFirstName": "Loretta",
        "LocationLastName": "Morse",
        "LocationStatusID": false,
        "DBID": "consectetur consequat",
        "Occupation": "amet elit",
        "Department": "sunt sit",
        "CreatedOn": "2005-06-06T09:11:58+04:00",
        "CreatedBy": 8,
        "ModifiedOn": "1988-06-08T15:37:50+04:00",
        "ModifiedBy": 3,
        "HireDate": "1988-01-04T04:41:28+05:00",
        "PositionId": 10
    },
    {
        "LocationID": 34,
        "TLLocation": "Exoblue",
        "LocationFirstName": "Blankenship",
        "LocationLastName": "Richards",
        "LocationStatusID": true,
        "DBID": "cupidatat nulla",
        "Occupation": "do nisi",
        "Department": "ullamco cillum",
        "CreatedOn": "2000-05-17T07:46:55+04:00",
        "CreatedBy": 9,
        "ModifiedOn": "1994-01-26T23:30:38+05:00",
        "ModifiedBy": 7,
        "HireDate": "1992-07-09T12:18:27+04:00",
        "PositionId": 3
    },
    {
        "LocationID": 35,
        "TLLocation": "Geekwagon",
        "LocationFirstName": "Smith",
        "LocationLastName": "Conley",
        "LocationStatusID": false,
        "DBID": "officia consectetur",
        "Occupation": "culpa dolore",
        "Department": "amet duis",
        "CreatedOn": "1993-05-09T04:55:33+04:00",
        "CreatedBy": 10,
        "ModifiedOn": "2000-05-20T21:04:43+04:00",
        "ModifiedBy": 2,
        "HireDate": "2003-03-20T07:26:04+04:00",
        "PositionId": 7
    },
    {
        "LocationID": 36,
        "TLLocation": "Gazak",
        "LocationFirstName": "Kirkland",
        "LocationLastName": "Fischer",
        "LocationStatusID": false,
        "DBID": "reprehenderit nostrud",
        "Occupation": "quis aliquip",
        "Department": "ex consectetur",
        "CreatedOn": "1996-02-24T21:10:13+05:00",
        "CreatedBy": 4,
        "ModifiedOn": "2009-10-28T19:03:53+04:00",
        "ModifiedBy": 10,
        "HireDate": "2002-11-23T23:52:47+05:00",
        "PositionId": 7
    },
    {
        "LocationID": 37,
        "TLLocation": "Zentix",
        "LocationFirstName": "Flossie",
        "LocationLastName": "Rodriguez",
        "LocationStatusID": true,
        "DBID": "fugiat et",
        "Occupation": "ullamco aute",
        "Department": "commodo nostrud",
        "CreatedOn": "2012-05-14T19:39:13+04:00",
        "CreatedBy": 2,
        "ModifiedOn": "2004-01-10T00:42:04+05:00",
        "ModifiedBy": 1,
        "HireDate": "2011-08-04T20:57:53+04:00",
        "PositionId": 1
    },
    {
        "LocationID": 38,
        "TLLocation": "Sureplex",
        "LocationFirstName": "Avery",
        "LocationLastName": "Knox",
        "LocationStatusID": true,
        "DBID": "duis magna",
        "Occupation": "consectetur consectetur",
        "Department": "labore ipsum",
        "CreatedOn": "2008-02-12T04:18:10+05:00",
        "CreatedBy": 8,
        "ModifiedOn": "2004-11-19T02:50:22+05:00",
        "ModifiedBy": 9,
        "HireDate": "1997-06-12T11:03:08+04:00",
        "PositionId": 10
    },
    {
        "LocationID": 39,
        "TLLocation": "Panzent",
        "LocationFirstName": "Rodriquez",
        "LocationLastName": "Sharpe",
        "LocationStatusID": true,
        "DBID": "excepteur voluptate",
        "Occupation": "aute deserunt",
        "Department": "consectetur velit",
        "CreatedOn": "1990-09-16T04:41:00+04:00",
        "CreatedBy": 3,
        "ModifiedOn": "2009-08-12T02:14:29+04:00",
        "ModifiedBy": 3,
        "HireDate": "2001-09-03T18:30:17+04:00",
        "PositionId": 3
    },
    {
        "LocationID": 40,
        "TLLocation": "Conferia",
        "LocationFirstName": "Kimberley",
        "LocationLastName": "Stanley",
        "LocationStatusID": false,
        "DBID": "et nulla",
        "Occupation": "et et",
        "Department": "ut eiusmod",
        "CreatedOn": "1999-04-05T03:50:04+04:00",
        "CreatedBy": 9,
        "ModifiedOn": "2012-08-22T20:42:52+04:00",
        "ModifiedBy": 4,
        "HireDate": "2012-09-01T13:17:32+04:00",
        "PositionId": 7
    },
    {
        "LocationID": 41,
        "TLLocation": "Sultraxin",
        "LocationFirstName": "Jo",
        "LocationLastName": "Spence",
        "LocationStatusID": true,
        "DBID": "exercitation commodo",
        "Occupation": "dolor elit",
        "Department": "cillum ex",
        "CreatedOn": "1993-12-25T16:32:40+05:00",
        "CreatedBy": 6,
        "ModifiedOn": "1999-08-16T09:21:45+04:00",
        "ModifiedBy": 5,
        "HireDate": "2005-06-18T11:37:40+04:00",
        "PositionId": 8
    },
    {
        "LocationID": 42,
        "TLLocation": "Filodyne",
        "LocationFirstName": "Delgado",
        "LocationLastName": "Barrera",
        "LocationStatusID": false,
        "DBID": "duis et",
        "Occupation": "amet ullamco",
        "Department": "irure eiusmod",
        "CreatedOn": "1988-07-11T18:43:31+04:00",
        "CreatedBy": 5,
        "ModifiedOn": "1990-09-30T00:08:10+04:00",
        "ModifiedBy": 6,
        "HireDate": "2010-05-13T05:07:12+04:00",
        "PositionId": 6
    },
    {
        "LocationID": 43,
        "TLLocation": "Enormo",
        "LocationFirstName": "Cervantes",
        "LocationLastName": "Ball",
        "LocationStatusID": false,
        "DBID": "incididunt cupidatat",
        "Occupation": "est adipisicing",
        "Department": "ipsum id",
        "CreatedOn": "1988-06-19T09:51:54+04:00",
        "CreatedBy": 9,
        "ModifiedOn": "1994-06-15T10:06:17+04:00",
        "ModifiedBy": 2,
        "HireDate": "2000-05-04T07:19:05+04:00",
        "PositionId": 1
    },
    {
        "LocationID": 44,
        "TLLocation": "Dognosis",
        "LocationFirstName": "Owens",
        "LocationLastName": "Aguilar",
        "LocationStatusID": false,
        "DBID": "nulla non",
        "Occupation": "irure anim",
        "Department": "aliqua nulla",
        "CreatedOn": "2011-05-13T21:53:39+04:00",
        "CreatedBy": 6,
        "ModifiedOn": "1991-05-22T19:09:48+04:00",
        "ModifiedBy": 6,
        "HireDate": "2008-10-16T17:47:06+04:00",
        "PositionId": 10
    },
    {
        "LocationID": 45,
        "TLLocation": "Medcom",
        "LocationFirstName": "Matthews",
        "LocationLastName": "Shepherd",
        "LocationStatusID": false,
        "DBID": "deserunt fugiat",
        "Occupation": "reprehenderit ullamco",
        "Department": "culpa cupidatat",
        "CreatedOn": "1999-09-26T17:04:13+04:00",
        "CreatedBy": 6,
        "ModifiedOn": "2009-11-29T06:25:23+05:00",
        "ModifiedBy": 2,
        "HireDate": "1998-12-10T05:23:43+05:00",
        "PositionId": 1
    },
    {
        "LocationID": 46,
        "TLLocation": "Affluex",
        "LocationFirstName": "Marissa",
        "LocationLastName": "Pollard",
        "LocationStatusID": false,
        "DBID": "non mollit",
        "Occupation": "fugiat ex",
        "Department": "nisi ex",
        "CreatedOn": "1988-03-05T15:48:23+05:00",
        "CreatedBy": 7,
        "ModifiedOn": "2014-01-06T06:03:06+05:00",
        "ModifiedBy": 10,
        "HireDate": "1998-02-01T01:43:18+05:00",
        "PositionId": 7
    },
    {
        "LocationID": 47,
        "TLLocation": "Kozgene",
        "LocationFirstName": "Sharon",
        "LocationLastName": "Brock",
        "LocationStatusID": false,
        "DBID": "dolor anim",
        "Occupation": "laboris eu",
        "Department": "aute dolore",
        "CreatedOn": "1996-11-26T22:24:47+05:00",
        "CreatedBy": 10,
        "ModifiedOn": "2010-10-01T14:43:30+04:00",
        "ModifiedBy": 9,
        "HireDate": "2008-12-15T08:04:20+05:00",
        "PositionId": 1
    },
    {
        "LocationID": 48,
        "TLLocation": "Maroptic",
        "LocationFirstName": "Minerva",
        "LocationLastName": "Simmons",
        "LocationStatusID": true,
        "DBID": "aliquip consequat",
        "Occupation": "exercitation dolor",
        "Department": "sunt eiusmod",
        "CreatedOn": "1990-10-07T02:47:14+04:00",
        "CreatedBy": 10,
        "ModifiedOn": "2001-04-08T13:05:18+04:00",
        "ModifiedBy": 9,
        "HireDate": "2009-06-12T04:19:56+04:00",
        "PositionId": 9
    },
    {
        "LocationID": 49,
        "TLLocation": "Koogle",
        "LocationFirstName": "Zelma",
        "LocationLastName": "Hull",
        "LocationStatusID": true,
        "DBID": "dolor et",
        "Occupation": "aliqua labore",
        "Department": "aliquip elit",
        "TerminationDate": "2005-11-21T17:10:37+05:00",
        "CreatedOn": "2007-07-24T09:05:32+04:00",
        "CreatedBy": 4,
        "ModifiedOn": "2010-07-26T08:23:16+04:00",
        "ModifiedBy": 8,
        "HireDate": "2009-06-30T11:03:31+04:00",
        "PositionId": 4
    },
    {
        "LocationID": 50,
        "TLLocation": "Zoinage",
        "LocationFirstName": "Hodge",
        "LocationLastName": "Cameron",
        "LocationStatusID": true,
        "DBID": "adipisicing nisi",
        "Occupation": "cillum officia",
        "Department": "mollit mollit",
        "TerminationDate": "1997-12-04T08:40:29+05:00",
        "CreatedOn": "1988-08-24T11:58:25+04:00",
        "CreatedBy": 1,
        "ModifiedOn": "2012-07-28T11:02:52+04:00",
        "ModifiedBy": 4,
        "HireDate": "1988-06-16T16:01:35+04:00",
        "PositionId": 5
    },
    {
        "LocationID": 51,
        "TLLocation": "Sloganaut",
        "LocationFirstName": "Richards",
        "LocationLastName": "Fields",
        "LocationStatusID": false,
        "DBID": "ut nulla",
        "Occupation": "culpa adipisicing",
        "Department": "aliquip ad",
        "TerminationDate": "1998-08-27T05:12:12+04:00",
        "CreatedOn": "2010-06-07T06:54:50+04:00",
        "CreatedBy": 9,
        "ModifiedOn": "1994-08-27T06:04:18+04:00",
        "ModifiedBy": 9,
        "HireDate": "1989-10-05T11:26:02+04:00",
        "PositionId": 5
    },
    {
        "LocationID": 52,
        "TLLocation": "Ramjob",
        "LocationFirstName": "Austin",
        "LocationLastName": "Riley",
        "LocationStatusID": true,
        "DBID": "duis nulla",
        "Occupation": "incididunt fugiat",
        "Department": "minim ea",
        "TerminationDate": "1993-04-28T00:31:54+04:00",
        "CreatedOn": "2009-01-14T06:02:56+05:00",
        "CreatedBy": 7,
        "ModifiedOn": "2007-11-17T19:18:01+05:00",
        "ModifiedBy": 2,
        "HireDate": "1996-09-17T01:46:17+04:00",
        "PositionId": 10
    },
    {
        "LocationID": 53,
        "TLLocation": "Medcom",
        "LocationFirstName": "England",
        "LocationLastName": "Hensley",
        "LocationStatusID": true,
        "DBID": "laboris est",
        "Occupation": "reprehenderit anim",
        "Department": "id laborum",
        "TerminationDate": "2008-10-23T23:58:29+04:00",
        "CreatedOn": "1994-09-03T14:11:53+04:00",
        "CreatedBy": 8,
        "ModifiedOn": "2011-07-10T18:33:51+04:00",
        "ModifiedBy": 10,
        "HireDate": "1994-09-20T04:08:08+04:00",
        "PositionId": 6
    },
    {
        "LocationID": 54,
        "TLLocation": "Halap",
        "LocationFirstName": "Talley",
        "LocationLastName": "Maddox",
        "LocationStatusID": true,
        "DBID": "cupidatat incididunt",
        "Occupation": "reprehenderit pariatur",
        "Department": "eu cupidatat",
        "TerminationDate": "2012-12-22T03:59:21+05:00",
        "CreatedOn": "2011-02-01T16:16:27+05:00",
        "CreatedBy": 9,
        "ModifiedOn": "1990-07-08T05:31:51+04:00",
        "ModifiedBy": 7,
        "HireDate": "1997-12-05T14:31:37+05:00",
        "PositionId": 3
    },
    {
        "LocationID": 55,
        "TLLocation": "Bitendrex",
        "LocationFirstName": "Faye",
        "LocationLastName": "Prince",
        "LocationStatusID": true,
        "DBID": "duis culpa",
        "Occupation": "ipsum labore",
        "Department": "velit enim",
        "TerminationDate": "1992-01-05T12:45:37+05:00",
        "CreatedOn": "2014-02-09T01:12:35+05:00",
        "CreatedBy": 2,
        "ModifiedOn": "2005-05-07T07:00:09+04:00",
        "ModifiedBy": 3,
        "HireDate": "2005-12-13T11:19:28+05:00",
        "PositionId": 3
    },
    {
        "LocationID": 56,
        "TLLocation": "Ecratic",
        "LocationFirstName": "Dora",
        "LocationLastName": "Schroeder",
        "LocationStatusID": false,
        "DBID": "ad ea",
        "Occupation": "laborum quis",
        "Department": "qui nostrud",
        "TerminationDate": "2005-09-07T09:41:25+04:00",
        "CreatedOn": "2006-05-26T10:43:47+04:00",
        "CreatedBy": 8,
        "ModifiedOn": "1991-01-04T15:06:29+05:00",
        "ModifiedBy": 6,
        "HireDate": "2013-04-23T02:37:03+04:00",
        "PositionId": 1
    },
    {
        "LocationID": 57,
        "TLLocation": "Olympix",
        "LocationFirstName": "Bradford",
        "LocationLastName": "Hopkins",
        "LocationStatusID": false,
        "DBID": "anim labore",
        "Occupation": "nostrud magna",
        "Department": "amet velit",
        "TerminationDate": "2004-06-11T19:41:24+04:00",
        "CreatedOn": "1995-12-04T04:55:00+05:00",
        "CreatedBy": 10,
        "ModifiedOn": "1999-07-25T06:43:17+04:00",
        "ModifiedBy": 3,
        "HireDate": "2013-03-07T07:28:13+05:00",
        "PositionId": 8
    },
    {
        "LocationID": 58,
        "TLLocation": "Zolavo",
        "LocationFirstName": "Puckett",
        "LocationLastName": "Sargent",
        "LocationStatusID": false,
        "DBID": "proident excepteur",
        "Occupation": "pariatur laboris",
        "Department": "anim aliquip",
        "TerminationDate": "1990-01-12T10:53:56+05:00",
        "CreatedOn": "2001-03-26T17:47:00+04:00",
        "CreatedBy": 2,
        "ModifiedOn": "2005-11-01T09:54:53+04:00",
        "ModifiedBy": 7,
        "HireDate": "2005-03-13T09:24:08+04:00",
        "PositionId": 3
    },
    {
        "LocationID": 59,
        "TLLocation": "Centregy",
        "LocationFirstName": "Tonia",
        "LocationLastName": "Burgess",
        "LocationStatusID": true,
        "DBID": "do consequat",
        "Occupation": "proident tempor",
        "Department": "nulla culpa",
        "TerminationDate": "2009-10-07T14:54:58+04:00",
        "CreatedOn": "2009-02-24T20:43:19+05:00",
        "CreatedBy": 4,
        "ModifiedOn": "1996-01-06T06:44:16+05:00",
        "ModifiedBy": 10,
        "HireDate": "1989-10-04T13:55:41+04:00",
        "PositionId": 8
    },
    {
        "LocationID": 60,
        "TLLocation": "Acruex",
        "LocationFirstName": "Dorthy",
        "LocationLastName": "Strickland",
        "LocationStatusID": false,
        "DBID": "eiusmod voluptate",
        "Occupation": "enim ex",
        "Department": "adipisicing ea",
        "TerminationDate": "1988-07-24T04:15:43+04:00",
        "CreatedOn": "1990-11-10T21:32:51+05:00",
        "CreatedBy": 8,
        "ModifiedOn": "2003-07-18T00:42:26+04:00",
        "ModifiedBy": 9,
        "HireDate": "1989-04-14T03:46:26+04:00",
        "PositionId": 10
    },
    {
        "LocationID": 61,
        "TLLocation": "Chillium",
        "LocationFirstName": "Trisha",
        "LocationLastName": "Gillespie",
        "LocationStatusID": false,
        "DBID": "est proident",
        "Occupation": "ipsum minim",
        "Department": "tempor ipsum",
        "TerminationDate": "2007-02-01T01:41:06+05:00",
        "CreatedOn": "1989-03-05T07:29:47+05:00",
        "CreatedBy": 1,
        "ModifiedOn": "1991-04-15T07:16:16+04:00",
        "ModifiedBy": 8,
        "HireDate": "2013-04-21T06:35:47+04:00",
        "PositionId": 8
    },
    {
        "LocationID": 62,
        "TLLocation": "Cyclonica",
        "LocationFirstName": "Blake",
        "LocationLastName": "Kirk",
        "LocationStatusID": true,
        "DBID": "voluptate consequat",
        "Occupation": "tempor in",
        "Department": "et amet",
        "TerminationDate": "1999-08-24T08:56:19+04:00",
        "CreatedOn": "2000-05-23T07:39:50+04:00",
        "CreatedBy": 6,
        "ModifiedOn": "2000-10-31T14:22:26+04:00",
        "ModifiedBy": 10,
        "HireDate": "1988-12-28T03:32:29+05:00",
        "PositionId": 6
    },
    {
        "LocationID": 63,
        "TLLocation": "Comtour",
        "LocationFirstName": "Gabrielle",
        "LocationLastName": "Morales",
        "LocationStatusID": true,
        "DBID": "do eu",
        "Occupation": "dolore do",
        "Department": "nisi irure",
        "TerminationDate": "1988-06-08T05:09:42+04:00",
        "CreatedOn": "1997-03-13T22:22:28+04:00",
        "CreatedBy": 2,
        "ModifiedOn": "2006-08-18T20:14:38+04:00",
        "ModifiedBy": 1,
        "HireDate": "2003-10-04T21:41:49+04:00",
        "PositionId": 5
    },
    {
        "LocationID": 64,
        "TLLocation": "Exospace",
        "LocationFirstName": "Natasha",
        "LocationLastName": "Douglas",
        "LocationStatusID": false,
        "DBID": "irure duis",
        "Occupation": "quis culpa",
        "Department": "ut pariatur",
        "TerminationDate": "1999-11-21T21:29:45+05:00",
        "CreatedOn": "2010-11-05T05:41:51+04:00",
        "CreatedBy": 5,
        "ModifiedOn": "2003-12-07T19:25:33+05:00",
        "ModifiedBy": 8,
        "HireDate": "1997-02-09T05:22:56+05:00",
        "PositionId": 9
    },
    {
        "LocationID": 65,
        "TLLocation": "Dyno",
        "LocationFirstName": "Mccoy",
        "LocationLastName": "Holloway",
        "LocationStatusID": false,
        "DBID": "irure consectetur",
        "Occupation": "ea ipsum",
        "Department": "voluptate eiusmod",
        "TerminationDate": "2010-04-25T17:24:47+04:00",
        "CreatedOn": "1998-03-29T07:49:51+04:00",
        "CreatedBy": 8,
        "ModifiedOn": "1992-01-23T22:36:54+05:00",
        "ModifiedBy": 6,
        "HireDate": "2001-06-29T18:37:18+04:00",
        "PositionId": 2
    },
    {
        "LocationID": 66,
        "TLLocation": "Daisu",
        "LocationFirstName": "Roy",
        "LocationLastName": "Hopper",
        "LocationStatusID": false,
        "DBID": "anim consequat",
        "Occupation": "adipisicing deserunt",
        "Department": "aute dolore",
        "TerminationDate": "1995-09-02T04:05:58+04:00",
        "CreatedOn": "2006-11-30T02:41:42+05:00",
        "CreatedBy": 6,
        "ModifiedOn": "1992-01-21T12:04:07+05:00",
        "ModifiedBy": 8,
        "HireDate": "2002-03-07T07:40:56+05:00",
        "PositionId": 2
    },
    {
        "LocationID": 67,
        "TLLocation": "Ovium",
        "LocationFirstName": "Madeline",
        "LocationLastName": "Powell",
        "LocationStatusID": false,
        "DBID": "adipisicing aute",
        "Occupation": "laboris ullamco",
        "Department": "pariatur proident",
        "TerminationDate": "1995-01-30T10:54:32+05:00",
        "CreatedOn": "1999-08-05T09:32:56+04:00",
        "CreatedBy": 3,
        "ModifiedOn": "2000-01-04T03:54:04+05:00",
        "ModifiedBy": 6,
        "HireDate": "2013-02-07T08:22:44+05:00",
        "PositionId": 4
    },
    {
        "LocationID": 68,
        "TLLocation": "Exoblue",
        "LocationFirstName": "Dudley",
        "LocationLastName": "Garza",
        "LocationStatusID": true,
        "DBID": "reprehenderit cillum",
        "Occupation": "dolore proident",
        "Department": "occaecat duis",
        "TerminationDate": "2000-07-13T08:46:39+04:00",
        "CreatedOn": "1990-02-12T17:43:58+05:00",
        "CreatedBy": 3,
        "ModifiedOn": "2008-10-16T14:52:25+04:00",
        "ModifiedBy": 3,
        "HireDate": "2003-06-08T23:48:54+04:00",
        "PositionId": 10
    },
    {
        "LocationID": 69,
        "TLLocation": "Mazuda",
        "LocationFirstName": "Brigitte",
        "LocationLastName": "Nunez",
        "LocationStatusID": false,
        "DBID": "dolor qui",
        "Occupation": "adipisicing quis",
        "Department": "eu magna",
        "TerminationDate": "2013-01-22T16:55:08+05:00",
        "CreatedOn": "2001-04-30T08:45:43+04:00",
        "CreatedBy": 6,
        "ModifiedOn": "2007-06-17T06:56:33+04:00",
        "ModifiedBy": 5,
        "HireDate": "2003-05-30T05:34:48+04:00",
        "PositionId": 4
    },
    {
        "LocationID": 70,
        "TLLocation": "Izzby",
        "LocationFirstName": "Lottie",
        "LocationLastName": "Reid",
        "LocationStatusID": true,
        "DBID": "reprehenderit eu",
        "Occupation": "ad occaecat",
        "Department": "proident esse",
        "TerminationDate": "1993-11-03T20:14:45+04:00",
        "CreatedOn": "2010-04-28T22:19:37+04:00",
        "CreatedBy": 5,
        "ModifiedOn": "1997-10-28T12:36:36+04:00",
        "ModifiedBy": 5,
        "HireDate": "2010-01-13T11:12:32+05:00",
        "PositionId": 10
    }
];
/**
 * Created by Evan on 3/1/14.
 */

'use strict';

app.factory('odata', [function () {

    function oDataQueryString(options) {
        if (!options) return '';
        if (options.ipp) {
            options.top = options.ipp;
            options.skip = (((options.page || 1) - 1) * options.top);
        }

        var qs = {};
        if (options.skip)
            qs.$skip = options.skip;
        if(options.top)
            qs.$top = options.top;
        if (options.filter && !$.isEmptyObject(options.filter))
            qs.$filter = oDataFilterString(options.filter);
        if (options.expand) {
            if (_.isArray(options.expand))
                options.expand = options.expand.join(',');
            if(options.expand)
                qs.$expand = options.expand;
        }
        if (options.orderBy) {
            if (_.isArray(options.ordrBy))
                options.ordrBy = options.orderBy.join(',');
            qs.$orderby = options.orderBy;
            if (options.reverse)
                qs.$orderby += ' desc';
            else
                qs.$orderby += ' asc';
        }
        if (options.count)
            qs.$inlinecount = 'allpages';

        var queryArr = [];
        for (var key in qs) {
            if (qs[key] !== undefined && qs[key] !== null)
                queryArr.push(key + '=' + qs[key]);
        }
        var querystring = "?" + queryArr.join('&');
        return querystring;
    }

    var operators = {
        'and': function (value) {
            var tmpArr = [];
            _.forEach(value, function (val) {
                tmpArr.push(oDataFilterString(val));
            });
            return '(' + tmpArr.join(' and ') + ')';
        },
        'or': function (value) {
            var tmpArr = [];
            _.forEach(value, function (val) {
                tmpArr.push(oDataFilterString(val));
            });
            return '(' + tmpArr.join(' or ') + ')';
        },
        '!': function (value, key) {
            this.not(value, key);
        },
        ' ': function (value, key) {
            return key + " " + value;
        },
        'not': function (value, key) {
            if (!_.isArray(escapeValue(value)) && !_.isObject(escapeValue(value)))
                return key + ' ne ' + escapeValue(value);
            return 'not (' + oDataFilterString(value) + ')'
        },
        'like': function (value, key) {
            return this.contains(value, key);
        },
        '<': function (value, key) {
            return key + ' lt ' + escapeValue(value);
        },
        '>': function (value, key) {
            return key + ' gt ' + escapeValue(value);
        },
        '<=': function (value, key) {
            return key + ' le ' + escapeValue(value);
        },
        '>=': function (value, key) {
            return key + ' ge ' + escapeValue(value);
        },
        '=': function (value, key) {
            if (value !== '') {
                return key + ' eq ' + escapeValue(value);
            } else {
                return 'true eq true';
            }
        },
        'startsWith': function (value, key) {
            return 'startswith(' + key + ', ' + escapeValue(value) + ') eq true';
        },
        'endsWith': function (value, key) {
            return 'endswith(' + key + ', ' + escapeValue(value) + ') eq true';
        },
        'contains': function (value, key) {
            return 'substringof(' + escapeValue(value) + ', ' + key + ') eq true';
        },
        'field': function (v, k) {
            var tmpArr = [];
            if (_.isObject(v)) {
                tmpArr = [];
                _.forIn(v, function (value, key) {
                    tmpArr.push((operators[key] && operators[key](value,k)) || operators.field(value, key));
                });
                return operators.or(tmpArr);
            } else if (_.isArray(v)) {
                tmpArr = [];
                _.forEach(v, function (value) {
                    tmpArr.push(operators['='](value, k));
                });
                return operators.or(tmpArr);
            } else {
                return operators['='](v, k);
            }
        }
    };

    function escapeValue(value) {
        value = parseValue(value);
        if (_.isString(value))
            return "'" + value + "'";
        if (_.isDate(value))
            return "datetime'" + value.toISOString() + "'";
        return value;
    }

    function parseValue(value) {
        if (value === "false")
            return false;
        else if (value === "true")
            return true;
        else if (value === "null")
            return null;
        else if (value === null)
            return null;
        else if (value.toString().indexOf('!') != -1)
        {
            var val = value.substring(0, value.indexOf('!'));
            //if (!_.isNaN(value))
            //    return _.parseInt(value);
            //else return value;
            return val;
        }
        else if (/^-?([0-9]*(\.[0-9]+)?|Infinity)$/.test(value) && !_.isNaN(_.parseInt(value)))
            return _.parseInt(value);
        //else if (!_.isNaN(value))
        //    return value.toString();
        else if (!_.isNaN(Date.parse(value)))
            return new Date(value);
        else 
            return value;
    }

    function oDataFilterString(filter) {
        if (_.isObject(filter)) {
            var filterString = "";
            _.forIn(filter, function (value, key) {
                filterString += (operators[key] || operators.field)(value, key);
            });
            return filterString;
        } else if (_.isArray(filter)) {
            return operators.or(filter); // not sure if filter will ever be an array here...
        } else
            return filter;
    }

    return {
        queryString: function (data) {
            return oDataQueryString(data);
        }
    }
}]);

/**
 * Created by Evan on 2/28/14.
 */

'use strict';

app.provider('routeResolver', function () {

    this.$get = function () {
        return this;
    };

    this.routeConfig = function () {
        var controllersDirectory = 'js/controllers',
            templatesDirectory = 'templates',

            setBaseDirectories = function (controllersDir, templatesDir) {
                controllersDirectory = controllersDir || controllersDirectory;
                templatesDirectory = templatesDir || templatesDirectory;
            },

            getControllersDirectory = function () {
                return controllersDirectory;
            },

            getTemplatesDirectory = function () {
                return templatesDirectory;
            };

        return {
            setBaseDirectories: setBaseDirectories,
            getControllersDirectory: getControllersDirectory,
            getTemplatesDirectory: getTemplatesDirectory
        };
    }();

    this.route = function (routeConfig) {

        var resolve = function (pageTitle, url, baseName, options, ctrlName) {
                if (angular.isObject(baseName)) {
                    options = baseName;
                    baseName = null;
                }
                var routeOptions = options || {};
                routeOptions.data = routeOptions.data || {};
                routeOptions.data.title = pageTitle;
                baseName = baseName || 'index';

                var routeDef = {data: routeOptions.data, resolve: {}};

                if (!routeOptions.path && !routeOptions.abstract) routeOptions.path = url.replace(/(\/:[^\/]*)/g, '').replace('/new', '').replace('/edit', '').split('?')[0];
                else routeOptions.path = '';
                if (!routeOptions.controlPath && !routeOptions.abstract) routeOptions.controlPath = routeOptions.path;
                else routeOptions.controlPath = '';
                var controlName = (ctrlName || routeOptions.controlPath.split('/').pop() + baseName.replace(/^./, function (s) {
                    return s.toUpperCase();
                })) + 'Ctrl';

                if (routeOptions.abstract)
                    routeDef.abstract = true;
                else
                    routeDef.url = '^' + url.replace('/default', '/');

                if (routeOptions.modal) {
                    routeDef.onEnter = function ($stateParams, $state, $modal) {
                        $modal.open({
                            templateUrl: routeConfig.getTemplatesDirectory() + routeOptions.path + '/' + baseName + '.html',
                            controller: controlName
                        }).result.then(function (result) {
                                return $state.go("^", $stateParams, { reload: true });
                            }, function (result) {
                                return $state.go("^", $stateParams, { reload: false });
                            });
                    };
                } else {
                    routeDef.templateUrl = routeConfig.getTemplatesDirectory() + routeOptions.path + '/' + baseName + '.html';
                    routeDef.controller = controlName;
                }

                routeDef.resolve.load = ['$q', '$rootScope', function ($q, $rootScope) {
                    var dependencies = [routeConfig.getControllersDirectory() + routeOptions.controlPath + '/' + baseName + 'Ctrl.js'];
                    return resolveDependencies($q, $rootScope, dependencies);
                }];
                if (routeOptions.AuthUser) {
                    routeDef.resolve.AuthUser = ['$q', '$rootScope', 'dataService', function ($q, $rootScope, dataService) {
                        var defer = $q.defer();
                        dataService.post('login/check').success(function (data) {
                            if (data.Success) {
                                $rootScope.user = data.User;
                                defer.resolve(data.User);
                            } else
                                defer.reject({ type: 'auth', action: 'redirect', location: 'login' })
                        }).error(function (data) {
                                defer.reject({type: 'auth', action: 'redirect', location: 'login'})
                            });
                        return defer.promise;
                    }];
                }

                return routeDef;
            },

            resolveDependencies = function ($q, $rootScope, dependencies) {
                var defer = $q.defer();
                require(dependencies, function () {
                    defer.resolve();
                    $rootScope.$apply()
                });

                return defer.promise;
            };

        return {
            resolve: resolve
        }
    }(this.routeConfig);
});

/*************************
Pixis | Safety Training App 

tokenFactoryInterceptor

Auth: TmAck.072 <tonymclaughlin72@gmail.com> 
Date: 3/11/15
*************************/

'use strict';


app.factory('tokenFactoryInterceptor', function($q, $window) {
  return {
    'request': function(config) {

        // clean URL strip out odata $
        config.url = config.url.replace(/\$/g, '');

        var token = $window.localStorage.getItem('token');

        if (token) {
          config.headers['UserId'] = token;
          console.log(token);
          console.log(config);
        }

        return config;
    },

   'requestError': function(rejection) {
       // on error
       $location.path('/');
    },

  };
})

/**
 * Created by Evan on 3/2/14.
 */

'use strict';

app.controller('courseEditCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    (new api('Course')).getById($stateParams.id).success(function (data) {
        $scope.course = data;
    });
    $scope.edit = function (course, form) {
        if (form.$invalid) return false;
        course.CertAgency = course.CertificationAgencyID.text
        course.CertificationAgencyID = course.CertificationAgencyID.id;
        (new api('Course')).update(course.CourseID, course).success(function (data) {
            $scope.$close(data);
        });
    };
        
    $scope.cancel = function(){
        $scope.$dismiss('cancel');
    };
        
    init();

    function init() {

    }

}]);

/**
 * Created by Evan on 3/1/14.
 */

'use strict';

app.controller('courseIndexCtrl', ['$scope', '$stateParams', 'api', 'odata', 'courses', '$rootScope', function ($scope, $stateParams, api, odata, courses, $rootScope) {

    $scope.CourseService = new api('Course');
        
    $scope.courses = $scope.CourseService.grid;
        
    $scope.grid = {
        search: '',
        page: 1,
        filter: {},
        orderBy: ['CertAgency', 'CourseDescription'],
        ipp: 30,
        reverse: false,
        expand: ['CoursesTakens']
    };

    $scope.$watch('grid', function (newVal, oldVal) {
            updateGrid()
    },true);

    $scope.$on('CompanyChange', updateGrid);

    $scope.odata = function () {
        return odata.queryString({ filter: $scope.grid.filter, orderBy: $scope.grid.orderBy, reverse: $scope.grid.reverse });
    };

    $scope.validateCerts = courses.validateCerts;

    init();

    function init() {
        updateGrid()
    }

    function updateGrid() {
        var andQ = [];
        var qwords = $scope.grid.search.replace(',', '').split(' ');
        $.each(qwords, function (i, word) {
            andQ.push({ or: [{ CertAgency: { contains: word } }, { CourseDescription: { contains: word } }] });
        });
        $scope.grid.filter.and = andQ;
        $scope.CourseService.get($scope.grid.page, $scope.grid.ipp, $scope.grid.filter, $scope.grid.orderBy, $scope.grid.reverse, $scope.grid.expand);
    }

}]);

/**
 * Created by Evan on 3/2/14.
 */

'use strict';

app.controller('courseNewCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    $scope.add = function (course, form) {
        if (form.$invalid) return false;
        course.CertAgency = course.CertificationAgencyID.text
        course.CertificationAgencyID = course.CertificationAgencyID.id;
        (new api('Course')).create(course).success(function (data) {
            $scope.$close(data);
        });
    };
        
    $scope.cancel = function(){
        $scope.$dismiss('cancel');
    };
        
    init();

    function init() {

    }

}]);

/**
 * Created by Evan on 3/1/14.
 */

'use strict';

app.controller('crewDetailCtrl', ['$scope', '$stateParams', 'api', '$filter', '$q', function ($scope, $stateParams, api, $filter, $q) {

    $scope.Crew = new api('Crew');
    $scope.CrewDetailService = new api('CrewDetail');

    $scope.saveEdit = function (form, edit) {

        delete edit['CrewDetails'];
        delete edit['Region'];
        delete edit['LocationCode'];
        delete edit['odata.metadata'];

        $scope.Crew.patch(edit.CrewID, { CrewName: edit.CrewName, LocationCodeID: edit.LocationCodeID.id }).success(function (data) {
            init();
            $scope.tab[0] = true;
                
        });
    }

    $scope.removeMember = function (id) {
        $scope.CrewDetailService.remove(id);
        init();
        $scope.tab[0] = true;
    }


    init();

    function init() {
        $scope.Crew.getById($stateParams.id, { expand: ['CrewDetails', 'CrewDetails/Employee', 'Region', 'LocationCode'] }).success(function (data) {
            $scope.crew = data;
            //$scope.employee.EmployeeMedicalRequiredsSelect = [];
            //$.each(data.EmployeeMedicalRequireds, function (index, item) {
            //    $scope.employee.EmployeeMedicalRequiredsSelect.push({ id: item.MedicalTestID, text: item.MedicalTest.MedicalTest1 });
            //});
        });

    }

}]);

/**
 * Created by Evan on 3/1/14.
 */

'use strict';

app.controller('crewIndexCtrl', ['$scope', '$stateParams', 'api', 'odata', '$rootScope','$modal', function ($scope, $stateParams, api, odata, $rootScope, $modal) {


    $scope.CrewService = new api('Crew');
    var crewDetail = $scope.CrewDetailService = new api('CrewDetail');


    //$scope.EmployeeService = new api('Employee');
    //$scope.EmployeeCourseService = new api('EmployeeCourse');

    $scope.crews = $scope.CrewService.grid;

    $scope.addMember = function (crew) {
        $modal.open({
            templateUrl: 'templates/crew/add-to-crew/index.html',
            controller: function ($scope) {
                $scope.crew = crew;
                $scope.save = function (add, form) {
                    if (form.$invalid) return false;
                    var success = true;
                    var failedOn = [];
                    $.each(add.Employees, function (index, employee) {
                        crewDetail.create({ EmployeeID: employee.id, CrewID: crew.CrewID }).error(function () {
                            success = false;
                            failedOn.push(employee);
                        });
                    });
                    if (!success)
                        console.log(failedOn);
                    $scope.$close(add);
                }
                $scope.cancel = function () {
                    $scope.$dismiss('cancel');
                };
            }
        }).result.then(function (result) {

        });
    };


    $scope.foremanMember = function (crew, employee) {
        crew.CrewName = employee.EmployeeFirstName + ' ' + employee.EmployeeLastName;
        $scope.CrewService.patch(crew.CrewID, { CrewName: crew.CrewName });
    };

    $scope.grid = {
        search: '',
        page: 1,
        filter: {},
        orderBy: 'CrewName',
        ipp: 30,
        reverse: false,
        expand: ['Region', 'LocationCode']
    };

    $scope.$watch('grid', function (newVal, oldVal) {
        updateGrid();
    }, true);

    $scope.odata = function () {
        return odata.queryString({ filter: $scope.grid.filter, orderBy: $scope.grid.orderBy, reverse: $scope.grid.reverse });
    };

    $scope.$on('CompanyChange', updateGrid);

    init();

    function init() {
        updateGrid();
    }

    $scope.all = [];

    function updateGrid() {
        var andQ = [];
        var qwords = $scope.grid.search.replace(',', '').split(' ');
        $.each(qwords, function (i, word) {
            andQ.push({ or: [{ CrewName: { contains: word } }] });
        });

        //$scope.grid.filter.and = ($rootScope.CompanyId && $rootScope.CompanyId.id || $rootScope.CompanyId)? [
        //{ 'CrewDetails/any(details:': { ' ': "details/Employee/DBID eq '" + ($rootScope.CompanyId && $rootScope.CompanyId.id || $rootScope.CompanyId) + "')" } }].concat(andQ) : andQ;


        $scope.CrewService.get($scope.grid.page, $scope.grid.ipp, $scope.grid.filter, $scope.grid.orderBy, $scope.grid.reverse, $scope.grid.expand);
    }



    //$scope.EmployeeService = new api('Employee');
    //$scope.CrewService = new api('Crew');
    //$scope.EmployeeCourseService = new api('EmployeeCourse');
    //var crewDetail = $scope.CrewDetailService = new api('CrewDetail');
        
    //$scope.EmployeeService = new api('Employee');

    //$scope.crews = $scope.CrewService.grid;

    //$scope.addMember = function (crew) {
    //    $modal.open({
    //        templateUrl: 'templates/crew/add-to-crew/index.html',
    //        controller: function ($scope) {
    //            $scope.crew = crew;
    //            $scope.save = function (add, form) {
    //                if (form.$invalid) return false;
    //                var success = true;
    //                var failedOn = [];
    //                $.each(add.Employees, function (index, employee) {
    //                    crewDetail.create({ EmployeeID: employee.id, CrewID: crew.CrewID }).error(function () {
    //                        success = false;
    //                        failedOn.push(employee);
    //                    });
    //                });
    //                if (!success)
    //                    console.log(failedOn);
    //                $scope.$close(add);
    //            }
    //            $scope.cancel = function () {
    //                $scope.$dismiss('cancel');
    //            };
    //        }
    //    }).result.then(function (result) {

    //    });
    //};

    //$scope.removeMember = function (id) {
    //    $scope.CrewDetailService.remove(id);
    //}

    //$scope.foremanMember = function (crew, employee) {
    //    crew.CrewName = employee.EmployeeFirstName + ' ' + employee.EmployeeLastName;
    //    $scope.CrewService.patch(crew.CrewID, { CrewName: crew.CrewName });
    //};

    //$scope.grid = {
    //    search: '',
    //    page: 1,
    //    filter: {},
    //    orderBy: 'CrewName',
    //    ipp: 30,
    //    reverse: false,
    //    expand: ['CrewDetails','CrewDetails/Employee']
    //};

    //$scope.$watch('grid', function (newVal, oldVal) {
    //    updateGrid();
    //},true);

    //$scope.odata = function () {
    //    return odata.queryString({ filter: $scope.grid.filter, orderBy: $scope.grid.orderBy, reverse: $scope.grid.reverse });
    //};

    //$scope.$on('CompanyChange', updateGrid);

    //init();

    //function init() {
    //    updateGrid();
    //}

    //$scope.all = [];

    //function updateGrid() {
    //    var andQ = [];
    //    var qwords = $scope.grid.search.replace(',', '').split(' ');
    //    $.each(qwords, function (i, word) {
    //        andQ.push({ or: [{ CrewName: { contains: word } }] });
    //    });
    //    $scope.grid.filter.and = ($rootScope.CompanyId && $rootScope.CompanyId.id || $rootScope.CompanyId)? [
    //    { 'CrewDetails/any(details:': { ' ': "details/Employee/DBID eq '" + ($rootScope.CompanyId && $rootScope.CompanyId.id || $rootScope.CompanyId) + "')" } }].concat(andQ) : andQ;
    //    $scope.CrewService.get($scope.grid.page, $scope.grid.ipp, $scope.grid.filter, $scope.grid.orderBy, $scope.grid.reverse, $scope.grid.expand);
    //}

}]);
/**
 * Created by Evan on 3/2/14.
 */

'use strict';

app.controller('crewNewCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    var CrewService = new api('Crew');
    var CrewDetailService = new api('CrewDetail');
    var Employee = new api('Employee');

    $scope.createCrew = function (employee, form) {
        if (form.$invalid) return false;
        var emplId = employee.Employee.id;
        var locaionCodeId = employee.LocationCodeID ? employee.LocationCodeID.id : undefined;

        CrewService.create({ CrewName: employee.Employee.text, CrewStatusID: 1, LocationCodeID: locaionCodeId, RegionID: $scope.user.regionId }).success(function (crew) {
            CrewDetailService.create({ CrewID: crew.CrewID, EmployeeID: emplId }).success($scope.$close)
        });

    };

    $scope.cancel = function () {
        $scope.$dismiss('cancel');
    };

    init();

    function init() {

    }

}]);

/**
 * Created by Evan on 3/1/14.
 */

'use strict';

app.controller('dashboardIndexCtrl', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
        
    init();

    function init() {
        
    }

}]);

/**
 * Created by Evan on 3/1/14.
 */

'use strict';

app.controller('employeeDetailCtrl', ['$scope', '$stateParams', 'api', '$filter', '$q', function ($scope, $stateParams, api, $filter, $q) {

    $scope.Employee = new api('Employee');

    $scope.MedicalTests = new api('MedicalTest');
    $scope.EmployeeMedicalRequired = new api('EmployeeMedicalRequired');

    //$scope.MedicalT

    $scope.getCourse = function (course) {
        return (new api('Course')).getById(course.CourseID).success(function (data) {
            $.extend(course, data);
        });
    };

    $scope.getMedical = function (employeeMedical) {
        return (new api('EmployeeMedical')).getById(employeeMedical.EmployeeMedicalID).success(function (data) {
            $.extend(employeeMedical, data);
        });
    };
       
    $scope.saveEdit = function (form, edit) {
        var transactions = [];
        edit.DBID = edit.DBID && edit.DBID.id;
        edit.Occupation = edit.Occupation && edit.Occupation.id;
        edit.EmployeeStatusID = edit.EmployeeStatusID && edit.EmployeeStatusID.id;
        $.each(edit.EmployeeMedicalRequireds, function (index, medical) {
            var match = $filter('filter')(edit.EmployeeMedicalRequiredsSelect, { id: medical.MedicalTestID }).length;
            if (!match) {
                transactions.push($scope.EmployeeMedicalRequired.remove(medical.EmployeeMedicalRequiredID));
            }

        });
        $.each(edit.EmployeeMedicalRequiredsSelect, function (index, medical) {
            var match = $filter('filter')(edit.EmployeeMedicalRequireds, { MedicalTestID: medical.id }).length;
            if (!match) {
                transactions.push($scope.EmployeeMedicalRequired.create({ EmployeeID: edit.EmployeeID, MedicalTestID: medical.id }));
            }

        });
        if (form.$invald) return false;
        //edit.DBID = edit.DBID;

        delete edit['TLCompany'];
        delete edit.CoursesTakens;
        delete edit.EmployeeStatu;
        delete edit.EmployeeMedicalRequiredsSelect;
        delete edit.EmployeeMedicalRequireds;
        delete edit.EmployeeMedicals;
        delete edit.EmployeeNotes1
        transactions.push($scope.Employee.update($stateParams.id, edit));

        $q.all(transactions).then(function () {
            $scope.tab[0] = true;
            init();
        });
    }

    $scope.terminate = function (employee) {
        var updated = {};
        employee.DBID = employee.DBID.id || employee.DBID;
        employee.TerminationDate = new Date();
        angular.copy(employee, updated);
        delete employee['TLCompany'];
        delete employee.CoursesTakens;
         
        $scope.Employee.update($stateParams.id, employee).success(function () {
            $scope.employee = updated;
            $scope.tab[0] = true;
        });
    }

    $scope.reinstate = function (employee) {
        var updated = {};
        employee.DBID = employee.DBID.id || employee.DBID;
        employee.TerminationDate = null;
        angular.copy(employee, updated);
        delete employee['TLCompany'];
        delete employee.CoursesTakens;
        delete employee.EmployeeStatu;
        $scope.Employee.update($stateParams.id, employee).success(function () {
            $scope.employee = updated;
            $scope.tab[0] = true;
        });
    }

    $scope.expires = function (course, showDate) {
        var start = new Date(course.CertificationDate);
        var now = new Date();
        if(course.RenewalPeriodMonths === 0)
            return "Never";

        start.setMonth(start.getMonth() + course.RenewalPeriodMonths);

        if (start < now) {
            course.Expired = true;
            if(!showDate)
                return "Expired";
        }

        course.Expires = Math.abs((start.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
        if (course.Expires <= 31 && !showDate)
            return "Expires in " + course.Expires + "days";

        return start;
    };

    init();

    function init() {
        $scope.Employee.getById($stateParams.id, { expand: ['CoursesTakens', 'EmployeeMedicals', 'TLCompany', 'EmployeeStatu', 'EmployeeNotes1', 'EmployeeMedicalRequireds/MedicalTest'] }).success(function (data) {
            $scope.employee = data;
            $scope.employee.EmployeeMedicalRequiredsSelect = [];
            $.each(data.EmployeeMedicalRequireds, function (index, item) {
                $scope.employee.EmployeeMedicalRequiredsSelect.push({ id: item.MedicalTestID, text: item.MedicalTest.MedicalTest1 });
            });
        });
            
    }
     
}]);

/**
 * Created by Evan on 3/1/14.
 */

'use strict';

app.controller('employeeIndexCtrl', ['$scope', '$stateParams', 'api', '$rootScope', 'odata', '$location', function ($scope, $stateParams, api, $rootScope, odata, $location) {
        
    $scope.EmployeeService = new api('Employee');        
    $scope.employees = $scope.EmployeeService.grid;
        
    $scope.grid = {
        search: '',
        status: 1,
        page: 1,
        filter: { },
        orderBy: ['EmployeeLastName', 'EmployeeFirstName'],
        ipp: 30,
        reverse: false,
        expand: ['LocationCode1']
    };

    $scope.$watchCollection('grid', function (newVal, oldVal) {
            updateGrid();
    });

    $scope.odata = function () {
        return odata.queryString({ filter: $scope.grid.filter, orderBy: $scope.grid.orderBy, reverse: $scope.grid.reverse });
    };

    $scope.$on('CompanyChange', updateGrid);

    function init() {
        if ($location.search().course)
            $scope.grid.expand.push('CoursesTakens');
        updateGrid();
    }
        
    $scope.all = [];

    $scope.getAll = function () {
        $scope.EmployeeService.getAll($scope.grid.filter, $scope.grid.expand).success(function (data) {
            $scope.all = data;
        });
    };

    function updateGrid() {

        var andQ = [];
        
        if ($location.search().course){
            andQ.push({ 'CoursesTakens/any(x:': { ' ': 'x/CourseID eq ' + $location.search().course + ' and x/Expired eq ' + $location.search().expired + ')' } });
        }
              
        var qwords = $scope.grid.search.replace(',', '').split(' ');
        
        $.each(qwords, function (i, word) {
            andQ.push({ 
                or: [
                    { EmployeeFirstName: { 
                        contains: word 
                        } 
                    },
                    { EmployeeLastName: { 
                        contains: word 
                    } 
                }
            ]});
        });

        $scope.grid.filter.and = [
            { DBID: $rootScope.CompanyId && $rootScope.CompanyId.id || $rootScope.CompanyId || { not: null } },
            {EmployeeStatusID: $scope.grid.status}
        ].concat(andQ);

        $scope.EmployeeService.get($scope.grid.page, $scope.grid.ipp, $scope.grid.filter, $scope.grid.orderBy, $scope.grid.reverse, $scope.grid.expand);
    }

    init();
    
}]);

/**
 * Created by Evan on 3/2/14.
 */

'use strict';

app.controller('employeeNewCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    var EmployeeService = new api('Employee');
    
    $scope.add = function (employee) {
        employee.DBID = employee.DBID.id;
        employee.EmployeeStatusID = 1;
        EmployeeService.create(employee).success($scope.$close);
    };
        
    $scope.cancel = function(){
        $scope.$dismiss('cancel');
    };
        
    init();

    function init() {

    }

}]);

/**
 * Created by Evan on 3/2/14.
 */

'use strict';

app.controller('instructorEditCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    (new api('Instructor')).getById($stateParams.id).success(function (data) {
        $scope.instructor = data;
    });
    $scope.edit = function (instructor, form) {
        if (form.$invalid) return false;
        instructor.RegionID = instructor.RegionID.id;
        (new api('Instructor')).update(instructor.InstructorID, instructor).success(function (data) {
            $scope.$close(data);
        });
    };
        
    $scope.cancel = function(){
        $scope.$dismiss('cancel');
    };
        
    init();

    function init() {

    }

}]);

/**
 * Created by Evan on 3/1/14.
 */

'use strict';

app.controller('instructorIndexCtrl', ['$scope', '$stateParams', 'api', 'odata', function ($scope, $stateParams, api, odata) {

    $scope.InstructorService = new api('Instructor');

    $scope.instructors = $scope.InstructorService.grid;

    $scope.grid = {
        search: '',
        page: 1,
        filter: {},
        orderBy: ['InstructorName', 'CompanyId'],
        ipp: 30,
        reverse: false,
        expand: ['CoursesTakens', 'Region']
    };

    $scope.$watch('grid', function (newVal, oldVal) {
            updateGrid()
    },true);

    $scope.$on('CompanyChange', updateGrid);

    $scope.odata = function () {
        return odata.queryString({ filter: $scope.grid.filter, orderBy: $scope.grid.orderBy, reverse: $scope.grid.reverse });
    };

    init();

    function init() {
        updateGrid()
    }

    function updateGrid() {
        var andQ = [];
        var qwords = $scope.grid.search.replace(',', '').split(' ');
        $.each(qwords, function (i, word) {
            andQ.push({ InstructorName: { contains: word } });
        });
        $scope.grid.filter.and = andQ;
        $scope.InstructorService.get($scope.grid.page, $scope.grid.ipp, $scope.grid.filter, $scope.grid.orderBy, $scope.grid.reverse, $scope.grid.expand);
    }

}]);

/**
 * Created by Evan on 3/2/14.
 */

'use strict';

app.controller('instructorNewCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    $scope.add = function (instructor, form) {
        var data = instructor;
        data.RegionID = instructor.RegionID.id;
            
        if (form.$invalid) return false;

        (new api('Instructor')).create(data).success($scope.$close);
    };
        
    $scope.cancel = function(){
        $scope.$dismiss('cancel');
    };
        
    init();

    function init() {

    }

}]);

/**
 * Created by Evan on 3/1/14.
 */

'use strict';

app.controller('adminUserEditCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    $scope.CompanyService = new api('Company');

    $scope.UserCompanies = new api('UserCompanies');

    $scope.AccessFlagService = new api('UserAccessFlags');

    $scope.UserFlags = new api('UserAccesses');

    $scope.companies = $scope.CompanyService.grid;

    $scope.accessFlag = $scope.AccessFlagService.grid;

    $scope.grid = {
        search: '',
        page: 1,
        filter: {},
        orderBy: ['Company_Name'],
        ipp: 300,
        reverse: false,
        expand: []
    };

    $scope.$watch('grid', function (newVal, oldVal) {
        updateGrid()
    }, true);

    function updateGrid() {
        $scope.CompanyService.get($scope.grid.page, $scope.grid.ipp, $scope.grid.filter, $scope.grid.orderBy, $scope.grid.reverse, $scope.grid.expand);
    }

    $scope.accessGrid = {
        search: '',
        page: 1,
        filter: {},
        orderBy: ['Flag'],
        ipp: 300,
        reverse: false,
        expand: []
    };

    $scope.$watch('accessGrid', function (newVal, oldVal) {
        updateAccessGrid()
    }, true);

    function updateAccessGrid() {
        $scope.AccessFlagService.get($scope.accessGrid.page, $scope.accessGrid.ipp, $scope.accessGrid.filter, $scope.accessGrid.orderBy, $scope.accessGrid.reverse, $scope.accessGrid.expand);
    }

    $scope.User = new api('User');

    $scope.saveEdit = function (edit, form) {
        var updated = {};
        angular.copy(edit, updated);
        if (form.$invald) return false;
        var data = { UserName: edit.UserName, Email: edit.Email, RegionID: edit.RegionID.id };
        if (edit.Password) {
            data.Password = edit.Password;
        }
        $scope.User.patch($stateParams.id, data).success(function () {
            $scope.user = updated;
            $scope.user.Password = '';
            $scope.user.ConfirmPassword = ''
            $scope.tab[0] = true;
            $scope.edit = angular.copy($scope.user);
        });
    }

    $scope.toggleUserCompany = function (c, company) {
        if (c.selected) {
            $scope.UserCompanies.create({ UserID: $scope.user.UserID, CompanyID: company.DBID }).success(function (data) {
                c.UserCompanyID = data.UserCompanyID;
            }).error(function () {
                c.selected = false;
            });
        } else if (c.UserCompanyID) {
            $scope.UserCompanies.remove(c.UserCompanyID).success(function (data) {
                delete c.UserCompanyID
            }).error(function () {
                c.selected = true;
            });
        }
    };

    $scope.toggleUserFlag = function (c, flag) {
        if (c.selected) {
            $scope.UserFlags.create({ UserID: $scope.user.UserID, FlagID: flag.FlagID }).success(function (data) {
                c.UserAccessID = data.UserAccessID;
            }).error(function () {
                c.selected = false;
            });
        } else if (c.UserAccessID) {
            $scope.UserFlags.remove(c.UserAccessID).success(function (data) {
                delete c.UserAccessID
            }).error(function () {
                c.selected = true;
            });
        }
    };

    init();

    function init() {
        $scope.User.getById($stateParams.id, { expand: ['UserAccesses/UserAccessFlag1', 'UserCompanies'] }).success(function (data) {
            $scope.user = data;
            $scope.edit = angular.copy(data);
            $scope.edit.Password = '';
            $scope.userCompanies = {};
            $scope.userFlags = {};
            $.each(data.UserCompanies, function (i, company) {
                $scope.userCompanies[company.CompanyID] = { selected: true, UserCompanyID: company.UserCompanyID };
            });
            $.each(data.UserAccesses, function (i, flag) {
                $scope.userFlags[flag.FlagID] = { selected: true, UserAccessID: flag.UserAccessID };
            });
        });
    }

}]);


/**
 * Created by Evan on 3/1/14.
 */

'use strict';

app.controller('adminUserIndexCtrl', ['$scope', '$stateParams', 'api', '$rootScope', 'odata', '$location', function ($scope, $stateParams, api, $rootScope, odata, $location) {

    $scope.UserService = new api('User');
        
    $scope.users = $scope.UserService.grid;
        
    $scope.grid = {
        search: '',
        status: 1,
        page: 1,
        filter: { },
        orderBy: 'UserName',
        ipp: 30,
        reverse: false,
        expand: []
    };

    $scope.$watchCollection('grid', function (newVal, oldVal) {
            updateGrid();
    });

    $scope.odata = function () {
        return odata.queryString({ filter: $scope.grid.filter, orderBy: $scope.grid.orderBy, reverse: $scope.grid.reverse });
    };

    init();

    function init() {
        updateGrid();
    }
        
    $scope.all = [];

    $scope.getAll = function () {
        $scope.UserService.getAll($scope.grid.filter, $scope.grid.expand).success(function (data) {
            $scope.all = data;
        });
    };

    function updateGrid() {
        var andQ = [];
        var qwords = $scope.grid.search.replace(',', '').split(' ');
        $.each(qwords, function (i, word) {
            andQ.push({ or: [{ Email: { contains: word } }, { UserName: { contains: word } }] });
        });
        $scope.grid.filter.and = andQ;
        $scope.UserService.get($scope.grid.page, $scope.grid.ipp, $scope.grid.filter, $scope.grid.orderBy, $scope.grid.reverse, $scope.grid.expand);
    }

}]);


/**
 * Created by Evan on 3/2/14.
 */

'use strict';

app.controller('userNewCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    $scope.add = function (user, form) {
        if (form.$invalid) return false;
        user.UserName = user.Email;
        (new api('User')).create(user).success(function (data) {
            $scope.$close(data);
        });
    };
        
    $scope.cancel = function(){
        $scope.$dismiss('cancel');
    };
        
    init();

    function init() {

    }

}]);

/**
 * Created by Evan on 3/1/14.
 */

'use strict';


app.controller('adminRegionEditCtrl', ['$scope', '$stateParams', 'api', '$state', function ($scope, $stateParams, api, $state) {

    $scope.RegionService = new api('Region');

    $scope.edit = {};

    $scope.saveEdit = function (edit, form) {
        var updated = {};
        angular.copy(edit, updated);
        if (form.$invald) return false;
        var data = { Director: updated.Director.id, Region: updated.Region};
        $scope.RegionService.patch($stateParams.id, data).success(function () {
            $state.go('app.admin.region.index');
        });
    }

    init();

    function init() {
        $scope.RegionService.getById($stateParams.id, { expand: ['Instructor'] }).success(function (data) {
            $scope.region = data;
            angular.copy($scope.region, $scope.edit)
        });
    }

}]);


/**
 * Created by Evan on 3/1/14.
 */

'use strict';

app.controller('adminRegionIndexCtrl', ['$scope', '$stateParams', 'api', '$rootScope', 'odata', '$location', function ($scope, $stateParams, api, $rootScope, odata, $location) {

    $scope.RegionService = new api('Region');
        
    $scope.regions = $scope.RegionService.grid;
        
    $scope.grid = {
        search: '',
        status: 1,
        page: 1,
        filter: { },
        orderBy: 'Region1',
        ipp: 30,
        reverse: false,
        expand: ['Instructor']
    };

    $scope.$watchCollection('grid', function (newVal, oldVal) {
            updateGrid();
    });

    $scope.odata = function () {
        return odata.queryString({ filter: $scope.grid.filter, orderBy: $scope.grid.orderBy, reverse: $scope.grid.reverse });
    };

    init();

    function init() {
        updateGrid();
    }
        
    $scope.all = [];

    $scope.getAll = function () {
        $scope.RegionService.getAll($scope.grid.filter, $scope.grid.expand).success(function (data) {
            $scope.all = data;
        });
    };

    function updateGrid() {
        var andQ = [];
        var qwords = $scope.grid.search.replace(',', '').split(' ');
        $.each(qwords, function (i, word) {
            andQ.push({ or: [{ 'Instructor/InstructorName': { contains: word } }, { Region1: { contains: word } }] });
        });
        $scope.grid.filter.and = andQ;
        $scope.RegionService.get($scope.grid.page, $scope.grid.ipp, $scope.grid.filter, $scope.grid.orderBy, $scope.grid.reverse, $scope.grid.expand);
    }

}]);


'use strict';

app.controller('startProcessIndexCtrl', ['$scope', function ($scope) {

    var today = new Date();
    $scope.tabs = { title: ['Asbestos', 'Basic Info', 'Dates', 'Fall Questions', 'Job Questions', 'Training & Misc', 'Additional Comments', 'Summary'] };
    $scope.addingQuestion = false;
    $scope.people = ['Christina', 'Beth', 'Jeff'];
    $scope.newQuestions = [];
    today.toLocaleDateString();
    $scope.values = { date: today, addingQuestionTitle:[] };
    $scope.page = { first: true, second: false, third: false, fourth: false, five: false, six: false, seven: false, eight: false };
    $scope.YesOrNo = [{ ID: 1, Word: 'Yes' }, { ID: 2, Word: 'No' }];
    $scope.typeOfBuilding = [{ ID: 1, Word: 'Public' }, { ID: 2, Word: 'Private' }];
    $scope.roofAccess = [{ ID: 1, Word: 'Internal Hatch' }, { ID: 2, Word: 'Exterior Ladder' }, { ID: 3, Word: 'Stairway' }, { ID: 4, Word: 'Elevator' }];
    $scope.project = [{ ID: 1, Word: 'Renovation' }, { ID: 2, Word: 'New Construction' }];
    $scope.protectionUsed = [{ ID: 1, Word: '100% tie off' }, { ID: 2, Word: 'Guardrail System' }, { ID: 3, Word: 'Warning Line System' }, { ID: 4, Word: 'Safety Monitor' }];
    $scope.guardRails = [{ ID: 1, Word: 'Side Mounts' }, { ID: 2, Word: 'Top Mounts' }, { ID: 3, Word: 'Parapet Wall' }];
    $scope.guardRailsProtection = [{ ID: 1, Word: 'Fall Protection' }, { ID: 2, Word: 'Fall Restraint' }];
    $scope.conditionNailer = [{ ID: 1, Word: 'Good Condition' }, { ID: 2, Word: 'Decent Condition' }, { ID: 3, Word: 'Poor Condition' }, { ID: 4, Word: 'Needs to be replaced' }];
    $scope.skylights = [{ ID: 1, Word: 'Removed and Covered' }, { ID: 2, Word: 'Covered in place' }, { ID: 3, Word: 'Flagged at 6 ft' }];
    $scope.pitchOfRoof = [{ ID: 1, Word: 'Low Slope: <= 4 in 12' }, { ID: 2, Word: 'Steep Slope: > 4 in 12' }];

    $scope.proceed = function (asbestosProject, isReasonEntered, reasonText) {
        if (asbestosProject === true) {
            if (isReasonEntered !== undefined) {
                if (isReasonEntered === 2) {
                    if (reasonText === "" || reasonText === undefined) {
                        alert("Must enter a reason for not having Inspection");
                    }
                    else { $scope.page.second = true; $scope.page.first = false; }
                }
                else { $scope.page.second = true; $scope.page.first = false; }
            }
            else { alert("You must select if an inspection has taken place") }
        } else { $scope.page.second = true; $scope.page.first = false; }
    };
        
    $scope.addToPage = function (title) {
        $scope.newQuestions.push(title);
        $scope.values.addingQuestionTitle = undefined;
        $scope.addingQuestion = false;
    };
        
    $scope.tab = function (value) {
        switch (value) {
            case 'one': $scope.page.second = false; $scope.page.first = true; $scope.page.third = false; $scope.page.fourth = false; $scope.page.five = false; $scope.page.six = false; $scope.page.seven = false; $scope.page.eight = false;
                break;
            case 'two': $scope.page.first = false; $scope.page.second = true; $scope.page.third = false; $scope.page.fourth = false; $scope.page.five = false; $scope.page.six = false; $scope.page.seven = false; $scope.page.eight = false;
                break;
            case 'three': $scope.page.first = false; $scope.page.second = false; $scope.page.third = true; $scope.page.fourth = false; $scope.page.five = false; $scope.page.six = false; $scope.page.seven = false; $scope.page.eight = false;
                break;
            case 'four': $scope.page.fourth = true; $scope.page.first = false; $scope.page.second = false; $scope.page.third = false; $scope.page.five = false; $scope.page.six = false; $scope.page.seven = false; $scope.page.eight = false;
                break;
            case 'five': $scope.page.five = true; $scope.page.fourth = false; $scope.page.first = false; $scope.page.second = false; $scope.page.third = false; $scope.page.six = false; $scope.page.seven = false; $scope.page.eight = false;
                break;
            case 'six': $scope.page.six = true; $scope.page.five = false; $scope.page.fourth = false; $scope.page.first = false; $scope.page.second = false; $scope.page.third = false; $scope.page.seven = false; $scope.page.eight = false;
                break;
            case 'seven': $scope.page.seven = true; $scope.page.six = false; $scope.page.five = false; $scope.page.fourth = false; $scope.page.first = false; $scope.page.second = false; $scope.page.third = false; $scope.page.eight = false;
                break;
            case 'eight': $scope.page.eight = true; $scope.page.seven = false; $scope.page.six = false; $scope.page.five = false; $scope.page.fourth = false; $scope.page.first = false; $scope.page.second = false; $scope.page.third = false;
                break;

        }
    }
    init();

    function init() {

    }

}]);


/**
 * Created by Evan on 3/1/14.
 */

'use strict';

app.controller('calendarCalendarCtrl', ['$scope', '$stateParams', 'api', 'odata', '$rootScope', '$http', function ($scope, $stateParams, api, odata, $rootScope, $http) {
    $scope.filter = {
        Instructor: false
    };

    $scope.$watch('filter.Instructor', function () {
        $("#ClassCalendar").fullCalendar('refetchEvents');
    });

    $("#ClassCalendar").fullCalendar({
        events: function (start, end, callback) {
            var qsObj = {
                filter: {
                    and: [
                        { ScheduledStartDate: { '>=': start } },
                        { ScheduledStartDate: { '<=': end } }
                    ]
                },
                expand: ['Instructor', 'ClassAttendees']
            };

            if ($scope.filter.Instructor) {
                qsObj.filter.and.push({ InstructorID: $scope.filter.Instructor.id });
            }

            $http.get('api/Class' + odata.queryString(qsObj)).success(function (doc) {
                callback($.map(doc["value"], convertToEvent));
            });
        }
    });

    function stringToColour(str) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        var colour = '#';
        for (var i = 0; i < 3; i++) {
            var value = (hash >> (i * 8)) & 0xFF;
            colour += ('00' + value.toString(16)).substr(-2);
        }
        return colour;
    }

    function getContrastYIQ(hexcolor) {
        if (hexcolor.charAt(0) === '#') {
            hexcolor = hexcolor.substr(1);
        }
        var r = parseInt(hexcolor.substr(0, 2), 16);
        var g = parseInt(hexcolor.substr(2, 2), 16);
        var b = parseInt(hexcolor.substr(4, 2), 16);
        var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? 'black' : 'white';
    }

    function convertToEvent(data) {
        var bgColor = stringToColour(data.Instructor && data.Instructor.InstructorName || 'Unknown');
        return {
            id: data.ClassID,
            title: data.ClassName + '\n\r' + data.ClassAttendees.length + ' Attendee' + (data.ClassAttendees.length !== 1 ? 's' : ''),
            start: data.ScheduledStartDate,
            end: data.ScheduledEndDate,
            backgroundColor: bgColor,
            textColor: getContrastYIQ(bgColor),
            allDay: true,
            url: '#!/class/detail/' + data.ClassID
        };
    };

}]);





/**
 * Created by Evan on 3/1/14.
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




/**
 * Created by Evan on 3/1/14.
 */

'use strict';

app.controller('detailDetailCtrl', ['$scope', '$stateParams', 'api', '$modal', '$q', function ($scope, $stateParams, api, $modal, $q) {
    var CoursesTaken = new api('CoursesTaken');
    $scope.Class = new api('Class');
    $scope.ClassAttendee = new api('ClassAttendee');
    $scope.ClassSession = new api('ClassSession');
    $scope.SigninAction = "SigninSheet?id=" + $stateParams.id;

    $scope.removeSession = function (itemToRemove) {
        $scope.ClassSession.remove(itemToRemove.ClassSessionID).success(init);
    };
  
    $scope.removeAttendee = function (itemToRemove) {
        $scope.ClassAttendee.remove(itemToRemove.ClassAttendeeID).success(init);
    };

    $scope.saveEdit = function (form, edit) {
            
        var updated = {};
        if (form.$invalid) return false;

        angular.copy(edit, updated);
        updated.InstructorID = updated.InstructorID && updated.InstructorID.id;
        updated.RegionID = updated.RegionID.id;
        updated.LocationCodeID = updated.LocationCodeID.id;
        delete updated.Instructor;
        delete updated['odata.metadata'];
        delete updated.Region;
        delete updated.LocationCode;
        delete updated.ClassAttendees;
        delete updated.ClassSessions;
        updated.ScheduledStartDate = updateDate('scheduleStDate');
        updated.ScheduledEndDate = updateDate('scheduleEndDate');

        $scope.Class.update($stateParams.id, updated).success(init);
    }

    init();

    function init() {
        $scope.Class.getById($stateParams.id, { expand: ['ClassAttendees/Employee', 'ClassAttendees/Employee/TLCompany', 'ClassSessions/Course', 'Instructor', 'Region', 'Region/Instructor', 'LocationCode', 'ClassSessions', 'ClassAttendees'] }).success(function (data) {
            $scope.class = data;
            if (data.Completed) {
                $scope.attended = [];
                angular.forEach(data.ClassAttendees, function (attendee) {
                    angular.forEach($scope.class.ClassSessions, function (course) {
                        CoursesTaken.get({ ipp: 1, filter: { and: [{ ClassID: data.ClassID }, { EmployeeID: attendee.EmployeeID }, { CourseID: course.CourseID }] }, expand: ['Employee', 'Employee/TLCompany', 'Course'] }).success(function (cert) {
                            if (cert['odata.count'] > 0) {
                                $scope.attended.push(cert.value[0]);
                            }
                        });
                    });
                })
            }
            $scope.tab[0] = true;
        });
    }

    $scope.openCompletedModal = function () {
        $modal.open({
            templateUrl: 'templates/class/detail/_complete.html',
            scope: $scope
        }).result.then(function (results) {
            var transactions = []
            $scope.Class.patch($scope.class.ClassID, { Completed: true });//, Zip: $scope.class.Zip.trim() 
            //$scope.class.Completed = true; //force set to true in order to hide 'Mark as complete' button
            angular.forEach(results.attendees, function (value, empId) {
                if (value) {
                    angular.forEach($scope.class.ClassSessions, function (course) {
                        transactions.push(CoursesTaken.create({ EmployeeID: empId, CourseID: course.CourseID, CertificationDate: $scope.class.ScheduledEndDate, ClassID: $scope.class.ClassID }));
                    });
                }
            });
            $q.all(transactions)['finally'](init);
        })
    }
     

    function updateDate(fId, obj) {
        var iD = $('#' + fId).val();
        if (iD != '') {
            var month = parseInt(iD.split('/')[0]);
            var day = parseInt(iD.split('/')[1]);
            var year = parseInt(iD.split('/')[2]);
            var mDate = new Date(year, month - 1, day);
            return mDate;
        }
    }
}]);

/**
 * Created by Evan on 3/2/14.
 */

'use strict';

app.controller('scheduleIndexCtrl', ['$scope', '$stateParams', 'api', '$location', function ($scope, $stateParams, api, $location) {
    $scope.ClassService = new api('Class');

    $scope.Sessions = [];

    $scope.add = function (Class, form) {
        $scope.$broadcast('show-errors-check-validity');

        if (form.$invalid) return false;
        Class.ScheduledEndTime = new Date("1/1/2000 " + Class.ScheduledEndTime + ":00");
        Class.ScheduledStartTime = new Date("1/1/2000 " + Class.ScheduledStartTime + ":00");
        Class.ScheduledEndDate = Class.ScheduledEndDate || Class.ScheduledStartDate;

        Class.ScheduledStartDate = updateDate('scheduledStartDate');
        Class.ScheduledEndDate = updateDate('scheduledEndDate');

        Class.Zip = Class.Zip.trim();

        if (Class.InstructorID) {
            Class.InstructorID = Class.InstructorID.id;
        }
        Class.LocationCodeID = Class.LocationCodeID.id;
        Class.RegionID = $scope.user.regionId;

        var attendees = [];
        var courses = [];

        if (Class.ClassAttendees) {
            for (var i = 0; i < Class.ClassAttendees.length; i++) {
                attendees.push({ EmployeeID: Class.ClassAttendees[i].id });
            }
        }

        for (var i = 0; i < $scope.Sessions.length; i++) {
            courses.push({ CourseID: $scope.Sessions[i].CourseID.id });
        }

        Class.ClassAttendees = attendees;
        Class.ClassSessions = courses;

        (new api('Class')).create(Class).success(function (data) {
            //                $scope.$close(data);
            $location.path('/class');
        });
    };
    $scope.locationChanged = function (Class) {

        var id = Class.LocationCodeID.id;
        if (id !== "") {
            $scope.LocationCodeService.getById(id).success(function (data) {
                Class.StreetAddress1 = data.LocationAddress;
                Class.StreetAddress2 = "";
                Class.City = data.LocationCity;
                Class.State = data.LocationState;
                Class.Zip = data.LocationZip;
            });
        }
    };

    $scope.addSession = function () {
        $scope.Sessions.push({ CourseID: 0 });
    };
    $scope.removeSession = function (idx) {
        var sessionToRemove = $scope.Sessions[idx];
        $scope.Sessions.splice(idx, 1);
    };
    //$scope.submit = function () {
    //    //alert($scope.class.InstructorID);
    //    if ($scope.class.InstructorID == undefined) { alert("Please select an instructor."); return; }
    //    if ($scope.class.ClassName == null) { alert("Class Name is required."); return; }
    //    if ($scope.class.ScheduledStartDate == null) { alert("Scheduled Start Date is required."); return; }
    //    if ($scope.class.LocationCodeID == undefined) { alert("Please select a Location."); return; }
    //    document.forms['addClass'].submit();

    //};
    $scope.cancel = function () {
        $location.path('/class');
    };

    init();
    function init() {
        $scope.Sessions.push({ CourseID: 0 });
    }


    function updateDate(fId) {
        var iD = $('#' + fId).val();
        if (iD != '') {
            var month = parseInt(iD.split('/')[0]);
            var day = parseInt(iD.split('/')[1]);
            var year = parseInt(iD.split('/')[2]);
            var mDate = new Date(year, month - 1, day);
            return mDate;
        }
    }

}]);


'use strict';

app.controller('membersNewCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    var CrewDetailService = new api('CrewDetail');
        

    $scope.addMember = function (add, form) {
        if (form.$invalid) return false;
        var success = true;
        var failedOn = [];
        $.each(add.Employees, function (index, employee) {
           
            CrewDetailService.create({ EmployeeID: employee.id, CrewID: $stateParams.id }).error(function () {
                success = false;
                failedOn.push(employee);
            });
           
        });
        if (!success)
            console.log(failedOn);
        $scope.$close(add);
    }



    $scope.cancel = function () {
        $scope.$dismiss('cancel');
    };

    init();

    function init() {

    }

}]);
/**
 * Created by Evan on 3/2/14.
 */

'use strict';

app.controller('dashboardAdd-certificationIndexCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    var coursesTaken = new api('CoursesTaken');
        
    $scope.addCert = function (cert, form) {
        if (form.$invalid) return false;
        var success = true;
        var failedOn = [];
        //modified to allow certs with no instructor
        if (cert.InstructorID == null) {
            cert.InstructorID = ' ';
            cert.InstructorID.id = ' ';
        }
        //
            cert.InstructorID = cert.InstructorID.id;
        $.each(cert.Employees, function (index, employee) {
            coursesTaken.create({ EmployeeID: employee.id, CourseID: cert.CourseID.id, CertificationDate: cert.CertificationDate, InstructorID: cert.InstructorID }).error(function () {
                success = false;
                failedOn.push(employee);
            });
        });
        if (!success)
            console.log(failedOn);
        $scope.$close(cert);
    };
        
    $scope.cancel = function(){
        $scope.$dismiss('cancel');
    };
        
    init();

    function init() {

    }

}]);

/**
 * Created by Evan on 3/2/14.
 */

'use strict';

app.controller('add-to-courseIndexCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {
        
    $scope.add = function(cert){
        if($scope.addToCourse.$invalid) return false;
        $.each(cert.employees,function(index, employee){
            (new api('CoursesTaken')).create({EmployeeID: $scope.employee.EmployeeID, CourseID: cert.CourseID, CertificationDate: cert.CertificationDate});
        });
        $scope.$close(cert);
    };
        
    $scope.cancel = function(){
        $scope.$dismiss('cancel');
    };
        
    init();

    function init() {

    }

}]);

/**
 * Created by Evan on 3/2/14.
 */

'use strict';

app.controller('certificationEditCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    $scope.Employee = new api('Employee');
    $scope.CoursesTaken = new api('CoursesTaken');
        
    $scope.editCert = function (cert, form) {
        if (form.$invalid) return false;

        var certDate = updateDate('certificationDate');

        $scope.CoursesTaken.patch($stateParams.cert, { EmployeeID: $scope.employee.EmployeeID, CourseID: cert.CourseID.id, CertificationDate: certDate, InstructorID: cert.InstructorID && cert.InstructorID.id || null })
            .success(function () {
                $scope.$close(cert)
            });
    };

    $scope.deleteCert = function (cert) {
        $scope.CoursesTaken.patch($stateParams.cert, {Deleted: true})
            .success(function () {
                cert.Deleted = true; //force set to true to hide immediately
                $scope.$close(cert);
            });
    }
        
    $scope.cancel = function(){
        $scope.$dismiss('cancel');
    };
        
    init();

    function init() {
        $scope.CoursesTaken.getById($stateParams.cert).success(function (data) {
            $scope.cert = data;
        });
        $scope.Employee.getById($stateParams.id).success(function (data) {
            $scope.employee = data;
        });
    }

    function updateDate(fId) {
        var iD = $('#' + fId).val();
        if (iD != '') {
            var month = parseInt(iD.split('/')[0]);
            var day = parseInt(iD.split('/')[1]);
            var year = parseInt(iD.split('/')[2]);
            var mDate = new Date(year, month - 1, day);
            return mDate;
        }
    }

}]);

/**
 * Created by Evan on 3/2/14.
 */

'use strict';

app.controller('certificationNewCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    $scope.Employee = new api('Employee');
        
    $scope.addCert = function (cert, form) {
        if (form.$invalid) return false;
        //modified to accept certs without instructors
        if (cert.InstructorID == null) {
            cert.InstructorID = ' ';
            cert.InstructorID.id = ' ';
        }
        //
        (new api('CoursesTaken')).create({ EmployeeID: $scope.employee.EmployeeID, CourseID: cert.CourseID.id, CertificationDate: updateDate('certificationDate'), InstructorID: cert.InstructorID.id })
                .success(function () {
                    $scope.$close(cert)
                });
    };
        
    $scope.cancel = function(){
        $scope.$dismiss('cancel');
    };
        
    init();

    function init() {
        $scope.Employee.getById($stateParams.id).success(function (data) {
            $scope.employee = data;
        });
    }

    function updateDate(fId) {
        var iD = $('#' + fId).val();
        if (iD != '') {
            var month = parseInt(iD.split('/')[0]);
            var day = parseInt(iD.split('/')[1]);
            var year = parseInt(iD.split('/')[2]);
            var mDate = new Date(year, month - 1, day);
            return mDate;
        }
    }

}]);

/**
 * Created by Evan on 3/1/14.
 */

'use strict';

app.controller('expiredIndexCtrl', ['$scope', '$stateParams', 'api', '$rootScope', 'odata', function ($scope, $stateParams, api, $rootScope, odata) {

    $scope.EmployeeService = new api('Employee');
    $scope.CoursesServices = new api('Course');
    $scope.CoursesTakenSearch = new api('CoursesTakenSearch');

    $scope.expiredCerts = $scope.CoursesTakenSearch.grid;

    $scope.expOptions = [{ name: '', val: '' }, { name: 'Yes', val: 'YES' }, { name: 'No', val: 'NO' }];

    $scope.odata = function () {
        return odata.queryString({ filter: $scope.grid.filter, orderBy: $scope.grid.orderBy, reverse: $scope.grid.reverse });
    };

    $scope.$on('CompanyChange', updateGrid);

    $scope.grid = {
        search: '',
        page: 1,
        filter: {},
        orderBy: 'EmployeeLastName',
        ipp: 30,
        reverse: false,
        FirstName: '',
        LastName: '',
        CourseDesc: '',
        Location: '',
        TLEmployee: '',
        EmployeeStatusID: '',
        Expired: ''
    };

    $scope.$watchCollection('grid', function (newVal, oldVal) {
        updateGrid()
    });

    init();

    function init() {
        updateGrid()
    }

    function updateGrid() {
        var statusID = $scope.grid.EmployeeStatusID.id == undefined ? '' : $scope.grid.EmployeeStatusID.id;
        var qs = "&Sort=" + $scope.grid.orderBy + "&Expired="+$scope.grid.Expired+"&DBID=" + ($rootScope.CompanyId && $rootScope.CompanyId.id || $rootScope.CompanyId || '') + "&FirstName=" + $scope.grid.FirstName + "&LastName=" + $scope.grid.LastName + "&CourseDesc=" + $scope.grid.CourseDesc + "&TLEmployee=" + $scope.grid.TLEmployee + "&Location=" + $scope.grid.Location + "&EmployeeStatusID=" + statusID;
        $scope.CoursesTakenSearch.get($scope.grid.page, $scope.grid.ipp, {}, $scope.grid.orderBy, $scope.grid.reverse, null, qs);
    }

}]);

/**
 * Created by Evan on 3/1/14.
 */

'use strict';

app.controller('expiringIndexCtrl', ['$scope', '$stateParams', 'api', '$rootScope', 'odata', function ($scope, $stateParams, api, $rootScope, odata) {

    $scope.EmployeeService = new api('Employee');
    $scope.CoursesServices = new api('Course');
    $scope.CoursesTakenSearch = new api('CoursesTakenSearch');

    $scope.expiredCerts = $scope.CoursesTakenSearch.grid;

    $scope.odata = function () {
        return odata.queryString({ filter: $scope.grid.filter, orderBy: $scope.grid.orderBy, reverse: $scope.grid.reverse });
    };

    $scope.$on('CompanyChange', updateGrid);

    $scope.grid = {
        expiresIn: 90,
        search: '',
        page: 1,
        filter: {},
        orderBy: 'EmployeeLastName',
        ipp: 30,
        reverse: false,
        FirstName: '',
        LastName: '',
        CourseDesc: '',
        Location: '',
        TLEmployee: '',
        EmployeeStatusID: ''
    };

    $scope.$watchCollection('grid', function (newVal, oldVal) {
        updateGrid()
    });

    init();

    function init() {
        updateGrid()
    }

    function updateGrid() {
        var statusID = $scope.grid.EmployeeStatusID.id == undefined ? '' : $scope.grid.EmployeeStatusID.id;
        var qs = "&Days=" + $scope.grid.expiresIn + "&Sort=" + $scope.grid.orderBy + "&Expired=No&DBID=" + ($rootScope.CompanyId && $rootScope.CompanyId.id || $rootScope.CompanyId || '') + "&FirstName=" + $scope.grid.FirstName + "&LastName=" + $scope.grid.LastName + "&CourseDesc=" + $scope.grid.CourseDesc + "&TLEmployee=" + $scope.grid.TLEmployee + "&Location=" + $scope.grid.Location + "&EmployeeStatusID=" + statusID;
        $scope.CoursesTakenSearch.get($scope.grid.page, $scope.grid.ipp, {}, $scope.grid.orderBy, $scope.grid.reverse, null, qs);
    }

}]);

/**
 * Created by Evan on 3/1/14.
 */

'use strict';

app.controller('expiringmedsIndexCtrl', ['$scope', '$stateParams', 'api', '$rootScope', 'odata', function ($scope, $stateParams, api, $rootScope, odata) {

    $scope.EmployeeService = new api('Employee');
    $scope.CoursesServices = new api('Course');
    $scope.MedicalSearch = new api('MedicalSearch');
    $scope.CoursesTakenSearch = new api('CoursesTakenSearch');

    $scope.meds = $scope.MedicalSearch.grid;

    $scope.odata = function () {
        return odata.queryString({ filter: $scope.grid.filter, orderBy: $scope.grid.orderBy, reverse: $scope.grid.reverse });
    };

    $scope.$on('CompanyChange', updateGrid);

    $scope.grid = {
        expiresIn : 90,
        search: '',
        page: 1,
        filter: {},
        orderBy: 'EmployeeLastName',
        ipp: 30,
        reverse: false,
        FirstName: '',
        LastName: '',
        MedicalTest: ''
    };

    $scope.$watchCollection('grid', function (newVal, oldVal) {
        updateGrid()
    });

    init();

    function init() {
        updateGrid()
    }

    function updateGrid() {
        var qs = "&Days=" + $scope.grid.expiresIn + "&Sort=" + $scope.grid.orderBy + "&Expired=No&DBID=" + ($rootScope.CompanyId && $rootScope.CompanyId.id || $rootScope.CompanyId || '') + "&FirstName=" + $scope.grid.FirstName + "&LastName=" + $scope.grid.LastName + "&MedicalTest=" + $scope.grid.MedicalTest
        $scope.MedicalSearch.get($scope.grid.page, $scope.grid.ipp, {}, $scope.grid.orderBy, $scope.grid.reverse, null, qs);
    }

}]);

/**
 * Created by Evan on 3/2/14.
 */

'use strict';

app.controller('medicalsEditCtrl', ['$scope', '$stateParams', 'api', '$q', function ($scope, $stateParams, api, $q) {

    $scope.Employee = new api('Employee');
    $scope.EmployeeMedical = new api('EmployeeMedical');

    $scope.editMedical = function (med, form) {
        if (form.$invalid) return false;
        //modified to accept certs without instructors
        if (med.MedicalTestID == null) {
            med.MedicalTestID = ' ';
            med.MedicalTestID.id = ' ';
        }

        var medDate = updateDate('medicalDate');

        var promises = [];
        var promise = $scope.EmployeeMedical.patch($stateParams.med, { EmployeeID: $scope.employee.EmployeeID, MedicalTestID: med.MedicalTestID.id, MedicalTestDate: medDate, MedicalNote: med.MedicalNote })
        promises.push(promise);

        $q.all(promises)
            .then(function (results) {
                $scope.$close(med);
            });
    };


    $scope.cancel = function () {
        $scope.$dismiss('cancel');
    };


    $scope.deleteMed = function (med) {
        $scope.EmployeeMedical.patch($stateParams.med, { Deleted: true })
            .success(function () {
                med.Deleted = true; //force set to true to hide immediately
                $scope.$close(med);
            });
    }

    init();

    function init() {
        $scope.EmployeeMedical.getById($stateParams.med).success(function (data) {
            $scope.med = data;
        });
        $scope.Employee.getById($stateParams.id).success(function (data) {
            $scope.employee = data;
        });
    }
       

    $scope.$watch('med.MedicalTestDate', function (newVal, oldVal) {
        console.log(newVal);
        // medDate = newVal | newVal.getUTCDate();
        //  var mDate = newVal | newVal.getDate();
                
    })

    function updateDate(fId) {
        var iD = $('#' + fId).val();
        if (iD != '') {
            var month = parseInt(iD.split('/')[0]);
            var day = parseInt(iD.split('/')[1]);
            var year = parseInt(iD.split('/')[2]);
            var mDate = new Date(year, month-1, day);
            return mDate;
        }
    }

}]);

/**
 * Created by Evan on 3/2/14.
 */

'use strict';

app.controller('medicalsNewCtrl', ['$scope', '$stateParams', 'api', '$q', function ($scope, $stateParams, api, $q) {

    $scope.Employee = new api('Employee');

    $scope.addMedical = function (med, form) {
        if (form.$invalid) return false;
        //modified to accept meds without med test
        if (med.MedicalTestID == null) {
            med.MedicalTestID = ' ';
            med.MedicalTestID.id = ' ';
        }
            
        var mtDate = updateDate('mtDate');
        var promises = [];
        med.MedicalTestID.forEach(function (element, index, array) {
            var promise = (new api('EmployeeMedical')).create({ EmployeeID: $scope.employee.EmployeeID, MedicalTestDate: mtDate, MedicalTestID: element.id, MedicalNote: med.MedicalNote, Deleted: false });
            promises.push(promise);

            //(new api('EmployeeMedical')).create({ EmployeeID: $scope.employee.EmployeeID, MedicalTestDate: med.MedicalTestDate, MedicalTestID: element.id, MedicalNote: med.MedicalNote })
            //     .success(function () {
            //         $scope.$close(med)
            //     });
        });

        $q.all(promises)
            .then(function (results) {
                $scope.$close(med);
            });

    };

    $scope.cancel = function () {
        $scope.$dismiss('cancel');
    };

    init();

    function init() {
        $scope.Employee.getById($stateParams.id).success(function (data) {
            $scope.employee = data;
        });
    }

    function updateDate(fId) {
        var iD = $('#' + fId).val();
        if (iD != '') {
            var month = parseInt(iD.split('/')[0]);
            var day = parseInt(iD.split('/')[1]);
            var year = parseInt(iD.split('/')[2]);
            var mDate = new Date(year, month - 1, day);
            return mDate;
        }
    }

}]);

/**
 * Created by Evan on 3/2/14.
 */

'use strict';

app.controller('noteEditCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    $scope.EmployeeNotes = new api('EmployeeNotes');

    $scope.employeeId = $stateParams.id;

    $scope.EmployeeNotes.getById($stateParams.note).success(function (data) {
        $scope.note = data;
    })
        
    $scope.editNote = function (note, form) {
        if (form.$invalid) return false;
        $scope.EmployeeNotes.update(note.EmployeeNoteID, note).success(function () {
            $scope.$close(note);
        });
    };

        
    $scope.cancel = function(){
        $scope.$dismiss('cancel');
    };

}]);

/**
 * Created by Evan on 3/2/14.
 */

'use strict';

app.controller('noteNewCtrl', ['$scope', '$stateParams', 'api', function ($scope, $stateParams, api) {

    $scope.EmployeeNotes = new api('EmployeeNotes');

    $scope.employeeId = $stateParams.id;
        
    $scope.addNote = function (note, form) {
        if (form.$invalid) return false;
        $scope.EmployeeNotes.create(note).success(function () {
            $scope.$close(note);
        });
    };

        
    $scope.cancel = function(){
        $scope.$dismiss('cancel');
    };

}]);

/**
 * Created by Evan on 3/1/14.
 */

'use strict';


app.controller('adminUserCompaniesEditCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {

    $scope.User = new api('User');
    $scope.CompanyService = new api('Company');

    $scope.companies = $scope.CompanyService.grid;

    $scope.grid = {
        search: '',
        page: 1,
        filter: {},
        orderBy: ['Company_Name'],
        ipp: 30,
        reverse: false,
        expand: []
    };

    $scope.$watch('grid', function (newVal, oldVal) {
        updateGrid()
    }, true);

    $scope.$on('CompanyChange', updateGrid);

    $scope.odata = function () {
        return odata.queryString({ filter: $scope.grid.filter, orderBy: $scope.grid.orderBy, reverse: $scope.grid.reverse });
    };

    function updateGrid() {
        $scope.CompanyService.get($scope.grid.page, $scope.grid.ipp, $scope.grid.filter, $scope.grid.orderBy, $scope.grid.reverse, $scope.grid.expand);
    }

       
    $scope.saveEdit = function (edit, form) {
        var updated = {};
        edit.DBID = edit.DBID.id;
        edit.Occupation = edit.Occupation.id;
        edit.UserStatusID = edit.UserStatusID.id;
        angular.copy(edit, updated);
        if (form.$invald) return false;
        delete edit['TLCompany'];
        delete edit.CompanysTakens;
        delete edit.UserStatu;
        $scope.User.update($stateParams.id, edit).success(function () {
            $scope.user = updated;
            $scope.user.Password = '';
            $scope.user.ConfirmPassword = ''
            $scope.tab[0] = true;
        });
        location.reload()
    }

    init();

    function init() {
        $scope.User.getById($stateParams.id, { expand: ['UserAccesses'] }).success(function (data) {
            $scope.user = data;
        });
        updateGrid();
    }

}]);


/**
 *
 */

'use strict';

app.controller('attendeeEditCtrl', ['$scope', '$stateParams', 'api', 'odata', '$rootScope', function ($scope, $stateParams, api, odata, $rootScope) {

    $scope.ClassService = new api('Class');

    init();

    function init() {
        updateGrid()
    }

    function updateGrid() {
        
    }
      
}]);
/**
 *
 */

'use strict';

app.controller('attendeeNewCtrl', ['$scope', '$stateParams', 'api', 'odata', '$rootScope', function ($scope, $stateParams, api, odata, $rootScope) {

    $scope.Class = new api('Class');
    $scope.ClassAttendee = new api('ClassAttendee');
        
    $scope.class = {};
    $scope.AttendeesCount = 0;

    $scope.addAttendees = function (attendees, form) {
        if (form.$invalid) return false;
        var classID = $scope.class.ClassID;
        $scope.AttendeesCount = attendees.length;
        for (var i = 0; i < attendees.length; i++) {
            $scope.ClassAttendee.create({ ClassID: classID, EmployeeID: attendees[i].id }).success(function (data) {
                $scope.close();
            });
        }
  
    };
    $scope.close = function () {
        $scope.AttendeesCount--;

        if ($scope.AttendeesCount <= 0) {
            $scope.$close();
        }
    };
    $scope.cancel = function () {
        $scope.$dismiss('cancel');
    };

    init();

    function init() {
        $scope.Class.getById($stateParams.id, { expand: ['ClassAttendees'] }).success(function (data) {
            $scope.class = data;
        });
    }
      
}]);

/**
 *
 */

'use strict';

app.controller('sessionEditCtrl', ['$scope', '$stateParams', 'api', 'odata', '$rootScope', function ($scope, $stateParams, api, odata, $rootScope) {

    $scope.ClassService = new api('Class');


    init();

    function init() {
        updateGrid()
    }

    function updateGrid() {
        
    }
      
}]);

/**
 *
 */

'use strict';

app.controller('sessionNewCtrl', ['$scope', '$stateParams', 'api', 'odata', '$rootScope', function ($scope, $stateParams, api, odata, $rootScope) {

    $scope.ClassService = new api('Class');
    $scope.ClassSession = new api('ClassSession');


    $scope.class = {};


    $scope.addSessions = function (newSession, form) {
        if (form.$invalid) return false;
        var classID = $scope.class.ClassID;

        $scope.ClassSession.create({ ClassID: classID, CourseID: newSession.Item.id }).success(function (data) {
                $scope.$close(data);
            });
        

    };


    $scope.cancel = function () {
        $scope.$dismiss('cancel');
    };


    init();

    function init() {
        updateGrid()
    }

    function updateGrid() {
        $scope.ClassService.getById($stateParams.id, { expand: ['ClassSessions'] }).success(function (data) {
            $scope.class = data;
        });
    }
      
}]);
