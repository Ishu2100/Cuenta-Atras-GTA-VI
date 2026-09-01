/**
 * GTA VI COUNTDOWN - PREMIUM WEB APPLICATION (V3 - Con Audio Optimizado)
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. CUENTA ATRÁS Y BARRA DE PROGRESO DINÁMICA
       ========================================== */
    const targetDate = new Date('November 19, 2026 00:00:00').getTime();
    const startDate = new Date('December 1, 2023 00:00:00').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const countdownTimer = document.getElementById('countdownTimer');
    const launchBanner = document.getElementById('launchBanner');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const targetDateTag = document.getElementById('targetDateTag');
    const tickAudio = document.getElementById('tickAudio');

    let isAudioPlaying = false; // Declarada de forma global para el ámbito del script

    function updateCountdownAndProgress() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        const totalDuration = targetDate - startDate;
        const elapsedDuration = now - startDate;
        let percentage = (elapsedDuration / totalDuration) * 100;
        
        if (percentage < 0) percentage = 0;
        if (percentage > 100) percentage = 100;

        if (progressBar) progressBar.style.width = percentage.toFixed(2) + '%';
        if (progressText) progressText.textContent = percentage.toFixed(2) + '%';

        if (timeLeft <= 0) {
            if (countdownTimer) countdownTimer.style.display = 'none';
            if (progressBar && progressBar.parentElement) progressBar.parentElement.style.display = 'none';
            if (targetDateTag) targetDateTag.style.display = 'none';
            if (launchBanner) launchBanner.style.display = 'block';
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = String(days).padStart(3, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        
        if (secondsEl) {
            const newSecText = String(seconds).padStart(2, '0');
            
            if (secondsEl.textContent !== newSecText && isAudioPlaying) {
                if (tickAudio && seconds % 2 === 0) { 
                    tickAudio.currentTime = 0;
                    tickAudio.play().catch(e => {});
                }
            }
            secondsEl.textContent = newSecText;
        }
    }

    updateCountdownAndProgress();
    setInterval(updateCountdownAndProgress, 1000);

    /* ==========================================
       2. SISTEMA DE FONDOS DINÁMICOS AUTOMÁTICOS
       ========================================== */
    const backgroundImages = [
        'assets/images/1.png', 'assets/images/2.png', 'assets/images/3.png',
        'assets/images/4.png', 'assets/images/5.png', 'assets/images/6.png',
        'assets/images/7.png', 'assets/images/8.png', 'assets/images/9.png',
        'assets/images/10.png', 'assets/images/11.png', 'assets/images/12.png',
        'assets/images/13.png'
    ];
    
    const backgroundChangeInterval = 15000;
    const bgContainer = document.getElementById('bgContainer');
    let currentSlideIndex = 0;
    let bgSlides = [];

    function initDynamicBackgrounds() {
        if (!bgContainer) return;

        bgContainer.innerHTML = '';

        backgroundImages.forEach((imgSrc, index) => {
            const slide = document.createElement('div');
            slide.className = `bg-slide ${index === 0 ? 'active' : ''}`;
            slide.style.backgroundImage = `url('${imgSrc}')`;
            bgContainer.appendChild(slide);
        });

        bgSlides = document.querySelectorAll('.bg-slide');
    }

    function changeBackground() {
        if (bgSlides.length === 0) return;

        bgSlides[currentSlideIndex].classList.remove('active');
        currentSlideIndex = (currentSlideIndex + 1) % bgSlides.length;
        bgSlides[currentSlideIndex].classList.add('active');
    }

    initDynamicBackgrounds();
    if (backgroundImages.length > 1) {
        setInterval(changeBackground, backgroundChangeInterval);
    }

   /* ==========================================
       3. GESTIÓN DE AUDIO Y EFECTOS SONOROS
       ========================================== */
    const soundToggleBtn = document.getElementById('soundToggle');
    const volumeSlider = document.getElementById('volumeSlider');
    const bgAudio = document.getElementById('bgAudio');
    const clickAudio = document.getElementById('clickAudio');

    // Configurar ajustes iniciales de la música de fondo
    if (bgAudio) {
        bgAudio.loop = true;      // Asegurar reproducción en bucle
        bgAudio.volume = volumeSlider ? volumeSlider.value : 0.35; // Coge el valor inicial del slider
    }

    // Control del botón de encendido / apagado
    if (soundToggleBtn && bgAudio) {
        const soundIcon = soundToggleBtn.querySelector('.sound-icon');
        const soundLabel = soundToggleBtn.querySelector('.sound-label');

        soundToggleBtn.addEventListener('click', () => {
            if (isAudioPlaying) {
                bgAudio.pause();
                if (soundIcon) soundIcon.textContent = '🔇';
                if (soundLabel) soundLabel.textContent = 'SOUND OFF';
                isAudioPlaying = false;
            } else {
                bgAudio.play().then(() => {
                    if (soundIcon) soundIcon.textContent = '🔊';
                    if (soundLabel) soundLabel.textContent = 'SOUND ON';
                    isAudioPlaying = true;
                }).catch(error => {
                    console.log("Reproducción bloqueada por políticas del navegador:", error);
                });
            }
        });
    }

    // Control dinámico de la barra de volumen
    if (volumeSlider && bgAudio) {
        volumeSlider.addEventListener('input', (e) => {
            bgAudio.volume = e.target.value;
        });
    }

    const interactiveButtons = document.querySelectorAll('.action-btn, .nav-link');
    interactiveButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (clickAudio && isAudioPlaying) {
                clickAudio.currentTime = 0;
                clickAudio.play().catch(e => {});
            }
        });
    });

    /* ==========================================
       4. MENÚ RESPONSIVE MÓVIL
       ========================================== */
    const menuToggle = document.getElementById('menuToggle');
    const siteNav = document.getElementById('siteNav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && siteNav) {
        menuToggle.addEventListener('click', () => {
            siteNav.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                siteNav.classList.remove('active');
                menuToggle.classList.remove('open');
            });
        });
    }

    /* ==========================================
       5. EFECTO HEADER SCROLL
       ========================================== */
    const siteHeader = document.querySelector('.site-header');
    if (siteHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                siteHeader.style.background = 'rgba(7, 7, 12, 0.94)';
                siteHeader.style.padding = '1rem 5%';
                siteHeader.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
            } else {
                siteHeader.style.background = 'linear-gradient(to bottom, rgba(7,7,12,0.85), transparent)';
                siteHeader.style.padding = '1.5rem 5%';
                siteHeader.style.boxShadow = 'none';
            }
        });
    }

    /* ==========================================
       6. ACTUALIZACIÓN AUTOMÁTICA DEL MENÚ AL HACER SCROLL
       ========================================== */
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavOnScroll() {
        const scrollPosition = window.scrollY + 200; // Margen de activación ajustado

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavOnScroll);
    updateActiveNavOnScroll(); // Ejecutar al cargar la página para establecer el estado inicial

});
