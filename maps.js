/*global window, document, console */
window.App = (function () {
    "use strict";
    var getCoordinates,
        drawPoint,
        drawMap,
        image,
        ctx_map,
        ctx_points,
        i,
        pointsArray;

    ctx_map = document.getElementById('map').getContext('2d');
    ctx_points = document.getElementById('points').getContext('2d');

    getCoordinates = function () {
        console.log("приложение работает");
        return [
            { n : 55.759645, e : 37.923606},
            { n : 55.758033, e : 37.921212},
            { n : 55.757662, e : 37.923133},
            // { n :  55.756543, e :  37.921160}
        ];

    };//end of getCoordinates

    drawPoint = function (n, e, ctx) {
        var x,y;
        x = Math.abs(e - 37.920006)*118800+ 9;
        y = Math.abs(n - 55.760388)*213980 + 9;
        console.log(x+' '+y);
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(x,y,10,10);
    }; //end of drawPoint
    
    drawMap = function(img, ctx){
        ctx.drawImage(img , 0, 0);
        console.log('карта нарисована') 
    }

     drawPoint(55.760388, 37.920006, ctx_points); 

    //получаем массив точек
    pointsArray = getCoordinates()
    for ( i = 0; i < pointsArray.length; i++){

        drawPoint(pointsArray[i].n,pointsArray[i].e, ctx_points);
    }

    image = new Image();
    image.src = 'map.jpg';
    image.onload = function() { 
      drawMap(this, ctx_map); 
    }
 

    

}()); //end of app