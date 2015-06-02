var exec = require('cordova/exec');
function MqttPlugin() { console.log("MqttPlugin.js: is created");
}
MqttPlugin.prototype.showToast = function(aString){ console.log("MqttPlugin.js: showToast"); exec(function(result){ /*alert("OK" + reply);*/ }, function(result){ /*alert("Error" + reply);*/ },"MqttPlugin",aString,[]);
};
var MqttPlugin = new MqttPlugin(); 
module.exports = MqttPlugin;