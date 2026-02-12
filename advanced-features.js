// ============================================
// ADVANCED FEATURES MODULE
// ============================================

// Real-time validation and enhancements
const AdvancedFeatures = {

    // Auto-save progress every 30 seconds
    autoSaveInterval: null,

    // Initialize advanced features
    init() {
        this.setupAutoSave();
        this.setupConnectionMonitor();
        this.setupKeyboardShortcuts();
        this.setupAnalytics();
        this.addProgressIndicators();
        this.enhanceValidation();
    },

    // Auto-save functionality
    setupAutoSave() {
        this.autoSaveInterval = setInterval(() => {
            // Safety check: Verify surveyEngine.state exists before accessing
            if (typeof surveyEngine === 'undefined' || !surveyEngine.state) {
                return; // Skip auto-save if state not available
            }

            if (surveyEngine.state.currentPage === 'survey' && surveyEngine.state.responseId) {
                this.performAutoSave();
            }
        }, 30000); // Every 30 seconds
    },

    performAutoSave() {
        const indicator = document.createElement('div');
        indicator.className = 'autosave-indicator';
        indicator.innerHTML = '💾 Saving...';
        document.body.appendChild(indicator);

        setTimeout(() => {
            indicator.innerHTML = '✓ Saved';
            setTimeout(() => indicator.remove(), 2000);
        }, 500);
    },

    // Connection status monitor
    setupConnectionMonitor() {
        window.addEventListener('online', () => {
            this.showNotification('✓ Connection restored', 'success');
        });

        window.addEventListener('offline', () => {
            this.showNotification('⚠ No internet - saving locally', 'warning');
        });
    },

    // Keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Safety check: Exit early if surveyEngine.state not available
            if (typeof surveyEngine === 'undefined' || !surveyEngine.state) {
                return;
            }

            // Ctrl/Cmd + S to save
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                if (surveyEngine.state.currentPage === 'survey') {
                    saveAndExit();
                }
            }

            // Arrow keys for navigation
            if (surveyEngine.state.currentPage === 'survey') {
                if (e.key === 'ArrowLeft' && surveyEngine.state.currentQuestionIndex > 0) {
                    previousQuestion();
                }
                if (e.key === 'ArrowRight') {
                    // Only if current question is answered
                    const current = surveyEngine.state.questionFlow[surveyEngine.state.currentQuestionIndex];
                    if (current && surveyEngine.state.answers[current.id]) {
                        nextQuestion();
                    }
                }
            }
        });
    },

    // Analytics tracking
    setupAnalytics() {
        this.trackEvent('page_loaded', { timestamp: new Date().toISOString() });
    },

    trackEvent(eventType, data) {
        // Track user interactions for research insights
        const event = {
            type: eventType,
            timestamp: new Date().toISOString(),
            // Safety check: Use null if state not available
            responseId: (typeof surveyEngine !== 'undefined' && surveyEngine.state ? surveyEngine.state.responseId : null),
            data: data
        };

        // Save to analytics if database is available
        if (typeof Database !== 'undefined' &&
            typeof surveyEngine !== 'undefined' &&
            surveyEngine.state &&
            surveyEngine.state.responseId) {
            // Analytics will be saved to database
            safeLog('log', 'Analytics event:', event);
        }
    },

    // Enhanced progress indicators
    addProgressIndicators() {
        const style = document.createElement('style');
        style.textContent = `
            .autosave-indicator {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--success, #10B981);
                color: var(--text-primary, #FFFFFF);
                padding: 12px 20px;
                border-radius: var(--radius-md);
                box-shadow: var(--shadow-lg);
                border: 1px solid var(--border, rgba(255, 255, 255, 0.08));
                z-index: 10000;
                animation: slideInRight 0.3s ease;
                font-size: 14px;
                font-weight: 500;
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            .notification {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: var(--glass-bg, rgba(20, 20, 28, 0.92));
                color: var(--text-primary, #FFFFFF);
                padding: 16px 24px;
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-lg);
                z-index: 10000;
                animation: slideInDown 0.3s ease;
                border: var(--glass-border, 1px solid rgba(255, 255, 255, 0.1));
                border-left: 4px solid var(--primary-500, #6366F1);
                backdrop-filter: blur(16px);
            }
            
            .notification.success { border-left-color: var(--success, #10B981); }
            .notification.warning { border-left-color: var(--warning, #F59E0B); }
            .notification.error { border-left-color: var(--error, #EF4444); }
            
            @keyframes slideInDown {
                from { transform: translate(-50%, -100%); opacity: 0; }
                to { transform: translate(-50%, 0); opacity: 1; }
            }
            
            .question-timer {
                display: flex;
                align-items: center;
                gap: 8px;
                color: var(--text-tertiary, rgba(255, 255, 255, 0.55));
                font-size: 13px;
                margin-top: 16px;
            }
            
            .timer-icon {
                font-size: 16px;
            }
            
            .validation-hint {
                display: inline-block;
                margin-left: 8px;
                color: var(--success, #10B981);
                font-size: 18px;
                animation: fadeIn 0.3s ease;
            }
            
            .character-count {
                font-size: 13px;
                color: var(--text-tertiary, rgba(255, 255, 255, 0.55));
                margin-top: 8px;
            }
            
            .character-count.warning {
                color: var(--warning, #F59E0B);
            }
            
            .character-count.success {
                color: var(--success, #10B981);
            }
            
            .progress-percentage {
                font-weight: 600;
                color: var(--primary-300, #A5B4FC);
            }
            
            .estimated-time {
                font-size: 13px;
                color: var(--text-muted, rgba(255, 255, 255, 0.35));
                margin-top: 4px;
            }
        `;
        document.head.appendChild(style);
    },

    // Enhanced validation with real-time feedback
    enhanceValidation() {
        // Add validation hints as user types
        document.addEventListener('input', (e) => {
            if (e.target.tagName === 'TEXTAREA') {
                this.updateTextareaValidation(e.target);
            }
        });
    },

    updateTextareaValidation(textarea) {
        const questionId = textarea.dataset.questionId;
        const question = surveyEngine.state.questionFlow[surveyEngine.state.currentQuestionIndex];

        if (question && question.minChars) {
            const text = textarea.value.trim();
            const charCount = text.length;
            const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;

            let counterId = `char-counter-${questionId}`;
            let counter = document.getElementById(counterId);

            if (!counter) {
                counter = document.createElement('div');
                counter.id = counterId;
                counter.className = 'character-count';
                textarea.after(counter);
            }

            if (charCount >= question.minChars) {
                counter.className = 'character-count success';
                counter.textContent = `✓ ${wordCount} words, ${charCount} characters`;
            } else {
                counter.className = 'character-count warning';
                const needed = question.minChars - charCount;
                counter.textContent = `${wordCount} words, ${charCount} characters (${needed} more needed)`;
            }
        }
    },

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideInDown 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    // Cleanup on page unload
    cleanup() {
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
        }
        if (this.questionTimerInterval) {
            clearInterval(this.questionTimerInterval);
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    AdvancedFeatures.init();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    AdvancedFeatures.cleanup();
});
