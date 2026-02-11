# 🎯 UNIFIED DATABASE - Complete Setup Guide

## What This Does

Creates **ONE comprehensive table** that records EVERYTHING about each participant's journey from landing page to completion.

---

## 📊 What Gets Recorded

### 1. **Journey Timestamps** (9 timestamps)
- Landing page visit
- Eligibility selection
- Commitment (context question)
- Contact form submission
- Booking creation
- Survey start
- Survey completion
- Last activity
- Created/Updated timestamps

### 2. **Eligibility & Screening**
- Eligibility category (5 options)
- Context statement (micro-commitment)

### 3. **Contact Information**
- Email (required)
- Name
- Role (student, early-career, mid-career, senior, founder)
- Industry
- Profile URL (LinkedIn/portfolio)

### 4. **Identity Linkage**
- LinkedIn URL
- LinkedIn name
- LinkedIn avatar
- LinkedIn verified status

### 5. **Interview Booking** (13 fields)
- Booking scheduled (yes/no)
- Date, time, datetime
- Timezone
- Duration
- Meeting platform (Jitsi/Google Meet)
- Meeting URL
- Notes
- Status (pending, confirmed, completed, cancelled, no_show)
- Reminder sent status

### 6. **Email Tracking** (4 fields)
- Confirmation email sent (yes/no + timestamp)
- Researcher notification sent (yes/no + timestamp)

### 7. **Survey Progress** (6 fields)
- Survey status (not_started, in_progress, completed, abandoned)
- Current question index
- Questions answered count
- Completion percentage
- Completion time (minutes)

### 8. **All Survey Questions** (150+ fields)
- **Screening** (Q1-Q3): AI tool, 3-month experience, years of experience
- **Demographics** (Q4-Q12): Age, gender, country, field, employment, org size, tools, duration, projects
- **Scenarios** (SC-A, SC-B1, SC-B2, SC-C1, SC-C2, SC-D): Situated judgment questions
- **CAT Scale** (CAT1-CAT26): 26 items measuring Contextual Appropriateness Trust
- **Identity** (ID1-ID12): 12 items measuring Executor→Curator transformation
- **Expertise** (EXP1-EXP4): 4 pillars of evolved expertise
- **Spirals** (SP1-SP8): Virtuous and vicious trust-identity cycles
- **Organizational** (OC1-OC24): 24 items measuring org capabilities
- **Calibration** (Q13-Q15, CAL1-CAL4, STR1-STR3): 10 items on trust calibration
- **Cultural** (Q16-Q18, CUL1-CUL3): 6 items on cross-cultural work
- **Outcomes** (OUT1-OUT13): 13 items on work quality, efficiency, satisfaction, confidence
- **Reflections** (Q19-Q21): 3 open-ended questions (optional)
- **Follow-up** (3 fields): Interest, email, findings

### 9. **Calculated Results** (12 fields)
- Archetype name, description, power
- Trust profile scores (6 dimensions)
- Executor score
- Curator score
- Curatorial shift ratio
- Organizational readiness score

### 10. **Performance Metrics** (5 fields)
- Total words written
- Average response time
- Is speedrun flag
- Response speeds (JSON array)

### 11. **Metadata** (6 fields)
- Browser info
- Device type
- IP address
- User agent
- Referrer URL

### 12. **Admin & Research** (3 fields)
- Data quality flag
- Researcher notes
- Flagged for review

---

## 🚀 Setup Instructions

### Step 1: Delete Old Tables in Supabase

1. Go to https://app.supabase.com
2. Click **Table Editor** (left sidebar)
3. For each table (`user_insights`, `bookings`, `answers`, `responses`, `participants`):
   - Click the table
   - Click the **⋮** menu (top right)
   - Click **Delete table**
   - Confirm deletion

### Step 2: Run the Unified Database SQL

1. Click **SQL Editor** (left sidebar)
2. Click **+ New query**
3. Open the file: `UNIFIED_DATABASE_COMPLETE.sql`
4. Copy ALL the content (Ctrl+A, Ctrl+C)
5. Paste into SQL Editor (Ctrl+V)
6. Click **RUN**
7. Wait 10-15 seconds
8. You should see: "SUCCESS! Unified database created!"

### Step 3: Update Your JavaScript

1. **Backup current file:**
   - Rename `supabase.js` to `supabase-old.js`

2. **Use new file:**
   - Rename `supabase-unified.js` to `supabase.js`

3. **Update index.html:**
   - Make sure it loads `supabase.js` (it should already)

### Step 4: Test Everything

1. **Stop the server:**
   - Close the terminal or press Ctrl+C

2. **Restart server:**
   ```
   npx http-server -p 8000 -c-1
   ```

3. **Test the flow:**
   - Go to `http://localhost:8000`
   - Go through eligibility → commitment → contact → booking
   - Check Supabase Table Editor to see data being saved

---

## 📋 What You'll See in Supabase

### Table: `research_participants`

**One row per participant** with columns for:
- All timestamps
- All contact info
- All booking details
- All survey answers
- All calculated scores
- All metadata

### Views (Auto-created for easy analysis):

1. **`completed_participants`** - All who finished the survey
2. **`booking_schedule`** - Upcoming interviews
3. **`survey_progress_dashboard`** - Progress statistics
4. **`archetype_distribution`** - Archetype breakdown

---

## 🔍 How to Query Your Data

### Get all completed participants:
```sql
SELECT * FROM completed_participants;
```

### Get today's bookings:
```sql
SELECT * FROM booking_schedule 
WHERE booking_date = CURRENT_DATE;
```

### Get survey progress:
```sql
SELECT * FROM survey_progress_dashboard;
```

### Get specific participant:
```sql
SELECT * FROM research_participants 
WHERE email = 'participant@example.com';
```

### Export all data to CSV:
1. Go to Table Editor
2. Click `research_participants`
3. Click **Export** button (top right)
4. Choose CSV format

---

## ✅ Advantages of Unified Table

1. **Complete Journey Tracking** - See everything about one participant in one row
2. **Easy Exports** - One table = one CSV file with everything
3. **Simple Queries** - No complex JOINs needed
4. **Fast Performance** - Single table lookups are faster
5. **Easy Backup** - Export one table, get everything
6. **Clear Data Model** - Everything in one place

---

## 📊 Data You Can Analyze

### Participant Demographics:
- Age distribution
- Gender breakdown
- Country distribution
- Experience levels
- Organization sizes

### Trust Calibration:
- CAT scores by dimension
- Archetype distribution
- Calibration time
- Trust-identity spirals

### Professional Identity:
- Executor vs Curator scores
- Curatorial shift ratios
- Identity transformation patterns

### Organizational Context:
- Org readiness scores
- Capability gaps
- Support needs

### Outcomes:
- Work quality improvements
- Efficiency gains
- Satisfaction levels
- Confidence changes

### Booking Analytics:
- Booking conversion rate
- Preferred time slots
- Meeting platform usage
- No-show rates

---

## 🎯 Next Steps

1. ✅ Run the SQL to create the unified table
2. ✅ Replace `supabase.js` with `supabase-unified.js`
3. ✅ Restart your server
4. ✅ Test the complete flow
5. ✅ Check Supabase to see data being recorded

**Everything will be in ONE table, making your research data collection and analysis much simpler!** 🎉
