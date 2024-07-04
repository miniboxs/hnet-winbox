// WindowManager.js
class WindowManager {
    constructor({ title, icon, width, height, x, y, background, oncreate, onfocus, onblur, onresize, onfullscreen, onminimize, onmaximize, onrestore, onmove, onclose }) {
        this.desktop = document.getElementById('desktop');
        this.taskbar = document.getElementById('taskbar');
        this.windowCounter = 0;

        this.createWindow({ title, icon, width, height, x, y, background, oncreate, onfocus, onblur, onresize, onfullscreen, onminimize, onmaximize, onrestore, onmove, onclose });
    }

    // @ts-ignore
    createWindow({ title, icon, width, height, x, y, background, oncreate, onfocus, onblur, onresize, onfullscreen, onminimize, onmaximize, onrestore, onmove, onclose }) {
        const windowId = `window-${this.windowCounter++}`;
        const windowElement = document.createElement('div');
        windowElement.classList.add('window');
        windowElement.dataset.id = windowId;
        windowElement.style.width = width;
        windowElement.style.height = height;
        windowElement.style.left = x;
        windowElement.style.top = y;
        windowElement.style.background = background;

        windowElement.innerHTML = `
        <div class="window-header">
          <span class="title">${title}</span>
          <div class="buttons">
            <button class="minimize">_</button>
            <button class="maximize">[]</button>
            <button class="close">X</button>
          </div>
        </div>
        <div class="window-content">
          <iframe src="" frameborder="0" style="width: 100%; height: 100%;"></iframe>
        </div>
      `;

        this.desktop.appendChild(windowElement);

        // 调用 oncreate 回调
        if (oncreate) oncreate({ autosize: true });

        // 创建任务栏图标
        const taskbarItem = document.createElement('div');
        taskbarItem.classList.add('taskbar-item');
        taskbarItem.dataset.id = windowId;
        taskbarItem.textContent = title[0]; // 使用标题的首字母作为图标，可以根据需要更改

        this.taskbar.appendChild(taskbarItem);

        // 事件处理
        windowElement.addEventListener('focus', () => {
            if (onfocus) onfocus.call(windowElement);
        });

        windowElement.addEventListener('blur', () => {
            if (onblur) onblur.call(windowElement);
        });

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (onresize) onresize.call(windowElement, entry.contentRect.width, entry.contentRect.height);
            }
        });
        resizeObserver.observe(windowElement);

        // 添加事件监听器
        const minimizeButton = windowElement.querySelector('.minimize');
        const maximizeButton = windowElement.querySelector('.maximize');
        const closeButton = windowElement.querySelector('.close');
        const header = windowElement.querySelector('.window-header');

        minimizeButton.addEventListener('click', () => {
            windowElement.classList.add('hidden');
            if (onminimize) onminimize.call(windowElement);
        });

        maximizeButton.addEventListener('click', () => {
            if (windowElement.classList.contains('maximized')) {
                windowElement.classList.remove('maximized');
                windowElement.style.width = width;
                windowElement.style.height = height;
                windowElement.style.left = x;
                windowElement.style.top = y;
            } else {
                windowElement.classList.add('maximized');
                windowElement.style.width = '100%';
                windowElement.style.height = '100%';
                windowElement.style.top = '0';
                windowElement.style.left = '0';
            }
            if (onmaximize) onmaximize.call(windowElement);
        });

        closeButton.addEventListener('click', () => {
            if (onclose) {
                const shouldClose = onclose.call(windowElement, true);
                if (!shouldClose) return;
            }
            windowElement.remove();
            taskbarItem.remove();
            if (onclose) onclose.call(windowElement, false);
        });

        // 添加拖动功能
        header.addEventListener('mousedown', (e) => {
            const rect = windowElement.getBoundingClientRect();
            // @ts-ignore
            const offsetX = e.clientX - rect.left;
            // @ts-ignore
            const offsetY = e.clientY - rect.top;

            function onMouseMove(e) {
                windowElement.style.left = `${e.clientX - offsetX}px`;
                windowElement.style.top = `${e.clientY - offsetY}px`;
                if (onmove) onmove.call(windowElement, e.clientX - offsetX, e.clientY - offsetY);
            }

            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        // 任务栏图标点击事件
        taskbarItem.addEventListener('click', () => {
            if (windowElement.classList.contains('hidden')) {
                windowElement.classList.remove('hidden');
                if (onrestore) onrestore.call(windowElement);
            } else {
                windowElement.classList.add('hidden');
                if (onminimize) onminimize.call(windowElement);
            }
        });
    }
}

export default WindowManager;
