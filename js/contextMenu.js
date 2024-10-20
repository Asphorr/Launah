// js/contextMenu.js

import { windowManager } from './windowManager.js';

export const contextMenu = (() => {
    const init = () => {
        const desktop = document.getElementById('desktop');
        const contextMenu = document.getElementById('context-menu');

        desktop.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showContextMenu(e.pageX, e.pageY);
        });

        document.addEventListener('click', () => {
            hideContextMenu();
        });

        // Обработчики элементов контекстного меню
        contextMenu.querySelectorAll('.context-item').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.textContent;
                // Реализуйте действия в зависимости от выбранного пункта
                console.log(`Выбрано действие: ${action}`);
                hideContextMenu();
            });
        });
    };

    const showContextMenu = (x, y) => {
        const contextMenu = document.getElementById('context-menu');
        contextMenu.style.left = `${x}px`;
        contextMenu.style.top = `${y}px`;
        contextMenu.classList.remove('hidden');

        // Анимация появления
        gsap.fromTo(contextMenu, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.2 });
    };

    const hideContextMenu = () => {
        const contextMenu = document.getElementById('context-menu');
        if (!contextMenu.classList.contains('hidden')) {
            gsap.to(contextMenu, { opacity: 0, scale: 0.8, duration: 0.2, onComplete: () => {
                contextMenu.classList.add('hidden');
            }});
        }
    };

    return { init };
})();
