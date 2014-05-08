'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'geolocation',
  'LocalStorageModule',
  'firebase',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'

]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'loginCtrl'});
  $routeProvider.when('/app', {templateUrl: 'partials/app.html', controller: 'appCtrl'});
  $routeProvider.otherwise({redirectTo: '/login'});
}]);