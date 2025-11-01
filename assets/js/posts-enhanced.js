// Enhanced posts with search, filters, and infinite scroll
let currentPage = 1;
let isLoading = false;
let hasMorePosts = true;
let currentFilter = 'all';
let allPosts = [];

// Enhanced posts data with more variety
const generatePosts = (count = 100) => {
    const topics = [
        "Best Credit Cards for Americans", "Personal Loan Rates", "Cheapest Car Insurance",
        "High Yield Savings Accounts", "Investment Apps for Beginners", "Mortgage Refinancing Guide",
        "Small Business Loan Options", "Tax Deductions Guide", "Retirement Planning Tips",
        "Emergency Fund Calculator", "Best Online Banks", "Cryptocurrency Investment",
        "Home Insurance Shopping", "Student Loan Forgiveness", "Side Hustle Ideas",
        "Budget Planning Strategies", "Debt Consolidation Options", "401k Rollover Guide",
        "Real Estate Investment", "Travel Rewards Cards", "Life Insurance Comparison",
        "Stock Market Analysis", "Freelancer Tax Tips", "College Savings Plans",
        "Medicare Supplement Plans", "Business Credit Cards", "Rental Property Investing",
        "Financial Planning Software", "Identity Theft Protection", "Payday Loan Alternatives"
    ];

    const categories = ["Finance", "Investing", "Insurance", "Banking", "Real Estate", "Business", "Taxes", "Retirement"];
    const colors = ["2c5aa0", "28a745", "dc3545", "17a2b8", "6f42c1", "fd7e14", "20c997", "e83e8c"];

    const posts = [];
    for (let i = 1; i <= count; i++) {
        const topic = topics[Math.floor(Math.random() * topics.length)];
        const category = categories[Math.floor(Math.random() * categories.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const year = Math.random() > 0.7 ? " 2025" : "";

        posts.push({
            id: i,
            title: `${topic}${year}`,
            excerpt: `Comprehensive guide to ${topic.toLowerCase()} with expert tips and actionable advice for US residents. Learn the best strategies and avoid common mistakes.`,
            image: `https://via.placeholder.com/400x250/${color}/ffffff?text=${encodeURIComponent(topic)}`,
            category: category,
            date: new Date(2025, 0, Math.floor(Math.random() * 15) + 1).toISOString().split('T')[0],
            readTime: `${Math.floor(Math.random() * 8) + 4} min read`,
            url: `articles/${topic.toLowerCase().replace(/\s+/g, '-')}.html`,
            views: Math.floor(Math.random() * 10000) + 500,
            likes: Math.floor(Math.random() * 500) + 50
        });
    }
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Initialize posts
allPosts = generatePosts(100);

// Create enhanced post card
function createPostCard(post) {
    return `
        <article class="post-card" data-category="${post.category}">
            <div class="post-image">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
                <div class="post-category">${post.category}</div>
                <div class="post-stats">
                    <span>👁 ${formatNumber(post.views)}</span>
                    <span>❤️ ${post.likes}</span>
                </div>
            </div>
            <div class="post-content">
                <h2><a href="${post.url}">${post.title}</a></h2>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-meta">
                    <span class="post-date">${formatDate(post.date)}</span>
                    <span class="post-read-time">${post.readTime}</span>
                </div>
                <div class="post-actions">
                    <button class="action-btn" onclick="likePost(${post.id})">
                        <span>❤️</span> Like
                    </button>
                    <button class="action-btn" onclick="sharePost('${post.title}', '${post.url}')">
                        <span>📤</span> Share
                    </button>
                    <button class="action-btn" onclick="bookmarkPost(${post.id})">
                        <span>🔖</span> Save
                    </button>
                </div>
            </div>
        </article>
    `;
}

// Format numbers
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Load posts with filtering
function loadPosts(page = 1, reset = false) {
    if (isLoading) return;

    isLoading = true;
    const spinner = document.getElementById('loadingSpinner');
    const loadMoreBtn = document.getElementById('loadMoreContainer');

    spinner.style.display = 'block';
    loadMoreBtn.style.display = 'none';

    setTimeout(() => {
        const postsPerPage = 15;
        const startIndex = (page - 1) * postsPerPage;

        // Filter posts
        let filteredPosts = currentFilter === 'all'
            ? allPosts
            : allPosts.filter(post => post.category === currentFilter);

        const posts = filteredPosts.slice(startIndex, startIndex + postsPerPage);
        const postsGrid = document.getElementById('postsGrid');

        if (reset) {
            postsGrid.innerHTML = '';
        }

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = createPostCard(post);
            postsGrid.appendChild(postElement.firstElementChild);
        });

        // Check if we have more posts
        hasMorePosts = (startIndex + postsPerPage) < filteredPosts.length;

        spinner.style.display = 'none';
        if (hasMorePosts) {
            loadMoreBtn.style.display = 'block';
        }

        isLoading = false;
        animateNewPosts();

    }, 500);
}

// Filter by category
function filterByCategory(category) {
    currentFilter = category;
    currentPage = 1;
    hasMorePosts = true;

    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    loadPosts(1, true);
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(searchPosts, 300));
    }
}

// Search posts
function searchPosts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const posts = document.querySelectorAll('.post-card');

    posts.forEach(post => {
        const title = post.querySelector('h2').textContent.toLowerCase();
        const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
        const category = post.dataset.category.toLowerCase();

        if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
            post.style.display = 'block';
            post.style.opacity = '1';
        } else {
            post.style.display = 'none';
        }
    });
}

// Post actions
function likePost(postId) {
    const post = allPosts.find(p => p.id === postId);
    if (post) {
        post.likes++;
        // Update UI
        const postCard = document.querySelector(`[data-category] .post-stats span:last-child`);
        // In a real app, you'd update the specific post

    }
}

function sharePost(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: window.location.origin + '/' + url
        });
    } else {
        // Fallback
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.origin + '/' + url)}`;
        window.open(shareUrl, '_blank');
    }
}

function bookmarkPost(postId) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    if (!bookmarks.includes(postId)) {
        bookmarks.push(postId);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }
}

// Load more posts
function loadMorePosts() {
    currentPage++;
    loadPosts(currentPage);
}

// Animate new posts
function animateNewPosts() {
    const posts = document.querySelectorAll('.post-card:not(.animated)');
    posts.forEach((post, index) => {
        post.classList.add('animated');
        setTimeout(() => {
            post.style.opacity = '1';
            post.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Infinite scroll
function setupInfiniteScroll() {
    window.addEventListener('scroll', () => {
        if (isLoading || !hasMorePosts) return;

        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= docHeight - 1000) {
            loadMorePosts();
        }
    });
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadPosts(1);
    setupInfiniteScroll();
    setupSearch();
});