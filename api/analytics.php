<?php
header('Content-Type: application/json');
require_once '../database/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $pdo->prepare("INSERT INTO analytics (page_url, visitor_ip, referrer) VALUES (?, ?, ?)");
    $stmt->execute([$data['page_url'], $_SERVER['REMOTE_ADDR'], $data['referrer']]);
    echo json_encode(['success' => true]);
}
?>