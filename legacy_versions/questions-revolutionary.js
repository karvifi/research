// ============================================
// FUTURE OF CREATIVE WORK - EXECUTIVE RESEARCH SURVEY
// Revolutionary Question Bank | Neural Network Flow | Adaptive Logic
// ============================================

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// QUESTION HELPERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const createScaleQuestion = (id, section, questionText, options = {}) => ({
    id,
    type: 'scale',
    section,
    questionText,
    subtext: options.subtext,
    required: options.required !== false,
    min: options.min || 1,
    max: options.max || 7,
    default: options.default || 4,
    minLabel: options.minLabel || 'Strongly Disagree',
    maxLabel: options.maxLabel || 'Strongly Agree',
    showMarkers: options.showMarkers !== false,
    reverse: !!options.reverse
});

const createChoiceQuestion = (id, section, questionText, options = {}) => ({
    id,
    type: 'choice',
    section,
    questionText,
    subtext: options.subtext,
    required: options.required !== false,
    options: options.options || [],
    multiple: !!options.multiple,
    other: options.other !== false
});

const createTextQuestion = (id, section, questionText, options = {}) => ({
    id,
    type: 'text',
    section,
    questionText,
    subtext: options.subtext,
    required: options.required !== false,
    placeholder: options.placeholder || '',
    multiline: !!options.multiline,
    maxLength: options.maxLength
});

const createRankingQuestion = (id, section, questionText, options = {}) => ({
    id,
    type: 'ranking',
    section,
    questionText,
    subtext: options.subtext,
    required: options.required !== false,
    items: options.items || [],
    maxSelections: options.maxSelections
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXECUTIVE RESEARCH SURVEY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const EXECUTIVE_SURVEY = {
    // Phase 1: Neural Awakening (Eligibility & Context)
    neural_awakening: [
        {
            id: 'NA1',
            type: 'choice',
            section: 'Neural Awakening',
            questionText: 'What is your primary role in the creative industry?',
            subtext: 'Select the option that best describes your current position',
            required: true,
            options: [
                { value: 'creative_director', label: 'Creative Director / Executive' },
                { value: 'designer', label: 'Designer (UX/UI, Graphic, Product)' },
                { value: 'content_creator', label: 'Content Creator / Strategist' },
                { value: 'developer', label: 'Creative Technologist / Developer' },
                { value: 'manager', label: 'Creative Manager / Producer' },
                { value: 'consultant', label: 'Creative Consultant / Freelancer' },
                { value: 'academic', label: 'Academic / Researcher' },
                { value: 'other', label: 'Other (please specify)' }
            ],
            other: true
        },
        {
            id: 'NA2',
            type: 'scale',
            section: 'Neural Awakening',
            questionText: 'How many years of professional experience do you have in creative fields?',
            subtext: 'This helps us understand your perspective on industry transformation',
            required: true,
            min: 1,
            max: 6,
            minLabel: '0-2 years',
            maxLabel: '20+ years',
            showMarkers: false
        },
        {
            id: 'NA3',
            type: 'choice',
            section: 'Neural Awakening',
            questionText: 'Which creative technologies have you actively used in your professional work?',
            subtext: 'Select all that apply',
            required: true,
            multiple: true,
            options: [
                { value: 'ai_generation', label: 'AI Content Generation (DALL-E, Midjourney, etc.)' },
                { value: 'ai_writing', label: 'AI Writing Assistants (ChatGPT, Jasper, etc.)' },
                { value: 'ai_design', label: 'AI Design Tools (Uizard, Galileo, etc.)' },
                { value: 'automation', label: 'Creative Automation (Zapier, Integromat)' },
                { value: 'collaboration', label: 'Cloud Collaboration (Figma, Miro, etc.)' },
                { value: 'analytics', label: 'Creative Analytics & Insights' },
                { value: 'none', label: 'None - I haven\'t used creative technologies' }
            ]
        }
    ],

    // Phase 2: Cognitive Calibration (Trust & Decision Making)
    cognitive_calibration: [
        {
            id: 'CC1',
            type: 'scale',
            section: 'Cognitive Calibration',
            questionText: 'When evaluating AI-generated creative content, how much weight do you give to your own judgment versus the AI\'s output?',
            subtext: 'Consider your typical decision-making process',
            required: true,
            min: 1,
            max: 7,
            minLabel: 'AI output is primary',
            maxLabel: 'My judgment is primary'
        },
        {
            id: 'CC2',
            type: 'ranking',
            section: 'Cognitive Calibration',
            questionText: 'Rank these factors by importance when deciding whether to use AI-generated content in client work:',
            subtext: 'Drag to reorder from most important (1) to least important (5)',
            required: true,
            items: [
                'Client expectations and brand guidelines',
                'Technical quality and execution',
                'Originality and creative uniqueness',
                'Time and cost efficiency',
                'Ethical considerations and transparency'
            ],
            maxSelections: 5
        },
        {
            id: 'CC3',
            type: 'text',
            section: 'Cognitive Calibration',
            questionText: 'Describe a specific instance where you chose NOT to use AI-generated content, even when it was available and could save time.',
            subtext: 'What was your reasoning? What made human creativity essential in that moment?',
            required: true,
            multiline: true,
            maxLength: 500,
            placeholder: 'Share your experience and reasoning...'
        },
        {
            id: 'CC4',
            type: 'scale',
            section: 'Cognitive Calibration',
            questionText: 'How has working with AI tools changed your perception of your own creative abilities?',
            subtext: 'Reflect on how AI integration has affected your confidence and self-assessment',
            required: true,
            min: 1,
            max: 7,
            minLabel: 'Significantly diminished',
            maxLabel: 'Significantly enhanced'
        }
    ],

    // Phase 3: Collaborative Intelligence (Human-AI Dynamics)
    collaborative_intelligence: [
        {
            id: 'CI1',
            type: 'choice',
            section: 'Collaborative Intelligence',
            questionText: 'In your experience, what is the most valuable contribution AI makes to creative work?',
            subtext: 'Select the option that resonates most with your professional experience',
            required: true,
            options: [
                { value: 'speed', label: 'Speed and efficiency in production' },
                { value: 'exploration', label: 'Expanding creative exploration and ideation' },
                { value: 'consistency', label: 'Maintaining consistency and quality standards' },
                { value: 'accessibility', label: 'Making creative tools more accessible' },
                { value: 'insights', label: 'Providing data-driven creative insights' },
                { value: 'none', label: 'AI hasn\'t made valuable contributions yet' }
            ]
        },
        {
            id: 'CI2',
            type: 'scale',
            section: 'Collaborative Intelligence',
            questionText: 'To what extent do you view AI as a creative partner rather than just a tool?',
            subtext: 'Consider your relationship with AI in your creative process',
            required: true,
            min: 1,
            max: 7,
            minLabel: 'Just a tool',
            maxLabel: 'True creative partner'
        },
        {
            id: 'CI3',
            type: 'text',
            section: 'Collaborative Intelligence',
            questionText: 'Imagine you\'re mentoring a junior creative professional. How would you describe the ideal human-AI collaboration workflow?',
            subtext: 'What role should each play? How should they complement each other?',
            required: true,
            multiline: true,
            maxLength: 600,
            placeholder: 'Describe your vision of ideal human-AI creative collaboration...'
        },
        {
            id: 'CI4',
            type: 'choice',
            section: 'Collaborative Intelligence',
            questionText: 'Which of these scenarios best describes your current approach to AI in creative work?',
            subtext: 'Select the option that most closely matches your experience',
            required: true,
            options: [
                { value: 'experimental', label: 'Experimental - I use AI for exploration and prototyping' },
                { value: 'integrated', label: 'Integrated - AI is part of my standard workflow' },
                { value: 'selective', label: 'Selective - I use AI only for specific, well-defined tasks' },
                { value: 'supervisory', label: 'Supervisory - I oversee AI outputs but don\'t create with it directly' },
                { value: 'avoidant', label: 'Avoidant - I prefer to work without AI assistance' }
            ]
        }
    ],

    // Phase 4: Evolutionary Pressure (Industry Transformation)
    evolutionary_pressure: [
        {
            id: 'EP1',
            type: 'scale',
            section: 'Evolutionary Pressure',
            questionText: 'How prepared do you feel to compete in a creative industry where AI is widely adopted?',
            subtext: 'Consider both your current skills and your ability to adapt',
            required: true,
            min: 1,
            max: 7,
            minLabel: 'Not prepared at all',
            maxLabel: 'Extremely well prepared'
        },
        {
            id: 'EP2',
            type: 'choice',
            section: 'Evolutionary Pressure',
            questionText: 'Which skills do you believe will become most critical for creative professionals in the AI era?',
            subtext: 'Select up to 3 that you consider essential',
            required: true,
            multiple: true,
            options: [
                { value: 'strategic_thinking', label: 'Strategic thinking and creative direction' },
                { value: 'technical_fluency', label: 'AI tool fluency and technical understanding' },
                { value: 'ethical_reasoning', label: 'Ethical reasoning and responsible AI use' },
                { value: 'human_centric', label: 'Human-centered design and empathy' },
                { value: 'adaptive_learning', label: 'Continuous learning and adaptation' },
                { value: 'collaboration', label: 'Cross-disciplinary collaboration skills' },
                { value: 'quality_assessment', label: 'Advanced quality assessment and curation' }
            ],
            maxSelections: 3
        },
        {
            id: 'EP3',
            type: 'text',
            section: 'Evolutionary Pressure',
            questionText: 'Looking 5 years into the future, how do you envision your role in the creative industry evolving?',
            subtext: 'What changes do you anticipate in your work, skills, and professional identity?',
            required: true,
            multiline: true,
            maxLength: 700,
            placeholder: 'Share your vision for your future in the creative industry...'
        },
        {
            id: 'EP4',
            type: 'scale',
            section: 'Evolutionary Pressure',
            questionText: 'How optimistic are you about the future of creative professions in the age of AI?',
            subtext: 'Consider both opportunities and challenges',
            required: true,
            min: 1,
            max: 7,
            minLabel: 'Very pessimistic',
            maxLabel: 'Very optimistic'
        }
    ],

    // Phase 5: Quantum Insights (Deep Reflection)
    quantum_insights: [
        {
            id: 'QI1',
            type: 'text',
            section: 'Quantum Insights',
            questionText: 'What is the most profound insight you\'ve gained about creativity through working with AI?',
            subtext: 'This could be about human creativity, AI capabilities, or the relationship between them',
            required: true,
            multiline: true,
            maxLength: 800,
            placeholder: 'Share your deepest insight about creativity and AI...'
        },
        {
            id: 'QI2',
            type: 'choice',
            section: 'Quantum Insights',
            questionText: 'If you could give one piece of advice to creative professionals just starting to work with AI, what would it be?',
            subtext: 'What wisdom would you pass on based on your experience?',
            required: true,
            options: [
                { value: 'embrace_curiosity', label: 'Embrace curiosity - experiment fearlessly' },
                { value: 'maintain_standards', label: 'Maintain high standards - don\'t compromise on quality' },
                { value: 'develop_discernment', label: 'Develop discernment - learn to evaluate AI outputs critically' },
                { value: 'focus_relationship', label: 'Focus on the relationship - treat AI as a creative partner' },
                { value: 'continuous_learning', label: 'Commit to continuous learning - AI evolves rapidly' },
                { value: 'ethical_awareness', label: 'Develop ethical awareness - consider broader implications' },
                { value: 'human_essence', label: 'Emphasize human essence - what only humans can contribute' }
            ]
        },
        {
            id: 'QI3',
            type: 'scale',
            section: 'Quantum Insights',
            questionText: 'To what extent has working with AI changed your definition of what it means to be a creative professional?',
            subtext: 'Has your understanding of creativity and professional identity evolved?',
            required: true,
            min: 1,
            max: 7,
            minLabel: 'Not changed at all',
            maxLabel: 'Completely redefined'
        },
        {
            id: 'QI4',
            type: 'text',
            section: 'Quantum Insights',
            questionText: 'What question about human-AI creative collaboration would you most like answered by future research?',
            subtext: 'What gap in our understanding needs to be addressed?',
            required: true,
            multiline: true,
            maxLength: 400,
            placeholder: 'What question keeps you up at night about the future of creative work?'
        }
    ],

    // Phase 6: Demographic Synthesis (Context Building)
    demographic_synthesis: [
        {
            id: 'DS1',
            type: 'choice',
            section: 'Demographic Synthesis',
            questionText: 'In which country do you currently work?',
            required: true,
            options: [
                { value: 'us', label: 'United States' },
                { value: 'uk', label: 'United Kingdom' },
                { value: 'germany', label: 'Germany' },
                { value: 'canada', label: 'Canada' },
                { value: 'australia', label: 'Australia' },
                { value: 'netherlands', label: 'Netherlands' },
                { value: 'singapore', label: 'Singapore' },
                { value: 'india', label: 'India' },
                { value: 'france', label: 'France' },
                { value: 'japan', label: 'Japan' },
                { value: 'other', label: 'Other (please specify)' }
            ],
            other: true
        },
        {
            id: 'DS2',
            type: 'scale',
            section: 'Demographic Synthesis',
            questionText: 'What is your age range?',
            required: true,
            min: 1,
            max: 6,
            minLabel: '18-24',
            maxLabel: '55+',
            showMarkers: false
        },
        {
            id: 'DS3',
            type: 'choice',
            section: 'Demographic Synthesis',
            questionText: 'What is the primary industry sector you serve?',
            required: true,
            options: [
                { value: 'technology', label: 'Technology & Software' },
                { value: 'finance', label: 'Financial Services' },
                { value: 'healthcare', label: 'Healthcare & Life Sciences' },
                { value: 'retail', label: 'Retail & E-commerce' },
                { value: 'media', label: 'Media & Entertainment' },
                { value: 'education', label: 'Education' },
                { value: 'nonprofit', label: 'Non-profit & Social Impact' },
                { value: 'government', label: 'Government & Public Sector' },
                { value: 'other', label: 'Other / Multiple sectors' }
            ]
        }
    ]
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SURVEY FLOW CONFIGURATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const SURVEY_PHASES = [
    { key: 'neural_awakening', name: 'Neural Awakening', icon: '🎯', description: 'Eligibility & Context' },
    { key: 'cognitive_calibration', name: 'Cognitive Calibration', icon: '⚖️', description: 'Trust & Decision Making' },
    { key: 'collaborative_intelligence', name: 'Collaborative Intelligence', icon: '🤖', description: 'Human-AI Dynamics' },
    { key: 'evolutionary_pressure', name: 'Evolutionary Pressure', icon: '🔄', description: 'Industry Transformation' },
    { key: 'quantum_insights', name: 'Quantum Insights', icon: '💭', description: 'Deep Reflection' },
    { key: 'demographic_synthesis', name: 'Demographic Synthesis', icon: '📊', description: 'Context Building' }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// UTILITY FUNCTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function getAllQuestions() {
    return Object.values(EXECUTIVE_SURVEY).flat();
}

function getQuestionById(id) {
    return getAllQuestions().find(q => q.id === id);
}

function getQuestionsByPhase(phaseKey) {
    return EXECUTIVE_SURVEY[phaseKey] || [];
}

function getPhaseByQuestionId(questionId) {
    for (const [phaseKey, questions] of Object.entries(EXECUTIVE_SURVEY)) {
        if (questions.some(q => q.id === questionId)) {
            return SURVEY_PHASES.find(p => p.key === phaseKey);
        }
    }
    return null;
}

function getTotalQuestions() {
    return getAllQuestions().length;
}

function validateQuestionResponse(question, response) {
    if (question.required && (!response || response === '')) {
        return 'This question is required.';
    }

    switch (question.type) {
        case 'scale':
            const numResponse = parseInt(response);
            if (isNaN(numResponse) || numResponse < question.min || numResponse > question.max) {
                return `Please select a value between ${question.min} and ${question.max}.`;
            }
            break;
        case 'choice':
            if (question.multiple) {
                if (!Array.isArray(response) || response.length === 0) {
                    return 'Please select at least one option.';
                }
                if (question.maxSelections && response.length > question.maxSelections) {
                    return `Please select no more than ${question.maxSelections} options.`;
                }
            } else {
                if (!response || response === '') {
                    return 'Please select an option.';
                }
            }
            break;
        case 'text':
            if (question.maxLength && response && response.length > question.maxLength) {
                return `Please limit your response to ${question.maxLength} characters.`;
            }
            break;
        case 'ranking':
            if (!Array.isArray(response) || response.length !== question.items.length) {
                return 'Please rank all items.';
            }
            break;
    }

    return null; // Valid
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXPORT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const EXECUTIVE_QUESTIONS = {
    survey: EXECUTIVE_SURVEY,
    phases: SURVEY_PHASES,
    getAllQuestions,
    getQuestionById,
    getQuestionsByPhase,
    getPhaseByQuestionId,
    getTotalQuestions,
    validateQuestionResponse
};
