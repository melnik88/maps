/*jslint browser:true */
/*global angular, console*/
'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('loginCtrl',['$scope', function(){
    }])
    .controller('appCtrl',['$scope', function(){
    }])
    .controller('pointsCtrl', ['$scope', 'geolocation','MAP_PARAMS','$firebase', function ($scope, geolocation, MAP_PARAMS, $firebase) {
        var getMap,
            firebaseConnect;

        firebaseConnect = new Firebase("https://mymaps.firebaseio.com");
        firebaseConnect.on('child_added', function(snapshot) {
            $scope.CoordsData = snapshot.val();

        });

//      масштаб карты (метры, брать с карты)
        $scope.mapScale = MAP_PARAMS.SCALE;
        $scope.CanvasWidth = 658;
        $scope.CanvasHeight = 856;
//        левый верхний угол
        $scope.lat_0 = 55.753199;
        $scope.lon_0 = 38.004983;
//        правый нижний угол
        $scope.lat_1 = 55.746013;
        $scope.lon_1 = 38.014992;

        $scope.dotScale = 6;

        $scope.y_coef = Math.abs(MAP_PARAMS.HEIGHT / ($scope.lat_1 - $scope.lat_0));
        $scope.x_coef = Math.abs(MAP_PARAMS.WIDTH / ($scope.lon_1 - $scope.lon_0));


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

