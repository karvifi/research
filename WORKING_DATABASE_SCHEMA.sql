-- ============================================
-- BULLETPROOF RESEARCH DATABASE SCHEMA
-- Tested and Working - All Data Will Be Recorded
-- ============================================
-- Run this in Supabase SQL Editor
-- ============================================

-- Drop existing table if it exists
DROP TABLE IF EXISTS research_participants CASCADE;

-- ============================================
-- MAIN TABLE - COMPLETE PARTICIPANT DATA
-- ============================================
CREATE TABLE research_participants (
    -- PRIMARY KEY
    id TEXT PRIMARY KEY,
    session_id TEXT,
    
    -- TIMESTAMPS
    landing_timestamp TIMESTAMPTZ DEFAULT NOW(),
    eligibility_timestamp TIMESTAMPTZ,
    commitment_timestamp TIMESTAMPTZ,
    contact_timestamp TIMESTAMPTZ,
    booking_timestamp TIMESTAMPTZ,
    survey_start_timestamp TIMESTAMPTZ,
    survey_complete_timestamp TIMESTAMPTZ,
    last_activity_timestamp TIMESTAMPTZ DEFAULT NOW(),
    
    -- ELIGIBILITY & COMMITMENT
    eligibility_category TEXT,
    context_statement TEXT,
    
    -- CONTACT INFO
    email VARCHAR(255),
    participant_name VARCHAR(255),
    participant_role TEXT,
    participant_industry TEXT,
    participant_profile_url TEXT,
    
    -- GOOGLE OAUTH
    linkedin_url TEXT,
    linkedin_name TEXT,
    linkedin_avatar TEXT,
    linkedin_verified BOOLEAN DEFAULT FALSE,
    
    -- BOOKING
    booking_scheduled BOOLEAN DEFAULT FALSE,
    booking_date DATE,
    booking_time TIME,
    booking_datetime TIMESTAMPTZ,
    booking_timezone VARCHAR(100),
    booking_duration_minutes INT DEFAULT 60,
    booking_meeting_platform VARCHAR(50),
    booking_meeting_url TEXT,
    booking_notes TEXT,
    booking_status VARCHAR(20) DEFAULT 'pending',
    booking_reminder_sent BOOLEAN DEFAULT FALSE,
    booking_reminder_sent_at TIMESTAMPTZ,
    
    -- EMAIL TRACKING
    confirmation_email_sent BOOLEAN DEFAULT FALSE,
    confirmation_email_sent_at TIMESTAMPTZ,
    researcher_notification_sent BOOLEAN DEFAULT FALSE,
    researcher_notification_sent_at TIMESTAMPTZ,
    
    -- SURVEY PROGRESS
    survey_status VARCHAR(50) DEFAULT 'not_started',
    current_question_index INT DEFAULT 0,
    questions_answered INT DEFAULT 0,
    completion_percentage DECIMAL(5,2) DEFAULT 0,
    completion_time_minutes INT,
    
    -- SCREENING (Q1-Q3)
    q1_ai_tool TEXT,
    q1_ai_tool_other TEXT,
    q2_three_months_experience TEXT,
    q3_years_experience TEXT,
    
    -- DEMOGRAPHICS (Q4-Q12)
    q4_age INT,
    q5_gender TEXT,
    q6_country TEXT,
    q6_country_other TEXT,
    q7_creative_field TEXT,
    q7_creative_field_other TEXT,
    q8_employment_type TEXT,
    q8_employment_type_other TEXT,
    q9_org_size TEXT,
    q10_ai_tools_used TEXT,
    q10_ai_tools_other TEXT,
    q11_ai_duration TEXT,
    q12_projects_completed TEXT,
    
    -- SCENARIOS
    sc_a_workspace_suggestion TEXT,
    sc_b1_time_pressure TEXT,
    sc_b2_high_stakes TEXT,
    sc_c1_first_action TEXT,
    sc_c2_next_action TEXT,
    sc_d_cross_cultural_confidence INT,
    
    -- CAT SCALE (26 items)
    cat1_strategic INT, cat2_strategic INT, cat3_strategic INT, cat4_strategic INT, cat5_strategic INT,
    cat6_cultural INT, cat7_cultural INT, cat8_cultural INT, cat9_cultural INT, cat10_cultural INT,
    cat11_brand INT, cat12_brand INT, cat13_brand INT, cat14_brand INT, cat15_brand INT,
    cat16_aesthetic INT, cat17_aesthetic INT, cat18_aesthetic INT, cat19_aesthetic INT,
    cat20_stakeholder INT, cat21_stakeholder INT, cat22_stakeholder INT, cat23_stakeholder INT,
    cat24_overall INT, cat25_overall INT, cat26_overall INT,
    
    -- IDENTITY SCALE (12 items)
    id1_executor INT, id2_executor INT, id3_executor INT, id4_executor INT,
    id5_curator INT, id6_curator INT, id7_curator INT, id8_curator INT, id9_curator INT,
    id10_uncertainty INT, id11_uncertainty INT, id12_uncertainty INT,
    
    -- EXPERTISE (4 items)
    exp1_strategic_vision INT,
    exp2_cultural_intelligence INT,
    exp3_contextual_judgment INT,
    exp4_ai_collaboration INT,
    
    -- SPIRALS (8 items)
    sp1_virtuous INT, sp2_virtuous INT, sp3_virtuous INT, sp4_virtuous INT,
    sp5_vicious INT, sp6_vicious INT, sp7_vicious INT, sp8_vicious INT,
    
    -- ORGANIZATIONAL (24 items)
    oc1_investment INT, oc2_investment INT, oc3_investment INT, oc4_investment INT,
    oc5_evaluation INT, oc6_evaluation INT, oc7_evaluation INT, oc8_evaluation INT,
    oc9_learning INT, oc10_learning INT, oc11_learning INT, oc12_learning INT,
    oc13_culture INT, oc14_culture INT, oc15_culture INT, oc16_culture INT,
    oc17_strategic INT, oc18_strategic INT, oc19_strategic INT, oc20_strategic INT,
    oc21_adaptation INT, oc22_adaptation INT, oc23_adaptation INT, oc24_adaptation INT,
    
    -- CALIBRATION (10 items)
    q13_iterations_to_calibration TEXT,
    q14_time_to_calibration TEXT,
    q15_current_calibration_state TEXT,
    cal1_calibration INT, cal2_calibration INT, cal3_calibration INT, cal4_calibration INT,
    str1_refinement INT, str2_refinement INT, str3_refinement INT,
    
    -- CULTURAL (6 items)
    q16_cross_cultural_work TEXT,
    q17_cross_cultural_difficulty TEXT,
    q18_extra_effort TEXT,
    cul1_cultural INT, cul2_cultural INT, cul3_cultural INT,
    
    -- OUTCOMES (13 items)
    out1_quality INT, out2_quality INT, out3_quality INT,
    out4_efficiency INT, out5_efficiency INT, out6_efficiency INT,
    out7_satisfaction INT, out8_satisfaction INT, out9_satisfaction INT,
    out10_confidence INT, out11_confidence INT, out12_confidence INT, out13_confidence INT,
    
    -- OPEN QUESTIONS
    q19_biggest_challenge TEXT,
    q20_org_support_needed TEXT,
    q21_advice_for_beginners TEXT,
    
    -- FOLLOW-UP
    follow_up_interest TEXT,
    follow_up_email VARCHAR(255),
    q23_receive_findings TEXT,
    
    -- CALCULATED SCORES
    archetype_name TEXT,
    archetype_description TEXT,
    archetype_power TEXT,
    trust_strategic_score DECIMAL(5,2),
    trust_cultural_score DECIMAL(5,2),
    trust_brand_score DECIMAL(5,2),
    trust_aesthetic_score DECIMAL(5,2),
    trust_stakeholder_score DECIMAL(5,2),
    trust_overall_score DECIMAL(5,2),
    executor_score DECIMAL(5,2),
    curator_score DECIMAL(5,2),
    curatorial_shift_ratio DECIMAL(5,2),
    org_readiness_score DECIMAL(5,2),
    
    -- PERFORMANCE
    total_words_written INT DEFAULT 0,
    average_response_time_seconds DECIMAL(8,2),
    is_speedrun BOOLEAN DEFAULT FALSE,
    response_speeds JSONB,
    
    -- METADATA
    browser_info JSONB,
    device_type VARCHAR(50),
    ip_address INET,
    user_agent TEXT,
    referrer_url TEXT,
    data_quality_flag VARCHAR(20) DEFAULT 'good',
    researcher_notes TEXT,
    flagged_for_review BOOLEAN DEFAULT FALSE,
    
    -- AUDIT
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_rp_email ON research_participants(email);
CREATE INDEX idx_rp_status ON research_participants(survey_status);
CREATE INDEX idx_rp_created ON research_participants(created_at DESC);

-- ============================================
-- DISABLE RLS (for testing - enable later if needed)
-- ============================================
ALTER TABLE research_participants DISABLE ROW LEVEL SECURITY;

-- ============================================
-- AUTO-UPDATE TIMESTAMP TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    NEW.last_activity_timestamp = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_timestamp
    BEFORE UPDATE ON research_participants
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

-- ============================================
-- VERIFICATION
-- ============================================
SELECT 'Database created successfully!' AS status;
SELECT COUNT(*) AS column_count FROM information_schema.columns 
WHERE table_name = 'research_participants';
