function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

/**
 * Window Manager
 * @author: jesmora
 * @version: 1.0.0
 * @license: MIT
 * @description: Window Manager for the browser
 * @copyright: 2024
 */

var eventOptionsPassive = {
  "capture": true,
  "passive": true
};
var get = {
  byId: function byId(id) {
    return typeof id === "string" ? document.getElementById(id) : id;
  },
  byClass: function byClass(sClass, oParent) {
    var aClass = [];
    var reClass = new RegExp("(^| )" + sClass + "( |$)");
    var aElem = this.byTagName("*", oParent);
    for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
    return aClass;
  },
  byTagName: function byTagName(elem, obj) {
    return (obj || document).getElementsByTagName(elem);
  }
};
var WindowManager = /*#__PURE__*/function () {
  function WindowManager(title, _ref) {
    var _ref$url = _ref.url,
      url = _ref$url === void 0 ? null : _ref$url,
      _ref$icon = _ref.icon,
      icon = _ref$icon === void 0 ? null : _ref$icon,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 40 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 60 : _ref$height,
      _ref$x = _ref.x,
      x = _ref$x === void 0 ? 50 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === void 0 ? 50 : _ref$y,
      _ref$background = _ref.background,
      background = _ref$background === void 0 ? "#000" : _ref$background,
      _ref$ads = _ref.ads,
      ads = _ref$ads === void 0 ? null : _ref$ads;
    _classCallCheck(this, WindowManager);
    this.desktop = document.body;
    this.windId = "window-".concat(WindowManager.windowCounter++);
    this.index = WindowManager.windowCounter;
    this.id = WindowManager.windowCounter;
    this.dragMinWidth = 400;
    this.dragMinHeight = 50;
    this.defaultWidth = width;
    this.defaultHeight = height;
    this.x = x;
    this.y = y;
    this.background = background;
    this.adsText = ads;
    this.url = url;
    this.icon = icon;
    this.createWindow(title, {
      url: this.url,
      icon: this.icon,
      width: this.defaultWidth,
      height: this.defaultHeight,
      x: this.x,
      y: this.y,
      background: this.background
    });
  }

  /**
   * @param {string} title
   * @param {object} options
   */
  return _createClass(WindowManager, [{
    key: "createWindow",
    value: function createWindow(title, _ref2) {
      var url = _ref2.url,
        icon = _ref2.icon,
        width = _ref2.width,
        height = _ref2.height;
        _ref2.x;
        _ref2.y;
        var background = _ref2.background;
        _ref2.oncreate;
        _ref2.onfocus;
        _ref2.onblur;
        _ref2.onresize;
        _ref2.onfullscreen;
        _ref2.onminimize;
        _ref2.onmaximize;
        _ref2.onrestore;
        _ref2.onmove;
        _ref2.onclose;
      var windowElement = document.createElement('div');
      windowElement.classList.add('hnet-window');
      windowElement.dataset.id = this.windId;
      windowElement.style.width = "".concat(width, "%");
      windowElement.style.height = "".concat(height, "%");
      windowElement.innerHTML = "\n                <div class=\"hnet-window-header\" style=\"background: ".concat(background, ";\">\n                    <div class=\"hnet-header-box\">\n                         ").concat(icon ? "<img class=\"hnet-icon\" src=\"".concat(icon, "\" alt=\"\" />") : '', "\n                        <span class=\"hnet-title\">").concat(title, "</span>\n                    </div>\n                    <div class=\"hnet-buttons\">\n                        <div class=\"hnet-minimize\"></div>\n                        <div class=\"hnet-maximize\"></div>\n                        <div class=\"hnet-close\"></div>\n                    </div>\n                </div>\n                <div class=\"hnet-resizeL\"></div>\n                <div class=\"hnet-resizeT\"></div>\n                <div class=\"hnet-resizeR\"></div>\n                <div class=\"hnet-resizeB\"></div>\n                <div class=\"hnet-resizeLT\"></div>\n                <div class=\"hnet-resizeTR\"></div>\n                <div class=\"hnet-resizeBR\"></div>\n                <div class=\"hnet-resizeLB\"></div>\n                <div class=\"hnet-window-content\">\n                    <iframe src=\"").concat(url, "\" frameborder=\"0\" loading=\"lazy\" referrerpolicy=\"no-referrer\" allowfullscreen width=\"100%\" height=\"100%\"></iframe>\n                </div>\n                ");
      this.desktop.appendChild(windowElement);
      this.addEventListeners(windowElement);

      // 计算并设置初始位置（垂直居中）
      var desktopRect = this.desktop.getBoundingClientRect();
      var windowRect = windowElement.getBoundingClientRect();
      var topPosition = (desktopRect.height - windowRect.height) / 2;
      var leftPosition = (desktopRect.width - windowRect.width) / 2;
      windowElement.style.top = "".concat(topPosition, "px");
      windowElement.style.left = "".concat(leftPosition, "px");
    }

    /**
     * 添加事件监听器
     */
  }, {
    key: "addEventListeners",
    value: function addEventListeners(windowElement, taskbarItem) {
      var _this = this;
      var minimizeButton = windowElement.querySelector('.hnet-minimize');
      var maximizeButton = windowElement.querySelector('.hnet-maximize');
      var closeButton = windowElement.querySelector('.hnet-close');
      var header = windowElement.querySelector('.hnet-window-header');
      minimizeButton.addEventListener('click', function () {
        return _this.minimizeWindow(windowElement);
      });
      maximizeButton.addEventListener('click', function () {
        return _this.maximizeWindow(windowElement);
      });
      closeButton.addEventListener('click', function () {
        return _this.closeWindow(windowElement);
      });
      header.addEventListener('mousedown', function (e) {
        return _this.makeDraggable(e, windowElement);
      });
      windowElement.addEventListener('click', function () {
        return _this.bringToFront(windowElement);
      });
      var oL = get.byClass("hnet-resizeL", windowElement)[0];
      var oT = get.byClass("hnet-resizeT", windowElement)[0];
      var oR = get.byClass("hnet-resizeR", windowElement)[0];
      var oB = get.byClass("hnet-resizeB", windowElement)[0];
      var oLT = get.byClass("hnet-resizeLT", windowElement)[0];
      var oTR = get.byClass("hnet-resizeTR", windowElement)[0];
      var oBR = get.byClass("hnet-resizeBR", windowElement)[0];
      var oLB = get.byClass("hnet-resizeLB", windowElement)[0];
      //四角
      this.resizeWindow(oLT, windowElement, false, true, false, false);
      this.resizeWindow(oTR, windowElement, false, true, false, false);
      this.resizeWindow(oBR, windowElement, false, false, false, false);
      this.resizeWindow(oLB, windowElement, true, false, false, false);
      //四边
      this.resizeWindow(oL, windowElement, true, false, false, true);
      this.resizeWindow(oT, windowElement, false, true, true, false);
      this.resizeWindow(oR, windowElement, false, false, false, true);
      this.resizeWindow(oB, windowElement, false, false, true, false);
    }

    /***
     * 最小化窗口
     * @param {HTMLElement} windowElement
     */
  }, {
    key: "minimizeWindow",
    value: function minimizeWindow(windowElement) {
      var value = 1;
      var timer = setInterval(function () {
        value -= 0.1;
        windowElement.style.transform = "scale(".concat(value, ")");
        if (value <= 0.3) {
          clearInterval(timer);
          windowElement.classList.add('hnet-hidden');
          windowElement.style.transform = "scale(1)";
        }
      }, 30);
    }

    /***
     * 最大化窗口
     * @param {HTMLElement} windowElement
     */
  }, {
    key: "maximizeWindow",
    value: function maximizeWindow(windowElement) {
      var isMaximized = windowElement.classList.toggle('maximized');
      windowElement.style.transition = 'all 0.5s';
      if (isMaximized) {
        // 保存当前大小和位置，以便之后恢复
        windowElement.dataset.prevStyle = JSON.stringify({
          width: windowElement.style.width,
          height: windowElement.style.height,
          top: windowElement.style.top,
          left: windowElement.style.left
        });

        // 设置最大化样式
        Object.assign(windowElement.style, {
          width: '100%',
          height: 'calc(100% - 40px)',
          // 假设顶部有40px的任务栏
          top: '0',
          left: '0'
        });
      } else {
        // 恢复到之前的大小和位置
        var prevStyle = JSON.parse(windowElement.dataset.prevStyle || '{}');
        if (Object.keys(prevStyle).length) {
          Object.assign(windowElement.style, prevStyle);
        } else {
          // 如果没有之前的样式信息，使用默认值
          var desktopRect = this.desktop.getBoundingClientRect();
          var topPosition = (desktopRect.height - defaultHeight) / 2;
          var leftPosition = (desktopRect.width - defaultWidth) / 2;
          Object.assign(windowElement.style, {
            width: "".concat(defaultWidth, "%"),
            height: "".concat(defaultHeight, "%"),
            top: "".concat(topPosition, "px"),
            left: "".concat(leftPosition, "px")
          });
        }
      }
    }

    /***
     * 关闭窗口
     * @param {HTMLElement} windowElement
     */
  }, {
    key: "closeWindow",
    value: function closeWindow(windowElement) {
      windowElement.remove();
      WindowManager.windowCounter--;
      if (WindowManager.windowCounter <= 0) return;
    }

    /**
     * 使窗口可拖动
     * @param {MouseEvent} e
     * @param {HTMLElement} windowElement
     */
  }, {
    key: "makeDraggable",
    value: function makeDraggable(e, windowElement) {
      windowElement.style.transition = 'none';
      var lastX = 0,
        lastY = 0;
      if (e.target.closest('.buttons')) return; // 如果点击的是按钮，不执行拖动
      // 鼠标按下时记录当前鼠标位置和窗口位置
      lastX = e.clientX - windowElement.offsetLeft;
      lastY = e.clientY - windowElement.offsetTop;
      windowElement.getBoundingClientRect();

      // 鼠标移动时更新窗口位置
      document.onmousemove = function (e) {
        var dx = e.clientX - lastX;
        var dy = e.clientY - lastY;
        var maxL = document.documentElement.clientWidth - windowElement.offsetWidth;
        var maxT = document.documentElement.clientHeight - windowElement.offsetHeight;

        // 更新窗口位置
        dx <= 0 && (dx = 0);
        dy <= 0 && (dy = 0);
        dx >= maxL && (dx = maxL);
        dy >= maxT && (dy = maxT);
        windowElement.style.left = dx + "px";
        windowElement.style.top = dy + "px";
        return false;
      };
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
        this.releaseCapture && this.releaseCapture();
      };
      this.setCapture && this.setCapture();
      // 阻止默认行为，如文本选择等
      e.preventDefault();
      return false;
    }

    /***
     * 窗口缩放
     * @param {HTMLElement} handle
     * @param {HTMLElement} oParent
     * @param {boolean} isLeft
     * @param {boolean} isTop
     * @param {boolean} lockX
     * @param {boolean} lockY
     */
  }, {
    key: "resizeWindow",
    value: function resizeWindow(handle, oParent, isLeft, isTop, lockX, lockY) {
      var _this2 = this;
      var content = document.querySelector(".hnet-window-content");
      var ads = document.createElement("div");
      ads.className = "hnet-ads";
      content.appendChild(ads);
      handle.onmousedown = function (event) {
        var disX = event.clientX - handle.offsetLeft;
        var disY = event.clientY - handle.offsetTop;
        var iParentTop = oParent.offsetTop;
        var iParentLeft = oParent.offsetLeft;
        var iParentWidth = oParent.offsetWidth;
        var iParentHeight = oParent.offsetHeight;
        var iframe = oParent.querySelector('iframe');
        document.onmousemove = function (event) {
          oParent.style.transition = "none";
          iframe.style.display = 'none';
          ads.style.display = _this2.adsText ? "block" : "none";
          ads.innerHTML = _this2.adsText;
          var iL = event.clientX - disX;
          var iT = event.clientY - disY;
          var maxW = document.documentElement.clientWidth - oParent.offsetLeft - 2;
          var maxH = document.documentElement.clientHeight - oParent.offsetTop - 2;
          var iW = isLeft ? iParentWidth - iL : handle.offsetWidth + iL;
          var iH = isTop ? iParentHeight - iT : handle.offsetHeight + iT;
          isLeft && (oParent.style.left = iParentLeft + iL + "px");
          isTop && (oParent.style.top = iParentTop + iT + "px");
          iW < _this2.dragMinWidth && (iW = _this2.dragMinWidth);
          iW > maxW && (iW = maxW);
          lockX || (oParent.style.width = iW + "px");
          iH < _this2.dragMinHeight && (iH = _this2.dragMinHeight);
          iH > maxH && (iH = maxH);
          lockY || (oParent.style.height = iH + "px");
          if (isLeft && iW == _this2.dragMinWidth || isTop && iH == _this2.dragMinHeight) document.onmousemove = null;
          return false;
        };
        document.onmouseup = function () {
          iframe.style.display = 'block';
          ads.style.display = 'none';
          document.onmousemove = null;
          document.onmouseup = null;
        };
        return false;
      };
    }
    /**
     * 窗口置顶
     * @param {HTMLElement} windowElement
     */
  }, {
    key: "bringToFront",
    value: function bringToFront(windowElement) {
      var allWindows = document.querySelectorAll('.hnet-window');
      allWindows.forEach(function (win) {
        win.style.zIndex = win === windowElement ? 999 : 0;
      });
    }

    /**
     * 显示/隐藏窗口
     * @param {HTMLElement} windowElement
     */
  }, {
    key: "toggleWindow",
    value: function toggleWindow(windowElement) {
      if (windowElement.classList.contains('hnet-hidden')) {
        windowElement.classList.remove('hnet-hidden');
        this.bringToFront(windowElement);
      } else {
        windowElement.classList.add('hnet-hidden');
      }
    }
  }]);
}();
_defineProperty(WindowManager, "windowCounter", 0);

export { WindowManager as default, eventOptionsPassive, get };
