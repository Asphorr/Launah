// js/windowManager.js

export const windowManager = (() => {
    let zIndex = 500; // Начальное значение Z-Index для окон

    const open = (appId) => {
        const app = document.getElementById(appId);
        if (app) {
            app.style.display = 'flex';
            app.style.zIndex = ++zIndex;
            gsap.fromTo(app, { opacity: 0, scale: 0.8, y: -50 }, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" });

            // Если приложение "Notes", загрузить заметки
            if (appId === 'app3') {
                const textarea = app.querySelector('textarea');
                textarea.value = localStorage.getItem('notes') || '';
                textarea.removeEventListener('input', saveNotes); // Удаляем предыдущий слушатель, если есть
                textarea.addEventListener('input', saveNotes);
            }
        }
    };

    const saveNotes = (event) => {
        const textarea = event.target;
        localStorage.setItem('notes', textarea.value);
    };

    const close = (appId) => {
        const app = document.getElementById(appId);
        if (app) {
            gsap.to(app, { opacity: 0, scale: 0.8, y: -50, duration: 0.3, ease: "power2.in", onComplete: () => {
                app.style.display = 'none';
            }});
        }
    };

    const minimize = (appId) => {
        const app = document.getElementById(appId);
        if (app) {
            gsap.to(app, { y: 100, opacity: 0, duration: 0.3, ease: "power2.in", onComplete: () => {
                app.style.display = 'none';
            }});
        }
    };

    const bringToFront = (app) => {
        app.style.zIndex = ++zIndex;
    };

    // Инициализация перетаскивания и изменения размера окон
    const init = () => {
        interact('.app-window')
            .draggable({
                allowFrom: '.title-bar',
                listeners: {
                    start (event) {
                        bringToFront(event.target);
                    },
                    move (event) {
                        const target = event.target;
                        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                        target.style.transform = `translate(${x}px, ${y}px)`;
                        target.setAttribute('data-x', x);
                        target.setAttribute('data-y', y);
                    }
                }
            })
            .resizable({
                edges: { left: true, right: true, bottom: true, top: true },
                listeners: {
                    move (event) {
                        let { x, y } = event.target.dataset;

                        x = (parseFloat(x) || 0) + event.deltaRect.left;
                        y = (parseFloat(y) || 0) + event.deltaRect.top;

                        event.target.style.width = `${event.rect.width}px`;
                        event.target.style.height = `${event.rect.height}px`;

                        event.target.style.transform = `translate(${x}px, ${y}px)`;

                        event.target.dataset.x = x;
                        event.target.dataset.y = y;
                    }
                },
                modifiers: [
                    interact.modifiers.restrictSize({
                        min: { width: 300, height: 200 }
                    })
                ],
                inertia: true
            });

        // Наведение для поднятия окна
        document.querySelectorAll('.app-window').forEach(app => {
            app.addEventListener('mousedown', () => {
                bringToFront(app);
            });
        });
    };

    return { open, close, minimize, init };
})();
