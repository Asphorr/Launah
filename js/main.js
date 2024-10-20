// js/main.js

import { windowManager } from './windowManager.js';
import { menuBar } from './menuBar.js';
import { notifications } from './notifications.js';
import { contextMenu } from './contextMenu.js';

document.addEventListener('DOMContentLoaded', () => {
    // Инициализация компонентов
    windowManager.init();
    menuBar.init();
    contextMenu.init();

    // Анимация появления Dock и рабочего стола
    gsap.from("#dock", { y: 50, opacity: 0, duration: 0.5, ease: "bounce.out" });
    gsap.from("#desktop .icon", { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 });

    // Пример уведомления при загрузке
    notifications.notify('Добро пожаловать в Mac OS Simulator 1.1!', 'info');
});
