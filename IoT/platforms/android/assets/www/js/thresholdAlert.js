var forceXAlert = 0;
var forceYAlert = 0;
var forceZAlert = 0;


/*var replaceAll = function(str, target, replacement) {
  return str.split(target).join(replacement);
};*/

function thresholdAlert(forceX, forceY, forceZ) {

    if (forceX > thresholdX) {
            //alert(thresholdX);
            forceXAlert = forceXAlert + 1;
            document.getElementById("xAlert").innerHTML = forceXAlert;

    }

    if (forceY > thresholdY) {
            //alert("inside check force Y threshold");

            forceYAlert = forceYAlert + 1;
            document.getElementById("yAlert").innerHTML = forceYAlert;

    }

    if (forceZ > thresholdZ) {
        //alert("inside check force Z threshold");
        forceZAlert = forceZAlert + 1;
        document.getElementById("zAlert").innerHTML = forceZAlert;

    }


}