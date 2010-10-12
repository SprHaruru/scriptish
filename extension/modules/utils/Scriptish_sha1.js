var EXPORTED_SYMBOLS = ["Scriptish_sha1"];
Components.utils.import("resource://scriptish/constants.js");

// UTF-8 encodes input, SHA-1 hashes it and returns the 40-char hex version.
const Scriptish_sha1 = function(aUnicode) {
  var unicodeConverter = Instances.suc;
  unicodeConverter.charset = "UTF-8";

  var data = unicodeConverter.convertToByteArray(aUnicode, {});
  var ch = Instances.ch;
  ch.init(ch.SHA1);
  ch.update(data, data.length);
  var hash = ch.finish(false); // hash as raw octets

  var hex = [];
  for (var i = 0; i < hash.length; i++) {
    hex.push( ("0" + hash.charCodeAt(i).toString(16)).slice(-2) );
  }
  return hex.join('');
}
