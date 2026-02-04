// ——— Scroll Reveal ———
const reveals = document.querySelectorAll('[data-reveal]');

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
});

reveals.forEach(function (el) {
    observer.observe(el);
});


// ——— Mobile Menu ———
var toggle = document.getElementById('mobile-toggle');
var navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    this.classList.toggle('open');
});

// Close on link click
navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
        navLinks.classList.remove('active');
        toggle.classList.remove('open');
    });
});


// ——— Nav Shadow on Scroll ———
var nav = document.getElementById('nav');

window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}, { passive: true });
