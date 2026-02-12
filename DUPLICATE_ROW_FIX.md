# Duplicate Row Creation - FIXED

## Problem Summary
The system was creating TWO separate database rows for a single user session, resulting in duplicate participant records with different response IDs.

### Example from Superpod:
- Row 1: `CTR-20260212-TVM480` (commitment data, no email)
- Row 2: `CTR-20260212-ZAAL99` (contact data with email)

## Root Causes Identified

### 1. Response ID Not Preserved Across Pages
Multiple functions were generating NEW response IDs without checking if one already existed in localStorage:

- `submitContactDetails()` - Generated new ID without checking localStorage
- `initializeSurvey()` - Generated new ID without checking localStorage  
- `confirmBooking()` - Generated new ID without checking localStorage
- `selectEligibility()` - Generated new ID without checking localStorage

### 2. Google OAuth Redirect Issue
The `googleLogin()` function was NOT passing a `returnUrl` to the OAuth provider, causing:
- Redirect to default landing page instead of the page user was on
- Loss of session context during OAuth flow
- Potential generation of new response ID after OAuth

## Fixes Applied

### Fix 1: Consistent Response ID Management
Updated ALL functions to check localStorage BEFORE generating a new response ID:

```javascript
// OLD CODE (WRONG)
if (!this.state.responseId) {
    this.state.responseId = generateResponseId();
}

// NEW CODE (CORRECT)
if (!this.state.responseId) {
    const savedState = LocalBackup.loadResponse();
    if (savedState && savedState.responseId) {
        this.state.responseId = savedState.responseId;
        safeLog('log', '🆔 Using existing Response ID from localStorage:', this.state.responseId);
    } else {
        this.state.responseId = generateResponseId();
        safeLog('log', '🆔 Generated new response ID:', this.state.responseId);
        LocalBackup.saveResponse(this.state);
    }
}
```

### Fix 2: OAuth Redirect URL
Added proper return URL to Google OAuth:

```javascript
// Get the current URL to use as redirect
const returnUrl = window.location.origin + window.location.pathname;
const result = await Database.signInWithGoogle(returnUrl);
```

## Functions Updated

1. `submitContactDetails()` - Now checks localStorage before generating ID
2. `initializeSurvey()` - Now checks localStorage before generating ID
3. `confirmBooking()` - Now checks localStorage before generating ID
4. `selectEligibility()` - Now checks localStorage before generating ID
5. `googleLogin()` - Now passes correct return URL to OAuth

## Expected Behavior After Fix

### Study Flow (No Calendar)
1. User clicks "Start 15-Minute Study" → ID generated: `CTR-20260212-ABC123`
2. Eligibility page → Uses same ID from localStorage
3. Commitment page → Uses same ID from localStorage
4. Contact page → Uses same ID from localStorage
5. Survey → Uses same ID from localStorage

**Result**: ONE database row with ID `CTR-20260212-ABC123`

### Interview Flow (With Calendar)
1. User clicks "Join Optional In-Depth Interview" → ID generated: `CTR-20260212-XYZ789`
2. Scheduler page → Uses same ID from localStorage
3. Booking confirmation → Uses same ID from localStorage

**Result**: ONE database row with ID `CTR-20260212-XYZ789`

### Google OAuth Flow
1. User on contact/scheduler page clicks "Sign in with Google"
2. OAuth saves current page to sessionStorage
3. Redirects to Google with proper return URL
4. Returns to SAME page (not landing page)
5. Uses SAME response ID from localStorage

**Result**: NO duplicate rows, same ID preserved

## Testing Instructions

### Test 1: Study Flow Without OAuth
1. Clear browser cache and localStorage
2. Click "Start 15-Minute Study"
3. Complete eligibility → commitment → contact → survey
4. Check database: Should have ONLY ONE row

### Test 2: Interview Flow Without OAuth
1. Clear browser cache and localStorage
2. Click "Join Optional In-Depth Interview"
3. Complete scheduler → booking
4. Check database: Should have ONLY ONE row

### Test 3: Study Flow WITH Google OAuth
1. Clear browser cache and localStorage
2. Click "Start 15-Minute Study"
3. Go through eligibility → commitment
4. On contact page, click "Sign in with Google"
5. Complete OAuth and return to contact page
6. Submit contact form
7. Check database: Should have ONLY ONE row

### Test 4: Direct Google OAuth on Contact Page
1. Clear browser cache and localStorage
2. Navigate directly to contact page
3. Click "Sign in with Google"
4. Complete OAuth
5. Should return to contact page (NOT landing page)
6. Submit form
7. Check database: Should have ONLY ONE row

## Files Modified
- `app.js` - 5 functions updated
- `supabase.js` - No changes needed (already correct)

## Console Logs to Watch
Look for these logs to verify correct behavior:
- `🆔 Using existing Response ID from localStorage: CTR-...` (GOOD - reusing ID)
- `🆔 Generated new response ID: CTR-...` (Should only see ONCE per session)
- `📍 Saving return page: contact` or `scheduler` (OAuth redirect tracking)
- `🔄 OAuth callback detected - redirecting to [page]` (OAuth return)

## What to Avoid
- Do NOT clear localStorage during a session (breaks ID persistence)
- Do NOT use browser back button during OAuth flow
- Do NOT open multiple tabs with the same session
