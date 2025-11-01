// Core Web Vitals measurement
function measureWebVitals() {
  // Largest Contentful Paint
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];

  }).observe({entryTypes: ['largest-contentful-paint']});

  // First Input Delay
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {

    }
  }).observe({entryTypes: ['first-input']});

  // Cumulative Layout Shift
  let clsValue = 0;
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;

      }
    }
  }).observe({entryTypes: ['layout-shift']});
}

if (typeof window !== 'undefined') {
  measureWebVitals();
}