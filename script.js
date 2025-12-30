// St. Croix Materials - Complete JavaScript

console.log('St. Croix Materials site loaded!');

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
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
}

// Navbar scroll effect
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

// Smooth scroll offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Particles canvas
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.speed = Math.random() * 2 + 1;
            this.size = Math.random() * 3 + 1;
        }
        
        update() {
            this.y += this.speed;
            if (this.y > canvas.height + 10) {
                this.reset();
            }
        }
        
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }

    const particles = Array.from({ length: 50 }, () => new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}

// Calculator functionality
const calcTabs = document.querySelectorAll('.calc-tab');
const calcTabContents = document.querySelectorAll('.calc-tab-content');

calcTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;
        
        calcTabs.forEach(t => t.classList.remove('active'));
        calcTabContents.forEach(content => content.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(`${targetTab}-tab`).classList.add('active');
    });
});

// Mix prices
const mixPrices = {
    'standard': 150,
    'high-strength': 180,
    'fiber': 170,
    'air': 160
};

// Calculate delivery fee based on location
function getDeliveryFee(address) {
    const addressLower = address.toLowerCase();
    
    // 0-15 miles - FREE
    if (addressLower.includes('centuria') || addressLower.includes('balsam lake')) {
        return 0;
    }
    
    // 15-30 miles - $50
    if (addressLower.includes('rice lake') || addressLower.includes('barron') || 
        addressLower.includes('frederic') || addressLower.includes('luck')) {
        return 50;
    }
    
    // 30-45 miles - $75
    if (addressLower.includes('spooner') || addressLower.includes('cumberland') || 
        addressLower.includes('turtle lake') || addressLower.includes('shell lake')) {
        return 75;
    }
    
    // Beyond 45 miles - $100
    return 100;
}

// Calculate estimate
document.getElementById('calc-estimate-btn').addEventListener('click', () => {
    let cubicYards = 0;
    
    // Check which tab is active
    const dimensionsTab = document.getElementById('dimensions-tab');
    if (dimensionsTab.classList.contains('active')) {
        const length = parseFloat(document.getElementById('calc-length').value) || 0;
        const width = parseFloat(document.getElementById('calc-width').value) || 0;
        const depth = parseFloat(document.getElementById('calc-depth').value) || 0;
        
        if (length && width && depth) {
            cubicYards = (length * width * (depth / 12)) / 27;
        }
    } else {
        cubicYards = parseFloat(document.getElementById('calc-yards').value) || 0;
    }
    
    if (cubicYards < 1) {
        alert('Please enter valid dimensions or cubic yards (minimum 1 yard)');
        return;
    }
    
    const mixType = document.getElementById('calc-mix').value;
    const address = document.getElementById('calc-address').value;
    
    if (!address) {
        alert('Please enter a delivery address');
        return;
    }
    
    const pricePerYard = mixPrices[mixType];
    const materialCost = cubicYards * pricePerYard;
    const deliveryFee = getDeliveryFee(address);
    const totalCost = materialCost + deliveryFee;
    
    // Update results
    document.getElementById('result-yards').textContent = cubicYards.toFixed(2) + ' yd³';
    document.getElementById('result-mix').textContent = document.getElementById('calc-mix').selectedOptions[0].text.split(' -')[0];
    document.getElementById('result-material').textContent = '$' + materialCost.toFixed(2);
    document.getElementById('result-delivery').textContent = deliveryFee === 0 ? 'FREE' : '$' + deliveryFee.toFixed(2);
    document.getElementById('result-total').textContent = '$' + totalCost.toFixed(2);
    
    // Show results
    document.querySelector('.results-help').style.display = 'none';
    document.querySelector('.results-details').style.display = 'block';
});

// Scroll animations
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

document.querySelectorAll('.service-card, .product-item, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});
