// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ===== Typewriter Effect =====
const typingTarget = document.getElementById('typing-target');
const phrases = [
    'Back-End Developer',
    'Engineering Student',
    'Laravel Engineer',
    'API Architect',
    'Problem Solver'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const TYPE_SPEED = 80;
const DELETE_SPEED = 40;
const PAUSE_BEFORE_DELETE = 2000;
const PAUSE_BEFORE_TYPE = 500;

function typewrite() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
        typingTarget.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(typewrite, PAUSE_BEFORE_DELETE);
            return;
        }
        setTimeout(typewrite, TYPE_SPEED);
    } else {
        typingTarget.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typewrite, PAUSE_BEFORE_TYPE);
            return;
        }
        setTimeout(typewrite, DELETE_SPEED);
    }
}

if (typingTarget) {
    setTimeout(typewrite, 800);
}

// ===== Scroll Reveal (IntersectionObserver) =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== Navbar Shrink on Scroll =====
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ===== Particle Background =====
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const PARTICLE_COUNT = 60;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.4 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(138, 178, 166, ${this.opacity})`;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }
}

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const opacity = (1 - distance / 150) * 0.12;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(138, 178, 166, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    drawConnections();
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// ===== Active Nav Link Highlighting =====
const sections = document.querySelectorAll('section, header');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${id}`) {
                    link.style.color = 'var(--primary-color)';
                }
            });
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
});

sections.forEach(section => sectionObserver.observe(section));

// ===== Hide scroll indicator on scroll =====
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    }, { passive: true });
}

// ===== Mobile Menu Toggle =====
const menuBtn = document.querySelector('.menu-btn');
const navLinksContainer = document.querySelector('.nav-links');
let menuOpen = false;

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        if (!menuOpen) {
            menuBtn.classList.add('open');
            navLinksContainer.classList.add('active');
            menuOpen = true;
        } else {
            menuBtn.classList.remove('open');
            navLinksContainer.classList.remove('active');
            menuOpen = false;
        }
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (menuOpen) {
            menuBtn.classList.remove('open');
            navLinksContainer.classList.remove('active');
            menuOpen = false;
        }
    });
});