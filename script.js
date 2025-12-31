// St. Croix Materials - Complete JavaScript with All Improvements

console.log('St. Croix Materials site loaded!');

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================================
// MOBILE NAVIGATION
// ===================================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            if (navLinks.classList.contains('active')) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    });
}

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

const navbar = document.querySelector('.navbar');

const handleScroll = debounce(() => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
}, 10);

window.addEventListener('scroll', handleScroll);

// ===================================
// SMOOTH SCROLL
// ===================================

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

// ===================================
// PARTICLES CANVAS
// ===================================

const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', debounce(resizeCanvas, 100));

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

    // Reduce particle count on mobile for performance
    const particleCount = window.innerWidth < 768 ? 25 : 50;
    const particles = Array.from({ length: particleCount }, () => new Particle());

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

// ===================================
// CALCULATOR FUNCTIONALITY
// ===================================

const calcTabs = document.querySelectorAll('.calc-tab');
const calcTabContents = document.querySelectorAll('.calc-tab-content');

// Tab switching
calcTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;
        
        // Update tabs
        calcTabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
        });
        
        // Update content
        calcTabContents.forEach(content => content.classList.remove('active'));
        
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        document.getElementById(`${targetTab}-tab`).classList.add('active');
        
        // Clear errors when switching tabs
        clearAllErrors();
    });
});

// Mix prices
const mixPrices = {
    'standard': 150,
    'high-strength': 180,
    'fiber': 170,
    'air': 160
};

// Improved delivery fee calculation
function getDeliveryFee(address) {
    if (!address || address.trim().length < 3) {
        return 50; // Default fee if no address
    }
    
    const addressLower = address.toLowerCase();
    
    // 0-15 miles - FREE
    const freeDelivery = ['centuria', 'balsam lake'];
    if (freeDelivery.some(city => addressLower.includes(city))) {
        return 0;
    }
    
    // 15-30 miles - $50
    const nearbyDelivery = ['rice lake', 'barron', 'frederic', 'luck', 'amery', 'almena', 'cameron'];
    if (nearbyDelivery.some(city => addressLower.includes(city))) {
        return 50;
    }
    
    // 30-45 miles - $75
    const mediumDelivery = ['spooner', 'cumberland', 'turtle lake', 'shell lake'];
    if (mediumDelivery.some(city => addressLower.includes(city))) {
        return 75;
    }
    
    // Beyond 45 miles or unknown - $100
    return 100;
}

// Clear all error messages and styles
function clearAllErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.querySelectorAll('input, select').forEach(el => el.classList.remove('error'));
}

// Show error message
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId.replace('calc-', '')}-error`);
    
    if (field) field.classList.add('error');
    if (errorElement) errorElement.textContent = message;
}

// Validate calculator inputs
function validateCalculatorInputs() {
    clearAllErrors();
    let isValid = true;
    
    // Check which tab is active
    const dimensionsTab = document.getElementById('dimensions-tab');
    
    if (dimensionsTab.classList.contains('active')) {
        // Validate dimensions
        const length = parseFloat(document.getElementById('calc-length').value);
        const width = parseFloat(document.getElementById('calc-width').value);
        const depth = parseFloat(document.getElementById('calc-depth').value);
        
        if (!length || length <= 0) {
            showError('calc-length', 'Please enter a valid length');
            isValid = false;
        }
        
        if (!width || width <= 0) {
            showError('calc-width', 'Please enter a valid width');
            isValid = false;
        }
        
        if (!depth || depth <= 0) {
            showError('calc-depth', 'Please enter a valid depth');
            isValid = false;
        }
    } else {
        // Validate cubic yards
        const yards = parseFloat(document.getElementById('calc-yards').value);
        
        if (!yards || yards < 1) {
            showError('calc-yards', 'Please enter at least 1 cubic yard');
            isValid = false;
        }
    }
    
    // Validate address
    const address = document.getElementById('calc-address').value.trim();
    if (!address || address.length < 3) {
        showError('calc-address', 'Please enter a delivery address');
        isValid = false;
    }
    
    return isValid;
}

// Calculate estimate
const calcEstimateBtn = document.getElementById('calc-estimate-btn');
const calcBtnText = document.getElementById('calc-btn-text');

calcEstimateBtn.addEventListener('click', () => {
    // Validate inputs
    if (!validateCalculatorInputs()) {
        return;
    }
    
    // Show loading state
    const originalText = calcBtnText.textContent;
    calcBtnText.textContent = 'Calculating...';
    calcEstimateBtn.disabled = true;
    
    // Simulate a small delay for better UX
    setTimeout(() => {
        let cubicYards = 0;
        
        // Check which tab is active
        const dimensionsTab = document.getElementById('dimensions-tab');
        if (dimensionsTab.classList.contains('active')) {
            const length = parseFloat(document.getElementById('calc-length').value);
            const width = parseFloat(document.getElementById('calc-width').value);
            const depth = parseFloat(document.getElementById('calc-depth').value);
            
            // Calculate cubic yards: (length × width × depth in feet) / 27
            cubicYards = (length * width * (depth / 12)) / 27;
        } else {
            cubicYards = parseFloat(document.getElementById('calc-yards').value);
        }
        
        // Round to 2 decimal places
        cubicYards = Math.round(cubicYards * 100) / 100;
        
        const mixType = document.getElementById('calc-mix').value;
        const address = document.getElementById('calc-address').value;
        
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
        
        // Show results with animation
        document.querySelector('.results-help').style.display = 'none';
        const resultsDetails = document.querySelector('.results-details');
        resultsDetails.style.display = 'block';
        resultsDetails.style.opacity = '0';
        
        setTimeout(() => {
            resultsDetails.style.transition = 'opacity 0.3s ease';
            resultsDetails.style.opacity = '1';
        }, 10);
        
        // Reset button state
        calcBtnText.textContent = originalText;
        calcEstimateBtn.disabled = false;
        
        // Scroll to results on mobile
        if (window.innerWidth < 968) {
            setTimeout(() => {
                document.getElementById('calc-results').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }, 100);
        }
    }, 500);
});

// Request quote button functionality
const requestQuoteBtn = document.getElementById('request-quote-btn');
if (requestQuoteBtn) {
    requestQuoteBtn.addEventListener('click', () => {
        window.location.href = 'tel:+17155570563';
    });
}

// Clear errors on input
const inputFields = ['calc-length', 'calc-width', 'calc-depth', 'calc-yards', 'calc-address'];
inputFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
        field.addEventListener('input', () => {
            field.classList.remove('error');
            const errorElement = document.getElementById(`${fieldId.replace('calc-', '')}-error`);
            if (errorElement) errorElement.textContent = '';
        });
    }
});

// ===================================
// SCROLL ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply scroll animations to elements
document.querySelectorAll('.service-card, .product-item, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ===================================
// INITIALIZATION
// ===================================

// Log successful initialization
console.log('All features initialized successfully');

// Prevent form submission on enter key in calculator
document.querySelectorAll('.calculator-form input').forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            calcEstimateBtn.click();
        }
    });
});
