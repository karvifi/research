-- ============================================
-- UNIFIED RESEARCH DATABASE - EVERYTHING IN ONE TABLE
-- Complete End-to-End Participant Journey Tracking
-- ============================================
-- This captures EVERYTHING from landing to completion
-- Run this in Supabase SQL Editor after deleting old tables
-- ============================================

-- Drop all existing tables
DROP TABLE IF EXISTS user_insights CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS responses CASCADE;
DROP TABLE IF EXISTS participants CASCADE;

-- ============================================
-- SINGLE UNIFIED TABLE - COMPLETE PARTICIPANT JOURNEY
-- ============================================
CREATE TABLE research_participants (
    -- PRIMARY IDENTIFIERS
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    session_id TEXT UNIQUE,
    
    -- TIMESTAMPS (Complete Journey Tracking)
    landing_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    eligibility_timestamp TIMESTAMP WITH TIME ZONE,
    commitment_timestamp TIMESTAMP WITH TIME ZONE,
    contact_timestamp TIMESTAMP WITH TIME ZONE,
    booking_timestamp TIMESTAMP WITH TIME ZONE,
    survey_start_timestamp TIMESTAMP WITH TIME ZONE,
    survey_complete_timestamp TIMESTAMP WITH TIME ZONE,
    last_activity_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- ELIGIBILITY & SCREENING
    eligibility_category TEXT, -- ai-evaluation, creative-judgment, research-translation, design-advocacy, exploratory
    context_statement TEXT, -- Micro-commitment question response
    
    -- CONTACT INFORMATION
    email VARCHAR(255) NOT NULL,
    participant_name VARCHAR(255),
    participant_role TEXT, -- student, early-career, mid-career, senior, founder
    participant_industry TEXT,
    participant_profile_url TEXT, -- LinkedIn/portfolio
    
    -- IDENTITY LINKAGE
    linkedin_url TEXT,
    linkedin_name TEXT,
    linkedin_avatar TEXT,
    linkedin_verified BOOLEAN DEFAULT false,
    
    -- INTERVIEW BOOKING
    booking_scheduled BOOLEAN DEFAULT false,
    booking_date DATE,
    booking_time TIME,
    booking_datetime TIMESTAMP WITH TIME ZONE,
    booking_timezone VARCHAR(100),
    booking_duration_minutes INT DEFAULT 60,
    booking_meeting_platform VARCHAR(50), -- jitsi_meet, google_meet
    booking_meeting_url TEXT,
    booking_notes TEXT,
    booking_status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, completed, cancelled, no_show
    booking_reminder_sent BOOLEAN DEFAULT false,
    booking_reminder_sent_at TIMESTAMP WITH TIME ZONE,
    
    -- EMAIL NOTIFICATIONS
    confirmation_email_sent BOOLEAN DEFAULT false,
    confirmation_email_sent_at TIMESTAMP WITH TIME ZONE,
    researcher_notification_sent BOOLEAN DEFAULT false,
    researcher_notification_sent_at TIMESTAMP WITH TIME ZONE,
    
    -- SURVEY PROGRESS
    survey_status VARCHAR(50) DEFAULT 'not_started', -- not_started, in_progress, completed, abandoned
    current_question_index INT DEFAULT 0,
    questions_answered INT DEFAULT 0,
    completion_percentage DECIMAL(5,2) DEFAULT 0,
    completion_time_minutes INT,
    
    -- SCREENING QUESTIONS (Q1-Q3)
    q1_ai_tool TEXT, -- midjourney, dalle, stable, other
    q1_ai_tool_other TEXT,
    q2_three_months_experience TEXT, -- yes, no
    q3_years_experience TEXT, -- lt2, 2-5, 5-10, 10-20, gt20
    
    -- DEMOGRAPHICS (Q4-Q12)
    q4_age INT,
    q5_gender TEXT, -- female, male, nonbinary, no-say
    q6_country TEXT,
    q6_country_other TEXT,
    q7_creative_field TEXT,
    q7_creative_field_other TEXT,
    q8_employment_type TEXT,
    q8_employment_type_other TEXT,
    q9_org_size TEXT,
    q10_ai_tools_used TEXT[], -- Array of tools
    q10_ai_tools_other TEXT,
    q11_ai_duration TEXT,
    q12_projects_completed TEXT,
    
    -- SCENARIO-BASED QUESTIONS
    sc_a_workspace_suggestion TEXT,
    sc_b1_time_pressure TEXT,
    sc_b2_high_stakes TEXT,
    sc_c1_first_action TEXT,
    sc_c2_next_action TEXT,
    sc_d_cross_cultural_confidence INT, -- 1-7 scale
    
    -- CAT SCALE (Contextual Appropriateness Trust) - 26 items, 1-7 scale
    cat1_strategic INT, cat2_strategic INT, cat3_strategic INT, cat4_strategic INT, cat5_strategic INT,
    cat6_cultural INT, cat7_cultural INT, cat8_cultural INT, cat9_cultural INT, cat10_cultural INT,
    cat11_brand INT, cat12_brand INT, cat13_brand INT, cat14_brand INT, cat15_brand INT,
    cat16_aesthetic INT, cat17_aesthetic INT, cat18_aesthetic INT, cat19_aesthetic INT,
    cat20_stakeholder INT, cat21_stakeholder INT, cat22_stakeholder INT, cat23_stakeholder INT,
    cat24_overall INT, cat25_overall INT, cat26_overall INT,
    
    -- IDENTITY SCALE (Professional Identity Transformation) - 12 items, 1-7 scale
    id1_executor INT, id2_executor INT, id3_executor INT, id4_executor INT,
    id5_curator INT, id6_curator INT, id7_curator INT, id8_curator INT, id9_curator INT,
    id10_uncertainty INT, id11_uncertainty INT, id12_uncertainty INT,
    
    -- EXPERTISE PILLARS - 4 items, 1-7 scale
    exp1_strategic_vision INT,
    exp2_cultural_intelligence INT,
    exp3_contextual_judgment INT,
    exp4_ai_collaboration INT,
    
    -- TRUST-IDENTITY SPIRALS - 8 items, 1-7 scale
    sp1_virtuous INT, sp2_virtuous INT, sp3_virtuous INT, sp4_virtuous INT,
    sp5_vicious INT, sp6_vicious INT, sp7_vicious INT, sp8_vicious INT,
    
    -- ORGANIZATIONAL CAPABILITIES - 24 items, 1-7 scale
    oc1_investment INT, oc2_investment INT, oc3_investment INT, oc4_investment INT,
    oc5_evaluation INT, oc6_evaluation INT, oc7_evaluation INT, oc8_evaluation INT,
    oc9_learning INT, oc10_learning INT, oc11_learning INT, oc12_learning INT,
    oc13_culture INT, oc14_culture INT, oc15_culture INT, oc16_culture INT,
    oc17_strategic INT, oc18_strategic INT, oc19_strategic INT, oc20_strategic INT,
    oc21_adaptation INT, oc22_adaptation INT, oc23_adaptation INT, oc24_adaptation INT,
    
    -- CALIBRATION - 10 items
    q13_iterations_to_calibration TEXT,
    q14_time_to_calibration TEXT,
    q15_current_calibration_state TEXT,
    cal1_calibration INT, cal2_calibration INT, cal3_calibration INT, cal4_calibration INT,
    str1_refinement INT, str2_refinement INT, str3_refinement INT,
    
    -- CULTURAL CONTEXT - 6 items
    q16_cross_cultural_work TEXT, -- yes, no
    q17_cross_cultural_difficulty TEXT,
    q18_extra_effort TEXT,
    cul1_cultural INT, cul2_cultural INT, cul3_cultural INT,
    
    -- OUTCOMES - 13 items, 1-7 scale
    out1_quality INT, out2_quality INT, out3_quality INT,
    out4_efficiency INT, out5_efficiency INT, out6_efficiency INT,
    out7_satisfaction INT, out8_satisfaction INT, out9_satisfaction INT,
    out10_confidence INT, out11_confidence INT, out12_confidence INT, out13_confidence INT,
    
    -- OPEN REFLECTIONS (Optional)
    q19_biggest_challenge TEXT,
    q20_org_support_needed TEXT,
    q21_advice_for_beginners TEXT,
    
    -- FOLLOW-UP
    follow_up_interest TEXT, -- yes, maybe, no
    follow_up_email VARCHAR(255),
    q23_receive_findings TEXT, -- yes, no
    
    -- CALCULATED RESULTS
    archetype_name TEXT, -- The Strategic Curator, The Intuitive Maverick, etc.
    archetype_description TEXT,
    archetype_power TEXT,
    
    -- TRUST PROFILE SCORES (Calculated from CAT scale)
    trust_strategic_score DECIMAL(5,2),
    trust_cultural_score DECIMAL(5,2),
    trust_brand_score DECIMAL(5,2),
    trust_aesthetic_score DECIMAL(5,2),
    trust_stakeholder_score DECIMAL(5,2),
    trust_overall_score DECIMAL(5,2),
    
    -- IDENTITY TRANSFORMATION SCORES
    executor_score DECIMAL(5,2),
    curator_score DECIMAL(5,2),
    curatorial_shift_ratio DECIMAL(5,2), -- curator_score / executor_score
    
    -- ORGANIZATIONAL READINESS SCORE
    org_readiness_score DECIMAL(5,2),
    
    -- PERFORMANCE METRICS
    total_words_written INT DEFAULT 0,
    average_response_time_seconds DECIMAL(8,2),
    is_speedrun BOOLEAN DEFAULT false,
    response_speeds JSONB, -- Array of response times per question
    
    -- METADATA
    browser_info JSONB,
    device_type VARCHAR(50),
    ip_address INET,
    user_agent TEXT,
    referrer_url TEXT,
    
    -- ADMIN & RESEARCH
    data_quality_flag VARCHAR(20) DEFAULT 'good', -- good, suspicious, invalid
    researcher_notes TEXT,
    flagged_for_review BOOLEAN DEFAULT false,
    
    -- AUDIT TRAIL
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_participants_email ON research_participants(email);
CREATE INDEX idx_participants_survey_status ON research_participants(survey_status);
CREATE INDEX idx_participants_booking_status ON research_participants(booking_status);
CREATE INDEX idx_participants_booking_datetime ON research_participants(booking_datetime);
CREATE INDEX idx_participants_archetype ON research_participants(archetype_name);
CREATE INDEX idx_participants_created_at ON research_participants(created_at DESC);
CREATE INDEX idx_participants_last_activity ON research_participants(last_activity_timestamp DESC);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE research_participants ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for participant registration)
CREATE POLICY "Anyone can create participants"
    ON research_participants FOR INSERT WITH CHECK (true);

-- Allow anyone to read their own data (by email)
CREATE POLICY "Users can read their own data"
    ON research_participants FOR SELECT USING (true);

-- Allow anyone to update (for survey progress)
CREATE POLICY "Anyone can update participants"
    ON research_participants FOR UPDATE USING (true);

-- ============================================
-- TRIGGER FOR AUTO-UPDATING TIMESTAMPS
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    NEW.last_activity_timestamp = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_participants_updated_at
    BEFORE UPDATE ON research_participants
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- HELPER VIEWS FOR ANALYSIS
-- ============================================

-- View: Completed Participants
CREATE OR REPLACE VIEW completed_participants AS
SELECT 
    id,
    email,
    participant_name,
    archetype_name,
    trust_overall_score,
    curatorial_shift_ratio,
    org_readiness_score,
    completion_time_minutes,
    questions_answered,
    survey_complete_timestamp,
    booking_scheduled,
    booking_datetime
FROM research_participants
WHERE survey_status = 'completed'
ORDER BY survey_complete_timestamp DESC;

-- View: Booking Schedule
CREATE OR REPLACE VIEW booking_schedule AS
SELECT 
    id,
    participant_name,
    email,
    booking_date,
    booking_time,
    booking_datetime,
    booking_timezone,
    booking_meeting_url,
    booking_meeting_platform,
    booking_status,
    booking_notes,
    archetype_name
FROM research_participants
WHERE booking_scheduled = true
AND booking_status IN ('confirmed', 'pending')
ORDER BY booking_datetime ASC;

-- View: Survey Progress Dashboard
CREATE OR REPLACE VIEW survey_progress_dashboard AS
SELECT 
    survey_status,
    COUNT(*) as count,
    AVG(completion_percentage) as avg_completion,
    AVG(questions_answered) as avg_questions_answered
FROM research_participants
GROUP BY survey_status;

-- View: Archetype Distribution
CREATE OR REPLACE VIEW archetype_distribution AS
SELECT 
    archetype_name,
    COUNT(*) as count,
    AVG(trust_overall_score) as avg_trust_score,
    AVG(curatorial_shift_ratio) as avg_curatorial_shift,
    AVG(org_readiness_score) as avg_org_readiness
FROM research_participants
WHERE archetype_name IS NOT NULL
GROUP BY archetype_name
ORDER BY count DESC;

-- ============================================
-- VERIFICATION
-- ============================================
SELECT 'SUCCESS! Unified database created!' as status;
SELECT 'Table: research_participants with ' || COUNT(*) || ' columns' as info
FROM information_schema.columns 
WHERE table_name = 'research_participants';

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- Everything is now in ONE table:
-- ✅ Complete participant journey from landing to completion
-- ✅ All survey questions and responses
-- ✅ Booking information
-- ✅ Email tracking
-- ✅ Calculated scores and archetypes
-- ✅ Performance metrics
-- ✅ Audit trail
-- ============================================
