<?php
require_once 'includes/db-content.php';
trackVisit($_SERVER['REQUEST_URI']);
$articles = getArticles(5);
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Money Advise Hub — Smart Financial Insights. Smarter Decisions.</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <a class="logo" href="index.html">Money Advise Hub</a>
      <nav class="main-nav">
        <a href="posts.html">Posts</a>
        <a href="articles/insurance.html">Insurance</a>
        <a href="tools/calculators.html">Calculators</a>
      </nav>
    </div>
  </header>

  <main class="container">
    <section class="hero">
      <h1>Money Advise Hub</h1>
      <p>Smart Money Advice. Smarter Financial Decisions.</p>
    </section>

    <section class="articles-grid">
      <?php foreach($articles as $article): ?>
      <article class="card">
        <h2><a href="articles/<?= $article['slug'] ?>.html"><?= htmlspecialchars($article['title']) ?></a></h2>
        <p><?= htmlspecialchars($article['meta_description']) ?></p>
        <span class="category"><?= htmlspecialchars($article['category']) ?></span>
      </article>
      <?php endforeach; ?>
    </section>
  </main>

  <script src="assets/js/main.js"></script>
</body>
</html>