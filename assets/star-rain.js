// Star Rain Effect
(function() {
  'use strict';

  const STAR_COUNT = 30;
  const MIN_DURATION = 8;
  const MAX_DURATION = 15;

  function createStarRain() {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Create container
    const container = document.createElement('div');
    container.className = 'star-rain-container';
    container.setAttribute('aria-hidden', 'true');

    // Create stars
    for (let i = 0; i < STAR_COUNT; i++) {
      const star = document.createElement('div');
      const size = Math.random();
      
      // Assign size class
      if (size < 0.3) {
        star.className = 'star star--small';
      } else if (size > 0.8) {
        star.className = 'star star--large';
      } else {
        star.className = 'star';
      }

      // Add twinkle to some stars
      if (Math.random() > 0.7) {
        star.classList.add('star--twinkle');
      }

      // Random position
      star.style.left = Math.random() * 100 + '%';
      
      // Random animation duration
      const duration = MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION);
      star.style.animationDuration = duration + 's';
      
      // Random delay for staggered effect
      star.style.animationDelay = Math.random() * MAX_DURATION + 's';

      container.appendChild(star);
    }

    // Insert at beginning of body
    document.body.insertBefore(container, document.body.firstChild);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createStarRain);
  } else {
    createStarRain();
  }
})();
