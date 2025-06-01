<?php
// Show errors for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Get form data
$name = $_POST['name'] ?? '';
$title = $_POST['title'] ?? '';
$message = $_POST['message'] ?? '';

file_put_contents("log.txt", print_r($_POST, true), FILE_APPEND);

// Validate
if (!$name || !$message) {
    http_response_code(400);
    echo "Name and message are required.";
    exit;
}

// Connect to DB (adjust credentials if needed)
$conn = new mysqli("localhost", "root", "", "mochang");

if ($conn->connect_error) {
    http_response_code(500);
    echo "DB connection failed: " . $conn->connect_error;
    exit;
}

$stmt = $conn->prepare("INSERT INTO testimonials (name, title, message) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $title, $message);

header('Content-Type: application/json');

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to insert testimonial."]);
}


$stmt->close();
$conn->close();
?>
