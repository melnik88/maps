/*jslint browser:true */
/*global angular, console*/
'use strict';

/* Services */

angular.module('Game.services', [])
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
    )
    .factory('User', function ($rootScope, localStorageService) {
        var login,
            logout,
            createToken,
            restoreToken,
            is_login;

        createToken = function () {
            return Math.random().toString(36).substr(2);
        };

        login = function (name, character) {
            console.log('user enter someinfo');
            switch (character) {
            case "zombie_boy":
                $rootScope.character = {
                    name: name,
                    xp: 20,
                    coords: {
                        lat: 0,
                        lon: 0
                    }
                };
                break;
            case "zombie_girl":
                $rootScope.character = {
                    name: name,
                    xp: 10,
                    coords: {
                        lat: 0,
                        lon: 0
                    }
                };
                break;
            }

            $rootScope.token = createToken();
            localStorageService.clearAll();
            localStorageService.set('token', $rootScope.token);

        };

        restoreToken = function () {
            console.log(localStorageService.get('token'));
            return localStorageService.get('token');
        };

        is_login = function () {
            console.log('$rootScope.token = ' +  $rootScope.token.length);
            var result;
            if ($rootScope.token.length !== 0) {
                console.log('rootScope is ' + $rootScope.token);
                result = true;
            }
            else {
                result = false;
            }
            return result;
        };

        logout = function () {
            localStorageService.clearAll();
        };

        return {
            login: login,
            logout: logout,
            is_login: is_login,
            restoreToken: restoreToken
        };
    });