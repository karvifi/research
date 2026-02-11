// ============================================
// COOKIE CONSENT MANAGEMENT SYSTEM
// GDPR-Compliant Cookie Banner for Research Platform
// ============================================

const CookieConsent = {
    // Cookie categories
    categories: {
        essential: {
            name: 'Essential',
            description: 'Required for platform functionality',
            required: true,
            cookies: ['surveySession', 'responseId', 'userPreferences']
        },
        analytics: {
            name: 'Analytics',
            description: 'Help us improve the research platform',
            required: false,
            cookies: ['supabase_analytics']
        }
    },

    // Get consent status from localStorage
    getConsent() {
        const consent = localStorage.getItem('cookieConsent');
        return consent ? JSON.parse(consent) : null;
    },

    // Save consent preferences
    saveConsent(preferences) {
        const consentData = {
            timestamp: new Date().toISOString(),
            preferences: preferences
        };
        localStorage.setItem('cookieConsent', JSON.stringify(consentData));
        this.applyConsent(preferences);
    },

    // Apply consent settings
    applyConsent(preferences) {
        // Essential cookies are always allowed
        // Analytics cookies only if user consented
        if (!preferences.analytics) {
            // Disable analytics tracking if not consented
            this.disableAnalytics();
        }
    },

    // Disable analytics cookies
    disableAnalytics() {
        // Remove analytics cookies if they exist
        const analyticsCookies = this.categories.analytics.cookies;
        analyticsCookies.forEach(cookie => {
            localStorage.removeItem(cookie);
        });
    },

    // Show the cookie banner
    showBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            safeLog('log', '🍪 Adding visible class to banner');
            banner.classList.add('visible');
            // Force a reflow to ensure the transition works
            banner.offsetHeight;
        } else {
            safeLog('error', '🍪 Banner element not found!');
        }
    },

    // Hide the cookie banner
    hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            safeLog('log', '🍪 Hiding banner');
            banner.classList.remove('visible');
        }
    },

    // Clear consent (for testing)
    clearConsent() {
        localStorage.removeItem('cookieConsent');
        safeLog('log', '🍪 Consent cleared - reload page to see banner');
        this.showBanner();
    },

    // Accept all cookies
    acceptAll() {
        this.saveConsent({
            essential: true,
            analytics: true
        });
        this.hideBanner();
    },

    // Reject optional cookies
    rejectOptional() {
        this.saveConsent({
            essential: true,
            analytics: false
        });
        this.hideBanner();
    },

    // Show customize panel
    showCustomize() {
        const customizePanel = document.getElementById('cookie-customize-panel');
        if (customizePanel) {
            customizePanel.style.display = 'block';
        }
    },

    // Hide customize panel
    hideCustomize() {
        const customizePanel = document.getElementById('cookie-customize-panel');
        if (customizePanel) {
            customizePanel.style.display = 'none';
        }
    },

    // Save custom preferences
    saveCustom() {
        const analyticsCheckbox = document.getElementById('cookie-analytics');
        this.saveConsent({
            essential: true,
            analytics: analyticsCheckbox ? analyticsCheckbox.checked : false
        });
        this.hideCustomize();
        this.hideBanner();
    },

    // Initialize on page load
    init() {
        safeLog('log', '🍪 Cookie Consent initializing...');
        
        const consent = this.getConsent();
        safeLog('log', '🍪 Existing consent:', consent);

        // If consent exists, hide the banner (it starts visible in HTML)
        if (consent) {
            safeLog('log', '🍪 Consent already exists - hiding banner');
            this.hideBanner();
            this.applyConsent(consent.preferences);
        } else {
            safeLog('log', '🍪 No consent found - banner already visible in HTML');
            // Banner is already visible via class in HTML, no need to show it
        }

        // Attach event listeners
        this.attachListeners();
    },

    // Attach event listeners to buttons
    attachListeners() {
        const acceptBtn = document.getElementById('cookie-accept-all');
        const rejectBtn = document.getElementById('cookie-reject-all');
        const customizeBtn = document.getElementById('cookie-customize');
        const saveCustomBtn = document.getElementById('cookie-save-custom');
        const closeCustomBtn = document.getElementById('cookie-close-custom');

        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => this.acceptAll());
        }
        if (rejectBtn) {
            rejectBtn.addEventListener('click', () => this.rejectOptional());
        }
        if (customizeBtn) {
            customizeBtn.addEventListener('click', () => this.showCustomize());
        }
        if (saveCustomBtn) {
            saveCustomBtn.addEventListener('click', () => this.saveCustom());
        }
        if (closeCustomBtn) {
            closeCustomBtn.addEventListener('click', () => this.hideCustomize());
        }
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CookieConsent.init());
} else {
    CookieConsent.init();
}

// Expose globally for testing
window.CookieConsent = CookieConsent;

// Add console helper for testing
if (typeof safeLog !== 'undefined') {
    safeLog('log', '🍪 Cookie Consent loaded. Test with: CookieConsent.clearConsent()');
}
