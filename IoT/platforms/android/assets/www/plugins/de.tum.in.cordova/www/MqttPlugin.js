cordova.define("de.tum.in.cordova.MqttPlugin", function(require, exports, module) { var exec = require('cordova/exec');
function MqttPlugin() { console.log("MqttPlugin.js: is created");
}
var i = 0;
var graph;
var res;
var forceX = 0;
var forceY= 0;
var forceZ= 0;
var forceZAlert= 0;


MqttPlugin.prototype.setMQTT = function(aString){ console.log("MqttPlugin.js: showToast");
    //alert('inside publish');
    //var wf = 100;
    //drawChart(wf);
    var t = aString.data + aString.topic;
    exec(
    function(result){ /*alert("Mqttplugin publish got the value returned" + result); */},
    function(result){ /*alert("Error" + reply);*/ },
    "MqttPlugin",
    "update",
    [aString.url, aString.port,aString.clientid,aString.username, aString.password]);
};
MqttPlugin.prototype.publish = function(aString){ console.log("MqttPlugin.js: showToast");
    //alert('inside publish');
    //var wf = 100;
    //drawChart(wf);
    var t = aString.data + aString.topic;
    exec(
    function(result){ /*alert("Mqttplugin publish got the value returned" + result); */},
    function(result){ /*alert("Error" + reply);*/ },
    "MqttPlugin",
    "publish",
    [aString.topic, aString.data]);
};
MqttPlugin.prototype.subscribe = function(aString){

    console.log("MqttPlugin.js: subscribe");
    //alert('inside subscribe');
    exec(
            function(result){   //alert("baalchaal");

                                //document.getElementById("fHeader").innerHTML = "Values received from the device:",
                                //alert("result[result]--->" + result['result']),
                                i = i + 1,
                                res=result['result'].split(","),
                                //alert("res[0]--->" + res[0]),
                                forcex = res[0].split("="),
                                forcey = res[1].split("="),
                                forcez = res[2].split("="),
                                //alert(res),
                                //alert(forcex[1]),
                                //alert(forcey[1]),
                                //alert(parseInt(forcex),
                                //alert(parseInt(forcey),
                                //alert(parseInt(forcez),
                                document.getElementById("forceX").innerHTML = "Force X: " + forcex[1] + " Nm",
                                document.getElementById("forceY").innerHTML = "Force Y: " + forcey[1] + " Nm",
                                document.getElementById("forceZ").innerHTML = "Force Z: " + forcez[1] + " Nm",
                                //forcexformatted = replaceAll(forcex[1], "\0", ""),
                                forcexformatted = forcex[1].split('\0').join(''),
                                forceyformatted = forcey[1].split('\0').join(''),
                                forcezformatted = forcez[1].split('\0').join(''),
                                //alert("forceformat->" + forcexformatted),
                                forceX = parseInt(forcexformatted),
                                forceY = parseInt(forceyformatted),
                                forceZ = parseInt(forcezformatted),
                                //alert("forceX before graph call" + forceX),
                                thresholdAlert(forceX, forceY, forceZ),

                                graphUpdate(forceX, forceY, forceZ);

                        },

    //function(result){ alert("Mqtt Sub got the value from the topic" + result['request.id']) },
    function(result){ /*alert("Error" + reply);*/ },
    "MqttPlugin",
    "subscribe",
    [aString.topic]);
    //alert("kuchbhi");
    //document.getElementById("test").innerHTML = "Mqtt Sub got the value from the topic";
};
MqttPlugin.prototype.heartbeat = function(aString){

    console.log("MqttPlugin.js: heartbeat");
    exec(
    function(result){ /*alert("Mqtt heartbeat got the value" + result["data"]),
                     document.getElementById('connection_state').src = 'img/green.png',
                     document.getElementById("status_ui").style.backgroundColor = "green",
                     document.getElementById("pi_status").innerHTML = "Connection Successful",
                     document.getElementById("wifi_ui_btn").disabled = false,
                     document.getElementById("bluetooth_ui_btn").disabled = false,
                     document.getElementById("opc_ui_btn").disabled = false
                     document.getElementById("status_ui").style.backgroundColor = "black",
                     document.getElementById("status_ui").style.color = "green",
                     document.getElementById("pi_status").style.font = "bold",
                     document.getElementById("start").disabled = false,
                     */
                     document.getElementById("pi_status").innerHTML = "Connection Successful",
                     document.getElementById("start").getElementsByClassName("button")[0].removeAttribute("disabled"),
                     document.getElementById("start").getElementsByClassName("button")[0].className="button button-clear button-balanced button-large ion-unlocked"
                    },

    function(result){ /*alert("Error" + reply);*/ },
    "MqttPlugin",
    "heartbeat",
    [aString.topic]);
};

MqttPlugin.prototype.kill = function(aString){

    console.log("MqttPlugin.js: subscribe");
    exec(
    function(result){ alert("Mqtt Subscribe got the value" + result) },
    function(result){ /*alert("Error" + reply);*/ },
    "MqttPlugin",
    "kill",
    [aString.topic]);
};

var MqttPlugin = new MqttPlugin();
module.exports = MqttPlugin;
});
