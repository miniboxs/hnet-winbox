/**
 * Window Manager
 * @author: jesmora
 * @version: 0.0.1
 * @license: MIT
 * @description: Window Manager for the browser
 * @copyright: 2024
 */
export const eventOptionsPassive = { "capture": true, "passive": true };
export const get = {
    byId: function (id) {
        return typeof id === "string" ? document.getElementById(id) : id
    },
    byClass: function (sClass, oParent) {
        var aClass = [];
        var reClass = new RegExp("(^| )" + sClass + "( |$)");
        var aElem = this.byTagName("*", oParent);
        for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
        return aClass
    },
    byTagName: function (elem, obj) {
        return (obj || document).getElementsByTagName(elem)
    }
};
class WindowManager {
    static windowCounter = 0;
    constructor(title, { url = null, icon = null, width = 40, height = 60, x = 50, y = 50, background = "#000", ads = null }) {
        this.desktop = document.body
        this.windId = `window-${WindowManager.windowCounter++}`;
        this.index = WindowManager.windowCounter;
        this.id = WindowManager.windowCounter;
        this.dragMinWidth = 400;
        this.dragMinHeight = 50;

        this.defaultWidth = width;
        this.defaultHeight = height;
        this.x = x
        this.y = y
        this.background = background;
        this.adsText = ads
        this.url = url
        this.icon = icon

        this.createWindow(title, {
            url: this.url,
            icon: this.icon,
            width: this.defaultWidth,
            height: this.defaultHeight,
            x: this.x,
            y: this.y,
            background: this.background
        })
    }

    /**
     * @param {string} title
     * @param {object} options
     */
    createWindow(title, {
        url, icon, width, height, x, y, background, oncreate, onfocus, onblur, onresize, onfullscreen, onminimize, onmaximize, onrestore, onmove, onclose
    }) {
        const windowElement = document.createElement('div');
        windowElement.id = this.windId;
        windowElement.classList.add('hnet-window');
        windowElement.dataset.id = this.windId;
        windowElement.style.width = `${width}%`;
        windowElement.style.height = `${height}%`;

        windowElement.innerHTML = `
                <div class="hnet-window-header" style="background: ${background};">
                    <div class="hnet-header-box">
                         ${icon ? `<img class="hnet-icon" src="${icon}" alt="" />` : ''}
                        <span class="hnet-title">${title}</span>
                    </div>
                    <div class="hnet-buttons">
                        <div class="hnet-minimize"></div>
                        <div class="hnet-maximize"></div>
                        <div class="hnet-close"></div>
                    </div>
                </div>
                <div class="hnet-resizeL"></div>
                <div class="hnet-resizeT"></div>
                <div class="hnet-resizeR"></div>
                <div class="hnet-resizeB"></div>
                <div class="hnet-resizeLT"></div>
                <div class="hnet-resizeTR"></div>
                <div class="hnet-resizeBR"></div>
                <div class="hnet-resizeLB"></div>
                <div class="hnet-window-content">
                    <iframe src="${url}" frameborder="0" loading="lazy" referrerpolicy="no-referrer" allowfullscreen width="100%" height="100%"></iframe>
                </div>
                `;

        this.desktop.appendChild(windowElement);

        this.addEventListeners(windowElement);

        // 计算并设置初始位置（垂直居中）
        this.positonWindow(windowElement)
    }

    /**
     * 添加事件监听器
     */
    addEventListeners(windowElement, taskbarItem) {
        const minimizeButton = windowElement.querySelector('.hnet-minimize');
        const maximizeButton = windowElement.querySelector('.hnet-maximize');
        const closeButton = windowElement.querySelector('.hnet-close');
        const header = windowElement.querySelector('.hnet-window-header');

        minimizeButton.addEventListener('click', () => this.minimizeWindow(windowElement));
        maximizeButton.addEventListener('click', () => this.maximizeWindow(windowElement));
        closeButton.addEventListener('click', () => this.closeWindow(windowElement));
        header.addEventListener('mousedown', (e) => this.makeDraggable(e, windowElement));
        header.addEventListener('dblclick', (e) => this.maximizeWindow(windowElement));
        windowElement.addEventListener('click', () => this.bringToFront(windowElement));
        window.addEventListener("resize", () => this.positonWindow(windowElement))

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

    /**
     * 窗口定位
     */
    positonWindow(windowElement) {
        const desktopRect = this.desktop.getBoundingClientRect();
        const windowRect = windowElement.getBoundingClientRect();
        const topPosition = (desktopRect.height - windowRect.height) / 2;
        const leftPosition = (desktopRect.width - windowRect.width) / 2;

        windowElement.style.transition = 'none';
        windowElement.style.top = `${topPosition}px`;
        windowElement.style.left = `${leftPosition}px`;
    }

    /***
     * 最小化窗口
     * @param {HTMLElement} windowElement
     */
    minimizeWindow(windowElement) {
        let value = 1;
        const timer = setInterval(() => {
            value -= 0.1;
            windowElement.style.transform = `scale(${value})`;
            if (value <= 0.3) {
                clearInterval(timer);
                windowElement.classList.add('hnet-hidden');
                windowElement.style.transform = `scale(1)`;
            }
        }, 30)
    }

    /***
     * 最大化窗口
     * @param {HTMLElement} windowElement
     */
    maximizeWindow(windowElement) {
        const isMaximized = windowElement.classList.toggle('maximized');
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
                height: 'calc(100% - 40px)', // 假设顶部有40px的任务栏
                top: '0',
                left: '0'
            });
        } else {
            // 恢复到之前的大小和位置
            const prevStyle = JSON.parse(windowElement.dataset.prevStyle || '{}');

            if (Object.keys(prevStyle).length) {
                Object.assign(windowElement.style, prevStyle);
            } else {
                // 如果没有之前的样式信息，使用默认值
                const desktopRect = this.desktop.getBoundingClientRect();

                const topPosition = (desktopRect.height - defaultHeight) / 2;
                const leftPosition = (desktopRect.width - defaultWidth) / 2;

                Object.assign(windowElement.style, {
                    width: `${defaultWidth}%`,
                    height: `${defaultHeight}%`,
                    top: `${topPosition}px`,
                    left: `${leftPosition}px`,
                });
            }
        }
    }

    /***
     * 关闭窗口
     * @param {HTMLElement} windowElement
     */
    closeWindow(windowElement) {
        windowElement.remove();
        WindowManager.windowCounter--;
        if (WindowManager.windowCounter <= 0) return
    }

    /**
     * 使窗口可拖动
     * @param {MouseEvent} e
     * @param {HTMLElement} windowElement
     */
    makeDraggable(e, windowElement) {
        windowElement.style.transition = 'none';
        let lastX = 0, lastY = 0;
        if (e.target.closest('.buttons')) return; // 如果点击的是按钮，不执行拖动
        // 鼠标按下时记录当前鼠标位置和窗口位置
        lastX = e.clientX - windowElement.offsetLeft;
        lastY = e.clientY - windowElement.offsetTop;

        let windowRect = windowElement.getBoundingClientRect();

        // 鼠标移动时更新窗口位置
        document.onmousemove = function (e) {
            let dx = e.clientX - lastX;
            let dy = e.clientY - lastY;
            var maxL = document.documentElement.clientWidth - windowElement.offsetWidth;
            var maxT = document.documentElement.clientHeight - windowElement.offsetHeight;

            // 更新窗口位置
            dx <= 0 && (dx = 0);
            dy <= 0 && (dy = 0);
            dx >= maxL && (dx = maxL);
            dy >= maxT && (dy = maxT);
            windowElement.style.left = dx + "px";
            windowElement.style.top = dy + "px";
            return false

            // 重新计算窗口的新边界
            windowRect = windowElement.getBoundingClientRect();
        };

        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
            this.releaseCapture && this.releaseCapture()
        };

        this.setCapture && this.setCapture();
        // 阻止默认行为，如文本选择等
        e.preventDefault();
        return false
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
    resizeWindow(handle, oParent, isLeft, isTop, lockX, lockY) {
        const content = document.querySelector(".hnet-window-content")
        const ads = document.createElement("div")
        ads.className = "hnet-ads"
        content.appendChild(ads)
        handle.onmousedown = (event) => {
            let disX = event.clientX - handle.offsetLeft;
            let disY = event.clientY - handle.offsetTop;
            let iParentTop = oParent.offsetTop;
            let iParentLeft = oParent.offsetLeft;
            let iParentWidth = oParent.offsetWidth;
            let iParentHeight = oParent.offsetHeight;
            const iframe = oParent.querySelector('iframe');
            document.onmousemove = (event) => {
                oParent.style.transition = "none"
                iframe.style.display = 'none';

                ads.style.display = this.adsText ? "block" : "none"
                ads.innerHTML = this.adsText

                let iL = event.clientX - disX;
                let iT = event.clientY - disY;
                let maxW = document.documentElement.clientWidth - oParent.offsetLeft - 2;
                let maxH = document.documentElement.clientHeight - oParent.offsetTop - 2; let iW = isLeft ? iParentWidth - iL : handle.offsetWidth + iL;
                let iH = isTop ? iParentHeight - iT : handle.offsetHeight + iT;
                isLeft && (oParent.style.left = iParentLeft + iL + "px");
                isTop && (oParent.style.top = iParentTop + iT + "px");
                iW < this.dragMinWidth && (iW = this.dragMinWidth);
                iW > maxW && (iW = maxW);
                lockX || (oParent.style.width = iW + "px");
                iH < this.dragMinHeight && (iH = this.dragMinHeight);
                iH > maxH && (iH = maxH);
                lockY || (oParent.style.height = iH + "px");
                if ((isLeft && iW == this.dragMinWidth) || (isTop && iH == this.dragMinHeight)) document.onmousemove = null;
                return false;
            };
            document.onmouseup = function () {
                iframe.style.display = 'block';
                ads.style.display = 'none'
                document.onmousemove = null;
                document.onmouseup = null;
            };
            return false;
        }
    }
    /**
     * 窗口置顶
     * @param {HTMLElement} windowElement
     */
    bringToFront(windowElement) {
        const allWindows = document.querySelectorAll('.hnet-window');
        allWindows.forEach((win) => {
            win.style.zIndex = win === windowElement ? 999 : 0;
        });
    }

    /**
     * 显示/隐藏窗口
     * @param {HTMLElement} windowElement
     */
    toggleWindow(windowElement) {
        if (windowElement.classList.contains('hnet-hidden')) {
            windowElement.classList.remove('hnet-hidden');
            this.bringToFront(windowElement);
        } else {
            windowElement.classList.add('hnet-hidden');
        }
    }
}

export default WindowManager