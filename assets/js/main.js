/*=============== SHOW & HIDE MENU WITH OVERLAY & SCROLL LOCK ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close'),
      navOverlay = document.getElementById('nav-overlay');

const openMenu = () => {
   if (navMenu) navMenu.classList.add('show-menu');
   if (navOverlay) navOverlay.classList.add('show-overlay');
   document.body.classList.add('lock-scroll');
   if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
};

const closeMenu = () => {
   if (navMenu) navMenu.classList.remove('show-menu');
   if (navOverlay) navOverlay.classList.remove('show-overlay');
   document.body.classList.remove('lock-scroll');
   if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
};

/* Menu show */
if (navToggle) {
   navToggle.addEventListener('click', openMenu);
}

/* Menu hidden */
if (navClose) {
   navClose.addEventListener('click', closeMenu);
}

/* Menu hidden via backdrop overlay click */
if (navOverlay) {
   navOverlay.addEventListener('click', closeMenu);
}

/* Close menu with Escape key for keyboard / desktop access */
document.addEventListener('keydown', (e) => {
   if (e.key === 'Escape' && navMenu && navMenu.classList.contains('show-menu')) {
      closeMenu();
   }
});

/*=============== REMOVE MENU MOBILE ON LINK CLICK ===============*/
const navLinks = document.querySelectorAll('.nav__link, .button__mobile-resume');
navLinks.forEach(link => link.addEventListener('click', closeMenu));

/* Reset mobile menu state on window resize */
window.addEventListener('resize', () => {
   if (window.innerWidth >= 1024) {
      closeMenu();
   }
});

/* Auto close mobile menu when user scrolls */
let lastScrollPosition = window.scrollY;
window.addEventListener('scroll', () => {
   if (navMenu && navMenu.classList.contains('show-menu')) {
      if (Math.abs(window.scrollY - lastScrollPosition) > 10) {
         closeMenu();
      }
   }
   lastScrollPosition = window.scrollY;
}, { passive: true });

/*=============== ADD BLUR TO HEADER ===============*/
const blurHeader = () => {
   const header = document.getElementById('header');
   if (!header) return;
   // Add a class if the bottom offset is greater than 50 of the viewport
   window.scrollY >= 50 ? header.classList.add('blur-header') 
                        : header.classList.remove('blur-header');
};
window.addEventListener('scroll', blurHeader, { passive: true });

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () => {
   const scrollUp = document.getElementById('scroll-up');
   if (!scrollUp) return;
   // When the scroll is higher than 350 viewport height, add the show-scroll class
   window.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                         : scrollUp.classList.remove('show-scroll');
};
window.addEventListener('scroll', scrollUp, { passive: true });

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
   const scrollDown = window.scrollY;
   const header = document.getElementById('header');
   const headerOffset = header ? header.offsetHeight + 15 : 70;

   sections.forEach(current => {
      const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - headerOffset,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

      if (sectionsClass) {
         if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link');
         } else {
            sectionsClass.classList.remove('active-link');
         }
      }
   });
};
window.addEventListener('scroll', scrollActive, { passive: true });

/*=============== CONTACT FORM ===============*/
const contactForm = document.getElementById('contact-form'),
      contactName = document.getElementById('contact-name'),
      contactEmail = document.getElementById('contact-email'),
      contactProject = document.getElementById('contact-project'),
      contactMessage = document.getElementById('contact-message'),
      contactButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

const sendEmail = async (e) => {
   e.preventDefault();

   if (!contactName || !contactEmail || !contactProject) return;

   const name = contactName.value.trim();
   const email = contactEmail.value.trim();
   const message = contactProject.value.trim();

   // Check if the input fields have a value
   if (name === '' || email === '' || message === '') {
      if (contactMessage) {
         contactMessage.classList.remove('color-green');
         contactMessage.classList.add('color-red');
         contactMessage.textContent = 'Please fill in all the fields ✍️';
      }
      return;
   }

   const originalBtnHtml = contactButton ? contactButton.innerHTML : 'Send Message';
   if (contactButton) {
      contactButton.disabled = true;
      contactButton.innerHTML = 'Sending... <i class="ri-loader-4-line"></i>';
   }

   if (contactMessage) {
      contactMessage.classList.remove('color-red', 'color-green');
      contactMessage.textContent = 'Sending your message... ⏳';
   }

   try {
      const response = await fetch('https://formsubmit.co/ajax/nahid1332020@gmail.com', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         },
         body: JSON.stringify({
            name: name,
            email: email,
            message: message,
            _subject: `New Portfolio Message from ${name}`,
            _captcha: 'false',
            _template: 'table'
         })
      });

      const data = await response.json();

      if (response.ok && (data.success === 'true' || data.success === true)) {
         if (contactMessage) {
            contactMessage.classList.remove('color-red');
            contactMessage.classList.add('color-green');
            contactMessage.textContent = 'Message sent successfully! ✅ I will reply soon.';
         }
         contactForm.reset();
      } else {
         throw new Error(data.message || 'Submission error');
      }
   } catch (error) {
      console.error('Contact form submission error:', error);
      // Graceful fallback to mailto if network or adblocker blocks AJAX
      if (contactMessage) {
         contactMessage.classList.remove('color-green');
         contactMessage.classList.add('color-red');
         contactMessage.textContent = 'Opening your email client as fallback... ✉️';
      }
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:nahid1332020@gmail.com?subject=${subject}&body=${body}`;
   } finally {
      if (contactButton) {
         contactButton.disabled = false;
         contactButton.innerHTML = originalBtnHtml;
      }
      setTimeout(() => {
         if (contactMessage) contactMessage.textContent = '';
      }, 6000);
   }
};

if (contactForm) {
   contactForm.addEventListener('submit', sendEmail);
}

/*=============== SCROLL REVEAL ANIMATION (MOBILE & DESKTOP TUNED) ===============*/
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (typeof ScrollReveal !== 'undefined' && !prefersReducedMotion) {
   const isMobile = window.innerWidth < 768;

   const sr = ScrollReveal({
      origin: 'top',
      distance: isMobile ? '30px' : '50px',
      duration: isMobile ? 1200 : 1800,
      delay: isMobile ? 150 : 250,
      reset: false // Animations run once for crisp performance
   });

   sr.reveal(`.home__data, .about__image-box, .skills__card:nth-child(odd)`);
   sr.reveal(`.home__image, .about__data, .skills__card:nth-child(even)`, { origin: 'bottom', delay: isMobile ? 200 : 350 });
   sr.reveal(`.services__card, .projects__card`, { interval: isMobile ? 100 : 150 });
   sr.reveal(`.achievements__group:nth-child(1)`, { origin: isMobile ? 'bottom' : 'left' });
   sr.reveal(`.achievements__group:nth-child(2)`, { origin: isMobile ? 'bottom' : 'right' });
   sr.reveal(`.contact__info`, { origin: isMobile ? 'bottom' : 'left' });
   sr.reveal(`.contact__form-box`, { origin: isMobile ? 'bottom' : 'right' });
}
