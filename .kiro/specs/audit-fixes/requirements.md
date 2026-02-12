# Requirements Document

## Introduction

This document specifies the requirements for fixing critical, high, and medium priority issues identified in the comprehensive code audit of the Calibrated Trust Research Platform. The audit identified 7 issues across different priority levels, with 5 requiring immediate to medium-term fixes. These fixes will improve code quality, performance, maintainability, and reliability while maintaining all existing functionality.

## Glossary

- **System**: The Calibrated Trust Research Platform web application
- **Script_Loader**: The HTML script tag loading mechanism in index.html
- **Advanced_Features_Module**: The advanced-features.js JavaScript module
- **Email_Service**: The email-service.js module handling EmailJS integration
- **Legacy_Documentation**: Documentation for archived code in legacy_versions/ folder
- **Production_Code**: Active code files loaded and executed in the live application
- **Orphaned_Function**: A function defined in code but never called or referenced
- **Safety_Check**: Code that verifies a variable or object exists before accessing it
- **appState**: Global application state object defined in app.js

## Requirements

### Requirement 1: Fix Triple Script Loading

**User Story:** As a user, I want the application to load scripts only once, so that the page loads faster and behaves predictably without conflicts.

#### Acceptance Criteria

1. WHEN the index.html page loads, THE Script_Loader SHALL load each external library exactly once
2. WHEN the index.html page loads, THE Script_Loader SHALL load each application script file exactly once
3. THE System SHALL remove the first script loading block (lines 1597-1608 in index.html)
4. THE System SHALL remove the second script loading block (lines 2043-2055 in index.html)
5. THE System SHALL retain the third script loading block (lines 2058-2071 in index.html) as the single source of script loading
6. WHEN scripts are loaded, THE System SHALL load external CDN libraries before application scripts
7. WHEN scripts are loaded, THE System SHALL load core dependencies (config.js, utils.js) before modules that depend on them

### Requirement 2: Remove Orphaned Functions

**User Story:** As a developer, I want unused code removed from the codebase, so that the code is easier to maintain and understand.

#### Acceptance Criteria

1. THE System SHALL remove the addQuestionTimer function from advanced-features.js (line 255)
2. THE System SHALL remove the startQuestionTimer function from advanced-features.js (line 267)
3. THE System SHALL remove the getDetailedProgress function from advanced-features.js (line 285)
4. THE System SHALL remove the updateEnhancedProgress function from advanced-features.js (line 302)
5. WHEN orphaned functions are removed, THE System SHALL maintain all existing functionality
6. WHEN orphaned functions are removed, THE System SHALL not break any dependent code

### Requirement 3: Add Safety Checks for appState

**User Story:** As a developer, I want the application to handle missing dependencies gracefully, so that script loading order issues don't cause runtime errors.

#### Acceptance Criteria

1. WHEN Advanced_Features_Module accesses appState in setupAutoSave, THE System SHALL verify appState exists before accessing its properties
2. WHEN Advanced_Features_Module accesses appState in setupKeyboardShortcuts, THE System SHALL verify appState exists before accessing its properties
3. WHEN Advanced_Features_Module accesses appState in trackEvent, THE System SHALL verify appState exists before accessing its properties
4. IF appState is undefined in setupAutoSave, THEN THE System SHALL skip the auto-save operation
5. IF appState is undefined in setupKeyboardShortcuts, THEN THE System SHALL exit the event handler early
6. IF appState is undefined in trackEvent, THEN THE System SHALL use null for the responseId field
7. WHEN safety checks are added, THE System SHALL maintain all existing functionality when appState is defined

### Requirement 4: Verify and Document Email Template ID

**User Story:** As a system administrator, I want to ensure email template IDs are correct and documented, so that email notifications work reliably.

#### Acceptance Criteria

1. THE System SHALL verify the EmailJS template ID 'template_researcher_aler' is correct by checking the EmailJS dashboard
2. IF the template ID is correct, THEN THE Email_Service SHALL add a code comment explaining the spelling is intentional
3. IF the template ID is incorrect, THEN THE Email_Service SHALL update the template ID to match the EmailJS dashboard
4. WHEN the template ID is verified, THE System SHALL document the verification in code comments
5. WHEN email notifications are sent, THE System SHALL use the verified template ID

### Requirement 5: Create Comprehensive Legacy Documentation

**User Story:** As a developer, I want clear documentation for legacy files, so that I understand what they are and know not to use them in production.

#### Acceptance Criteria

1. THE System SHALL create a comprehensive README.md file in the legacy_versions/ folder
2. WHEN documenting legacy files, THE Legacy_Documentation SHALL list all 18 legacy files with descriptions
3. WHEN documenting legacy files, THE Legacy_Documentation SHALL explain why each file was replaced
4. WHEN documenting legacy files, THE Legacy_Documentation SHALL identify which current production files replaced each legacy file
5. WHEN documenting legacy files, THE Legacy_Documentation SHALL include a prominent warning not to use legacy files in production
6. WHEN documenting legacy files, THE Legacy_Documentation SHALL explain that legacy files contain console.log statements that expose user data
7. WHEN documenting legacy files, THE Legacy_Documentation SHALL explain the historical context and design evolution
8. WHEN documenting legacy files, THE Legacy_Documentation SHALL list all current production files for reference

### Requirement 6: Verify No Regression

**User Story:** As a developer, I want to verify that fixes don't break existing code, so that the application remains stable.

#### Acceptance Criteria

1. WHEN the page loads, THE System SHALL execute without throwing JavaScript errors in the browser console
2. WHEN the survey page is displayed, THE System SHALL render all question elements correctly
3. WHEN a user submits the survey, THE System SHALL save responses to the database
4. WHEN a booking is submitted, THE Email_Service SHALL send notification emails
5. WHEN the researcher modal is opened, THE System SHALL display the modal without errors
6. WHEN cookie consent is displayed, THE System SHALL save user preferences
7. WHEN the page loads on mobile devices, THE System SHALL display responsive layout
8. WHEN keyboard shortcuts are used, THE System SHALL respond to key events
9. WHEN animations are triggered, THE System SHALL execute CSS transitions without errors
10. WHEN the page loads, THE System SHALL complete initial render within 3 seconds

### Requirement 7: Code Quality Standards

**User Story:** As a developer, I want the fixed code to meet quality standards, so that it's maintainable and reliable.

#### Acceptance Criteria

1. WHEN safety checks are added, THE System SHALL use typeof checks before accessing potentially undefined variables
2. WHEN code is removed, THE System SHALL verify no references to removed code exist in the codebase
3. WHEN documentation is added, THE System SHALL include warnings about security implications
4. WHEN script tags are modified, THE System SHALL maintain proper HTML syntax
5. WHEN comments are added, THE System SHALL explain the reasoning for code decisions
6. WHEN files are modified, THE System SHALL preserve existing code formatting and style
7. WHEN changes are made, THE System SHALL not introduce new linting errors
8. WHEN functions are modified, THE System SHALL maintain existing function signatures
9. WHEN HTML is modified, THE System SHALL maintain valid HTML5 structure
10. WHEN JavaScript is modified, THE System SHALL maintain ES6+ syntax compatibility
