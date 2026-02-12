# 📊 PROJECT SUMMARY - Quick Overview

## What Is This?

A **professional research platform** that studies how designers develop trust in AI tools. It's a complete web application that collects survey data and schedules interviews with creative professionals.

---

## What It Does (Simple Version)

1. **Landing Page:** Invites designers to participate in research
2. **Eligibility Check:** Confirms they use AI tools professionally
3. **Two Paths:**
   - **Quick Study:** 15-minute survey with 150+ questions
   - **Interview:** Schedule 60-90 minute video call
4. **Data Collection:** Everything saved to database automatically
5. **Results:** Personalized "archetype" based on their answers
6. **Automation:** Emails sent automatically, meetings scheduled

---

## Key Numbers

- **5,000+** lines of code
- **200+** database columns per participant
- **150+** survey questions
- **$0/month** to run (completely free)
- **500+** participant capacity on free tiers
- **15-90 minutes** participation time

---

## Technology Stack

**Frontend:**
- HTML5, CSS3, Vanilla JavaScript
- No frameworks, pure web technologies

**Backend Services (All Free):**
- **Supabase:** Database (PostgreSQL)
- **EmailJS:** Email automation
- **GitHub Pages:** Website hosting
- **Jitsi Meet:** Video conferencing

---

## Main Features

✅ Complete participant journey tracking (9 timestamps)
✅ Automated email confirmations (participant + researcher)
✅ Interview scheduling with calendar
✅ Real-time data saving (no data loss)
✅ Personalized results with archetypes
✅ GDPR-compliant cookie consent
✅ Mobile-responsive design
✅ Security features (XSS protection, input validation)

---

## File Structure (Simplified)


**Core Files:**
- `index.html` - Main application (2,074 lines)
- `app.js` - Survey engine (1,721 lines)
- `questions.js` - Question bank (648 lines)
- `supabase.js` - Database operations
- `email-service.js` - Email automation
- `config.js` - Configuration

**Styling:**
- 8 CSS files for design system

**Documentation:**
- README, deployment guides, database docs

---

## User Journey (Step-by-Step)

### Path A: Quick Study
1. Land on website → See invitation
2. Select eligibility category → Database record created
3. Answer context question → Commitment recorded
4. Provide contact info → Email saved
5. Start survey → 150+ questions
6. Complete survey → Results calculated
7. See personalized archetype → Done!

### Path B: Interview
1. Land on website → See invitation
2. Select eligibility category → Database record created
3. Answer context question → Commitment recorded
4. Provide contact info → Email saved
5. Choose date/time → Calendar displayed
6. Confirm booking → Meeting URL generated
7. Receive emails → Participant + researcher notified
8. Join interview → Video call at scheduled time

---

## Database Structure (Simplified)

**One Table:** `research_participants`

**Contains:**
- Identifiers (ID, session)
- Timestamps (9 journey milestones)
- Contact info (email, name, role)
- Booking details (date, time, meeting URL)
- Survey answers (150+ questions)
- Calculated results (archetype, trust scores)
- Metadata (browser, device, timestamps)

**Why One Table?**
- Simple to understand
- Easy to export (one CSV)
- Fast queries (no JOINs)
- Complete participant story in one row

---

## Research Questions Studied

1. **Trust Calibration:** How do designers learn to trust AI appropriately?
2. **Identity Shift:** How does professional identity change (executor → curator)?
3. **Organizational Support:** What helps organizations integrate AI?
4. **Cultural Context:** How does culture affect AI trust?
5. **Outcomes:** What are the impacts on work quality and satisfaction?

---

## Measurement Scales

**CAT Scale (26 items):** Contextual Appropriateness Trust
- Strategic, Cultural, Brand, Aesthetic, Stakeholder dimensions

**Identity Scale (12 items):** Professional Identity Transformation
- Executor identity, Curator identity, Uncertainty

**Organizational Scale (24 items):** Organizational AI Readiness
- Investment, Evaluation, Learning, Culture, Strategy, Adaptation

**Outcomes Scale (13 items):** Work Outcomes
- Quality, Efficiency, Satisfaction, Confidence

---

## Archetypes (Results)

Based on survey answers, participants receive one of these archetypes:

1. **The Strategic Curator** - High trust + strong curator identity
2. **The Cautious Evaluator** - Moderate trust + balanced approach
3. **The Intuitive Maverick** - High trust + low organizational support
4. **The Skeptical Traditionalist** - Low trust + strong executor identity
5. **The Emerging Collaborator** - Growing trust + transitioning identity
6. **The Overwhelmed Adapter** - Low trust + high uncertainty

Each includes:
- Personalized description
- Trust profile visualization
- Key strengths ("superpower")

---

## Deployment (Quick Version)

1. **Setup Supabase:**
   - Create account
   - Run SQL schema
   - Copy credentials to config.js

2. **Setup EmailJS:**
   - Create account
   - Create email templates
   - Copy credentials to email-service.js

3. **Deploy to GitHub Pages:**
   - Push code to GitHub
   - Enable Pages in settings
   - Live in ~5 minutes

**Total Setup Time:** ~30 minutes
**Total Cost:** $0/month

---

## Security & Privacy

✅ HTTPS encryption (automatic)
✅ XSS protection (input sanitization)
✅ Email validation
✅ GDPR-compliant cookie consent
✅ No sensitive data in logs
✅ Row-level security in database
✅ Transparent data usage

---

## Data Export & Analysis

**Export Options:**
- CSV from Supabase dashboard
- SQL queries for specific data
- Pre-built views for common analyses

**Analysis Possibilities:**
- Trust calibration patterns
- Identity transformation trajectories
- Organizational capability gaps
- Cultural context effects
- Outcome correlations
- Archetype distributions

---

## Why This Platform Is Special

1. **Complete Solution:** Everything needed for research study
2. **Zero Cost:** Runs entirely on free tiers
3. **Professional Quality:** Premium design and UX
4. **Automated:** Emails, scheduling, calculations all automatic
5. **Privacy-First:** GDPR compliant, transparent
6. **Easy to Deploy:** No backend server needed
7. **Well-Documented:** Comprehensive guides included

---

## Quick Stats

| Metric | Value |
|--------|-------|
| Total Files | 35+ files |
| Lines of Code | 5,000+ |
| Survey Questions | 150+ |
| Database Columns | 200+ |
| Participation Time | 15-90 min |
| Monthly Cost | $0 |
| Participant Capacity | 500+ |
| Email Capacity | 200/month |
| Setup Time | 30 minutes |

---

## Contact & Support

**Researcher:** Kartik Maurya  
**Email:** research.mdh.edu@gmail.com  
**Institution:** Design Management Research

**Documentation:**
- `COMPLETE_PROJECT_DOCUMENTATION.md` - Full technical details
- `README.md` - Project overview
- `GITHUB_DEPLOYMENT_GUIDE.md` - Deployment steps
- `DATABASE_STRUCTURE_EXPLAINED.md` - Database reference

---

**This is a production-ready, professional research platform that costs nothing to run and can handle hundreds of participants. Perfect for academic research!**
