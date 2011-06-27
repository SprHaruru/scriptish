
Components.utils.import("resource://scriptish/constants.js");
Components.utils.import("resource://scriptish/logging.js");

module("Scriptish_log");
var PREF_BRANCH = Services.prefs.getBranch("extensions.scriptish.");

asyncTest("extensions.scriptish.logChrome", 2, function() {
  var tID, logChrome = false;

  // making console listener
  var consoleListener = {
    observe: function({message}) {
      if ("[Scriptish] TEST" == message && logChrome) {
        clearTimeout(tID);
        unregListener();
        ok(true, "message was logged successfully as expected");
        start();
      }
    }
  };

  // add console listener
  Services.cs.registerListener(consoleListener);
  function unregListener() Services.cs.unregisterListener(consoleListener);

  // get extensions.scriptish.logChrome pref if it exists
  try {
    logChrome = PREF_BRANCH.getBoolPref("logChrome");
  } catch (e) {}

  tID = setTimeout(function() {
    unregListener();
    ok(!logChrome, "message was not logged");
    start();
  }, 500);

  try {
    Scriptish_log("TEST");
    ok(true, "sent message without error being thrown");
  } catch (e) {
    ok(false, e);
  }
});


asyncTest("forced log message", 2, function() {
  var tID;

  // making console listener
  var consoleListener = {
    observe: function({message}) {
      if ("[Scriptish] FORCED TEST" == message) {
        clearTimeout(tID);
        unregListener();
        ok(true, "message was logged successfully as expected");
        start();
      }
    }
  };

  // add console listener
  Services.cs.registerListener(consoleListener);
  function unregListener() Services.cs.unregisterListener(consoleListener);

  tID = setTimeout(function() {
    unregListener();
    ok(false, "message was not logged");
    start();
  }, 500);

  try {
    Scriptish_log("FORCED TEST", true);
    ok(true, "sent message without error being thrown");
  } catch (e) {
    ok(false, e);
  }
});

asyncTest("null char removed", 2, function() {
  var tID, msg = "FORCED \0TEST \0WITH \0NULLS";

  // making console listener
  var consoleListener = {
    observe: function({message}) {
      if ("[Scriptish] FORCED TEST WITH NULLS" == message || msg == message) {
        if ("[Scriptish] FORCED TEST WITH NULLS" == message)
          ok(true, "message was logged successfully as expected");
        else if (msg == message)
          ok(false, "null chars were not removed");
        clearTimeout(tID);
        unregListener();
        start();
      }
    }
  };

  // add console listener
  Services.cs.registerListener(consoleListener);
  function unregListener() Services.cs.unregisterListener(consoleListener);

  tID = setTimeout(function() {
    unregListener();
    ok(false, "message was not logged");
    start();
  }, 500);

  try {
    Scriptish_log(msg, true);
    ok(true, "sent message without error being thrown");
  } catch (e) {
    ok(false, e);
  }
});