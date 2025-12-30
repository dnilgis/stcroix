// Mobile menu toggle
console.log('St. Croix Materials site loaded!');

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

// Concrete Calculator
const calcTabs = document.querySelectorAll('.calc-tab');
const calcTabContents = document.querySelectorAll('.calc-tab-content');

calcTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        
        calcTabs.forEach(t => t.classList.remove('active'));
        calcTabContents.forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
    });
});

// Mix prices
const mixPrices = {
    'standard': 150,
    'high-strength': 180,
    'fiber': 170,
    'air': 160
};

const mixNames = {
    'standard': 'Standard Mix (3000-4000 PSI)',
    'high-strength': 'High-Strength (5000+ PSI)',
    'fiber': 'Fiber-Reinforced',
    'air': 'Air-Entrained'
};

// Calculate distance from Centuria, WI (simplified - would use real geocoding in production)
function calculateDeliveryFee(address) {
    // In production, you'd use Google Maps Geocoding API
    // For now, we'll use a simple estimate based on city names
    const lowerAddress = address.toLowerCase();
    
    // Free delivery within 15 miles
    if (lowerAddress.includes('centuria') || lowerAddress.includes('balsam lake')) {
        return 0;
    }
    // $50 for 15-30 miles
    else if (lowerAddress.includes('rice lake') || lowerAddress.includes('barron') || 
             lowerAddress.includes('frederic') || lowerAddress.includes('luck')) {
        return 50;
    }
    // $75 for 30-45 miles
    else if (lowerAddress.includes('spooner') || lowerAddress.includes('cumberland') || 
             lowerAddress.includes('turtle lake') || lowerAddress.includes('shell lake')) {
        return 75;
    }
    // $100 for edge of service area
    else {
        return 100;
    }
}

document.getElementById('calc-estimate-btn').addEventListener('click', () => {
    let cubicYards = 0;
    
    // Check which tab is active
    const dimensionsActive = document.getElementById('dimensions-tab').classList.contains('active');
    
    if (dimensionsActive) {
        // Calculate from dimensions
        const length = parseFloat(document.getElementById('calc-length').value) || 0;
        const width = parseFloat(document.getElementById('calc-width').value) || 0;
        const depth = parseFloat(document.getElementById('calc-depth').value) || 0;
        
        if (length <= 0 || width <= 0 || depth <= 0) {
            alert('Please enter valid dimensions');
            return;
        }
        
        // Convert to cubic yards (L x W x D(in feet) / 27)
        const depthFeet = depth / 12;
        cubicYards = (length * width * depthFeet) / 27;
    } else {
        // Use direct cubic yards input
        cubicYards = parseFloat(document.getElementById('calc-yards').value) || 0;
        
        if (cubicYards <= 0) {
            alert('Please enter cubic yards needed');
            return;
        }
    }
    
    // Get mix type and address
    const mixType = document.getElementById('calc-mix').value;
    const address = document.getElementById('calc-address').value.trim();
    
    if (!address) {
        alert('Please enter a delivery address');
        return;
    }
    
    // Calculate costs
    const pricePerYard = mixPrices[mixType];
    const materialCost = cubicYards * pricePerYard;
    const deliveryFee = calculateDeliveryFee(address);
    const total = materialCost + deliveryFee;
    
    // Minimum order
    const minYards = 1;
    if (cubicYards < minYards) {
        alert(`Minimum order is ${minYards} cubic yard`);
        return;
    }
    
    // Update results
    document.getElementById('result-yards').textContent = cubicYards.toFixed(2) + ' yd³';
    document.getElementById('result-mix').textContent = mixNames[mixType];
    document.getElementById('result-material').textContent = '$' + materialCost.toFixed(2);
    document.getElementById('result-delivery').textContent = '$' + deliveryFee.toFixed(2);
    document.getElementById('result-total').textContent = '$' + total.toFixed(2);
    
    // Show results
    document.querySelector('.results-help').style.display = 'none';
    document.querySelector('.results-details').style.display = 'block';
    
    // Store estimate data for quote request
    window.lastEstimate = {
        yards: cubicYards.toFixed(2),
        mix: mixNames[mixType],
        address: address,
        total: total.toFixed(2)
    };
});

// Request Quote button - call phone number
document.getElementById('request-quote-btn').addEventListener('click', () => {
    if (window.lastEstimate) {
        // Copy estimate to clipboard
        const estimateText = `St. Croix Materials Estimate:\n\n` +
                           `Cubic Yards: ${window.lastEstimate.yards}\n` +
                           `Mix Type: ${window.lastEstimate.mix}\n` +
                           `Delivery Address: ${window.lastEstimate.address}\n` +
                           `Estimated Total: $${window.lastEstimate.total}\n\n` +
                           `Call (715) 557-0563 to confirm your order!`;
        
        // Try to copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(estimateText).then(() => {
                alert('Estimate copied to clipboard! Call us at (715) 557-0563 to place your order.');
            }).catch(() => {
                alert('Your estimate:\n\n' + estimateText);
            });
        } else {
            alert('Your estimate:\n\n' + estimateText);
        }
        
        // Open phone dialer
        window.location.href = 'tel:+17155570563';
    }
});
