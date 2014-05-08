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
            'WIDTH': 635,
            'HEIGHT': 810,
            'SCALE': 1120,
            'SRC': 'img/zheleznodorozhny.jpg'
        }
    )
    .constant(
        'FIREBASE_PARAMS',
        {
            'PATH': 'https://mymaps.firebaseio.com'
        }
    )
