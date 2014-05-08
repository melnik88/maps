/*jslint browser:true */
/*global angular, console*/
'use strict';

/* Controllers */
angular.module('myApp.controllers', [])
    .controller('loginCtrl', function ($scope, $rootScope, $location, localStorageService) {
        var createToken;

        createToken = function () {
            return Math.random().toString(36).substr(2);
        };

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

            $rootScope.token = createToken();
            localStorageService.clearAll();
            localStorageService.set('token', $rootScope.token);

            $location.path('/app');
//            тут можно создавать и присваивать уникальный токен






        };


    })
    .controller('appCtrl', function ($scope, geolocation, $rootScope, MAP_PARAMS, $firebase, localStorageService) {
        var pushMyDataToFirebase,
            firebaseConnect,
            getAllData,
            playerInit;

        firebaseConnect = new Firebase("https://mymaps.firebaseio.com");

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

        playerInit = function (){
                $rootScope.token = localStorageService.get('token');
                var dataRef = new Firebase('https://mymaps.firebaseio.com/' + $rootScope.token);
                dataRef.on('value', function(snapshot) {
                    $rootScope.character = snapshot.val();
                    console.log($rootScope.character)
                });
            console.log('player is inited')
        }

        getAllData = function () {
            firebaseConnect.on('child_added', function (snapshot) {
//            console.log(snapshot.val().coords);
            console.log('data is updated');
            $scope.CoordsData = snapshot.val().coords;

        });

        }

        if ($rootScope.token == undefined) { playerInit(); }


        pushMyDataToFirebase = function () {
            geolocation.getLocation().then(function (data) {
                var obj = {};

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

