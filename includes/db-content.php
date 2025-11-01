<?php
require_once '../database/config.php';

function getArticles($limit = 10) {
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM articles ORDER BY created_at DESC LIMIT ?");
    $stmt->execute([$limit]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function trackVisit($page_url) {
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO analytics (page_url, visitor_ip) VALUES (?, ?)");
    $stmt->execute([$page_url, $_SERVER['REMOTE_ADDR']]);
}
?>