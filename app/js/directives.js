/*jslint browser:true */
/*global angular, console*/
'use strict';

/* Directives */

angular.module('Game.directives', [])
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
    .directive('points', function (MAP_PARAMS) {
        return {
            link: function ($scope, $element) {

                $element[0].width = $scope.CanvasWidth;
                $element[0].height = $scope.CanvasHeight;

                $scope.ctx = $element[0].getContext('2d');

                $scope.drawPoint = function (lat, lon) {
                    var x,
                        y;
//                    ctx.clearRect(0, 0, $scope.CanvasWidth, $scope.CanvasHeight);
                    y = Math.abs(lat - MAP_PARAMS.LAT0) * $scope.y_coef;
                    x = Math.abs(lon - MAP_PARAMS.LON0) * $scope.x_coef;
                    $scope.ctx.fillStyle = Math.floor(Math.random() * 16777215).toString(16);
//                    console.log(x + " " + y);
//                    console.log('point is drown')
                    $scope.ctx.fillRect(x, y, $scope.dotScale, $scope.dotScale);
                }; //end of drawPoint
                $scope.ctx.fillStyle = "#FF0000";

                $scope.drawPoint(MAP_PARAMS.LAT0, MAP_PARAMS.LON0);
                $scope.drawPoint(MAP_PARAMS.LAT1, MAP_PARAMS.LON1);

                $scope.drawPoint(MAP_PARAMS.LAT0, MAP_PARAMS.LON1);
                $scope.drawPoint(MAP_PARAMS.LAT1, MAP_PARAMS.LON0);

//обновление данных от пользователя
                $scope.$watch("CoordsData", function (points) {

                    if (points) {
                        var index;
                        for (index in points) {
                            $scope.drawPoint(points[index].coords.lat, points[index].coords.lon);
                        }
                    }
                });
            }
        };
    });
