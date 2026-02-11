// ============================================
// SUPABASE CONFIGURATION
// ============================================

// SECURITY NOTE: These are PUBLIC keys designed for client-side use
// Row-level security (RLS) in Supabase protects your data
// The anon key has limited permissions defined in your database policies

const SUPABASE_CONFIG = {
    url: 'https://oyveosroqukmdnnzcmrw.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95dmVvc3JvcXVrbWRubnpjbXJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0NjkzNzIsImV4cCI6MjA4NjA0NTM3Mn0.9XqmIn_YSbLw5ZQjpJIl-9f32rPsPHkIOHh8cdZiu5Y'
};

// Prevent config modification
Object.freeze(SUPABASE_CONFIG);

// ============================================
// APPLICATION CONFIGURATION
// ============================================

const APP_CONFIG = {
    // Study Information
    studyTitle: 'Calibrated Trust Research Study',
    principalInvestigator: 'Kartik Maurya',

    contactEmail: 'research.mdh.edu@gmail.com',
    studyDuration: '60–90 minutes',

    // ProxyCurl REMOVED (3-layer signal stack redesign)

    compensation: 'None (voluntary participation)',
    // Compensation (set to none unless you actually pay participants)
    compensationAmount: 'None',
    compensationMethod: 'N/A',

    // Timing
    estimatedDuration: 90, // minutes
    minCompletionTime: 30, // minimum time to prevent rushing (minutes)

    // Data Settings
    autoSaveInterval: 120, // seconds (2 minutes)

    // Validation
    minWordCount: {
        short: 50,      // For short text responses
        medium: 200,    // For medium text responses
        long: 300       // For long narrative responses
    },

    // Response limits
    maxIterations: 999,
    maxYearsExperience: 60,

    // Features
    enableSaveResume: true,
    enableEmailCollection: true,
    enableFollowUpInterest: true,

    // --- AUTOMATION SETTINGS ---
    // If you want to use Google Meet, paste your link below.
    // If left empty, the system will automatically use Jitsi Meet (Free).
    googleMeetUrl: ''
};

// ============================================
// QUESTION SECTION CONFIGURATION
// ============================================

const SECTION_CONFIG = {
    sections: [
        { id: 'profiling', name: 'Profiling', weight: 10 },
        { id: 'identity-baseline', name: 'Professional Identity Baseline', weight: 12 },
        { id: 'adoption', name: 'Adoption Journey', weight: 15 },
        { id: 'calibration', name: 'Calibration Mechanics', weight: 25 },
        { id: 'identity-transformation', name: 'Identity Transformation', weight: 15 },
        { id: 'organizational', name: 'Organizational Context', weight: 10 },
        { id: 'failures', name: 'Failures & Learning', weight: 8 },
        { id: 'future', name: 'Future & Reflection', weight: 5 }
    ]
};

// ============================================
// PATHWAY LOGIC CONFIGURATION
// ============================================

const PATHWAY_CONFIG = {
    experienceLevels: {
        junior: { min: 0, max: 4, code: 'A' },
        midCareer: { min: 5, max: 9, code: 'B' },
        senior: { min: 10, max: 19, code: 'C' },
        expert: { min: 20, max: 999, code: 'D' }
    },

    adoptionRoutes: {
        innovator: { key: 'first3months', code: 'R1' },
        earlyAdopter: { key: '3to12months', code: 'R2' },
        earlyMajority: { key: '1to2years', code: 'R3' },
        skeptical: { key: '2plusyears', code: 'R4' }
    },

    calibrationStatus: {
        underTrusting: 'under-trust',
        calibrating: 'calibrating',
        wellCalibrated: 'well-calibrated',
        overTrusting: 'over-trust'
    },

    orgTypes: {
        freelance: 'freelance',
        smallStudio: 'small-studio',
        largeAgency: 'large-agency',
        corporate: 'corporate'
    }
};

// ============================================
// BRANCHING LOGIC THRESHOLDS
// ============================================

const LOGIC_THRESHOLDS = {
    iterations: {
        veryEfficient: 5,
        efficient: 15,
        substantial: 30
    },

    projects: {
        beginner: 5,
        developing: 15,
        experienced: 30,
        expert: 50
    },

    wordCountValidation: {
        short: { min: 50, ideal: 100 },
        medium: { min: 200, ideal: 400 },
        long: { min: 300, ideal: 600 }
    }
};

// ============================================
// UI TEXT CONTENT
// ============================================

const UI_TEXT = {
    errors: {
        required: 'This question is required. Please provide an answer.',
        minWords: 'Please provide more detail. Minimum {min} words required.',
        invalidNumber: 'Please enter a valid number.',
        invalidEmail: 'Please enter a valid email address.',
        consentRequired: 'Please check all required consent boxes to continue.',
        minTime: 'Please take more time to thoughtfully complete the survey.',
        networkError: 'Network error. Please check your connection and try again.',
        saveError: 'Could not save your response. Please try again.'
    },

    success: {
        autoSaved: 'Progress saved automatically',
        submitted: 'Response submitted successfully!',
        copied: 'Copied to clipboard'
    },

    warnings: {
        unsavedChanges: 'You have unsaved changes. Are you sure you want to leave?',
        minTime: 'This survey should take at least {min} minutes. Please ensure you\'re providing thoughtful responses.'
    },

    info: {
        optional: '(Optional)',
        required: '(Required)',
        saving: 'Saving your response...',
        loading: 'Loading...'
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SUPABASE_CONFIG,
        APP_CONFIG,
        SECTION_CONFIG,
        PATHWAY_CONFIG,
        LOGIC_THRESHOLDS,
        UI_TEXT
    };
}
