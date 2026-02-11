// ============================================
// FUTURE OF CREATIVE WORK - EXECUTIVE APP
// Revolutionary Survey Engine | Neural Network UX | Adaptive Intelligence
// ============================================

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NEURAL NETWORK BACKGROUND ANIMATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class NeuralNetwork {
    constructor() {
        this.canvas = document.getElementById('neuralCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.animationId = null;
        this.resizeCanvas();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        // Create neural nodes
        const nodeCount = Math.min(50, Math.floor((this.canvas.width * this.canvas.height) / 15000));

        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 3 + 1,
                connections: []
            });
        }

        // Create connections between nearby nodes
        this.nodes.forEach((node, i) => {
            this.nodes.slice(i + 1).forEach(otherNode => {
                const distance = Math.sqrt(
                    Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
                );

                if (distance < 150) {
                    this.connections.push({
                        from: node,
                        to: otherNode,
                        distance: distance,
                        strength: 1 - (distance / 150)
                    });
                }
            });
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update node positions
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            // Bounce off edges
            if (node.x <= 0 || node.x >= this.canvas.width) node.vx *= -1;
            if (node.y <= 0 || node.y >= this.canvas.height) node.vy *= -1;

            // Keep nodes in bounds
            node.x = Math.max(0, Math.min(this.canvas.width, node.x));
            node.y = Math.max(0, Math.min(this.canvas.height, node.y));
        });

        // Draw connections
        this.connections.forEach(connection => {
            const opacity = connection.strength * 0.3;
            this.ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(connection.from.x, connection.from.y);
            this.ctx.lineTo(connection.to.x, connection.to.y);
            this.ctx.stroke();
        });

        // Draw nodes
        this.nodes.forEach(node => {
            this.ctx.fillStyle = 'rgba(0, 212, 255, 0.6)';
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fill();

            // Add glow effect
            this.ctx.shadowColor = 'rgba(0, 212, 255, 0.8)';
            this.ctx.shadowBlur = 10;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXECUTIVE SURVEY ENGINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class ExecutiveSurveyEngine {
    constructor() {
        this.currentPhase = 0;
        this.currentQuestionIndex = 0;
        this.responses = {};
        this.startTime = null;
        this.neuralNetwork = null;
        this.questionTimer = null;
        this.sessionId = this.generateSessionId();

        this.init();
    }

    init() {
        this.neuralNetwork = new NeuralNetwork();
        this.bindEvents();
        this.updateProgress();
        this.showWelcomeScreen();
    }

    generateSessionId() {
        return 'exec_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    bindEvents() {
        // Modal controls
        document.addEventListener('click', (e) => {
            if (e.target.matches('.modal-overlay') || e.target.matches('.modal-close')) {
                this.closeModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SCREEN MANAGEMENT
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    showWelcomeScreen() {
        this.setActiveScreen('welcome-screen');
        this.updateProgress(0);
    }

    showSurveyScreen() {
        this.setActiveScreen('survey-container');
        this.startTime = new Date();
        this.renderCurrentQuestion();
    }

    showCompletionScreen() {
        this.setActiveScreen('completion-screen');
        this.renderCompletionStats();
    }

    setActiveScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // MODAL MANAGEMENT
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    }

    closeModal() {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // PROGRESS MANAGEMENT
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    updateProgress(percentage = null) {
        if (percentage === null) {
            const totalQuestions = EXECUTIVE_QUESTIONS.getTotalQuestions();
            const answeredQuestions = Object.keys(this.responses).length;
            percentage = (answeredQuestions / totalQuestions) * 100;
        }

        const progressFill = document.getElementById('progressFill');
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }

        this.updateMilestones(percentage);
    }

    updateMilestones(percentage) {
        const milestones = document.querySelectorAll('.milestone');
        const phaseProgress = percentage / 100 * EXECUTIVE_QUESTIONS.phases.length;

        milestones.forEach((milestone, index) => {
            milestone.classList.remove('active', 'completed');

            if (index < Math.floor(phaseProgress)) {
                milestone.classList.add('completed');
            } else if (index === Math.floor(phaseProgress)) {
                milestone.classList.add('active');
            }
        });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // QUESTION RENDERING
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    renderCurrentQuestion() {
        const allQuestions = EXECUTIVE_QUESTIONS.getAllQuestions();
        const question = allQuestions[this.currentQuestionIndex];

        if (!question) {
            this.completeSurvey();
            return;
        }

        const container = document.getElementById('survey-container');
        container.innerHTML = this.renderQuestionCard(question);
        this.bindQuestionEvents(question);
        this.updateProgress();
    }

    renderQuestionCard(question) {
        const phase = EXECUTIVE_QUESTIONS.getPhaseByQuestionId(question.id);
        const questionNumber = this.currentQuestionIndex + 1;
        const totalQuestions = EXECUTIVE_QUESTIONS.getTotalQuestions();

        return `
            <div class="question-card" data-question-id="${question.id}">
                <div class="question-header">
                    <div class="question-number">Question ${questionNumber} of ${totalQuestions}</div>
                    <div class="question-section">${phase ? phase.name : 'Survey'}</div>
                </div>

                <div class="question-title">${question.questionText}</div>

                ${question.subtext ? `<div class="question-subtitle">${question.subtext}</div>` : ''}

                <div class="question-options">
                    ${this.renderQuestionInput(question)}
                </div>

                <div class="question-navigation">
                    <button class="nav-btn secondary" onclick="executiveSurvey.previousQuestion()" ${this.currentQuestionIndex === 0 ? 'disabled' : ''}>
                        <span>←</span>
                        <span>Previous</span>
                    </button>
                    <button class="nav-btn primary" onclick="executiveSurvey.nextQuestion()" id="nextBtn">
                        <span>Next</span>
                        <span>→</span>
                    </button>
                </div>
            </div>
        `;
    }

    renderQuestionInput(question) {
        switch (question.type) {
            case 'scale':
                return this.renderScaleInput(question);
            case 'choice':
                return this.renderChoiceInput(question);
            case 'text':
                return this.renderTextInput(question);
            case 'ranking':
                return this.renderRankingInput(question);
            default:
                return '<div class="error">Unsupported question type</div>';
        }
    }

    renderScaleInput(question) {
        const markers = question.showMarkers ? Array.from({length: question.max - question.min + 1}, (_, i) => i + question.min) : [];
        const currentValue = this.responses[question.id] || question.default;

        return `
            <div class="scale-container">
                <div class="scale-labels">
                    <span>${question.minLabel}</span>
                    <span>${question.maxLabel}</span>
                </div>
                <div class="scale-track">
                    <div class="scale-fill" style="width: ${((currentValue - question.min) / (question.max - question.min)) * 100}%"></div>
                </div>
                <div class="scale-markers">
                    ${markers.map(value => `
                        <div class="scale-marker ${currentValue === value ? 'active' : ''}"
                             data-value="${value}"
                             onclick="executiveSurvey.selectScaleValue('${question.id}', ${value})">
                        </div>
                    `).join('')}
                </div>
                <div class="scale-value-display">
                    Selected: <strong>${currentValue}</strong>
                </div>
            </div>
        `;
    }

    renderChoiceInput(question) {
        const currentValue = this.responses[question.id] || (question.multiple ? [] : '');

        let optionsHtml = question.options.map(option => {
            const isSelected = question.multiple
                ? currentValue.includes(option.value)
                : currentValue === option.value;

            return `
                <label class="option-item">
                    <input type="${question.multiple ? 'checkbox' : 'radio'}"
                           name="question_${question.id}"
                           value="${option.value}"
                           ${isSelected ? 'checked' : ''}
                           onchange="executiveSurvey.handleChoiceChange('${question.id}', '${option.value}', ${question.multiple})">
                    <span class="option-label">${option.label}</span>
                </label>
            `;
        }).join('');

        if (question.other !== false) {
            const otherValue = question.multiple
                ? currentValue.find(v => !question.options.some(opt => opt.value === v))
                : (currentValue && !question.options.some(opt => opt.value === currentValue) ? currentValue : '');

            optionsHtml += `
                <label class="option-item">
                    <input type="${question.multiple ? 'checkbox' : 'radio'}"
                           name="question_${question.id}"
                           value="__other__"
                           ${otherValue ? 'checked' : ''}
                           onchange="executiveSurvey.handleChoiceChange('${question.id}', '__other__', ${question.multiple})">
                    <span class="option-label">Other (please specify)</span>
                </label>
                <input type="text"
                       class="other-input"
                       placeholder="Please specify..."
                       value="${otherValue || ''}"
                       oninput="executiveSurvey.handleOtherInput('${question.id}', this.value, ${question.multiple})"
                       style="display: ${otherValue ? 'block' : 'none'}; margin-top: 0.5rem; padding: 0.5rem; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: white; width: 100%;">
            `;
        }

        return optionsHtml;
    }

    renderTextInput(question) {
        const currentValue = this.responses[question.id] || '';

        return `
            <textarea class="text-input"
                      placeholder="${question.placeholder || ''}"
                      maxlength="${question.maxLength || ''}"
                      oninput="executiveSurvey.handleTextInput('${question.id}', this.value)"
                      style="width: 100%; min-height: ${question.multiline ? '120px' : '60px'}; padding: 1rem; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: white; font-family: inherit; resize: vertical;">${currentValue}</textarea>
            ${question.maxLength ? `<div class="char-counter">${currentValue.length}/${question.maxLength} characters</div>` : ''}
        `;
    }

    renderRankingInput(question) {
        const currentRanking = this.responses[question.id] || question.items;

        return `
            <div class="ranking-container">
                <div class="ranking-instructions">Drag items to rank them from most important (top) to least important (bottom):</div>
                <div class="ranking-list" id="ranking-${question.id}">
                    ${currentRanking.map((item, index) => `
                        <div class="ranking-item" data-value="${item}" draggable="true">
                            <div class="ranking-number">${index + 1}</div>
                            <div class="ranking-text">${item}</div>
                            <div class="ranking-handle">⋮⋮</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // EVENT HANDLING
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    bindQuestionEvents(question) {
        switch (question.type) {
            case 'ranking':
                this.bindRankingEvents(question.id);
                break;
        }
    }

    bindRankingEvents(questionId) {
        const rankingList = document.getElementById(`ranking-${questionId}`);
        if (!rankingList) return;

        let draggedElement = null;

        rankingList.addEventListener('dragstart', (e) => {
            draggedElement = e.target.closest('.ranking-item');
            draggedElement.classList.add('dragging');
        });

        rankingList.addEventListener('dragend', (e) => {
            draggedElement.classList.remove('dragging');
            draggedElement = null;
            this.updateRankingResponse(questionId);
        });

        rankingList.addEventListener('dragover', (e) => {
            e.preventDefault();
            const afterElement = this.getDragAfterElement(rankingList, e.clientY);
            if (afterElement == null) {
                rankingList.appendChild(draggedElement);
            } else {
                rankingList.insertBefore(draggedElement, afterElement);
            }
        });
    }

    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.ranking-item:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // RESPONSE HANDLING
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    selectScaleValue(questionId, value) {
        this.responses[questionId] = value;
        this.renderCurrentQuestion(); // Re-render to update UI
    }

    handleChoiceChange(questionId, value, multiple) {
        if (multiple) {
            if (!this.responses[questionId]) {
                this.responses[questionId] = [];
            }

            if (value === '__other__') {
                // Handle other input visibility
                const otherInput = document.querySelector('.other-input');
                if (otherInput) {
                    otherInput.style.display = 'block';
                }
            } else {
                const index = this.responses[questionId].indexOf(value);
                if (index > -1) {
                    this.responses[questionId].splice(index, 1);
                } else {
                    this.responses[questionId].push(value);
                }
            }
        } else {
            this.responses[questionId] = value;

            if (value === '__other__') {
                const otherInput = document.querySelector('.other-input');
                if (otherInput) {
                    otherInput.style.display = 'block';
                }
            } else {
                const otherInput = document.querySelector('.other-input');
                if (otherInput) {
                    otherInput.style.display = 'none';
                    otherInput.value = '';
                }
            }
        }
    }

    handleOtherInput(questionId, value, multiple) {
        if (multiple) {
            // Remove any existing other values
            this.responses[questionId] = this.responses[questionId].filter(v =>
                EXECUTIVE_QUESTIONS.getQuestionById(questionId).options.some(opt => opt.value === v)
            );

            if (value.trim()) {
                this.responses[questionId].push(value.trim());
            }
        } else {
            this.responses[questionId] = value.trim() || '__other__';
        }
    }

    handleTextInput(questionId, value) {
        this.responses[questionId] = value;
        this.updateCharCounter(questionId, value);
    }

    updateCharCounter(questionId, value) {
        const counter = document.querySelector('.char-counter');
        if (counter) {
            const question = EXECUTIVE_QUESTIONS.getQuestionById(questionId);
            const maxLength = question.maxLength;
            const currentLength = value.length;
            counter.textContent = `${currentLength}/${maxLength} characters`;

            if (currentLength > maxLength * 0.9) {
                counter.style.color = '#ef4444';
            } else {
                counter.style.color = 'var(--exec-gray-400)';
            }
        }
    }

    updateRankingResponse(questionId) {
        const rankingItems = document.querySelectorAll(`#ranking-${questionId} .ranking-item`);
        const ranking = Array.from(rankingItems).map(item => item.dataset.value);
        this.responses[questionId] = ranking;

        // Update numbers
        rankingItems.forEach((item, index) => {
            item.querySelector('.ranking-number').textContent = index + 1;
        });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // NAVIGATION
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    nextQuestion() {
        const currentQuestion = EXECUTIVE_QUESTIONS.getAllQuestions()[this.currentQuestionIndex];
        const validationError = EXECUTIVE_QUESTIONS.validateQuestionResponse(currentQuestion, this.responses[currentQuestion.id]);

        if (validationError) {
            this.showNotification(validationError, 'error');
            return;
        }

        this.currentQuestionIndex++;

        if (this.currentQuestionIndex >= EXECUTIVE_QUESTIONS.getTotalQuestions()) {
            this.completeSurvey();
        } else {
            this.renderCurrentQuestion();
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.renderCurrentQuestion();
        }
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // COMPLETION
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    completeSurvey() {
        this.saveResponses();
        this.showCompletionScreen();
    }

    renderCompletionStats() {
        const endTime = new Date();
        const duration = Math.floor((endTime - this.startTime) / 1000 / 60); // minutes
        const questionCount = Object.keys(this.responses).length;
        const insightsGenerated = this.calculateInsights();

        document.getElementById('questionsAnswered').textContent = questionCount;
        document.getElementById('timeSpent').textContent = `${duration} min`;
        document.getElementById('insightsGenerated').textContent = insightsGenerated;
    }

    calculateInsights() {
        // Simple heuristic based on response complexity
        let insights = 0;
        Object.values(this.responses).forEach(response => {
            if (typeof response === 'string' && response.length > 100) {
                insights += 2; // Long text responses
            } else if (Array.isArray(response) && response.length > 1) {
                insights += 1; // Multiple selections
            } else if (response) {
                insights += 1; // Any response
            }
        });
        return Math.min(insights, 50); // Cap at 50
    }

    saveResponses() {
        const surveyData = {
            sessionId: this.sessionId,
            timestamp: new Date().toISOString(),
            responses: this.responses,
            metadata: {
                userAgent: navigator.userAgent,
                screenSize: `${window.innerWidth}x${window.innerHeight}`,
                duration: this.startTime ? (new Date() - this.startTime) / 1000 : 0
            }
        };

        // Save to localStorage as backup
        localStorage.setItem(`executive_survey_${this.sessionId}`, JSON.stringify(surveyData));

        // In a real application, this would send to a server
        console.log('Survey responses saved:', surveyData);
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // UTILITIES
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `creative-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${this.getNotificationIcon(type)}</span>
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
        }, 4000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || icons.info;
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GLOBAL FUNCTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function beginExecutiveStudy() {
    executiveSurvey.showSurveyScreen();
}

function showStudyDetails() {
    executiveSurvey.showModal('study-details-modal');
}

function closeModal() {
    executiveSurvey.closeModal();
}

function downloadReport() {
    // Generate a simple report
    const reportData = {
        survey: 'Future of Creative Work - Executive Research',
        completionDate: new Date().toISOString(),
        responses: executiveSurvey.responses
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `executive-research-report-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    executiveSurvey.showNotification('Report downloaded successfully!', 'success');
}

function shareStudy() {
    if (navigator.share) {
        navigator.share({
            title: 'Future of Creative Work Research',
            text: 'Participate in groundbreaking research on the transformation of creative professions.',
            url: window.location.href
        });
    } else {
        // Fallback: copy URL to clipboard
        navigator.clipboard.writeText(window.location.href);
        executiveSurvey.showNotification('Study link copied to clipboard!', 'success');
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INITIALIZATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let executiveSurvey;

document.addEventListener('DOMContentLoaded', function() {
    executiveSurvey = new ExecutiveSurveyEngine();
});
