/**
 * Created by Tony Mack on 2/28/14.
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
