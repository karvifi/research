# Testing Checklist: Duplicate Row Fix

## Pre-Test Setup
1. Open browser DevTools (F12)
2. Go to Console tab
3. Clear all data:
   ```javascript
   localStorage.clear();
   sessionStorage.clear();
   ```
4. Refresh page (F5)

## Test 1: Study Flow (15-Minute Study)
**Expected Result**: ONE database row created

### Steps:
1. Click "Start 15-Minute Study" button
2. Watch console for: `🆔 Session Response ID initialized: CTR-YYYYMMDD-XXXXXX`
3. Note the ID (e.g., `CTR-20260212-ABC123`)
4. Select eligibility category
5. Watch console - should see: `🆔 Using existing Response ID from localStorage`
6. Fill commitment statement
7. Watch console - should see: `🆔 Using existing Response ID`
8. Fill contact form (name, email, role)
9. Watch console - should see: `🆔 Using existing Response ID from localStorage`
10. Submit form

### Verification:
- Check Supabase database
- Should have ONLY ONE row with the ID from step 3
- Row should have: eligibility_category, context_statement, email, participant_name, participant_role

## Test 2: Interview Flow (With Calendar)
**Expected Result**: ONE database row created

### Steps:
1. Clear localStorage and sessionStorage
2. Refresh page
3. Click "Join Optional In-Depth Interview" button
4. Watch console for: `🆔 Session Response ID initialized (Interview Flow): CTR-YYYYMMDD-XXXXXX`
5. Note the ID
6. Select a date and time on calendar
7. Fill contact form
8. Watch console - should see: `🆔 Using existing Response ID from localStorage`
9. Confirm booking

### Verification:
- Check Supabase database
- Should have ONLY ONE row with the ID from step 4
- Row should have: booking_scheduled=true, booking_date, booking_time, email

## Test 3: Google OAuth on Contact Page
**Expected Result**: ONE database row, OAuth returns to contact page

### Steps:
1. Clear localStorage and sessionStorage
2. Refresh page
3. Click "Start 15-Minute Study"
4. Go through eligibility → commitment
5. On contact page, click "Sign in with Google" button
6. Watch console for: `📍 Saving return page: contact`
7. Complete Google OAuth (select account)
8. **VERIFY**: Should return to CONTACT page (NOT landing page)
9. Watch console for: `🔄 OAuth callback detected - redirecting to contact page`
10. Form should auto-fill with Google name and email
11. Submit form

### Verification:
- Check Supabase database
- Should have ONLY ONE row
- Row should have Google email and name

## Test 4: Google OAuth on Scheduler Page
**Expected Result**: ONE database row, OAuth returns to scheduler page

### Steps:
1. Clear localStorage and sessionStorage
2. Refresh page
3. Click "Join Optional In-Depth Interview"
4. On scheduler page, click "Sign in with Google" button
5. Watch console for: `📍 Saving return page: scheduler`
6. Complete Google OAuth
7. **VERIFY**: Should return to SCHEDULER page (NOT landing page)
8. Watch console for: `🔄 OAuth callback detected - redirecting to scheduler page`
9. Select date/time and submit

### Verification:
- Check Supabase database
- Should have ONLY ONE row
- Row should have booking data and Google email

## Test 5: Direct Contact Page Access
**Expected Result**: ONE database row

### Steps:
1. Clear localStorage and sessionStorage
2. Refresh page
3. Scroll down and click "Schedule Video Interview" button (bypasses eligibility)
4. Should go directly to contact page
5. Fill form manually (no Google OAuth)
6. Submit

### Verification:
- Check Supabase database
- Should have ONLY ONE row
- Row should have contact data

## Common Issues to Watch For

### ❌ PROBLEM: Two rows with different IDs
**Cause**: Response ID not being preserved
**Look for in console**: Multiple `🆔 Generated new response ID` messages
**Solution**: Check that localStorage is not being cleared between pages

### ❌ PROBLEM: OAuth returns to landing page
**Cause**: Return URL not being passed correctly
**Look for in console**: Missing `📍 Saving return page` message
**Solution**: Verify `googleLogin()` is passing returnUrl parameter

### ❌ PROBLEM: "generateResponseId is not defined" error
**Cause**: Browser cache has old version of supabase.js
**Solution**: Hard refresh (Ctrl+Shift+R) or clear cache

### ✅ SUCCESS INDICATORS
- Only ONE `🆔 Generated new response ID` per session
- Multiple `🆔 Using existing Response ID from localStorage` messages
- OAuth returns to correct page
- Only ONE database row per session

## Database Query to Check for Duplicates

Run this in Supabase SQL Editor:

```sql
-- Find sessions with multiple rows (duplicates)
SELECT 
    LEFT(id, 15) as session_prefix,
    COUNT(*) as row_count,
    STRING_AGG(id, ', ') as all_ids,
    STRING_AGG(email, ', ') as all_emails
FROM research_participants
WHERE created_at > NOW() - INTERVAL '1 hour'
GROUP BY LEFT(id, 15)
HAVING COUNT(*) > 1
ORDER BY row_count DESC;
```

If this returns any results, duplicates still exist.

## Expected Console Log Pattern (Success)

```
🆔 Session Response ID initialized: CTR-20260212-ABC123
✅ Eligibility saved to state
🆔 Using existing Response ID from localStorage: CTR-20260212-ABC123
✅ Commitment updated
🆔 Using existing Response ID from localStorage: CTR-20260212-ABC123
✅ Contact info updated
```

## Expected Console Log Pattern (OAuth Success)

```
🆔 Session Response ID initialized: CTR-20260212-ABC123
📍 Saving return page: contact
🔄 Triggering OAuth with account selection...
🔗 Return URL: http://localhost:3000/
[OAuth redirect happens]
🔄 OAuth callback detected - redirecting to contact page
✅ Authenticated user detected: user@gmail.com
🆔 Using existing Response ID from localStorage: CTR-20260212-ABC123
✅ Contact info updated
```
