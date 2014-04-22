'use strict';
/*jslint browser:true */
/*global angular, console*/

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
    .constant(
    'MAP_PARAMS', {
            'WIDTH': 553,
            'HEIGHT': 696
    })

//  value('version', '0.1');
