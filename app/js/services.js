/*jslint browser:true */
/*global angular, console*/
'use strict';

/* Services */

angular.module('myApp.services', [])
    .constant(
        'MAP_PARAMS',
        {
            'WIDTH': 556,
            'HEIGHT': 697,
            'SCALE': 1120,
            'SRC': 'img/map2.jpg',
            'LAT0': 55.745989,
            'LON0': 37.924999,
            'LAT1': 55.742361,
            'LON1': 37.929990
        }
    )
    .constant(
        'FIREBASE_PARAMS',
        {
            'PATH': 'https://mymaps.firebaseio.com/'
        }
    );
