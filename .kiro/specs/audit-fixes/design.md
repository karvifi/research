# Design Document: Audit Fixes

## Overview

This design document outlines the technical approach for fixing 5 critical, high, and medium priority issues identified in the comprehensive code audit of the Calibrated Trust Research Platform. The fixes are designed to be surgical and non-breaking, maintaining all existing functionality while improving code quality, performance, and maintainability.

The fixes address:
1. Triple script loading causing performance issues and potential conflicts
2. Orphaned functions adding code bloat and maintenance burden
3. Missing safety checks that could cause runtime errors
4. Potentially incorrect email template ID requiring verification
5. Lack of documentation for legacy files

## Architecture

### Current Architecture

The application follows a modular architecture with:
- **index.html**: Main HTML file with embedded script loading
- **Core modules**: app.js, questions.js, config.js, supabase.js
- **Feature modules**: advanced-features.js, email-service.js, researcher-modal.js, etc.
- **Utility modules**: utils.js
- **Enhancement modules**: landing-enhancements.js, engagement-system.js, cookie-consent.js
- **Legacy code**: Archived in legacy_versions/ folder

### Script Loading Dependencies

Current dependency chain:
1. External CDN libraries (Supabase, EmailJS) - no dependencies
2. utils.js - no dependencies
3. config.js - no dependencies
4. supabase.js - depends on Supabase CDN, config.js
5. email-service.js - depends on EmailJS CDN
6. questions.js - depends on utils.js
7. engagement-system.js - depends on config.js, supabase.js
8. researcher-modal.js - depends on utils.js
9. landing-enhancements.js - depends on utils.js
10. advanced-features.js - depends on app.js (for appState)
11. app.js - depends on all core modules

### Fix Impact Analysis

Each fix is isolated and does not affect the others:
- **Fix 1 (Script Loading)**: Affects only index.html, no code changes
- **Fix 2 (Orphaned Functions)**: Affects only advanced-features.js, removes unused code
- **Fix 3 (Safety Checks)**: Affects only advanced-features.js, adds defensive code
- **Fix 4 (Email Template)**: Affects only email-service.js, verification and documentation
- **Fix 5 (Legacy Docs)**: Affects only legacy_versions/README.md, no code changes

## Components and Interfaces

### Component 1: Script Loader (index.html)

**Current State:**
- Three separate script loading blocks at lines 1597-1608, 2043-2055, and 2058-2071
- Each block loads the same scripts, causing triple execution
- Different blocks have different script sets (some missing utils.js, engagement-system.js, etc.)

**Target State:**
- Single script loading block at lines 2058-2071 (most complete)
- All scripts load exactly once
- Proper dependency order maintained

**Script Loading Order (Final):**
```html
<!-- External Libraries (CDN) - Load FIRST -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

<!-- Application Scripts (load AFTER libraries) -->
<script src="utils.js"></script>
<script src="config.js"></script>
<script src="supabase.js"></script>
<script src="email-service.js"></script>
<script src="engagement-system.js"></script>
<script src="questions.js"></script>
<script src="researcher-modal.js"></script>
<script src="landing-enhancements.js"></script>
<script src="advanced-features.js"></script>
<script src="app.js"></script>
```

**Implementation:**
- Delete lines 1597-1608 (first block)
- Delete lines 2043-2055 (second block)
- Keep lines 2058-2071 (third block)

### Component 2: Advanced Features Module (advanced-features.js)

**Current State:**
- Contains 4 orphaned functions (lines 255-320):
  - `addQuestionTimer(container)` - line 255
  - `startQuestionTimer()` - line 267
  - `getDetailedProgress()` - line 285
  - `updateEnhancedProgress()` - line 302
- Missing safety checks for `appState` in 3 locations:
  - `setupAutoSave()` - line 23
  - `setupKeyboardShortcuts()` - line 56
  - `trackEvent()` - line 95

**Target State:**
- Orphaned functions removed (lines 255-320 deleted)
- Safety checks added for all `appState` accesses
- All existing functionality maintained

**Interface Changes:**

None - all changes are internal to the module.

**Detailed Code Transformations:**

**Transformation 1: setupAutoSave() - Add Safety Check**

Current code (line 23):
```javascript
setupAutoSave() {
    this.autoSaveInterval = setInterval(() => {
        if (appState.currentPage === 'survey' && appState.responseId) {
            this.performAutoSave();
        }
    }, 30000); // Every 30 seconds
}
```

Fixed code:
```javascript
setupAutoSave() {
    this.autoSaveInterval = setInterval(() => {
        // Safety check: Verify appState exists before accessing
        if (typeof appState === 'undefined') {
            return; // Skip auto-save if appState not available
        }
        
        if (appState.currentPage === 'survey' && appState.responseId) {
            this.performAutoSave();
        }
    }, 30000); // Every 30 seconds
}
```

**Transformation 2: setupKeyboardShortcuts() - Add Safety Check**

Current code (line 56):
```javascript
setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + S to save
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            if (appState.currentPage === 'survey') {
                saveAndExit();
            }
        }
        
        // Arrow keys for navigation
        if (appState.currentPage === 'survey') {
            if (e.key === 'ArrowLeft' && appState.currentQuestionIndex > 0) {
                previousQuestion();
            }
            if (e.key === 'ArrowRight') {
                // Only if current question is answered
                const current = appState.questionFlow[appState.currentQuestionIndex];
                if (current && appState.answers[current.id]) {
                    nextQuestion();
                }
            }
        }
    });
}
```

Fixed code:
```javascript
setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Safety check: Exit early if appState not available
        if (typeof appState === 'undefined') {
            return;
        }
        
        // Ctrl/Cmd + S to save
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            if (appState.currentPage === 'survey') {
                saveAndExit();
            }
        }
        
        // Arrow keys for navigation
        if (appState.currentPage === 'survey') {
            if (e.key === 'ArrowLeft' && appState.currentQuestionIndex > 0) {
                previousQuestion();
            }
            if (e.key === 'ArrowRight') {
                // Only if current question is answered
                const current = appState.questionFlow[appState.currentQuestionIndex];
                if (current && appState.answers[current.id]) {
                    nextQuestion();
                }
            }
        }
    });
}
```

**Transformation 3: trackEvent() - Add Safety Check**

Current code (line 95):
```javascript
trackEvent(eventType, data) {
    // Track user interactions for research insights
    const event = {
        type: eventType,
        timestamp: new Date().toISOString(),
        responseId: appState.responseId,
        data: data
    };
    
    // Save to analytics if database is available
    if (typeof Database !== 'undefined' && appState.responseId) {
        // Analytics will be saved to database
        safeLog('log', 'Analytics event:', event);
    }
}
```

Fixed code:
```javascript
trackEvent(eventType, data) {
    // Track user interactions for research insights
    const event = {
        type: eventType,
        timestamp: new Date().toISOString(),
        // Safety check: Use null if appState not available
        responseId: (typeof appState !== 'undefined' ? appState.responseId : null),
        data: data
    };
    
    // Save to analytics if database is available
    if (typeof Database !== 'undefined' && 
        typeof appState !== 'undefined' && 
        appState.responseId) {
        // Analytics will be saved to database
        safeLog('log', 'Analytics event:', event);
    }
}
```

**Transformation 4: Remove Orphaned Functions**

Delete lines 255-320 containing:
- `addQuestionTimer(container)` function
- `startQuestionTimer()` function  
- `getDetailedProgress()` function
- `updateEnhancedProgress()` function

These functions are never called in the codebase and can be safely removed.

### Component 3: Email Service (email-service.js)

**Current State:**
- Template ID 'template_researcher_aler' at line 48 in sendResearcherNotification()
- Unclear if spelling is intentional or typo (missing 't' in "alert"?)
- No documentation explaining the template ID

**Target State:**
- Template ID verified against EmailJS dashboard
- Code comment added explaining the spelling
- If incorrect, template ID updated to correct value

**Verification Process:**
1. Check EmailJS dashboard at https://dashboard.emailjs.com/
2. Navigate to Email Templates section
3. Locate researcher notification template
4. Compare actual template ID with code

**Transformation Options:**

**Option A: If Template ID is Correct (no 't' in alert)**

Current code (line 48):
```javascript
const response = await emailjs.send(
    this.serviceId,
    'template_researcher_aler', // Matches the template ID
    params
);
```

Fixed code:
```javascript
const response = await emailjs.send(
    this.serviceId,
    // Note: Template ID is 'template_researcher_aler' (not 'alert')
    // Verified correct against EmailJS dashboard on [DATE]
    'template_researcher_aler',
    params
);
```

**Option B: If Template ID is Incorrect (should be 'alert')**

Current code (line 48):
```javascript
const response = await emailjs.send(
    this.serviceId,
    'template_researcher_aler', // Matches the template ID
    params
);
```

Fixed code:
```javascript
const response = await emailjs.send(
    this.serviceId,
    // Fixed: Was 'template_researcher_aler', corrected to 'template_researcher_alert'
    // Verified against EmailJS dashboard on [DATE]
    'template_researcher_alert',
    params
);
```

**Implementation Decision:**
This requires manual verification against the EmailJS dashboard. The implementer must:
1. Log into EmailJS dashboard
2. Check the actual template ID
3. Apply Option A or Option B based on findings
4. Document the verification date in the comment

### Component 4: Legacy Documentation (legacy_versions/README.md)

**Current State:**
- Minimal README.md in legacy_versions/ folder
- 18 legacy files without proper documentation
- No warnings about production use
- No security warnings about console.log statements

**Target State:**
- Comprehensive README.md with complete documentation
- Clear warnings about production use and security
- Mapping of legacy files to current production files
- Historical context explaining design evolution

**Complete README.md Content:**

```markdown
# Legacy Versions - Archived Code

⚠️ **WARNING: DO NOT USE THESE FILES IN PRODUCTION**

These files are previous versions that have been replaced by current production code.
They are kept for historical reference and understanding design evolution.

## Security Warning

🔒 **CRITICAL**: These legacy files contain console.log statements that expose sensitive user data including:
- Email addresses
- Response IDs
- Personal information
- Database queries

**These files must NEVER be loaded in production.**

## Legacy Files

### Old Application Versions

**app-enterprise.js** (673 lines)
- Enterprise version with advanced features
- Replaced by: `app.js`
- Reason: Simplified to single unified version
- Date archived: [DATE]

**app-revolutionary.js** (600 lines)
- Revolutionary UI version with experimental features
- Replaced by: `app.js`
- Reason: Consolidated features into main app
- Date archived: [DATE]

**logic.js**
- Original application logic
- Replaced by: `app.js`
- Reason: Refactored into modular architecture
- Date archived: [DATE]

### Old HTML Pages

**index-enterprise.html**
- Enterprise landing page
- Replaced by: `index.html`
- Reason: Unified into single responsive design
- Date archived: [DATE]

**index-revolutionary.html**
- Revolutionary landing page with experimental UI
- Replaced by: `index.html`
- Reason: Consolidated into main landing page
- Date archived: [DATE]

**dashboard.html**
- Old admin dashboard
- Replaced by: Removed (feature not needed)
- Reason: Simplified admin workflow
- Date archived: [DATE]

**verify-system.html**
- LinkedIn verification system UI
- Replaced by: Removed (feature removed)
- Reason: Verification system deprecated
- Date archived: [DATE]

### Old Database Setup

**auto-setup-database.js**
- Automatic database initialization
- Replaced by: Manual SQL execution (`UNIFIED_DATABASE_COMPLETE.sql`)
- Reason: Manual setup provides better control
- Date archived: [DATE]

**init-database.js**
- Database initialization script
- Replaced by: `UNIFIED_DATABASE_COMPLETE.sql`
- Reason: Consolidated into single SQL file
- Date archived: [DATE]

**init.js**
- System initialization
- Replaced by: Integrated into `app.js`
- Reason: Simplified initialization flow
- Date archived: [DATE]

### Old Verification System (REMOVED)

**verification-system.js**
- LinkedIn verification backend logic
- Replaced by: Removed (feature deprecated)
- Reason: LinkedIn verification no longer required
- Date archived: [DATE]

**verification-handlers.js**
- Verification UI event handlers
- Replaced by: Removed (feature deprecated)
- Reason: Verification system removed
- Date archived: [DATE]

**verification_schema.sql**
- Database schema for verification
- Replaced by: Removed (feature deprecated)
- Reason: Verification tables no longer needed
- Date archived: [DATE]

### Old Styles

**styles.css**
- Original stylesheet
- Replaced by: `styles-premium.css`
- Reason: Complete redesign with modern design system
- Date archived: [DATE]

**styles-advanced.css**
- Advanced styling features
- Replaced by: `styles-premium.css`
- Reason: Consolidated into unified design system
- Date archived: [DATE]

**styles-enterprise.css**
- Enterprise theme
- Replaced by: `styles-premium.css`
- Reason: Unified design system
- Date archived: [DATE]

**styles-revolutionary.css**
- Revolutionary theme with experimental designs
- Replaced by: `styles-premium.css`
- Reason: Consolidated into main stylesheet
- Date archived: [DATE]

### Old Questions

**questions-revolutionary.js**
- Revolutionary question set
- Replaced by: `questions.js`
- Reason: Consolidated into single question bank
- Date archived: [DATE]

## Why These Files Are Kept

These files are preserved for:
1. **Historical Reference**: Understanding how the system evolved
2. **Design Evolution**: Seeing what approaches were tried and why they changed
3. **Feature Recovery**: Potential to recover specific features if needed
4. **Learning**: Understanding design decisions and trade-offs

## Current Production Files

The following files are currently used in production:

### Core Application
- `app.js` - Main application logic
- `index.html` - Production landing page
- `questions.js` - Current question bank
- `config.js` - Configuration

### Services
- `supabase.js` - Database integration
- `email-service.js` - Email notifications
- `utils.js` - Utility functions

### Features
- `researcher-modal.js` - Researcher information modal
- `engagement-system.js` - Participant engagement
- `cookie-consent.js` - GDPR compliance
- `landing-enhancements.js` - Landing page features
- `advanced-features.js` - Advanced survey features

### Styles
- `styles-premium.css` - Main design system
- `scientific-rigor.css` - Scientific styling
- `transition-fix.css` - Animation fixes
- `booking-styles.css` - Booking system styles
- `scenario-animations.css` - Scenario animations
- `about-researcher.css` - Researcher modal styles
- `cookie-consent.css` - Cookie consent styles
- `landing-enhancements.css` - Landing enhancements

## Migration History

### Phase 1: Initial Development
- Created basic survey system with `logic.js`
- Simple HTML/CSS interface

### Phase 2: Feature Expansion
- Added enterprise and revolutionary versions
- Experimented with different UIs
- Added LinkedIn verification system

### Phase 3: Consolidation
- Unified into single `app.js`
- Removed verification system
- Consolidated styles into `styles-premium.css`

### Phase 4: Current State
- Modular architecture
- Clean separation of concerns
- Production-ready code

---

**Last Updated**: [DATE]
**Maintained By**: Development Team
**Questions**: Contact research.mdh.edu@gmail.com
```

**Implementation Notes:**
- Replace [DATE] placeholders with actual dates during implementation
- Verify all 18 files are documented
- Ensure all current production files are listed
- Add any additional context specific to the project

## Data Models

No data model changes are required for these fixes. All fixes are code-level improvements that maintain existing data structures and database schemas.


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Unique Script Loading

*For any* script source (CDN library or application file), it should appear in exactly one script tag in the HTML document.

**Validates: Requirements 1.1, 1.2**

**Test Implementation:**
```javascript
// Parse HTML and extract all script src attributes
const scriptSources = extractScriptSources('index.html');
// Count occurrences of each source
const counts = countOccurrences(scriptSources);
// Verify each source appears exactly once
for (const [source, count] of counts) {
    assert(count === 1, `Script ${source} appears ${count} times, expected 1`);
}
```

### Property 2: Dependency Ordering

*For any* script with dependencies, all of its dependencies should appear before it in the document order of script tags.

**Validates: Requirements 1.6, 1.7**

**Dependency Graph:**
```javascript
const dependencies = {
    'supabase.js': ['https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2', 'config.js'],
    'email-service.js': ['https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'],
    'questions.js': ['utils.js'],
    'engagement-system.js': ['config.js', 'supabase.js'],
    'researcher-modal.js': ['utils.js'],
    'landing-enhancements.js': ['utils.js'],
    'advanced-features.js': ['app.js'],
    'app.js': ['utils.js', 'config.js', 'supabase.js', 'questions.js']
};
```

**Test Implementation:**
```javascript
// For each script, verify all dependencies appear earlier
for (const [script, deps] of Object.entries(dependencies)) {
    const scriptIndex = getScriptIndex(script);
    for (const dep of deps) {
        const depIndex = getScriptIndex(dep);
        assert(depIndex < scriptIndex, 
            `Dependency ${dep} must appear before ${script}`);
    }
}
```

### Property 3: No Calls to Removed Functions

*For any* function that is removed from the codebase, there should be zero calls to that function in any production code file.

**Validates: Requirements 2.6**

**Removed Functions:**
- `addQuestionTimer`
- `startQuestionTimer`
- `getDetailedProgress`
- `updateEnhancedProgress`

**Test Implementation:**
```javascript
const removedFunctions = [
    'addQuestionTimer',
    'startQuestionTimer', 
    'getDetailedProgress',
    'updateEnhancedProgress'
];

const productionFiles = [
    'app.js', 'questions.js', 'config.js', 'supabase.js',
    'email-service.js', 'utils.js', 'engagement-system.js',
    'researcher-modal.js', 'landing-enhancements.js',
    'advanced-features.js', 'cookie-consent.js'
];

for (const func of removedFunctions) {
    for (const file of productionFiles) {
        const content = readFile(file);
        const callPattern = new RegExp(`\\b${func}\\s*\\(`);
        assert(!callPattern.test(content),
            `Found call to removed function ${func} in ${file}`);
    }
}
```

### Property 4: Legacy File Documentation Completeness

*For any* legacy file in the legacy_versions/ folder, the README.md should contain a reference to that filename and identify a corresponding current production file (or state it was removed).

**Validates: Requirements 5.4**

**Legacy Files:**
```javascript
const legacyFiles = [
    'app-enterprise.js',
    'app-revolutionary.js',
    'auto-setup-database.js',
    'dashboard.html',
    'index-enterprise.html',
    'index-revolutionary.html',
    'init-database.js',
    'init.js',
    'logic.js',
    'questions-revolutionary.js',
    'styles-advanced.css',
    'styles-enterprise.css',
    'styles-revolutionary.css',
    'styles.css',
    'verification-handlers.js',
    'verification-system.js',
    'verification_schema.sql',
    'verify-system.html'
];
```

**Test Implementation:**
```javascript
const readmeContent = readFile('legacy_versions/README.md');

for (const legacyFile of legacyFiles) {
    // Verify filename is mentioned
    assert(readmeContent.includes(legacyFile),
        `README.md must mention ${legacyFile}`);
    
    // Verify it has a "Replaced by:" line
    const replacedByPattern = new RegExp(
        `${legacyFile}[\\s\\S]*?Replaced by:\\s*(.+?)\\n`
    );
    assert(replacedByPattern.test(readmeContent),
        `README.md must specify what replaced ${legacyFile}`);
}
```

### Property 5: Safety Checks for appState Access

*For any* function in advanced-features.js that accesses appState, it should first verify that appState is defined using a typeof check.

**Validates: Requirements 3.1, 3.2, 3.3**

**Test Implementation:**
```javascript
const advancedFeaturesContent = readFile('advanced-features.js');

// Extract functions that access appState
const functionsWithAppState = [
    'setupAutoSave',
    'setupKeyboardShortcuts',
    'trackEvent'
];

for (const funcName of functionsWithAppState) {
    const funcContent = extractFunctionBody(advancedFeaturesContent, funcName);
    
    // Verify typeof check exists before appState access
    const hasTypeofCheck = /typeof\s+appState\s*[!=]==?\s*['"]undefined['"]/.test(funcContent);
    
    assert(hasTypeofCheck,
        `Function ${funcName} must check typeof appState before accessing it`);
}
```

## Error Handling

### Script Loading Errors

**Current Behavior:**
- If a script fails to load, the browser console shows an error
- Subsequent scripts may fail if they depend on the failed script
- No user-facing error message

**Post-Fix Behavior:**
- Same as current (no changes to error handling)
- Single script loading reduces chance of conflicts
- Proper dependency order reduces chance of undefined reference errors

### Missing appState Errors

**Current Behavior:**
- If app.js doesn't load, appState is undefined
- advanced-features.js throws ReferenceError when accessing appState
- Application may partially fail

**Post-Fix Behavior:**
- Safety checks prevent ReferenceError
- Functions gracefully handle missing appState
- Application degrades gracefully (advanced features disabled, core features work)

**Error Handling Pattern:**

```javascript
// Pattern 1: Early return
if (typeof appState === 'undefined') {
    safeLog('warn', 'appState not available, skipping feature');
    return;
}

// Pattern 2: Conditional execution
if (typeof appState !== 'undefined' && appState.currentPage === 'survey') {
    // Safe to proceed
}

// Pattern 3: Null coalescing
const responseId = (typeof appState !== 'undefined' ? appState.responseId : null);
```

### Email Service Errors

**Current Behavior:**
- If template ID is wrong, EmailJS returns error
- Error is logged to console
- Email fails to send
- Fallback mailto link is available

**Post-Fix Behavior:**
- Template ID verified correct
- Documentation added for clarity
- Same error handling as before (no changes needed)

### Legacy File Usage Errors

**Current Behavior:**
- Legacy files are not loaded in production
- If accidentally loaded, may cause conflicts or errors
- No warnings in code

**Post-Fix Behavior:**
- README.md provides clear warnings
- Developers are informed not to use legacy files
- Same runtime behavior (files still not loaded)

## Testing Strategy

### Dual Testing Approach

This feature requires both unit tests and property-based tests for comprehensive coverage:

**Unit Tests** focus on:
- Specific examples of fixes (e.g., specific functions removed)
- Edge cases (e.g., appState undefined scenarios)
- Integration points (e.g., script loading order)
- Documentation content verification

**Property Tests** focus on:
- Universal properties across all scripts (unique loading, dependency order)
- General rules that should hold for any input (no calls to removed functions)
- Comprehensive coverage through randomization

Both approaches are complementary and necessary. Unit tests catch concrete bugs in specific scenarios, while property tests verify general correctness across all possible inputs.

### Property-Based Testing

**Library Selection:**
- **JavaScript**: Use `fast-check` library for property-based testing
- Installation: `npm install --save-dev fast-check`
- Documentation: https://github.com/dubzzz/fast-check

**Configuration:**
- Minimum 100 iterations per property test (due to randomization)
- Each property test must reference its design document property
- Tag format: `// Feature: audit-fixes, Property {number}: {property_text}`

**Property Test Implementation:**

Each correctness property must be implemented by a single property-based test:

1. **Property 1: Unique Script Loading**
   - Generate: Parse index.html and extract all script src attributes
   - Test: Verify each src appears exactly once
   - Tag: `// Feature: audit-fixes, Property 1: Unique Script Loading`

2. **Property 2: Dependency Ordering**
   - Generate: Define dependency graph for all scripts
   - Test: For each script, verify all dependencies appear earlier in document
   - Tag: `// Feature: audit-fixes, Property 2: Dependency Ordering`

3. **Property 3: No Calls to Removed Functions**
   - Generate: List of removed function names
   - Test: Search all production files for calls to these functions
   - Tag: `// Feature: audit-fixes, Property 3: No Calls to Removed Functions`

4. **Property 4: Legacy File Documentation Completeness**
   - Generate: List all files in legacy_versions/ folder
   - Test: Verify each filename appears in README.md with a production file mapping
   - Tag: `// Feature: audit-fixes, Property 4: Legacy File Documentation Completeness`

### Unit Testing

**Unit Test Coverage:**

1. **Script Loading Tests** (examples):
   - Test: First script block (lines 1597-1608) is removed
   - Test: Second script block (lines 2043-2055) is removed
   - Test: Third script block (lines 2058-2071) exists
   - Test: CDN scripts appear before application scripts
   - Test: utils.js and config.js appear before dependent scripts

2. **Orphaned Function Tests** (examples):
   - Test: addQuestionTimer function does not exist in advanced-features.js
   - Test: startQuestionTimer function does not exist in advanced-features.js
   - Test: getDetailedProgress function does not exist in advanced-features.js
   - Test: updateEnhancedProgress function does not exist in advanced-features.js

3. **Safety Check Tests** (examples):
   - Test: setupAutoSave checks for appState before accessing
   - Test: setupKeyboardShortcuts checks for appState before accessing
   - Test: trackEvent handles undefined appState gracefully
   - Test: setupAutoSave skips operation when appState is undefined
   - Test: setupKeyboardShortcuts exits early when appState is undefined
   - Test: trackEvent uses null for responseId when appState is undefined

4. **Email Template Tests** (examples):
   - Test: Template ID has documentation comment
   - Test: sendResearcherNotification uses verified template ID

5. **Legacy Documentation Tests** (examples):
   - Test: README.md exists in legacy_versions/ folder
   - Test: README.md contains warning about production use
   - Test: README.md mentions console.log security concern
   - Test: README.md lists current production files
   - Test: README.md references all 18 legacy files

### Integration Testing

**Manual Testing Checklist:**

After applying fixes, verify:
1. Page loads without errors (check browser console)
2. Scripts load only once (check Network tab in DevTools)
3. Survey functionality works end-to-end
4. Email notifications send successfully
5. Booking system works
6. Cookie consent works
7. Researcher modal works
8. All animations work
9. Mobile responsive layout works
10. Keyboard shortcuts work in survey

**Automated Integration Tests:**

While not part of this spec, consider adding:
- Playwright or Cypress tests for end-to-end flows
- Visual regression tests for UI components
- Performance tests for page load time

### Test Organization

```
tests/
├── unit/
│   ├── script-loading.test.js
│   ├── orphaned-functions.test.js
│   ├── safety-checks.test.js
│   ├── email-template.test.js
│   └── legacy-docs.test.js
├── property/
│   ├── unique-script-loading.property.test.js
│   ├── dependency-ordering.property.test.js
│   ├── no-removed-function-calls.property.test.js
│   └── legacy-docs-completeness.property.test.js
└── integration/
    └── manual-testing-checklist.md
```

### Testing Timeline

1. **Before fixes**: Run existing tests to establish baseline
2. **During fixes**: Write tests for each fix as it's implemented
3. **After fixes**: Run full test suite + manual testing checklist
4. **Regression**: Run tests before any future changes to these files

## Implementation Notes

### Fix Order

Recommended order of implementation:

1. **Fix 1: Script Loading** (5 minutes, critical)
   - Highest impact on performance
   - Lowest risk (just removing duplicate tags)
   - Test immediately after

2. **Fix 3: Safety Checks** (10 minutes, medium)
   - Improves reliability
   - Low risk (adds defensive code)
   - Test with and without appState

3. **Fix 2: Orphaned Functions** (30 minutes, high)
   - Code cleanup
   - Very low risk (functions not called)
   - Verify no references exist

4. **Fix 4: Email Template** (5 minutes, medium)
   - Requires external verification
   - Low risk (just documentation or ID fix)
   - Test email sending

5. **Fix 5: Legacy Docs** (15 minutes, medium)
   - Documentation only
   - Zero risk (no code changes)
   - Review for completeness

Total estimated time: ~65 minutes

### Rollback Plan

If any fix causes issues:

1. **Script Loading**: Restore one of the deleted script blocks
2. **Safety Checks**: Remove the typeof checks (revert to original)
3. **Orphaned Functions**: Restore the deleted functions
4. **Email Template**: Revert template ID change
5. **Legacy Docs**: No rollback needed (documentation only)

All fixes are in version control and can be reverted with `git revert`.

### Deployment Strategy

1. Apply fixes in development environment
2. Run full test suite
3. Manual testing checklist
4. Deploy to staging (if available)
5. Smoke test in staging
6. Deploy to production
7. Monitor for errors in production console
8. Monitor email sending success rate

### Success Metrics

- Page load time: Should improve by ~10-15% (due to script loading fix)
- JavaScript errors: Should decrease to zero (due to safety checks)
- Code size: Should decrease by ~100 lines (due to orphaned function removal)
- Developer onboarding time: Should improve (due to legacy documentation)
- Email delivery rate: Should remain at 100% (or improve if template ID was wrong)
