// Debug: Check if script is loading
console.log('Script loaded successfully');

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM Content Loaded');

    // Check if EmailJS is available
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS is not loaded. Check if the script tag is correct.');
        return;
    }

    // Initialize EmailJS
    try {
        emailjs.init('UxuBH0j_xRNfW7zFz');
        console.log('EmailJS initialized successfully');
    } catch (error) {
        console.error('EmailJS initialization failed:', error);
    }

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    const notification = document.getElementById('notification');

    if (!contactForm) {
        console.error('Contact form not found');
        return;
    }

    console.log('Contact form found:', contactForm);

    function showNotification(message, type) {
        if (notification) {
            notification.textContent = message;
            notification.className = `notification ${type} show`;

            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        } else {
            alert(message); // Fallback if notification element not found
        }
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Add multiple event listeners to debug the issue
    console.log('Adding submit event listener to form:', contactForm);

    // Add a click listener to the submit button to debug
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    console.log('Submit button found:', submitBtn);

    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            console.log('Submit button clicked');
            e.preventDefault();
            console.log('Default prevented on button click');

            // Manually trigger form submission logic
            handleFormSubmission();
        });
    }

    // Also keep the form submit listener
    contactForm.addEventListener('submit', (e) => {
        console.log('Form submitted via submit event');
        e.preventDefault();
        handleFormSubmission();
    });

    function handleFormSubmission() {

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        console.log('Form data:', { name, email, message });

        if (!name || !email || !message) {
            console.log('Validation failed: missing fields');
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!validateEmail(email)) {
            console.log('Validation failed: invalid email');
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Prepare template parameters
        const templateParams = {
            name: name,
            email: email,
            message: message
        };

        console.log('Sending email with params:', templateParams);

        // Send email using EmailJS
        emailjs.send('service_fgby901', 'template_2pz4w8i', templateParams)
            .then(function (response) {
                console.log('Email sent successfully:', response);
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            }, function (error) {
                console.error('Email send failed:', error);
                showNotification('Failed to send message. Please try again.', 'error');
            })
            .finally(function () {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    }

    // Preloader
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar Background Change on Scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        }
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all sections and elements
    document.querySelectorAll('section, .skill-item, .project-card, .certificate-card, .timeline-item').forEach(el => {
        observer.observe(el);
    });

    // Hover Effects for Skill Items
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });

    // Typing Animation for Hero Title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // Initialize typing animation when page loads
    window.addEventListener('load', () => {
        const heroTitle = document.querySelector('.hero-title .name');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 150);
        }
    });

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const profileCard = document.querySelector('.profile-card');

        if (hero && profileCard) {
            const rate = scrolled * -0.5;
            profileCard.style.transform = `translateY(${rate}px)`;
        }
    });

    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Animated Counter for Stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const increment = target / 100;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + '+';
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target + '+';
                }
            };

            updateCounter();
        });
    }

    // Trigger counter animation when about section is visible
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        aboutObserver.observe(aboutSection);
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Skill Progress Animation
    function animateSkillProgress() {
        const skillItems = document.querySelectorAll('.skill-item');

        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Trigger skill animation when skills section is visible
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillProgress();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        skillsObserver.observe(skillsSection);
    }

    // Project Card Hover Effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Certificate Card Hover Effects
    document.querySelectorAll('.certificate-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.05)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Timeline Animation
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');

        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 300);
        });
    }

    // Trigger timeline animation when experience section is visible
    const experienceSection = document.querySelector('.experience');
    if (experienceSection) {
        const experienceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateTimeline();
                    experienceObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        experienceObserver.observe(experienceSection);
    }

    // Initialize timeline items with initial state
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'all 0.6s ease';
    });

    // Initialize skill items with initial state
    document.querySelectorAll('.skill-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
    });

    // Temporarily disable loading animation for project images to fix white box issue
    document.querySelectorAll('.project-image img').forEach(img => {
        // Just ensure images are visible
        img.style.opacity = '1';
        img.style.transition = 'opacity 0.3s ease';

        // Add error handling
        img.addEventListener('error', (e) => {
            console.error('Image failed to load:', img.src, e);
            img.style.background = '#f0f0f0';
            img.alt = 'Image not found';
        });

        console.log('Project image processed:', img.src);
    });

    // Add loading animation to certificate images
    document.querySelectorAll('.certificate-card img').forEach(img => {
        // Check if image is already loaded
        if (img.complete && img.naturalHeight !== 0) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });

            img.addEventListener('error', () => {
                // If image fails to load, still make it visible after a delay
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 1000);
            });
        }

        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';

        // Fallback: ensure images become visible after 2 seconds regardless
        setTimeout(() => {
            img.style.opacity = '1';
        }, 2000);
    });

    // Smooth reveal animation for sections
    const revealSections = document.querySelectorAll('section');
    revealSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease';
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealSections.forEach(section => {
        revealObserver.observe(section);
    });

    // Contact items are now proper links - no need for click handlers
    // Just add hover effects for contact items
    document.querySelectorAll('.contact-item').forEach(item => {
        item.style.transition = 'transform 0.2s ease';

        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.02)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });

    // Performance optimization: Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Apply throttling to scroll events
    window.addEventListener('scroll', throttle(() => {
        // Navbar background change
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        }

        // Back to top button
        const backToTopBtn = document.getElementById('back-to-top');
        if (backToTopBtn) {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }

        // Active navigation highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 100));

    // Add loading states for buttons (excluding contact form submit button)
    document.querySelectorAll('.btn').forEach(btn => {
        // Skip the contact form submit button as it has its own handler
        if (btn.closest('#contact-form')) {
            return;
        }

        btn.addEventListener('click', function () {
            if (this.type === 'submit') {
                const originalText = this.textContent;
                this.textContent = 'Sending...';
                this.disabled = true;

                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Project Modal Functionality
    const projectModal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const projectGallery = document.getElementById('project-gallery');
    const closeModal = document.getElementById('close-modal');

    // Project image configurations
    const projectImages = {
        'leave-application': {
            title: 'Leave Application Management System',
            images: [
                'project1/s1.png', 'project1/s2.png', 'project1/s3.png', 'project1/s4.png',
                'project1/s5.png', 'project1/s6.png', 'project1/s7.png', 'project1/s8.png',
                'project1/s9.png', 'project1/s10.png', 'project1/s11.png', 'project1/s12.png',
                'project1/s13.png', 'project1/s14.png', 'project1/s15.png', 'project1/s16.png',
                'project1/s17.png', 'project1/s18.png', 'project1/s19.png', 'project1/s20.png'
            ]
        },
        'facial-recognition': {
            title: 'Facial Recognition Attendance System',
            images: [
                'project2/img1.png', 'project2/img2.png', 'project2/img3.png', 'project2/img4.png',
                'project2/img5.png', 'project2/img7.png', 'project2/img8.png', 'project2/img9.png',
                'project2/img10.png'
            ]
        },
        'ai-chatbot': {
            title: 'Trainable AI/ML Chatbot',
            images: []
        },
        'port-scanner': {
            title: 'port-scanner',
            images: [
                'project4/Screenshot 2025-08-01 105104.png', 'project4/Screenshot 2025-08-01 110306.png'
            ]
        },
        'ai-agent': {
            title: 'ai-agent',
            images: [
                'project5/s1.png', 'project5/s2.png', 'project5/s3.png', 'project5/s4.png', 'project5/s5.png'
            ]
        },
        'nail-art': {
            title: 'Nail Art Studio Website',
            images: [
                'project6/Screenshot1.png', 'project6/Screenshot2.png', 'project6/Screenshot3.png',
                'project6/Screenshot4.png', 'project6/Screenshot5.png'
            ]
        }
    };

    // Open modal function
    function openProjectModal(projectType) {
        const project = projectImages[projectType];
        if (!project || !projectModal) return;

        modalTitle.textContent = project.title;
        projectGallery.innerHTML = '';

        project.images.forEach((imageSrc, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `<img src="${imageSrc}" alt="Project Screenshot ${index + 1}" loading="lazy">`;
            projectGallery.appendChild(galleryItem);
        });

        projectModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    // Close modal function
    function closeProjectModal() {
        if (projectModal) {
            projectModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }

    // Event listeners for project buttons
    document.querySelectorAll('.view-project-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectType = btn.getAttribute('data-project');
            openProjectModal(projectType);
        });
    });

    // Close modal events
    if (closeModal) {
        closeModal.addEventListener('click', closeProjectModal);
    }

    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal && projectModal.classList.contains('show')) {
            closeProjectModal();
        }
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('All event listeners attached successfully');
});
