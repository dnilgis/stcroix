// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards, product items, and other elements
document.querySelectorAll('.service-card, .product-item, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Form submission handling (basic example - replace with your backend)
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to your backend
    console.log('Form submitted:', data);
    
    // Show success message (basic example)
    alert('Thank you for your inquiry! We will contact you soon.');
    contactForm.reset();
    
    // TODO: Replace with actual form submission to your backend
    // Example using fetch:
    /*
    fetch('/your-api-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert('Thank you for your inquiry! We will contact you soon.');
        contactForm.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting your request. Please try again or call us directly.');
    });
    */
});

// Smooth scroll offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Offset for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animated geometric particles for hero section
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particle class
class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.5 + 0.1;
        // Random shape: 0 = circle, 1 = triangle, 2 = square, 3 = hexagon
        this.shape = Math.floor(Math.random() * 4);
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    }
    
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        
        // Reset if out of bounds
        if (this.y > canvas.height + 10) {
            this.reset();
        }
        if (this.x < -10 || this.x > canvas.width + 10) {
            this.x = Math.random() * canvas.width;
        }
    }
    
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        
        // Orange accent color
        ctx.strokeStyle = '#ef8354';
        ctx.fillStyle = 'rgba(239, 131, 84, 0.2)';
        ctx.lineWidth = 1;
        
        switch(this.shape) {
            case 0: // Circle
                ctx.beginPath();
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                ctx.stroke();
                break;
            case 1: // Triangle
                ctx.beginPath();
                ctx.moveTo(0, -this.size);
                ctx.lineTo(this.size, this.size);
                ctx.lineTo(-this.size, this.size);
                ctx.closePath();
                ctx.stroke();
                break;
            case 2: // Square
                ctx.strokeRect(-this.size, -this.size, this.size * 2, this.size * 2);
                break;
            case 3: // Hexagon
                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const angle = (Math.PI / 3) * i;
                    const x = this.size * Math.cos(angle);
                    const y = this.size * Math.sin(angle);
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.stroke();
                break;
        }
        
        ctx.restore();
    }
}

// Create particles
const particles = [];
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animate);
}

animate();

// Service Area Map Visualization - SIMPLIFIED
window.addEventListener('load', function() {
    const mapElement = document.getElementById('service-map');
    if (!mapElement) return;
    
    // Wait for element to be fully rendered
    setTimeout(() => {
        const mapWidth = mapElement.offsetWidth;
        const mapHeight = mapElement.offsetHeight;
        const radiusPixels = Math.min(mapWidth, mapHeight) * 0.35;
        
        // Create HTML for the entire map
        mapElement.innerHTML = `
            <!-- Grid Background -->
            <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.15; pointer-events: none;">
                <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#2d3142" stroke-width="0.5"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            
            <!-- Service Radius Circle -->
            <div style="
                position: absolute;
                left: 50%;
                top: 50%;
                width: ${radiusPixels * 2}px;
                height: ${radiusPixels * 2}px;
                transform: translate(-50%, -50%);
                border: 3px solid #ef8354;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(239, 131, 84, 0.15), rgba(239, 131, 84, 0.05), transparent 70%);
                animation: radiusPulse 3s ease-in-out infinite;
            "></div>
            
            <!-- Nearby Towns -->
            <div style="position: absolute; left: calc(50% - 15%); top: calc(50% + 20%); width: 8px; height: 8px; border-radius: 50%; background: #4f5d75; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);" title="Rice Lake"></div>
            <div style="position: absolute; left: calc(50% - 15%); top: calc(50% + 20% - 30px); font-size: 0.75rem; font-weight: 600; color: #1a1a1a; white-space: nowrap;">Rice Lake</div>
            
            <div style="position: absolute; left: calc(50% + 30%); top: calc(50% - 10%); width: 8px; height: 8px; border-radius: 50%; background: #4f5d75; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);" title="Spooner"></div>
            <div style="position: absolute; left: calc(50% + 30%); top: calc(50% - 10% - 30px); font-size: 0.75rem; font-weight: 600; color: #1a1a1a; white-space: nowrap;">Spooner</div>
            
            <div style="position: absolute; left: calc(50% - 30%); top: calc(50% - 15%); width: 8px; height: 8px; border-radius: 50%; background: #4f5d75; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);" title="Cumberland"></div>
            <div style="position: absolute; left: calc(50% - 30%); top: calc(50% - 15% - 30px); font-size: 0.75rem; font-weight: 600; color: #1a1a1a; white-space: nowrap;">Cumberland</div>
            
            <div style="position: absolute; left: calc(50% - 25%); top: calc(50% + 5%); width: 8px; height: 8px; border-radius: 50%; background: #4f5d75; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);" title="Barron"></div>
            <div style="position: absolute; left: calc(50% - 25%); top: calc(50% + 5% - 30px); font-size: 0.75rem; font-weight: 600; color: #1a1a1a; white-space: nowrap;">Barron</div>
            
            <!-- Center Marker -->
            <div style="
                position: absolute;
                left: 50%;
                top: 50%;
                width: 40px;
                height: 40px;
                transform: translate(-50%, -100%);
                animation: markerBounce 2s ease-in-out infinite;
            ">
                <svg viewBox="0 0 24 36" style="width: 100%; height: 100%; fill: #ef8354; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));">
                    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/>
                </svg>
            </div>
            
            <!-- Location Label -->
            <div style="
                position: absolute;
                left: 50%;
                top: calc(50% - 50px);
                transform: translateX(-50%);
                background: #2d3142;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                font-weight: 600;
                font-size: 0.9rem;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            ">
                Centuria, WI
                <div style="
                    position: absolute;
                    bottom: -6px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 0;
                    border-left: 6px solid transparent;
                    border-right: 6px solid transparent;
                    border-top: 6px solid #2d3142;
                "></div>
            </div>
            
            <!-- Radius Label -->
            <div style="
                position: absolute;
                top: 10px;
                right: 10px;
                background: rgba(45, 49, 66, 0.9);
                color: white;
                padding: 0.75rem 1.25rem;
                border-radius: 4px;
                font-weight: 600;
                font-size: 0.95rem;
                border-left: 4px solid #ef8354;
            ">45 Mile Service Radius</div>
        `;
    }, 100);
});
