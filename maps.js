/*global window, document, console */
window.App = (function () {
    "use strict";
    var getCoordinates,
        drawPoint,
        ctx;

    getCoordinates = function () {
        console.log("приложение работает");
        return [
            { n : 55.760667, e : 37.921777},
            { n :  55.758010, e :  37.921252},
            { n :  55.756543, e :  37.921160}
        ];

    };//end of getCoordinates

    drawPoint = function (n, e) {
        console.log('точка нарисована');
    }; //end of drawPoint


    ctx = document.getElementById('map').getContext('2d');


}()); //end of app