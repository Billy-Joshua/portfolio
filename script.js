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