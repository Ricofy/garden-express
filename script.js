// Translations
const translations = {
    pt: {
        "brand-text": "EXPRESS",
        "nav-home": "Início",
        "nav-products": "Produtos",
        "nav-purpose": "Propósito",
        "nav-contact": "Contato",
        "search": "Buscar",
        "account": "Conta",
        "bag": "Sacola [0]",
        "hero-title": "Bem-vindo à Inovação",
        "hero-subtitle": "Fórmulas de alta performance, criadas com excelência para quem exige resultados extraordinários na rotina de cuidados.",
        "cta-btn": "Explorar a Linha",
        "exclusive": "FÓRMULA EXCLUSIVA™",
        "learn-more": "Saiba mais",
        "purpose-btn": "Nosso Propósito",
        "view-details": "Ver Detalhes"
    },
    en: {
        "brand-text": "EXPRESS",
        "nav-home": "Home",
        "nav-products": "Products",
        "nav-purpose": "Purpose",
        "nav-contact": "Contact",
        "search": "Search",
        "account": "Account",
        "bag": "Bag [0]",
        "hero-title": "Welcome to Innovation",
        "hero-subtitle": "High-performance formulas, crafted with excellence for those who demand extraordinary results in their care routine.",
        "cta-btn": "Explore the Range",
        "exclusive": "EXCLUSIVE FORMULA™",
        "learn-more": "Learn more",
        "purpose-btn": "Our Purpose",
        "view-details": "View Details"
    },
    es: {
        "brand-text": "EXPRESS",
        "nav-home": "Inicio",
        "nav-products": "Productos",
        "nav-purpose": "Propósito",
        "nav-contact": "Contacto",
        "search": "Buscar",
        "account": "Cuenta",
        "bag": "Bolsa [0]",
        "hero-title": "Bienvenido a la Innovación",
        "hero-subtitle": "Fórmulas de alto rendimiento, creadas con excelencia para quienes exigen resultados extraordinarios en su rutina de cuidado.",
        "cta-btn": "Explorar la Línea",
        "exclusive": "FÓRMULA EXCLUSIVA™",
        "learn-more": "Saber más",
        "purpose-btn": "Nuestro Propósito",
        "view-details": "Ver Detalles"
    }
};

function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (el.tagName === 'A' && el.classList.contains('cta-button')) {
                const svg = el.querySelector('svg');
                el.innerHTML = translations[lang][key] + " ";
                if(svg) el.appendChild(svg);
            } else {
                el.innerText = translations[lang][key];
            }
        }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {

    // Lang Toggle
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // Mobile Menu
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const centerNav = document.querySelector('.center-nav');
    if (mobileMenuToggle && centerNav) {
        mobileMenuToggle.addEventListener('click', () => {
            centerNav.classList.toggle('active');
        });
    }

    // Login Form Mock
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        if (localStorage.getItem('gpe_logged_in') === 'true') {
            window.location.href = 'account.html';
        }

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = loginForm.querySelector('.auth-submit');
            btn.innerHTML = 'Verificando...';
            
            setTimeout(() => {
                localStorage.setItem('gpe_logged_in', 'true');
                window.location.href = 'account.html';
            }, 800);
        });
    }

    const createAccountBtn = document.getElementById('createAccountBtn');
    if (createAccountBtn) {
        createAccountBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Abertura de formulário de cadastro em breve...");
        });
    }

    // Product Carousel Navigation
    const productCarousel = document.getElementById('productCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (productCarousel && prevBtn && nextBtn) {
        const scrollAmount = 352; // Card width + gap
        
        const scrollRight = () => {
             // If scrolled to right exactly or passed (scrollWidth - clientWidth handles slight subpixel variance)
             if (productCarousel.scrollLeft + productCarousel.clientWidth >= productCarousel.scrollWidth - 10) {
                 productCarousel.scrollTo({ left: 0, behavior: 'smooth' });
             } else {
                 productCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
             }
        };

        prevBtn.addEventListener('click', () => {
            productCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            scrollRight();
        });

        let autoScrollInterval;
        let isHovered = false;

        const startAutoScroll = () => {
            autoScrollInterval = setInterval(() => {
                if (!isHovered) {
                    scrollRight();
                }
            }, 3500);
        };

        productCarousel.parentElement.addEventListener('mouseenter', () => isHovered = true);
        productCarousel.parentElement.addEventListener('mouseleave', () => isHovered = false);

        startAutoScroll();
    }

    // Header scroll background & Scroll Text Animation
    const header = document.querySelector('.main-header');
    const heroSection = document.querySelector('.hero-wrapper');
    const scrollTextSection = document.querySelector('.scroll-text-section');
    const words = document.querySelectorAll('.scroll-text .word');
    
    window.addEventListener('scroll', () => {
        // Handle Header
        if (heroSection && header) {
            const heroBottom = heroSection.getBoundingClientRect().bottom;
            if (heroBottom <= header.offsetHeight) {
                header.classList.add('scrolled-light');
            } else {
                header.classList.remove('scrolled-light');
            }
        }

        // Handle Scroll Text Animation
        if (scrollTextSection && words.length > 0) {
            const sectionRect = scrollTextSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate progress of section in viewport
            let progress = 0;
            const startScroll = windowHeight; // When top of section enters bottom of viewport
            const endScroll = sectionRect.height * 0.5; // Complete animation when halfway through
            
            // Distance scrolled into the section from the top of viewport hitting sticky point
            const sectionTopFromViewportStart = sectionRect.top;
            
            // Make animation start when section is exactly in the middle of the screen
            const triggerPoint = windowHeight * 0.5;
            
            if (sectionTopFromViewportStart < triggerPoint) {
                // Calculate how far we've scrolled past the trigger point
                const scrolledPast = triggerPoint - sectionTopFromViewportStart;
                const totalScrollArea = windowHeight * 0.4;
                
                progress = Math.min(1, Math.max(0, scrolledPast / totalScrollArea));
                
                // Opacity cascade
                const wordsToReveal = Math.floor(progress * (words.length + 2)); // Add small buffer
                
                words.forEach((word, index) => {
                    if (index < wordsToReveal) {
                        word.style.opacity = '1';
                    } else if (index === wordsToReveal) {
                         // Smooth transition for the current word
                         let partialProgress = (progress * (words.length + 2)) - index;
                         word.style.opacity = Math.max(0.1, partialProgress).toString();
                    } else {
                        word.style.opacity = '0.1';
                    }
                });

                const purposeBtn = document.getElementById('purposeBtn');
                if (purposeBtn) {
                    if (progress > 0.85) {
                        purposeBtn.classList.add('visible');
                    } else {
                        purposeBtn.classList.remove('visible');
                    }
                }
            } else {
                words.forEach(word => word.style.opacity = '0.1');
                const purposeBtn = document.getElementById('purposeBtn');
                if (purposeBtn) purposeBtn.classList.remove('visible');
            }
        }
    });

    // Render feature video on scroll
    const featureSection = document.querySelector('.drinkpouch-feature');
    const featureVideo = document.querySelector('.dp-product-media');

    if (featureSection && featureVideo) {
        let targetVideoTime = 0;
        let currentVideoTime = 0;
        
        window.addEventListener('scroll', () => {
            const rect = featureSection.getBoundingClientRect();
            const startPoint = window.innerHeight * 0.5;
            const distance = startPoint - rect.top;
            const totalDistance = startPoint + rect.height;
            
            if (distance > 0 && distance < totalDistance) {
                let progress = distance / totalDistance;
                progress = Math.min(Math.max(progress, 0), 1);
                
                if (featureVideo.duration && !isNaN(featureVideo.duration)) {
                    targetVideoTime = progress * featureVideo.duration;
                }
            } else if (distance <= 0) {
                targetVideoTime = 0;
            } else if (distance >= totalDistance) {
                if (featureVideo.duration && !isNaN(featureVideo.duration)) {
                    targetVideoTime = featureVideo.duration;
                }
            }
        });

        const smoothUpdateVideo = () => {
            if (featureVideo && !isNaN(featureVideo.duration)) {
                // Lerp current time towards target time (lowered from 0.1 to 0.03 for much smoother momentum)
                currentVideoTime += (targetVideoTime - currentVideoTime) * 0.03;
                
                // Only update DOM if change is noticeable for performance
                if (Math.abs(targetVideoTime - currentVideoTime) > 0.001) {
                    featureVideo.currentTime = currentVideoTime;
                }
            }
            requestAnimationFrame(smoothUpdateVideo);
        };
        smoothUpdateVideo();

        if (featureVideo.readyState >= 1) {
            window.dispatchEvent(new Event('scroll'));
        } else {
            featureVideo.addEventListener('loadedmetadata', () => {
                window.dispatchEvent(new Event('scroll'));
            });
        }
    }

    // Trigger scroll event on load to set initial state
    window.dispatchEvent(new Event('scroll'));

    // Community Carousel & Video Autoplay
    const commCarousel = document.getElementById('commCarousel');
    const commPrevBtn = document.getElementById('commPrevBtn');
    const commNextBtn = document.getElementById('commNextBtn');
    const videos = document.querySelectorAll('.comm-video-wrapper video');
    const globalSoundToggle = document.getElementById('globalSoundToggle');
    let isMuted = true;

    if (commCarousel) {
        const scrollAmount = commCarousel.clientWidth; // Pula um card inteiro (pois agora é 100% ou max-width bem grande)
        
        commPrevBtn?.addEventListener('click', () => {
            commCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        commNextBtn?.addEventListener('click', () => {
            commCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        // Mouse Drag to Scroll
        let isDragging = false;
        let startX;
        let scrollLeftPos;

        const stopDrag = () => {
            if (!isDragging) return;
            isDragging = false;
            commCarousel.style.cursor = 'grab';
            commCarousel.style.scrollSnapType = 'x mandatory'; // Reativa o alinhamento de snap suavemente
        };

        commCarousel.addEventListener('mousedown', (e) => {
            // Não prevenir se clicar em botões, para poder dar play/pause
            if(e.target.closest('button') || e.target.closest('a')) return;
            
            isDragging = true;
            commCarousel.style.cursor = 'grabbing';
            commCarousel.style.scrollSnapType = 'none'; // Desativa snapping durante o arrasto
            startX = e.pageX - commCarousel.offsetLeft;
            scrollLeftPos = commCarousel.scrollLeft;
        });

        window.addEventListener('mouseup', stopDrag);
        commCarousel.addEventListener('mouseleave', stopDrag);

        commCarousel.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault(); // Previne seleção de imagem/texto
            const x = e.pageX - commCarousel.offsetLeft;
            const walk = (x - startX) * 1.5; // Velocidade suave e controlada
            commCarousel.scrollLeft = scrollLeftPos - walk;
        });

        // Toggle global sound
        if (globalSoundToggle) {
            globalSoundToggle.addEventListener('click', () => {
                isMuted = !isMuted;
                videos.forEach(vid => vid.muted = isMuted);
                
                if (isMuted) {
                    globalSoundToggle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';
                } else {
                    globalSoundToggle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';
                }
            });
        }

        // Play/Pause per video logic
        const playPauseBtns = document.querySelectorAll('.video-play-pausepause');
        playPauseBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const wrapper = e.target.closest('.comm-video-wrapper');
                const video = wrapper.querySelector('video');
                
                if (video.paused) {
                    video.play();
                    btn.classList.remove('paused');
                } else {
                    video.pause();
                    btn.classList.add('paused');
                }
            });
        });
    }

    // Custom mouse effect for Hero Section (Particle/Dot trailing)
    const heroWrapper = document.getElementById('heroWrapper');
    const cursorDot = document.getElementById('cursorDot');
    const cursorOutline = document.getElementById('cursorOutline');

    if (heroWrapper && cursorDot && cursorOutline) {
        let outlineX = 0;
        let outlineY = 0;
        let targetX = 0;
        let targetY = 0;

        heroWrapper.addEventListener('mousemove', (e) => {
            const rect = heroWrapper.getBoundingClientRect();
            // Calcula a posição do mouse em relação ao wrapper para absolute position
            targetX = e.clientX - rect.left;
            targetY = e.clientY - rect.top;

            // O cursor ponto se move instantaneamente junto ao ponteiro
            cursorDot.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
        });

        // Animando a borda externa que segue o ponteiro com suavidade
        const animateCursorOutline = () => {
            // Lerp - segue suave com inércia lenta
            outlineX += (targetX - outlineX) * 0.15;
            outlineY += (targetY - outlineY) * 0.15;
            
            cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
            
            requestAnimationFrame(animateCursorOutline);
        };
        animateCursorOutline();
    }
});
