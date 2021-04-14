// *********** HERE STARTS camera.js *************

function cameraGoto(nodeX, nodeY) {
  sigma.misc.animation.camera( s.camera,
    { x: nodeX, y: nodeY, ratio: 1 },
    { duration: s.settings('animationsTime') || 300 }
  );
}

function isTouchDevice() {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  var mq = function(query) {
    return window.matchMedia(query).matches;
  }

  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}

function initCamera() {
  console.log("To be, or not to be, that is the question:");
}

function cameraZoomIn() {
  s.camera.goTo({
    ratio: Math.max(s.camera.settings("zoomMin"), s.camera.ratio / Math.sqrt(2))
  });
}

function cameraZoomOut() {
  s.camera.goTo({
    ratio: Math.min(s.camera.settings("zoomMax"), s.camera.ratio * Math.sqrt(2))
  });
}
