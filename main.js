// Main Javascript for PMI Kota Tasikmalaya

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.main-header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const desktopNav = document.querySelector('.desktop-nav');

    // Sticky Header Logic
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle (Simplified)
    mobileToggle.addEventListener('click', () => {
        alert('Fitur Menu Mobile akan segera hadir!');
    });

    // Update Date
    const dateSpan = document.getElementById('current-date');
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateSpan.textContent = now.toLocaleDateString('id-ID', options);

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('PMI Tasikmalaya Clone Initialized');
});
