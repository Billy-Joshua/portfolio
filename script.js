document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('#nav-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  });

  // Animate skill bars
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector('div');
        const width = entry.target.getAttribute('data-width');
        bar.style.width = width + '%';
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.skill').forEach(skill => observer.observe(skill));
});

// Dark mode toggle
const themeToggle = document.querySelector('#theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
}

// Scroll to top button
const scrollTopBtn = document.querySelector('#scroll-top');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.style.display = 'block';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Contact form validation
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const message = document.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Here you would typically send the form data to a server
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  });
}

// Project filter
const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project');

if (filterButtons.length > 0 && projects.length > 0) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');

      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      // Filter projects
      projects.forEach(project => {
        if (filter === 'all' || project.classList.contains(filter)) {
          project.style.display = 'block';
        } else {
          project.style.display = 'none';
        }
      });
    });
  });
}

// Typewriter effect for hero text
const typewriterElement = document.querySelector('#typewriter');
if (typewriterElement) {
  const text = typewriterElement.textContent;
  typewriterElement.textContent = '';
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      typewriterElement.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }

  typeWriter();
}

// Animate on scroll
const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  animateOnScroll.observe(el);
});

// Parallax effect
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.parallax');

  parallaxElements.forEach(el => {
    const rate = el.getAttribute('data-rate') || 0.5;
    el.style.transform = `translateY(${scrolled * rate}px)`;
  });
});

// Modal functionality
const modals = document.querySelectorAll('.modal');
const modalTriggers = document.querySelectorAll('[data-modal]');
const modalCloses = document.querySelectorAll('.modal-close');

modalTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const modalId = trigger.getAttribute('data-modal');
    const modal = document.querySelector(`#${modalId}`);
    if (modal) {
      modal.style.display = 'block';
    }
  });
});

modalCloses.forEach(close => {
  close.addEventListener('click', () => {
    close.closest('.modal').style.display = 'none';
  });
});

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
  }
});

// Lazy loading images
const lazyImages = document.querySelectorAll('img[data-src]');

const lazyLoad = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.getAttribute('data-src');
      img.classList.remove('lazy');
      lazyLoad.unobserve(img);
    }
  });
});

lazyImages.forEach(img => lazyLoad.observe(img));

// Progress bar
const progressBar = document.querySelector('#progress-bar');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
}

// Tooltip functionality
const tooltips = document.querySelectorAll('[data-tooltip]');

tooltips.forEach(el => {
  el.addEventListener('mouseenter', (e) => {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = el.getAttribute('data-tooltip');
    document.body.appendChild(tooltip);

    const rect = el.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
  });

  el.addEventListener('mouseleave', () => {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  });
});

// Countdown timer (for launch or something)
const countdownElement = document.querySelector('#countdown');
if (countdownElement) {
  const launchDate = new Date('2025-12-31T00:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = launchDate - now;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
      countdownElement.innerHTML = 'Launched!';
    }
  }

  setInterval(updateCountdown, 1000);
}

// Random quote generator
const quotes = [
  "Code is poetry.",
  "Innovation distinguishes between a leader and a follower.",
  "The best way to predict the future is to create it.",
  "Simplicity is the ultimate sophistication.",
  "First, solve the problem. Then, write the code."
];

const quoteElement = document.querySelector('#random-quote');
if (quoteElement) {
  quoteElement.textContent = quotes[Math.floor(Math.random() * quotes.length)];
}

// Search functionality
const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('#search-results');

if (searchInput && searchResults) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const items = document.querySelectorAll('.searchable');

    searchResults.innerHTML = '';

    items.forEach(item => {
      if (item.textContent.toLowerCase().includes(query)) {
        const result = document.createElement('div');
        result.textContent = item.textContent;
        result.addEventListener('click', () => {
          item.scrollIntoView({ behavior: 'smooth' });
        });
        searchResults.appendChild(result);
      }
    });
  });
}

// Accordion functionality
const accordions = document.querySelectorAll('.accordion');

accordions.forEach(accordion => {
  const header = accordion.querySelector('.accordion-header');
  const content = accordion.querySelector('.accordion-content');

  header.addEventListener('click', () => {
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  });
});

// Tab functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.getAttribute('data-tab');

    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    button.classList.add('active');
    document.querySelector(`#${tabId}`).classList.add('active');
  });
});

// Slider functionality
const sliders = document.querySelectorAll('.slider');

sliders.forEach(slider => {
  const slides = slider.querySelectorAll('.slide');
  const prevBtn = slider.querySelector('.prev');
  const nextBtn = slider.querySelector('.next');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
  }

  showSlide(currentSlide);
});

// Video player controls
const videos = document.querySelectorAll('video');

videos.forEach(video => {
  const playBtn = video.parentElement.querySelector('.play-btn');
  const pauseBtn = video.parentElement.querySelector('.pause-btn');
  const muteBtn = video.parentElement.querySelector('.mute-btn');

  if (playBtn) {
    playBtn.addEventListener('click', () => video.play());
  }

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => video.pause());
  }

  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      muteBtn.textContent = video.muted ? 'Unmute' : 'Mute';
    });
  }
});

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Example usage
// showNotification('Welcome to my portfolio!', 'success');

// Form auto-save
const autoSaveForms = document.querySelectorAll('.auto-save');

autoSaveForms.forEach(form => {
  const inputs = form.querySelectorAll('input, textarea');

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      const data = {};
      inputs.forEach(inp => {
        data[inp.name] = inp.value;
      });
      localStorage.setItem(`form-${form.id}`, JSON.stringify(data));
    });
  });

  // Load saved data
  const savedData = localStorage.getItem(`form-${form.id}`);
  if (savedData) {
    const data = JSON.parse(savedData);
    inputs.forEach(input => {
      if (data[input.name]) {
        input.value = data[input.name];
      }
    });
  }
});

// Infinite scroll
let page = 1;
const loadMoreBtn = document.querySelector('#load-more');

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    page++;
    // Here you would typically fetch more content from a server
    // For demo purposes, we'll just add some dummy content
    const container = document.querySelector('#content-container');
    for (let i = 0; i < 5; i++) {
      const item = document.createElement('div');
      item.className = 'content-item';
      item.textContent = `New item ${page * 5 + i + 1}`;
      container.appendChild(item);
    }
  });
}

// Drag and drop functionality
const dragItems = document.querySelectorAll('.drag-item');
const dropZones = document.querySelectorAll('.drop-zone');

dragItems.forEach(item => {
  item.draggable = true;

  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', item.id);
  });
});

dropZones.forEach(zone => {
  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    const item = document.getElementById(itemId);
    zone.appendChild(item);
  });
});

// Canvas drawing
const canvas = document.querySelector('#drawing-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let drawing = false;

  canvas.addEventListener('mousedown', () => {
    drawing = true;
  });

  canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath();
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  });
}

// WebGL demo (basic)
const webglCanvas = document.querySelector('#webgl-canvas');
if (webglCanvas) {
  const gl = webglCanvas.getContext('webgl');
  if (gl) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
}

// Speech synthesis
const speakBtn = document.querySelector('#speak-btn');
if (speakBtn) {
  speakBtn.addEventListener('click', () => {
    const text = document.querySelector('#text-to-speak').value;
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  });
}

// Geolocation
const locationBtn = document.querySelector('#get-location');
if (locationBtn) {
  locationBtn.addEventListener('click', () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        alert(`Your location: ${lat}, ${lon}`);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  });
}

// WebRTC demo (basic peer connection setup would go here)
// This is complex and would require server-side signaling

// Service Worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW registered'))
      .catch(error => console.log('SW registration failed'));
  });
}

// IndexedDB demo
const dbName = 'PortfolioDB';
const dbVersion = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      db.createObjectStore('visits', { keyPath: 'id', autoIncrement: true });
    };
  });
}

// Usage example
// openDB().then(db => {
  // Perform database operations
// });

// Web Components
class CustomElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<p>This is a custom element!</p>';
  }
}

customElements.define('custom-element', CustomElement);

// Shadow DOM
const shadowHost = document.querySelector('#shadow-host');
if (shadowHost) {
  const shadow = shadowHost.attachShadow({ mode: 'open' });
  shadow.innerHTML = '<style>p { color: red; }</style><p>Shadow DOM content</p>';
}

// CSS-in-JS demo
function applyStyles(element, styles) {
  Object.assign(element.style, styles);
}

// Example
// const el = document.querySelector('#styled-element');
// applyStyles(el, { color: 'blue', fontSize: '20px' });

// Mutation Observer
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    console.log('DOM changed');
  });
});

observer.observe(document.body, { childList: true, subtree: true });

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart);
  });
}

// Battery API
if ('getBattery' in navigator) {
  navigator.getBattery().then(battery => {
    console.log('Battery level:', battery.level * 100 + '%');
  });
}

// Vibration API
const vibrateBtn = document.querySelector('#vibrate-btn');
if (vibrateBtn) {
  vibrateBtn.addEventListener('click', () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(200);
    }
  });
}

// Device orientation
window.addEventListener('deviceorientation', (e) => {
  // Use e.alpha, e.beta, e.gamma for device orientation
});

// Ambient Light Sensor

