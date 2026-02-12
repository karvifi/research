# Testing Checklist - Bulletproof Database

## ✅ What Was Done

1. **New Database Schema**: Clean table with all columns, RLS disabled
2. **New supabase.js**: Every operation ensures participant exists first
3. **Updated app.js**: Simplified answer saving with proper error handling
4. **Version bump**: 3.0.0 to force browser cache refresh

## 🧪 How to Test

### Step 1: Clear Browser Cache
- Press `Ctrl + Shift + Delete` (Windows) or `Cmd + Shift + Delete` (Mac)
- Select "Cached images and files"
- Click "Clear data"
- **Close and reopen browser completely**

### Step 2: Start Fresh Session
- Open your website in **Incognito/Private mode** (to avoid cache)
- Or use a different email address

### Step 3: Complete Flow
Choose one of these paths:

**Path A: With Booking**
1. Click "Join Optional In-Depth Interview"
2. Sign in with Google (or fill manually)
3. Select a date and time
4. Confirm booking
5. Accept terms
6. Start survey
7. Answer 5-10 questions

**Path B: Skip to Survey**
1. Click "Participate in Study"
2. Fill contact form
3. Click "Skip Interview, Start Survey"
4. Accept terms
5. Start survey
6. Answer 5-10 questions

### Step 4: Check Console
Open browser console (F12) and look for:

```
✅ Participant created: CTR-20260212-XXXXXX
✅ Survey started
💾 Saving Q1 → q1_ai_tool = stable
✅ Saved Q1 successfully
💾 Saving Q2 → q2_three_months_experience = yes
✅ Saved Q2 successfully
```

**Red Flags** (should NOT see):
- ❌ Error saving
- ❌ No rows updated
- ❌ Failed to ensure participant

### Step 5: Verify in Supabase

1. Go to Supabase → Table Editor
2. Click "research_participants"
3. Find your row by searching for the ID from console (CTR-20260212-XXXXXX)
4. Scroll right to see question columns
5. **Verify**: You should see actual values, NOT null

Example of what you should see:
```
id: CTR-20260212-ABC123
email: test@example.com
participant_name: Test User
q1_ai_tool: stable
q2_three_months_experience: yes
q3_years_experience: 5-10
q4_age: 30
q5_gender: male
questions_answered: 5
survey_status: in_progress
```

## 🎯 Success Criteria

✅ Console shows "Participant created"
✅ Console shows "Saved [Q#] successfully" for each answer
✅ No error messages in console
✅ Supabase table shows actual values (not null)
✅ `questions_answered` counter increments
✅ `survey_status` changes from 'not_started' to 'in_progress'

## 🐛 If Something Goes Wrong

### Console shows "No column mapping"
- Copy the question ID from the error
- Check if it exists in `supabase.js` → `getColumnName()` function
- If missing, add it to the mapping

### Console shows "Failed to ensure participant"
- Check Supabase connection in config.js
- Verify table name is exactly "research_participants"
- Check if RLS is disabled in Supabase

### Answers still showing as null
1. Make sure you're looking at the correct row (check ID)
2. Refresh the Supabase table view
3. Check if the column name matches exactly
4. Look for error messages in console

### Browser cache not clearing
- Use Incognito/Private mode
- Or add `?v=3` to the URL: `http://localhost:3000/?v=3`

## 📊 What Gets Recorded

Every time you answer a question, the system:
1. Checks if participant exists (creates if not)
2. Maps question ID to database column
3. Updates the column with your answer
4. Increments `questions_answered` counter
5. Updates `last_activity_timestamp`
6. Logs success to console

## 🔍 Debugging Commands

Open browser console and run:

```javascript
// Check current response ID
console.log(window.surveyEngine.state.responseId);

// Check all answers in memory
console.log(window.surveyEngine.state.answers);

// Check questions answered count
console.log(window.surveyEngine.state.questionsAnswered);
```

## 📞 Support

If you still have issues:
1. Share the complete console log
2. Share the participant ID (CTR-XXXXXXXX)
3. Share a screenshot of the Supabase table row
4. I'll help debug immediately
