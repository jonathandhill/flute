// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
  // Initialize all functionality
  initNavigation();
  initSmoothScrolling();
  initMobileMenu();
  initTabSwitching();
  initFormHandling();
  initScrollEffects();
  initAnimations();
});

// Navigation functionality
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky navigation on scroll
  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Active navigation highlighting
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', function () {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (
        link.getAttribute('href') === `#${current}` ||
        (current === 'home' && link.getAttribute('href') === '#home')
      ) {
        link.classList.add('active');
      }
    });
  });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    });
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

// Tab switching functionality
function initTabSwitching() {
  const tabButtons = document.querySelectorAll('.tab-btn');

  tabButtons.forEach(button => {
    button.addEventListener('click', function () {
      const tabName = this.getAttribute('data-tab');
      const tabContent = document.getElementById(tabName);
      const tabContainer = this.closest('.media, .setlists');

      // Remove active class from all buttons and content
      tabContainer.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      tabContainer.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });

      // Add active class to clicked button and corresponding content
      this.classList.add('active');
      if (tabContent) {
        tabContent.classList.add('active');
      }
    });
  });
}

// Form handling
function initFormHandling() {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();

        if (result.success) {
          showNotification(
            'Thank you! Your message has been sent successfully.',
            'success'
          );
          contactForm.reset();
        } else {
          showNotification(
            'Oops! Something went wrong. Please try again.',
            'error'
          );
        }
      } catch (error) {
        showNotification('Network error. Please try again later.', 'error');
      }
    });
  }
}

// Scroll effects and animations
function initScrollEffects() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    '.education-item, .performance-card, .media-item, .member-card, .calendar-item, .video-card'
  );
  animateElements.forEach(el => {
    observer.observe(el);
  });

  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', function () {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    });
  }
}

// Animation utilities
function initAnimations() {
  // Add CSS classes for animations
  const style = document.createElement('style');
  style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        .navbar.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 6px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            background: #27ae60;
        }
        
        .notification.error {
            background: #e74c3c;
        }
        
        .image-placeholder,
        .video-placeholder,
        .recording-placeholder {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }
        
        .image-placeholder.animate-in,
        .video-placeholder.animate-in,
        .recording-placeholder.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
  document.head.appendChild(style);
}

// Notification system
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Video placeholder click handlers
function initVideoHandlers() {
  const videoPlaceholders = document.querySelectorAll('.video-placeholder');

  videoPlaceholders.forEach(placeholder => {
    placeholder.addEventListener('click', function () {
      const videoTitle = this.querySelector('p')?.textContent || 'Video';
      showNotification(`Playing: ${videoTitle}`, 'success');
    });
  });
}

// Image gallery functionality
function initImageGallery() {
  const imagePlaceholders = document.querySelectorAll('.image-placeholder');

  imagePlaceholders.forEach(placeholder => {
    placeholder.addEventListener('click', function () {
      const imageTitle = this.querySelector('p')?.textContent || 'Image';
      showNotification(`Viewing: ${imageTitle}`, 'success');
    });
  });
}

// Performance card interactions
function initPerformanceCards() {
  const performanceCards = document.querySelectorAll('.performance-card');

  performanceCards.forEach(card => {
    card.addEventListener('click', function () {
      const title = this.querySelector('h3')?.textContent || 'Performance';
      showNotification(`Viewing details for: ${title}`, 'success');
    });
  });
}

// Calendar item interactions
function initCalendarItems() {
  const calendarItems = document.querySelectorAll('.calendar-item');

  calendarItems.forEach(item => {
    const ticketBtn = item.querySelector('.btn-small');
    if (ticketBtn) {
      ticketBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const eventTitle = item.querySelector('h3')?.textContent || 'Event';
        showNotification(
          `Redirecting to tickets for: ${eventTitle}`,
          'success'
        );
      });
    }
  });
}

// Member card interactions
function initMemberCards() {
  const memberCards = document.querySelectorAll('.member-card');

  memberCards.forEach(card => {
    const socialLinks = card.querySelectorAll('.member-social a');

    socialLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.stopPropagation();
        const memberName = card.querySelector('h3')?.textContent || 'Member';
        const platform = this.querySelector('i').className.includes('instagram')
          ? 'Instagram'
          : 'YouTube';
        showNotification(`Opening ${platform} for ${memberName}`, 'success');
      });
    });
  });
}

// Initialize additional handlers when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  initVideoHandlers();
  initImageGallery();
  initPerformanceCards();
  initCalendarItems();
  initMemberCards();
});

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function () {
  // Any scroll-based functionality can be added here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Keyboard navigation support
document.addEventListener('keydown', function (e) {
  // Escape key to close mobile menu
  if (e.key === 'Escape') {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  }

  // Tab key navigation for accessibility
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

// Mouse navigation detection
document.addEventListener('mousedown', function () {
  document.body.classList.remove('keyboard-navigation');
});

// Preload critical resources
function preloadResources() {
  // Preload fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href =
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
  fontLink.as = 'style';
  document.head.appendChild(fontLink);

  // Preload Font Awesome
  const faLink = document.createElement('link');
  faLink.rel = 'preload';
  faLink.href =
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
  faLink.as = 'style';
  document.head.appendChild(faLink);
}

// Initialize preloading
preloadResources();
