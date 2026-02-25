// Animation au défilement
document.addEventListener('DOMContentLoaded', () => {
    // Animation des sections au scroll
    const observer = new IntersectionObserver((entries) => {
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
        observer.observe(section);
    });

    // Animation de la barre de navigation
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

    // Gestion des liens actifs dans la navigation
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
});

// Ajout de la classe fade-in pour l'animation
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});

// Gestion du modal pour les certificats
const modal = document.getElementById('certificate-modal');
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

// Fermer le modal avec la touche Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}); 