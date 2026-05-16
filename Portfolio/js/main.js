// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Particles.js Initialization ---
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 40,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#6C63FF", "#00D4FF"]
                },
                "shape": {
                    "type": "circle"
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#6C63FF",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "push": {
                        "particles_nb": 3
                    }
                }
            },
            "retina_detect": true
        });
    }

    // --- 2. Navbar Scroll & Mobile Menu ---
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('ph-list', 'ph-x');
        } else {
            icon.classList.replace('ph-x', 'ph-list');
        }
    });

    // Close menu when clicking a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.replace('ph-x', 'ph-list');
        });
    });


    // --- 3. GSAP Animations ---
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Reveal animations for sections
        const revealElements = document.querySelectorAll('.gs-reveal');
        
        revealElements.forEach((elem) => {
            gsap.fromTo(elem, 
                { autoAlpha: 0, y: 50 }, 
                { 
                    duration: 1, 
                    autoAlpha: 1, 
                    y: 0, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%", // Reveal when top of element hits 85% of viewport
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Metrics counter animation
        const metricNumbers = document.querySelectorAll('.metric-number');
        metricNumbers.forEach(number => {
            const text = number.innerText;
            const finalValue = parseInt(text.replace(/[^0-9]/g, ''));
            const hasPlus = text.includes('+');
            
            ScrollTrigger.create({
                trigger: number,
                start: "top 80%", // Start slightly later to ensure it's revealed
                once: true,
                onEnter: () => {
                    if (isNaN(finalValue)) return;
                    let obj = { value: 0 };
                    gsap.to(obj, {
                        value: finalValue,
                        duration: 2,
                        ease: "power2.out",
                        onUpdate: () => {
                            number.innerText = Math.floor(obj.value) + (hasPlus ? '+' : '');
                        }
                    });
                }
            });
        });
        

    }

    // --- 4. AI Chatbot Logic (Simulated) ---
    const chatToggle = document.getElementById('chat-toggle');
    const chatClose = document.getElementById('chat-close');
    const chatPanel = document.querySelector('.chat-panel');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const promptBtns = document.querySelectorAll('.prompt-btn');

    // Toggle panel
    chatToggle.addEventListener('click', () => {
        chatPanel.classList.add('active');
        chatToggle.style.transform = 'scale(0)';
    });

    chatClose.addEventListener('click', () => {
        chatPanel.classList.remove('active');
        setTimeout(() => {
            chatToggle.style.transform = 'scale(1)';
        }, 300);
    });

    // Handle messages
    function appendMessage(text, isUser = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${isUser ? 'user-msg' : 'ai-msg'}`;
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleUserInput(text) {
        if (!text.trim()) return;
        
        // Add user message
        appendMessage(text, true);
        chatInput.value = '';

        // Simulate thinking delay
        setTimeout(() => {
            const lowerText = text.toLowerCase();
            let response = "I'm Balram's virtual assistant. Try asking about his tech stack, apps, or how to hire him!";
            
            if (lowerText.includes('tech') || lowerText.includes('stack') || lowerText.includes('skills')) {
                response = "Balram specializes in Flutter, Dart, Riverpod, Firebase, Python, and Node.js. He also integrates AI/GenAI APIs to build scalable mobile SaaS products.";
            } else if (lowerText.includes('hire') || lowerText.includes('freelance') || lowerText.includes('work')) {
                response = "Yes! Balram is currently open to remote opportunities and freelance projects. You can email him using the contact section below.";
            } else if (lowerText.includes('app') || lowerText.includes('project') || lowerText.includes('build')) {
                response = "He has built over 10 mobile apps! A major one is 'ID Photo Editor'. He's currently focused on AI content tools and automation systems.";
            } else if (lowerText.includes('hi') || lowerText.includes('hello')) {
                response = "Hello there! How can I help you learn more about Balram Tech Hub?";
            }

            appendMessage(response, false);
        }, 1000);
    }

    // Input events
    chatSend.addEventListener('click', () => {
        handleUserInput(chatInput.value);
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput(chatInput.value);
        }
    });

    // Quick prompts
    promptBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            handleUserInput(btn.textContent);
        });
    });

    // --- 5. Image Lightbox Modal Logic ---
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const captionText = document.getElementById('modal-caption');
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
    const closeBtn = document.getElementsByClassName('modal-close')[0];

    lightboxTriggers.forEach(img => {
        img.onclick = function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
            document.body.style.overflow = "hidden"; // Prevent scrolling
        }
    });

    closeBtn.onclick = function() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }

    // Close on outside click
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && modal.style.display === "block") {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
});

