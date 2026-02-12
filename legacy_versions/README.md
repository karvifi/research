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
- Date archived: December 2024

**app-revolutionary.js** (600 lines)
- Revolutionary UI version with experimental features
- Replaced by: `app.js`
- Reason: Consolidated features into main app
- Date archived: December 2024

**logic.js**
- Original application logic
- Replaced by: `app.js`
- Reason: Refactored into modular architecture
- Date archived: December 2024

### Old HTML Pages

**index-enterprise.html**
- Enterprise landing page
- Replaced by: `index.html`
- Reason: Unified into single responsive design
- Date archived: December 2024

**index-revolutionary.html**
- Revolutionary landing page with experimental UI
- Replaced by: `index.html`
- Reason: Consolidated into main landing page
- Date archived: December 2024

**dashboard.html**
- Old admin dashboard
- Replaced by: Removed (feature not needed)
- Reason: Simplified admin workflow
- Date archived: December 2024

**verify-system.html**
- LinkedIn verification system UI
- Replaced by: Removed (feature removed)
- Reason: Verification system deprecated
- Date archived: December 2024

### Old Database Setup

**auto-setup-database.js**
- Automatic database initialization
- Replaced by: Manual SQL execution (`UNIFIED_DATABASE_COMPLETE.sql`)
- Reason: Manual setup provides better control
- Date archived: December 2024

**init-database.js**
- Database initialization script
- Replaced by: `UNIFIED_DATABASE_COMPLETE.sql`
- Reason: Consolidated into single SQL file
- Date archived: December 2024

**init.js**
- System initialization
- Replaced by: Integrated into `app.js`
- Reason: Simplified initialization flow
- Date archived: December 2024

### Old Verification System (REMOVED)

**verification-system.js**
- LinkedIn verification backend logic
- Replaced by: Removed (feature deprecated)
- Reason: LinkedIn verification no longer required
- Date archived: December 2024

**verification-handlers.js**
- Verification UI event handlers
- Replaced by: Removed (feature deprecated)
- Reason: Verification system removed
- Date archived: December 2024

**verification_schema.sql**
- Database schema for verification
- Replaced by: Removed (feature deprecated)
- Reason: Verification tables no longer needed
- Date archived: December 2024

### Old Styles

**styles.css**
- Original stylesheet
- Replaced by: `styles-premium.css`
- Reason: Complete redesign with modern design system
- Date archived: December 2024

**styles-advanced.css**
- Advanced styling features
- Replaced by: `styles-premium.css`
- Reason: Consolidated into unified design system
- Date archived: December 2024

**styles-enterprise.css**
- Enterprise theme
- Replaced by: `styles-premium.css`
- Reason: Unified design system
- Date archived: December 2024

**styles-revolutionary.css**
- Revolutionary theme with experimental designs
- Replaced by: `styles-premium.css`
- Reason: Consolidated into main stylesheet
- Date archived: December 2024

### Old Questions

**questions-revolutionary.js**
- Revolutionary question set
- Replaced by: `questions.js`
- Reason: Consolidated into single question bank
- Date archived: December 2024

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

### Database
- `UNIFIED_DATABASE_COMPLETE.sql` - Complete database schema

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

**Last Updated**: December 2024
**Maintained By**: Development Team
**Questions**: Contact research.mdh.edu@gmail.com
