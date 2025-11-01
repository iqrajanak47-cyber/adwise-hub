// Posts management and infinite scroll
let currentPage = 1;
let isLoading = false;
let hasMorePosts = true;

// Sample posts data - in production this would come from your API
const samplePosts = [
    {
        id: 1,
        title: "Best Credit Cards for Americans 2025",
        excerpt: "Discover the top credit cards offering the best rewards, lowest fees, and highest approval rates for US residents.",
        image: "https://via.placeholder.com/400x250/2c5aa0/ffffff?text=Credit+Cards+2025",
        category: "Finance",
        date: "2025-01-15",
        readTime: "5 min read",
        url: "articles/best-credit-cards-2025.html"
    },
    {
        id: 2,
        title: "Personal Loan Rates This Week",
        excerpt: "Current personal loan rates from top lenders, plus tips to qualify for the best rates available.",
        image: "https://via.placeholder.com/400x250/28a745/ffffff?text=Personal+Loans",
        category: "Loans",
        date: "2025-01-14",
        readTime: "4 min read",
        url: "articles/personal-loan-rates.html"
    },
    {
        id: 3,
        title: "Cheapest Car Insurance by State",
        excerpt: "Compare auto insurance rates across all 50 states and find the most affordable coverage options.",
        image: "https://via.placeholder.com/400x250/dc3545/ffffff?text=Car+Insurance",
        category: "Insurance",
        date: "2025-01-13",
        readTime: "6 min read",
        url: "articles/cheapest-car-insurance.html"
    },
    {
        id: 4,
        title: "High Yield Savings Account Comparison",
        excerpt: "The best high-yield savings accounts offering competitive APY rates and minimal fees.",
        image: "https://via.placeholder.com/400x250/17a2b8/ffffff?text=Savings+Accounts",
        category: "Banking",
        date: "2025-01-12",
        readTime: "7 min read",
        url: "articles/high-yield-savings.html"
    },
    {
        id: 5,
        title: "Investment Apps for Beginners",
        excerpt: "Top investment platforms perfect for new investors, with low fees and educational resources.",
        image: "https://via.placeholder.com/400x250/6f42c1/ffffff?text=Investment+Apps",
        category: "Investing",
        date: "2025-01-11",
        readTime: "8 min read",
        url: "articles/investment-apps-beginners.html"
    },
    {
        id: 6,
        title: "Mortgage Refinancing Guide 2025",
        excerpt: "Everything you need to know about refinancing your mortgage to get better rates and terms.",
        image: "https://via.placeholder.com/400x250/fd7e14/ffffff?text=Mortgage+Refinancing",
        category: "Real Estate",
        date: "2025-01-10",
        readTime: "10 min read",
        url: "articles/mortgage-refinancing-guide.html"
    },
    {
        id: 7,
        title: "Small Business Loan Options",
        excerpt: "Comprehensive guide to small business financing options, from SBA loans to alternative lenders.",
        image: "https://via.placeholder.com/400x250/20c997/ffffff?text=Business+Loans",
        category: "Business",
        date: "2025-01-09",
        readTime: "9 min read",
        url: "articles/small-business-loans.html"
    },
    {
        id: 8,
        title: "Tax Deductions You Can Claim",
        excerpt: "Maximize your tax refund with these often-overlooked deductions available to US taxpayers.",
        image: "https://via.placeholder.com/400x250/e83e8c/ffffff?text=Tax+Deductions",
        category: "Taxes",
        date: "2025-01-08",
        readTime: "6 min read",
        url: "articles/tax-deductions-guide.html"
    },
    {
        id: 9,
        title: "Retirement Planning in Your 30s",
        excerpt: "Essential retirement planning strategies for thirty-somethings to build long-term wealth.",
        image: "https://via.placeholder.com/400x250/6610f2/ffffff?text=Retirement+Planning",
        category: "Retirement",
        date: "2025-01-07",
        readTime: "12 min read",
        url: "articles/retirement-planning-30s.html"
    },
    {
        id: 10,
        title: "Emergency Fund Calculator Guide",
        excerpt: "How much should you save for emergencies? Use our calculator and expert tips to find out.",
        image: "https://via.placeholder.com/400x250/198754/ffffff?text=Emergency+Fund",
        category: "Budgeting",
        date: "2025-01-06",
        readTime: "5 min read",
        url: "tools/emergency-fund-calculator.html"
    },
    {
        id: 11,
        title: "Best Online Banks 2025",
        excerpt: "Top-rated online banks offering high interest rates, low fees, and excellent customer service.",
        image: "https://via.placeholder.com/400x250/0d6efd/ffffff?text=Online+Banks",
        category: "Banking",
        date: "2025-01-05",
        readTime: "7 min read",
        url: "articles/best-online-banks.html"
    },
    {
        id: 12,
        title: "Cryptocurrency Investment Guide",
        excerpt: "Beginner's guide to investing in cryptocurrency safely and understanding market risks.",
        image: "https://via.placeholder.com/400x250/f59e0b/ffffff?text=Cryptocurrency",
        category: "Investing",
        date: "2025-01-04",
        readTime: "11 min read",
        url: "articles/cryptocurrency-investment.html"
    },
    {
        id: 13,
        title: "Home Insurance Shopping Tips",
        excerpt: "How to find the best homeowners insurance coverage at competitive rates.",
        image: "https://via.placeholder.com/400x250/ef4444/ffffff?text=Home+Insurance",
        category: "Insurance",
        date: "2025-01-03",
        readTime: "8 min read",
        url: "articles/home-insurance-tips.html"
    },
    {
        id: 14,
        title: "Student Loan Forgiveness Programs",
        excerpt: "Complete guide to federal and state student loan forgiveness programs available in 2025.",
        image: "https://via.placeholder.com/400x250/8b5cf6/ffffff?text=Student+Loans",
        category: "Education",
        date: "2025-01-02",
        readTime: "9 min read",
        url: "articles/student-loan-forgiveness.html"
    },
    {
        id: 15,
        title: "Side Hustle Ideas for Extra Income",
        excerpt: "Proven side hustle ideas to boost your income and achieve financial goals faster.",
        image: "https://via.placeholder.com/400x250/10b981/ffffff?text=Side+Hustles",
        category: "Income",
        date: "2025-01-01",
        readTime: "6 min read",
        url: "articles/side-hustle-ideas.html"
    }
];

// Generate more posts for demonstration
function generateMorePosts(startId, count) {
    const topics = [
        "Budget Planning Strategies", "Debt Consolidation Options", "401k Rollover Guide",
        "Real Estate Investment Tips", "Travel Rewards Credit Cards", "Life Insurance Comparison",
        "Stock Market Analysis", "Freelancer Tax Tips", "College Savings Plans",
        "Medicare Supplement Plans", "Business Credit Cards", "Rental Property Investing",
        "Financial Planning Software", "Identity Theft Protection", "Payday Loan Alternatives"
    ];

    const categories = ["Finance", "Investing", "Insurance", "Banking", "Real Estate", "Business"];
    const colors = ["2c5aa0", "28a745", "dc3545", "17a2b8", "6f42c1", "fd7e14", "20c997"];

    const posts = [];
    for (let i = 0; i < count; i++) {
        const topic = topics[Math.floor(Math.random() * topics.length)];
        const category = categories[Math.floor(Math.random() * categories.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];

        posts.push({
            id: startId + i,
            title: topic,
            excerpt: `Comprehensive guide to ${topic.toLowerCase()} with expert tips and actionable advice for US residents.`,
            image: `https://via.placeholder.com/400x250/${color}/ffffff?text=${encodeURIComponent(topic)}`,
            category: category,
            date: new Date(2024, 11, 31 - i).toISOString().split('T')[0],
            readTime: `${Math.floor(Math.random() * 8) + 4} min read`,
            url: `articles/${topic.toLowerCase().replace(/\s+/g, '-')}.html`
        });
    }
    return posts;
}

// Create post card HTML
function createPostCard(post) {
    return `
        <article class="post-card">
            <div class="post-image">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
                <div class="post-category">${post.category}</div>
            </div>
            <div class="post-content">
                <h2><a href="${post.url}">${post.title}</a></h2>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-meta">
                    <span class="post-date">${formatDate(post.date)}</span>
                    <span class="post-read-time">${post.readTime}</span>
                </div>
            </div>
        </article>
    `;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Load posts for current page
function loadPosts(page = 1) {
    if (isLoading) return;

    isLoading = true;
    const spinner = document.getElementById('loadingSpinner');
    const loadMoreBtn = document.getElementById('loadMoreContainer');

    spinner.style.display = 'block';
    loadMoreBtn.style.display = 'none';

    // Simulate API delay
    setTimeout(() => {
        const postsPerPage = 15;
        const startIndex = (page - 1) * postsPerPage;

        let posts;
        if (page === 1) {
            posts = samplePosts;
        } else {
            posts = generateMorePosts(startIndex + 1, postsPerPage);
        }

        const postsGrid = document.getElementById('postsGrid');

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = createPostCard(post);
            postsGrid.appendChild(postElement.firstElementChild);
        });

        // Check if we have more posts (simulate max 100 posts)
        hasMorePosts = (page * postsPerPage) < 100;

        spinner.style.display = 'none';
        if (hasMorePosts) {
            loadMoreBtn.style.display = 'block';
        }

        isLoading = false;

        // Add scroll animations
        animateNewPosts();

    }, 800);
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

// Initialize posts page
document.addEventListener('DOMContentLoaded', function() {
    loadPosts(1);
    setupInfiniteScroll();
});

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(filterPosts, 300));
    }
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

// Filter posts
function filterPosts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const posts = document.querySelectorAll('.post-card');

    posts.forEach(post => {
        const title = post.querySelector('h2').textContent.toLowerCase();
        const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();

        if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}