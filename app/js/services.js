'use strict';
/*jslint browser:true */
/*global angular, console*/

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
    .constant(
    'MAP_PARAMS', {

            'WIDTH' : 553,
            'HEIGHT' : 696,
            'LAT0' : 55.745966,
            'LON0' : 37.925005,
            'LAT1' : 55.742401,
            'LON1' : 37.930010,
            'SCALE': 1120

    })

//  value('version', '0.1');
