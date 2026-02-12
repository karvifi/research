// ============================================
// FREE EMAIL SERVICE - EmailJS Integration
// 100% Free - No Backend Required
// ============================================

const EmailService = {
    // EmailJS Configuration (FREE - no credit card needed)
    // Sign up at https://www.emailjs.com/
    // Free tier: 200 emails/month

    serviceId: 'service_3hy36hr', // ✅ OFFICIAL PRODUCTION SERVICE
    templateId: 'template_booking', // ✅ MATCHES TEMPLATES.MD
    publicKey: 'QWWtfOHosP4lzsY3d', // ✅ OFFICIAL PUBLIC KEY

    /**
     * Initialize EmailJS
     */
    init() {
        if (typeof emailjs === 'undefined') {
            if (typeof safeLog !== 'undefined') {
                safeLog('error', 'EmailJS library not loaded');
            }
            return false;
        }

        if (this.publicKey === 'YOUR_EMAILJS_PUBLIC_KEY') {
            if (typeof safeLog !== 'undefined') {
                safeLog('warn', 'EmailJS not configured');
            }
            return false;
        }

        emailjs.init(this.publicKey);
        if (typeof safeLog !== 'undefined') {
            safeLog('log', 'EmailJS initialized');
        }
        return true;
    },

    /**
     * Send booking confirmation to participant
     */
    async sendBookingConfirmation(bookingData) {
        try {
            const params = {
                to_email: bookingData.email,
                to_name: bookingData.name,
                booking_date: bookingData.date,
                booking_time: bookingData.time,
                meeting_url: bookingData.meetingUrl,
                notes: bookingData.notes || 'None',
                study_name: 'Calibrated Trust Research Study',
                researcher_email: 'research.mdh.edu@gmail.com'
            };

            if (typeof safeLog !== 'undefined') {
                safeLog('log', 'Sending booking confirmation');
            }

            const response = await emailjs.send(
                this.serviceId,
                this.templateId,
                params
            );

            if (typeof safeLog !== 'undefined') {
                safeLog('log', 'Booking confirmation sent');
            }
            return { success: true, response };

        } catch (error) {
            if (typeof safeLog !== 'undefined') {
                safeLog('error', 'Email send failed', error);
            }
            return { success: false, error };
        }
    },

    /**
     * Send researcher notification
     */
    async sendResearcherNotification(bookingData) {
        try {
            const params = {
                participant_name: bookingData.name,
                participant_email: bookingData.email,
                booking_date: bookingData.displayDate || bookingData.date,
                booking_time: bookingData.displayTime || bookingData.time,
                meeting_url: bookingData.meetingUrl,
                notes: bookingData.notes || 'None',
                study_name: 'Calibrated Trust Research Study',
                researcher_email: 'research.mdh.edu@gmail.com'
            };

            if (typeof safeLog !== 'undefined') {
                safeLog('log', 'Sending researcher notification to research.mdh.edu@gmail.com');
            }

            // Send to researcher email
            const response = await emailjs.send(
                this.serviceId,
                'template_researcher_aler',
                params
            );

            if (typeof safeLog !== 'undefined') {
                safeLog('log', '✅ Researcher notification sent successfully');
            }
            return { success: true, response };

        } catch (error) {
            if (typeof safeLog !== 'undefined') {
                safeLog('error', '❌ Researcher notification failed:', error);
            }
            return { success: false, error };
        }
    },

    /**
     * Fallback: mailto link if EmailJS fails
     */
    openMailtoFallback(bookingData) {
        const subject = encodeURIComponent('Interview Booking - Calibrated Trust Study');
        const body = encodeURIComponent(`
New Interview Booking:

Name: ${bookingData.name}
Email: ${bookingData.email}
Date: ${bookingData.date}
Time: ${bookingData.time}
Timezone: ${bookingData.timezone}
Notes: ${bookingData.notes || 'None'}

This booking has been saved to the database.
        `);

        window.open(`mailto:research.mdh.edu@gmail.com?subject=${subject}&body=${body}`);
    }
};

// Auto-initialize when page loads
if (typeof window !== 'undefined') {
    window.EmailService = EmailService;

    // Initialize after EmailJS library loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => EmailService.init(), 1000);
        });
    } else {
        setTimeout(() => EmailService.init(), 1000);
    }
}
