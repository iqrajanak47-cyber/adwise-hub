// Schema generators for SEO
const PUBLISHER = {
  "@type": "Organization",
  "name": "AdWise Hub",
  "logo": {
    "@type": "ImageObject",
    "url": "http://localhost/adwise-hub/assets/images/logo.png",
    "width": 200,
    "height": 60
  }
};

function generateArticleSchema(title, description, author, datePublished, url) {
  if (!title || !description || !author || !datePublished || !url) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {"@type": "Person", "name": author},
    "publisher": PUBLISHER,
    "datePublished": datePublished,
    "dateModified": datePublished,
    "mainEntityOfPage": {"@type": "WebPage", "@id": url}
  };
}

function generateReviewSchema(itemName, rating, reviewBody, author) {
  if (!itemName || !rating || !reviewBody || !author) return null;
  
  const numRating = Math.max(1, Math.min(5, parseFloat(rating) || 1));
  
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {"@type": "Product", "name": String(itemName)},
    "reviewRating": {"@type": "Rating", "ratingValue": numRating, "bestRating": 5},
    "reviewBody": String(reviewBody),
    "author": {"@type": "Person", "name": String(author)}
  };
}

// Helper to inject schema into page
function injectSchema(schema) {
  if (!schema) return;
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}