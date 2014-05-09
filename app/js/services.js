/*jslint browser:true */
/*global angular, console*/
'use strict';

/* Services */

angular.module('myApp.services', [])
    .constant(
        'MAP_PARAMS',
        {
            'WIDTH': 635,
            'HEIGHT': 810,
            'SCALE': 1120,
            'SRC': 'img/zheleznodorozhny.jpg',
            'LAT0': 55.753200,
            'LON0': 38.004990,
            'LAT1': 55.746016,
            'LON1': 38.015001
        }
    )
    .constant(
        'FIREBASE_PARAMS',
        {
            'PATH': 'https://mymaps.firebaseio.com/'
        }
    );
