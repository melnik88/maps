/*jslint browser:true */
/*global angular, console, Firebase*/
'use strict';

/* Controllers */
angular.module('myApp.controllers', [])
    .controller('loginCtrl', function ($scope, $rootScope, $location, localStorageService) {
    $scope.character = 'zombie_boy';
        $scope.createToken = function () {
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

            case "zombie_girl":
                $rootScope.character = {
                    name: name,
                    xp: 10,
                    coords:
                        {
                            lat: 0,
                            lon: 0
                        }
                };
                break;
            }

            $rootScope.token = $scope.createToken();
            localStorageService.clearAll();
            localStorageService.set('token', $rootScope.token);
            $location.path('/app');
        };
    })
    .controller('appCtrl', function ($scope, MAP_PARAMS, FIREBASE_PARAMS, geolocation, $rootScope, $firebase,  localStorageService) {

        $scope.firebaseConnect = new Firebase(FIREBASE_PARAMS.PATH);

        $scope.mapScale = MAP_PARAMS.SCALE;
        $scope.CanvasWidth = 658;
        $scope.CanvasHeight = 856;

//      dot size
        $scope.dotScale = 6;
        $scope.y_coef = Math.abs(MAP_PARAMS.HEIGHT / (MAP_PARAMS.LAT1 - MAP_PARAMS.LAT0));
        $scope.x_coef = Math.abs(MAP_PARAMS.WIDTH / (MAP_PARAMS.LON1 - MAP_PARAMS.LON0));

        $scope.pushInterval = null;

//      init player from localstorage
        $scope.playerInit = function () {
            $rootScope.token = localStorageService.get('token');
            var dataRef = new Firebase(FIREBASE_PARAMS.PATH + $rootScope.token);
            dataRef.on('value', function(snapshot) {
                $rootScope.character = snapshot.val();
            });
            console.log('player is inited')
        }

        $scope.getAllData = function () {
            $scope.firebaseConnect.on('value', function (snapshot) {
            $scope.CoordsData = snapshot.val();
        });
        }

        if ($rootScope.token == undefined) { $scope.playerInit(); }

        $scope.pushMyDataToFirebase = function () {
            geolocation.getLocation().then(function (data) {
                var obj = {};
                $scope.coords = {lat: data.coords.latitude, lon: data.coords.longitude };
                obj[$rootScope.token] = {
                    name: $rootScope.character.name,
                    coords: $scope.coords,
                    xp: $rootScope.character.xp
                };
                $scope.firebaseConnect.update(obj, $scope.getAllData);
            });
        }

        $rootScope.$watch('token', function() {
            window.clearInterval($scope.pushInterval);
            $scope.pushInterval = setInterval($scope.pushMyDataToFirebase, 2000)
        });

        if ($rootScope.token == undefined) $scope.playerInit();
    });

