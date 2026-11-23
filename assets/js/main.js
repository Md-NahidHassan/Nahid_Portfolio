/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* Menu show */
if (navToggle) {
   navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
   });
}

/* Menu hidden */
if (navClose) {
   navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
   });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () => {
   const navMenu = document.getElementById('nav-menu');
   // When we click on each nav__link, we remove the show-menu class
   navMenu.classList.remove('show-menu');
};
navLink.forEach(n => n.addEventListener('click', linkAction));

/*=============== ADD BLUR TO HEADER ===============*/
const blurHeader = () => {
   const header = document.getElementById('header');
   // Add a class if the bottom offset is greater than 50 of the viewport
   window.scrollY >= 50 ? header.classList.add('blur-header') 
                        : header.classList.remove('blur-header');
};
window.addEventListener('scroll', blurHeader);

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () => {
   const scrollUp = document.getElementById('scroll-up');
   // When the scroll is higher than 350 viewport height, add the show-scroll class
   window.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                         : scrollUp.classList.remove('show-scroll');
};
window.addEventListener('scroll', scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
   const scrollDown = window.scrollY;

   sections.forEach(current => {
      const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
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
window.addEventListener('scroll', scrollActive);

/*=============== CONTACT FORM ===============*/
const contactForm = document.getElementById('contact-form'),
      contactName = document.getElementById('contact-name'),
      contactEmail = document.getElementById('contact-email'),
      contactProject = document.getElementById('contact-project'),
      contactMessage = document.getElementById('contact-message');

const sendEmail = (e) => {
   e.preventDefault();

   if (!contactName || !contactEmail || !contactProject) return;

   // Check if the input fields have a value
   if (contactName.value.trim() === '' || contactEmail.value.trim() === '' || contactProject.value.trim() === '') {
      if (contactMessage) {
         contactMessage.classList.remove('color-green');
         contactMessage.classList.add('color-red');
         contactMessage.textContent = 'Please fill in all the fields ✍️';
      }
      return;
   }

   // Prepare mailto link as direct action
   const subject = encodeURIComponent(`Portfolio Inquiry from ${contactName.value.trim()}`);
   const body = encodeURIComponent(
      `Name: ${contactName.value.trim()}\nEmail: ${contactEmail.value.trim()}\n\nMessage:\n${contactProject.value.trim()}`
   );
   
   if (contactMessage) {
      contactMessage.classList.remove('color-red');
      contactMessage.classList.add('color-green');
      contactMessage.textContent = 'Opening your email client... Message ready! ✅';
   }

   // Open mailto link
   window.location.href = `mailto:nahid1332020@gmail.com?subject=${subject}&body=${body}`;

   // Clear input fields after 4 seconds
   setTimeout(() => {
      if (contactMessage) contactMessage.textContent = '';
      contactForm.reset();
   }, 4000);
};

if (contactForm) {
   contactForm.addEventListener('submit', sendEmail);
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
if (typeof ScrollReveal !== 'undefined') {
   const sr = ScrollReveal({
      origin: 'top',
      distance: '60px',
      duration: 2000,
      delay: 300,
      reset: false // Animations repeat: false for cleaner experience
   });

   sr.reveal(`.home__data, .about__image-box, .skills__card:nth-child(odd)`);
   sr.reveal(`.home__image, .about__data, .skills__card:nth-child(even)`, { origin: 'bottom', delay: 400 });
   sr.reveal(`.services__card, .projects__card`, { interval: 150 });
   sr.reveal(`.achievements__group:nth-child(1)`, { origin: 'left' });
   sr.reveal(`.achievements__group:nth-child(2)`, { origin: 'right' });
   sr.reveal(`.contact__info`, { origin: 'left' });
   sr.reveal(`.contact__form-box`, { origin: 'right' });
}
