//var forceX = 0;

function parseSubscribedMessage(input) {

    res=input.split(" ",6),
    document.getElementById("forceX").innerHTML = "Force X: " + res[1] + " Nm",
    document.getElementById("forceY").innerHTML = "Force Y: " + res[3] + " Nm",
    document.getElementById("forceZ").innerHTML = "Force Z: " + res[5] + " Nm",
    forceX = parseInt(res[1]),
    forceY = parseInt(res[3]),
    forceZ = parseInt(res[5]),
    thresholdAlert(forceX, forceY, forceZ),
    graphUpdate(forceX, forceY, forceZ);

}