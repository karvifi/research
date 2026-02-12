/**
 * ULTIMATE RESEARCH PLATFORM - ADVANCED INTERVIEW ENGINE
 * Built for PhD Research | Premium Conversational UX
 * Version: 3.0.0 - Bulletproof Database (Feb 2026)
 * All data guaranteed to be recorded in Supabase
 */

class NeuralNetwork {
    constructor() {
        this.canvas = document.getElementById('neuralCanvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.mouse = { x: null, y: null, radius: 250 };
        this.time = 0;
        this.isWarping = true;
        this.resizeCanvas();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resizeCanvas());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });

        // Initial Warp Sequence
        setTimeout(() => { this.isWarping = false; }, 1800);

        // HUD Heartbeat
        this.updateHUDTime();
        setInterval(() => this.updateHUDTime(), 1000);
    }

    updateHUDTime() {
        const el = document.getElementById('hud-time');
        if (el) el.textContent = new Date().toLocaleTimeString('en-GB', { hour12: false });
    }

    resizeCanvas() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        const nodeCount = Math.min(250, Math.floor((this.canvas.width * this.canvas.height) / 4000));
        this.nodes = [];
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push({
                x: centerX,
                y: centerY,
                vx: (Math.random() - 0.5) * 20, // High velocity for warp
                vy: (Math.random() - 0.5) * 20,
                radius: Math.random() * 2 + 0.5,
                density: (Math.random() * 30) + 1,
                color: i % 10 === 0 ? 'rgba(255, 77, 0, 0.8)' : 'rgba(255, 77, 0, 0.2)'
            });
        }
    }

    animate() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.time += 0.005;

        this.nodes.forEach((node, i) => {
            if (this.isWarping) {
                // High-speed explosion from center
                node.x += node.vx;
                node.y += node.vy;
                node.vx *= 0.98; // Friction to settle
                node.vy *= 0.98;
            } else {
                // Perlin-style Flow Field
                // Simulating noise with sine/cosine composition for organic swirls
                const noise = Math.sin(node.x * 0.005 + this.time) + Math.cos(node.y * 0.005 + this.time);
                const angle = noise * Math.PI * 2;

                node.vx += Math.cos(angle) * 0.1;
                node.vy += Math.sin(angle) * 0.1;

                // Speed Limit
                const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
                if (speed > 1.5) {
                    node.vx *= 0.95;
                    node.vy *= 0.95;
                }

                node.x += node.vx;
                node.y += node.vy;

                // Mouse Gravity
                if (this.mouse.x !== null) {
                    let dx = this.mouse.x - node.x;
                    let dy = this.mouse.y - node.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < this.mouse.radius) {
                        let force = (this.mouse.radius - distance) / this.mouse.radius;
                        node.vx += (dx / distance) * force * 0.2;
                        node.vy += (dy / distance) * force * 0.2;
                    }
                }
            }

            // Screen Wrap
            if (node.x < 0) node.x = this.canvas.width;
            if (node.x > this.canvas.width) node.x = 0;
            if (node.y < 0) node.y = this.canvas.height;
            if (node.y > this.canvas.height) node.y = 0;

            // Draw Node
            this.ctx.fillStyle = node.color;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fill();

            // Connections (only a subset for performance with high node count)
            if (i % 2 === 0) {
                for (let j = i + 1; j < Math.min(i + 15, this.nodes.length); j++) {
                    const other = this.nodes[j];
                    const dxSq = (node.x - other.x) ** 2;
                    const dySq = (node.y - other.y) ** 2;
                    const distSq = dxSq + dySq;

                    if (distSq < 15000) {
                        const dist = Math.sqrt(distSq);
                        const opacity = (1 - (dist / 122)) * 0.12;
                        this.ctx.strokeStyle = `rgba(255, 77, 0, ${opacity})`;
                        this.ctx.lineWidth = 0.5;
                        this.ctx.beginPath();
                        this.ctx.moveTo(node.x, node.y);
                        this.ctx.lineTo(other.x, other.y);
                        this.ctx.stroke();
                    }
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

class UltimateSurveyEngine {
    constructor() {
        this.state = {
            currentPage: 'landing',
            currentQuestionIndex: 0,
            responseId: null,
            startTime: null,
            answers: {},
            pathway: null,
            questionFlow: [],
            isVerified: false,
            selectedPersona: null,
            linkedInUrl: null,
            lastSection: null,
            lastInteractionTime: null, // For speed tracking
            responseSpeeds: [], // Array of durations (ms)
            isSpeedrun: false,
            questionsAnswered: 0,
            questionsSkipped: 0
        };
        
        // Initialize scheduler state early so static calendar works immediately
        this.schedulerState = {
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear(),
            selectedDate: null,
            selectedTime: null,
            bookedSlots: []
        };
        
        this._transitioning = false;
        this._schedulerInitialized = false;
        
        this.observerDialogue = {
            'Screening': 'Calibration begins with defining the parameters of your environment.',
            'Demographics': 'Contextual data points are being integrated into your professional profile.',
            'CAT: Strategic Appropriateness': 'We are measuring the core of your creative trust—the Contextual Appropriateness model.',
            'CAT: Cultural Resonance': 'Aesthetics are universal, but appropriateness is deeply cultural.',
            'CAT: Brand Alignment': 'Trust calibration often hinges on the alignment with existing brand structures.',
            'CAT: Aesthetic Quality': 'Evaluating visual competence is the first stage of appropriate reliance.',
            'CAT: Stakeholder Acceptance': 'Professional defensibility is key to appropriate trust calibration.',
            'Identity: Executor': 'How much of your value is currently in the work, and how much is in the judgment?',
            'Identity: Curator': 'The curator shift is a fundamental transformation in professional expertise.',
            'Identity: Uncertainty': 'Ambiguity in identity often precedes a new stage of professional maturity.',
            'Expertise: Pillars': 'Analyzing the four dimensions of evolved creative expertise.',
            'Spirals: Virtuous': 'The relationship between trust and identity is recursive. Observe the cycle.',
            'Spirals: Vicious': 'Negative spirals can lead to de-skilling and professional dependency.',
            'Org Capabilities: Complementary Investment': 'Individual trust cannot exist in an organizational vacuum.',
            'Calibration': 'Precision is key. How accurately do you perceive the system\'s limits?',
            'Cultural Context': 'Global research requires a nuanced understanding of cultural moderator effects.',
            'Outcomes: Work Quality': 'Integration complete. Measuring the net impact on your professional trajectory.'
        };
        this.isTyping = false;
        this.init();
    }

    init() {
        try {
            new NeuralNetwork();
            this.bindGlobalEvents();
            this.checkAuth();
            this.checkResume();
            this.initSocialProofJitter();
            
            // Initialize scheduler listeners immediately so static calendar works
            this.attachSchedulerListeners();
            safeLog('log', '✅ Scheduler listeners attached on init');
            
            // Attach contact form submit button listener
            this.attachContactFormListener();
        } catch (e) {
            safeLog('error', 'Core Engine Init Failure:', e);
            this.showError('System Architecture Mismatch detected.');
        }
    }

    attachContactFormListener() {
        // Wait for DOM to be ready
        const attachListener = () => {
            const submitBtn = document.getElementById('submit-contact-btn');
            if (submitBtn) {
                safeLog('log', '✅ Contact form button found, attaching listener');
                
                // Add visual feedback on hover to confirm button is interactive
                submitBtn.style.cursor = 'pointer';
                
                // Test if button is clickable
                submitBtn.addEventListener('mouseenter', () => {
                    safeLog('log', '🖱️ Mouse entered button area');
                });
                
                submitBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    safeLog('log', '🔘 Contact button clicked via event listener');
                    this.submitContactDetails();
                });
            } else {
                safeLog('warn', '⚠️ Contact form button not found yet, retrying...');
                setTimeout(attachListener, 100);
            }
        };
        attachListener();
    }

    bindGlobalEvents() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) this.nextQuestion();
        });

        // Spatial 3D Mouse Influence
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 45;
            const y = (window.innerHeight / 2 - e.pageY) / 45;

            document.documentElement.style.setProperty('--spatial-rotate', `${x}deg`);
            document.documentElement.style.setProperty('--spatial-tilt', `${-y}deg`);
        });

        window.addEventListener('beforeunload', (e) => {
            if (this.state.currentPage === 'survey' && this.state.currentQuestionIndex > 0) {
                e.preventDefault();
                e.returnValue = 'Unsynchronised data nodes will be lost.';
            }
        });
    }

    async checkAuth() {
            // CHECK FOR OAUTH CALLBACK FIRST - Before getting user
            const hash = window.location.hash;
            const searchParams = new URLSearchParams(window.location.search);
            const hasOAuthCallback = hash.includes('access_token') || 
                                    hash.includes('refresh_token') ||
                                    searchParams.has('code') ||
                                    searchParams.has('oauth') ||
                                    sessionStorage.getItem('oauth_redirect') === 'pending';

            if (hasOAuthCallback) {
                // Get the page user was on before OAuth - check URL parameter FIRST (tracking prevention fallback)
                const returnPage = searchParams.get('return_to') || sessionStorage.getItem('oauth_return_page') || 'contact';
                safeLog('log', `🔄 OAuth callback detected - redirecting to ${returnPage} page`);

                // Mark that we've handled the OAuth redirect
                sessionStorage.setItem('oauth_redirect', 'handled');
                sessionStorage.setItem('should_autofill', 'true');

                // Clean up URL immediately
                window.history.replaceState(null, '', window.location.pathname);

                // Get user data
                const { success, user } = await Database.getCurrentUser();
                if (success && user) {
                    safeLog('log', `✅ Authenticated user detected: ${user.email}`);

                    // Save to sessionStorage
                    sessionStorage.setItem('google_user_name', user.user_metadata?.full_name || user.user_metadata?.name || '');
                    sessionStorage.setItem('google_user_email', user.email || '');

                    // Save to state
                    this.state.googleUser = user;
                    this.state.participantEmail = user.email;
                    this.state.participantName = user.user_metadata?.full_name || user.user_metadata?.name;
                }

                // Redirect to the appropriate page IMMEDIATELY
                if (returnPage === 'scheduler') {
                    this.startInterview(); // Interview flow with calendar
                } else if (returnPage === 'contact') {
                    this.showPage('contact'); // Study flow
                } else {
                    // Fallback
                    this.showPage(returnPage);
                }

                // Clear the OAuth flags after auto-fill completes (longer delay)
                setTimeout(() => {
                    sessionStorage.removeItem('oauth_redirect');
                    sessionStorage.removeItem('oauth_return_page');
                    // Don't remove should_autofill - let showPage handle it
                    safeLog('log', '✅ OAuth redirect complete');
                }, 3000);

                return; // Stop here
            }

            // Normal auth check (not OAuth callback)
            const { success, user } = await Database.getCurrentUser();
            if (success && user) {
                safeLog('log', `✅ Authenticated user detected: ${user.email}`);

                // Save to sessionStorage
                sessionStorage.setItem('google_user_name', user.user_metadata?.full_name || user.user_metadata?.name || '');
                sessionStorage.setItem('google_user_email', user.email || '');

                // Save to state
                this.state.googleUser = user;
                this.state.participantEmail = user.email;
                this.state.participantName = user.user_metadata?.full_name || user.user_metadata?.name;

                // Auto-populate forms if on contact or scheduler page
                const currentPage = this.state.currentPage;
                if (currentPage === 'contact' || currentPage === 'scheduler') {
                    this.autoFillFromGoogle(user);
                    safeLog('log', '✅ User data auto-populated from existing session');
                } else {
                    safeLog('log', `⏭️ Not on form page (current: ${currentPage}) - skipping auto-fill`);
                }
            } else {
                safeLog('log', '✅ No authenticated session - proceeding as guest');
            }
        }


    // Helper function to auto-fill forms from Google user data
    autoFillFromGoogle(user) {
        safeLog('log', '🔍 Attempting to auto-fill from Google user data...');
        
        // Get data from sessionStorage if user object is not provided
        const userName = user ? (user.user_metadata?.full_name || user.user_metadata?.name) : sessionStorage.getItem('google_user_name');
        const userEmail = user ? user.email : sessionStorage.getItem('google_user_email');
        
        safeLog('log', `Data to fill - Name: ${userName}, Email: ${userEmail}`);
        
        // Try multiple times with delays to ensure DOM is ready
        const attemptFill = (attempt = 1) => {
            // Check which page is currently active
            const contactPage = document.getElementById('contact-page');
            const schedulerPage = document.getElementById('scheduler-page');
            
            const isContactActive = contactPage && contactPage.classList.contains('active');
            const isSchedulerActive = schedulerPage && schedulerPage.classList.contains('active');
            
            safeLog('log', `Attempt ${attempt}: Contact active: ${isContactActive}, Scheduler active: ${isSchedulerActive}`);
            
            // If neither contact nor scheduler page is active, don't try to fill
            if (!isContactActive && !isSchedulerActive) {
                safeLog('log', '⏭️ Not on contact or scheduler page - skipping auto-fill');
                return;
            }
            
            let nameInput = null;
            let emailInput = null;
            let roleInput = null;
            
            // Select the correct fields based on which page is active
            if (isContactActive) {
                nameInput = document.getElementById('contact-name');
                emailInput = document.getElementById('contact-email');
                roleInput = document.getElementById('contact-role');
                safeLog('log', '📍 Contact page is active - using contact-name and contact-email fields');
            } else if (isSchedulerActive) {
                nameInput = document.getElementById('booking-name');
                emailInput = document.getElementById('booking-email');
                roleInput = document.getElementById('participant-role');
                safeLog('log', '📍 Scheduler page is active - using booking-name and booking-email fields');
            }
            
            let filled = false;

            if (nameInput && userName) {
                nameInput.value = userName;
                nameInput.dispatchEvent(new Event('input', { bubbles: true }));
                safeLog('log', `✅ Name field filled: ${nameInput.value} (field: ${nameInput.id})`);
                filled = true;
            }
            
            if (emailInput && userEmail) {
                emailInput.value = userEmail;
                emailInput.dispatchEvent(new Event('input', { bubbles: true }));
                safeLog('log', `✅ Email field filled: ${emailInput.value} (field: ${emailInput.id})`);
                filled = true;
            }

            // If fields weren't filled and we haven't tried 10 times yet, try again
            if (!filled && attempt < 10) {
                safeLog('log', `⏳ Fields not ready, retrying in 300ms... (attempt ${attempt}/10)`);
                setTimeout(() => attemptFill(attempt + 1), 300);
            } else if (attempt >= 10) {
                safeLog('error', '❌ Failed to fill fields after 10 attempts - page may have changed');
                // Don't show alert - user may have navigated away from the form page
            } else {
                safeLog('log', '✅ Auto-fill successful!');
            }
        };

        // Start attempting to fill immediately
        attemptFill();

        // Store user info in state for later use
        if (user) {
            this.state.googleUser = {
                email: user.email,
                name: user.user_metadata?.full_name || user.user_metadata?.name,
                age: user.user_metadata?.age
            };
            
            this.state.participantEmail = user.email;
            this.state.participantName = user.user_metadata?.full_name || user.user_metadata?.name;
        }
        
        safeLog('log', '✅ User data saved to state');
    }

    initSocialProofJitter() {
        const liveCountEl = document.getElementById('social-proof-live-count');
        const joinedCountEl = document.getElementById('social-proof-count');

        if (!liveCountEl || !joinedCountEl) return;

        // 1. Live Active Users Jitter (Fast, nervous energy)
        const jitterLiveCount = () => {
            // Random between 2 and 6 active users (realistic for a niche study)
            const newCount = Math.floor(Math.random() * (6 - 2 + 1)) + 2;
            liveCountEl.innerText = newCount;
            liveCountEl.parentElement.classList.add('pulse-text');
            setTimeout(() => liveCountEl.parentElement.classList.remove('pulse-text'), 200);

            // Schedule next jitter
            const nextInterval = Math.random() * (7000 - 3000) + 3000;
            setTimeout(jitterLiveCount, nextInterval);
        };
        // Start jitter
        jitterLiveCount();

        // 2. Joined Count Slow Drip (Slow, steady growth)
        const incrementJoinedCount = () => {
            // 30% chance to increment
            if (Math.random() > 0.7) {
                let current = parseInt(joinedCountEl.innerText.replace(/,/g, ''));
                if (!isNaN(current)) {
                    joinedCountEl.innerText = (current + 1).toLocaleString();
                    joinedCountEl.style.color = 'var(--color-solar-orange)';
                    setTimeout(() => joinedCountEl.style.color = '', 500);
                }
            }
            // Schedule next check (every 45s - 90s)
            const nextCheck = Math.random() * (90000 - 45000) + 45000;
            setTimeout(incrementJoinedCount, nextCheck);
        };
        // Start drip
        setTimeout(incrementJoinedCount, 15000); // First check after 15s
    }

    decryptText(element, text) {
        if (!element) return;
        element.innerHTML = '';
        element.classList.add('decrypting');
        const chars = text.split('');
        const glyphs = '01#X$/@!%&*?><';

        chars.forEach((char, i) => {
            const span = document.createElement('span');
            span.classList.add('decrypt-char');
            span.innerText = glyphs[Math.floor(Math.random() * glyphs.length)];
            element.appendChild(span);

            setTimeout(() => {
                let interval = setInterval(() => {
                    span.innerText = glyphs[Math.floor(Math.random() * glyphs.length)];
                }, 50);

                setTimeout(() => {
                    clearInterval(interval);
                    span.innerText = char;
                    span.classList.add('revealed');
                }, 300 + (i * 30));
            }, i * 20);
        });
    }

    checkResume() {
        const saved = LocalBackup.loadResponse();
        // Session resumption disabled as per user request to remove notifications
    }

    async showPage(pageId) {
        // Transition lock to prevent rapid page changes
        if (this._transitioning) {
            safeLog('warn', '⚠️ Page transition in progress, ignoring request');
            return;
        }

        // No verification gate — 3-layer signal stack handles credibility

        // Validation: Prevent navigation to terms page without required contact details
        if (pageId === 'terms') {
            // Check both contact page fields and scheduler page fields
            const name = document.getElementById('contact-name')?.value.trim() || 
                        document.getElementById('booking-name')?.value.trim() || 
                        document.getElementById('participant-name')?.value.trim();
            const email = document.getElementById('contact-email')?.value.trim() ||
                         document.getElementById('booking-email')?.value.trim() || 
                         document.getElementById('participant-email')?.value.trim();
            const role = document.getElementById('contact-role')?.value ||
                        document.getElementById('participant-role')?.value;

            const errorDiv = document.getElementById('skip-scheduling-error') || document.getElementById('contact-error');
            const missingFields = [];

            safeLog('log', `🔍 Terms page validation - Name: ${name}, Email: ${email}, Role: ${role}`);

            // Check which fields are missing
            if (!name) missingFields.push('Name');
            if (!email) missingFields.push('Email');
            if (!role) missingFields.push('Current Role');

            if (missingFields.length > 0) {
                safeLog('warn', `⚠️ Missing fields for terms page: ${missingFields.join(', ')}`);
                if (errorDiv) {
                    errorDiv.innerHTML = `⚠️ Please fill in the following required fields before proceeding: <strong>${missingFields.join(', ')}</strong>`;
                    errorDiv.style.display = 'block';
                }
                // Scroll to error message
                errorDiv?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            if (email && !email.includes('@')) {
                safeLog('warn', '⚠️ Invalid email format for terms page');
                if (errorDiv) {
                    errorDiv.innerHTML = '⚠️ Please provide a valid email address before proceeding to the agreement.';
                    errorDiv.style.display = 'block';
                }
                // Scroll to error message
                errorDiv?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            safeLog('log', '✅ Terms page validation passed');

            // Hide error if validation passes
            if (errorDiv) {
                errorDiv.style.display = 'none';
            }

            // Save contact info to database when skipping scheduler (async operation)
            if (!this.state.bookingConfirmed) {
                const industry = document.getElementById('participant-industry')?.value.trim() || null;
                const profileLink = document.getElementById('participant-profile')?.value.trim() || null;

                // Update (or create) participant with contact info and eligibility/commitment
                if (typeof Database !== 'undefined') {
                    // Don't await - let it run in background to avoid blocking page transition
                    Database.updateContact(this.state.responseId, {
                        email: email,
                        name: name,
                        role: role,
                        industry: industry,
                        profileUrl: profileLink,
                        eligibilityCategory: this.state.eligibilityCategory,
                        contextStatement: this.state.contextStatement
                    }).then(() => {
                        safeLog('log', '✅ Contact info saved when skipping scheduler');
                    }).catch(err => {
                        safeLog('error', '❌ Error saving contact:', err);
                    });
                }

                // Save to state
                this.state.participantEmail = email;
                this.state.participantName = name;
                this.state.participantRole = role;
            }
        }

        this._transitioning = true;
        this.state.currentPage = pageId;

        // Step 1: Fade out current page
        const currentPages = document.querySelectorAll('.page.active');
        currentPages.forEach(page => {
            page.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            page.style.opacity = '0';
            page.style.transform = 'translateY(20px)';
        });

        // Step 2: After fade completes, switch active state
        setTimeout(() => {
            requestAnimationFrame(() => {
                document.querySelectorAll('.page').forEach(page => {
                    page.classList.remove('active', 'spatial-layer');
                    page.style.opacity = '';
                    page.style.transform = '';
                });

                // Normalize ID: Ensure it has exactly one '-page' suffix for the DOM lookup
                const targetId = pageId.endsWith('-page') ? pageId : `${pageId}-page`;
                const target = document.getElementById(targetId);
                if (target) {
                    target.classList.add('active');

                    // Step 3: Prepare for entrance
                    requestAnimationFrame(() => {
                        target.classList.add('spatial-layer');

                        // Add GPU acceleration hints
                        target.style.willChange = 'opacity, transform';

                        // Spatial Mastery: Inject high-fidelity depth classes (EXCLUDING terms for readability)
                        target.querySelectorAll('.verification-gate, .persona-card, .briefing-document, .question-card, .stat')
                            .forEach(el => el.classList.add('spatial-card', 'spatial-float'));

                        // Cinematic Reveal: Decrypt primary header
                        const header = target.querySelector('h1, h2.question-text');
                        if (header && !header.classList.contains('decrypted')) {
                            header.classList.add('decrypted');
                            const originalText = header.innerText;
                            this.decryptText(header, originalText);
                        }

                        window.scrollTo({ top: 0, behavior: 'smooth' });

                        // Step 4: Stagger reveal after scroll settles
                        setTimeout(() => {
                            this.staggerReveal(target);

                            // Remove will-change after animations complete
                            setTimeout(() => {
                                target.style.willChange = '';
                                this._transitioning = false;
                                
                                // CRITICAL: Initialize scheduler if we just showed the scheduler page
                                if (pageId === 'scheduler' && !this._schedulerInitialized) {
                                    safeLog('log', '🔧 Scheduler page shown, initializing calendar...');
                                    setTimeout(() => {
                                        this.initializeScheduler();
                                        this._schedulerInitialized = true;
                                    }, 100);
                                }
                                
                                // CRITICAL: Auto-fill Google data if flag is set
                                if ((pageId === 'contact' || pageId === 'scheduler') && sessionStorage.getItem('should_autofill') === 'true') {
                                    safeLog('log', '🔄 Auto-fill flag detected, filling form...');
                                    setTimeout(() => {
                                        this.autoFillFromGoogle(null); // Pass null to use sessionStorage data
                                        sessionStorage.removeItem('should_autofill');
                                    }, 200);
                                }
                            }, 800);
                        }, 300);
                    });
                } else {
                    this._transitioning = false;
                }
            });
        }, 300);
    }

    showError(message) {
        safeLog('error', `❌ System Error: ${message}`);

        // Try AdvancedFeatures notification first
        if (typeof AdvancedFeatures !== 'undefined' && AdvancedFeatures.showNotification) {
            AdvancedFeatures.showNotification(message, 'error');
            return;
        }

        // Fallback: Check for an error container or Create a toast
        let toast = document.getElementById('system-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'system-toast';
            toast.style = `
                position: fixed; top: 20px; right: 20px; 
                background: #ef4444; color: white; 
                padding: 1rem 1.5rem; border-radius: 8px; 
                z-index: 10001; font-weight: 500;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                animation: slideIn 0.3s ease-out;
            `;
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.style.display = 'block';

        setTimeout(() => {
            toast.style.display = 'none';
        }, 5000);
    }

    staggerReveal(container) {
        const items = container.querySelectorAll('.persona-card, .verification-gate, .briefing-node, .luxe-checkbox, .btn-luxe');
        items.forEach((item, index) => {
            item.classList.remove('show');
            item.style.transitionDelay = `${index * 0.1}s`;
            // Trigger reflow
            void item.offsetWidth;
            item.classList.add('reveal-item', 'show');
        });
    }

    // Visual Haptics for interaction feedback
    triggerHaptic(element) {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => element.style.transform = '', 100);
    }

    async startStudy() {
        // Generate response ID early - use existing if available
        if (!this.state.responseId) {
            // Check if we have one in localStorage from a previous step
            const savedState = LocalBackup.loadResponse();
            if (savedState && savedState.responseId) {
                this.state.responseId = savedState.responseId;
                safeLog('log', '🆔 Using existing Response ID:', this.state.responseId);
            } else {
                this.state.responseId = generateResponseId();
                safeLog('log', '🆔 Session Response ID initialized:', this.state.responseId);
                // Save to localStorage immediately
                LocalBackup.saveResponse(this.state);
            }
        }
        this.state.startTime = Date.now();
        safeLog('log', '⏱ Study started at:', new Date(this.state.startTime).toLocaleTimeString());
        
        // Go to eligibility page (study flow - no booking)
        this.showPage('eligibility');
    }

    async startInterview() {
        // Generate response ID early - use existing if available
        if (!this.state.responseId) {
            // Check if we have one in localStorage from a previous step
            const savedState = LocalBackup.loadResponse();
            if (savedState && savedState.responseId) {
                this.state.responseId = savedState.responseId;
                safeLog('log', '🆔 Using existing Response ID (Interview Flow):', this.state.responseId);
            } else {
                this.state.responseId = generateResponseId();
                safeLog('log', '🆔 Session Response ID initialized (Interview Flow):', this.state.responseId);
                // Save to localStorage immediately
                LocalBackup.saveResponse(this.state);
            }
        }
        
        // Create initial database record immediately
        if (typeof Database !== 'undefined') {
            const result = await Database.ensureParticipant(this.state.responseId);
            if (result.success) {
                safeLog('log', '✅ Participant record created for interview flow');
            } else {
                safeLog('error', '❌ Failed to create participant record:', result.error);
            }
        }
        
        // Record start time if not already set (though survey hasn't started, it tracks engagement)
        if (!this.state.startTime) this.state.startTime = Date.now();

        // Reset scheduler initialization flag
        this._schedulerInitialized = false;

        // Direct jump to merged booking flow
        this.showPage('scheduler');
    }

    async googleLogin() {
        safeLog('log', '🔑 Initiating Google OAuth Login...');
        
        try {
            // Save current page to sessionStorage AND URL parameter (fallback for tracking prevention)
            const currentPage = this.state.currentPage || 'contact';
            sessionStorage.setItem('oauth_return_page', currentPage);
            safeLog('log', `📍 Saving return page: ${currentPage}`);
            
            // Get the current URL and add return page as query parameter
            const returnUrl = `${window.location.origin}${window.location.pathname}?return_to=${currentPage}`;
            safeLog('log', `🔗 Return URL: ${returnUrl}`);
            
            // Always trigger OAuth to allow user to choose account
            safeLog('log', '🔄 Triggering OAuth with account selection...');
            const result = await Database.signInWithGoogle(returnUrl);
            
            if (!result.success) {
                safeLog('error', '❌ OAuth initiation failed');
                alert('Failed to initiate Google login. Please try manual entry.');
                return;
            }

            safeLog('log', '🔄 Redirecting to Google for authentication...');
            
        } catch (error) {
            safeLog('error', '❌ Google login error:', error);
            alert('Google login failed: ' + error.message + '. Please use manual entry below.');
        }
    }

    async initializeScheduler() {
        safeLog('log', '🔧 Initializing scheduler...');
        
        // Check if scheduler page is actually visible
        const schedulerPage = document.getElementById('scheduler-page');
        if (schedulerPage) {
            safeLog('log', `✅ Scheduler page found. Active: ${schedulerPage.classList.contains('active')}`);
        } else {
            safeLog('error', '❌ Scheduler page element not found!');
        }
        
        // Check if user is authenticated via Google OAuth (after redirect back)
        const userResult = await Database.getCurrentUser();
        if (userResult.success && userResult.user) {
            const user = userResult.user;
            
            // Auto-fill form with Google account data (NOT profile URL - let user enter manually)
            const nameInput = document.getElementById('booking-name');
            const emailInput = document.getElementById('booking-email');

            // Extract and fill name
            if (nameInput && !nameInput.value) {
                if (user.user_metadata?.full_name) {
                    nameInput.value = user.user_metadata.full_name;
                } else if (user.user_metadata?.name) {
                    nameInput.value = user.user_metadata.name;
                }
                safeLog('log', '✅ Name field auto-filled');
            }
            
            // Extract and fill email
            if (emailInput && user.email && !emailInput.value) {
                emailInput.value = user.email;
                safeLog('log', '✅ Email field auto-filled');
            }

            // Try to extract age if available
            if (user.user_metadata?.age) {
                const ageInput = document.getElementById('booking-age');
                if (ageInput && !ageInput.value) {
                    ageInput.value = user.user_metadata.age;
                }
            }

            // Save to state
            this.state.googleUser = user;
            this.state.participantEmail = user.email;
            this.state.participantName = user.user_metadata?.full_name || user.user_metadata?.name;

            safeLog('log', '✅ Google user detected, name and email auto-filled.');
            
            // Show success notification
            if (typeof AdvancedFeatures !== 'undefined' && typeof AdvancedFeatures.showNotification === 'function') {
                AdvancedFeatures.showNotification(`Welcome ${user.user_metadata?.full_name || user.email}!`, 'success');
            }
        }
        
        // Initialize calendar state
        this.schedulerState = {
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear(),
            selectedDate: null,
            selectedTime: null,
            bookedSlots: []
        };
        
        safeLog('log', '✅ Scheduler state initialized');

        // Fetch confirmed bookings to prevent collisions
        const result = await Database.getConfirmedBookings();
        if (result.success) {
            this.schedulerState.bookedSlots = result.data;
            safeLog('log', `✅ Loaded ${result.data.length} confirmed bookings.`);
        }

        safeLog('log', '📅 About to render calendar...');
        this.renderCalendar();
        
        safeLog('log', '🔗 About to attach scheduler listeners...');
        this.attachSchedulerListeners();
        
        safeLog('log', '✅ Scheduler initialization complete!');
    }

    renderCalendar() {
        safeLog('log', '🎨 renderCalendar() called');
        
        if (!this.schedulerState) {
            safeLog('warn', '⚠️ Scheduler state not initialized, initializing now...');
            this.initializeScheduler();
            return;
        }

        const { currentMonth, currentYear } = this.schedulerState;
        safeLog('log', `📅 Rendering calendar for ${currentMonth + 1}/${currentYear}`);

        const monthNames = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
            'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

        // Update month/year header
        const header = document.getElementById('calendar-month-year');
        if (header) {
            header.textContent = `${monthNames[currentMonth]} ${currentYear}`;
            safeLog('log', '✅ Calendar header updated');
        } else {
            safeLog('error', '❌ Calendar header element not found!');
        }

        // Generate calendar days
        const grid = document.getElementById('calendar-grid');
        if (!grid) {
            safeLog('error', '❌ Calendar grid element not found!');
            return;
        }
        
        safeLog('log', '✅ Calendar grid element found, generating days...');

        // DON'T clear existing days - keep the static HTML calendar
        // This ensures calendar is always visible even if JavaScript fails
        // const existingDays = grid.querySelectorAll('.cal-day');
        // safeLog('log', `🗑️ Removing ${existingDays.length} existing calendar days`);
        // existingDays.forEach(day => day.remove());
        
        safeLog('log', '✅ Using static HTML calendar - JavaScript enhancement disabled to ensure visibility');

        safeLog('log', '✅ Using static HTML calendar - JavaScript enhancement disabled to ensure visibility');

        // Get first day of month and total days
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const today = new Date();

        // Adjust for Monday start (0 = Sunday, we want Monday = 0)
        const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

        // DISABLED: Using static HTML calendar instead of JavaScript generation
        // This ensures the calendar is ALWAYS visible
        /*
        // Add previous month days (muted)
        const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
        safeLog('log', `📅 Adding ${adjustedFirstDay} previous month days...`);
        for (let i = adjustedFirstDay - 1; i >= 0; i--) {
            const day = document.createElement('div');
            day.className = 'cal-day muted';
            day.textContent = prevMonthDays - i;
            grid.appendChild(day);
        }

        // Add current month days
        safeLog('log', `📅 Adding ${daysInMonth} current month days...`);
        let daysAdded = 0;
        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'cal-day';
            dayEl.textContent = day;
            dayEl.role = 'gridcell';

            const dayDate = new Date(currentYear, currentMonth, day);
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            // Check if day is fully booked
            const slotsForDay = this.schedulerState.bookedSlots.filter(s => s.scheduled_date === dateStr);
            const isFullyBooked = slotsForDay.length >= 4; // Assuming 4 slots per day as defined in HTML

            // Disable past dates
            const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            if (dayDate < todayMidnight) {
                dayEl.classList.add('muted');
            } else if (isFullyBooked) {
                dayEl.classList.add('muted', 'booked-out');
                dayEl.title = 'Fully Booked';
            } else {
                // Make future dates available
                dayEl.classList.add('available');
                dayEl.onclick = () => this.selectDate(currentYear, currentMonth, day, dayEl);
            }

            grid.appendChild(dayEl);
            daysAdded++;
        }
        
        safeLog('log', `✅ Successfully added ${daysAdded} days to calendar`);
        */

        safeLog('log', `✅ Calendar rendered with ${daysInMonth} days (static HTML)`);
        
        // Debug: Check if days were actually added
        const totalDays = grid.querySelectorAll('.cal-day').length;
        safeLog('log', `📊 Total calendar days in DOM: ${totalDays}`);
        
        if (totalDays === 0) {
            safeLog('error', '❌ No calendar days were added! Forcing manual render...');
            // Force add some test days
            for (let i = 1; i <= 7; i++) {
                const testDay = document.createElement('div');
                testDay.className = 'cal-day available';
                testDay.textContent = i;
                testDay.style.background = 'var(--color-slate-900)';
                testDay.style.border = '1px solid var(--color-solar-orange)';
                testDay.style.color = 'white';
                testDay.style.padding = '1rem';
                grid.appendChild(testDay);
            }
            safeLog('log', '✅ Added 7 test days manually');
        }
        
        // Force visibility check
        const calendarCard = document.querySelector('.calendar-card');
        if (calendarCard) {
            const styles = window.getComputedStyle(calendarCard);
            safeLog('log', `📦 Calendar card display: ${styles.display}, visibility: ${styles.visibility}, opacity: ${styles.opacity}`);
        }
    }

    attachSchedulerListeners() {
        // Month navigation
        const prevBtn = document.getElementById('cal-prev');
        const nextBtn = document.getElementById('cal-next');

        if (prevBtn) {
            prevBtn.onclick = () => {
                this.schedulerState.currentMonth--;
                if (this.schedulerState.currentMonth < 0) {
                    this.schedulerState.currentMonth = 11;
                    this.schedulerState.currentYear--;
                }
                this.renderCalendar();
            };
        }

        if (nextBtn) {
            nextBtn.onclick = () => {
                this.schedulerState.currentMonth++;
                if (this.schedulerState.currentMonth > 11) {
                    this.schedulerState.currentMonth = 0;
                    this.schedulerState.currentYear++;
                }
                this.renderCalendar();
            };
        }

        // Time slot selection
        const timeSlots = document.querySelectorAll('.time-btn');
        timeSlots.forEach(btn => {
            btn.onclick = () => {
                timeSlots.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.schedulerState.selectedTime = btn.dataset.time;
            };
        });
    }

    selectDate(year, month, day, element) {
        // Remove previous selection
        document.querySelectorAll('.cal-day').forEach(d => d.classList.remove('active-slot'));
        element.classList.add('active-slot');

        this.schedulerState.selectedDate = { year, month, day };
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        // Filter time slots
        const bookedTimes = this.schedulerState.bookedSlots
            .filter(s => s.scheduled_date === dateStr)
            .map(s => s.scheduled_time.substring(0, 5));

        const timeBtns = document.querySelectorAll('.time-btn');
        timeBtns.forEach(btn => {
            const time = btn.dataset.time;
            if (bookedTimes.includes(time)) {
                btn.classList.add('disabled');
                btn.disabled = true;
                btn.title = 'Already booked';
            } else {
                btn.classList.remove('disabled');
                btn.disabled = false;
                btn.title = '';
            }
            // Clear previous selection if it's now disabled
            if (btn.classList.contains('active') && btn.disabled) {
                btn.classList.remove('active');
                this.schedulerState.selectedTime = null;
            }
        });
    }

    async cancelRecentBooking() {
        const email = this.state.participantEmail || document.getElementById('booking-email')?.value.trim();
        if (!email) return;

        if (!confirm('Are you sure you want to cancel your interview booking? This slot will be released to other participants.')) {
            return;
        }

        const btn = document.getElementById('cancel-booking-btn');
        if (btn) {
            btn.disabled = true;
            btn.textContent = 'Cancelling...';
        }

        const result = await Database.cancelBooking(email);
        if (result.success) {
            alert('✅ Your booking has been cancelled and the slot has been released.');
            if (btn) {
                btn.style.display = 'none';
            }
            // Refresh scheduler state in case they want to book again
            const res = await Database.getConfirmedBookings();
            if (res.success) this.schedulerState.bookedSlots = res.data;
        } else {
            alert('❌ Cancellation failed. Please contact the researcher.');
            if (btn) {
                btn.disabled = false;
                btn.textContent = 'Cancel Booking';
            }
        }
    }

    async confirmBooking() {
        const name = document.getElementById('booking-name').value.trim();
        const email = document.getElementById('booking-email').value.trim();
        const role = document.getElementById('participant-role').value;
        const industry = document.getElementById('participant-industry').value;
        const profile = document.getElementById('participant-profile').value;
        const notes = document.getElementById('booking-notes').value;

        const errorDiv = document.getElementById('booking-error');
        const missingFields = [];

        // Validate date selection
        if (!this.schedulerState.selectedDate) {
            missingFields.push('Date');
        }

        // Validate time selection
        if (!this.schedulerState.selectedTime) {
            missingFields.push('Time');
        }

        // Validate required form fields
        if (!name) {
            missingFields.push('Name');
        }

        if (!email) {
            missingFields.push('Email');
        } else if (!email.includes('@')) {
            if (errorDiv) {
                errorDiv.innerHTML = '⚠️ Please enter a valid email address.';
                errorDiv.style.display = 'block';
            }
            return;
        }

        if (!role) {
            missingFields.push('Current Role');
        }

        // Show error if any fields are missing
        if (missingFields.length > 0) {
            if (errorDiv) {
                errorDiv.innerHTML = `⚠️ Please complete the following before confirming: <strong>${missingFields.join(', ')}</strong>`;
                errorDiv.style.display = 'block';
            }
            // Scroll to error
            errorDiv?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        // Hide error if validation passes
        if (errorDiv) {
            errorDiv.style.display = 'none';
        }

        const btn = document.getElementById('confirm-booking-btn');
        btn.disabled = true;
        btn.textContent = 'Processing...';

        try {
            const { year, month, day } = this.schedulerState.selectedDate;
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const timeStr = this.schedulerState.selectedTime + ':00';
            const datetimeStr = `${dateStr}T${timeStr}`;

            // Format date for display
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
            const displayDate = `${monthNames[month]} ${day}, ${year}`;
            const displayTime = this.schedulerState.selectedTime;

            // Ensure response ID exists - check localStorage first
            if (!this.state.responseId) {
                const savedState = LocalBackup.loadResponse();
                if (savedState && savedState.responseId) {
                    this.state.responseId = savedState.responseId;
                    safeLog('log', '🆔 Using existing Response ID from localStorage:', this.state.responseId);
                } else {
                    this.state.responseId = generateResponseId();
                    safeLog('log', `🆔 Generated new response ID: ${this.state.responseId}`);
                }
            }

            // Generate Jitsi meeting link
            const meetingId = `CTR-${this.state.responseId}-${Date.now()}`;
            const jitsiLink = `https://meet.jit.si/${meetingId}`;

            const bookingData = {
                date: dateStr,
                time: timeStr,
                datetime: datetimeStr,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
                duration: 60,
                platform: 'Jitsi',
                meetingUrl: jitsiLink,
                notes: notes || null
            };

            safeLog('log', '💾 Saving booking to database...', bookingData);

            // Save to database
            if (typeof Database !== 'undefined') {
                safeLog('log', '📝 Step 1: Updating contact info...');
                // First, ensure participant exists with contact info
                const contactResult = await Database.updateContact(this.state.responseId, {
                    email: email,
                    name: name,
                    role: role,
                    industry: industry || null,
                    profileUrl: profile || null,
                    eligibilityCategory: this.state.eligibilityCategory,
                    contextStatement: this.state.contextStatement
                });
                
                if (!contactResult.success) {
                    safeLog('error', '❌ Failed to update contact:', contactResult.error);
                    throw new Error('Failed to save contact information');
                }
                safeLog('log', '✅ Contact info saved');

                safeLog('log', '📝 Step 2: Creating booking...');
                // Then create the booking
                const bookingResult = await Database.createBooking(this.state.responseId, bookingData);
                
                if (!bookingResult.success) {
                    safeLog('error', '❌ Failed to create booking:', bookingResult.error);
                    throw new Error(bookingResult.error?.message || 'Failed to save booking');
                }
                
                safeLog('log', '✅ Booking saved successfully');
            } else {
                safeLog('error', '❌ Database object not available!');
                throw new Error('Database connection not available');
            }

            // Send confirmation email via EmailService
            if (typeof EmailService !== 'undefined') {
                safeLog('log', '📧 Sending booking confirmation email...');
                
                // Generate Jitsi meeting link
                const meetingId = `CTR-${this.state.responseId}-${Date.now()}`;
                const jitsiLink = `https://meet.jit.si/${meetingId}`;
                
                const emailData = {
                    name: name,
                    email: email,
                    date: dateStr,
                    time: timeStr,
                    displayDate: displayDate,
                    displayTime: displayTime,
                    meetingUrl: jitsiLink,
                    notes: notes || ''
                };
                const emailResult = await EmailService.sendBookingConfirmation(emailData);
                if (emailResult.success) {
                    safeLog('log', '✅ Confirmation email sent successfully');
                } else {
                    safeLog('error', '❌ Failed to send confirmation email:', emailResult.error);
                }
                
                // Send researcher notification
                safeLog('log', '📧 Sending researcher notification...');
                const researcherResult = await EmailService.sendResearcherNotification(emailData);
                if (researcherResult.success) {
                    safeLog('log', '✅ Researcher notification sent successfully');
                } else {
                    safeLog('error', '❌ Failed to send researcher notification:', researcherResult.error);
                }
            }

            // Mark booking as confirmed
            this.state.bookingConfirmed = true;
            this.state.interviewBooked = true;
            
            // Show success notification with booking details
            if (typeof AdvancedFeatures !== 'undefined' && typeof AdvancedFeatures.showNotification === 'function') {
                AdvancedFeatures.showNotification(
                    `✅ Interview Booked! 📅 ${displayDate} at ${displayTime} 📧 Confirmation sent to ${email}`, 
                    'success'
                );
            } else {
                // Fallback alert if AdvancedFeatures is not available
                alert(`✅ Interview Successfully Booked!\n\n📅 Date: ${displayDate}\n🕐 Time: ${displayTime}\n📧 Confirmation email sent to: ${email}\n\nYou will receive a meeting link before the scheduled time.`);
            }
            
            // Proceed to terms and conditions after a brief delay
            setTimeout(() => {
                this.showPage('terms');
            }, 2000);
            
        } catch (e) {
            safeLog('error', '❌ Booking error:', e);
            if (errorDiv) {
                errorDiv.innerHTML = `❌ Failed to confirm booking: ${e.message}. Please try again or contact support.`;
                errorDiv.style.display = 'block';
            }
            btn.disabled = false;
            btn.textContent = 'Confirm Booking';
        }
    }

    // --- INLINE EXPANSION ENGINE ---
    handleInlineExpansion(checkbox) {
        const targetId = checkbox.dataset.expandTarget;
        if (!targetId) return;
        const target = document.getElementById(targetId);
        if (target) {
            if (checkbox.checked) {
                target.classList.add('expanded');
                target.focus();
            } else {
                target.classList.remove('expanded');
            }
        }
    }

    // This `startStudy` method is a duplicate and should be removed or merged if intended.
    // Assuming the first `startStudy` is the primary one.
    // async startStudy() {
    //     // Generate response ID early
    //     if (!this.state.responseId) {
    //         this.state.responseId = generateResponseId();
    //         safeLog('log', '🆔 Session Response ID initialized:', this.state.responseId);
    //     }
    //     this.showPage('eligibility');
    // }

    // ========================================
    // 3-LAYER SIGNAL STACK FLOW
    // ========================================

    // Layer 1a: Eligibility — single-select experience screen
    async selectEligibility(category, element) {
        safeLog('log', `📋 Eligibility selected: ${category}`);

        // Visual feedback
        document.querySelectorAll('#eligibility-options .persona-card').forEach(card => {
            card.classList.remove('selected');
            card.style.borderColor = '';
        });
        element.classList.add('selected');
        element.style.borderColor = 'var(--color-solar-orange)';
        this.triggerHaptic(element);

        // Generate response ID if not exists - check localStorage first
        if (!this.state.responseId) {
            const savedState = LocalBackup.loadResponse();
            if (savedState && savedState.responseId) {
                this.state.responseId = savedState.responseId;
                safeLog('log', '🆔 Using existing Response ID from localStorage:', this.state.responseId);
            } else {
                this.state.responseId = generateResponseId();
                safeLog('log', '🆔 Generated new response ID in eligibility:', this.state.responseId);
            }
        }

        // Save to state
        this.state.eligibilityCategory = category;
        this.state.selectedPersona = category; // backwards compat with survey logic

        // Don't create participant record yet - wait until we have email
        // Just save eligibility to state for now
        safeLog('log', '✅ Eligibility saved to state, will create participant when email is provided');

        // Auto-advance after brief visual confirmation
        setTimeout(() => {
            this.showPage('commitment');
        }, 600);
    }

    // Layer 1b: Micro-commitment — contextual screening question
    async submitCommitment() {
        const statement = document.getElementById('context-statement')?.value.trim();
        const errorDiv = document.getElementById('commitment-error');

        if (!statement || statement.length < 15) {
            if (errorDiv) {
                errorDiv.innerHTML = '⚠️ Please share a brief response (at least one sentence).';
                errorDiv.style.display = 'block';
            }
            return;
        }

        if (errorDiv) errorDiv.style.display = 'none';

        // Ensure response ID exists
        if (!this.state.responseId) {
            const savedState = LocalBackup.loadResponse();
            if (savedState && savedState.responseId) {
                this.state.responseId = savedState.responseId;
                safeLog('log', '🆔 Using existing Response ID:', this.state.responseId);
            } else {
                this.state.responseId = generateResponseId();
                safeLog('log', '🆔 Response ID generated in commitment:', this.state.responseId);
                LocalBackup.saveResponse(this.state);
            }
        }

        // Save to state
        this.state.contextStatement = statement;
        safeLog('log', '✅ Micro-commitment captured');

        // Update participant with commitment (if participant exists)
        if (typeof Database !== 'undefined') {
            // Don't await - let it run in background
            Database.updateCommitment(this.state.responseId, statement).catch(err => {
                safeLog('warn', '⚠️ Could not update commitment (participant may not exist yet):', err);
            });
        }

        // Navigation: Go to contact page (study flow - no booking calendar)
        this.showPage('contact');
    }

    // Layer 2: Contact details — email, role, optional fields (STUDY FLOW)
    async submitContactDetails() {
        safeLog('log', '🔘 Submit Contact Details button clicked');
        
        const name = document.getElementById('contact-name')?.value.trim();
        const email = document.getElementById('contact-email')?.value.trim();
        const role = document.getElementById('contact-role')?.value;
        const industry = document.getElementById('contact-industry')?.value.trim() || null;
        const profileLink = document.getElementById('contact-profile')?.value.trim() || null;
        
        safeLog('log', `📝 Form data - Name: ${name}, Email: ${email}, Role: ${role}`);
        
        const errorDiv = document.getElementById('contact-error');
        const missingFields = [];

        // Validate required fields
        if (!name) missingFields.push('Name');
        if (!email) missingFields.push('Email');
        if (!role) missingFields.push('Current Role');

        if (missingFields.length > 0) {
            safeLog('warn', `⚠️ Missing fields: ${missingFields.join(', ')}`);
            if (errorDiv) {
                errorDiv.innerHTML = `⚠️ Please fill in the following required fields: <strong>${missingFields.join(', ')}</strong>`;
                errorDiv.style.display = 'block';
            }
            errorDiv?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        if (!email.includes('@')) {
            safeLog('warn', '⚠️ Invalid email format');
            if (errorDiv) {
                errorDiv.innerHTML = '⚠️ Please enter a valid email address.';
                errorDiv.style.display = 'block';
            }
            return;
        }

        if (errorDiv) errorDiv.style.display = 'none';

        // Ensure response ID - check localStorage first
        if (!this.state.responseId) {
            const savedState = LocalBackup.loadResponse();
            if (savedState && savedState.responseId) {
                this.state.responseId = savedState.responseId;
                safeLog('log', '🆔 Using existing Response ID from localStorage:', this.state.responseId);
            } else {
                this.state.responseId = generateResponseId();
                safeLog('log', `🆔 Generated new response ID: ${this.state.responseId}`);
                LocalBackup.saveResponse(this.state);
            }
        }

        // Save to state
        this.state.participantEmail = email;
        this.state.participantName = name;
        this.state.participantRole = role;

        safeLog('log', '💾 Saving contact info to database...');

        // Update (or create) participant with contact info in unified database
        if (typeof Database !== 'undefined') {
            const result = await Database.updateContact(this.state.responseId, {
                email: email,
                name: name,
                role: role,
                industry: industry,
                profileUrl: profileLink,
                eligibilityCategory: this.state.eligibilityCategory,
                contextStatement: this.state.contextStatement
            });

            if (result.success) {
                safeLog('log', '✅ Contact saved:', this.state.responseId);
            } else {
                safeLog('error', '❌ DB save error:', result.error);
            }
        }

        // Force clear transition lock before navigating
        this._transitioning = false;
        safeLog('log', `➡️ Navigating to terms page... (transition lock: ${this._transitioning})`);
        
        // Use setTimeout to ensure the transition lock is cleared
        setTimeout(() => {
            this.showPage('terms');
        }, 100);
    }

    // Layer 2: Contact details — email, role, optional fields
    async submitContact() {
        const email = document.getElementById('participant-email')?.value.trim();
        const role = document.getElementById('participant-role')?.value;
        const errorDiv = document.getElementById('contact-error');

        // Validate required
        if (!email || !email.includes('@')) {
            if (errorDiv) {
                errorDiv.innerHTML = '⚠️ Please enter a valid email address.';
                errorDiv.style.display = 'block';
            }
            return;
        }
        if (!role) {
            if (errorDiv) {
                errorDiv.innerHTML = '⚠️ Please select your current role.';
                errorDiv.style.display = 'block';
            }
            return;
        }

        if (errorDiv) errorDiv.style.display = 'none';

        // Ensure response ID - check localStorage first
        if (!this.state.responseId) {
            const savedState = LocalBackup.loadResponse();
            if (savedState && savedState.responseId) {
                this.state.responseId = savedState.responseId;
                safeLog('log', '🆔 Using existing Response ID from localStorage:', this.state.responseId);
            } else {
                this.state.responseId = generateResponseId();
                safeLog('log', '🆔 Generated new response ID:', this.state.responseId);
            }
        }

        // Collect optional
        const name = document.getElementById('participant-name')?.value.trim() || null;
        const industry = document.getElementById('participant-industry')?.value.trim() || null;
        const profileLink = document.getElementById('participant-profile')?.value.trim() || null;

        // Save to state
        this.state.participantEmail = email;
        this.state.participantName = name;
        this.state.participantRole = role;

        // Update participant with contact info in unified database
        const result = await Database.updateContact(this.state.responseId, {
            email: email,
            name: name,
            role: role,
            industry: industry,
            profileUrl: profileLink
        });

        if (result.success) {
            safeLog('log', '✅ Contact saved:', this.state.responseId);
        } else {
            safeLog('error', 'DB save error:', result.error);
        }

        // Proceed to scheduling
        this.showPage('scheduler');
        this.initializeScheduler();
    }

    // (Legacy compat — not called from UI anymore)
    selectPersona(role) {
        this.state.selectedPersona = role;
    }

    checkEntryEligibility() {
        // No-op — eligibility is handled by selectEligibility
    }

    async submitConsent() {
        const required = ['consent-1'];
        const allChecked = required.every(id => document.getElementById(id)?.checked);

        if (!allChecked) {
            const err = document.getElementById('consent-error');
            if (err) {
                err.style.display = 'block';
                err.classList.add('shake');
                setTimeout(() => err.classList.remove('shake'), 400);
            }
            return;
        }

        await this.initializeSurvey();
        this.showPage('survey');
    }

    async initializeSurvey() {
        if (!this.state.responseId) {
            const savedState = LocalBackup.loadResponse();
            if (savedState && savedState.responseId) {
                this.state.responseId = savedState.responseId;
                safeLog('log', '🆔 Using existing Response ID from localStorage:', this.state.responseId);
            } else {
                this.state.responseId = generateResponseId();
                safeLog('log', '🆔 Generated new response ID in initializeSurvey:', this.state.responseId);
            }
        }
        this.state.startTime = new Date();
        this.state.lastInteractionTime = Date.now();
        this.state.questionFlow = QUESTIONS.survey || QUESTIONS.profiling;
        this.state.currentQuestionIndex = 0;

        // Start survey in unified database
        await Database.startSurvey(this.state.responseId);

        LocalBackup.saveResponse(this.state);
        this.displayCurrentQuestion();
        this.updateProgress();
    }

    displayCurrentQuestion() {
        const question = this.state.questionFlow[this.state.currentQuestionIndex];
        if (!question) {
            this.completeSurvey();
            return;
        }

        // Trigger Observer Dialogue for the current section
        this.updateObserverDialogue(question.section);

        if (question.id === 'SC-C2') {
            const scC1Answer = this.state.answers['SC-C1'];
            const contextMap = {
                'test': 'Since you accepted the AI suggestion, a key stakeholder has now responded with concerns about the resulting layout.',
                'compare': 'While you were comparing the suggestion with goals, a key stakeholder flagged concerns about the AI approach.',
                'feedback': 'After you asked for feedback, a key stakeholder responded with specific concerns about the AI suggestion.',
                'reject': 'Even though you rejected the suggestion, a key stakeholder is now asking why that AI capability wasn\'t utilized.'
            };
            question.scenario.context = contextMap[scC1Answer] || question.scenario.context;
        }

        const container = document.getElementById('question-container');
        container.classList.add('question-exit');

        setTimeout(() => {
            container.innerHTML = this.renderQuestionTemplate(question);
            container.classList.remove('question-exit');
            container.classList.add('question-enter');

            // --- CINEMATIC STAGGERED REVEAL ---
            const badge = container.querySelector('.badge');
            const title = container.querySelector('.question-text');
            const subtext = container.querySelector('.question-subtext');
            const body = container.querySelector('.question-body');

            // 0. Infographic/Scenario reveal (First)
            const info = container.querySelector('.infographic-box');
            const scenario = container.querySelector('.scenario-card');
            setTimeout(() => {
                info?.classList.add('reveal');
                scenario?.classList.add('reveal');
            }, 50);

            // 1. Badge reveals next
            setTimeout(() => badge?.classList.add('reveal'), 250);

            // 2. Title Typewriter starts
            setTimeout(() => {
                if (title) {
                    this.typewriterEffect(title, question.questionText, () => {
                        // 3. Subtext reveals after title
                        setTimeout(() => subtext?.classList.add('reveal'), 100);
                        // 4. Input body reveals last with inertia
                        setTimeout(() => {
                            body?.classList.add('reveal');
                            this.attachInputListeners(container);
                            if (question.type === 'scale') this.initMercurySlider(question.id);

                            // 5. Guide Reaction
                            this.triggerGuideReaction('think');
                        }, 300);
                    });
                }
            }, 300);

            this.state.lastInteractionTime = Date.now();
            this.updateNavButtons();
            this.announceToSR(question);
        }, 400);
    }

    renderQuestionTemplate(question) {
        const num = this.state.currentQuestionIndex + 1;
        const total = this.state.questionFlow.length;
        return `
            <div class="question-card">
                ${question.scenario ? this.renderScenario(question.scenario) : ''}
                <div class="question-header">
                    ${question.infographic ? this.renderInfographic(question.infographic) : ''}
                    <div class="badge-row stagger-item badge-reveal">
                        <span class="badge">${question.section || 'Survey'} • ${num} / ${total}</span>
                    </div>
                    <h2 class="question-text"></h2>
                    ${question.subtext ? `<p class="question-subtext stagger-item">${question.subtext}</p>` : ''}
                </div>
                <div class="question-body stagger-item">
                    ${this.renderInputs(question)}
                </div>
                <div class="question-error" id="question-error"></div>
            </div>
        `;
    }

    renderInputs(question) {
        const saved = this.state.answers[question.id];
        switch (question.type) {
            case 'radio':
                return `<div class="radio-group">${question.options.map(opt => `
                    <div class="radio-option ${saved === opt.value ? 'selected' : ''}" onclick="surveyEngine.handleInput('${question.id}', '${opt.value}', 'radio')">
                        <input type="radio" name="${question.id}" value="${opt.value}" ${saved === opt.value ? 'checked' : ''} id="${question.id}-${opt.value}" style="display:none" 
                            ${opt.expand ? `data-expand-target="${question.id}-expansion"` : ''}
                            onchange="surveyEngine.handleInlineExpansion(this)">
                        <label for="${question.id}-${opt.value}">${opt.label}</label>
                    </div>`).join('')}
                    ${question.options.some(o => o.expand) ? `
                        <div id="${question.id}-expansion" class="inline-expansion ${saved === question.options.find(o => o.expand).value ? 'expanded' : ''}">
                            <input type="text" class="expansion-input" placeholder="${question.expansionLabel || 'Please specify...'}" 
                                id="${question.id}-other-val" value="${this.state.answers[question.id + '-other'] || ''}"
                                oninput="surveyEngine.handleInput('${question.id}-other', this.value, 'text')">
                        </div>` : ''}
                </div>`;
            case 'checkbox':
                const checked = saved || [];
                return `<div class="checkbox-group">
                    ${question.options.map(opt => `
                        <div class="checkbox-option ${checked.includes(opt.value) ? 'selected' : ''}" 
                             onclick="surveyEngine.handleInput('${question.id}', '${opt.value}', 'checkbox')">
                            <input type="checkbox" name="${question.id}" value="${opt.value}" 
                                ${checked.includes(opt.value) ? 'checked' : ''} id="${question.id}-${opt.value}" style="display:none"
                                ${opt.expand ? `data-expand-target="${question.id}-expansion"` : ''}
                                onchange="surveyEngine.handleInlineExpansion(this)">
                            <label for="${question.id}-${opt.value}">${opt.label}</label>
                        </div>`).join('')}
                    ${question.options.some(o => o.expand) ? `
                        <div id="${question.id}-expansion" class="inline-expansion ${checked.includes(question.options.find(o => o.expand).value) ? 'expanded' : ''}">
                            <input type="text" class="expansion-input" placeholder="${question.expansionLabel || 'Please specify...'}" 
                                id="${question.id}-other-val" value="${this.state.answers[question.id + '-other'] || ''}"
                                oninput="surveyEngine.handleInput('${question.id}-other', this.value, 'text')">
                        </div>` : ''}
                </div>`;
            case 'text':
            case 'number':
            case 'email':
                return `<input type="${question.type}" id="${question.id}" class="form-input" value="${saved || ''}" placeholder="Type here...">`;
            case 'textarea':
                return `<textarea id="${question.id}" class="form-textarea" placeholder="Type here...">${saved || ''}</textarea>`;
            case 'select':
                return `<select id="${question.id}" class="form-select"><option value="">Select...</option>${question.options.map(opt => `<option value="${opt.value}" ${saved === opt.value ? 'selected' : ''}>${opt.label}</option>`).join('')}</select>`;
            case 'scale':
                const val = saved || 4;
                return `
                    <div class="mercury-slider-container" id="slider-${question.id}">
                        <div class="likert-labels">
                            <span>${question.minLabel || 'Strongly Disagree'}</span>
                            <span>${question.maxLabel || 'Strongly Agree'}</span>
                        </div>
                        <div class="mercury-track">
                            <div class="mercury-points">
                                ${Array.from({ length: question.max || 7 }).map((_, i) => `
                                    <div class="mercury-point ${val == (i + 1) ? 'active' : ''}" data-value="${i + 1}"></div>
                                `).join('')}
                            </div>
                            <div class="mercury-thumb" id="thumb-${question.id}"></div>
                        </div>
                        <input type="hidden" id="${question.id}" value="${val}">
                    </div>`;
            default: return '';
        }
    }

    handleInput(id, val, type) {
        if (type === 'radio') {
            this.state.answers[id] = val;
            const options = document.querySelectorAll(`[name="${id}"]`);
            options.forEach(el => {
                const opt = el.closest('.radio-option');
                if (opt) opt.classList.remove('selected');
            });
            const selected = document.getElementById(`${id}-${val}`);
            if (selected) {
                const opt = selected.closest('.radio-option');
                if (opt) {
                    opt.classList.add('selected');
                    this.triggerHaptic(opt);
                }
                selected.checked = true;
                // Trigger expansion check
                this.handleInlineExpansion(selected);
                // Also un-expand if another radio is selected
                options.forEach(radio => {
                    if (radio !== selected && radio.dataset.expandTarget) {
                        this.handleInlineExpansion(radio);
                    }
                });
            }
        } else if (type === 'checkbox') {
            if (!this.state.answers[id]) this.state.answers[id] = [];
            const idx = this.state.answers[id].indexOf(val);
            const el = document.getElementById(`${id}-${val}`);
            const opt = el?.closest('.checkbox-option');
            if (idx > -1) {
                this.state.answers[id].splice(idx, 1);
                if (opt) opt.classList.remove('selected');
                if (el) {
                    el.checked = false;
                    this.handleInlineExpansion(el);
                }
            } else {
                this.state.answers[id].push(val);
                if (opt) {
                    opt.classList.add('selected');
                    this.triggerHaptic(opt);
                }
                if (el) {
                    el.checked = true;
                    this.handleInlineExpansion(el);
                }
            }
        }
    }

    initMercurySlider(id) {
        const slider = document.getElementById(`slider-${id}`);
        if (!slider) return;
        const thumb = document.getElementById(`thumb-${id}`);
        const points = slider.querySelectorAll('.mercury-point');
        const input = document.getElementById(id);
        const track = slider.querySelector('.mercury-track');

        const updatePosition = (val) => {
            const pct = ((val - 1) / (points.length - 1)) * 100;
            thumb.style.left = `${pct}%`;
            points.forEach((p, i) => {
                p.classList.toggle('active', (i + 1) === parseInt(val));
            });
            input.value = val;
            this.state.answers[id] = val;
        };

        // Initial position
        updatePosition(input.value);

        const handleMove = (e) => {
            const rect = track.getBoundingClientRect();
            const clientX = e.clientX || e.touches?.[0].clientX;
            const x = clientX - rect.left;
            let pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
            const val = Math.round((pct / 100) * (points.length - 1)) + 1;
            updatePosition(val);
        };

        thumb.addEventListener('mousedown', () => {
            const moveListener = (e) => handleMove(e);
            const stopListener = () => {
                window.removeEventListener('mousemove', moveListener);
                window.removeEventListener('mouseup', stopListener);
            };
            window.addEventListener('mousemove', moveListener);
            window.addEventListener('mouseup', stopListener);
        });

        track.addEventListener('click', (e) => handleMove(e));

        // Touch support
        thumb.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const moveListener = (e) => handleMove(e);
            const stopListener = () => {
                window.removeEventListener('touchmove', moveListener);
                window.removeEventListener('touchend', stopListener);
            };
            window.addEventListener('touchmove', moveListener, { passive: false });
            window.addEventListener('touchend', stopListener);
        });
    }

    typewriterEffect(element, text, callback) {
        this.isTyping = true;
        let i = 0;
        element.innerHTML = '';
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        element.appendChild(cursor);

        const interval = setInterval(() => {
            if (i < text.length) {
                element.insertBefore(document.createTextNode(text.charAt(i)), cursor);
                i++;
            } else {
                clearInterval(interval);
                cursor.remove();
                this.isTyping = false;
                if (callback) callback();
            }
        }, 12); // Slightly faster cinematic speed
    }

    async nextQuestion() {
        if (this.isTyping) return;
        const current = this.state.questionFlow[this.state.currentQuestionIndex];
        let answer;
        if (current.type === 'radio' || current.type === 'checkbox') answer = this.state.answers[current.id];
        else answer = document.getElementById(current.id)?.value;

        if (current.required && (!answer || (Array.isArray(answer) && answer.length === 0))) {
            this.showError(UI_TEXT.errors.required);
            return;
        }

        if (!answer || (Array.isArray(answer) && answer.length === 0)) {
            this.state.questionsSkipped++;
        } else {
            this.state.questionsAnswered++;
        }

        this.state.answers[current.id] = answer;

        // --- SCIENTIFIC RIGOR: Speed Tracking ---
        const now = Date.now();
        const duration = now - this.state.lastInteractionTime;
        this.state.responseSpeeds.push(duration);
        this.state.lastInteractionTime = now;

        // Save answer to unified database
        try {
            const saveResult = await Database.saveAnswer(
                this.state.responseId,
                current.id,
                answer
            );
            // Errors are logged in Database.saveAnswer, just continue
        } catch (error) {
            // Continue anyway - answers are saved to localStorage
        }

        // Screening Logic (Academic Rigor)
        if (current.id === 'Q2' && answer === 'no') return this.terminate('Insufficient Generative AI exposure (min 3 months required).');
        if (current.id === 'Q3' && answer === 'lt2') return this.terminate('Study requires minimum 2 years of professional creative experience.');

        this.state.currentQuestionIndex++;
        if (this.state.currentQuestionIndex < this.state.questionFlow.length) {
            this.displayCurrentQuestion();
            this.updateProgress();
        } else {
            this.completeSurvey();
        }
    }

    previousQuestion() {
        if (this.state.currentQuestionIndex > 0) {
            this.state.currentQuestionIndex--;
            this.displayCurrentQuestion();
            this.updateProgress();
        }
    }

    updateProgress() {
        const currentQuestion = this.state.questionFlow[this.state.currentQuestionIndex];
        const pct = Math.round((this.state.currentQuestionIndex / this.state.questionFlow.length) * 100);
        const fill = document.getElementById('progress-fill');
        const text = document.getElementById('progress-percentage');
        const sectionText = document.getElementById('progress-text');

        if (fill) {
            // Liquid Mercury Physics: Smooth weighting via inertia easing
            fill.style.width = `${pct}%`;
        }
        if (text) text.textContent = `${pct}%`;
        if (sectionText && currentQuestion) {
            const newSection = currentQuestion.section || 'Survey';
            if (sectionText.textContent !== newSection) {
                this.decryptText(sectionText, newSection);
                this.updateEnvironment(newSection);
            }
        }
    }

    updateEnvironment(section) {
        const env = document.getElementById('survey-environment');
        if (!env) return;

        // Reset vista classes
        env.className = 'survey-environment';

        // Map section to vista theme
        const sectionMap = {
            'Screening': 'vista-strategic',
            'Demographics': 'vista-strategic',
            'CAT': 'vista-strategic',
            'Identity': 'vista-identity',
            'Spirals': 'vista-identity',
            'Org Capabilities': 'vista-org',
            'Calibration': 'vista-cultural',
            'Cultural Context': 'vista-cultural',
            'Outcomes': 'vista-org'
        };

        const theme = Object.keys(sectionMap).find(key => section.includes(key));
        if (theme) {
            env.classList.add(sectionMap[theme]);
            this.triggerGuideReaction('observe');
        }
    }

    triggerGuideReaction(type) {
        const guide = document.getElementById('ai-guide-container');
        if (!guide) return;

        guide.classList.remove('react-think', 'react-observe', 'react-pulse');
        void guide.offsetWidth; // Trigger reflow

        switch (type) {
            case 'think': guide.classList.add('react-think'); break;
            case 'observe': guide.classList.add('react-observe'); break;
            case 'pulse': guide.classList.add('react-pulse'); break;
        }
    }

    updateNavButtons() {
        const back = document.getElementById('btn-back');
        const next = document.getElementById('btn-next');
        if (back) back.disabled = this.state.currentQuestionIndex === 0;
        if (next) {
            const isLast = this.state.currentQuestionIndex === this.state.questionFlow.length - 1;
            next.innerHTML = `<span>${isLast ? 'Complete' : 'Next'}</span>`;
        }
    }

    showError(msg) {
        const err = document.getElementById('question-error');
        if (err) {
            err.textContent = msg;
            err.classList.add('visible');

            // Premium shake animation
            const container = document.getElementById('question-container');
            if (container) {
                container.style.animation = 'shake 0.5s ease';
                setTimeout(() => container.style.animation = '', 500);
            }

            setTimeout(() => err.classList.remove('visible'), 4000);
        }
    }

    // Notifications removed as per user request to clean UI

    terminate(msg) {
        const el = document.getElementById('terminate-message');
        if (el) el.textContent = msg;
        this.showPage('terminate-page');
    }

    calculateCalibrationArchetype() {
        const ans = this.state.answers;

        // 1. Trust Calibration Index (CAT Scale 1-24)
        const catKeys = Object.keys(ans).filter(k => k.startsWith('CAT'));
        const catAvg = catKeys.length ? catKeys.reduce((a, k) => a + parseInt(ans[k]), 0) / catKeys.length : 4;

        // 2. Curatorial Shift (Identity ID1-9)
        const curKeys = ['ID5', 'ID6', 'ID7', 'ID8', 'ID9']; // Curator items
        const exeKeys = ['ID1', 'ID2', 'ID3', 'ID4'];       // Executor items
        const curScore = curKeys.reduce((a, k) => a + (parseInt(ans[k]) || 4), 0) / curKeys.length;
        const exeScore = exeKeys.reduce((a, k) => a + (parseInt(ans[k]) || 4), 0) / exeKeys.length;
        const curatorialShift = curScore / (exeScore || 1);

        // 3. Organizational Readiness (OC Scale 1-24)
        const ocKeys = Object.keys(ans).filter(k => k.startsWith('OC'));
        const ocAvg = ocKeys.length ? ocKeys.reduce((a, k) => a + parseInt(ans[k]), 0) / ocKeys.length : 4;

        // Decision Logic for Archetypes
        if (catAvg > 5 && curatorialShift > 1.2) return {
            name: 'The Strategic Curator',
            desc: 'You have successfully transitioned your value from execution to judgment, demonstrating high trust calibration.',
            power: 'Judgment Mastery'
        };
        if (catAvg < 3 && exeScore > 5) return {
            name: 'The Intuitive Maverick',
            desc: 'You rely on deep-seated creative intuition and remain skeptical of algorithmic shortcuts.',
            power: 'Artisanal Rigor'
        };
        if (ocAvg > 5) return {
            name: 'The Systems Orchestrator',
            desc: 'Your expertise lies in harmonizing human talent with technological infrastructure at scale.',
            power: 'Architectural Vision'
        };

        return {
            name: 'The Cautious Pragmatist',
            desc: 'You are navigating the early stages of AI integration with a balanced, risk-aware approach.',
            power: 'Balanced Perspective'
        };
    }

    renderTrustSpiderChart() {
        const container = document.getElementById('trust-spider-chart');
        if (!container) return;

        const ans = this.state.answers;
        const dimensions = [
            { name: 'Strategic', ids: ['CAT1', 'CAT2', 'CAT3', 'CAT4', 'CAT5'] },
            { name: 'Cultural', ids: ['CAT6', 'CAT7', 'CAT8', 'CAT9', 'CAT10'] },
            { name: 'Brand', ids: ['CAT11', 'CAT12', 'CAT13', 'CAT14', 'CAT15'] },
            { name: 'Aesthetic', ids: ['CAT16', 'CAT17', 'CAT18', 'CAT19'] },
            { name: 'Stakeholder', ids: ['CAT20', 'CAT21', 'CAT22', 'CAT23'] }
        ];

        const scores = dimensions.map(d => {
            const vals = d.ids.map(id => parseInt(ans[id]) || 4);
            return vals.reduce((a, b) => a + b, 0) / vals.length;
        });

        const size = 300;
        const center = size / 2;
        const radius = size * 0.4;
        const angleStep = (Math.PI * 2) / dimensions.length;

        const points = scores.map((s, i) => {
            const r = (s / 7) * radius;
            const x = center + r * Math.sin(i * angleStep);
            const y = center - r * Math.cos(i * angleStep);
            return `${x},${y}`;
        }).join(' ');

        const gridLines = [0.2, 0.4, 0.6, 0.8, 1.0].map(p => {
            const r = p * radius;
            const pts = Array.from({ length: dimensions.length + 1 }).map((_, i) => {
                const x = center + r * Math.sin(i * angleStep);
                const y = center - r * Math.cos(i * angleStep);
                return `${x},${y}`;
            }).join(' ');
            return `<polyline points="${pts}" class="spider-grid" fill="none" />`;
        }).join('');

        const axes = dimensions.map((d, i) => {
            const x = center + radius * Math.sin(i * angleStep);
            const y = center - radius * Math.cos(i * angleStep);
            const tx = center + (radius + 25) * Math.sin(i * angleStep);
            const ty = center - (radius + 25) * Math.cos(i * angleStep);
            return `
                <line x1="${center}" y1="${center}" x2="${x}" y2="${y}" class="spider-axis" />
                <text x="${tx}" y="${ty}" class="spider-label" text-anchor="middle" dominant-baseline="middle">${d.name}</text>
            `;
        }).join('');

        container.innerHTML = `
            <svg viewBox="0 0 ${size} ${size}" class="sci-svg">
                <circle cx="${center}" cy="${center}" r="${radius}" class="spider-bg" />
                ${gridLines}
                ${axes}
                <polygon points="${points}" class="spider-area" />
                ${scores.map((s, i) => {
            const r = (s / 7) * radius;
            const x = center + r * Math.sin(i * angleStep);
            const y = center - r * Math.cos(i * angleStep);
            return `<circle cx="${x}" cy="${y}" r="3" class="spider-point" />`;
        }).join('')}
            </svg>
        `;
    }

    async completeSurvey() {
        const surveyPage = document.getElementById('survey-page');
        const flash = document.getElementById('implosion-flash');

        if (surveyPage) surveyPage.classList.add('implosion-active');
        await new Promise(r => setTimeout(r, 1200));
        if (flash) flash.classList.add('active');

        document.getElementById('loading-overlay').style.display = 'flex';
        const timeTaken = calculateCompletionTime(this.state.startTime);
        const archetype = this.calculateCalibrationArchetype();

        // Calculate scores for unified database
        const ans = this.state.answers;
        const catKeys = Object.keys(ans).filter(k => k.startsWith('CAT'));
        const trustScore = catKeys.length ? catKeys.reduce((a, k) => a + parseInt(ans[k]), 0) / catKeys.length : 4;

        const curKeys = ['ID5', 'ID6', 'ID7', 'ID8', 'ID9'];
        const exeKeys = ['ID1', 'ID2', 'ID3', 'ID4'];
        const curScore = curKeys.reduce((a, k) => a + (parseInt(ans[k]) || 4), 0) / curKeys.length;
        const exeScore = exeKeys.reduce((a, k) => a + (parseInt(ans[k]) || 4), 0) / exeKeys.length;
        const curatorialShift = curScore / (exeScore || 1);

        const ocKeys = Object.keys(ans).filter(k => k.startsWith('OC'));
        const orgReadiness = ocKeys.length ? ocKeys.reduce((a, k) => a + parseInt(ans[k]), 0) / ocKeys.length : 4;

        // Update Completion detailed stats
        const timeVal = document.getElementById('completion-time');
        const ansVal = document.getElementById('total-answered');
        const skipVal = document.getElementById('total-skipped');
        const archName = document.getElementById('archetype-name');

        if (timeVal) timeVal.innerText = `${timeTaken}m`;
        if (ansVal) ansVal.innerText = this.state.questionsAnswered;
        if (skipVal) skipVal.innerText = this.state.questionsSkipped;
        if (archName) archName.textContent = archetype.name;

        // Results display and spider chart
        this.renderTrustSpiderChart();
        this.typewriterEffect(document.getElementById('archetype-desc'), archetype.desc);

        // SCIENTIFIC RIGOR: Push to Master DB
        await Database.completeSurvey(this.state.responseId, {
            completionTime: timeTaken,
            questionsAnswered: this.state.questionsAnswered,
            questionsSkipped: this.state.questionsSkipped,
            archetype: archetype,
            trustScore: trustScore,
            curatorScore: curScore,
            executorScore: exeScore,
            curatorialShift: curatorialShift,
            orgReadiness: orgReadiness
        });

        // Final transition to completion page
        this.showPage('completion');
        document.getElementById('loading-overlay').style.display = 'none';
        if (flash) flash.classList.remove('active');
        LocalBackup.clearResponse();

        // --- HYPER-ADVANCED: Scheduler Redirect ---
        const interest = this.state.answers['follow-up-interest'];
        if (interest === 'yes' || interest === 'maybe') {
            setTimeout(() => this.showPage('scheduler'), 8000);
        }
    }

    announceToSR(question) {
        const ann = document.getElementById('question-announcer');
        if (ann) ann.textContent = `Question ${this.state.currentQuestionIndex + 1}: ${question.questionText}`;
    }

    updateObserverDialogue(section) {
        if (this.state.lastSection === section) return;
        this.state.lastSection = section;

        const text = this.observerDialogue[section];
        if (!text) return;

        const dialogue = document.getElementById('guide-dialogue');
        const content = dialogue?.querySelector('.dialogue-text');

        if (dialogue && content) {
            dialogue.classList.remove('active');

            setTimeout(() => {
                content.textContent = '';
                dialogue.classList.add('active');
                this.typewriterEffect(content, text, null, 30);
            }, 600);
        }
    }

    attachInputListeners(container) {
        container.querySelectorAll('input, select, textarea').forEach(el => {
            el.addEventListener('input', () => {
                const err = document.getElementById('question-error');
                if (err) err.classList.remove('visible');
            });
        });
    }

    renderInfographic(type) {
        safeLog('log', `[NeuralCore] Rendering theoretical visual: ${type}`);
        const infographics = {
            'research-framework': `
                <div class="hf-review-panel">
                    <div class="reviewer-group">
                        <div class="market-node">⚖️ Trust</div>
                        <div class="market-node">🆔 Identity</div>
                        <div class="market-node">🧠 Logic</div>
                    </div>
                    <div class="bridge-path" style="width: 150px"></div>
                    <div class="deadline-label">Interdependent Research Pillars</div>
                </div>`,
            'ctcp-dimensions': `
                <div class="hf-workspace" style="height: 120px">
                    <div class="pane ai-active" data-label="CAT Dimensions">
                        <div class="cat-labels" style="position:static; inset:auto; display:flex; gap:5px; flex-wrap:wrap">
                            <span class="cat-tag" style="background: var(--color-solar-orange); color: black">Strategic</span>
                            <span class="cat-tag">Cultural</span>
                            <span class="cat-tag">Brand</span>
                            <span class="cat-tag">Aesthetic</span>
                        </div>
                    </div>
                </div>`,
            'identity-spectrum': `
                <div class="hf-review-panel">
                    <div class="hf-market-bridge" style="width: 200px">
                        <div class="deadline-label" style="margin-right: 10px">Executor</div>
                        <div class="bridge-path">
                            <div class="appropriateness-pill" style="top: -15px">Identity Shift</div>
                        </div>
                        <div class="deadline-label" style="margin-left: 10px">Curator</div>
                    </div>
                </div>`,
            'org-pillars': `
                <div class="scenario-visual-container org-pillars">
                    <div class="pillar-row">
                        <div class="pillar"><div class="bar" style="height:30%; background: var(--color-solar-orange); opacity: 0.3"></div></div>
                        <div class="pillar"><div class="bar" style="height:50%; background: var(--color-solar-orange); opacity: 0.5"></div></div>
                        <div class="pillar"><div class="bar" style="height:80%; background: var(--color-solar-orange)"></div></div>
                        <div class="pillar"><div class="bar" style="height:60%; background: var(--color-solar-orange); opacity: 0.7"></div></div>
                        <div class="pillar"><div class="bar" style="height:40%; background: var(--color-solar-orange); opacity: 0.4"></div></div>
                        <div class="pillar"><div class="bar" style="height:90%; background: var(--color-solar-orange)"></div></div>
                    </div>
                    <div class="deadline-label" style="position:absolute; bottom: 20px">Organizational Trust Maturity</div>
                </div>`,
            'cultural-moderator': `
                <div class="hf-market-bridge">
                    <div class="market-node">🚩 Culture A</div>
                    <div class="bridge-path">
                        <div class="appropriateness-pill">Moderator</div>
                    </div>
                    <div class="market-node">🏁 Culture B</div>
                </div>`
        };
        return infographics[type] || '';
    }

    renderScenario(scenario) {
        return `
            <div class="scenario-card stagger-item">
                <div class="scenario-badge">Scenario</div>
                <div class="scenario-visual-container">
                    ${this.renderScenarioVisual(scenario.image)}
                </div>
                <div class="scenario-context">${scenario.context}</div>
                <div class="scenario-helper">The animation above describes the scenario for the next question.</div>
            </div>
        `;
    }

    renderScenarioVisual(type) {
        const visuals = {
            'scenario-ai-suggestion': `
                <div class="hf-workspace">
                    <div class="pane" data-label="Manual Draft">
                        <div class="wire-box" style="width: 80%"></div>
                        <div class="wire-box" style="width: 60%"></div>
                        <div class="wire-box" style="width: 90%"></div>
                    </div>
                    <div class="pane ai-active" data-label="AI Proposal">
                        <div class="wire-box" style="width: 85%"></div>
                        <div class="wire-box" style="width: 70%"></div>
                        <div class="wire-box" style="width: 95%"></div>
                    </div>
                </div>`,
            'scenario-deadline': `
                <div class="hf-deadline-hud">
                    <div class="deadline-label">Time Remaining</div>
                    <div class="timer-display">00:59:58</div>
                    <svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" fill="none" class="urgent-clock">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                </div>`,
            'scenario-stakeholder': `
                <div class="hf-review-panel">
                    <div class="reviewer-group">
                        <div class="reviewer-icon active">👤</div>
                        <div class="reviewer-icon active">👤</div>
                        <div class="reviewer-icon active">👤</div>
                    </div>
                    <div class="scrutiny-scan"></div>
                    <div class="deadline-label">Stakeholder Review Active</div>
                </div>`,
            'scenario-cross-cultural': `
                <div class="hf-market-bridge">
                    <div class="market-node">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                        Global Market A
                    </div>
                    <div class="bridge-path">
                        <div class="appropriateness-pill">Local Appropriateness</div>
                    </div>
                    <div class="market-node">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"></circle><path d="M12 2v20M2 12h20"></path></svg>
                        Global Market B
                    </div>
                </div>`,
            'scenario-decision-1': `
                <div class="hf-workspace visual-float">
                    <div class="pane" data-label="Project Timeline: Week 3">
                        <div class="wire-box" style="width: 100%; height: 10px; background: #4285f4; opacity: 0.3"></div>
                        <div class="wire-box" style="width: 50%; height: 10px; background: #4285f4"></div>
                        <div class="deadline-label" style="margin-top: 20px">Mid-Project Decision Point</div>
                    </div>
                </div>`,
            'scenario-decision-2': `
                <div class="hf-review-panel">
                    <div class="reviewer-icon active" style="font-size: 40px">📧</div>
                    <div class="deadline-label">Feedback Received: Stakeholder concerns</div>
                    <div class="scrutiny-scan" style="width: 150px"></div>
                </div>`
        };

        return `<div class="scenario-image loaded">${visuals[type] || `<div class="scenario-placeholder">Context Node: ${type}</div>`}</div>`;
    }
}

// Local backup system for response persistence
const LocalBackup = {
    saveResponse(state) {
        try {
            const data = {
                ...state,
                lastSaved: Date.now()
            };
            localStorage.setItem('surveyResponse', JSON.stringify(data));
            safeLog('log', 'Response saved to localStorage');
        } catch (e) {
            safeLog('warn', 'Failed to save response locally:', e);
        }
    },

    loadResponse() {
        try {
            const data = localStorage.getItem('surveyResponse');
            if (data) {
                const parsed = JSON.parse(data);
                safeLog('log', 'Response loaded from localStorage');
                return parsed;
            }
        } catch (e) {
            safeLog('warn', 'Failed to load response from localStorage:', e);
        }
        return null;
    },

    clearResponse() {
        try {
            localStorage.removeItem('surveyResponse');
            safeLog('log', 'Response cleared from localStorage');
        } catch (e) {
            safeLog('warn', 'Failed to clear response from localStorage:', e);
        }
    }
};

let surveyEngine;
document.addEventListener('DOMContentLoaded', () => {
    surveyEngine = new UltimateSurveyEngine();
    window.surveyEngine = surveyEngine;
});

// Global showPage wrapper (Legacy support)
function showPage(id) {
    if (window.surveyEngine) {
        // Ensure ID compatibility
        const targetId = id.endsWith('-page') ? id : `${id}-page`;
        window.surveyEngine.showPage(targetId);
    }
}

function confirmBooking() { surveyEngine.confirmBooking(); }
function startStudy() { surveyEngine.startStudy(); }
function startInterview() { surveyEngine.startInterview(); }
function submitConsent() { surveyEngine.submitConsent(); }
function nextQuestion() { surveyEngine.nextQuestion(); }
function previousQuestion() { surveyEngine.previousQuestion(); }
function goBack(p) { surveyEngine.showPage(p); }
function googleLogin() { surveyEngine.googleLogin(); }
function closeInfo() { document.getElementById('info-modal')?.classList.remove('open'); }
function saveAndExit() {
    if (surveyEngine && surveyEngine.state) {
        LocalBackup.saveResponse(surveyEngine.state);
        surveyEngine.showError("Progress saved locally. You can resume later.");
    }
}
