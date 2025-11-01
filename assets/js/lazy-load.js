// Lazy loading for images and content
const lazyLoad = {
    init() {
        this.loadImages();
        this.loadScripts();
        this.preloadCritical();
    },

    loadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        images.forEach(img => imageObserver.observe(img));
    },

    loadScripts() {
        // Defer non-critical scripts
        const scripts = [
            'assets/js/animations.js',
            'assets/js/chat.js',
            'assets/js/affiliate-links.js'
        ];

        setTimeout(() => {
            scripts.forEach(src => {
                const script = document.createElement('script');
                script.src = src;
                script.async = true;
                document.head.appendChild(script);
            });
        }, 1000);
    },

    preloadCritical() {
        // Preload critical resources
        const critical = [
            { href: 'assets/css/style.css', as: 'style' },
            { href: 'assets/js/main.js', as: 'script' }
        ];

        critical.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            document.head.appendChild(link);
        });
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => lazyLoad.init());
} else {
    lazyLoad.init();
}