// js/notifications.js

export const notifications = (() => {
    const notify = (message, type = 'info', duration = 3000) => {
        const notificationsContainer = document.getElementById('notifications');
        const notification = document.createElement('div');
        notification.classList.add('notification', `notification-${type}`);
        notification.innerHTML = `<i class="fas ${getIcon(type)}"></i> ${message}`;

        notificationsContainer.appendChild(notification);

        // Анимация исчезновения
        setTimeout(() => {
            gsap.to(notification, { opacity: 0, y: -20, duration: 0.5, onComplete: () => {
                notificationsContainer.removeChild(notification);
            }});
        }, duration);
    };

    const getIcon = (type) => {
        switch(type) {
            case 'success':
                return 'fa-check-circle';
            case 'error':
                return 'fa-times-circle';
            case 'warning':
                return 'fa-exclamation-circle';
            case 'info':
            default:
                return 'fa-info-circle';
        }
    };

    return { notify };
})();
