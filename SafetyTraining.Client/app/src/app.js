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

