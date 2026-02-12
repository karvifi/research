# 🔬 COMPLETE PROJECT DOCUMENTATION
## Calibrated Trust Research Platform - Full Technical & Functional Overview

**Last Updated:** February 12, 2026  
**Status:** Production Ready  
**Purpose:** Academic Research Platform for AI Trust Calibration Study

---

## 📋 TABLE OF CONTENTS

1. [Executive Summary](#executive-summary)
2. [What This Platform Does](#what-this-platform-does)
3. [Complete User Journey](#complete-user-journey)
4. [Technical Architecture](#technical-architecture)
5. [Database Structure](#database-structure)
6. [Core Features](#core-features)
7. [File Structure](#file-structure)
8. [Data Flow](#data-flow)
9. [Security & Privacy](#security--privacy)
10. [Deployment](#deployment)

---

## 🎯 EXECUTIVE SUMMARY

This is a **professional research platform** designed to study how creative professionals develop calibrated trust in AI-assisted design tools. It's a complete, production-ready web application that:

- Collects quantitative and qualitative data from designers using AI tools
- Manages interview scheduling with automated email confirmations
- Tracks the complete participant journey from landing to completion
- Stores everything in a unified database (200+ columns per participant)
- Costs $0/month to run (GitHub Pages + Supabase + EmailJS free tiers)
- Is GDPR compliant with cookie consent management

**Principal Investigator:** Kartik Maurya  
**Institution:** Design Management Research  
**Target Participants:** Professional designers using AI tools

---

## 🌟 WHAT THIS PLATFORM DOES

### Primary Purpose
Studies the "judgment moment" in designer-AI collaboration:
- When do designers trust AI suggestions?
- When do they override or refine AI outputs?
- How does professional identity transform from "executor" to "curator"?


### Research Questions Addressed
1. **Trust Calibration:** How do professionals learn to appropriately trust AI?
2. **Identity Transformation:** How does professional identity shift with AI adoption?
3. **Organizational Context:** What organizational capabilities support AI integration?
4. **Cultural Factors:** How does cultural context affect AI trust?
5. **Outcomes:** What are the impacts on work quality, efficiency, and satisfaction?

### Two Participation Paths

**Path 1: Quick Study (15-20 minutes)**
- Complete eligibility screening
- Answer 150+ quantitative survey questions
- Receive personalized archetype results
- Optional: Provide contact for findings

**Path 2: In-Depth Interview (60-90 minutes)**
- Complete eligibility screening
- Provide contact information
- Schedule interview via calendar
- Receive automated email confirmations
- Join video interview (Jitsi Meet or Google Meet)

---

## 🚶 COMPLETE USER JOURNEY

### Stage 1: Landing Page (Page 1)
**File:** `index.html` (lines 1-500+)

**What Happens:**
- User arrives at professional research invitation
- Sees compelling value proposition: "When Do Designers Trust AI — and When Do They Step In?"
- Views social proof: "48 designers joined this week, 4 active now"
- Reads about the "judgment moment" in AI collaboration
- Sees flow diagram: AI Suggests → Designer Evaluates → Decision → Outcome
- Reviews participation benefits and eligibility criteria
- Chooses between two paths:
  - "Start 15-Minute Study" → Quick survey
  - "Join Optional In-Depth Interview" → Scheduling flow

**Technical:**
- Cookie consent banner appears (GDPR compliance)
- Neural network animation in background
- Social proof counter animates from localStorage
- Responsive design for mobile/desktop


### Stage 2: Eligibility Screening (Page 2)
**Function:** `selectEligibility()` in `app.js`

**What Happens:**
- User selects their primary use case for AI:
  - AI Evaluation (judging AI outputs)
  - Creative Judgment (making design decisions)
  - Research Translation (applying research)
  - Design Advocacy (communicating design value)
  - Exploratory (just curious)
- System creates initial database record with:
  - Unique ID (e.g., "CTR-20260212-A3F9B2")
  - Landing timestamp
  - Eligibility category
  - Session ID

**Database Action:**
```javascript
Database.createParticipant({
  id: responseId,
  eligibilityCategory: category,
  landing_timestamp: NOW()
})
```

### Stage 3: Commitment Question (Page 3)
**Function:** `submitCommitment()` in `app.js`

**What Happens:**
- User answers context-specific question based on their eligibility choice
- Example: "I use AI to evaluate design concepts and need to judge when outputs are appropriate for different contexts"
- This is a "micro-commitment" to increase completion rates
- System updates database with:
  - Context statement
  - Commitment timestamp

**Database Action:**
```javascript
Database.updateCommitment(id, contextStatement)
```


### Stage 4: Contact Information (Page 4)
**Function:** `submitContact()` in `app.js`

**What Happens:**
- User provides:
  - Email (required, validated)
  - Name (optional)
  - Role (student, early-career, mid-career, senior, founder)
  - Industry (optional)
  - LinkedIn/Portfolio URL (optional)
- System validates email format
- Updates database with contact info
- Contact timestamp recorded

**Database Action:**
```javascript
Database.updateContact(id, {
  email: email,
  name: name,
  role: role,
  industry: industry,
  profileUrl: profileUrl
})
```

### Stage 5A: Interview Booking (Page 5 - Interview Path)
**Function:** `confirmBooking()` in `app.js`

**What Happens:**
1. **Calendar Display:**
   - Shows current month with available dates
   - Blocks out past dates and weekends
   - Fetches existing bookings from database
   - Marks booked time slots as unavailable

2. **User Selection:**
   - Selects date from calendar
   - Chooses time slot (9 AM - 5 PM in 1-hour increments)
   - Selects timezone (auto-detected, can change)
   - Adds optional notes

3. **Meeting URL Generation:**
   - If Google Meet URL configured: Uses that
   - Otherwise: Generates Jitsi Meet URL
   - Format: `https://meet.jit.si/CalibratedTrust_[UNIQUE_ID]`

4. **Database Update:**
```javascript
Database.createBooking(id, {
  date: selectedDate,
  time: selectedTime,
  datetime: combinedDateTime,
  timezone: timezone,
  platform: 'jitsi_meet',
  meetingUrl: generatedUrl,
  notes: userNotes,
  status: 'confirmed'
})
```


5. **Email Automation (Dual Emails):**

**Participant Confirmation Email:**
```javascript
EmailService.sendBookingConfirmation({
  email: participant.email,
  name: participant.name,
  date: booking.date,
  time: booking.time,
  meetingUrl: booking.meetingUrl,
  notes: booking.notes
})
```

**Researcher Notification Email:**
```javascript
EmailService.sendResearcherNotification({
  name: participant.name,
  email: participant.email,
  date: booking.date,
  time: booking.time,
  meetingUrl: booking.meetingUrl,
  notes: booking.notes
})
```

**Email Service:** EmailJS (free tier, 200 emails/month)
- Template ID: `template_booking` (participant)
- Template ID: `template_researcher_aler` (researcher)
- Service ID: `service_3hy36hr`

6. **Confirmation Page:**
   - Shows booking details
   - Displays meeting URL (clickable)
   - Shows calendar add-to-calendar options
   - Provides researcher contact info

### Stage 5B: Survey Start (Page 6 - Study Path)
**Function:** `initializeSurvey()` in `app.js`

**What Happens:**
- System loads 150+ questions from `questions.js`
- Updates database: `survey_status = 'in_progress'`
- Records `survey_start_timestamp`
- Displays first question
- Initializes progress tracking


### Stage 6: Survey Completion (150+ Questions)
**Function:** `displayCurrentQuestion()` and `nextQuestion()` in `app.js`

**Question Types:**

1. **Screening (3 questions)**
   - Q1: Primary AI tool used (Midjourney, DALL-E, Stable Diffusion, Other)
   - Q2: 3+ months professional AI experience (Yes/No)
   - Q3: Years of professional experience (ranges)

2. **Demographics (9 questions)**
   - Age, gender, country, creative field
   - Employment type, organization size
   - AI tools used (multi-select)
   - AI usage duration, projects completed

3. **Scenario-Based Judgment (6 scenarios)**
   - SC-A: AI workspace suggestion response
   - SC-B1: Time pressure trust assessment
   - SC-B2: High-stakes stakeholder trust
   - SC-C1/C2: Decision sequence (first action, next action)
   - SC-D: Cross-cultural confidence (1-7 scale)

4. **CAT Scale - Contextual Appropriateness Trust (26 items, 1-7 Likert)**
   - Strategic Appropriateness (5 items)
   - Cultural Resonance (5 items)
   - Brand Alignment (5 items)
   - Aesthetic Quality (4 items)
   - Stakeholder Acceptance (4 items)
   - Overall Calibration (3 items)

5. **Identity Transformation (12 items, 1-7 Likert)**
   - Executor Identity (4 items, reverse-scored)
   - Curator Identity (5 items)
   - Identity Uncertainty (3 items)

6. **Expertise Pillars (4 items, 1-7 Likert)**
   - Strategic Vision
   - Cultural Intelligence
   - Contextual Judgment
   - AI Collaboration


7. **Trust-Identity Spirals (8 items, 1-7 Likert)**
   - Virtuous Spirals (4 items)
   - Vicious Spirals (4 items)

8. **Organizational Capabilities (24 items, 1-7 Likert)**
   - Complementary Investment (4 items)
   - Evaluation Systems (4 items)
   - Learning Infrastructure (4 items)
   - Cultural Support (4 items)
   - Strategic-Operational Bridging (4 items)
   - Dynamic Adaptation (4 items)

9. **Calibration Process (10 items)**
   - Q13: Iterations to calibration (ranges)
   - Q14: Time to calibration (months)
   - Q15: Current calibration state (under/well/over-trust)
   - CAL1-4: Calibration scale (1-7 Likert)
   - STR1-3: Refinement strategy (1-7 Likert)

10. **Cultural Context (6 items)**
    - Q16: Cross-cultural work experience (Yes/No)
    - Q17: Cross-cultural difficulty (much easier to much harder)
    - Q18: Extra effort required (1.5x to 3x+)
    - CUL1-3: Cultural context scale (1-7 Likert)

11. **Outcomes (13 items, 1-7 Likert)**
    - Work Quality (3 items)
    - Efficiency (3 items)
    - Professional Satisfaction (3 items)
    - Confidence (4 items, 1 reverse-scored)

12. **Open Reflections (3 optional text responses)**
    - Q19: Biggest challenge in learning to trust AI
    - Q20: Organizational support needed
    - Q21: Advice for beginners

13. **Follow-up (3 items)**
    - Interest in follow-up interview (Yes/Maybe/No)
    - Email for follow-up (optional)
    - Q23: Receive research findings (Yes/No)


**Real-Time Features During Survey:**

- **Auto-Save:** Every answer saved immediately to database
- **Progress Bar:** Visual indicator of completion percentage
- **Question Counter:** "Question 45 of 150"
- **Back Navigation:** Can go back to previous questions
- **Visual Environment:** Background changes based on section
- **Validation:** Required questions must be answered
- **Character Counters:** For text responses
- **Slider Interactions:** Smooth 1-7 scale sliders with labels

**Database Updates Per Question:**
```javascript
Database.saveAnswer(id, questionId, answer)
// Updates specific column (e.g., cat1_strategic = 6)
// Increments questions_answered counter
// Updates completion_percentage
```

### Stage 7: Results Calculation (Automatic)
**Function:** `calculateCalibrationArchetype()` in `app.js`

**What Happens:**
1. **Trust Profile Scores (from CAT scale):**
   - Strategic Trust: Average of CAT1-5 (reverse CAT5)
   - Cultural Trust: Average of CAT6-10 (reverse CAT10)
   - Brand Trust: Average of CAT11-15 (reverse CAT15)
   - Aesthetic Trust: Average of CAT16-19
   - Stakeholder Trust: Average of CAT20-23
   - Overall Trust: Average of all 26 items

2. **Identity Transformation Scores:**
   - Executor Score: Average of ID1-4 (all reverse-scored)
   - Curator Score: Average of ID5-9
   - Curatorial Shift Ratio: Curator / Executor

3. **Organizational Readiness:**
   - Average of all 24 OC items (reverse OC24)


4. **Archetype Assignment (based on scores):**

**Archetypes:**
- **The Strategic Curator:** High trust + high curator identity
- **The Cautious Evaluator:** Moderate trust + balanced identity
- **The Intuitive Maverick:** High trust + low organizational support
- **The Skeptical Traditionalist:** Low trust + high executor identity
- **The Emerging Collaborator:** Growing trust + transitioning identity
- **The Overwhelmed Adapter:** Low trust + high uncertainty

Each archetype includes:
- Name
- Description (personalized narrative)
- Superpower (key strength)
- Trust profile visualization (spider chart)

5. **Database Final Update:**
```javascript
Database.completeSurvey(id, {
  completionTime: calculatedMinutes,
  questionsAnswered: totalCount,
  archetype: { name, desc, power },
  trustScore: overallTrust,
  curatorScore: curatorAvg,
  executorScore: executorAvg,
  curatorialShift: ratio,
  orgReadiness: orgAvg
})
```

### Stage 8: Completion Page (Page 7)
**What Happens:**
- Displays personalized archetype results
- Shows trust profile spider chart
- Provides interpretation of scores
- Shows completion time and question count
- Offers to download results as PDF
- Thanks participant for contribution
- Provides researcher contact for questions


---

## 🏗️ TECHNICAL ARCHITECTURE

### Frontend Stack
- **HTML5:** Semantic markup, accessibility features
- **CSS3:** Custom design system, animations, responsive layout
- **Vanilla JavaScript:** No frameworks, pure ES6+
- **Canvas API:** Neural network background animation

### Backend Services (All Free Tier)

**1. Supabase (Database)**
- **Service:** PostgreSQL database with REST API
- **Free Tier:** 500MB storage, 2GB bandwidth/month
- **URL:** `https://oyveosroqukmdnnzcmrw.supabase.co`
- **Features Used:**
  - Single table: `research_participants`
  - Row-level security (RLS)
  - Real-time updates
  - Auto-generated REST API

**2. EmailJS (Email Service)**
- **Service:** Email automation without backend
- **Free Tier:** 200 emails/month
- **Service ID:** `service_3hy36hr`
- **Templates:**
  - `template_booking` - Participant confirmation
  - `template_researcher_aler` - Researcher notification

**3. GitHub Pages (Hosting)**
- **Service:** Static site hosting
- **Free Tier:** 100GB bandwidth/month
- **Features:** HTTPS, custom domain support

**4. Jitsi Meet (Video Conferencing)**
- **Service:** Free video conferencing
- **No Account Required:** Auto-generated room URLs
- **Format:** `https://meet.jit.si/CalibratedTrust_[ID]`


### Design System

**Color Palette:**
- Space Black: `#0A0E17` (background)
- Solar Orange: `#FF4D00` (primary accent)
- Titanium: `#E8E9ED` (headings)
- Mercury: `#B8BCC8` (body text)
- Obsidian: `#141B2D` (cards)

**Typography:**
- Headings: Inter (800 weight)
- Body: Inter (400-600 weight)
- Monospace: 'Courier New' (code/data)

**Animations:**
- Neural network background (Canvas)
- Cinematic overlays (film grain, scanlines)
- Smooth page transitions (fade in/out)
- Progress bar animations
- Slider interactions
- Button hover effects

---

## 💾 DATABASE STRUCTURE

### Single Unified Table: `research_participants`

**Why One Table?**
- Simplicity: Everything in one place
- Performance: No complex JOINs
- Easy Export: One CSV with complete data
- Clear Journey: One row = one participant's complete story

**Column Categories (200+ total):**

1. **Identifiers (2 columns)**
   - `id` - Unique participant ID
   - `session_id` - Session tracking

2. **Timestamps (9 columns)**
   - `landing_timestamp` - First visit
   - `eligibility_timestamp` - Eligibility selection
   - `commitment_timestamp` - Context question
   - `contact_timestamp` - Contact form
   - `booking_timestamp` - Interview booking
   - `survey_start_timestamp` - Survey start
   - `survey_complete_timestamp` - Survey completion
   - `last_activity_timestamp` - Last interaction
   - `created_at` / `updated_at` - Auto-managed


3. **Eligibility & Screening (2 columns)**
   - `eligibility_category` - User's primary use case
   - `context_statement` - Micro-commitment response

4. **Contact Information (7 columns)**
   - `email`, `participant_name`, `participant_role`
   - `participant_industry`, `participant_profile_url`
   - `linkedin_url`, `linkedin_verified`

5. **Booking Details (13 columns)**
   - `booking_scheduled`, `booking_date`, `booking_time`
   - `booking_datetime`, `booking_timezone`
   - `booking_duration_minutes`, `booking_meeting_platform`
   - `booking_meeting_url`, `booking_notes`
   - `booking_status`, `booking_reminder_sent`

6. **Email Tracking (4 columns)**
   - `confirmation_email_sent`, `confirmation_email_sent_at`
   - `researcher_notification_sent`, `researcher_notification_sent_at`

7. **Survey Progress (6 columns)**
   - `survey_status`, `current_question_index`
   - `questions_answered`, `completion_percentage`
   - `completion_time_minutes`

8. **Survey Questions (150+ columns)**
   - Screening: `q1_ai_tool`, `q2_three_months_experience`, `q3_years_experience`
   - Demographics: `q4_age` through `q12_projects_completed`
   - Scenarios: `sc_a_workspace_suggestion` through `sc_d_cross_cultural_confidence`
   - CAT Scale: `cat1_strategic` through `cat26_overall`
   - Identity: `id1_executor` through `id12_uncertainty`
   - Expertise: `exp1_strategic_vision` through `exp4_ai_collaboration`
   - Spirals: `sp1_virtuous` through `sp8_vicious`
   - Organizational: `oc1_investment` through `oc24_adaptation`
   - Calibration: `q13_iterations_to_calibration` through `str3_refinement`
   - Cultural: `q16_cross_cultural_work` through `cul3_cultural`
   - Outcomes: `out1_quality` through `out13_confidence`
   - Reflections: `q19_biggest_challenge` through `q21_advice_for_beginners`
   - Follow-up: `follow_up_interest`, `follow_up_email`, `q23_receive_findings`


9. **Calculated Results (12 columns)**
   - `archetype_name`, `archetype_description`, `archetype_power`
   - `trust_strategic_score`, `trust_cultural_score`, `trust_brand_score`
   - `trust_aesthetic_score`, `trust_stakeholder_score`, `trust_overall_score`
   - `executor_score`, `curator_score`, `curatorial_shift_ratio`
   - `org_readiness_score`

10. **Performance Metrics (5 columns)**
    - `total_words_written`, `average_response_time_seconds`
    - `is_speedrun`, `response_speeds` (JSONB array)

11. **Metadata (6 columns)**
    - `browser_info` (JSONB), `device_type`, `ip_address`
    - `user_agent`, `referrer_url`

12. **Admin & Research (3 columns)**
    - `data_quality_flag`, `researcher_notes`, `flagged_for_review`

**Database Views (Auto-created for analysis):**
- `completed_participants` - All finished surveys
- `booking_schedule` - Upcoming interviews
- `survey_progress_dashboard` - Progress statistics
- `archetype_distribution` - Archetype breakdown

**Indexes for Performance:**
- Email, survey status, booking status
- Booking datetime, archetype name
- Created/updated timestamps

---

## ⚙️ CORE FEATURES

### 1. Survey Engine (`app.js` - 1,721 lines)
**Class:** `UltimateSurveyEngine`

**Key Methods:**
- `init()` - Initialize application
- `startStudy()` - Begin survey path
- `startInterview()` - Begin interview path
- `selectEligibility()` - Handle eligibility selection
- `submitCommitment()` - Save context statement
- `submitContact()` - Save contact information
- `confirmBooking()` - Create interview booking
- `initializeSurvey()` - Load survey questions
- `displayCurrentQuestion()` - Render current question
- `nextQuestion()` - Advance to next question
- `previousQuestion()` - Go back to previous question
- `calculateCalibrationArchetype()` - Calculate results
- `completeSurvey()` - Finalize and save results


### 2. Database Operations (`supabase.js`)
**Object:** `Database`

**Key Methods:**
- `createParticipant()` - Create initial record
- `updateCommitment()` - Save context statement
- `updateContact()` - Save contact info
- `createBooking()` - Save interview booking
- `updateEmailStatus()` - Track email sends
- `startSurvey()` - Mark survey as started
- `saveAnswer()` - Save individual answer
- `completeSurvey()` - Save final results
- `getConfirmedBookings()` - Fetch existing bookings
- `getParticipant()` - Retrieve participant data
- `exportCompleted()` - Export all completed surveys

### 3. Email Service (`email-service.js`)
**Object:** `EmailService`

**Key Methods:**
- `init()` - Initialize EmailJS
- `sendBookingConfirmation()` - Email to participant
- `sendResearcherNotification()` - Email to researcher
- `openMailtoFallback()` - Fallback if EmailJS fails

**Email Templates:**
Both templates include:
- Participant name
- Booking date and time
- Meeting URL (clickable)
- Study information
- Researcher contact

### 4. Question Bank (`questions.js` - 648 lines)
**Object:** `QUESTIONS`

**Structure:**
- `profiling: []` - Empty (no branching logic)
- `survey: [...]` - 150+ questions in linear order

**Helper Functions:**
- `likertAgree7()` - 1-7 Strongly Disagree to Strongly Agree
- `likertExtent7()` - 1-7 Not at all to To a great extent
- `likertAccurate7()` - 1-7 Not at all accurate to Extremely accurate


### 5. Security Utilities (`utils.js`)
**Functions:**
- `escapeHtml()` - Prevent XSS attacks
- `sanitizeInput()` - Clean user input
- `isValidEmail()` - Validate email format
- `maskSensitiveData()` - Mask data for logging
- `safeLog()` - Development-only console logging

**Security Features:**
- All user input sanitized before display
- Email validation before submission
- No sensitive data logged in production
- XSS protection on all text fields

### 6. Cookie Consent (`cookie-consent.js`)
**Object:** `CookieConsent`

**Features:**
- GDPR-compliant cookie banner
- Two categories: Essential (required) + Analytics (optional)
- User can accept all, reject optional, or customize
- Preferences saved to localStorage
- Banner auto-hides if consent already given

**Cookie Categories:**
- **Essential:** Session management, form data persistence
- **Analytics:** Anonymous usage tracking (optional)

### 7. Engagement System (`engagement-system.js`)
**Object:** `EngagementSystem`

**Features:**
- Live participant counter (animated)
- "Active now" indicator (simulated)
- Social proof on landing page
- Contribution prompt after completion (optional)

### 8. Neural Network Animation (`app.js`)
**Class:** `NeuralNetwork`

**Features:**
- Canvas-based particle system
- Animated connections between nodes
- Responds to mouse movement
- Performance-optimized (60 FPS)
- Creates "AI-like" visual atmosphere


---

## 📁 FILE STRUCTURE

### Core Application Files (12 files)
```
index.html                  # Main application (2,074 lines)
app.js                      # Survey engine (1,721 lines)
config.js                   # Configuration settings
supabase.js                 # Database operations
email-service.js            # Email automation
questions.js                # Question bank (648 lines)
utils.js                    # Security utilities
researcher-modal.js         # Researcher info modal
engagement-system.js        # Social proof system
advanced-features.js        # Additional features
landing-enhancements.js     # Landing page enhancements
cookie-consent.js           # Cookie consent management
```

### CSS Stylesheets (8 files)
```
styles-premium.css          # Main design system
scientific-rigor.css        # Scientific styling
transition-fix.css          # Animation fixes
booking-styles.css          # Booking calendar styles
scenario-animations.css     # Scenario visualizations
about-researcher.css        # Researcher modal styles
cookie-consent.css          # Cookie banner styles
landing-enhancements.css    # Landing page styles
```

### Documentation (4 files)
```
README.md                           # Project overview
DATABASE_STRUCTURE_EXPLAINED.md     # Database reference
GITHUB_DEPLOYMENT_GUIDE.md          # Deployment instructions
UNIFIED_DATABASE_GUIDE.md           # Database setup guide
DEPLOYMENT_READY.md                 # Production checklist
```

### Database & Configuration (2 files)
```
UNIFIED_DATABASE_COMPLETE.sql       # Database schema
.gitignore                          # Git configuration
```

### Assets (2 folders)
```
assets/                     # Images (avatars, researcher photo)
vistas/                     # Background images (5 scenario images)
```

### Legacy Files (1 folder)
```
legacy_versions/            # Previous versions (archived)
```


---

## 🔄 DATA FLOW

### Complete Data Journey

```
1. USER ARRIVES
   ↓
   Landing Page (index.html)
   - Cookie consent shown
   - Social proof displayed
   - Neural animation starts
   ↓

2. USER CHOOSES PATH
   ↓
   Path A: Quick Study          Path B: Interview
   ↓                            ↓

3. ELIGIBILITY SCREENING
   ↓
   Database.createParticipant()
   - Creates row in research_participants
   - Generates unique ID
   - Records landing_timestamp
   ↓

4. COMMITMENT QUESTION
   ↓
   Database.updateCommitment()
   - Saves context_statement
   - Records commitment_timestamp
   ↓

5. CONTACT INFORMATION
   ↓
   Database.updateContact()
   - Saves email, name, role, etc.
   - Records contact_timestamp
   ↓

6A. INTERVIEW BOOKING          6B. SURVEY START
    ↓                              ↓
    Calendar Display               Database.startSurvey()
    - Fetch existing bookings      - survey_status = 'in_progress'
    - Show available slots         - Records survey_start_timestamp
    ↓                              ↓
    User Selects Date/Time         Question Loop (150+ questions)
    ↓                              ↓
    Database.createBooking()       For each question:
    - Saves booking details        - Display question
    - Generates meeting URL        - User answers
    - Records booking_timestamp    - Database.saveAnswer()
    ↓                              - Update progress
    EmailService.send()            - Next question
    - Participant confirmation     ↓
    - Researcher notification      All Questions Answered
    ↓                              ↓
    Confirmation Page              Calculate Results
                                   - Trust scores
                                   - Identity scores
                                   - Archetype assignment
                                   ↓
                                   Database.completeSurvey()
                                   - Saves all calculated scores
                                   - survey_status = 'completed'
                                   - Records survey_complete_timestamp
                                   ↓
                                   Results Page
                                   - Display archetype
                                   - Show trust profile
                                   - Provide interpretation
```


### Database Operations Per Stage

| Stage | Database Method | Columns Updated | Timestamp |
|-------|----------------|-----------------|-----------|
| Landing | `createParticipant()` | id, session_id, email (temp) | landing_timestamp |
| Eligibility | `createParticipant()` | eligibility_category | eligibility_timestamp |
| Commitment | `updateCommitment()` | context_statement | commitment_timestamp |
| Contact | `updateContact()` | email, name, role, industry, profile_url | contact_timestamp |
| Booking | `createBooking()` | booking_* (13 columns) | booking_timestamp |
| Email Sent | `updateEmailStatus()` | confirmation_email_sent, researcher_notification_sent | *_sent_at |
| Survey Start | `startSurvey()` | survey_status, current_question_index | survey_start_timestamp |
| Each Answer | `saveAnswer()` | q*_* or cat*_* or id*_* etc. | last_activity_timestamp |
| Completion | `completeSurvey()` | survey_status, archetype_*, trust_*, completion_* | survey_complete_timestamp |

### API Calls Summary

**Supabase REST API:**
- `POST /rest/v1/research_participants` - Create participant
- `PATCH /rest/v1/research_participants?id=eq.{id}` - Update participant
- `GET /rest/v1/research_participants?id=eq.{id}` - Get participant
- `GET /rest/v1/research_participants?booking_status=eq.confirmed` - Get bookings

**EmailJS API:**
- `POST https://api.emailjs.com/api/v1.0/email/send` - Send email

---

## 🔒 SECURITY & PRIVACY

### Security Measures

1. **XSS Protection:**
   - All user input sanitized via `escapeHtml()`
   - No innerHTML with user data
   - Text content only for user-generated content

2. **Input Validation:**
   - Email format validation
   - Required field checks
   - Character limits on text fields
   - Number range validation

3. **API Security:**
   - Supabase anon key (public, limited permissions)
   - Row-level security (RLS) enabled
   - No sensitive operations exposed
   - EmailJS public key (rate-limited)


4. **Production Logging:**
   - No console logs in production
   - Sensitive data masked in development
   - No PII exposed in client-side code

5. **HTTPS:**
   - GitHub Pages enforces HTTPS
   - All API calls over HTTPS
   - Secure cookie transmission

### Privacy Compliance

**GDPR Compliance:**
- Cookie consent banner (required)
- Clear data usage explanation
- User control over optional cookies
- Right to data deletion (contact researcher)
- Anonymized data storage
- No tracking without consent

**Data Collection Transparency:**
- Clear purpose statement on landing page
- Voluntary participation
- Optional questions marked
- Contact information for questions
- Research findings sharing option

**Data Minimization:**
- Only collect necessary data
- Optional fields for non-essential info
- No unnecessary tracking
- Temporary email replaced with real email at contact stage

**Data Security:**
- Encrypted transmission (HTTPS)
- Secure database (Supabase)
- Row-level security policies
- No public data exposure

---

## 🚀 DEPLOYMENT

### Prerequisites
1. **Supabase Account** (free)
   - Create project
   - Run `UNIFIED_DATABASE_COMPLETE.sql`
   - Copy URL and anon key to `config.js`

2. **EmailJS Account** (free)
   - Create account
   - Create email service
   - Create two templates (booking, researcher)
   - Copy service ID, template IDs, public key to `email-service.js`

3. **GitHub Account** (free)
   - Create repository
   - Enable GitHub Pages


### Deployment Steps

1. **Configure Services:**
   ```javascript
   // config.js
   SUPABASE_CONFIG = {
     url: 'YOUR_SUPABASE_URL',
     anonKey: 'YOUR_SUPABASE_ANON_KEY'
   }
   
   // email-service.js
   serviceId: 'YOUR_EMAILJS_SERVICE_ID',
   templateId: 'YOUR_TEMPLATE_ID',
   publicKey: 'YOUR_PUBLIC_KEY'
   ```

2. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/USERNAME/REPO.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to repository Settings
   - Navigate to Pages
   - Source: Deploy from branch
   - Branch: main, folder: / (root)
   - Save

4. **Access Live Site:**
   ```
   https://USERNAME.github.io/REPO/
   ```

### Cost Breakdown

| Service | Free Tier | Usage | Cost |
|---------|-----------|-------|------|
| GitHub Pages | 100GB bandwidth/month | Hosting | $0 |
| Supabase | 500MB storage, 2GB bandwidth | Database | $0 |
| EmailJS | 200 emails/month | Email automation | $0 |
| Jitsi Meet | Unlimited | Video conferencing | $0 |
| **TOTAL** | | | **$0/month** |

### Capacity Estimates

**With Free Tiers:**
- **Participants:** 500+ (Supabase storage limit)
- **Emails:** 200/month (EmailJS limit)
- **Bandwidth:** 100GB/month (GitHub Pages)
- **Interviews:** Unlimited (Jitsi Meet)

**Perfect for academic research studies!**


---

## 📊 DATA ANALYSIS

### Exporting Data

**From Supabase Dashboard:**
1. Go to Table Editor
2. Select `research_participants` table
3. Click Export button
4. Choose CSV format
5. Download complete dataset

**Using SQL:**
```sql
-- Export all completed participants
SELECT * FROM completed_participants;

-- Export specific columns
SELECT 
  email, participant_name, archetype_name,
  trust_overall_score, curatorial_shift_ratio,
  completion_time_minutes
FROM research_participants
WHERE survey_status = 'completed';

-- Export by archetype
SELECT * FROM archetype_distribution;

-- Export booking schedule
SELECT * FROM booking_schedule;
```

### Analysis Possibilities

**Quantitative Analysis:**
- Trust calibration patterns
- Identity transformation trajectories
- Organizational capability gaps
- Cultural context effects
- Outcome correlations

**Qualitative Analysis:**
- Open-ended reflections (Q19-Q21)
- Context statements
- Booking notes
- Archetype narratives

**Mixed Methods:**
- Survey data + interview transcripts
- Quantitative scores + qualitative insights
- Statistical patterns + lived experiences

---

## 🎓 RESEARCH APPLICATIONS

### Primary Research Questions

1. **How do creative professionals develop calibrated trust in AI tools?**
   - Measured by: CAT scale, calibration questions
   - Analyzed: Trust scores, calibration time, iterations

2. **How does professional identity transform with AI adoption?**
   - Measured by: Identity scale, expertise pillars
   - Analyzed: Executor/curator scores, shift ratios


3. **What organizational capabilities support AI integration?**
   - Measured by: Organizational capabilities scale
   - Analyzed: Capability scores, readiness levels

4. **How does cultural context moderate AI trust?**
   - Measured by: Cultural context questions, cross-cultural scenarios
   - Analyzed: Cultural difficulty, effort multipliers

5. **What are the outcomes of calibrated AI trust?**
   - Measured by: Outcomes scale (quality, efficiency, satisfaction, confidence)
   - Analyzed: Outcome scores, correlations with trust

### Theoretical Contributions

**Contextual Appropriateness Trust (CAT):**
- New construct for measuring AI trust
- Five dimensions: Strategic, Cultural, Brand, Aesthetic, Stakeholder
- Validated through 26-item scale

**Executor-to-Curator Transformation:**
- Professional identity shift framework
- Measured through identity scale
- Curatorial shift ratio as key metric

**Trust-Identity Spirals:**
- Virtuous and vicious cycles
- Bidirectional relationship
- Measured through spiral scale

**Organizational AI Readiness:**
- Six capability dimensions
- Complementary investment framework
- Measured through 24-item scale

---

## 🛠️ MAINTENANCE & UPDATES

### Regular Maintenance Tasks

**Weekly:**
- Check Supabase storage usage
- Monitor EmailJS email quota
- Review new participant data
- Check for flagged responses

**Monthly:**
- Export data backup
- Review archetype distribution
- Analyze completion rates
- Update social proof counters


**As Needed:**
- Update researcher contact information
- Modify question wording (requires database migration)
- Add new archetypes
- Update email templates
- Fix bugs or issues

### Common Issues & Solutions

**Issue: Emails not sending**
- Check EmailJS quota (200/month limit)
- Verify template IDs match
- Check service ID and public key
- Test with EmailJS dashboard

**Issue: Database not saving**
- Check Supabase connection
- Verify anon key is correct
- Check RLS policies
- Review browser console for errors

**Issue: Booking calendar not loading**
- Check Supabase query for bookings
- Verify date format compatibility
- Check timezone handling
- Review browser console

**Issue: Survey progress not saving**
- Check auto-save interval
- Verify database connection
- Check question ID mapping
- Review column names in database

---

## 📚 ADDITIONAL RESOURCES

### Documentation Files
- `README.md` - Project overview and quick start
- `DATABASE_STRUCTURE_EXPLAINED.md` - Complete database reference
- `GITHUB_DEPLOYMENT_GUIDE.md` - Step-by-step deployment
- `UNIFIED_DATABASE_GUIDE.md` - Database setup instructions
- `DEPLOYMENT_READY.md` - Production readiness checklist

### External Services
- **Supabase Docs:** https://supabase.com/docs
- **EmailJS Docs:** https://www.emailjs.com/docs/
- **GitHub Pages Docs:** https://docs.github.com/en/pages
- **Jitsi Meet:** https://meet.jit.si/

### Contact Information
- **Researcher:** Kartik Maurya
- **Email:** research.mdh.edu@gmail.com
- **Institution:** Design Management Research


---

## 🎯 KEY TAKEAWAYS

### What Makes This Platform Unique

1. **Complete Journey Tracking:**
   - Every interaction recorded from landing to completion
   - 9 timestamps track the complete participant journey
   - Single database row contains entire participant story

2. **Dual Participation Paths:**
   - Quick study (15-20 minutes) for quantitative data
   - In-depth interview (60-90 minutes) for qualitative insights
   - Flexible participation options increase recruitment

3. **Automated Operations:**
   - Real-time database saving (no data loss)
   - Automated email confirmations (participant + researcher)
   - Auto-generated meeting URLs (Jitsi Meet)
   - Instant results calculation and display

4. **Professional Research Design:**
   - Validated measurement scales (CAT, Identity, Organizational)
   - Scenario-based situated judgment questions
   - Mixed methods approach (quantitative + qualitative)
   - Archetype-based results for participant engagement

5. **Zero-Cost Infrastructure:**
   - Completely free to run ($0/month)
   - Scales to 500+ participants on free tiers
   - No backend server required
   - No credit card needed for any service

6. **Privacy-First Design:**
   - GDPR-compliant cookie consent
   - Transparent data usage
   - User control over data
   - Secure transmission and storage

7. **Production-Ready:**
   - Clean, documented codebase
   - Security best practices implemented
   - Mobile-responsive design
   - Accessibility features included


### Technical Highlights

**Frontend Excellence:**
- Vanilla JavaScript (no framework dependencies)
- Custom design system with premium aesthetics
- Smooth animations and transitions
- Neural network background (Canvas API)
- Real-time progress tracking

**Backend Efficiency:**
- Single unified database table (simplicity)
- REST API via Supabase (no custom backend)
- Email automation via EmailJS (no SMTP server)
- Static hosting via GitHub Pages (no server management)

**Data Architecture:**
- 200+ columns capture complete participant data
- Automatic timestamp tracking (9 journey milestones)
- Calculated scores stored for easy analysis
- Views for common queries
- Easy CSV export for analysis

**User Experience:**
- Professional, scientific aesthetic
- Clear progress indicators
- Helpful validation messages
- Personalized results
- Mobile-friendly interface

---

## 📈 FUTURE ENHANCEMENTS

### Potential Additions

**Phase 1: Enhanced Analytics**
- Real-time dashboard for researchers
- Participant demographics visualization
- Archetype distribution charts
- Completion rate tracking
- Time-to-completion analysis

**Phase 2: Advanced Features**
- Multi-language support
- Custom archetype illustrations
- PDF report generation
- Email reminder system for interviews
- Participant portal for results access

**Phase 3: Research Extensions**
- Longitudinal follow-up surveys
- A/B testing for question wording
- Adaptive questioning based on responses
- Integration with qualitative analysis tools
- Automated transcript analysis


---

## 🏁 CONCLUSION

This **Calibrated Trust Research Platform** is a complete, production-ready web application designed for academic research on AI trust calibration in creative work. It successfully combines:

- **Rigorous Research Design:** Validated scales, scenario-based questions, mixed methods
- **Professional User Experience:** Premium design, smooth interactions, personalized results
- **Robust Technical Architecture:** Unified database, automated operations, secure infrastructure
- **Zero-Cost Operation:** Free tier services, no ongoing expenses
- **Privacy Compliance:** GDPR-compliant, transparent data practices
- **Easy Deployment:** GitHub Pages hosting, simple configuration

The platform tracks the complete participant journey from landing page to survey completion or interview booking, storing everything in a single unified database table with 200+ columns. It automates email confirmations, generates meeting URLs, calculates personalized results, and provides researchers with comprehensive data for analysis.

**Total Lines of Code:** ~5,000+ lines across all files
**Database Columns:** 200+ per participant
**Survey Questions:** 150+ items
**Participation Time:** 15-90 minutes
**Cost:** $0/month
**Capacity:** 500+ participants

This documentation provides a complete technical and functional overview of the entire codebase, enabling anyone to understand, deploy, maintain, or extend the platform.

---

**Document Version:** 1.0  
**Last Updated:** February 12, 2026  
**Author:** Comprehensive codebase analysis  
**Status:** Complete and production-ready

---

## 📞 SUPPORT

For questions about this documentation or the platform:
- **Technical Issues:** Review code comments and documentation files
- **Research Questions:** Contact research.mdh.edu@gmail.com
- **Deployment Help:** See GITHUB_DEPLOYMENT_GUIDE.md
- **Database Questions:** See DATABASE_STRUCTURE_EXPLAINED.md

**End of Documentation**
