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
            createToken;
        console.log($rootScope.character);


        firebaseConnect = new Firebase("https://mymaps.firebaseio.com");
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


        firebaseConnect.on('child_added', function(snapshot) {
            $scope.CoordsData = snapshot.val();

        });


        createToken = function () {
            return Math.random().toString(36).substr(2);
        };
        $rootScope.token = createToken();

        pushMyDataToFirebase = function () {
            var obj = {};
            console.log($rootScope.character.name);
            geolocation.getLocation().then(function (data) {
                $scope.coords = { lat: data.coords.latitude, long: data.coords.longitude };
                obj[$rootScope.token] = {
                    name: $rootScope.character.name,
                    coords: $scope.coords,
                    xp: $rootScope.character.xp
                };
                firebaseConnect.update(obj);

            });
        };
        pushMyDataToFirebase();




        setInterval(pushMyDataToFirebase, '1000');
    });
//  .controller('MyCtrl2', [function() {
//
//  }]);

