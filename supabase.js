// ============================================
// UNIFIED SUPABASE DATABASE OPERATIONS
// Single table: research_participants
// ============================================

const { createClient } = supabase;
const supabaseClient = createClient(
    SUPABASE_CONFIG.url,
    SUPABASE_CONFIG.anonKey
);

const Database = {
    /**
     * Create initial participant record (on landing/eligibility)
     */
    async createParticipant(data) {
        try {
            const record = {
                id: data.id || generateResponseId(),
                session_id: data.sessionId || data.id,
                email: 'pending@temp.com', // Temporary email, will be updated at contact stage
                landing_timestamp: new Date().toISOString(),
                eligibility_timestamp: data.eligibilityCategory ? new Date().toISOString() : null,
                eligibility_category: data.eligibilityCategory || null,
                survey_status: 'not_started'
            };

            const { data: result, error } = await supabaseClient
                .from('research_participants')
                .insert([record])
                .select();

            if (error) throw error;
            if (typeof safeLog !== 'undefined') {
                safeLog('log', 'Participant created');
            }
            return { success: true, data: result[0] };
        } catch (error) {
            if (typeof safeLog !== 'undefined') {
                safeLog('error', 'Error creating participant', error);
            }
            return { success: false, error };
        }
    },

    /**
     * Update participant with commitment (context statement)
     */
    async updateCommitment(id, contextStatement) {
        try {
            const { data, error } = await supabaseClient
                .from('research_participants')
                .update({
                    context_statement: contextStatement,
                    commitment_timestamp: new Date().toISOString()
                })
                .eq('id', id)
                .select();

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            safeLog('error', '❌ Error updating commitment:', error);
            return { success: false, error };
        }
    },

    /**
     * Update participant with contact information
     */
    async updateContact(id, contactData) {
        try {
            const { data, error } = await supabaseClient
                .from('research_participants')
                .update({
                    email: contactData.email,
                    participant_name: contactData.name || null,
                    participant_role: contactData.role,
                    participant_industry: contactData.industry || null,
                    participant_profile_url: contactData.profileUrl || null,
                    contact_timestamp: new Date().toISOString()
                })
                .eq('id', id)
                .select();

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            safeLog('error', '❌ Error updating contact:', error);
            return { success: false, error };
        }
    },

    /**
     * Create/update booking
     */
    async createBooking(id, bookingData) {
        try {
            const { data, error} = await supabaseClient
                .from('research_participants')
                .update({
                    booking_scheduled: true,
                    booking_date: bookingData.date,
                    booking_time: bookingData.time,
                    booking_datetime: bookingData.datetime,
                    booking_timezone: bookingData.timezone,
                    booking_duration_minutes: bookingData.duration || 60,
                    booking_meeting_platform: bookingData.platform,
                    booking_meeting_url: bookingData.meetingUrl,
                    booking_notes: bookingData.notes || null,
                    booking_status: 'confirmed',
                    booking_timestamp: new Date().toISOString()
                })
                .eq('id', id)
                .select();

            if (error) throw error;
            safeLog('log', '✅ Booking created:', data);
            return { success: true, data: data && data.length > 0 ? data[0] : data };
        } catch (error) {
            safeLog('error', '❌ Error creating booking:', error);
            return { success: false, error };
        }
    },

    /**
     * Update email notification status
     */
    async updateEmailStatus(id, emailType) {
        try {
            const updates = {};
            if (emailType === 'confirmation') {
                updates.confirmation_email_sent = true;
                updates.confirmation_email_sent_at = new Date().toISOString();
            } else if (emailType === 'researcher') {
                updates.researcher_notification_sent = true;
                updates.researcher_notification_sent_at = new Date().toISOString();
            }

            const { data, error } = await supabaseClient
                .from('research_participants')
                .update(updates)
                .eq('id', id)
                .select();

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            safeLog('error', '❌ Error updating email status:', error);
            return { success: false, error };
        }
    },

    /**
     * Start survey
     */
    async startSurvey(id) {
        try {
            const { data, error } = await supabaseClient
                .from('research_participants')
                .update({
                    survey_status: 'in_progress',
                    survey_start_timestamp: new Date().toISOString()
                })
                .eq('id', id)
                .select();

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            safeLog('error', '❌ Error starting survey:', error);
            return { success: false, error };
        }
    },

    /**
     * Save survey answer
     */
    async saveAnswer(id, questionId, answer) {
        try {
            // Map question ID to column name
            const columnName = questionId.toLowerCase().replace(/-/g, '_');
            
            const updates = {
                [columnName]: answer,
                questions_answered: supabaseClient.raw('questions_answered + 1')
            };

            const { data, error } = await supabaseClient
                .from('research_participants')
                .update(updates)
                .eq('id', id)
                .select();

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            safeLog('error', '❌ Error saving answer:', error);
            return { success: false, error };
        }
    },

    /**
     * Complete survey
     */
    async completeSurvey(id, completionData) {
        try {
            const { data, error } = await supabaseClient
                .from('research_participants')
                .update({
                    survey_status: 'completed',
                    survey_complete_timestamp: new Date().toISOString(),
                    completion_time_minutes: completionData.completionTime,
                    questions_answered: completionData.questionsAnswered,
                    completion_percentage: 100,
                    archetype_name: completionData.archetype?.name,
                    archetype_description: completionData.archetype?.desc,
                    archetype_power: completionData.archetype?.power,
                    trust_overall_score: completionData.trustScore,
                    curator_score: completionData.curatorScore,
                    executor_score: completionData.executorScore,
                    curatorial_shift_ratio: completionData.curatorialShift,
                    org_readiness_score: completionData.orgReadiness
                })
                .eq('id', id)
                .select();

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            safeLog('error', '❌ Error completing survey:', error);
            return { success: false, error };
        }
    },

    /**
     * Get confirmed bookings (for scheduler)
     */
    async getConfirmedBookings() {
        try {
            const { data, error } = await supabaseClient
                .from('research_participants')
                .select('booking_date, booking_time, booking_datetime')
                .eq('booking_status', 'confirmed')
                .eq('booking_scheduled', true);

            if (error) throw error;
            
            // Map to expected format
            const bookings = data.map(b => ({
                scheduled_date: b.booking_date,
                scheduled_time: b.booking_time,
                scheduled_datetime: b.booking_datetime
            }));
            
            return { success: true, data: bookings };
        } catch (error) {
            safeLog('error', '❌ Error fetching bookings:', error);
            return { success: false, error };
        }
    },

    /**
     * Get participant by ID
     */
    async getParticipant(id) {
        try {
            const { data, error } = await supabaseClient
                .from('research_participants')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            safeLog('error', '❌ Error fetching participant:', error);
            return { success: false, error };
        }
    },

    /**
     * Export all completed participants
     */
    async exportCompleted() {
        try {
            const { data, error } = await supabaseClient
                .from('research_participants')
                .select('*')
                .eq('survey_status', 'completed')
                .order('survey_complete_timestamp', { ascending: false });

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            safeLog('error', '❌ Error exporting data:', error);
            return { success: false, error };
        }
    }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
function generateResponseId() {
    const date = new Date();
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `CTR-${dateStr}-${random}`;
}

function calculateCompletionTime(startTime) {
    const now = new Date();
    const start = new Date(startTime);
    const minutes = Math.round((now - start) / 1000 / 60);
    return minutes;
}

// Export
if (typeof window !== 'undefined') {
    window.Database = Database;
    window.generateResponseId = generateResponseId;
    window.calculateCompletionTime = calculateCompletionTime;
}
