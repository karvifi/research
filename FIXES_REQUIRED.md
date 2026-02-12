# 🔧 FIXES REQUIRED
**Calibrated Trust Research Platform**  
**Priority-Ordered Action Items**

---

## 🔴 CRITICAL - FIX IMMEDIATELY

### 1. Remove Duplicate Script Loading in index.html

**File**: `index.html`  
**Lines**: 2043-2073  
**Priority**: CRITICAL  
**Time**: 5 minutes

**Problem**: Scripts are loaded TWICE causing potential conflicts

**Action**:
1. Open `index.html`
2. Scroll to lines 2043-2073
3. Identify the TWO script loading blocks
4. Remove the FIRST block (keep the second, more complete one)
5. Save and test

**Expected Result**: Scripts load only once, page works correctly

---

## ⚠️ HIGH PRIORITY - FIX THIS WEEK

### 2. Create Legacy Files Documentation

**File**: `legacy_versions/README.md` (NEW FILE)  
**Priority**: HIGH  
**Time**: 10 minutes

**Action**: Create a README file in the legacy_versions folder explaining:
- These files are archived and NOT used in production
- Why they're kept (historical reference)
- Warning not to use them
- List of what each file was

**Template provided in CODE_AUDIT_REPORT.md section "Fix #2"**

---

### 3. Add Safety Checks to advanced-features.js

**File**: `advanced-features.js`  
**Lines**: 23, 56, 95  
**Priority**: HIGH  
**Time**: 10 minutes

**Problem**: Code references `appState` without checking if it exists

**Action**: Add `typeof appState !== 'undefined'` checks before using appState

**Specific fixes provided in CODE_AUDIT_REPORT.md section "Fix #3"**

---

### 4. Verify Email Template ID

**File**: `email-service.js`  
**Line**: 48  
**Priority**: HIGH  
**Time**: 5 minutes

**Action**:
1. Log into EmailJS dashboard
2. Check actual template ID
3. If it's `template_researcher_aler` (no 't'): No fix needed
4. If it's `template_researcher_alert` (with 't'): Update code

**Fix provided in CODE_AUDIT_REPORT.md section "Fix #4"**

---

## ⚪ OPTIONAL - NICE TO HAVE

### 5. Remove or Integrate Unused Functions

**File**: `advanced-features.js`  
**Priority**: LOW  
**Time**: 30 minutes

**Functions**:
- `addQuestionTimer()`
- `startQuestionTimer()`
- `getDetailedProgress()`
- `updateEnhancedProgress()`

**Action**: Either integrate these into app.js or remove them

---

### 6. Add .gitignore Entry for Legacy Files

**File**: `.gitignore`  
**Priority**: LOW  
**Time**: 2 minutes

**Action**: Add line to .gitignore:
```
legacy_versions/
```

This prevents accidental deployment while keeping files in repo for reference.

---

## ✅ TESTING CHECKLIST

After applying fixes, test:

- [ ] Page loads without errors
- [ ] Scripts load only once (check Network tab)
- [ ] Survey functionality works
- [ ] Email notifications send correctly
- [ ] No console errors
- [ ] All features functional

---

## 📊 PROGRESS TRACKER

| Fix | Status | Priority | Time Est. |
|-----|--------|----------|-----------|
| 1. Duplicate Scripts | ⏳ Pending | CRITICAL | 5 min |
| 2. Legacy README | ⏳ Pending | HIGH | 10 min |
| 3. Safety Checks | ⏳ Pending | HIGH | 10 min |
| 4. Email Template | ⏳ Pending | HIGH | 5 min |
| 5. Unused Functions | ⏳ Pending | LOW | 30 min |
| 6. .gitignore | ⏳ Pending | LOW | 2 min |

**Total Time**: ~1 hour (critical fixes: 30 minutes)

---

**Last Updated**: February 12, 2026
