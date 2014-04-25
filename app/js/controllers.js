/*jslint browser:true */
/*global angular, console*/
'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('pointsCtrl', ['$scope', 'geolocation','MAP_PARAMS','$firebase', function ($scope, geolocation, MAP_PARAMS, $firebase) {
        var translateCoords,
            getScale,
            getCoords,
            getMap,
            coords,
            firebaseConnect;

        firebaseConnect = new Firebase("https://mymaps.firebaseio.com");
        firebaseConnect.on('child_added', function(snapshot) {
            $scope.CoordsData = snapshot.val();

        });




//        масштаб карты (метры, брать с карты)
        $scope.mapScale = 706;
//        левый верхний угол
        $scope.lat_0 = 55.745966;
        $scope.lon_0 = 37.925005;
//        правый нижний угол
        $scope.lat_1 = 55.742401;
        $scope.lon_1 = 37.930010;

        $scope.y_coef = Math.abs(MAP_PARAMS.HEIGHT / ($scope.lat_1 - $scope.lat_0));
        $scope.x_coef = Math.abs(MAP_PARAMS.WIDTH/ ($scope.lon_1 - $scope.lon_0));

        getScale = function () {
//подсчет масштаба карты. Пока не реализовано
        };

        getMap = function () {
            geolocation.getLocation().then( function (data) {
                $scope.coords = { lat: data.coords.latitude, long: data.coords.longitude };
                firebaseConnect.push({name: "vasia", coords: $scope.coords});

            });
        };

        getMap();
        console.log($scope.CoordsData);




//        setInterval(getMyLocation, '1000');
    }]);
//  .controller('MyCtrl2', [function() {
//
//  }]);

