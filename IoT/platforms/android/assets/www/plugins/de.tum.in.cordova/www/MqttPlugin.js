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
                                i = i + 1,
                                res=result['request.id'].split(" ",6),
                                //alert(parseInt(res[1])),
                                //alert(parseInt(res[3])),
                                //alert(parseInt(res[5])),
                                document.getElementById("forceX").innerHTML = "Force X: " + res[1] + " Nm",
                                document.getElementById("forceY").innerHTML = "Force Y: " + res[3] + " Nm",
                                document.getElementById("forceZ").innerHTML = "Force Z: " + res[5] + " Nm",
                                forceX = parseInt(res[1]),
                                forceY = parseInt(res[3]),
                                forceZ = parseInt(res[5]),
                                /*if ((res[1]) >= 600){
                                                                    alert("inside if"),
                                                                    //forceZAlert = forceZAlert + 1,
                                                                    //document.getElementById("zAlert").innerHTML = forceZAlert,
                                                                }*/
                                graphUpdate(forceX, forceY, forceZ),
                                alert("before if");
                                /*if ((res[1]) >= 600){
                                    alert("inside if")
                                    //forceZAlert = forceZAlert + 1,
                                    //document.getElementById("zAlert").innerHTML = forceZAlert,
                                }
                                else {alert("inside else")}*/
                                //document.getElementById("test").innerHTML = i;
                        },

    //function(result){ alert("Mqtt Sub got the value from the topic" + result['request.id']) },
    function(result){ /*alert("Error" + reply);*/ },
    "MqttPlugin",
    "subscribe",
    [aString.topic]);
    alert("kuchbhi");
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
