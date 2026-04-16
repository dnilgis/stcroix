// ST. CROIX MATERIALS

// Mobile nav
const toggle = document.getElementById('navToggle');
if (toggle) {
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('nav-open');
    });
}

// Form handling
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

if (form && success) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        btn.textContent = 'SENDING...';
        btn.disabled = true;
        
        try {
            await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });
        } catch (err) {
            // Continue anyway
        }
        
        form.style.display = 'none';
        success.classList.add('show');
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
