// AdWise Hub - Main JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // Update copyright year
  document.querySelectorAll('[id^="year"]').forEach(el => 
    el.textContent = new Date().getFullYear()
  );

  // Newsletter forms
  const handleNewsletter = (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]')?.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    trackEvent('newsletter_signup', 'engagement');
    alert('Thanks for subscribing! Check your email for confirmation.');
    e.target.reset();
  };
  
  document.querySelectorAll('[id*="newsletter"], .newsletter-form, .footer-newsletter')
    .forEach(form => form.addEventListener('submit', handleNewsletter));

  // Smooth scroll
  document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
      e.preventDefault();
      document.querySelector(e.target.getAttribute('href'))?.scrollIntoView({behavior: 'smooth'});
    }
  });

  // Analytics helper
  const trackEvent = (action, category, label) => {
    try {
      if (typeof gtag !== 'undefined') {
        gtag('event', action, {event_category: category, event_label: label});
      }
    } catch(e) { console.error('Analytics error:', e); }
  };
  
  // Track clicks
  document.addEventListener('click', (e) => {
    if (e.target.matches('.btn, .btn-small')) {
      trackEvent('cta_click', 'engagement', e.target.textContent.trim());
    } else if (e.target.matches('.card a')) {
      trackEvent('article_click', 'content', e.target.textContent.trim());
    }
  });
  
  // Lazy load ads
  if ('IntersectionObserver' in window) {
    const adObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.loaded) {
          entry.target.dataset.loaded = 'true';
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch(e) { console.error('Ad error:', e); }
          adObserver.unobserve(entry.target);
        }
      });
    }, {rootMargin: '50px'});
    
    document.querySelectorAll('.adsbygoogle:not([data-loaded])')
      .forEach(ad => adObserver.observe(ad));
  }
  
  // Performance & Service Worker
  window.addEventListener('load', () => {
    // Track page load time
    const perfData = performance.getEntriesByType?.('navigation')?.[0];
    if (perfData) {
      trackEvent('page_load_time', 'performance', 
        Math.round(perfData.loadEventEnd - perfData.fetchStart));
    }
    
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('SW registered'))
        .catch(e => console.error('SW failed:', e));
    }
  });
});