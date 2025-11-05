// Professional Navbar Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking on non-dropdown nav links only
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      // Only close menu if it's NOT a dropdown parent link
      if (!link.closest('.nav-item').classList.contains('dropdown')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });
}

// Dropdown Menu Toggle for Mobile/Tablet
const dropdownItems = document.querySelectorAll('.nav-item.dropdown');

dropdownItems.forEach(item => {
  const link = item.querySelector('.nav-link');
  
  link.addEventListener('click', (e) => {
    // Only toggle dropdown on mobile and tablet (not desktop)
    if (window.innerWidth < 770) {
      e.preventDefault();
      
      // Close other dropdowns
      dropdownItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current dropdown with smooth animation
      item.classList.toggle('active');
    }
  });
});

// Close dropdowns when clicking dropdown links
document.querySelectorAll('.dropdown-link').forEach(link => {
  link.addEventListener('click', () => {
    dropdownItems.forEach(item => {
      item.classList.remove('active');
    });
    if (hamburger && navMenu) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-item.dropdown') && !e.target.closest('.hamburger')) {
    dropdownItems.forEach(item => {
      item.classList.remove('active');
    });
  }
});

// Remove active class from dropdowns on window resize (tablet/desktop transition)
let previousWidth = window.innerWidth;
window.addEventListener('resize', () => {
  const currentWidth = window.innerWidth;
  
  // Clear dropdowns when crossing the 770px (48.125rem) breakpoint
  if ((previousWidth < 770 && currentWidth >= 770) || 
      (previousWidth >= 770 && currentWidth < 770)) {
    dropdownItems.forEach(item => {
      item.classList.remove('active');
    });
    if (hamburger && navMenu && currentWidth >= 770) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  }
  
  previousWidth = currentWidth;
});

// Hero Slider Initialization
const heroSwiper = new Swiper('.hero-swiper', {
  // Loop through slides infinitely
  loop: true,
  
  // Slide transition effect
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  
  // Transition speed
  speed: 1000,
  
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  
  // Pagination dots
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: false,
  },
  
  // Autoplay settings
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  
  // Keyboard navigation
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  
  // Accessibility
  a11y: {
    prevSlideMessage: 'Previous slide',
    nextSlideMessage: 'Next slide',
    firstSlideMessage: 'This is the first slide',
    lastSlideMessage: 'This is the last slide',
  },
  
  // Responsive breakpoints
  breakpoints: {
    320: {
      spaceBetween: 0,
    },
    768: {
      spaceBetween: 0,
    },
    1024: {
      spaceBetween: 0,
    }
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.service-card, .testimonial');
  
  // Set initial state for animations
  animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
      navbar.style.backdropFilter = 'blur(10px)';
    } else {
      navbar.style.backgroundColor = '#000';
      navbar.style.backdropFilter = 'none';
    }
  }
});

// Loading state management
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// Set initial body opacity for smooth loading
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease';