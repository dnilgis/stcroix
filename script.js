/* ===========================
   ST. CROIX MATERIALS
   =========================== */

var INITIAL_SHOW = 12;
var galleryExpanded = false;

// ——— Build Filters with Counts ———
(function() {
    if (typeof GALLERY === 'undefined') return;
    var filtersEl = document.getElementById('filters');
    if (!filtersEl) return;

    // Count categories
    var counts = { all: GALLERY.length };
    GALLERY.forEach(function(p) {
        counts[p.category] = (counts[p.category] || 0) + 1;
    });

    var categories = [
        { key: 'all', label: 'All' },
        { key: 'pumping', label: 'Pumping' },
        { key: 'flatwork', label: 'Flatwork' },
        { key: 'residential', label: 'Residential' },
        { key: 'commercial', label: 'Commercial' },
        { key: 'agricultural', label: 'Agricultural' }
    ];

    categories.forEach(function(cat) {
        var btn = document.createElement('button');
        btn.className = 'filter-btn' + (cat.key === 'all' ? ' active' : '');
        btn.setAttribute('data-filter', cat.key);
        btn.innerHTML = cat.label + ' <span class="filter-count">(' + (counts[cat.key] || 0) + ')</span>';
        filtersEl.appendChild(btn);
    });
})();

// ——— Gallery ———
(function() {
    if (typeof GALLERY === 'undefined') return;
    var grid = document.getElementById('gallery-grid');
    if (!grid) return;
    GALLERY.forEach(function(photo, i) {
        var item = document.createElement('div');
        item.className = 'gal-item';
        if (i >= INITIAL_SHOW) item.classList.add('gallery-overflow');
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

    // Update show more button text
    var moreBtn = document.getElementById('show-more-btn');
    if (moreBtn && GALLERY.length > INITIAL_SHOW) {
        moreBtn.textContent = 'Show All ' + GALLERY.length + ' Photos';
    } else if (moreBtn) {
        document.getElementById('gallery-more-wrap').classList.add('gallery-hidden');
    }
})();

// ——— Show More ———
(function() {
    var moreBtn = document.getElementById('show-more-btn');
    var moreWrap = document.getElementById('gallery-more-wrap');
    if (!moreBtn) return;
    moreBtn.addEventListener('click', function() {
        galleryExpanded = true;
        document.querySelectorAll('.gal-item.gallery-overflow').forEach(function(item) {
            item.classList.add('gallery-expanded');
        });
        moreWrap.classList.add('gallery-hidden');
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

        // When filtering, expand all photos
        galleryExpanded = true;
        var moreWrap = document.getElementById('gallery-more-wrap');
        if (moreWrap) moreWrap.classList.add('gallery-hidden');

        document.querySelectorAll('.gal-item').forEach(function(item) {
            item.classList.add('gallery-expanded');
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

// ——— Touch Swipe on Lightbox ———
(function() {
    var startX = 0, startY = 0, diffX = 0;
    lightbox.addEventListener('touchstart', function(e) {
        startX = e.changedTouches[0].screenX;
        startY = e.changedTouches[0].screenY;
    }, { passive: true });
    lightbox.addEventListener('touchend', function(e) {
        diffX = e.changedTouches[0].screenX - startX;
        var diffY = e.changedTouches[0].screenY - startY;
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) { prevPhoto(); } else { nextPhoto(); }
        }
    }, { passive: true });
})();

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

// ——— Back to Top ———
(function() {
    var btn = document.getElementById('btn-top');
    if (!btn) return;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 600) { btn.classList.add('visible'); }
        else { btn.classList.remove('visible'); }
    }, { passive: true });
    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

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

// ——— Geolocation Banner ———
(function() {
    if (sessionStorage.getItem('scm-geo-shown')) return;

    var BASE_LAT = 45.4541;
    var BASE_LNG = -92.1413;

    function distanceMi(lat1, lng1, lat2, lng2) {
        var R = 3959;
        var dLat = (lat2 - lat1) * Math.PI / 180;
        var dLng = (lng2 - lng1) * Math.PI / 180;
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLng/2) * Math.sin(dLng/2);
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    function getMessage(miles, city) {
        var loc = city ? city : 'your area';
        if (miles <= 45) {
            return { icon: '\uD83D\uDFE2', text: 'Great news \u2014 we deliver to ' + loc + '! Give us a call for a free estimate.', cta: true };
        } else if (miles <= 60) {
            return { icon: '\uD83D\uDFE1', text: loc + ' is just outside our usual range, but call us \u2014 we can probably make it work!', cta: true };
        } else if (miles <= 150) {
            return { icon: '\uD83D\uDFE0', text: loc + ' is about ' + Math.round(miles) + ' miles out \u2014 that\'s a haul, but reach out if you need us.', cta: true };
        } else {
            return { icon: '\uD83D\uDCCD', text: 'Looks like you\'re about ' + Math.round(miles) + ' miles from us in Centuria, WI \u2014 eek, that\'s a haul! But if you\'re ever in Northwest Wisconsin, we\'d love to help.', cta: false };
        }
    }

    function showBanner(msg) {
        sessionStorage.setItem('scm-geo-shown', '1');
        var banner = document.createElement('div');
        banner.className = 'geo-banner';
        banner.innerHTML =
            '<div class="geo-inner">' +
                '<span class="geo-icon">' + msg.icon + '</span>' +
                '<span class="geo-text">' + msg.text + '</span>' +
                (msg.cta ? '<a href="tel:7155570563" class="geo-cta">Call Now</a>' : '') +
                '<button class="geo-close" aria-label="Close">&times;</button>' +
            '</div>';
        document.body.appendChild(banner);
        requestAnimationFrame(function() {
            requestAnimationFrame(function() { banner.classList.add('geo-visible'); });
        });
        banner.querySelector('.geo-close').addEventListener('click', function() {
            banner.classList.remove('geo-visible');
            setTimeout(function() { banner.remove(); }, 400);
        });
        setTimeout(function() {
            if (banner.parentNode) {
                banner.classList.remove('geo-visible');
                setTimeout(function() { banner.remove(); }, 400);
            }
        }, 12000);
    }

    setTimeout(function() {
        fetch('https://ipapi.co/json/')
            .then(function(r) { return r.json(); })
            .then(function(d) {
                if (d && d.latitude && d.longitude) {
                    var miles = distanceMi(d.latitude, d.longitude, BASE_LAT, BASE_LNG);
                    var city = d.city || '';
                    if (d.region) city += (city ? ', ' : '') + d.region;
                    showBanner(getMessage(miles, city));
                }
            }).catch(function() {});
    }, 2500);
})();
