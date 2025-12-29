// Basic theme functionality
document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.header__nav');
  
  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
    });
  }

  // Product image gallery
  const thumbnails = document.querySelectorAll('[data-thumbnail]');
  const mainImage = document.querySelector('[data-main-image]');
  
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', function() {
      if (mainImage) {
        mainImage.src = this.src.replace('150x150', '600x600');
        
        // Update active thumbnail
        thumbnails.forEach(t => t.style.border = '2px solid transparent');
        this.style.border = '2px solid var(--color-primary)';
      }
    });
  });

  // Cart quantity updates
  const quantityInputs = document.querySelectorAll('input[name="updates[]"]');
  
  quantityInputs.forEach(input => {
    input.addEventListener('change', function() {
      if (this.value === '0') {
        if (confirm('Remove this item from cart?')) {
          this.closest('form').submit();
        } else {
          this.value = this.getAttribute('data-original-value') || '1';
        }
      }
    });
    
    // Store original value
    input.setAttribute('data-original-value', input.value);
  });

  // Add to cart form handling
  const addToCartForms = document.querySelectorAll('form[action="/cart/add"]');
  
  addToCartForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const button = this.querySelector('button[type="submit"]');
      if (button) {
        button.innerHTML = 'Adding...';
        button.disabled = true;
        
        // Re-enable after 2 seconds in case of issues
        setTimeout(() => {
          button.innerHTML = 'Add to Cart';
          button.disabled = false;
        }, 2000);
      }
    });
  });

  // Newsletter form handling
  const newsletterForms = document.querySelectorAll('form[action*="contact"]');
  
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const email = this.querySelector('input[type="email"]');
      if (email && !email.value.includes('@')) {
        e.preventDefault();
        alert('Please enter a valid email address');
        email.focus();
      }
    });
  });

  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Basic accessibility improvements
  const buttons = document.querySelectorAll('button, .button');
  
  buttons.forEach(button => {
    button.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

});

// Utility functions
function showLoading(element) {
  const overlay = document.createElement('div');
  overlay.className = 'loading-overlay';
  overlay.innerHTML = '<div class="spinner"></div>';
  element.style.position = 'relative';
  element.appendChild(overlay);
}

function hideLoading(element) {
  const overlay = element.querySelector('.loading-overlay');
  if (overlay) {
    overlay.remove();
  }
}