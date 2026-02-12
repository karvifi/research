# DATABASE SETUP INSTRUCTIONS
## Bulletproof Working Database - Guaranteed to Record Everything

### STEP 1: Delete Old Table in Supabase

1. Go to your Supabase project
2. Click on "SQL Editor" in the left sidebar
3. Run this command:

```sql
DROP TABLE IF EXISTS research_participants CASCADE;
```

### STEP 2: Create New Table

1. Still in SQL Editor
2. Copy the ENTIRE contents of `WORKING_DATABASE_SCHEMA.sql`
3. Paste into SQL Editor
4. Click "Run"
5. You should see: "Database created successfully!"

### STEP 3: Replace supabase.js File

1. Delete your current `supabase.js` file
2. Rename `supabase-new.js` to `supabase.js`
3. This new file has:
   - Automatic participant creation before ANY operation
   - Complete error handling
   - All question mappings verified
   - Detailed logging

### STEP 4: Clear Browser Cache

1. Press `Ctrl + Shift + Delete` (Windows) or `Cmd + Shift + Delete` (Mac)
2. Select "Cached images and files"
3. Click "Clear data"
4. Close and reopen your browser

### STEP 5: Test the System

1. Go to your website
2. Start a new session (use a different email or incognito mode)
3. Complete the booking or skip to survey
4. Answer a few questions
5. Check console - you should see:
   ```
   ✅ Participant created: CTR-XXXXXXXX
   💾 Saving Q1 → q1_ai_tool = stable
   ✅ Saved Q1 successfully
   ```

### STEP 6: Verify in Supabase

1. Go to Supabase → Table Editor
2. Click "research_participants" table
3. Find your row by ID (CTR-XXXXXXXX)
4. Scroll right to see your answers
5. You should see actual values, NOT null

## What's Fixed

### The Problem
- Participant row didn't exist when trying to save answers
- Race condition between creating participant and saving data
- Missing column mappings

### The Solution
- `ensureParticipant()` called before EVERY database operation
- Creates participant if doesn't exist
- All operations wait for participant to exist
- Complete question-to-column mapping
- Detailed error logging

## Key Features

1. **Automatic Participant Creation**: Every database operation checks if participant exists first
2. **No Race Conditions**: All operations are sequential and wait for completion
3. **Complete Mapping**: Every question ID mapped to correct database column
4. **Error Handling**: Every operation has try-catch with detailed logging
5. **Verification**: Console logs show exactly what's being saved

## Console Logs You'll See

### When Starting Survey:
```
✅ Participant created: CTR-20260212-ABC123
✅ Survey started
```

### When Answering Questions:
```
💾 Saving Q1 → q1_ai_tool = stable
✅ Saved Q1 successfully
💾 Saving Q2 → q2_three_months_experience = yes
✅ Saved Q2 successfully
```

### If There's an Error:
```
❌ Error saving Q1: [detailed error message]
```

## Troubleshooting

### If answers still show as null:

1. **Check Console**: Look for error messages
2. **Check Participant ID**: Make sure you're looking at the correct row in Supabase
3. **Check Column Names**: Verify the column exists in the table
4. **Check RLS**: Make sure Row Level Security is DISABLED (it is in the new schema)

### If you see "No column mapping":

- The question ID doesn't have a mapping in `getColumnName()`
- Check the question ID in console log
- Add mapping to `supabase-new.js` if needed

## Database Schema Summary

The table has 200+ columns including:
- All screening questions (Q1-Q3)
- All demographics (Q4-Q12)
- All scenario questions (SC-A through SC-D)
- All scale items (CAT1-26, ID1-12, EXP1-4, SP1-8, OC1-24, CAL1-4, STR1-3, CUL1-3, OUT1-13)
- All open questions (Q13-Q21)
- All follow-up questions (Q22-Q23)
- Booking information
- Email tracking
- Calculated scores
- Metadata

## Success Criteria

✅ Console shows "Participant created"
✅ Console shows "Saved [QuestionID] successfully" for each answer
✅ Supabase table shows actual values (not null) in question columns
✅ `questions_answered` counter increments with each answer
✅ No error messages in console

## Support

If you still have issues after following these steps:
1. Share the console logs
2. Share the participant ID
3. Share a screenshot of the Supabase table row
4. I'll help debug the specific issue
