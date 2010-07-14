
// JSM exported symbols
var EXPORTED_SYMBOLS = [ "GM_AddonProvider" ];

const Cu = Components.utils;
Cu.import("resource://scriptish/constants.js");
Cu.import("resource://gre/modules/AddonManager.jsm");

GM_AddonProvider = {
  getAddonByID: function(aId, aCallback) {
    aCallback(gmService.config.getScriptById(aId));
  },

  getAddonsByTypes: function(aTypes, aCallback) {
    if (aTypes && aTypes.indexOf("userscript") < 0) aCallback([]);
    else aCallback(gmService.config.scripts);
  }
}

AddonManagerPrivate.registerProvider(GM_AddonProvider);
