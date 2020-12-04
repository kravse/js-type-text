module.exports = function (config, callback) {
  var text = config.text || "jsTypeText({text: 'Add some text!'}, function(){})";
  var typedTitle = '';
  var cursor = config.cursor !== false;

  var interval = setInterval(function () {
    if (typedTitle.length < text.length) {
      typedTitle = text.slice(0, typedTitle.length + 1);
      callback(typedTitle + (cursor ? "_" : ""));
    } else if (typedTitle.length === text.length) {
      clearInterval(interval);
      if (cursor !== false && config.cursorBlink !== false) {
        var showCursor = true;
        setInterval(function () {
          showCursor = !showCursor;
          callback(typedTitle + (showCursor ? "_" : ""));
        }, config.cursorSpeed || 350);
      }
    }
  }, config.speed || 150);
}