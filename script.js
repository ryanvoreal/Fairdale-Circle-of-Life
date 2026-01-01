// Fade-in animation for elements with class 'reveal'
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); 

const toggleBtn = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

toggleBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// ======= REVEAL ANIMATION ON SCROLL =======



// ========= DARK MODE TOGGLE =========
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;


if (themeToggle) {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');


  htmlElement.setAttribute('data-theme', currentTheme);
  themeToggle.checked = currentTheme === 'dark';


  themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}


// ========= FAQ ACCORDION FUNCTIONALITY =========
function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.closest('.faq-item');
      const isOpen = faqItem.classList.contains('open');

      // Close all other FAQ items
      document.querySelectorAll('.faq-item.open').forEach(item => {
        if (item !== faqItem) {
          item.classList.remove('open');
        }
      });

      // Toggle the clicked item
      if (!isOpen) {
        faqItem.classList.add('open');
      } else {
        faqItem.classList.remove('open');
      }
    });
  });
}

// Initialize FAQ when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFAQ);
} else {
  initFAQ();
}


// ========= COUNTER ANIMATION ON SCROLL =========
const counters = document.querySelectorAll('.count');


counters.forEach(counter => {
  counter.textContent = '0';
  let hasAnimated = false;


  const updateCounter = () => {
    const target = +counter.dataset.target;
    const count = +counter.textContent;
    const increment = Math.ceil(target / 200);


    if (count < target) {
      counter.textContent = `${Math.min(count + increment, target)}`;
      requestAnimationFrame(updateCounter); // Smoother than setTimeout
    } else {
      counter.textContent = `${target}+`;
    }
  };


  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        updateCounter();
        observer.unobserve(counter); // Cleanup
      }
    });
  }, { threshold: 0.5 });


  observer.observe(counter);
});


// ========= VOLUNTEER FORM SUBMISSION HANDLING =========
const volunteerForm = document.getElementById('volunteerForm');


if (volunteerForm) {
  volunteerForm.addEventListener('submit', function(e) {
    // FormSubmit will handle the email sending
    // Show a success message to the user
    //This if for the get-involved page that I'm currently working on
    console.log('Volunteer form submitted successfully');
  });
}



document.querySelectorAll('.project-slider-wrapper').forEach(wrapper => {
  const slider = wrapper.querySelector('.project-slider');
  const slides = slider.querySelectorAll('.slide, .slide-projpage');
  const prevBtn = wrapper.querySelector('.prev');
  const nextBtn = wrapper.querySelector('.next');

  let currentIndex = 0;

  function scrollToIndex(index) {
    slides[index].scrollIntoView({
      behavior: 'smooth',
      inline: 'start'
    });
  }

  nextBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    scrollToIndex(currentIndex);
  });

  prevBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    scrollToIndex(currentIndex);
  });
});

