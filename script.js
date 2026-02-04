/* ===========================
   ST. CROIX MATERIALS
   =========================== */

// ——— Gallery ———
(function() {
    if (typeof GALLERY === 'undefined') return;
    var grid = document.getElementById('gallery-grid');
    if (!grid) return;
    GALLERY.forEach(function(photo, i) {
        var item = document.createElement('div');
        item.className = 'gal-item';
        item.setAttribute('data-index', i);
        item.setAttribute('data-cat', photo.category);
        var img = document.createElement('img');
        img.src = 'photos/' + photo.file;
        img.alt = photo.alt;
        img.loading = i < 6 ? 'eager' : 'lazy';
        img.width = 600; img.height = 450;
        var label = document.createElement('span');
        label.className = 'gal-label';
        label.textContent = photo.title;
        item.appendChild(img);
        item.appendChild(label);
        grid.appendChild(item);
        item.addEventListener('click', function() { openLightbox(i); });
    });
})();

// ——— Filters ———
var filtersEl = document.getElementById('filters');
if (filtersEl) {
    filtersEl.addEventListener('click', function(e) {
        var btn = e.target.closest('.filter-btn');
        if (!btn) return;
        document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var cat = btn.getAttribute('data-filter');
        document.querySelectorAll('.gal-item').forEach(function(item) {
            if (cat === 'all' || item.getAttribute('data-cat') === cat) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
}

// ——— Lightbox ———
var lightbox = document.getElementById('lightbox');
var lbImg = document.getElementById('lb-img');
var lbCap = document.getElementById('lb-cap');
var lbCt = document.getElementById('lb-ct');
var currentIndex = 0;

function getVisiblePhotos() {
    var indices = [];
    document.querySelectorAll('.gal-item:not(.hidden)').forEach(function(item) {
        indices.push(parseInt(item.getAttribute('data-index')));
    });
    return indices;
}

function openLightbox(index) {
    currentIndex = index; updateLightbox();
    lightbox.classList.add('active'); document.body.classList.add('lb-open');
}
function closeLightbox() {
    lightbox.classList.remove('active'); document.body.classList.remove('lb-open');
}
function updateLightbox() {
    if (typeof GALLERY === 'undefined') return;
    var photo = GALLERY[currentIndex];
    lbImg.src = 'photos/' + photo.file; lbImg.alt = photo.alt;
    lbCap.textContent = photo.title;
    var visible = getVisiblePhotos();
    lbCt.textContent = (visible.indexOf(currentIndex) + 1) + ' / ' + visible.length;
}
function nextPhoto() {
    var v = getVisiblePhotos(); var p = v.indexOf(currentIndex);
    currentIndex = v[(p + 1) % v.length]; updateLightbox();
}
function prevPhoto() {
    var v = getVisiblePhotos(); var p = v.indexOf(currentIndex);
    currentIndex = v[(p - 1 + v.length) % v.length]; updateLightbox();
}

document.getElementById('lb-close').addEventListener('click', closeLightbox);
document.getElementById('lb-prev').addEventListener('click', prevPhoto);
document.getElementById('lb-next').addEventListener('click', nextPhoto);
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox || e.target.classList.contains('lb-body')) closeLightbox();
});
document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') prevPhoto();
});

// ——— Scroll Reveal ———
var revealObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add('revealed'); revealObs.unobserve(e.target); }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
document.querySelectorAll('[data-reveal]').forEach(function(el) { revealObs.observe(el); });

// ——— Mobile Menu ———
var burger = document.getElementById('burger');
var navLinks = document.getElementById('nav-links');
burger.addEventListener('click', function() {
    navLinks.classList.toggle('active'); this.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});
navLinks.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
        navLinks.classList.remove('active'); burger.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ——— Counter ———
var counterObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
        if (e.isIntersecting) {
            var el = e.target; var target = parseInt(el.getAttribute('data-count'));
            var start = null;
            function step(ts) {
                if (!start) start = ts;
                var p = Math.min((ts - start) / 1500, 1);
                el.textContent = Math.round((1 - Math.pow(1 - p, 4)) * target);
                if (p < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step); counterObs.unobserve(el);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(function(el) { counterObs.observe(el); });

// ——— Weather ———
(function() {
    try {
        fetch('https://api.open-meteo.com/v1/forecast?latitude=45.4541&longitude=-92.1413&current_weather=true&temperature_unit=fahrenheit')
            .then(function(r) { return r.json(); })
            .then(function(d) {
                if (d && d.current_weather) {
                    var el = document.getElementById('topbar-loc');
                    if (el) el.textContent = Math.round(d.current_weather.temperature) + '\u00B0F in Centuria, WI';
                }
            }).catch(function() {});
    } catch(e) {}
})();
