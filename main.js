// Este archivo solo controlará el menú de hamburguesa
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNavPanel = document.getElementById('mobile-nav-panel');

    if (hamburgerBtn && mobileNavPanel) {
        hamburgerBtn.addEventListener('click', () => {
            mobileNavPanel.classList.toggle('active');
        });
    }
});