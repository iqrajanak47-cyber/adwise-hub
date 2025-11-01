<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once 'database/config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM articles ORDER BY created_at DESC");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("INSERT INTO articles (title, slug, content, meta_description, category) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$data['title'], $data['slug'], $data['content'], $data['meta_description'], $data['category']]);
        echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
        break;
}
?>