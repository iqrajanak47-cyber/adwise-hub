// Advise Hub - Enhanced Main JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // Update copyright year
  document.querySelectorAll('[id^="year"]').forEach(el => 
    el.textContent = new Date().getFullYear()
  );

  // Newsletter forms with enhanced validation
  const handleNewsletter = (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]')?.value.trim();
    const button = e.target.querySelector('button');
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }
    
    // Show loading state
    const originalText = button.textContent;
    button.textContent = 'Subscribing...';
    button.disabled = true;
    
    setTimeout(() => {
      trackEvent('newsletter_signup', 'engagement', email.split('@')[1]);
      showNotification('Thanks for subscribing! Check your email for confirmation.', 'success');
      e.target.reset();
      button.textContent = originalText;
      button.disabled = false;
    }, 1500);
  };
  
  document.querySelectorAll('[id*="newsletter"], .newsletter-form, .footer-newsletter')
    .forEach(form => form.addEventListener('submit', handleNewsletter));

  // Enhanced notification system
  const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button onclick="this.parentElement.remove()">&times;</button>
    `;
    notification.style.cssText = `
      position: fixed; top: 20px; right: 20px; z-index: 10000;
      background: ${type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : '#007bff'};
      color: white; padding: 15px 20px; border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2); display: flex;
      align-items: center; gap: 10px; max-width: 300px;
      animation: slideInRight 0.3s ease-out;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
  };

  // Smooth scroll with offset for fixed headers
  document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
      e.preventDefault();
      const target = document.querySelector(e.target.getAttribute('href'));
      if (target) {
        const offset = 80; // Account for fixed header
        const targetPosition = target.offsetTop - offset;
        window.scrollTo({top: targetPosition, behavior: 'smooth'});
      }
    }
  });

  // Enhanced analytics helper
  const trackEvent = (action, category, label, value) => {
    try {
      if (typeof gtag !== 'undefined') {
        gtag('event', action, {
          event_category: category,
          event_label: label,
          value: value,
          custom_parameter: window.location.pathname
        });
      }
      // Also track to console for debugging
      console.log('Event tracked:', {action, category, label, value});
    } catch(e) { console.error('Analytics error:', e); }
  };
  
  // Enhanced click tracking
  document.addEventListener('click', (e) => {
    if (e.target.matches('.btn, .btn-small')) {
      trackEvent('cta_click', 'engagement', e.target.textContent.trim());
    } else if (e.target.matches('.card a, .trending-item')) {
      trackEvent('article_click', 'content', e.target.textContent.trim());
    } else if (e.target.matches('a[href*="calculator"]')) {
      trackEvent('calculator_access', 'tools', e.target.textContent.trim());
    } else if (e.target.matches('a[rel="sponsored"]')) {
      trackEvent('affiliate_click', 'monetization', e.target.href);
    }
  });
  
  // Enhanced lazy loading for ads and images
  if ('IntersectionObserver' in window) {
    const adObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.loaded) {
          entry.target.dataset.loaded = 'true';
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            trackEvent('ad_loaded', 'monetization', entry.target.dataset.adSlot);
          } catch(e) { console.error('Ad error:', e); }
          adObserver.unobserve(entry.target);
        }
      });
    }, {rootMargin: '100px'});
    
    document.querySelectorAll('.adsbygoogle:not([data-loaded])')
      .forEach(ad => adObserver.observe(ad));
      
    // Lazy load images
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });
    
    document.querySelectorAll('img[data-src]')
      .forEach(img => imageObserver.observe(img));
  }
  
  // Performance monitoring and optimization
  window.addEventListener('load', () => {
    // Track Core Web Vitals
    if ('web-vitals' in window) {
      webVitals.getCLS(metric => trackEvent('cls', 'performance', null, metric.value));
      webVitals.getFID(metric => trackEvent('fid', 'performance', null, metric.value));
      webVitals.getLCP(metric => trackEvent('lcp', 'performance', null, metric.value));
    }
    
    // Track page load time
    const perfData = performance.getEntriesByType?.('navigation')?.[0];
    if (perfData) {
      const loadTime = Math.round(perfData.loadEventEnd - perfData.fetchStart);
      trackEvent('page_load_time', 'performance', window.location.pathname, loadTime);
    }
    
    // Register service worker for offline support
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered:', registration.scope);
          trackEvent('sw_registered', 'technical');
        })
        .catch(error => {
          console.error('SW registration failed:', error);
          trackEvent('sw_failed', 'technical', error.message);
        });
    }
  });
  
  // Error tracking
  window.addEventListener('error', (e) => {
    trackEvent('js_error', 'technical', e.message, e.lineno);
  });
  
  // User engagement tracking
  let startTime = Date.now();
  let maxScroll = 0;
  
  window.addEventListener('scroll', () => {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
    }
  });
  
  window.addEventListener('beforeunload', () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000);
    trackEvent('time_on_page', 'engagement', window.location.pathname, timeOnPage);
    trackEvent('scroll_depth', 'engagement', window.location.pathname, maxScroll);
  });
});

// Global functions for HTML onclick handlers
function toggleMenu() {
  const nav = document.getElementById('mainNav');
  nav.classList.toggle('active');
}

// Cookie consent functions
function acceptCookies() {
  localStorage.setItem('cookieConsent', 'accepted');
  document.getElementById('cookieConsent').style.display = 'none';
  trackEvent('cookie_consent', 'privacy', 'accepted');
}

function declineCookies() {
  localStorage.setItem('cookieConsent', 'declined');
  document.getElementById('cookieConsent').style.display = 'none';
  trackEvent('cookie_consent', 'privacy', 'declined');
}

// Show cookie banner if not consented
if (!localStorage.getItem('cookieConsent')) {
  setTimeout(() => {
    const banner = document.getElementById('cookieConsent');
    if (banner) banner.style.display = 'block';
  }, 2000);
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  .notification button {
    background: none; border: none; color: white;
    font-size: 1.2rem; cursor: pointer; padding: 0;
    width: 20px; height: 20px; display: flex;
    align-items: center; justify-content: center;
  }
`;
document.head.appendChild(style);