function toggleMenu() {
  const nav = document.getElementById('mainNav');
  const hamburger = document.querySelector('.hamburger');
  nav.classList.toggle('active');
  hamburger.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
}

// Close menu when clicking outside
document.addEventListener('click', function(e) {
  const nav = document.getElementById('mainNav');
  const hamburger = document.querySelector('.hamburger');
  if (nav && !nav.contains(e.target) && !hamburger.contains(e.target)) {
    nav.classList.remove('active');
    hamburger.innerHTML = '☰';
  }
});

// Close menu when window resizes
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    const nav = document.getElementById('mainNav');
    const hamburger = document.querySelector('.hamburger');
    if (nav) nav.classList.remove('active');
    if (hamburger) hamburger.innerHTML = '☰';
  }
});