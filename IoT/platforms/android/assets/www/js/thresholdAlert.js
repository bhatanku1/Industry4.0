var forceXAlert = 0;
var forceYAlert = 0;
var forceZAlert = 0;

function thresholdAlert(forceX, forceY, forceZ) {

    if (forceX > 600) {

            forceXAlert = forceXAlert + 1;
            document.getElementById("xAlert").innerHTML = forceXAlert;

    },

    if (forceY > 600) {

            forceYAlert = forceYAlert + 1;
            document.getElementById("yAlert").innerHTML = forceYAlert;

    },

    if (forceZ > 600) {

        forceZAlert = forceZAlert + 1;
        document.getElementById("zAlert").innerHTML = forceZAlert;

    }


}