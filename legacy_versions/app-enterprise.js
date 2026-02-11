// ═══════════════════════════════════════════════════════════════════════════════
// ENTERPRISE SURVEY APPLICATION - ENHANCED INTERACTIONS
// Advanced UX with smooth animations, keyboard navigation, and progress tracking
// ═══════════════════════════════════════════════════════════════════════════════

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. APPLICATION STATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const appState = {
    currentPage: 'landing',
    currentQuestionIndex: 0,
    responseId: null,
    startTime: null,
    questionStartTime: null,
    answers: {},
    pathway: null,
    questionFlow: [],
    timeTracking: {},
    autoSaveInterval: null,
    stats: {
        answered: 0,
        total: 0,
        elapsedTime: 0
    },
    mousePosition: { x: 0, y: 0 },
    interactiveElements: []
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CREATIVE INTERACTION ENHANCEMENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

document.addEventListener('DOMContentLoaded', function() {
    initializeCreativeFeatures();
});

function initializeCreativeFeatures() {
    // Mouse tracking for interactive effects
    document.addEventListener('mousemove', handleMouseMove);
    
    // Enhanced button interactions
    initializeButtonEffects();
    
    // Creative question animations
    initializeQuestionAnimations();
    
    // Particle system enhancement
    enhanceParticleSystem();
    
    // Dynamic background effects
    initializeDynamicBackground();
}

function handleMouseMove(e) {
    appState.mousePosition.x = e.clientX;
    appState.mousePosition.y = e.clientY;
    
    // Update interactive elements based on mouse position
    updateInteractiveElements();
}

function updateInteractiveElements() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const rect = particle.getBoundingClientRect();
        const distance = Math.sqrt(
            Math.pow(appState.mousePosition.x - (rect.left + rect.width / 2), 2) +
            Math.pow(appState.mousePosition.y - (rect.top + rect.height / 2), 2)
        );
        
        if (distance < 100) {
            const scale = 1 + (100 - distance) / 100 * 0.5;
            particle.style.transform = `scale(${scale})`;
        } else {
            particle.style.transform = 'scale(1)';
        }
    });
}

function initializeButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            createRippleEffect(e, this);
        });
        
        button.addEventListener('click', function() {
            createClickEffect(this);
        });
    });
}

function createRippleEffect(e, element) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function createClickEffect(element) {
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
        element.style.transform = '';
    }, 150);
}

function initializeQuestionAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.question-container').forEach(container => {
        observer.observe(container);
    });
}

function enhanceParticleSystem() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        // Add random movement variations
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
    });
}

function initializeDynamicBackground() {
    // Dynamic gradient background based on time
    setInterval(() => {
        const hour = new Date().getHours();
        const body = document.body;
        
        if (hour >= 6 && hour < 12) {
            // Morning - warm tones
            body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        } else if (hour >= 12 && hour < 18) {
            // Afternoon - bright and energetic
            body.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
        } else if (hour >= 18 && hour < 22) {
            // Evening - cool tones
            body.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
        } else {
            // Night - dark and mysterious
            body.style.background = 'linear-gradient(135deg, #434343 0%, #000000 100%)';
        }
    }, 60000); // Update every minute
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ADVANCED SOUND SYSTEM (OPTIONAL, MUTED BY DEFAULT)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const soundSystem = {
    enabled: false, // Disabled by default for accessibility
    audioContext: null,
    
    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    },
    
    playSuccess() {
        if (!this.enabled || !this.audioContext) return;
        this.playTone(800, 0.1, 'sine');
    },
    
    playError() {
        if (!this.enabled || !this.audioContext) return;
        this.playTone(300, 0.2, 'sawtooth');
    },
    
    playClick() {
        if (!this.enabled || !this.audioContext) return;
        this.playTone(600, 0.05, 'square');
    },
    
    playTone(frequency, duration, type) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ENHANCED PROGRESS TRACKING
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function updateGlobalProgress() {
    const progressBar = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const progressPercent = document.querySelector('.progress-percent');
    
    if (!progressBar || !progressText || !progressPercent) return;
    
    let progress = 0;
    let text = '';
    
    switch (appState.currentPage) {
        case 'landing':
            progress = 0;
            text = 'Welcome';
            break;
        case 'consent':
            progress = 10;
            text = 'Consent Form';
            break;
        case 'survey':
            const questionProgress = (appState.currentQuestionIndex / appState.questionFlow.length) * 80;
            progress = 20 + questionProgress;
            text = `Question ${appState.currentQuestionIndex + 1} of ${appState.questionFlow.length}`;
            break;
        case 'completion':
            progress = 100;
            text = 'Complete!';
            break;
    }
    
    progressBar.style.width = `${progress}%`;
    progressText.textContent = text;
    progressPercent.textContent = `${Math.round(progress)}%`;
    
    // Add creative progress animation
    if (progress > 0) {
        progressBar.style.background = `linear-gradient(90deg, 
            var(--primary-500) 0%, 
            var(--accent-500) ${progress}%, 
            rgba(255,255,255,0.1) ${progress}%)`;
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CREATIVE NOTIFICATION SYSTEM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function showCreativeNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `creative-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-text">${message}</span>
        </div>
        <div class="notification-progress"></div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Auto remove
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return '✅';
        case 'error': return '❌';
        case 'warning': return '⚠️';
        default: return 'ℹ️';
    }
}

// Initialize sound system
soundSystem.init();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CREATIVE NOTIFICATION SYSTEM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function showCreativeNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `creative-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-text">${message}</span>
        </div>
        <div class="notification-progress"></div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    return icons[type] || icons.info;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. PAGE NAVIGATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(`${pageId}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
        appState.currentPage = pageId;
        
        // Screen reader announcement
        announceToScreenReader(`Navigated to ${pageId} page`);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Update global progress
        updateGlobalProgress();
    }
}

function startStudy() {
    showPage('consent');
}

function showInfo() {
    const modal = document.getElementById('info-modal');
    if (modal) {
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Focus trap
        const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) firstFocusable.focus();
    }
}

function closeInfo() {
    const modal = document.getElementById('info-modal');
    if (modal) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

function goBack(pageId) {
    showPage(pageId);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. CONSENT HANDLING
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function submitConsent() {
    const required = ['consent-1', 'consent-2', 'consent-3', 'consent-4', 'consent-5'];
    const allChecked = required.every(id => {
        const checkbox = document.getElementById(id);
        return checkbox && checkbox.checked;
    });
    
    const errorElement = document.getElementById('consent-error');
    
    if (!allChecked) {
        if (errorElement) {
            errorElement.style.display = 'flex';
            announceToScreenReader('Please accept all consent items to continue');
        }
        return;
    }
    
    // Hide error
    if (errorElement) errorElement.style.display = 'none';
    
    // Initialize survey
    initializeSurvey();
    
    // Show survey page
    showPage('survey');
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. SURVEY INITIALIZATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

async function initializeSurvey() {
    // Generate response ID
    appState.responseId = generateResponseId();
    appState.startTime = new Date();
    
    // Load questions (assuming QUESTIONS is defined in questions.js)
    appState.questionFlow = window.QUESTIONS?.survey || window.QUESTIONS?.profiling || [];
    appState.currentQuestionIndex = 0;
    appState.stats.total = appState.questionFlow.length;
    
    // Create response in database
    try {
        if (window.Database) {
            await Database.createResponse({
                id: appState.responseId,
                started_at: appState.startTime.toISOString(),
                status: 'in_progress'
            });
        }
    } catch (error) {
        console.error('Database initialization error:', error);
    }
    
    // Display first question
    displayCurrentQuestion();
    
    // Start auto-save
    startAutoSave();
    
    // Start time tracking
    startTimeTracking();
}

function generateResponseId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 9);
    return `RES-${timestamp}-${random}`.toUpperCase();
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. QUESTION DISPLAY & RENDERING
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function displayCurrentQuestion() {
    const question = appState.questionFlow[appState.currentQuestionIndex];
    
    if (!question) {
        showCompletionPage();
        return;
    }
    
    // Track question start time
    appState.questionStartTime = new Date();
    
    // Update question metadata
    updateQuestionMeta(question);
    
    // Render question content
    renderQuestionContent(question);
    
    // Update progress indicators
    updateAllProgress();
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Clear validation
    clearValidation();
    
    // Focus management
    setTimeout(() => {
        const questionTitle = document.getElementById('question-title');
        if (questionTitle) questionTitle.focus();
    }, 100);
    
    // Screen reader announcement
    announceToScreenReader(`Question ${appState.currentQuestionIndex + 1} of ${appState.stats.total}: ${question.text}`);
}

function updateQuestionMeta(question) {
    const numberEl = document.getElementById('question-number');
    const sectionEl = document.getElementById('question-section');
    const titleEl = document.getElementById('question-title');
    const descEl = document.getElementById('question-description');
    
    if (numberEl) {
        numberEl.textContent = `Question ${appState.currentQuestionIndex + 1} of ${appState.stats.total}`;
    }
    
    if (sectionEl) {
        sectionEl.textContent = question.section || 'General';
    }
    
    if (titleEl) {
        const requiredMark = question.required ? ' <span class="required">*</span>' : '';
        titleEl.innerHTML = question.text + requiredMark;
    }
    
    if (descEl) {
        descEl.textContent = question.description || '';
        descEl.style.display = question.description ? 'block' : 'none';
    }
}

function renderQuestionContent(question) {
    const answerArea = document.getElementById('answer-area');
    if (!answerArea) return;
    
    // Clear previous content
    answerArea.innerHTML = '';
    
    // Get saved answer if exists
    const savedAnswer = appState.answers[question.id];
    
    // Render based on question type
    switch (question.type) {
        case 'single-choice':
            renderSingleChoice(answerArea, question, savedAnswer);
            break;
        case 'multiple-choice':
            renderMultipleChoice(answerArea, question, savedAnswer);
            break;
        case 'text':
            renderTextInput(answerArea, question, savedAnswer);
            break;
        case 'textarea':
            renderTextArea(answerArea, question, savedAnswer);
            break;
        case 'scale':
            renderScale(answerArea, question, savedAnswer);
            break;
        default:
            renderTextInput(answerArea, question, savedAnswer);
    }
}

function renderSingleChoice(container, question, savedAnswer) {
    const optionsList = document.createElement('div');
    optionsList.className = 'options-list';
    optionsList.setAttribute('role', 'radiogroup');
    optionsList.setAttribute('aria-label', question.text);
    
    question.options.forEach((option, index) => {
        const optionItem = document.createElement('label');
        optionItem.className = 'option-item';
        if (savedAnswer === option) optionItem.classList.add('selected');
        
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = question.id;
        input.value = option;
        input.className = 'option-input';
        input.checked = savedAnswer === option;
        input.setAttribute('aria-label', option);
        
        input.addEventListener('change', () => {
            // Update UI
            optionsList.querySelectorAll('.option-item').forEach(item => {
                item.classList.remove('selected');
            });
            optionItem.classList.add('selected');
            
            // Save answer
            saveAnswer(question.id, option);
            
            // Clear validation
            clearValidation();
        });
        
        const indicator = document.createElement('div');
        indicator.className = 'option-indicator';
        
        const label = document.createElement('span');
        label.className = 'option-label';
        label.textContent = option;
        
        optionItem.appendChild(input);
        optionItem.appendChild(indicator);
        optionItem.appendChild(label);
        optionsList.appendChild(optionItem);
    });
    
    container.appendChild(optionsList);
}

function renderMultipleChoice(container, question, savedAnswer) {
    const optionsList = document.createElement('div');
    optionsList.className = 'options-list';
    optionsList.setAttribute('role', 'group');
    optionsList.setAttribute('aria-label', question.text);
    
    const selectedValues = Array.isArray(savedAnswer) ? savedAnswer : [];
    
    question.options.forEach((option, index) => {
        const optionItem = document.createElement('label');
        optionItem.className = 'option-item';
        if (selectedValues.includes(option)) optionItem.classList.add('selected');
        
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = question.id;
        input.value = option;
        input.className = 'option-input';
        input.checked = selectedValues.includes(option);
        input.setAttribute('aria-label', option);
        
        input.addEventListener('change', () => {
            // Update selected values
            let newValues = [...selectedValues];
            if (input.checked) {
                if (!newValues.includes(option)) {
                    newValues.push(option);
                }
                optionItem.classList.add('selected');
            } else {
                newValues = newValues.filter(v => v !== option);
                optionItem.classList.remove('selected');
            }
            
            // Save answer
            saveAnswer(question.id, newValues);
            
            // Clear validation
            clearValidation();
        });
        
        const indicator = document.createElement('div');
        indicator.className = 'option-indicator';
        indicator.style.borderRadius = '4px'; // Square for checkbox
        
        const label = document.createElement('span');
        label.className = 'option-label';
        label.textContent = option;
        
        optionItem.appendChild(input);
        optionItem.appendChild(indicator);
        optionItem.appendChild(label);
        optionsList.appendChild(optionItem);
    });
    
    container.appendChild(optionsList);
}

function renderTextInput(container, question, savedAnswer) {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'input-text';
    input.id = `input-${question.id}`;
    input.value = savedAnswer || '';
    input.placeholder = question.placeholder || 'Type your answer...';
    input.setAttribute('aria-label', question.text);
    
    input.addEventListener('input', (e) => {
        saveAnswer(question.id, e.target.value);
        clearValidation();
    });
    
    container.appendChild(input);
    
    // Focus input
    setTimeout(() => input.focus(), 100);
}

function renderTextArea(container, question, savedAnswer) {
    const textarea = document.createElement('textarea');
    textarea.className = 'input-textarea';
    textarea.id = `input-${question.id}`;
    textarea.value = savedAnswer || '';
    textarea.placeholder = question.placeholder || 'Type your answer...';
    textarea.setAttribute('aria-label', question.text);
    
    textarea.addEventListener('input', (e) => {
        saveAnswer(question.id, e.target.value);
        clearValidation();
    });
    
    // Character counter if maxLength specified
    if (question.maxLength) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.textContent = `${savedAnswer?.length || 0} / ${question.maxLength}`;
        
        textarea.addEventListener('input', (e) => {
            counter.textContent = `${e.target.value.length} / ${question.maxLength}`;
        });
        
        container.appendChild(textarea);
        container.appendChild(counter);
    } else {
        container.appendChild(textarea);
    }
    
    // Focus textarea
    setTimeout(() => textarea.focus(), 100);
}

function renderScale(container, question, savedAnswer) {
    const scale = question.scale || { min: 1, max: 5, labels: {} };
    
    const scaleContainer = document.createElement('div');
    scaleContainer.className = 'scale-container';
    
    for (let i = scale.min; i <= scale.max; i++) {
        const scaleItem = document.createElement('label');
        scaleItem.className = 'scale-item';
        if (savedAnswer === i) scaleItem.classList.add('selected');
        
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = question.id;
        input.value = i;
        input.className = 'scale-input';
        input.checked = savedAnswer === i;
        input.setAttribute('aria-label', `${i} out of ${scale.max}`);
        
        input.addEventListener('change', () => {
            scaleContainer.querySelectorAll('.scale-item').forEach(item => {
                item.classList.remove('selected');
            });
            scaleItem.classList.add('selected');
            saveAnswer(question.id, i);
            clearValidation();
        });
        
        const indicator = document.createElement('div');
        indicator.className = 'scale-indicator';
        indicator.textContent = i;
        
        const label = document.createElement('span');
        label.className = 'scale-label';
        label.textContent = scale.labels[i] || '';
        
        scaleItem.appendChild(input);
        scaleItem.appendChild(indicator);
        if (label.textContent) scaleItem.appendChild(label);
        
        scaleContainer.appendChild(scaleItem);
    }
    
    container.appendChild(scaleContainer);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. ANSWER HANDLING & VALIDATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function saveAnswer(questionId, answer) {
    appState.answers[questionId] = answer;
    
    // Track time spent on question
    const timeSpent = appState.questionStartTime 
        ? (new Date() - appState.questionStartTime) / 1000 
        : 0;
    
    if (!appState.timeTracking[questionId]) {
        appState.timeTracking[questionId] = 0;
    }
    appState.timeTracking[questionId] += timeSpent;
    
    // Update stats
    const answeredCount = Object.keys(appState.answers).filter(key => {
        const val = appState.answers[key];
        return val !== null && val !== undefined && val !== '';
    }).length;
    appState.stats.answered = answeredCount;
    
    // Auto-save to localStorage
    saveToLocalStorage();
}

function validateCurrentQuestion() {
    const question = appState.questionFlow[appState.currentQuestionIndex];
    if (!question) return true;
    
    const answer = appState.answers[question.id];
    
    // Not required - valid
    if (!question.required) return true;
    
    // Check if answer exists and is not empty
    if (answer === null || answer === undefined || answer === '') {
        showValidation('This question is required');
        return false;
    }
    
    // Additional validation for arrays (multiple choice)
    if (Array.isArray(answer) && answer.length === 0) {
        showValidation('Please select at least one option');
        return false;
    }
    
    // Additional validation for text length
    if (question.minLength && typeof answer === 'string' && answer.trim().length < question.minLength) {
        showValidation(`Please provide at least ${question.minLength} characters`);
        return false;
    }
    
    return true;
}

function showValidation(message) {
    const feedback = document.getElementById('validation-feedback');
    const messageEl = document.getElementById('validation-message');
    
    if (feedback && messageEl) {
        messageEl.textContent = message;
        feedback.classList.add('visible');
        
        // Screen reader announcement
        announceToScreenReader(message);
        
        // Shake animation already in CSS
    }
}

function clearValidation() {
    const feedback = document.getElementById('validation-feedback');
    if (feedback) {
        feedback.classList.remove('visible');
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. NAVIGATION CONTROLS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function nextQuestion() {
    // Validate current question
    if (!validateCurrentQuestion()) {
        return;
    }
    
    // Move to next question
    appState.currentQuestionIndex++;
    
    // Display next question or completion
    displayCurrentQuestion();
}

function previousQuestion() {
    if (appState.currentQuestionIndex > 0) {
        appState.currentQuestionIndex--;
        displayCurrentQuestion();
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('btn-previous');
    const nextBtn = document.getElementById('btn-next');
    
    if (prevBtn) {
        prevBtn.disabled = appState.currentQuestionIndex === 0;
    }
    
    if (nextBtn) {
        const isLast = appState.currentQuestionIndex === appState.stats.total - 1;
        nextBtn.querySelector('span').textContent = isLast ? 'Complete' : 'Continue';
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8. PROGRESS TRACKING & UPDATES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function updateAllProgress() {
    updateGlobalProgress();
    updateCircularProgress();
    updateSectionBreadcrumb();
    updateProgressStats();
}

function updateGlobalProgress() {
    const progressFill = document.getElementById('global-progress-fill');
    const progressLabel = document.getElementById('progress-label');
    const progressStats = document.getElementById('progress-stats');
    
    if (!progressFill) return;
    
    let percentage = 0;
    let label = 'Getting Started';
    
    if (appState.currentPage === 'landing') {
        percentage = 0;
        label = 'Getting Started';
    } else if (appState.currentPage === 'consent') {
        percentage = 5;
        label = 'Consent';
    } else if (appState.currentPage === 'survey') {
        percentage = 5 + ((appState.currentQuestionIndex / appState.stats.total) * 90);
        label = 'In Progress';
    } else if (appState.currentPage === 'completion') {
        percentage = 100;
        label = 'Complete';
    }
    
    progressFill.style.width = `${percentage}%`;
    
    if (progressLabel) {
        progressLabel.textContent = label;
    }
    
    if (progressStats) {
        progressStats.textContent = `${Math.round(percentage)}% Complete`;
    }
}

function updateCircularProgress() {
    const progressRing = document.getElementById('progress-ring-fill');
    const progressPercent = document.getElementById('progress-percent');
    
    if (!progressRing || !progressPercent) return;
    
    const percentage = appState.stats.total > 0 
        ? (appState.currentQuestionIndex / appState.stats.total) * 100 
        : 0;
    
    // SVG circle circumference = 2 * π * r = 2 * π * 54 ≈ 339.292
    const circumference = 339.292;
    const offset = circumference - (percentage / 100) * circumference;
    
    progressRing.style.strokeDashoffset = offset;
    progressPercent.textContent = `${Math.round(percentage)}%`;
}

function updateSectionBreadcrumb() {
    const breadcrumb = document.getElementById('section-breadcrumb');
    if (!breadcrumb) return;
    
    // Group questions by section
    const sections = {};
    appState.questionFlow.forEach((q, index) => {
        const section = q.section || 'General';
        if (!sections[section]) {
            sections[section] = { start: index, end: index, count: 0 };
        }
        sections[section].end = index;
        sections[section].count++;
    });
    
    // Render breadcrumb
    breadcrumb.innerHTML = '';
    Object.keys(sections).forEach((sectionName, index) => {
        const sectionData = sections[sectionName];
        const isActive = appState.currentQuestionIndex >= sectionData.start && 
                        appState.currentQuestionIndex <= sectionData.end;
        const isComplete = appState.currentQuestionIndex > sectionData.end;
        
        const item = document.createElement('div');
        item.className = 'breadcrumb-item';
        if (isActive) item.classList.add('active');
        if (isComplete) item.classList.add('complete');
        
        const icon = document.createElement('span');
        icon.className = 'breadcrumb-icon';
        icon.textContent = isComplete ? '✓' : (index + 1);
        
        const label = document.createElement('span');
        label.textContent = sectionName;
        
        item.appendChild(icon);
        item.appendChild(label);
        breadcrumb.appendChild(item);
    });
}

function updateProgressStats() {
    const answeredEl = document.getElementById('stat-answered');
    const remainingEl = document.getElementById('stat-remaining');
    const timeEl = document.getElementById('stat-time');
    
    if (answeredEl) {
        answeredEl.textContent = appState.currentQuestionIndex;
    }
    
    if (remainingEl) {
        remainingEl.textContent = appState.stats.total - appState.currentQuestionIndex;
    }
    
    if (timeEl && appState.startTime) {
        const elapsed = Math.floor((new Date() - appState.startTime) / 60000);
        timeEl.textContent = `${elapsed}min`;
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 9. AUTO-SAVE & PERSISTENCE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function startAutoSave() {
    // Auto-save every 30 seconds
    appState.autoSaveInterval = setInterval(() => {
        saveProgress();
    }, 30000);
}

function saveProgress() {
    saveToLocalStorage();
    
    // Save to database if available
    if (window.Database && appState.responseId) {
        try {
            Database.updateResponse(appState.responseId, {
                answers: appState.answers,
                current_question: appState.currentQuestionIndex,
                updated_at: new Date().toISOString()
            });
        } catch (error) {
            console.error('Database save error:', error);
        }
    }
    
    // Show save confirmation
    showNotification('Progress saved', 'success');
}

function saveToLocalStorage() {
    try {
        localStorage.setItem('survey_progress', JSON.stringify({
            responseId: appState.responseId,
            currentQuestionIndex: appState.currentQuestionIndex,
            answers: appState.answers,
            startTime: appState.startTime,
            timeTracking: appState.timeTracking,
            updatedAt: new Date().toISOString()
        }));
    } catch (error) {
        console.error('localStorage save error:', error);
    }
}

function loadFromLocalStorage() {
    try {
        const saved = localStorage.getItem('survey_progress');
        if (saved) {
            const data = JSON.parse(saved);
            
            // Check if saved data is recent (within 30 days)
            const savedDate = new Date(data.updatedAt);
            const daysSince = (new Date() - savedDate) / (1000 * 60 * 60 * 24);
            
            if (daysSince < 30) {
                return data;
            }
        }
    } catch (error) {
        console.error('localStorage load error:', error);
    }
    return null;
}

function pauseStudy() {
    saveProgress();
    showNotification('Study paused. Your progress is saved.', 'info');
    // Could show a pause modal here
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 10. TIME TRACKING
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function startTimeTracking() {
    setInterval(() => {
        if (appState.startTime) {
            appState.stats.elapsedTime = Math.floor((new Date() - appState.startTime) / 1000);
            updateProgressStats();
        }
    }, 60000); // Update every minute
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 11. COMPLETION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function showCompletionPage() {
    // Calculate final stats
    const totalTime = appState.startTime 
        ? Math.floor((new Date() - appState.startTime) / 60000) 
        : 0;
    
    // Update completion stats
    const timeEl = document.getElementById('completion-time');
    const answersEl = document.getElementById('completion-answers');
    const responseIdEl = document.getElementById('response-id');
    
    if (timeEl) {
        timeEl.textContent = `${totalTime} minutes`;
    }
    
    if (answersEl) {
        answersEl.textContent = `${appState.stats.total} questions`;
    }
    
    if (responseIdEl) {
        responseIdEl.textContent = appState.responseId;
    }
    
    // Save final data
    if (window.Database && appState.responseId) {
        Database.updateResponse(appState.responseId, {
            status: 'completed',
            completed_at: new Date().toISOString(),
            answers: appState.answers,
            time_tracking: appState.timeTracking
        });
    }
    
    // Clear auto-save
    if (appState.autoSaveInterval) {
        clearInterval(appState.autoSaveInterval);
    }
    
    // Clear localStorage
    localStorage.removeItem('survey_progress');
    
    // Show completion page
    showPage('completion');
    
    // Confetti animation (if implemented)
    triggerConfetti();
}

function downloadResults() {
    const data = {
        responseId: appState.responseId,
        completedAt: new Date().toISOString(),
        answers: appState.answers,
        stats: appState.stats
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `survey-response-${appState.responseId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function shareResults() {
    if (navigator.share) {
        navigator.share({
            title: 'Calibrated Trust Research Study',
            text: 'I just completed a research study on trust in AI systems!',
            url: window.location.href
        });
    } else {
        // Fallback: copy link
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        showNotification('Link copied to clipboard!', 'success');
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 12. ACCESSIBILITY & SCREEN READER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function announceToScreenReader(message) {
    const announcer = document.getElementById('sr-announcer');
    if (announcer) {
        announcer.textContent = message;
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 13. KEYBOARD NAVIGATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

document.addEventListener('keydown', (e) => {
    // Escape key - close modals
    if (e.key === 'Escape') {
        closeInfo();
    }
    
    // Survey page keyboard shortcuts
    if (appState.currentPage === 'survey') {
        // Ctrl/Cmd + S - Save
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveProgress();
        }
        
        // Enter - Next question (if not in textarea)
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            nextQuestion();
        }
        
        // Alt + Left Arrow - Previous question
        if (e.altKey && e.key === 'ArrowLeft') {
            e.preventDefault();
            previousQuestion();
        }
        
        // Alt + Right Arrow - Next question
        if (e.altKey && e.key === 'ArrowRight') {
            e.preventDefault();
            nextQuestion();
        }
    }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 14. NOTIFICATIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function showNotification(message, type = 'info') {
    // Simple notification - could be enhanced with a toast library
    console.log(`[${type.toUpperCase()}] ${message}`);
    announceToScreenReader(message);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 15. ANIMATIONS & EFFECTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function triggerConfetti() {
    // Simple confetti effect - could be enhanced with canvas animation
    const confetti = document.querySelector('.confetti-burst');
    if (confetti) {
        confetti.style.animation = 'confettiBurst 1s ease-out';
    }
}

function showHelp() {
    showInfo(); // Reuse info modal
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 16. INITIALIZATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

document.addEventListener('DOMContentLoaded', () => {
    // Check for saved progress
    const savedProgress = loadFromLocalStorage();
    
    if (savedProgress && confirm('Would you like to resume your previous session?')) {
        // Restore state
        appState.responseId = savedProgress.responseId;
        appState.currentQuestionIndex = savedProgress.currentQuestionIndex;
        appState.answers = savedProgress.answers;
        appState.startTime = new Date(savedProgress.startTime);
        appState.timeTracking = savedProgress.timeTracking || {};
        
        // Show survey page
        showPage('survey');
        displayCurrentQuestion();
        startAutoSave();
        startTimeTracking();
    } else {
        // Start fresh
        showPage('landing');
    }
    
    // Initialize global progress
    updateGlobalProgress();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        appState,
        startStudy,
        nextQuestion,
        previousQuestion,
        saveProgress
    };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SOUND SYSTEM - OPTIONAL AUDIO FEEDBACK
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const soundSystem = {
    audioContext: null,
    isEnabled: false,
    
    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.isEnabled = true;
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    },
    
    playClick() {
        if (!this.isEnabled) return;
        this.playTone(800, 0.1, 'sine');
    },
    
    playSuccess() {
        if (!this.isEnabled) return;
        this.playTone(523, 0.2, 'sine'); // C5
        setTimeout(() => this.playTone(659, 0.2, 'sine'), 100); // E5
        setTimeout(() => this.playTone(784, 0.3, 'sine'), 200); // G5
    },
    
    playTone(frequency, duration, type = 'sine') {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }
};

// Initialize sound system
soundSystem.init();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ADVANCED CREATIVE FEATURES - WELCOME ANIMATION & EFFECTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function playWelcomeAnimation() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        setTimeout(() => {
            particle.style.animation = 'particleFloat 20s linear infinite, particleBurst 0.8s ease-out';
        }, index * 100);
    });
    
    // Add entrance animation to main content
    const hero = document.querySelector('.landing-hero');
    if (hero) {
        hero.style.animation = 'heroEntrance 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }
}

function initializeAdvancedCreativeFeatures() {
    // Creative typing effect for questions
    initializeTypingEffect();
    
    // Dynamic color theming
    initializeDynamicTheming();
    
    // Enhanced sound feedback
    initializeSoundFeedback();
    
    // Completion celebration
    initializeCompletionEffects();
}

function initializeTypingEffect() {
    const questionTexts = document.querySelectorAll('.question-text');
    questionTexts.forEach(text => {
        const originalText = text.textContent;
        text.setAttribute('data-original-text', originalText);
        text.textContent = '';
        
        // Type out text with creative effect
        typeText(text, originalText, 0);
    });
}

function typeText(element, text, index) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        setTimeout(() => typeText(element, text, index + 1), 30);
    }
}

function initializeDynamicTheming() {
    const root = document.documentElement;
    let themeIndex = 0;
    const themes = [
        { primary: '#6366F1', accent: '#EC4899', success: '#10B981' },
        { primary: '#8B5CF6', accent: '#F59E0B', success: '#06B6D4' },
        { primary: '#EC4899', accent: '#10B981', success: '#6366F1' },
        { primary: '#F59E0B', accent: '#06B6D4', success: '#8B5CF6' }
    ];
    
    setInterval(() => {
        const theme = themes[themeIndex % themes.length];
        root.style.setProperty('--primary-500', theme.primary);
        root.style.setProperty('--accent-500', theme.accent);
        root.style.setProperty('--success', theme.success);
        themeIndex++;
    }, 30000); // Change theme every 30 seconds
}

function initializeSoundFeedback() {
    // Subtle audio feedback for interactions
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn')) {
            soundSystem.playClick();
        }
    });
}

function initializeCompletionEffects() {
    // Creative celebration when survey is completed
    const completionObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                const completionPage = document.getElementById('completion-page');
                if (completionPage && completionPage.classList.contains('active')) {
                    triggerCompletionCelebration();
                }
            }
        });
    });
    
    completionObserver.observe(document.body, { childList: true, subtree: true });
}

function triggerCompletionCelebration() {
    // Create confetti effect
    createConfetti();
    
    // Play success sound
    soundSystem.playSuccess();
    
    // Show creative notification
    showCreativeNotification('🎉 Survey completed successfully! Thank you for your valuable insights.', 'success', 5000);
}

function createConfetti() {
    const colors = ['#FF1493', '#00BFFF', '#32CD32', '#FFD700', '#FF4500', '#8A2BE2'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Add confetti styles dynamically
const confettiStyles = `
    .confetti {
        position: fixed;
        top: -10px;
        width: 10px;
        height: 10px;
        animation: confettiFall 5s linear infinite;
        z-index: 1001;
    }
    
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
        }
    }
    
    @keyframes particleBurst {
        0% { transform: scale(0) rotate(0deg); opacity: 0; }
        50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
        100% { transform: scale(1) rotate(360deg); opacity: 0.6; }
    }
    
    @keyframes heroEntrance {
        from {
            opacity: 0;
            transform: translateY(60px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = confettiStyles;
document.head.appendChild(styleSheet);

// Initialize all creative features
document.addEventListener('DOMContentLoaded', function() {
    playWelcomeAnimation();
    initializeAdvancedCreativeFeatures();
});
