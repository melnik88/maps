/*jslint browser:true */
/*global angular, console*/
'use strict';

/* Controllers */
angular.module('myApp.controllers', [])
    .controller('pointsCtrl', ['$scope', 'geolocation','MAP_PARAMS','$firebase', function ($scope, geolocation, MAP_PARAMS, $firebase) {
        var getMap,
            firebaseConnect;
//      соединение с бд
        firebaseConnect = new Firebase("https://mymaps.firebaseio.com/players");

        $scope.lat_1

        $scope.y_coef = Math.abs(MAP_PARAMS.HEIGHT / ($scope.lat_1 - $scope.lat_0));
        $scope.x_coef = Math.abs(MAP_PARAMS.WIDTH/ ($scope.lon_1 - $scope.lon_0));

        getMap = function () {
            geolocation.getLocation().then( function (data) {
                //получение своих координат
                var coords = { lat: data.coords.latitude, long: data.coords.longitude };
                //запись координат в базу
                firebaseConnect.update({name: "vasia", coords: coords});
            });
        };
//        получение данных каждую секунду
       setInterval(getMap, '1000');
    }]);
//  .controller('MyCtrl2', [function() {
//
//  }]);

