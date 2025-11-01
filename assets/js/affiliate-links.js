// Affiliate Links Management
document.addEventListener('DOMContentLoaded', function() {
    // Track affiliate link clicks
    const affiliateLinks = document.querySelectorAll('a[rel="sponsored"]');

    affiliateLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track click event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'affiliate',
                    'event_label': this.href,
                    'value': 1
                });
            }

        });
    });

    // Add affiliate disclosure to sponsored links
    affiliateLinks.forEach(link => {
        if (!link.querySelector('.affiliate-badge')) {
            const badge = document.createElement('span');
            badge.className = 'affiliate-badge';
            badge.textContent = 'Ad';
            badge.style.cssText = 'background:#ffc107;color:#000;padding:2px 6px;border-radius:3px;font-size:0.7rem;margin-left:5px;';
            link.appendChild(badge);
        }
    });
});