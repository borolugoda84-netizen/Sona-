// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Hero Entrance Animation ---
    const heroWords = document.querySelectorAll('.hero-title .word');
    const heroContent = document.querySelector('.hero-content');
    const botIcon = document.querySelector('.bot-icon');
    const visualPulse = document.querySelector('.visual-pulse');
    const headerElements = document.querySelectorAll('.logo, .nav a, .cta-button');

    // Set Initial States (Important for clean animation start)
    gsap.set(heroWords, { y: '100%', opacity: 0 }); // Text starts hidden below
    gsap.set(heroContent, { opacity: 0, y: 30 });
    gsap.set(botIcon, { scale: 0.5, opacity: 0, rotation: -30 });
    gsap.set(visualPulse, { scale: 0.8, opacity: 0 });
    gsap.set(headerElements, { y: -20, opacity: 0 });


    // Create the timeline for the load-in sequence
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. Header fades in and slides down
    tl.to(headerElements, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05
    })
    
    // 2. Hero Title slides up and fades in word by word
    .to(heroWords, {
        y: '0%',
        opacity: 1,
        duration: 1.0,
        stagger: 0.1,
        ease: 'power4.out'
    }, "-=0.5") // Start earlier

    // 3. Subtitle and CTAs fade in
    .to(heroContent, {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, "-=0.6")

    // 4. Bot Icon and Pulse animate in
    .to(visualPulse, {
        opacity: 0.3,
        scale: 1,
        duration: 1.2
    }, "-=1.0")
    .to(botIcon, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.5,
        ease: 'elastic.out(1, 0.5)' // Fun, bouncy ease
    }, "<"); // Start at the same time as visualPulse


    // --- 2. Scroll-Triggered Animations ---

    // A. Section Titles/Subtitles Reveal
    // Applies a simple fade and slide-up to all elements with class 'reveal-text'
    const sectionText = gsap.utils.toArray('.reveal-text');
    sectionText.forEach(text => {
        gsap.fromTo(text, {
            opacity: 0,
            y: 30
        }, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            scrollTrigger: {
                trigger: text,
                start: 'top 90%', // Start when the element is 90% down the viewport
                end: 'bottom 20%',
                toggleActions: 'play none none none', // Play once on enter
            }
        });
    });


    // B. Staggered Feature Card Reveal (using ScrollTrigger.batch for performance)
    const featureCards = gsap.utils.toArray('.feature-card');
    
    // Use batch to efficiently animate a group of elements
    ScrollTrigger.batch(featureCards, {
        onEnter: batch => {
            gsap.to(batch, {
                opacity: 1,
                y: 0,
                stagger: 0.15, // Stagger makes them fly in one after the other
                overwrite: true,
                duration: 0.8,
                ease: 'power2.out'
            });
        },
        start: 'top 85%', // Start the batch when the first item is 85% down the screen
        toggleActions: 'play none none none',
        once: true // Ensures the animation only plays once
    });


    // C. Commands Table and Support Links Reveal
    const mainSections = gsap.utils.toArray('.command-table-container, .support-links');

    mainSections.forEach(section => {
        gsap.fromTo(section, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 1.0,
            scrollTrigger: {
                trigger: section,
                start: 'top 90%',
                toggleActions: 'play none none none',
            }
        });
    });

});