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
                    y = Math.abs(lat - MAP_PARAMS.LAT0) * $scope.y_coef + 12;
                    x = Math.abs(lon - MAP_PARAMS.LON0) * $scope.x_coef + 12;
                    $scope.ctx.fillStyle = "#FF0000";
                    console.log(x + " " + y);
                    $scope.ctx.fillRect(x, y, $scope.dotScale, $scope.dotScale);
                }; //end of drawPoint
                $scope.ctx.fillStyle = "#FF0000";

                $scope.drawPoint(MAP_PARAMS.LAT0, MAP_PARAMS.LON0);
                $scope.drawPoint(MAP_PARAMS.LAT1, MAP_PARAMS.LON1);

                $scope.drawPoint(MAP_PARAMS.LAT0, MAP_PARAMS.LON1);
                $scope.drawPoint(MAP_PARAMS.LAT1, MAP_PARAMS.LON0);


//                drawPoint(55.749595, 38.009993);

//обновление данных от пользователя
        $scope.$watch("CoordsData", function (points) {
            if (points) {
                for (var index in points) {
                    $scope.drawPoint(points[index].coords.lat, points[index].coords.lon);
                };
//
            }
        });
            }
        };
    });
