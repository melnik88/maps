'use strict';

/* Directives */

angular.module('myApp.directives', [])
    .directive('map', function () {
        return {
            link: function ($scope, $element, attrs) {
                var image,
                    ctx;
                image = new Image();
                image.src = 'img/map2.jpg';
                image.onload = function () {
                    ctx = $element[0].getContext('2d');
                    ctx.drawImage(image, 0, 0);
                };
            }
        };
    })
    .directive('points', function () {
        return {
            link: function ($scope, $element, attrs) {
                var ctx,
                    drawPoint;
                ctx = $element[0].getContext('2d');


//              рисование точки
                drawPoint = function (lat, lon) {
                    var x,
                        y;
                    y = Math.abs(lat - $scope.lat_0) * $scope.y_coef;
                    x = Math.abs(lon - $scope.lon_0) * $scope.x_coef;
                    ctx.fillStyle = "#FF0000";
                    console.log(x+" "+y);


                    ctx.fillRect(x, y, 10, 10);
                }; //end of drawPoint

                drawPoint($scope.lat_0, $scope.lon_0);
                drawPoint($scope.lat_1, $scope.lon_1);

        drawPoint($scope.lat_0, $scope.lon_0);
        drawPoint($scope.lat_1, $scope.lon_1);

        drawPoint($scope.lat_0, $scope.lon_1);
        drawPoint($scope.lat_1, $scope.lon_0);

//обновление данных от пользователя
        $scope.$watch("CoordsData", function(newval) {
            onsole.log(newval);
        })





//        drawPoint(55.744058,  37.928188);
//        drawPoint(55.742992,  37.927084);

            }
        };
    })






//  directive('appVersion', ['version', function(version) {
//    return function(scope, elm, attrs) {
//      elm.text(version);
//    };
//  }])
