/**
 * ============================================
 * LINKEDIN VERIFICATION FLOW HANDLERS
 * ============================================
 * UI logic for the 3-step verification process
 */

// Store verification session data
let verificationSessionData = {
    responseId: null,
    email: null,
    profileData: null,
    timerInterval: null
};

/**
 * Step 1: Start verification process
 */
async function startVerification() {
    const linkedInUrl = document.getElementById('linkedin-url-input').value.trim();
    const errorDiv = document.getElementById('verification-error-step1');

    // Validate URL
    if (!linkedInUrl) {
        showVerificationError(errorDiv, 'Please enter your LinkedIn profile URL');
        return;
    }

    if (!linkedInUrl.includes('linkedin.com/in/')) {
        showVerificationError(errorDiv, 'Invalid LinkedIn URL format. Please use: https://linkedin.com/in/yourprofile');
        return;
    }

    // Show loading
    showLoadingOverlay('Analyzing LinkedIn profile...');

    try {
        // Step 1: Scrape LinkedIn profile for email
        const profileData = await VerificationSystem.scrapeLinkedInProfile(linkedInUrl);

        // Step 2: Create verification session and send code
        const session = await VerificationSystem.createVerificationSession(profileData);

        // Store session data
        verificationSessionData.responseId = session.responseId;
        verificationSessionData.email = session.email;
        verificationSessionData.profileData = profileData;

        // Update global survey state
        if (typeof UltimateSurveyEngine !== 'undefined') {
            UltimateSurveyEngine.state.responseId = session.responseId;
            UltimateSurveyEngine.state.linkedInProfile = profileData;
        }

        // Hide Step 1, Show Step 2
        document.getElementById('step-paste-url').style.display = 'none';
        document.getElementById('step-verify-code').style.display = 'block';
        document.getElementById('sent-to-email').textContent = session.email;

        // Start countdown timer
        startCodeTimer(10 * 60); // 10 minutes in seconds

        hideLoadingOverlay();

    } catch (error) {
        hideLoadingOverlay();
        console.error('❌ Verification failed:', error);

        let errorMessage = 'Verification failed. ';
        if (error.message.includes('email')) {
            errorMessage += 'Make sure your email is visible on your LinkedIn profile.';
        } else if (error.message.includes('API')) {
            errorMessage += 'Service temporarily unavailable. Please try again.';
        } else {
            errorMessage += error.message || 'Please try again.';
        }

        showVerificationError(errorDiv, errorMessage);
    }
}

/**
 * Step 2: Submit verification code
 */
async function submitVerificationCode() {
    const code = document.getElementById('verification-code-input').value.trim();
    const errorDiv = document.getElementById('verification-error-step2');

    // Validate code
    if (!code || code.length !== 6) {
        showVerificationError(errorDiv, 'Please enter the 6-digit code');
        return;
    }

    if (!/^\d{6}$/.test(code)) {
        showVerificationError(errorDiv, 'Code must be 6 digits');
        return;
    }

    // Show loading
    showLoadingOverlay('Verifying code...');

    try {
        const result = await VerificationSystem.verifyCode(
            verificationSessionData.responseId,
            code
        );

        hideLoadingOverlay();

        if (result.success) {
            // Stop timer
            if (verificationSessionData.timerInterval) {
                clearInterval(verificationSessionData.timerInterval);
            }

            // Show success screen
            document.getElementById('step-verify-code').style.display = 'none';
            document.getElementById('step-verified').style.display = 'block';

            // Populate user info
            document.getElementById('verified-user-name').textContent =
                verificationSessionData.profileData.name;
            document.getElementById('verified-user-headline').textContent =
                verificationSessionData.profileData.headline;

            // Proceed to next page after 3 seconds
            setTimeout(() => {
                if (typeof surveyEngine !== 'undefined') {
                    surveyEngine.showPage('profile');
                } else {
                    console.warn('surveyEngine not found, manual navigation required');
                }
            }, 3000);

        } else {
            showVerificationError(errorDiv, result.error || 'Invalid code. Please try again.');
        }

    } catch (error) {
        hideLoadingOverlay();
        console.error('❌ Code verification failed:', error);
        showVerificationError(errorDiv, 'Verification failed. Please try again.');
    }
}

/**
 * Resend verification code
 */
async function resendVerificationCode() {
    const errorDiv = document.getElementById('verification-error-step2');

    showLoadingOverlay('Sending new code...');

    try {
        const result = await VerificationSystem.resendCode(verificationSessionData.responseId);

        hideLoadingOverlay();

        if (result.success) {
            // Restart timer
            startCodeTimer(10 * 60);

            // Show success message temporarily
            const successMsg = document.createElement('div');
            successMsg.style.cssText = 'padding: 1rem; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3); border-radius: 8px; color: #10b981; margin-top: 1rem;';
            successMsg.textContent = '✅ New code sent to ' + verificationSessionData.email;
            document.getElementById('step-verify-code').appendChild(successMsg);

            setTimeout(() => successMsg.remove(), 5000);
        } else {
            showVerificationError(errorDiv, result.error || 'Failed to resend code');
        }

    } catch (error) {
        hideLoadingOverlay();
        console.error('❌ Resend failed:', error);
        showVerificationError(errorDiv, 'Resend failed. Please try again.');
    }
}

/**
 * Start countdown timer for code expiration
 */
function startCodeTimer(seconds) {
    const timerElement = document.getElementById('code-timer');
    let remainingSeconds = seconds;

    // Clear existing timer if any
    if (verificationSessionData.timerInterval) {
        clearInterval(verificationSessionData.timerInterval);
    }

    verificationSessionData.timerInterval = setInterval(() => {
        const minutes = Math.floor(remainingSeconds / 60);
        const secs = remainingSeconds % 60;
        timerElement.textContent = `${minutes}:${secs.toString().padStart(2, '0')}`;

        remainingSeconds--;

        if (remainingSeconds < 0) {
            clearInterval(verificationSessionData.timerInterval);
            timerElement.textContent = 'Expired';
            timerElement.style.color = 'var(--color-error, #ef4444)';
        }
    }, 1000);
}

/**
 * Show verification error message
 */
function showVerificationError(errorDiv, message) {
    errorDiv.textContent = '❌ ' + message;
    errorDiv.style.display = 'block';

    // Auto-hide after 10 seconds
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 10000);
}

/**
 * Show loading overlay
 */
function showLoadingOverlay(message = 'Loading...') {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.querySelector('p').textContent = message;
        overlay.style.display = 'flex';
    }
}

/**
 * Hide loading overlay
 */
function hideLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

console.log('✅ Verification flow handlers loaded');
