// ============================================
// UTILITY FUNCTIONS - Security & Helpers
// ============================================

/**
 * HTML Escape - Prevents XSS attacks
 * @param {string} text - User input to sanitize
 * @returns {string} - Escaped HTML
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Sanitize user input for display
 * @param {string} input - Raw user input
 * @returns {string} - Sanitized text
 */
function sanitizeInput(input) {
    if (!input) return '';
    return escapeHtml(String(input).trim());
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Is valid
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Mask sensitive data for logging (production mode)
 * @param {string} data - Sensitive data
 * @param {number} visibleChars - Number of chars to show
 * @returns {string} - Masked data
 */
function maskSensitiveData(data, visibleChars = 4) {
    if (!data || data.length <= visibleChars) return '***';
    return data.substring(0, visibleChars) + '***';
}

/**
 * Safe console logging - only in development
 * @param {string} level - log, warn, error
 * @param {string} message - Message to log
 * @param {any} data - Optional data
 */
function safeLog(level, message, data = null) {
    // Only log in development (when on localhost or file://)
    const isDevelopment = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1' ||
                         window.location.protocol === 'file:';
    
    if (!isDevelopment) return; // Silent in production
    
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}]`;
    
    if (data) {
        console[level](prefix, message, data);
    } else {
        console[level](prefix, message);
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.escapeHtml = escapeHtml;
    window.sanitizeInput = sanitizeInput;
    window.isValidEmail = isValidEmail;
    window.maskSensitiveData = maskSensitiveData;
    window.safeLog = safeLog;
}
