/*jslint browser:true */
/*global angular, console*/
'use strict';

// Declare app level module which depends on filters, and services
angular.module('Game', [
    'ngRoute',
    'geolocation',
    'LocalStorageModule',
    'firebase',
    'Game.filters',
    'Game.services',
    'Game.directives',
    'Game.controllers'

])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/login', {templateUrl: 'partials/login.html', controller: 'loginCtrl'})
            .when('/app', {templateUrl: 'partials/app.html', controller: 'gameCtrl'})
            .when('/settings', {templateUrl: 'partials/settings.html', controller: 'gameCtrl'})
            .when('/bag', {templateUrl: 'partials/bag.html', controller: 'gameCtrl'})
            .otherwise({redirectTo: '/login'});
    }]);
