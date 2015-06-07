cordova.define("de.tum.in.cordova.MqttPlugin", function(require, exports, module) { var exec = require('cordova/exec');
function MqttPlugin() { console.log("MqttPlugin.js: is created");
}
MqttPlugin.prototype.publish = function(aString){ console.log("MqttPlugin.js: showToast");
    var t = aString.data + aString.topic;
    exec(
    function(result){ /*alert("OK" + reply);*/ },
    function(result){ /*alert("Error" + reply);*/ },
    "MqttPlugin",
    "publish",
    [aString.topic, aString.data]);
};
MqttPlugin.prototype.subscribe = function(aString){ console.log("MqttPlugin.js: subscribe");
    exec(
    function(result){ alert("OK" + result) },
    function(result){ /*alert("Error" + reply);*/ },
    "MqttPlugin",
    "subscribe",
    [aString.topic]);
};

var MqttPlugin = new MqttPlugin(); 
module.exports = MqttPlugin;
});
