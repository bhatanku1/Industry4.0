cordova.define("de.tum.in.cordova.MqttPlugin", function(require, exports, module) { var exec = require('cordova/exec');
function MqttPlugin() { console.log("MqttPlugin.js: is created");
}
MqttPlugin.prototype.publish = function(aString){ console.log("MqttPlugin.js: showToast");
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
    exec(
        function(result){ document.getElementById("test").innerHTML = "Mqtt Sub got the value from the topic" + result['request.id'],
                           document.getElementById('connection_state').src = 'img/bck.png' },

    //function(result){ alert("Mqtt Sub got the value from the topic" + result['request.id']) },
    function(result){ /*alert("Error" + reply);*/ },
    "MqttPlugin",
    "subscribe",
    [aString.topic]);
    //document.getElementById("test").innerHTML = "Mqtt Sub got the value from the topic";
};
MqttPlugin.prototype.heartbeat = function(aString){

    console.log("MqttPlugin.js: heartbeat");
    exec(
    function(result){ //alert("Mqtt heartbeat got the value" + result["data"]),
                      document.getElementById('connection_state').src = 'img/green.png',
                      document.getElementById("pi_status").innerHTML = "Connection Successful",
                      document.getElementById("btn_sub").disabled = false,
                      document.getElementById("text_macid").disabled = false
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
