// Inițializare când documentul este încărcat complet
document.addEventListener('DOMContentLoaded', () => {
    // Inițializare header și navigație
    initHeader();
    
    // Inițializare animație typing
    initTypingAnimation();
    
    // Inițializare animație 3D pentru hero section
    initHeroAnimation();
    
    // Inițializare animații la scroll
    initScrollAnimations();
    
    // Inițializare bare de progres pentru skills
    initSkillBars();
    
    // Inițializare formular de contact
    initContactForm();
});

// Funcție pentru header și navigație
function initHeader() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Variabile pentru detectarea direcției de scroll
    let lastScrollTop = 0;
    
    // Adaugă clasa 'scrolled' la header când se face scroll și ascunde/afișează în funcție de direcția de scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // Adaugă efect de glassmorphism
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            header.classList.remove('header-hidden'); // Asigură-te că header-ul este vizibil la începutul paginii
        }
        
        // Detectează direcția de scroll și ascunde/afișează header-ul
        if (scrollTop > lastScrollTop && scrollTop > 150) {
            // Scroll în jos - ascunde header-ul
            header.classList.add('header-hidden');
        } else {
            // Scroll în sus - afișează header-ul
            header.classList.remove('header-hidden');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Previne valorile negative
        
        // Actualizează link-ul activ în funcție de secțiunea vizibilă
        let current = '';

        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll pentru link-urile de navigație
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
}

// Funcție pentru animația de typing
function initTypingAnimation() {
    const options = {
        strings: ['Web Developer', 'Frontend Developer', 'Freelancer', 'Creativ'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    };
    
    new Typed('.typing-text', options);
}

// Funcție pentru animația 3D din hero section
function initHeroAnimation() {
    const canvas = document.getElementById('hero-canvas');
    
    if (!canvas) return;
    
    try {
        // Inițializare Three.js
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
    
    // Adaugă particule
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 2;
    
    // Animație pentru particule
    const animate = () => {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.0003;
        particlesMesh.rotation.y += 0.0005;
        
        renderer.render(scene, camera);
    };
    
    animate();
    
    // Redimensionare canvas la redimensionarea ferestrei
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Efect de mișcare la mouse
    document.addEventListener('mousemove', (event) => {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        gsap.to(particlesMesh.rotation, {
            x: mouseY * 0.1,
            y: mouseX * 0.1,
            duration: 2
        });
    });
    } catch (error) {
        console.error('Eroare la inițializarea animației 3D:', error);
        // Fallback pentru cazul în care Three.js nu poate fi inițializat
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.background = 'linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)';
        }
    }
}

// Funcție pentru animații la scroll
function initScrollAnimations() {
    // Inițializare GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animații pentru cardurile de proiecte
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        gsap.fromTo(card, 
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Animații pentru timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        gsap.fromTo(item,
            { x: -50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Animații pentru skill items
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        gsap.fromTo(item,
            { x: -30, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.6,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Animații pentru formularul de contact
    const contactForm = document.querySelector('.contact-form');
    const socialLinks = document.querySelector('.social-links');
    
    if (contactForm) {
        gsap.fromTo(contactForm,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: contactForm,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
    
    if (socialLinks) {
        gsap.fromTo(socialLinks,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.3,
                scrollTrigger: {
                    trigger: socialLinks,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
}

// Funcție pentru animarea barelor de progres pentru skills
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        
        gsap.fromTo(bar, 
            { width: 0 },
            {
                width: `${progress}%`,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: bar,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

// Funcție pentru inițializarea formularului de contact
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aici ar trebui să adaugi logica pentru trimiterea formularului
        // De exemplu, folosind fetch API pentru a trimite datele la un server
        
        // Simulare trimitere formular
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Se trimite...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            // Resetare formular
            this.reset();
            
            // Afișare mesaj de succes
            alert('Mesajul a fost trimis cu succes!');
            
            // Resetare buton
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}