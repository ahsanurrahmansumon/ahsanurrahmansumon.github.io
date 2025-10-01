        document.addEventListener('DOMContentLoaded', () => {
            const stickyNav = document.querySelector('.sticky-nav');
            const heroSection = document.querySelector('#hero');

            // --- Sticky Nav Logic ---
            const navObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        stickyNav.classList.add('visible');
                    } else {
                        stickyNav.classList.remove('visible');
                    }
                });
            }, { threshold: 0.1 });
            navObserver.observe(heroSection);


            // --- Custom Cursor Logic ---
            // Check if the device is a touch device
            const isTouchDevice = () => {
                return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            }

            if (!isTouchDevice()) {
                const cursorDot = document.querySelector('.cursor-dot');
                const cursorOutline = document.querySelector('.cursor-outline');

                window.addEventListener('mousemove', (e) => {
                    const posX = e.clientX;
                    const posY = e.clientY;

                    cursorDot.style.left = `${posX}px`;
                    cursorDot.style.top = `${posY}px`;

                    cursorOutline.animate({
                        left: `${posX}px`,
                        top: `${posY}px`
                    }, { duration: 500, fill: "forwards" });
                });

                const interactiveElements = document.querySelectorAll('a, button');
                interactiveElements.forEach(el => {
                    el.addEventListener('mouseover', () => {
                        cursorDot.classList.add('hovered');
                        cursorOutline.classList.add('hovered');
                    });
                    el.addEventListener('mouseleave', () => {
                        cursorDot.classList.remove('hovered');
                        cursorOutline.classList.remove('hovered');
                    });
                });
            }


            // --- Scroll-triggered Animations Logic ---
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1
            });

            document.querySelectorAll('.reveal').forEach(el => {
                observer.observe(el);
            });

            // --- Testimonial Slider Logic ---
            const slider = document.getElementById('testimonial-slider');
            const sliderContainer = slider.parentElement;
            const slides = slider.children;
            let currentIndex = 0;
            let slideInterval;

            const startSlider = () => {
                slideInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % slides.length;
                    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
                }, 5000); // Change slide every 5 seconds
            };

            const stopSlider = () => {
                clearInterval(slideInterval);
            };
            
            sliderContainer.addEventListener('mouseenter', stopSlider);
            sliderContainer.addEventListener('mouseleave', startSlider);
            
            startSlider();
            // --- Auto-update Footer Year ---
            document.getElementById('current-year').textContent = new Date().getFullYear();
            
            // --- Contact Form Logic ---
            const form = document.getElementById('contact-form');
            const formStatus = document.getElementById('form-status');

            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData(form);
                const action = form.getAttribute('action');
                
                formStatus.textContent = 'Sending...';

                fetch(action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        formStatus.textContent = 'Message sent successfully!';
                        formStatus.style.color = 'rgb(74 222 128)'; // green-400
                        form.reset();
                    } else {
                        response.json().then(data => {
                            if (Object.hasOwn(data, 'errors')) {
                                formStatus.textContent = data["errors"].map(error => error["message"]).join(", ")
                            } else {
                                formStatus.textContent = 'Oops! There was a problem submitting your form';
                            }
                            formStatus.style.color = 'rgb(248 113 113)'; // red-400
                        })
                    }
                }).catch(error => {
                    formStatus.textContent = 'Oops! There was a problem submitting your form';
                    formStatus.style.color = 'rgb(248 113 113)'; // red-400
                });

                setTimeout(() => {
                    formStatus.textContent = '';
                }, 4000);
            });
        });