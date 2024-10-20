// js/menuBar.js

import { windowManager } from './windowManager.js';
import { notifications } from './notifications.js';

export const menuBar = (() => {
    const init = () => {
        // Обработчик для Apple меню
        const appleMenu = document.getElementById('apple-menu');
        appleMenu.addEventListener('click', (e) => {
            e.stopPropagation(); // Предотвращаем закрытие при клике внутри меню
            appleMenu.querySelector('.dropdown').classList.toggle('show');
        });

        // Закрытие выпадающих меню при клике вне
        document.addEventListener('click', () => {
            const dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach(dd => dd.classList.remove('show'));
        });

        // Обработчики для Dock и иконок рабочего стола
        document.querySelectorAll('.dock-icon, .icon').forEach(icon => {
            icon.addEventListener('click', () => {
                const appId = icon.getAttribute('data-app');
                if (appId) {
                    windowManager.open(appId);
                }
            });
        });

        // Добавление переключателя темы
        const themeSwitcher = document.createElement('div');
        themeSwitcher.classList.add('theme-switcher');
        themeSwitcher.innerHTML = '<i class="fas fa-adjust"></i>';
        themeSwitcher.addEventListener('click', toggleTheme);
        document.body.appendChild(themeSwitcher);

        // Обработчики для пунктов Apple меню
        document.getElementById('change-wallpaper').addEventListener('click', changeWallpaper);
        // Добавьте обработчики для остальных пунктов меню, если требуется
    };

    const toggleTheme = () => {
        document.body.classList.toggle('dark-theme');
        const currentTheme = document.body.classList.contains('dark-theme') ? 'Тёмная тема' : 'Светлая тема';
        notifications.notify(`Вы переключили на ${currentTheme}.`, 'info');
    };

    const changeWallpaper = () => {
        const newWallpaper = prompt('Введите URL новой обои:');
        if (newWallpaper) {
            document.getElementById('desktop').style.backgroundImage = `url('${newWallpaper}')`;
            notifications.notify('Обои рабочего стола изменены.', 'success');
        }
    };

    return { init };
})();
