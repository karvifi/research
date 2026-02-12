/* Phase 2: Landing Page Enhancement Logic */

document.addEventListener('DOMContentLoaded', () => {
    initScrollRevelations();
});

/**
 * Handles the visibility of the sticky CTA bar based on scroll position
 */
function initStickyCTA() {
    const stickyBar = document.getElementById('sticky-cta');
    const heroSection = document.querySelector('.luxe-hero');

    if (!stickyBar || !heroSection) return;

    window.addEventListener('scroll', () => {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const currentScroll = window.pageYOffset;

        if (currentScroll > heroBottom - 100) {
            stickyBar.classList.add('visible');
            stickyBar.setAttribute('aria-hidden', 'false');
        } else {
            stickyBar.classList.remove('visible');
            stickyBar.setAttribute('aria-hidden', 'true');
        }
    });
}

/**
 * Uses Intersection Observer to reveal elements as they scroll into view
 */
function initScrollRevelations() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, options);

    const revealables = document.querySelectorAll('.revealer');
    revealables.forEach(el => observer.observe(el));
}
