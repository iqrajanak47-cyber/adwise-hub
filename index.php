<?php
require_once 'includes/db-content.php';
trackVisit($_SERVER['REQUEST_URI']);
$articles = getArticles(5);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Money Advise Hub — Smart Financial Insights. Smarter Decisions.</title>
  <meta name="description" content="Money Advise Hub: expert USA financial advice, American insurance reviews, US loan comparisons, and money management guides for US residents." />
  <link rel="canonical" href="https://moneyadvisehub.com/" />
  <link rel="stylesheet" href="assets/css/style.css">

  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6914004429115810" crossorigin="anonymous"></script>

  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XW1ZYER79Q"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XW1ZYER79Q');
  </script>
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <a class="logo" href="index.php">Money Advise Hub</a>
      <button class="hamburger" onclick="toggleMenu()">☰</button>
      <nav class="main-nav" id="mainNav">
        <a href="posts.html">Posts</a>
        <a href="articles/insurance.html">Insurance</a>
        <a href="articles/loans.html">Loans</a>
        <a href="tools/calculators.html">Calculators</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
      </nav>
    </div>
  </header>

  <main class="container">
    <section class="hero">
      <h1>Money Advise Hub</h1>
      <p><strong>Smart Money Advice. Smarter Financial Decisions.</strong></p>
      <p><em>Your trusted source for USA money advice, American financial planning, and expert US investment guidance</em></p>
    </section>

    <section class="articles-grid">
      <h2>Latest Articles</h2>
      <?php foreach($articles as $article): ?>
      <article class="card">
        <h3><a href="articles/<?= $article['slug'] ?>.html"><?= htmlspecialchars($article['title']) ?></a></h3>
        <p><?= htmlspecialchars($article['meta_description']) ?></p>
        <span class="category"><?= htmlspecialchars($article['category']) ?></span>
      </article>
      <?php endforeach; ?>
    </section>

    <aside class="sidebar">
      <div class="widget newsletter-widget">
        <h3>📧 Daily Briefing</h3>
        <p>Get essential financial news every morning</p>
        <form id="newsletter-form" class="newsletter-form" action="api/newsletter.php" method="POST">
          <input type="email" name="email" placeholder="your.email@domain.com" required>
          <button type="submit">SUBSCRIBE</button>
        </form>
      </div>
    </aside>
  </main>

  <footer class="site-footer">
    <div class="container">
      <p>&copy; 2025 Money Advise Hub. All rights reserved.</p>
    </div>
  </footer>

  <script src="assets/js/main.js" defer></script>
  <script src="assets/js/mobile.js" defer></script>
  <script src="assets/js/database.js" defer></script>
</body>
</html>