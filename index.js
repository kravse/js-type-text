var typeWriters = [];

module.exports = {
  start(config, callback) {
    if (!config.text) return;
    var typedTitle = '';
    var cursor = config.cursor !== false;
    let cursorStyle = "_";
    if (config.cursorStyle) {
      if (config.cursorStyle.toLowerCase() === 'vertical') {
        cursorStyle === "&#x258D;"
      } else if (config.cursorStyle.toLowerCase() === 'horizontal') {
        cursorStyle === "_"
      } else {
        cursorStyle = config.cursorStyle
      }
    }

    var interval = setInterval(function () {
      if (typedTitle.length < config.text.length) {
        typedTitle = config.text.slice(0, typedTitle.length + 1);
        callback(typedTitle + (cursor ? cursorStyle : ""));
      } else if (typedTitle.length === config.text.length) {
        clearInterval(interval);
        if (cursor !== false && config.cursorSpeed !== 0) {
          var showCursor = true;
          typeWriters.push(setInterval(function () {
            showCursor = !showCursor;
            callback(typedTitle + (showCursor ? cursorStyle : ""));
          }, config.cursorSpeed || 350));
        }
      }
    }, config.speed || 150);
    typeWriters.push(interval)
  },
  stop() {
    for (var i = 0; i < typeWriters.length; i++) {
      clearInterval(typeWriters[i]);
    }
  }
}