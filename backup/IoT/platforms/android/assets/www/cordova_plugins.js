cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/com.matd.coolplugin/www/CoolPlugin.js",
        "id": "com.matd.coolplugin.CoolPlugin",
        "clobbers": [
            "CoolPlugin"
        ]
    },
    {
        "file": "plugins/de.tum.in.cordova/www/MqttPlugin.js",
        "id": "de.tum.in.cordova.MqttPlugin",
        "clobbers": [
            "MqttPlugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.0.0",
    "com.matd.coolplugin": "0.2.11",
    "de.tum.in.cordova": "0.2.11"
}
// BOTTOM OF METADATA
});