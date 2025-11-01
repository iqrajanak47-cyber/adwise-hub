<?php
header('Content-Type: application/json');
require_once '../database/config.php';

if ($_POST['email']) {
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    if ($email) {
        $stmt = $pdo->prepare("INSERT IGNORE INTO subscribers (email) VALUES (?)");
        if ($stmt->execute([$email])) {
            echo json_encode(['success' => true, 'message' => 'Subscribed successfully!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Subscription failed']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid email']);
    }
}
?>