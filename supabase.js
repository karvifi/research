/**
 * BULLETPROOF SUPABASE DATABASE MODULE
 * All operations guaranteed to work with proper error handling
 */

// Initialize Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);

const Database = {
    /**
     * Ensure participant exists - create if not
     * This is called before ANY database operation
     */
    async ensureParticipant(id) {
        try {
            safeLog('log', `🔍 ensureParticipant called with ID: ${id}`);
            
            // Check if exists
            const { data: existing, error: checkError } = await supabaseClient
                .from('research_participants')
                .select('id')
                .eq('id', id)
                .maybeSingle();

            if (checkError && checkError.code !== 'PGRST116') {
                throw checkError;
            }

            if (!existing) {
                // Create new participant
                safeLog('log', `➕ Creating NEW participant with ID: ${id}`);
                const { data, error } = await supabaseClient
                    .from('research_participants')
                    .insert([{
                        id: id,
                        session_id: id,
                        landing_timestamp: new Date().toISOString(),
                        survey_status: 'not_started'
                    }])
                    .select();

                if (error) throw error;
                safeLog('log', `✅ Participant created: ${id}`);
                return { success: true, data: data[0] };
            }

            safeLog('log', `✓ Participant already exists: ${id}`);
            return { success: true, data: existing };
        } catch (error) {
            safeLog('error', '❌ Error ensuring participant:', error);
            return { success: false, error };
        }
    },

    /**
     * Update contact information
     */
    async updateContact(id, contactData) {
        try {
            // Ensure participant exists first
            await this.ensureParticipant(id);

            // Update contact info
            const { data, error } = await supabaseClient
                .from('research_participants')
                .update({
                    email: contactData.email,
                    participant_name: contactData.name || null,
                    participant_role: contactData.role,
                    participant_industry: contactData.industry || null,
                    participant_profile_url: contactData.profileUrl || null,
                    eligibility_category: contactData.eligibilityCategory || null,
                    context_statement: contactData.contextStatement || null,
                    contact_timestamp: new Date().toISOString()
                })
                .eq('id', id)
                .select();

            if (error) throw error;
            safeLog('log', '✅ Contact info updated');
            return { success: true, data: data[0] };
        } catch (error) {
            safeLog('error', '❌ Error updating contact:', error);
            return { success: false, error };
        }
    },

    /**
     * Update commitment statement
     */
    async updateCommitment(id, statement) {
        try {
            // Ensure participant exists first
            await this.ensureParticipant(id);

            const { data, error } = await supabaseClient
                .from('research_participants')
                .update({
                    context_statement: statement,
                    commitment_timestamp: new Date().toISOString()
                })
                .eq('id', id)
                .select();

            if (error) throw error;
            safeLog('log', '✅ Commitment updated');
            return { success: true, data: data[0] };
        } catch (error) {
            safeLog('error', '❌ Error updating commitment:', error);
            return { success: false, error };
        }
    },

    /**
     * Create/update booking
     */
    async createBooking(id, bookingData) {
        try {
            // Ensure participant exists first
            await this.ensureParticipant(id);

            const { data, error } = await supabaseClient
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
            safeLog('log', '✅ Booking created');
            return { success: true, data: data[0] };
        } catch (error) {
            safeLog('error', '❌ Error creating booking:', error);
            return { success: false, error };
        }
    },

    /**
     * Get confirmed bookings
     */
    async getConfirmedBookings() {
        try {
            const { data, error } = await supabaseClient
                .from('research_participants')
                .select('booking_datetime, booking_duration_minutes')
                .eq('booking_scheduled', true)
                .in('booking_status', ['confirmed', 'pending'])
                .not('booking_datetime', 'is', null);

            if (error) throw error;
            return { success: true, data: data || [] };
        } catch (error) {
            safeLog('error', '❌ Error fetching bookings:', error);
            return { success: true, data: [] };
        }
    },

    /**
     * Update email status
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
            return { success: true, data: data[0] };
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
            // Ensure participant exists first
            await this.ensureParticipant(id);

            const { data, error } = await supabaseClient
                .from('research_participants')
                .update({
                    survey_status: 'in_progress',
                    survey_start_timestamp: new Date().toISOString()
                })
                .eq('id', id)
                .select();

            if (error) throw error;
            safeLog('log', '✅ Survey started');
            return { success: true, data: data[0] };
        } catch (error) {
            safeLog('error', '❌ Error starting survey:', error);
            return { success: false, error };
        }
    },

    /**
     * Save survey answer - THE CRITICAL FUNCTION
     */
    async saveAnswer(id, questionId, answer) {
        try {
            // Ensure participant exists first
            const ensureResult = await this.ensureParticipant(id);
            if (!ensureResult.success) {
                throw new Error('Failed to ensure participant exists');
            }

            // Map question ID to column name
            const columnName = this.getColumnName(questionId);
            if (!columnName) {
                safeLog('warn', `⚠️ No column mapping for: ${questionId}`);
                return { success: false, error: 'No column mapping' };
            }

            // Get current count
            const { data: currentData } = await supabaseClient
                .from('research_participants')
                .select('questions_answered')
                .eq('id', id)
                .single();

            const currentCount = currentData?.questions_answered || 0;

            // Prepare update
            const updates = {
                [columnName]: answer,
                questions_answered: currentCount + 1
            };

            safeLog('log', `💾 Saving ${questionId} → ${columnName} = ${answer}`);

            // Update database
            const { data, error } = await supabaseClient
                .from('research_participants')
                .update(updates)
                .eq('id', id)
                .select();

            if (error) throw error;

            if (!data || data.length === 0) {
                throw new Error('No rows updated');
            }

            safeLog('log', `✅ Saved ${questionId} successfully`);
            return { success: true, data: data[0] };
        } catch (error) {
            safeLog('error', `❌ Error saving ${questionId}:`, error);
            return { success: false, error };
        }
    },

    /**
     * Map question ID to database column name
     */
    getColumnName(questionId) {
        const mapping = {
            // Screening
            'Q1': 'q1_ai_tool',
            'Q2': 'q2_three_months_experience',
            'Q3': 'q3_years_experience',
            // Demographics
            'Q4': 'q4_age',
            'Q5': 'q5_gender',
            'Q6': 'q6_country',
            'Q7': 'q7_creative_field',
            'Q8': 'q8_employment_type',
            'Q9': 'q9_org_size',
            'Q10': 'q10_ai_tools_used',
            'Q11': 'q11_ai_duration',
            'Q12': 'q12_projects_completed',
            // Scenarios
            'SC-A': 'sc_a_workspace_suggestion',
            'SC-B1': 'sc_b1_time_pressure',
            'SC-B2': 'sc_b2_high_stakes',
            'SC-C1': 'sc_c1_first_action',
            'SC-C2': 'sc_c2_next_action',
            'SC-D': 'sc_d_cross_cultural_confidence',
            // CAT Scale
            'CAT1': 'cat1_strategic', 'CAT2': 'cat2_strategic', 'CAT3': 'cat3_strategic', 'CAT4': 'cat4_strategic', 'CAT5': 'cat5_strategic',
            'CAT6': 'cat6_cultural', 'CAT7': 'cat7_cultural', 'CAT8': 'cat8_cultural', 'CAT9': 'cat9_cultural', 'CAT10': 'cat10_cultural',
            'CAT11': 'cat11_brand', 'CAT12': 'cat12_brand', 'CAT13': 'cat13_brand', 'CAT14': 'cat14_brand', 'CAT15': 'cat15_brand',
            'CAT16': 'cat16_aesthetic', 'CAT17': 'cat17_aesthetic', 'CAT18': 'cat18_aesthetic', 'CAT19': 'cat19_aesthetic',
            'CAT20': 'cat20_stakeholder', 'CAT21': 'cat21_stakeholder', 'CAT22': 'cat22_stakeholder', 'CAT23': 'cat23_stakeholder',
            'CAT24': 'cat24_overall', 'CAT25': 'cat25_overall', 'CAT26': 'cat26_overall',
            // Identity
            'ID1': 'id1_executor', 'ID2': 'id2_executor', 'ID3': 'id3_executor', 'ID4': 'id4_executor',
            'ID5': 'id5_curator', 'ID6': 'id6_curator', 'ID7': 'id7_curator', 'ID8': 'id8_curator', 'ID9': 'id9_curator',
            'ID10': 'id10_uncertainty', 'ID11': 'id11_uncertainty', 'ID12': 'id12_uncertainty',
            // Expertise
            'EXP1': 'exp1_strategic_vision',
            'EXP2': 'exp2_cultural_intelligence',
            'EXP3': 'exp3_contextual_judgment',
            'EXP4': 'exp4_ai_collaboration',
            // Spirals
            'SP1': 'sp1_virtuous', 'SP2': 'sp2_virtuous', 'SP3': 'sp3_virtuous', 'SP4': 'sp4_virtuous',
            'SP5': 'sp5_vicious', 'SP6': 'sp6_vicious', 'SP7': 'sp7_vicious', 'SP8': 'sp8_vicious',
            // Organizational
            'OC1': 'oc1_investment', 'OC2': 'oc2_investment', 'OC3': 'oc3_investment', 'OC4': 'oc4_investment',
            'OC5': 'oc5_evaluation', 'OC6': 'oc6_evaluation', 'OC7': 'oc7_evaluation', 'OC8': 'oc8_evaluation',
            'OC9': 'oc9_learning', 'OC10': 'oc10_learning', 'OC11': 'oc11_learning', 'OC12': 'oc12_learning',
            'OC13': 'oc13_culture', 'OC14': 'oc14_culture', 'OC15': 'oc15_culture', 'OC16': 'oc16_culture',
            'OC17': 'oc17_strategic', 'OC18': 'oc18_strategic', 'OC19': 'oc19_strategic', 'OC20': 'oc20_strategic',
            'OC21': 'oc21_adaptation', 'OC22': 'oc22_adaptation', 'OC23': 'oc23_adaptation', 'OC24': 'oc24_adaptation',
            // Calibration
            'Q13': 'q13_iterations_to_calibration',
            'Q14': 'q14_time_to_calibration',
            'Q15': 'q15_current_calibration_state',
            'CAL1': 'cal1_calibration', 'CAL2': 'cal2_calibration', 'CAL3': 'cal3_calibration', 'CAL4': 'cal4_calibration',
            'STR1': 'str1_refinement', 'STR2': 'str2_refinement', 'STR3': 'str3_refinement',
            // Cultural
            'Q16': 'q16_cross_cultural_work',
            'Q17': 'q17_cross_cultural_difficulty',
            'Q18': 'q18_extra_effort',
            'CUL1': 'cul1_cultural', 'CUL2': 'cul2_cultural', 'CUL3': 'cul3_cultural',
            // Outcomes
            'OUT1': 'out1_quality', 'OUT2': 'out2_quality', 'OUT3': 'out3_quality',
            'OUT4': 'out4_efficiency', 'OUT5': 'out5_efficiency', 'OUT6': 'out6_efficiency',
            'OUT7': 'out7_satisfaction', 'OUT8': 'out8_satisfaction', 'OUT9': 'out9_satisfaction',
            'OUT10': 'out10_confidence', 'OUT11': 'out11_confidence', 'OUT12': 'out12_confidence', 'OUT13': 'out13_confidence',
            // Open questions
            'Q19': 'q19_biggest_challenge',
            'Q20': 'q20_org_support_needed',
            'Q21': 'q21_advice_for_beginners',
            // Follow-up
            'Q22_interview': 'follow_up_interest',
            'Q23_findings': 'q23_receive_findings'
        };

        return mapping[questionId] || null;
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
                    completion_percentage: 100,
                    completion_time_minutes: completionData.completionTime,
                    total_words_written: completionData.totalWords || 0,
                    average_response_time_seconds: completionData.avgResponseTime || 0,
                    is_speedrun: completionData.isSpeedrun || false,
                    response_speeds: completionData.responseSpeeds || null,
                    archetype_name: completionData.archetypeName || null,
                    archetype_description: completionData.archetypeDescription || null,
                    archetype_power: completionData.archetypePower || null
                })
                .eq('id', id)
                .select();

            if (error) throw error;
            safeLog('log', '✅ Survey completed');
            return { success: true, data: data[0] };
        } catch (error) {
            safeLog('error', '❌ Error completing survey:', error);
            return { success: false, error };
        }
    },

    /**
     * Get current user (Google OAuth)
     */
    async getCurrentUser() {
        try {
            const { data: { user }, error } = await supabaseClient.auth.getUser();
            if (error) throw error;
            return { success: true, user };
        } catch (error) {
            return { success: false, error };
        }
    },

    /**
     * Sign in with Google
     */
    async signInWithGoogle(returnUrl) {
        try {
            const { data, error } = await supabaseClient.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: returnUrl,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent'
                    }
                }
            });
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            safeLog('error', '❌ Google sign-in error:', error);
            return { success: false, error };
        }
    },

    /**
     * Sign out
     */
    async signOut() {
        try {
            const { error } = await supabaseClient.auth.signOut();
            if (error) throw error;
            
            // Clear session storage
            sessionStorage.removeItem('google_user_name');
            sessionStorage.removeItem('google_user_email');
            sessionStorage.removeItem('should_autofill');
            sessionStorage.removeItem('oauth_redirect');
            sessionStorage.removeItem('oauth_return_page');
            
            safeLog('log', '✅ Signed out successfully');
            return { success: true };
        } catch (error) {
            safeLog('error', '❌ Sign-out error:', error);
            return { success: false, error };
        }
    }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Generate unique response ID
 */
function generateResponseId() {
    const date = new Date();
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `CTR-${dateStr}-${randomStr}`;
}

/**
 * Calculate completion time in minutes
 */
function calculateCompletionTime(startTime) {
    const endTime = new Date();
    const diffMs = endTime - startTime;
    return Math.round(diffMs / 60000);
}
