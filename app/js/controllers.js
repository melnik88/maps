/*jslint browser:true */
/*global angular, console*/
'use strict';

/* Controllers */
angular.module('myApp.controllers', [])
    .controller('loginCtrl', function ($scope, $rootScope, $location) {
        $scope.character = 'zombie';

        $scope.loginUser = function (name, character) {
            switch (character) {
            case "zombie_boy":
                $rootScope.character = {
                    name: name,
                    xp: 20,
                    coords:
                        {
                            lat: 0,
                            lon: 0
                        }
                };
                break;
            }
            $location.path('/app');
        };


    })
    .controller('appCtrl', function ($scope, geolocation, $rootScope, MAP_PARAMS, $firebase) {
        var pushMyDataToFirebase,
            firebaseConnect,
            createToken,
            getAllData;

        firebaseConnect = new Firebase("https://mymaps.firebaseio.com");
//      масштаб карты (метры, брать с карты)

        $scope.mapScale = MAP_PARAMS.SCALE;
        $scope.CanvasWidth = 658;
        $scope.CanvasHeight = 856;
//  салтыковка
////        левый верхний угол
//        $scope.lat_0 = 55.745992;
//        $scope.lon_0 = 37.925026;
////        правый нижний угол
//        $scope.lat_1 = 55.742404;
//        $scope.lon_1 = 37.929984;

//        железнодорожный

//        левый верхний угол
        $scope.lat_0 = 55.753200;
        $scope.lon_0 = 38.004990;
//        правый нижний угол
        $scope.lat_1 = 55.746016;
        $scope.lon_1 = 38.015001;


        $scope.dotScale = 6;


        $scope.y_coef = Math.abs(MAP_PARAMS.HEIGHT / ($scope.lat_1 - $scope.lat_0));
        $scope.x_coef = Math.abs(MAP_PARAMS.WIDTH / ($scope.lon_1 - $scope.lon_0));

//        firebaseConnect.on('child_changed', function (snapshot) {
//            console.log('data is updated');
//            $scope.CoordsData = snapshot.val().coords;
//
//        });

//        firebaseConnect.on('value', function (snapshot) {
//            console.log('data is updated');
//            $scope.CoordsData = snapshot.val().coords;
//
//        });


//        firebaseConnect.on('child_added', function (snapshot) {
////            console.log(snapshot.val().coords);
//            console.log('data is updated');
//            $scope.CoordsData = snapshot.val().coords;
//
//        });


        createToken = function () {
            return Math.random().toString(36).substr(2);
        };
        $rootScope.token = createToken();


        getAllData = function () {
            firebaseConnect.on('child_added', function (snapshot) {
//            console.log(snapshot.val().coords);
            console.log('data is updated');
            $scope.CoordsData = snapshot.val().coords;

        });

        }


        pushMyDataToFirebase = function () {
            console.log("push data to database");
            var obj = {};
            geolocation.getLocation().then(function (data) {
                $scope.coords = {lat: data.coords.latitude, lon: data.coords.longitude };
                obj[$rootScope.token] = {
                    name: $rootScope.character.name,
                    coords: $scope.coords,
                    xp: $rootScope.character.xp
                };
                firebaseConnect.update(obj, getAllData);

            });
        };

        setInterval(pushMyDataToFirebase, '2000');

    });

