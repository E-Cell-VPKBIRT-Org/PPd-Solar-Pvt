document.addEventListener('DOMContentLoaded', function() {

    gsap.registerPlugin(ScrollTrigger);

    
    const companyStartYear = 2021;
    const currentYear = new Date().getFullYear();
    const yearsOfExperience = currentYear - companyStartYear;
    const experienceElement = document.getElementById('years-of-experience');

    if (experienceElement && yearsOfExperience > 0) {
        experienceElement.textContent = `${yearsOfExperience}+ Years of Powering a Sustainable India`;
    }

   
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

  
    const heroSlider = new Swiper('.hero-slider', {
        direction: 'horizontal',
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });


    const tl = gsap.timeline();
    tl.from("header .navbar .logo", {
        y: -50,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
    })
    .from("header .navbar .nav-links li", {
        y: -50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
    }, "-=0.3")
    .from(".hero-content h1", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
    }, "-=0.2")
    .from(".hero-content p", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.4")
    .from(".hero-content .cta-button", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
    }, "-=0.3");

    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    gsap.from(".service-card", {
        scrollTrigger: {
            trigger: ".services-container",
            start: "top 80%",
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.2
    });

    gsap.from(".video-content > *", {
        scrollTrigger: {
            trigger: "#video-promo",
            start: "top 70%",
            toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2
    });

    gsap.from(".feature-item", {
        scrollTrigger: {
            trigger: ".why-us-container",
            start: "top 80%",
            toggleActions: 'play none none none'
        },
        x: -50,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.2
    });

    const tlTestimonial = gsap.timeline({
        scrollTrigger: {
            trigger: ".testimonial-container",
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
    tlTestimonial.from(".testimonial-video-wrapper", { x: -100, opacity: 0, duration: 1, ease: 'power2.out' })
                 .from(".testimonial-quote > *", { x: 100, opacity: 0, duration: 1, stagger: 0.2, ease: 'power2.out' }, "-=0.7");
    
    gsap.from(".info-card", {
        scrollTrigger: {
            trigger: "#company-info",
            start: "top 80%",
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.15
    });

    gsap.from(".about-content p", {
        scrollTrigger: {
            trigger: ".about-content",
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 1
    });

    gsap.from(".contact-form .form-group", {
        scrollTrigger: {
            trigger: ".contact-form",
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
    });


    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || message === '') {
            alert('Please fill out all required fields.');
            return;
        }

        const formData = { name, email, phone, message };
        const submitButton = contactForm.querySelector('button[type="submit"]');

        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            const response = await fetch('/api/request-callback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message || `Thank you, ${name}! Your request has been sent successfully.`);
                contactForm.reset();
            } else {
                alert(result.message || 'An error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Submission Error:', error);
            alert('A network error occurred. Please check your connection and try again.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit Request';
        }
    });

});