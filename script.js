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

// Service Area Map Visualization
const mapElement = document.getElementById('service-map');
if (mapElement) {
    // Centuria, WI coordinates (approximate center of map)
    const centerLat = 45.4805; // Centuria latitude
    const centerLon = -92.5566; // Centuria longitude
    
    // Create map with simplified visualization
    const mapWidth = mapElement.offsetWidth;
    const mapHeight = mapElement.offsetHeight;
    
    // Calculate radius in pixels (45 miles)
    // Rough approximation: 1 degree ≈ 69 miles
    const radiusInDegrees = 45 / 69;
    const radiusPixels = Math.min(mapWidth, mapHeight) * 0.35;
    
    // Create service radius circle
    const radiusCircle = document.createElement('div');
    radiusCircle.className = 'service-radius';
    radiusCircle.style.width = radiusPixels * 2 + 'px';
    radiusCircle.style.height = radiusPixels * 2 + 'px';
    radiusCircle.style.left = '50%';
    radiusCircle.style.top = '50%';
    mapElement.appendChild(radiusCircle);
    
    // Create marker pin SVG
    const marker = document.createElement('div');
    marker.className = 'map-marker';
    marker.style.left = '50%';
    marker.style.top = '50%';
    marker.innerHTML = `
        <svg class="map-marker-pin" viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/>
        </svg>
    `;
    mapElement.appendChild(marker);
    
    // Create location label
    const label = document.createElement('div');
    label.className = 'map-label';
    label.textContent = 'Centuria, WI';
    label.style.left = '50%';
    label.style.top = '50%';
    mapElement.appendChild(label);
    
    // Create radius info label
    const radiusLabel = document.createElement('div');
    radiusLabel.className = 'radius-label';
    radiusLabel.innerHTML = '45 Mile Service Radius';
    mapElement.appendChild(radiusLabel);
    
    // Add some nearby town indicators (approximate positions relative to Centuria)
    const towns = [
        { name: 'Rice Lake', offsetX: -15, offsetY: 20 },
        { name: 'Spooner', offsetX: 30, offsetY: -10 },
        { name: 'Cumberland', offsetX: -30, offsetY: -15 },
        { name: 'Barron', offsetX: -25, offsetY: 5 },
    ];
    
    towns.forEach(town => {
        const townDot = document.createElement('div');
        townDot.style.position = 'absolute';
        townDot.style.width = '8px';
        townDot.style.height = '8px';
        townDot.style.borderRadius = '50%';
        townDot.style.background = 'var(--accent)';
        townDot.style.border = '2px solid white';
        townDot.style.left = `calc(50% + ${town.offsetX}%)`;
        townDot.style.top = `calc(50% + ${town.offsetY}%)`;
        townDot.style.transform = 'translate(-50%, -50%)';
        townDot.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
        townDot.title = town.name;
        mapElement.appendChild(townDot);
        
        const townLabel = document.createElement('div');
        townLabel.style.position = 'absolute';
        townLabel.style.left = `calc(50% + ${town.offsetX}%)`;
        townLabel.style.top = `calc(50% + ${town.offsetY}%)`;
        townLabel.style.transform = 'translate(-50%, -200%)';
        townLabel.style.fontSize = '0.75rem';
        townLabel.style.fontWeight = '600';
        townLabel.style.color = 'var(--text-dark)';
        townLabel.style.whiteSpace = 'nowrap';
        townLabel.textContent = town.name;
        mapElement.appendChild(townLabel);
    });
    
    // Add grid lines for visual interest
    const gridSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    gridSvg.style.position = 'absolute';
    gridSvg.style.top = '0';
    gridSvg.style.left = '0';
    gridSvg.style.width = '100%';
    gridSvg.style.height = '100%';
    gridSvg.style.pointerEvents = 'none';
    gridSvg.style.opacity = '0.1';
    
    // Draw grid
    for (let i = 0; i <= 10; i++) {
        const lineH = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        lineH.setAttribute('x1', '0');
        lineH.setAttribute('y1', `${i * 10}%`);
        lineH.setAttribute('x2', '100%');
        lineH.setAttribute('y2', `${i * 10}%`);
        lineH.setAttribute('stroke', '#2d3142');
        lineH.setAttribute('stroke-width', '1');
        gridSvg.appendChild(lineH);
        
        const lineV = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        lineV.setAttribute('x1', `${i * 10}%`);
        lineV.setAttribute('y1', '0');
        lineV.setAttribute('x2', `${i * 10}%`);
        lineV.setAttribute('y2', '100%');
        lineV.setAttribute('stroke', '#2d3142');
        lineV.setAttribute('stroke-width', '1');
        gridSvg.appendChild(lineV);
    }
    
    mapElement.insertBefore(gridSvg, mapElement.firstChild);
}
