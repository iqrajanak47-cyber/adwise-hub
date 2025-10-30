// Affiliate tracking function
function trackAffiliateClick(service, link) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'affiliate_click', {
      'service': service,
      'link': link
    });
  }
  console.log('Affiliate click:', service, link);
}

// Add affiliate disclosure to all pages
document.addEventListener('DOMContentLoaded', function() {
  const footer = document.querySelector('.site-footer .container');
  if (footer && !footer.querySelector('.affiliate-disclosure')) {
    const disclosure = document.createElement('div');
    disclosure.className = 'affiliate-disclosure';
    disclosure.innerHTML = '<p><strong>Affiliate Disclosure:</strong> AdWise Hub contains affiliate links. We may earn a commission when you click on or make purchases via our affiliate links, at no additional cost to you.</p>';
    footer.insertBefore(disclosure, footer.querySelector('.footer-bottom'));
  }
});