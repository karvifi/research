
// ═══════════════════════════════════════════════════════════════
// RESEARCHER INFORMATION MODAL FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Handles mouse movement for 3D tilt and spotlight effect
 */
function handleModalMouseMove(e) {
    const card = document.querySelector('.researcher-modal-content');
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation (max 5 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    // Update variables for CSS
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    card.style.setProperty('--rotate-x', `${rotateX}deg`);
    card.style.setProperty('--rotate-y', `${rotateY}deg`);
}

/**
 * Resets the 3D tilt
 */
function resetModalTilt() {
    const card = document.querySelector('.researcher-modal-content');
    if (!card) return;
    card.style.setProperty('--rotate-x', '0deg');
    card.style.setProperty('--rotate-y', '0deg');
}

/**
 * Opens the researcher information modal with blur effect
 */
function openResearcherModal() {
    const modal = document.getElementById('researcher-modal');
    if (!modal) return;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    // document.body.style.overflow = 'hidden'; // REMOVED as per user request for scroll functionality

    const card = modal.querySelector('.researcher-modal-content');
    if (card) {
        card.addEventListener('mousemove', handleModalMouseMove);
        card.addEventListener('mouseleave', resetModalTilt);
    }

    const closeBtn = modal.querySelector('.researcher-modal-close');
    if (closeBtn) closeBtn.focus();

    document.addEventListener('keydown', handleModalEscape);
}

/**
 * Closes the researcher information modal
 */
function closeResearcherModal() {
    const modal = document.getElementById('researcher-modal');
    if (!modal) return;

    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    // document.body.style.overflow = 'auto'; // REMOVED as per user request

    const card = modal.querySelector('.researcher-modal-content');
    if (card) {
        card.removeEventListener('mousemove', handleModalMouseMove);
        card.removeEventListener('mouseleave', resetModalTilt);
    }

    document.removeEventListener('keydown', handleModalEscape);
}

/**
 * Handles ESC key press to close modal
 */
function handleModalEscape(e) {
    if (e.key === 'Escape') {
        closeResearcherModal();
    }
}
