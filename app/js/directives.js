'use strict';

/* Directives */

angular.module('myApp.directives', [])
    .directive('map', function (MAP_PARAMS) {
        return {
            link: function ($scope, $element, attrs) {
                var image,
                    ctx;
                $element[0].width = $scope.CanvasWidth;
                $element[0].height = $scope.CanvasHeight;
                image = new Image();
                image.src = MAP_PARAMS.SRC;

                image.onload = function () {
                    ctx = $element[0].getContext('2d');
                    ctx.drawImage(image, 0, 0);
                };
            }
        };
    })
    .directive('points', function () {
        return {
            link: function ($scope, $element) {
                var ctx,
                    drawPoint;
                $element[0].width = $scope.CanvasWidth;
                $element[0].height = $scope.CanvasHeight;

                ctx = $element[0].getContext('2d');

//рисование точки

                drawPoint = function (lat, lon) {
                    var x,
                        y;
                    y = Math.abs(lat - $scope.lat_0) * $scope.y_coef;
                    x = Math.abs(lon - $scope.lon_0) * $scope.x_coef;
                    ctx.fillStyle = "#FF0000";
                    console.log(x + " " + y);
                    ctx.fillRect(x, y, $scope.dotScale, $scope.dotScale);
                }; //end of drawPoint
                ctx.fillStyle = "#FF0000";


                    drawPoint($scope.lat_0, $scope.lon_0);
                    drawPoint($scope.lat_1, $scope.lon_1);

                    drawPoint($scope.lat_0, $scope.lon_0);
                    drawPoint($scope.lat_1, $scope.lon_1);

                    drawPoint($scope.lat_0, $scope.lon_1);
                    drawPoint($scope.lat_1, $scope.lon_0);

//обновление данных от пользователя
        $scope.$watch("CoordsData", function (newval) {
            console.log(newval);
        });
            }
        };
    });
