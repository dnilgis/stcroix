/* ===========================
   ST. CROIX MATERIALS — ENGINE
   =========================== */

// ——— GALLERY: Build grid from photos.js ———
(function() {
    if (typeof GALLERY === 'undefined') return;
    var grid = document.getElementById('gallery-grid');
    if (!grid) return;

    GALLERY.forEach(function(photo, i) {
        var item = document.createElement('div');
        item.className = 'gallery-item';
        item.setAttribute('data-index', i);
        item.setAttribute('data-title', photo.title);

        var img = document.createElement('img');
        img.src = 'photos/' + photo.file;
        img.alt = photo.alt;
        img.loading = i < 6 ? 'eager' : 'lazy';
        img.width = 600;
        img.height = 450;

        item.appendChild(img);
        grid.appendChild(item);

        item.addEventListener('click', function() {
            openLightbox(i);
        });
    });
})();


// ——— LIGHTBOX ———
var lightbox = document.getElementById('lightbox');
var lbImg = document.getElementById('lb-img');
var lbCaption = document.getElementById('lb-caption');
var lbCounter = document.getElementById('lb-counter');
var lbClose = document.getElementById('lb-close');
var lbPrev = document.getElementById('lb-prev');
var lbNext = document.getElementById('lb-next');
var currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.classList.add('lb-open');
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('lb-open');
}

function updateLightbox() {
    if (typeof GALLERY === 'undefined') return;
    var photo = GALLERY[currentIndex];
    lbImg.src = 'photos/' + photo.file;
    lbImg.alt = photo.alt;
    lbCaption.textContent = photo.title;
    lbCounter.textContent = (currentIndex + 1) + ' / ' + GALLERY.length;
}

function nextPhoto() {
    currentIndex = (currentIndex + 1) % GALLERY.length;
    updateLightbox();
}

function prevPhoto() {
    currentIndex = (currentIndex - 1 + GALLERY.length) % GALLERY.length;
    updateLightbox();
}

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', prevPhoto);
lbNext.addEventListener('click', nextPhoto);

// Close on overlay click (not on image)
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox || e.target.classList.contains('lb-content')) {
        closeLightbox();
    }
});

// Keyboard nav
document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') prevPhoto();
});


// ——— SCROLL REVEAL ———
var revealObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
        if (e.isIntersecting) {
            e.target.classList.add('revealed');
            revealObs.unobserve(e.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

document.querySelectorAll('[data-reveal]').forEach(function(el) {
    revealObs.observe(el);
});


// ——— NAV ———
var nav = document.getElementById('nav');
var hero = document.getElementById('hero');

var heroObs = new IntersectionObserver(function(entries) {
    nav.classList.toggle('scrolled', !entries[0].isIntersecting);
}, { threshold: 0.05 });
heroObs.observe(hero);


// ——— MOBILE MENU ———
var toggle = document.getElementById('mobile-toggle');
var navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    this.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
        navLinks.classList.remove('active');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
    });
});


// ——— COUNTER ANIMATION ———
var counterObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
        if (e.isIntersecting) {
            var el = e.target;
            var target = parseInt(el.getAttribute('data-count'));
            var start = null;
            var duration = 2000;
            function step(ts) {
                if (!start) start = ts;
                var p = Math.min((ts - start) / duration, 1);
                el.textContent = Math.round((1 - Math.pow(1 - p, 4)) * target);
                if (p < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
            counterObs.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(function(el) {
    counterObs.observe(el);
});


// ——— WEATHER ———
(function() {
    try {
        fetch('https://api.open-meteo.com/v1/forecast?latitude=45.4541&longitude=-92.1413&current_weather=true&temperature_unit=fahrenheit')
            .then(function(r) { return r.json(); })
            .then(function(d) {
                if (d && d.current_weather) {
                    var el = document.getElementById('hero-location');
                    if (el) el.textContent = Math.round(d.current_weather.temperature) + '\u00B0F \u00B7 Centuria, Wisconsin';
                }
            }).catch(function() {});
    } catch(e) {}
})();
