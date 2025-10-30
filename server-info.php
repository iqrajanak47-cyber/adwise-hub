<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>AdWise Hub - Development Server</title>
    <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{font:16px Arial,sans-serif;background:#f8fafc;padding:20px}
        .container{max-width:900px;margin:0 auto;background:#fff;padding:30px;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,.1)}
        h1{color:#dc3545;margin-bottom:20px;font-size:1.8rem}
        .info{background:#f0f9ff;padding:15px;border-radius:6px;margin:20px 0;border-left:4px solid #dc3545}
        .links{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:15px;margin:20px 0}
        .link-card{background:#f8fafc;padding:15px;border-radius:6px;border-left:4px solid #dc3545;transition:transform .2s}
        .link-card:hover{transform:translateY(-2px)}
        .link-card a{color:#dc3545;text-decoration:none;font-weight:bold;font-size:1.1rem}
        .link-card a:hover{color:#000}
        .link-card p{margin-top:5px;color:#666;font-size:.9rem}
        .status{color:#28a745;font-weight:bold}
        @media(max-width:600px){.container{padding:15px}.links{grid-template-columns:1fr}}
    </style>
</head>
<body>
    <div class="container">
        <h1>📰 AdWise Hub - Development Server</h1>
        
        <div class="info">
            <p><strong>Status:</strong> <span class="status">✅ Running</span> | 
            <strong>Time:</strong> <?= date('M j, Y - H:i:s') ?> | 
            <strong>PHP:</strong> <?= phpversion() ?></p>
            <p><strong>URL:</strong> <code>http://localhost/adwise-hub/</code></p>
        </div>

        <h2>📄 Site Navigation</h2>
        <div class="links">
            <?php
            $pages = [
                ['index.html', '🏠 Homepage', 'Main newspaper-style landing page'],
                ['articles/insurance.html', '🛡️ Insurance', 'Insurance guides & comparisons'],
                ['articles/loans.html', '💰 Loans', 'Personal & business loan info'],
                ['articles/hosting.html', '🌐 Hosting', 'Web hosting reviews & guides'],
                ['reviews/hosting-reviews.html', '⭐ Reviews', 'Product & service reviews'],
                ['compare/hosting-compare.html', '📊 Compare', 'Side-by-side comparisons'],
                ['tools/mortgage-calculator.html', '🏠 Mortgage Calc', 'Monthly payment calculator'],
                ['tools/emi-calculator.html', '💰 EMI Calculator', 'Loan EMI calculator'],
                ['sitemap.html', '🗺️ All Pages', 'Complete site map']
            ];
            
            foreach($pages as [$url, $title, $desc]) {
                echo "<div class='link-card'><a href='$url'>$title</a><p>$desc</p></div>";
            }
            ?>
        </div>

        <div class="info">
            <h3>🔧 Features</h3>
            <p>✅ Newspaper theme • ✅ AdSense ready • ✅ Mobile responsive • ✅ SEO optimized • ✅ PWA enabled</p>
        </div>
    </div>
</body>
</html>