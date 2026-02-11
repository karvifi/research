// ============================================
// BRANCHING LOGIC ENGINE
// Determines which questions to show based on previous answers
// ============================================

const BranchingLogic = {
    /**
     * Determine participant pathway from profiling answers
     */
    determinePathway(profilingAnswers) {
        const years = parseInt(profilingAnswers.P2);
        const adoptionTiming = profilingAnswers.P4;
        const calibration = profilingAnswers.P7;
        const orgType = profilingAnswers.P8;
        const crossCultural = profilingAnswers.P9 === 'yes';
        
        // Determine experience level
        let experienceLevel;
        if (years < 5) experienceLevel = 'A-Junior';
        else if (years < 10) experienceLevel = 'B-MidCareer';
        else if (years < 20) experienceLevel = 'C-Senior';
        else experienceLevel = 'D-Expert';
        
        // Determine adoption route
        const adoptionRouteMap = {
            'first3months': 'R1-Innovator',
            '3to12months': 'R2-EarlyAdopter',
            '1to2years': 'R3-EarlyMajority',
            '2plusyears': 'R4-Skeptical'
        };
        const adoptionRoute = adoptionRouteMap[adoptionTiming];
        
        // Generate pathway ID
        const pathwayId = `${experienceLevel}-${adoptionRoute}`;
        
        return {
            pathwayId,
            experienceLevel,
            adoptionRoute,
            calibration,
            orgType,
            crossCultural
        };
    },
    
    /**
     * Get question list for a specific pathway
     */
    getQuestionFlow(pathway) {
        const questions = [];
        
        // Add profiling questions (always shown)
        questions.push(...QUESTIONS.profiling);
        
        // Add pathway-specific questions
        // [Logic for adding appropriate questions based on pathway]
        
        return questions;
    },
    
    /**
     * Check if a question should be displayed
     */
    shouldShowQuestion(questionId, previousAnswers, pathway) {
        // Implement conditional logic here
        // Example patterns shown below
        
        // Pattern 1: Show based on previous answer
        if (questionId === 'Q2.3SK-a' && previousAnswers['Q2.3SK'] !== 'still-skeptical') {
            return false;
        }
        
        // Pattern 2: Show based on pathway
        if (questionId.includes('-J') && !pathway.experienceLevel.includes('Junior')) {
            return false;
        }
        
        // Pattern 3: Show based on numeric threshold
        if (questionId === 'Q3.3-a' && parseInt(previousAnswers['Q3.3']) > 5) {
            return false;
        }
        
        // Default: show question
        return true;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BranchingLogic;
}
