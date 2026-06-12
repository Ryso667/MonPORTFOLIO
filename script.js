document.addEventListener('DOMContentLoaded', () => {

  /* ========== FADE-IN STYLE ========== */
  const style = document.createElement('style');
  style.textContent = `
    .fade-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  /* ========== SCROLL REVEAL (sections) ========== */
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    sectionObserver.observe(section);
  });

  /* ========== NAV SCROLL ANIMATION ========== */
  let lastScroll = 0;
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      nav.classList.remove('scroll-up');
      return;
    }
    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
      nav.classList.remove('scroll-up');
      nav.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
      nav.classList.remove('scroll-down');
      nav.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
  });

  /* ========== ACTIVE NAV LINK ========== */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  /* ========== LOADING SCREEN ========== */
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 600);
    });
    setTimeout(() => loader.classList.add('hidden'), 2000);
  }

  /* ========== THEME TOGGLE ========== */
  const themeToggle = document.getElementById('theme-toggle');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    sessionStorage.setItem('theme', theme);
    if (themeToggle) {
      themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
  }

  const sessionTheme = sessionStorage.getItem('theme');
  if (sessionTheme) {
    setTheme(sessionTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ========== CUSTOM CURSOR ========== */
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  if (cursorDot && cursorOutline && !window.matchMedia('(hover: none)').matches) {
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.opacity = '1';
      cursorOutline.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorOutline.style.opacity = '0';
    });

    document.querySelectorAll('a, button, .badge, .stat-card, .btn-primary, .btn-outline')
      .forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
      });

    function animateCursor() {
      dotX += (mouseX - dotX) * 0.15;
      dotY += (mouseY - dotY) * 0.15;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      cursorOutline.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  }

  /* ========== TYPING EFFECT ========== */
  const typedEl = document.getElementById('typed-text');
  if (typedEl) {
    const words = [
      'Développeur Full-Stack',
      'Futur Consultant SI',
      'Chef de Projet IT en devenir',
      'Étudiant en Génie Logiciel'
    ];
    let wordIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
      const current = words[wordIndex];
      if (isDeleting) {
        typedEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }
      if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        setTimeout(type, 2000);
        return;
      }
      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, isDeleting ? 40 : 80);
    }
    setTimeout(type, 1000);
  }

  /* ========== THREE.JS PARTICLES ========== */
  const heroCanvas = document.getElementById('hero-canvas');
  if (heroCanvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, heroCanvas.clientWidth / heroCanvas.clientHeight, 0.1, 1000);
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({
      canvas: heroCanvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(heroCanvas.clientWidth, heroCanvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const count = 130;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      const radius = 14 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const pointsMat = new THREE.PointsMaterial({
      size: 0.18,
      color: '#8890e0',
      transparent: true,
      opacity: 0.35,
    });

    const particles = new THREE.Points(geom, pointsMat);
    scene.add(particles);

    const innerCount = 50;
    const innerPos = new Float32Array(innerCount * 3);
    for (let i = 0; i < innerCount * 3; i += 3) {
      const radius = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      innerPos[i] = radius * Math.sin(phi) * Math.cos(theta);
      innerPos[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      innerPos[i + 2] = radius * Math.cos(phi);
    }
    const innerGeom = new THREE.BufferGeometry();
    innerGeom.setAttribute('position', new THREE.BufferAttribute(innerPos, 3));
    const innerMat = new THREE.PointsMaterial({
      size: 0.12,
      color: '#9999ff',
      transparent: true,
      opacity: 0.25,
    });
    const innerParticles = new THREE.Points(innerGeom, innerMat);
    scene.add(innerParticles);

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    function animateParticles() {
      requestAnimationFrame(animateParticles);
      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0003;
      innerParticles.rotation.y -= 0.001;
      innerParticles.rotation.x += 0.0004;
      particles.rotation.x += (mouseY * 0.005 - particles.rotation.x) * 0.008;
      particles.rotation.y += (mouseX * 0.005 - particles.rotation.y) * 0.008;
      innerParticles.rotation.x += (mouseY * 0.003 - innerParticles.rotation.x) * 0.008;
      innerParticles.rotation.y += (mouseX * 0.003 - innerParticles.rotation.y) * 0.008;
      renderer.render(scene, camera);
    }
    animateParticles();

    function resizeParticles() {
      const w = heroCanvas.clientWidth;
      const h = heroCanvas.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resizeParticles);
  }

  /* ========== STATS COUNTER ========== */
  const statNumbers = document.querySelectorAll('.stat-card[data-target] .stat-number');
  if (statNumbers.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.closest('.stat-card').dataset.target);
          if (isNaN(target)) return;
          let current = 0;
          const increment = target / 40;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              el.textContent = target;
              clearInterval(interval);
            } else {
              el.textContent = Math.floor(current);
            }
          }, 30);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNumbers.forEach(el => counterObserver.observe(el));
  }

  /* ========== SCROLL REVEAL (.reveal) ========== */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ========== BACK TO TOP ========== */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    const progressRing = backToTop.querySelector('.progress-ring');
    const circumference = 138.23;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / scrollHeight;
      const offset = circumference * (1 - progress);

      if (progressRing) {
        progressRing.style.strokeDashoffset = offset;
      }

      if (scrollTop > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ========== NAV HIDE/SHOW ON SCROLL ========== */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 100 && currentScroll > lastScroll) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      lastScroll = currentScroll;
    });
  }

  /* ========== NAV PROGRESS BAR ========== */
  const navProgress = document.querySelector('.nav-progress');
  if (navProgress) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      navProgress.style.width = progress + '%';
    });
  }

  /* ========== MOBILE MENU ========== */
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinksList = document.querySelector('.nav-links');
  if (menuBtn && navLinksList) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('active');
      navLinksList.classList.toggle('open');
    });
    navLinksList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navLinksList.classList.remove('open');
      });
    });
  }

});

/* ========== MODAL CERTIFICATS ========== */
const modal = document.getElementById('certificate-modal');
if (modal) {
  const modalImg = document.getElementById('certificate-image');
  const closeModal = document.querySelector('.close-modal');
  const verifyLinks = document.querySelectorAll('.verify-link');

  verifyLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const imgSrc = link.getAttribute('href');
      modalImg.src = imgSrc;
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  });

  closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
}
