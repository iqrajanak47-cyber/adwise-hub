<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$api_key = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
$valid_key = 'Bearer mah-api-key-2025';

if ($api_key !== $valid_key) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

$required = ['title', 'content', 'category', 'source'];
foreach ($required as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Missing field: $field"]);
        exit;
    }
}

$slug = strtolower(preg_replace('/[^a-zA-Z0-9]+/', '-', $input['title']));
$filename = "../articles/" . date('Y-m-d') . "-" . $slug . ".html";

$html = "<!doctype html>
<html lang=\"en-US\">
<head>
  <meta charset=\"utf-8\">
  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">
  <title>{$input['title']} - Money Advise Hub</title>
  <meta name=\"description\" content=\"" . substr(strip_tags($input['content']), 0, 160) . "\">
  <link rel=\"canonical\" href=\"https://moneyadvisehub.com/articles/" . basename($filename) . "\">
  <link rel=\"stylesheet\" href=\"../assets/css/style.css\">
</head>
<body>
  <header class=\"site-header\">
    <div class=\"container header-inner\">
      <a class=\"logo\" href=\"../index.html\">Money Advise Hub</a>
      <nav class=\"main-nav\">
        <a href=\"../index.html\">Home</a>
        <a href=\"../about.html\">About</a>
        <a href=\"../contact.html\">Contact</a>
      </nav>
    </div>
  </header>

  <main class=\"container article-style\">
    <article>
      <div class=\"breadcrumb\">
        <a href=\"../index.html\">Home</a> > <a href=\"../articles/\">Articles</a> > {$input['title']}
      </div>
      
      <h1>{$input['title']}</h1>
      
      <div class=\"article-meta\">
        <span class=\"byline\">Financial Editor</span>
        <span class=\"date\">" . date('F j, Y') . "</span>
        <span class=\"category\">{$input['category']}</span>
        <span class=\"source\">Source: {$input['source']}</span>
      </div>
      
      <div class=\"article-content\">
        {$input['content']}
      </div>
      
      <div class=\"affiliate-disclosure\">
        <p><strong>Disclosure:</strong> This article may contain affiliate links. We may earn a commission from qualifying purchases.</p>
      </div>
    </article>
  </main>
  
  <script src=\"../assets/js/main.js\"></script>
</body>
</html>";

if (file_put_contents($filename, $html)) {
    echo json_encode([
        'success' => true,
        'filename' => basename($filename),
        'url' => "https://moneyadvisehub.com/articles/" . basename($filename)
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save file']);
}
?>