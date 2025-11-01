// Database integration JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            
            fetch('api/newsletter.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Successfully subscribed!');
                    this.reset();
                } else {
                    alert(data.message);
                }
            });
        });
    }
    
    // Track page views
    fetch('api/analytics.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            page_url: window.location.pathname,
            referrer: document.referrer
        })
    });
});