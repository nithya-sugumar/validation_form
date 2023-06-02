(function() {
  var itemKey = 'ca_click_uuid';
  var paramKey = 'caclid';
  var cookieKey = '__caclid';
  var clickUUID = null;
  var localStorage = window.localStorage;
  if (typeof localStorage !== 'undefined') {
    clickUUID = localStorage.getItem(itemKey);
  }
  if (typeof clickUUID === "undefined" || clickUUID === null) {
    var regexp = new RegExp(cookieKey + '\\s*=([^;]*);');
    var match = (document.cookie + ';').match(regexp);
    if (match && match.length == 2) {
      clickUUID = match[1].trim();
    }
  }
  var parts = window.location.search ? window.location.search.split('?') : window.location.href.split('?');
  if (parts[1]) {
    var params = parts[1].split('&');
    for (var i = 0; i < params.length; i++) {
      var kv = params[i].split('=');
      if (kv[0] === paramKey && kv[1]) {
        clickUUID = kv[1];
        if (localStorage) {
          localStorage.setItem(itemKey, clickUUID);
        }
        var root_domain = null;
        try {
          var _loc = document.location || window.location;
          var segments = _loc.host.split(".");
          if (segments.length >= 2 && ['biz', 'com', 'net', 'me', 'io', 'us', 'org'].indexOf(segments[segments.length-1]) >= 0) {
            root_domain = [segments[segments.length - 2], segments[segments.length - 1]].join('.');
          }
        } catch (e) {}
        if (root_domain) {
          document.cookie = cookieKey + '=' + clickUUID + '; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; domain=' + root_domain;
        } else {
          document.cookie = cookieKey + '=' + clickUUID + '; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/';
        }
        break;
      }
    }
  }
  if (!window.CAConversion) {
    window.CAConversion = {};
  }
  window.CAConversion.clickUUID = clickUUID;
  window.CAConversion.sendEvent_TrustAndWill_3278C3Z7VTD = function(additionalParameters) {
    window.CAConversion.sendEvent('TrustAndWill_3278C3Z7VTD', additionalParameters);
  };
  window.CAConversion.sendEvent = function(actionUUID, additionalParameters) {
    if (!clickUUID) {
      return;
    }
    var img = document.createElement('img');
    img.setAttribute('width', '1');
    img.setAttribute('height', '1');
    img.style.position = 'absolute';
    img.style.top = '-9999px';
    img.style.left = '-9999px';
    var src = 'https://www.consumersadvocate.org/api/v1/conversion_action_events?click_uuid=' + clickUUID + '&action_uuid=' + actionUUID;
    if (additionalParameters) {
      var keys = Object.keys(additionalParameters);
      for (var i = 0; i < keys.length; i++) {
        src += '&' + keys[i] + '=' + encodeURIComponent(additionalParameters[keys[i]]);
      }
    }
    img.src = src;
    document.body.appendChild(img);
  };

})();
