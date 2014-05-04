'use strict';
/*jslint browser:true */
/*global angular, console*/

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
    .constant(
        'MAP_PARAMS',
        {
            'WIDTH': 556,
            'HEIGHT': 692,
            'SCALE': 1120,
            'SRC': 'img/map2.jpg'
        }
    );
