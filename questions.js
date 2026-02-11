// ============================================
// QUESTION BANK - CTCP QUANTITATIVE SURVEY (LINEAR)
// Source: THESIS_PRODUCTION/PHD_RESEARCH_PROGRAM/02_SURVEY_INSTRUMENT.md
// ============================================

const likertAgree7 = (id, section, questionText, opts = {}) => ({
    id,
    type: 'scale',
    section,
    questionText,
    subtext: opts.subtext,
    required: opts.required !== false,
    min: 1,
    max: 7,
    default: 4,
    minLabel: 'Strongly Disagree',
    maxLabel: 'Strongly Agree',
    reverse: !!opts.reverse
});

const likertExtent7 = (id, section, questionText, opts = {}) => ({
    id,
    type: 'scale',
    section,
    questionText,
    subtext: opts.subtext,
    required: opts.required !== false,
    min: 1,
    max: 7,
    default: 4,
    minLabel: 'Not at all',
    maxLabel: 'To a great extent',
    reverse: !!opts.reverse
});

const likertAccurate7 = (id, section, questionText, opts = {}) => ({
    id,
    type: 'scale',
    section,
    questionText,
    subtext: opts.subtext,
    required: opts.required !== false,
    min: 1,
    max: 7,
    default: 4,
    minLabel: 'Not at all accurate',
    maxLabel: 'Extremely accurate',
    reverse: !!opts.reverse
});

const QUESTIONS = {
    // Keep profiling empty to avoid branching logic for this instrument.
    profiling: [],

    // Linear survey instrument
    survey: [
        // Section 1: Screening
        {
            id: 'Q1',
            type: 'radio',
            section: 'Screening',
            questionText: 'Which core AI tool do you use most frequently?',
            infographic: 'research-framework',
            required: true,
            expansionLabel: 'Please name the custom or niche tool...',
            options: [
                { value: 'midjourney', label: 'Midjourney' },
                { value: 'dalle', label: 'DALL-E' },
                { value: 'stable', label: 'Stable Diffusion' },
                { value: 'other', label: 'Other Tool', expand: true }
            ]
        },
        {
            id: 'Q2',
            type: 'radio',
            section: 'Screening',
            questionText: 'Have you used generative AI tools in your professional work for at least 3 months?',
            required: true,
            options: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
            ]
        },
        {
            id: 'Q3',
            type: 'radio',
            section: 'Screening',
            questionText: 'How many years of professional experience do you have in your creative field?',
            required: true,
            options: [
                { value: 'lt2', label: 'Less than 2 years' },
                { value: '2-5', label: '2-5 years' },
                { value: '5-10', label: '5-10 years' },
                { value: '10-20', label: '10-20 years' },
                { value: 'gt20', label: 'More than 20 years' }
            ]
        },

        // Section 2: Demographics & background
        {
            id: 'Q4',
            type: 'number',
            section: 'Demographics',
            questionText: 'Age',
            subtext: 'Enter your age in years (18-100).',
            required: true,
            min: 18,
            max: 100
        },
        {
            id: 'Q5',
            type: 'radio',
            section: 'Demographics',
            questionText: 'Gender',
            required: true,
            options: [
                { value: 'female', label: 'Female' },
                { value: 'male', label: 'Male' },
                { value: 'nonbinary', label: 'Non-binary' },
                { value: 'no-say', label: 'Prefer not to say' }
            ]
        },
        {
            id: 'Q6',
            type: 'radio',
            section: 'Demographics',
            questionText: 'Country of residence',
            required: true,
            options: [
                { value: 'us', label: 'United States' },
                { value: 'germany', label: 'Germany' },
                { value: 'india', label: 'India' },
                { value: 'singapore', label: 'Singapore' },
                { value: 'uk', label: 'United Kingdom' },
                { value: 'canada', label: 'Canada' },
                { value: 'australia', label: 'Australia' },
                { value: 'netherlands', label: 'Netherlands' },
                { value: 'france', label: 'France' },
                { value: 'spain', label: 'Spain' },
                { value: 'italy', label: 'Italy' },
                { value: 'other', label: 'Other', expand: true }
            ]
        },
        {
            id: 'Q7',
            type: 'radio',
            section: 'Demographics',
            questionText: 'Primary creative field',
            required: true,
            options: [
                { value: 'graphic-design', label: 'Graphic/visual design' },
                { value: 'ux-ui', label: 'UX/UI design' },
                { value: 'content-writing', label: 'Content writing/copywriting' },
                { value: 'marketing', label: 'Marketing/advertising' },
                { value: 'architecture', label: 'Architecture' },
                { value: 'product-design', label: 'Product design' },
                { value: 'illustration', label: 'Illustration/art' },
                { value: 'video', label: 'Video/motion graphics' },
                { value: 'other', label: 'Other', expand: true }
            ]
        },
        {
            id: 'Q8',
            type: 'radio',
            section: 'Demographics',
            questionText: 'Employment type',
            required: true,
            options: [
                { value: 'agency', label: 'Employed in agency' },
                { value: 'in-house', label: 'Employed in-house (corporate)' },
                { value: 'freelance', label: 'Freelance/independent' },
                { value: 'academic', label: 'Academic/educator' },
                { value: 'other', label: 'Other', expand: true }
            ]
        },
        {
            id: 'Q9',
            type: 'radio',
            section: 'Demographics',
            questionText: 'Organization size (if applicable)',
            required: true,
            options: [
                { value: 'solo', label: 'Solo/freelance' },
                { value: '2-10', label: '2-10 employees' },
                { value: '11-50', label: '11-50 employees' },
                { value: '51-200', label: '51-200 employees' },
                { value: '201-1000', label: '201-1,000 employees' },
                { value: 'gt1000', label: 'More than 1,000 employees' }
            ]
        },
        {
            id: 'Q10',
            type: 'checkbox',
            section: 'Demographics',
            questionText: 'Which generative AI tools do you use?',
            subtext: 'Select all that apply.',
            required: true,
            options: [
                { value: 'midjourney', label: 'Midjourney' },
                { value: 'dalle', label: 'DALL-E' },
                { value: 'stable-diffusion', label: 'Stable Diffusion' },
                { value: 'chatgpt', label: 'ChatGPT' },
                { value: 'claude', label: 'Claude' },
                { value: 'jasper', label: 'Jasper' },
                { value: 'copyai', label: 'Copy.ai' },
                { value: 'runway', label: 'Runway' },
                { value: 'firefly', label: 'Adobe Firefly' },
                { value: 'canva-ai', label: 'Canva AI' },
                { value: 'other', label: 'Other', expand: true }
            ]
        },
        {
            id: 'Q11',
            type: 'radio',
            section: 'Demographics',
            questionText: 'How long have you been using generative AI professionally?',
            required: true,
            options: [
                { value: '3-6m', label: '3-6 months' },
                { value: '6-12m', label: '6-12 months' },
                { value: '1-2y', label: '1-2 years' },
                { value: 'gt2y', label: 'More than 2 years' }
            ]
        },
        {
            id: 'Q12',
            type: 'radio',
            section: 'Demographics',
            questionText: 'Approximately how many projects have you completed using AI tools?',
            required: true,
            options: [
                { value: '1-5', label: '1-5 projects' },
                { value: '6-15', label: '6-15 projects' },
                { value: '16-30', label: '16-30 projects' },
                { value: '31-50', label: '31-50 projects' },
                { value: 'gt50', label: 'More than 50 projects' }
            ]
        },

        // Section 3: Scenario-based Situated Judgment
        {
            id: 'SC-A',
            type: 'radio',
            section: 'Scenario: AI Suggestion',
            questionText: 'In this situation, what would you most likely do?',
            scenario: {
                image: 'scenario-ai-suggestion',
                context: 'You are reviewing a layout suggestion generated by an AI design tool during an ongoing client project. The suggestion appears in your main workspace alongside your current draft.'
            },
            required: true,
            options: [
                { value: 'accept', label: 'Accept the AI suggestion and refine it' },
                { value: 'modify', label: 'Modify and override parts of the AI suggestion' },
                { value: 'reject', label: 'Reject the AI suggestion and stay with my current version' },
                { value: 'consult', label: 'Ask a colleague or stakeholder before deciding' }
            ]
        },
        {
            id: 'SC-B1',
            type: 'radio',
            section: 'Scenario: Time Pressure',
            questionText: 'In this scenario, how would you assess your trust in the AI suggestion?',
            scenario: {
                image: 'scenario-deadline',
                context: 'Deadline Alert — You have 1 hour left before a scheduled client presentation. Your AI tool has generated a design suggestion that you could incorporate.'
            },
            required: true,
            options: [
                { value: 'trust', label: 'I trust the AI suggestion and would proceed with it' },
                { value: 'check', label: 'I would check it carefully before using it' },
                { value: 'judgment', label: 'I would rely more on my judgment than AI' },
                { value: 'avoid', label: 'I would avoid using AI under tight deadlines' }
            ]
        },
        {
            id: 'SC-B2',
            type: 'radio',
            section: 'Scenario: High Stakes',
            questionText: 'In this scenario, how would you assess your trust in the AI output?',
            scenario: {
                image: 'scenario-stakeholder',
                context: 'High-Stakes Review — Senior leadership is now evaluating your design with the AI output visible.'
            },
            required: true,
            options: [
                { value: 'trust', label: 'I trust the AI suggestion and would proceed with it' },
                { value: 'check', label: 'I would check it carefully before using it' },
                { value: 'judgment', label: 'I would rely more on my judgment than AI' },
                { value: 'avoid', label: 'I would avoid using AI under such scrutiny' }
            ]
        },

        // Section 3: CAT scale (1-7 agree)
        ...[
            // Strategic Appropriateness Assessment
            likertAgree7('CAT1', 'CAT: Strategic Appropriateness', 'I can reliably judge whether AI-generated output aligns with project strategic goals.', { infographic: 'ctcp-dimensions' }),
            likertAgree7('CAT2', 'CAT: Strategic Appropriateness', 'I trust my ability to evaluate if AI output serves the intended business objectives.'),
            likertAgree7('CAT3', 'CAT: Strategic Appropriateness', 'I am confident assessing whether AI-generated work fits the strategic context.'),
            likertAgree7('CAT4', 'CAT: Strategic Appropriateness', 'I can accurately determine if AI output supports broader strategic aims.'),
            likertAgree7('CAT5', 'CAT: Strategic Appropriateness', 'I find it challenging to judge the strategic fit of AI-generated content.', { reverse: true, subtext: 'Reverse-scored item to ensure response consistency.' }),

            // Cultural Resonance Evaluation
            likertAgree7('CAT6', 'CAT: Cultural Resonance', 'I can effectively judge whether AI output will resonate with the target cultural audience.'),
            likertAgree7('CAT7', 'CAT: Cultural Resonance', 'I trust my ability to assess cultural appropriateness of AI-generated content.'),
            likertAgree7('CAT8', 'CAT: Cultural Resonance', 'I am confident evaluating if AI output aligns with cultural values and norms.'),
            likertAgree7('CAT9', 'CAT: Cultural Resonance', 'I can reliably determine whether AI-generated work will be culturally meaningful.'),
            likertAgree7('CAT10', 'CAT: Cultural Resonance', 'I struggle to assess the cultural relevance of AI-generated outputs.', { reverse: true, subtext: 'Reverse-scored item to ensure response consistency.' }),

            // Brand Alignment Assessment
            likertAgree7('CAT11', 'CAT: Brand Alignment', 'I can accurately judge whether AI output aligns with brand identity.'),
            likertAgree7('CAT12', 'CAT: Brand Alignment', 'I trust my ability to evaluate brand consistency in AI-generated content.'),
            likertAgree7('CAT13', 'CAT: Brand Alignment', 'I am confident assessing if AI output matches the brand voice and values.'),
            likertAgree7('CAT14', 'CAT: Brand Alignment', 'I can reliably determine whether AI-generated work fits the brand personality.'),
            likertAgree7('CAT15', 'CAT: Brand Alignment', 'I find it difficult to maintain brand consistency when using AI tools.', { reverse: true, subtext: 'Reverse-scored item to ensure response consistency.' }),

            // Aesthetic Quality Judgment
            likertAgree7('CAT16', 'CAT: Aesthetic Quality', 'I can effectively distinguish high-quality vs. low-quality AI outputs aesthetically.'),
            likertAgree7('CAT17', 'CAT: Aesthetic Quality', 'I trust my ability to evaluate aesthetic excellence in AI-generated work.'),
            likertAgree7('CAT18', 'CAT: Aesthetic Quality', 'I am confident judging the aesthetic value of AI outputs for professional use.'),
            likertAgree7('CAT19', 'CAT: Aesthetic Quality', 'I can reliably assess whether AI-generated aesthetics meet professional standards.'),

            // Stakeholder Acceptance Anticipation
            likertAgree7('CAT20', 'CAT: Stakeholder Acceptance', 'I can accurately predict whether stakeholders will accept AI-generated outputs.'),
            likertAgree7('CAT21', 'CAT: Stakeholder Acceptance', 'I trust my ability to anticipate stakeholder reactions to AI-generated work.'),
            likertAgree7('CAT22', 'CAT: Stakeholder Acceptance', 'I am confident assessing whether AI output will satisfy client/stakeholder expectations.'),
            likertAgree7('CAT23', 'CAT: Stakeholder Acceptance', 'I can reliably judge if stakeholders will view AI-generated content as appropriate.'),

            // Overall calibration (not part of subscales)
            likertAgree7('CAT24', 'CAT: Overall Calibration', 'My trust in AI tools is well-calibrated to their actual capabilities.'),
            likertAgree7('CAT25', 'CAT: Overall Calibration', 'I neither over-trust nor under-trust AI tools in my professional work.'),
            likertAgree7('CAT26', 'CAT: Overall Calibration', 'I have an accurate understanding of when to rely on vs. override AI outputs.')
        ],

        // Section 4: Professional identity transformation (1-7 accurate)
        ...[
            likertAccurate7('ID1', 'Identity: Executor', 'I see myself primarily as someone who creates content from scratch.', { reverse: true, infographic: 'identity-spectrum' }),
            likertAccurate7('ID2', 'Identity: Executor', 'My professional value lies in hands-on execution and production.', { reverse: true }),
            likertAccurate7('ID3', 'Identity: Executor', 'I define my expertise by my ability to make/produce creative work.', { reverse: true }),
            likertAccurate7('ID4', 'Identity: Executor', 'I am fundamentally a maker/creator in my professional role.', { reverse: true }),

            likertAccurate7('ID5', 'Identity: Curator', 'I see myself increasingly as a curator of AI-generated options.'),
            likertAccurate7('ID6', 'Identity: Curator', 'My professional value now lies more in selection and refinement than creation.'),
            likertAccurate7('ID7', 'Identity: Curator', 'I define my expertise by my judgment and evaluation capabilities.'),
            likertAccurate7('ID8', 'Identity: Curator', 'I am fundamentally a strategic curator in my professional role.'),
            likertAccurate7('ID9', 'Identity: Curator', 'My work involves more evaluating appropriateness than generating from scratch.'),

            // The Four Pillars of Evolved Expertise (NEW)
            likertAccurate7('EXP1', 'Expertise: Pillars', 'My expertise is defined by my Strategic Vision (predicting long-term impact).'),
            likertAccurate7('EXP2', 'Expertise: Pillars', 'My expertise is defined by my Cultural Intelligence (nuanced audience understanding).'),
            likertAccurate7('EXP3', 'Expertise: Pillars', 'My expertise is defined by my Contextual Judgment (judging situational fit).'),
            likertAccurate7('EXP4', 'Expertise: Pillars', 'My expertise is defined by my AI Collaboration (orchestrating technological tools).'),

            likertAccurate7('ID10', 'Identity: Uncertainty', 'I feel uncertain about what my professional identity means anymore.'),
            likertAccurate7('ID11', 'Identity: Uncertainty', "I\'m unclear about what defines expertise in my field now."),
            likertAccurate7('ID12', 'Identity: Uncertainty', 'I struggle to articulate my professional value proposition with AI involved.')
        ],

        // Section 5: Trust-identity spirals (1-7 agree)
        ...[
            likertAgree7('SP1', 'Spirals: Virtuous', 'As my trust in AI tools has grown, my confidence as a professional curator has increased.'),
            likertAgree7('SP2', 'Spirals: Virtuous', 'My stronger curatorial identity makes me trust AI outputs more appropriately.'),
            likertAgree7('SP3', 'Spirals: Virtuous', 'Increased trust and stronger identity reinforce each other positively in my work.'),
            likertAgree7('SP4', 'Spirals: Virtuous', "I\'m in a positive cycle where trust and identity support each other."),

            likertAgree7('SP5', 'Spirals: Vicious', 'Difficulty trusting AI appropriately has undermined my professional confidence.'),
            likertAgree7('SP6', 'Spirals: Vicious', 'My identity uncertainty makes it harder to calibrate trust in AI.'),
            likertAgree7('SP7', 'Spirals: Vicious', "I\'m stuck in a negative cycle where trust issues and identity concerns reinforce each other."),
            likertAgree7('SP8', 'Spirals: Vicious', 'Mistrust of AI and professional insecurity feed into each other in my experience.')
        ],

        // Section 6: Organizational capabilities (1-7 extent)
        ...[
            likertExtent7('OC1', 'Org Capabilities: Complementary Investment', 'My organization invests in AI tools AND in training humans to use them well.', { infographic: 'org-pillars' }),
            likertExtent7('OC2', 'Org Capabilities: Complementary Investment', 'Resources are allocated both to technology and to developing human judgment.'),
            likertExtent7('OC3', 'Org Capabilities: Complementary Investment', 'The organization treats AI and human capabilities as complementary, not substitutes.'),
            likertExtent7('OC4', 'Org Capabilities: Complementary Investment', 'Investment decisions balance AI tools with support for professional development.'),

            likertExtent7('OC5', 'Org Capabilities: Evaluation Systems', 'My organization has clear criteria for evaluating AI-assisted creative work.'),
            likertExtent7('OC6', 'Org Capabilities: Evaluation Systems', 'We have systems to assess contextual appropriateness, not just technical quality.'),
            likertExtent7('OC7', 'Org Capabilities: Evaluation Systems', 'Quality standards account for the unique challenges of AI-generated content.'),
            likertExtent7('OC8', 'Org Capabilities: Evaluation Systems', 'Evaluation frameworks help professionals make appropriate trust decisions.'),

            likertExtent7('OC9', 'Org Capabilities: Learning Infrastructure', 'My organization provides structured opportunities to learn AI tool capabilities.'),
            likertExtent7('OC10', 'Org Capabilities: Learning Infrastructure', "There\'s time and space to experiment and calibrate understanding of AI."),
            likertExtent7('OC11', 'Org Capabilities: Learning Infrastructure', 'Knowledge about effective AI use is shared systematically across the organization.'),
            likertExtent7('OC12', 'Org Capabilities: Learning Infrastructure', 'We have processes for documenting and disseminating AI usage learnings.'),

            likertExtent7('OC13', 'Org Capabilities: Cultural Support', "My organization\'s culture supports thoughtful experimentation with AI."),
            likertExtent7('OC14', 'Org Capabilities: Cultural Support', "It\'s safe to discuss both successes and failures with AI tools."),
            likertExtent7('OC15', 'Org Capabilities: Cultural Support', 'Leadership actively encourages calibrated, appropriate use of AI.'),
            likertExtent7('OC16', 'Org Capabilities: Cultural Support', 'The organizational culture values human judgment alongside AI capabilities.'),

            likertExtent7('OC17', 'Org Capabilities: Strategic-Operational Bridging', 'Strategic AI goals are clearly connected to operational workflows.'),
            likertExtent7('OC18', 'Org Capabilities: Strategic-Operational Bridging', "There\'s alignment between AI strategy and day-to-day implementation."),
            likertExtent7('OC19', 'Org Capabilities: Strategic-Operational Bridging', "Leadership and practitioners have shared understanding of AI\'s role."),
            likertExtent7('OC20', 'Org Capabilities: Strategic-Operational Bridging', 'Strategic vision translates into practical guidance for AI use.'),

            likertExtent7('OC21', 'Org Capabilities: Dynamic Adaptation', 'My organization adapts AI strategies based on learning and experience.'),
            likertExtent7('OC22', 'Org Capabilities: Dynamic Adaptation', 'We regularly update our approach to AI as tools and understanding evolve.'),
            likertExtent7('OC23', 'Org Capabilities: Dynamic Adaptation', 'The organization is agile in responding to AI-related challenges and opportunities.'),
            likertExtent7('OC24', 'Org Capabilities: Dynamic Adaptation', 'Our organizational workflows are rigid and slow to adapt to AI developments.', { reverse: true, subtext: 'Reverse-scored item to ensure response consistency.' })
        ],

        // Section 7: Calibration process & outcomes
        {
            id: 'Q13',
            type: 'radio',
            section: 'Calibration',
            questionText: 'Approximately how many projects or iterations did it take before you felt your trust in AI was well-calibrated?',
            required: true,
            options: [
                { value: '1-5', label: '1-5 iterations' },
                { value: '6-10', label: '6-10 iterations' },
                { value: '11-20', label: '11-20 iterations' },
                { value: '21-30', label: '21-30 iterations' },
                { value: 'gt30', label: 'More than 30 iterations' },
                { value: 'not-calibrated', label: 'Still not calibrated' }
            ]
        },
        {
            id: 'Q14',
            type: 'radio',
            section: 'Calibration',
            questionText: 'How long (time period) did it take you to feel calibrated?',
            required: true,
            options: [
                { value: 'lt1m', label: 'Less than 1 month' },
                { value: '1-3m', label: '1-3 months' },
                { value: '3-6m', label: '3-6 months' },
                { value: '6-12m', label: '6-12 months' },
                { value: '12-18m', label: '12-18 months' },
                { value: 'gt18m', label: 'More than 18 months' },
                { value: 'not-calibrated', label: 'Still not calibrated' }
            ]
        },
        {
            id: 'Q15',
            type: 'radio',
            section: 'Calibration',
            questionText: 'How would you describe your current trust calibration?',
            required: true,
            options: [
                { value: 'strong-under', label: 'Strongly under-trust (overly skeptical)' },
                { value: 'moderate-under', label: 'Moderately under-trust' },
                { value: 'well', label: 'Well-calibrated' },
                { value: 'moderate-over', label: 'Moderately over-trust' },
                { value: 'strong-over', label: 'Strongly over-trust (overly reliant)' }
            ]
        },
        ...[
            likertAgree7('CAL1', 'Calibration: Scale', 'I have a clear sense of what AI tools can and cannot do well.'),
            likertAgree7('CAL2', 'Calibration: Scale', 'My expectations of AI capabilities match reality.'),
            likertAgree7('CAL3', 'Calibration: Scale', 'I trust AI outputs when appropriate and skeptical when appropriate.'),
            likertAgree7('CAL4', 'Calibration: Scale', "I\'ve learned through experience what contexts AI works best/worst in."),

            // Prompt Refinement Strategy (NEW)
            likertAgree7('STR1', 'Strategy: Refinement', 'I use iterative prompt refinement as my primary method for trust calibration.'),
            likertAgree7('STR2', 'Strategy: Refinement', 'I rely on complex constraints in my prompts to ensure contextual alignment.'),
            likertAgree7('STR3', 'Strategy: Refinement', 'I systematically test AI boundary cases to understand system limitations.')
        ],

        // Section 8: Cultural context
        {
            id: 'Q16',
            type: 'radio',
            section: 'Cultural Context',
            questionText: 'Have you worked on projects for different cultural markets using AI?',
            infographic: 'cultural-moderator',
            required: true,
            options: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
            ]
        },
        {
            id: 'Q17',
            type: 'radio',
            section: 'Cultural Context',
            questionText: 'Working across cultural contexts with AI is:',
            required: true,
            options: [
                { value: 'much-easier', label: 'Much easier than within a single culture' },
                { value: 'somewhat-easier', label: 'Somewhat easier' },
                { value: 'same', label: 'About the same' },
                { value: 'somewhat-harder', label: 'Somewhat harder' },
                { value: 'much-harder', label: 'Much harder' }
            ]
        },
        {
            id: 'Q18',
            type: 'radio',
            section: 'Cultural Context',
            questionText: 'Approximately how much more effort does cross-cultural AI work require compared to single-culture work?',
            required: true,
            options: [
                { value: 'same', label: 'About the same' },
                { value: '1.5x', label: '1.5X more effort' },
                { value: '2x', label: '2X more effort' },
                { value: '2.5x', label: '2.5X more effort' },
                { value: '3xplus', label: '3X or more effort' }
            ]
        },
        {
            id: 'SC-D',
            type: 'scale',
            section: 'Scenario: Cultural Context',
            questionText: 'How confident are you in judging whether the AI output will be appropriate for both audiences?',
            scenario: {
                image: 'scenario-cross-cultural',
                context: 'You are preparing a design that should resonate with audiences in two culturally different markets. The AI tool has generated outputs for each audience.'
            },
            required: true,
            min: 1,
            max: 7,
            minLabel: 'Not at all confident',
            maxLabel: 'Extremely confident'
        },
        ...[
            likertAgree7('CUL1', 'Cultural Context: Scale', 'Evaluating AI output appropriateness is harder across cultural contexts.'),
            likertAgree7('CUL2', 'Cultural Context: Scale', 'Cultural differences significantly complicate AI trust calibration.'),
            likertAgree7('CUL3', 'Cultural Context: Scale', "I\'m less confident judging AI output for cultures I\'m less familiar with.")
        ],

        // Section 9: Outcomes & performance (1-7 agree)
        ...[
            likertAgree7('OUT1', 'Outcomes: Work Quality', 'Using AI has improved the quality of my creative output.'),
            likertAgree7('OUT2', 'Outcomes: Work Quality', 'AI-assisted work meets or exceeds the quality of my pre-AI work.'),
            likertAgree7('OUT3', 'Outcomes: Work Quality', 'I produce better outcomes when I use AI appropriately.'),

            likertAgree7('OUT4', 'Outcomes: Efficiency', 'AI tools have made me significantly more efficient in my work.'),
            likertAgree7('OUT5', 'Outcomes: Efficiency', 'I can complete projects faster with AI than without.'),
            likertAgree7('OUT6', 'Outcomes: Efficiency', 'Time saved with AI allows me to focus on higher-value activities.'),

            likertAgree7('OUT7', 'Outcomes: Professional Satisfaction', 'I find my work more satisfying since integrating AI.'),
            likertAgree7('OUT8', 'Outcomes: Professional Satisfaction', 'AI has made my professional role more interesting and strategic.'),
            likertAgree7('OUT9', 'Outcomes: Professional Satisfaction', 'I feel more valuable as a professional with AI as part of my toolkit.'),

            likertAgree7('OUT10', 'Outcomes: Confidence', 'I feel confident in my ability to work effectively with AI.'),
            likertAgree7('OUT11', 'Outcomes: Confidence', 'I trust my judgment about when and how to use AI.'),
            likertAgree7('OUT12', 'Outcomes: Confidence', "I\'m secure in my professional identity despite AI disruption."),
            likertAgree7('OUT13', 'Outcomes: Confidence', 'I feel professional anxiety about my long-term relevance in an AI-driven field.', { reverse: true, subtext: 'Reverse-scored item to ensure response consistency.' })
        ],

        // SECTION 10: Decision Sequences
        {
            id: 'SC-C1',
            type: 'radio',
            section: 'Scenario: Decision Sequence',
            questionText: 'What do you do first?',
            scenario: {
                image: 'scenario-decision-1',
                context: 'An AI tool suggests a layout update midway through a project.'
            },
            required: true,
            options: [
                { value: 'test', label: 'Accept suggestion and test it out' },
                { value: 'compare', label: 'Compare suggestion with project goals' },
                { value: 'feedback', label: 'Ask a team member for feedback' },
                { value: 'reject', label: 'Reject suggestion and continue' }
            ]
        },
        {
            id: 'SC-C2',
            type: 'radio',
            section: 'Scenario: Decision Sequence',
            questionText: 'What do you do next?',
            scenario: {
                image: 'scenario-decision-2',
                context: 'A key stakeholder responds with concerns about the AI suggestion.'
            },
            required: true,
            options: [
                { value: 'revise', label: 'Revise based on stakeholder + AI suggestion' },
                { value: 'explain', label: 'Keep my version and explain reasoning' },
                { value: 'discuss', label: 'Schedule a discussion with the stakeholder' },
                { value: 'ask-ai', label: 'Ask the AI for another suggestion' }
            ]
        },

        // Section 10: Open-ended reflections
        {
            id: 'Q19',
            type: 'textarea',
            section: 'Open Reflections',
            questionText: 'What was the most significant challenge you faced in learning to trust AI appropriately?',
            subtext: 'Optional. Up to ~500 characters.',
            required: false,
            maxChars: 500
        },
        {
            id: 'Q20',
            type: 'textarea',
            section: 'Open Reflections',
            questionText: 'What organizational support would have helped (or did help) you calibrate trust faster?',
            subtext: 'Optional. Up to ~500 characters.',
            required: false,
            maxChars: 500
        },
        {
            id: 'Q21',
            type: 'textarea',
            section: 'Open Reflections',
            questionText: 'What advice would you give to someone just starting to use AI in creative work?',
            subtext: 'Optional. Up to ~500 characters.',
            required: false,
            maxChars: 500
        },

        // Section 11: Follow-up (no compensation language)
        {
            id: 'follow-up-interest',
            type: 'radio',
            section: 'Follow-up',
            questionText: 'Would you be willing to participate in a brief follow-up interview (60 minutes)?',
            required: true,
            options: [
                { value: 'yes', label: "Yes, I\'m interested" },
                { value: 'maybe', label: 'Maybe, contact me with details' },
                { value: 'no', label: 'No, thank you' }
            ]
        },
        {
            id: 'email',
            type: 'email',
            section: 'Follow-up',
            questionText: 'Email (optional)',
            subtext: 'Only provide if you want follow-up contact or study updates.',
            required: false
        },
        {
            id: 'Q23_findings',
            type: 'radio',
            section: 'Follow-up',
            questionText: 'Would you like to receive a summary of research findings when available?',
            required: true,
            options: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
            ]
        }
    ]
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QUESTIONS;
}
