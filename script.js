// ST. CROIX MATERIALS — Scripts

// Mobile nav
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

if (burger && navLinks) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
    
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
}

// Scroll reveal
const reveals = document.querySelectorAll('[data-reveal]');

const revealOnScroll = () => {
    reveals.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const visible = rect.top < window.innerHeight - 80;
        
        if (visible && !el.classList.contains('revealed')) {
            setTimeout(() => {
                el.classList.add('revealed');
            }, i % 4 * 100); // Stagger within groups
        }
    });
};

window.addEventListener('scroll', revealOnScroll, { passive: true });
window.addEventListener('load', revealOnScroll);

// Form handling
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('.form-btn');
        btn.classList.add('sending');
        btn.disabled = true;
        
        const formData = new FormData(form);
        
        try {
            // If using Formspree, uncomment this:
            // const response = await fetch(form.action, {
            //     method: 'POST',
            //     body: formData,
            //     headers: { 'Accept': 'application/json' }
            // });
            
            // Simulate success for demo
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success
            form.style.display = 'none';
            formSuccess.classList.add('show');
            
        } catch (error) {
            console.error('Form error:', error);
            btn.classList.remove('sending');
            btn.disabled = false;
            alert('Something went wrong. Please call Barry directly at (651) 728-2404.');
        }
    });
}

// Reduced motion check
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!prefersReducedMotion.matches) {
    // Parallax on hero image (only if motion is okay)
    const heroImg = document.querySelector('.hero-media img');
    
    if (heroImg && window.innerWidth > 1100) {
        window.addEventListener('scroll', () => {
            const scroll = window.scrollY;
            if (scroll < window.innerHeight) {
                heroImg.style.transform = `scale(1.05) translateY(${scroll * 0.1}px)`;
            }
        }, { passive: true });
    }
}
