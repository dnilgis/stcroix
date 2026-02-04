/* ===========================
   ST. CROIX MATERIALS — ENGINE
   =========================== */

// ——— SCROLL REVEAL ———
var reveals = document.querySelectorAll('[data-reveal]');
var revealObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
reveals.forEach(function(el) { revealObs.observe(el); });


// ——— MOBILE MENU ———
var toggle = document.getElementById('mobile-toggle');
var navLinks = document.getElementById('nav-links');
toggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    this.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
        navLinks.classList.remove('active');
        toggle.classList.remove('open');
    });
});


// ——— NAV SHADOW ———
var nav = document.getElementById('nav');
window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });


// ——— COUNTER ANIMATION ———
var counterObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            var el = entry.target;
            var target = parseInt(el.getAttribute('data-count'));
            var duration = 1800;
            var start = null;
            function step(ts) {
                if (!start) start = ts;
                var p = Math.min((ts - start) / duration, 1);
                var eased = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.round(eased * target);
                if (p < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
            counterObs.unobserve(el);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(function(el) { counterObs.observe(el); });


// ——— CONCRETE ESTIMATOR ———
var presets = {
    slab:       { length: 20, width: 12, depth: 4 },
    driveway:   { length: 40, width: 12, depth: 5 },
    sidewalk:   { length: 30, width: 4,  depth: 4 },
    foundation: { length: 30, width: 20, depth: 8 }
};

var sliderLen = document.getElementById('slab-length');
var sliderWid = document.getElementById('slab-width');
var sliderDep = document.getElementById('slab-depth');
var lenVal = document.getElementById('len-val');
var widVal = document.getElementById('wid-val');
var depVal = document.getElementById('dep-val');
var resYards = document.getElementById('result-yards');
var resTrucks = document.getElementById('result-trucks');
var resWeight = document.getElementById('result-weight');

// Project type buttons
document.getElementById('est-types').addEventListener('click', function(e) {
    var btn = e.target.closest('.type-btn');
    if (!btn) return;
    document.querySelectorAll('.type-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    var preset = presets[btn.getAttribute('data-type')];
    if (preset) {
        sliderLen.value = preset.length;
        sliderWid.value = preset.width;
        sliderDep.value = preset.depth;
        updateEstimator();
    }
});

// Slider events
[sliderLen, sliderWid, sliderDep].forEach(function(s) {
    s.addEventListener('input', updateEstimator);
});

function updateSliderFill(slider) {
    var pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background = 'linear-gradient(to right, #bf5630 0%, #bf5630 ' + pct + '%, #e2e2e2 ' + pct + '%, #e2e2e2 100%)';
}

function updateEstimator() {
    var len = parseInt(sliderLen.value);
    var wid = parseInt(sliderWid.value);
    var dep = parseInt(sliderDep.value);

    lenVal.textContent = len + ' ft';
    widVal.textContent = wid + ' ft';
    depVal.textContent = dep + ' in';

    updateSliderFill(sliderLen);
    updateSliderFill(sliderWid);
    updateSliderFill(sliderDep);

    // Calculations
    var cubicFeet = len * wid * (dep / 12);
    var cubicYards = cubicFeet / 27;
    var trucks = Math.ceil(cubicYards / 10);
    var weight = Math.round(cubicYards * 4050);

    resYards.textContent = cubicYards.toFixed(2);
    resTrucks.textContent = trucks;
    resWeight.textContent = weight.toLocaleString();

    // Render 3D
    renderSlab(len, wid, dep);
}

// ——— ISOMETRIC SVG RENDERER ———
function renderSlab(lengthFt, widthFt, depthIn) {
    var svg = document.getElementById('slab-svg');
    var cx = 200, cy = 165;
    var cos30 = 0.866;
    var sin30 = 0.5;

    // Scale: largest dimension fills 110px in iso space
    var maxDim = Math.max(lengthFt, widthFt);
    var scale = 110 / maxDim;
    var w = widthFt * scale;
    var l = lengthFt * scale;
    var d = depthIn * 3.2;

    function iso(x, y, z) {
        return {
            x: cx + (x - y) * cos30,
            y: cy + (x + y) * sin30 - z
        };
    }

    // Corners — top face (z = d)
    var t0 = iso(0, 0, d);
    var t1 = iso(w, 0, d);
    var t2 = iso(w, l, d);
    var t3 = iso(0, l, d);
    // Corners — bottom face (z = 0)
    var b0 = iso(0, 0, 0);
    var b1 = iso(w, 0, 0);
    var b3 = iso(0, l, 0);

    var topPts = pt(t0) + ' ' + pt(t1) + ' ' + pt(t2) + ' ' + pt(t3);
    var rightPts = pt(b0) + ' ' + pt(b1) + ' ' + pt(t1) + ' ' + pt(t0);
    var leftPts = pt(b0) + ' ' + pt(b3) + ' ' + pt(t3) + ' ' + pt(t0);

    // Shadow
    var s0 = iso(2, 2, -8);
    var s1 = iso(w + 2, 2, -8);
    var s2 = iso(w + 2, l + 2, -8);
    var s3 = iso(2, l + 2, -8);
    var shadowPts = pt(s0) + ' ' + pt(s1) + ' ' + pt(s2) + ' ' + pt(s3);

    // Grid lines on top face
    var grid = '';
    var gw = Math.max(2, Math.min(Math.floor(widthFt / 4), 7));
    var gl = Math.max(2, Math.min(Math.floor(lengthFt / 4), 7));
    for (var i = 1; i < gw; i++) {
        var r = i / gw;
        var a = iso(w * r, 0, d);
        var b = iso(w * r, l, d);
        grid += '<line x1="' + a.x.toFixed(1) + '" y1="' + a.y.toFixed(1) + '" x2="' + b.x.toFixed(1) + '" y2="' + b.y.toFixed(1) + '" stroke="rgba(0,0,0,0.06)" stroke-width="0.7"/>';
    }
    for (var j = 1; j < gl; j++) {
        var r = j / gl;
        var a = iso(0, l * r, d);
        var b = iso(w, l * r, d);
        grid += '<line x1="' + a.x.toFixed(1) + '" y1="' + a.y.toFixed(1) + '" x2="' + b.x.toFixed(1) + '" y2="' + b.y.toFixed(1) + '" stroke="rgba(0,0,0,0.06)" stroke-width="0.7"/>';
    }

    // Dimension labels
    var dimW = iso(w / 2, -22, 0);
    var dimL = iso(-22, l / 2, 0);
    var dimD = iso(w + 16, 0, d / 2);

    var dims = '';
    // Width dimension line
    var wd1 = iso(0, -14, 0);
    var wd2 = iso(w, -14, 0);
    dims += '<line x1="' + wd1.x.toFixed(1) + '" y1="' + wd1.y.toFixed(1) + '" x2="' + wd2.x.toFixed(1) + '" y2="' + wd2.y.toFixed(1) + '" stroke="#bbb" stroke-width="0.7" stroke-dasharray="3,2"/>';
    dims += '<text x="' + dimW.x.toFixed(1) + '" y="' + dimW.y.toFixed(1) + '" text-anchor="middle" font-size="11" font-weight="600" fill="#999" font-family="Source Sans 3, sans-serif">' + widthFt + ' ft</text>';

    // Length dimension line
    var ld1 = iso(-14, 0, 0);
    var ld2 = iso(-14, l, 0);
    dims += '<line x1="' + ld1.x.toFixed(1) + '" y1="' + ld1.y.toFixed(1) + '" x2="' + ld2.x.toFixed(1) + '" y2="' + ld2.y.toFixed(1) + '" stroke="#bbb" stroke-width="0.7" stroke-dasharray="3,2"/>';
    dims += '<text x="' + dimL.x.toFixed(1) + '" y="' + dimL.y.toFixed(1) + '" text-anchor="middle" font-size="11" font-weight="600" fill="#999" font-family="Source Sans 3, sans-serif">' + lengthFt + ' ft</text>';

    // Depth label
    dims += '<text x="' + dimD.x.toFixed(1) + '" y="' + dimD.y.toFixed(1) + '" text-anchor="start" font-size="10" font-weight="600" fill="#999" font-family="Source Sans 3, sans-serif">' + depthIn + ' in</text>';

    svg.innerHTML =
        '<polygon points="' + shadowPts + '" fill="rgba(0,0,0,0.06)"/>' +
        '<polygon points="' + leftPts + '" fill="#a8a49c" stroke="#9a968e" stroke-width="0.5"/>' +
        '<polygon points="' + rightPts + '" fill="#bdb9b1" stroke="#aeaaa2" stroke-width="0.5"/>' +
        '<polygon points="' + topPts + '" fill="#d4d0c8" stroke="#c5c1b9" stroke-width="0.5"/>' +
        grid + dims;
}

function pt(p) {
    return p.x.toFixed(1) + ',' + p.y.toFixed(1);
}

// Init estimator
updateEstimator();


// ——— LIVE WEATHER ———
(function() {
    try {
        fetch('https://api.open-meteo.com/v1/forecast?latitude=45.4541&longitude=-92.1413&current_weather=true&temperature_unit=fahrenheit')
            .then(function(r) { return r.json(); })
            .then(function(data) {
                if (data && data.current_weather) {
                    var temp = Math.round(data.current_weather.temperature);
                    var loc = document.getElementById('top-bar-loc');
                    if (loc) {
                        var good = temp >= 50;
                        loc.innerHTML = temp + '&deg;F in Centuria &mdash; <span class="weather-badge' + (good ? '' : ' cold') + '">' + (good ? 'Good Pour Conditions' : 'Cold Weather Advisory') + '</span>';
                    }
                }
            })
            .catch(function() {});
    } catch(e) {}
})();
