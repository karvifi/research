# 📊 DATABASE STRUCTURE EXPLAINED

## ONE TABLE: `research_participants`

Every participant = ONE ROW with ALL their data

---

## 🔑 PRIMARY KEY

| Column | Type | Description |
|--------|------|-------------|
| `id` | TEXT | Unique ID (e.g., "CTR-20260210-A3F9B2") |
| `session_id` | TEXT | Session tracking ID |

---

## ⏰ TIMESTAMPS (9 columns)

Tracks the complete journey:

| Column | When It's Set | Example |
|--------|---------------|---------|
| `landing_timestamp` | User visits landing page | 2026-02-10 14:30:00 |
| `eligibility_timestamp` | User selects eligibility | 2026-02-10 14:30:15 |
| `commitment_timestamp` | User answers context question | 2026-02-10 14:31:00 |
| `contact_timestamp` | User submits contact form | 2026-02-10 14:32:00 |
| `booking_timestamp` | User books interview | 2026-02-10 14:35:00 |
| `survey_start_timestamp` | User starts survey | 2026-02-10 14:40:00 |
| `survey_complete_timestamp` | User completes survey | 2026-02-10 15:30:00 |
| `last_activity_timestamp` | Any activity | 2026-02-10 15:30:00 |
| `created_at` / `updated_at` | Auto-managed | 2026-02-10 14:30:00 |

---

## 🎯 ELIGIBILITY & SCREENING (2 columns)

| Column | Example Value |
|--------|---------------|
| `eligibility_category` | "ai-evaluation" |
| `context_statement` | "I use AI to evaluate design concepts..." |

---

## 👤 CONTACT INFORMATION (7 columns)

| Column | Example Value |
|--------|---------------|
| `email` | "participant@example.com" |
| `participant_name` | "John Doe" |
| `participant_role` | "mid-career" |
| `participant_industry` | "Technology" |
| `participant_profile_url` | "linkedin.com/in/johndoe" |
| `linkedin_url` | "linkedin.com/in/johndoe" |
| `linkedin_verified` | true/false |

---

## 📅 BOOKING DETAILS (13 columns)

| Column | Example Value |
|--------|---------------|
| `booking_scheduled` | true |
| `booking_date` | 2026-02-15 |
| `booking_time` | 14:00:00 |
| `booking_datetime` | 2026-02-15T14:00:00Z |
| `booking_timezone` | "America/New_York" |
| `booking_duration_minutes` | 60 |
| `booking_meeting_platform` | "jitsi_meet" |
| `booking_meeting_url` | "https://meet.jit.si/..." |
| `booking_notes` | "Looking forward to it!" |
| `booking_status` | "confirmed" |
| `booking_reminder_sent` | true/false |
| `booking_reminder_sent_at` | 2026-02-14T14:00:00Z |

---

## 📧 EMAIL TRACKING (4 columns)

| Column | Example Value |
|--------|---------------|
| `confirmation_email_sent` | true |
| `confirmation_email_sent_at` | 2026-02-10T14:35:05Z |
| `researcher_notification_sent` | true |
| `researcher_notification_sent_at` | 2026-02-10T14:35:10Z |

---

## 📝 SURVEY PROGRESS (6 columns)

| Column | Example Value |
|--------|---------------|
| `survey_status` | "in_progress" |
| `current_question_index` | 45 |
| `questions_answered` | 45 |
| `completion_percentage` | 67.5 |
| `completion_time_minutes` | 50 |

---

## 📋 SURVEY QUESTIONS (150+ columns)

### Screening (3 columns)
- `q1_ai_tool` → "midjourney"
- `q2_three_months_experience` → "yes"
- `q3_years_experience` → "5-10"

### Demographics (9 columns)
- `q4_age` → 32
- `q5_gender` → "male"
- `q6_country` → "United States"
- `q7_creative_field` → "graphic-design"
- `q8_employment_type` → "full-time"
- `q9_org_size` → "50-250"
- `q10_ai_tools_used` → ["midjourney", "dalle"]
- `q11_ai_duration` → "1-2years"
- `q12_projects_completed` → "20-50"

### CAT Scale (26 columns)
Trust calibration across 5 dimensions:
- `cat1_strategic` through `cat5_strategic` → 1-7 scale
- `cat6_cultural` through `cat10_cultural` → 1-7 scale
- `cat11_brand` through `cat15_brand` → 1-7 scale
- `cat16_aesthetic` through `cat19_aesthetic` → 1-7 scale
- `cat20_stakeholder` through `cat23_stakeholder` → 1-7 scale
- `cat24_overall` through `cat26_overall` → 1-7 scale

### Identity Scale (12 columns)
Professional identity transformation:
- `id1_executor` through `id4_executor` → 1-7 scale
- `id5_curator` through `id9_curator` → 1-7 scale
- `id10_uncertainty` through `id12_uncertainty` → 1-7 scale

### Expertise Pillars (4 columns)
- `exp1_strategic_vision` → 1-7 scale
- `exp2_cultural_intelligence` → 1-7 scale
- `exp3_contextual_judgment` → 1-7 scale
- `exp4_ai_collaboration` → 1-7 scale

### Trust-Identity Spirals (8 columns)
- `sp1_virtuous` through `sp4_virtuous` → 1-7 scale
- `sp5_vicious` through `sp8_vicious` → 1-7 scale

### Organizational Capabilities (24 columns)
- `oc1_investment` through `oc4_investment` → 1-7 scale
- `oc5_evaluation` through `oc8_evaluation` → 1-7 scale
- `oc9_learning` through `oc12_learning` → 1-7 scale
- `oc13_culture` through `oc16_culture` → 1-7 scale
- `oc17_strategic` through `oc20_strategic` → 1-7 scale
- `oc21_adaptation` through `oc24_adaptation` → 1-7 scale

### Calibration (10 columns)
- `q13_iterations_to_calibration` → "5-15"
- `q14_time_to_calibration` → "1-3months"
- `q15_current_calibration_state` → "well-calibrated"
- `cal1_calibration` through `cal4_calibration` → 1-7 scale
- `str1_refinement` through `str3_refinement` → 1-7 scale

### Cultural Context (6 columns)
- `q16_cross_cultural_work` → "yes"
- `q17_cross_cultural_difficulty` → "moderate"
- `q18_extra_effort` → "yes"
- `cul1_cultural` through `cul3_cultural` → 1-7 scale

### Outcomes (13 columns)
- `out1_quality` through `out3_quality` → 1-7 scale
- `out4_efficiency` through `out6_efficiency` → 1-7 scale
- `out7_satisfaction` through `out9_satisfaction` → 1-7 scale
- `out10_confidence` through `out13_confidence` → 1-7 scale

### Open Reflections (3 columns)
- `q19_biggest_challenge` → Text
- `q20_org_support_needed` → Text
- `q21_advice_for_beginners` → Text

### Follow-up (3 columns)
- `follow_up_interest` → "yes"
- `follow_up_email` → "participant@example.com"
- `q23_receive_findings` → "yes"

---

## 🎯 CALCULATED RESULTS (12 columns)

Automatically calculated from survey answers:

| Column | Example Value |
|--------|---------------|
| `archetype_name` | "The Strategic Curator" |
| `archetype_description` | "You have successfully transitioned..." |
| `archetype_power` | "Judgment Mastery" |
| `trust_strategic_score` | 5.8 |
| `trust_cultural_score` | 6.2 |
| `trust_brand_score` | 5.5 |
| `trust_aesthetic_score` | 6.0 |
| `trust_stakeholder_score` | 5.9 |
| `trust_overall_score` | 5.88 |
| `executor_score` | 4.5 |
| `curator_score` | 6.2 |
| `curatorial_shift_ratio` | 1.38 |
| `org_readiness_score` | 5.7 |

---

## 📊 PERFORMANCE METRICS (5 columns)

| Column | Example Value |
|--------|---------------|
| `total_words_written` | 1250 |
| `average_response_time_seconds` | 45.3 |
| `is_speedrun` | false |
| `response_speeds` | [30000, 45000, 60000, ...] (JSON) |

---

## 🖥️ METADATA (6 columns)

| Column | Example Value |
|--------|---------------|
| `browser_info` | {"name": "Chrome", "version": "120"} |
| `device_type` | "desktop" |
| `ip_address` | "192.168.1.1" |
| `user_agent` | "Mozilla/5.0..." |
| `referrer_url` | "https://google.com" |

---

## 🔍 ADMIN & RESEARCH (3 columns)

| Column | Example Value |
|--------|---------------|
| `data_quality_flag` | "good" |
| `researcher_notes` | "Excellent responses" |
| `flagged_for_review` | false |

---

## 📈 EXAMPLE ROW

Here's what ONE participant's row looks like:

```
id: "CTR-20260210-A3F9B2"
email: "john@example.com"
participant_name: "John Doe"
landing_timestamp: 2026-02-10 14:30:00
eligibility_category: "ai-evaluation"
context_statement: "I use AI to evaluate design concepts..."
contact_timestamp: 2026-02-10 14:32:00
booking_scheduled: true
booking_date: 2026-02-15
booking_time: 14:00:00
booking_meeting_url: "https://meet.jit.si/CalibratedTrust_A3F9B2"
confirmation_email_sent: true
survey_status: "completed"
questions_answered: 150
q1_ai_tool: "midjourney"
q4_age: 32
cat1_strategic: 6
cat2_strategic: 5
... (150+ more columns)
archetype_name: "The Strategic Curator"
trust_overall_score: 5.88
completion_time_minutes: 50
```

---

## 🎯 WHY ONE TABLE?

### Advantages:
✅ **Simple** - Everything in one place
✅ **Fast** - No complex JOINs needed
✅ **Easy Export** - One CSV with everything
✅ **Clear** - See complete participant journey in one row
✅ **Reliable** - No foreign key constraints to break

### Traditional Multi-Table Approach:
❌ 5 separate tables
❌ Complex JOINs to get complete data
❌ Foreign key constraints causing errors
❌ Multiple exports needed
❌ Data scattered across tables

---

## 📊 HOW TO QUERY

### Get all completed participants:
```sql
SELECT * FROM research_participants 
WHERE survey_status = 'completed';
```

### Get today's bookings:
```sql
SELECT participant_name, email, booking_time, booking_meeting_url
FROM research_participants 
WHERE booking_date = CURRENT_DATE
AND booking_status = 'confirmed';
```

### Get participants by archetype:
```sql
SELECT archetype_name, COUNT(*) as count,
       AVG(trust_overall_score) as avg_trust
FROM research_participants 
WHERE archetype_name IS NOT NULL
GROUP BY archetype_name
ORDER BY count DESC;
```

### Get high-trust participants:
```sql
SELECT participant_name, email, trust_overall_score, archetype_name
FROM research_participants 
WHERE trust_overall_score > 6.0
ORDER BY trust_overall_score DESC;
```

### Export specific columns:
```sql
SELECT 
    email,
    participant_name,
    eligibility_category,
    booking_date,
    booking_time,
    survey_status,
    archetype_name,
    trust_overall_score
FROM research_participants 
ORDER BY created_at DESC;
```

---

## 🎉 SUMMARY

**ONE TABLE** = **COMPLETE PARTICIPANT JOURNEY**

From landing page to survey completion, everything is recorded in a single row with 200+ columns.

No complexity. No confusion. Just simple, comprehensive data tracking.
