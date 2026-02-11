/**
 * ============================================
 * LINKEDIN OWNERSHIP VERIFICATION SYSTEM
 * ============================================
 * 
 * This module provides email-based verification to ensure
 * participants actually own the LinkedIn profiles they submit.
 * 
 * Flow:
 * 1. User pastes LinkedIn URL
 * 2. System scrapes email from LinkedIn profile (via ProxyCurl)
 * 3. System sends 6-digit verification code to that email
 * 4. User enters code to prove ownership
 * 5. Verified → proceed to survey
 */

const VerificationSystem = {
    /**
     * Configuration
     */
    config: {
        proxycurlApiKey: '', // Set this in config.js
        codeLength: 6,
        expirationMinutes: 10
    },

    /**
     * Generate a random 6-digit verification code
     * @returns {string} Six-digit code
     */
    generateCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    },

    /**
     * Scrape LinkedIn profile data using ProxyCurl API
     * @param {string} linkedInUrl - Full LinkedIn profile URL
     * @returns {Promise<Object>} Profile data with email, name, headline
     */
    async scrapeLinkedInProfile(linkedInUrl) {
        try {
            // Validate URL format
            if (!linkedInUrl.includes('linkedin.com/in/')) {
                throw new Error('Invalid LinkedIn URL format');
            }

            console.log('🔍 Scraping LinkedIn profile:', linkedInUrl);

            const response = await fetch(
                `https://nubela.co/proxycurl/api/v2/linkedin?url=${encodeURIComponent(linkedInUrl)}&use_cache=if-present`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.config.proxycurlApiKey}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`ProxyCurl API error: ${response.status}`);
            }

            const data = await response.json();

            // Extract email (try personal_emails first, fallback to other fields)
            const email = data.personal_emails?.[0] || data.email || null;

            if (!email) {
                throw new Error('No public email found on LinkedIn profile. Please make your email visible.');
            }

            return {
                email: email,
                name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                headline: data.headline || 'Professional',
                profileUrl: linkedInUrl,
                company: data.company || '',
                location: data.location || ''
            };

        } catch (error) {
            console.error('❌ LinkedIn scraping failed:', error);
            throw error;
        }
    },

    /**
     * Send verification code via EmailJS
     * @param {string} email - Recipient email
     * @param {string} code - Six-digit verification code
     * @param {string} name - Recipient name
     * @returns {Promise<boolean>} Success status
     */
    async sendVerificationEmail(email, code, name) {
        try {
            const params = {
                to_email: email,
                to_name: name,
                verification_code: code,
                expires_in: `${this.config.expirationMinutes} minutes`
            };

            const response = await emailjs.send(
                EmailService.serviceId,
                'template_verification', // Create this template in EmailJS
                params
            );

            console.log('✅ Verification email sent to:', email);
            return true;

        } catch (error) {
            console.error('❌ Failed to send verification email:', error);
            throw error;
        }
    },

    /**
     * Create verification session in database
     * @param {Object} profileData - LinkedIn profile data
     * @returns {Promise<Object>} Created response record with verification code
     */
    async createVerificationSession(profileData) {
        try {
            const code = this.generateCode();
            const now = new Date();
            const expiresAt = new Date(now.getTime() + this.config.expirationMinutes * 60 * 1000);

            const responseId = 'response_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

            console.log('📝 Creating verification session for:', profileData.email);

            const { data, error } = await supabaseClient
                .from('responses')
                .insert({
                    id: responseId,
                    linkedin_url: profileData.profileUrl,
                    user_email: profileData.email,
                    user_name: profileData.name,
                    linkedin_profile: profileData,
                    verification_code: code,
                    verification_sent_at: now.toISOString(),
                    verification_expires_at: expiresAt.toISOString(),
                    is_verified: false,
                    status: 'pending_verification',
                    started_at: now.toISOString()
                })
                .select()
                .single();

            if (error) throw error;

            // Send verification email
            await this.sendVerificationEmail(profileData.email, code, profileData.name);

            console.log('✅ Verification session created:', responseId);

            return {
                success: true,
                responseId: responseId,
                email: profileData.email,
                expiresAt: expiresAt
            };

        } catch (error) {
            console.error('❌ Failed to create verification session:', error);
            throw error;
        }
    },

    /**
     * Verify the code entered by user
     * @param {string} responseId - Response ID from verification session
     * @param {string} enteredCode - Code entered by user
     * @returns {Promise<Object>} Verification result
     */
    async verifyCode(responseId, enteredCode) {
        try {
            console.log('🔐 Verifying code for response:', responseId);

            // Fetch response record
            const { data: response, error: fetchError } = await supabaseClient
                .from('responses')
                .select('*')
                .eq('id', responseId)
                .single();

            if (fetchError) {
                return { success: false, error: 'Session not found' };
            }

            // Check if already verified
            if (response.is_verified) {
                return { success: true, message: 'Already verified' };
            }

            // Check if code expired
            const now = new Date();
            const expiresAt = new Date(response.verification_expires_at);

            if (now > expiresAt) {
                return { success: false, error: 'Verification code expired. Please request a new one.' };
            }

            // Check if code matches
            if (enteredCode !== response.verification_code) {
                return { success: false, error: 'Invalid verification code. Please try again.' };
            }

            // Mark as verified
            const { error: updateError } = await supabaseClient
                .from('responses')
                .update({
                    is_verified: true,
                    status: 'in_progress'
                })
                .eq('id', responseId);

            if (updateError) throw updateError;

            console.log('✅ Verification successful for:', responseId);

            return {
                success: true,
                profileData: response.linkedin_profile
            };

        } catch (error) {
            console.error('❌ Verification failed:', error);
            return { success: false, error: 'Verification failed. Please try again.' };
        }
    },

    /**
     * Resend verification code
     * @param {string} responseId - Response ID
     * @returns {Promise<Object>} Result
     */
    async resendCode(responseId) {
        try {
            // Get existing session
            const { data: response, error } = await supabaseClient
                .from('responses')
                .select('*')
                .eq('id', responseId)
                .single();

            if (error || !response) {
                return { success: false, error: 'Session not found' };
            }

            // Generate new code
            const newCode = this.generateCode();
            const now = new Date();
            const expiresAt = new Date(now.getTime() + this.config.expirationMinutes * 60 * 1000);

            // Update database
            await supabaseClient
                .from('responses')
                .update({
                    verification_code: newCode,
                    verification_sent_at: now.toISOString(),
                    verification_expires_at: expiresAt.toISOString()
                })
                .eq('id', responseId);

            // Send new email
            await this.sendVerificationEmail(
                response.user_email,
                newCode,
                response.user_name
            );

            console.log('✅ Verification code resent to:', response.user_email);

            return { success: true };

        } catch (error) {
            console.error('❌ Failed to resend code:', error);
            return { success: false, error: 'Failed to resend code' };
        }
    }
};

// Initialize from config when available
if (typeof APP_CONFIG !== 'undefined' && APP_CONFIG.proxycurlApiKey) {
    VerificationSystem.config.proxycurlApiKey = APP_CONFIG.proxycurlApiKey;
}

console.log('✅ Verification System loaded');
