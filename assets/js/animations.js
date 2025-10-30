// Beautiful scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-slide-in');
    }
  });
}, observerOptions);

// Observe all cards and widgets
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.card, .widget, .calculator-container');
  elements.forEach(el => observer.observe(el));
  
  // Add stagger effect to cards
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
});

// Smooth number counting animation
function animateNumber(element, start, end, duration = 1000) {
  const startTime = performance.now();
  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = start + (end - start) * easeOutQuart(progress);
    element.textContent = '$' + Math.round(current).toLocaleString();
    if (progress < 1) requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}