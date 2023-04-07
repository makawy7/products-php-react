<?php

require_once 'Router.php';

$router = new Router();

// API endpoint: /api/users
$router->addRoute('GET', '#^/api/users$#', function () {
    header('Content-Type: application/json');
    echo json_encode([
        ['id' => 1, 'name' => 'John Doe'],
        ['id' => 2, 'name' => 'Jane Smith'],
    ]);
});

// API endpoint: /api/user/:id
$router->addRoute('GET', '#^/api/user/(\d+)$#', function ($id) {
    header('Content-Type: application/json');
    if ($id == 1) {
        echo json_encode(['id' => 1, 'name' => 'John Doe']);
    } elseif ($id == 2) {
        echo json_encode(['id' => 2, 'name' => 'Jane Smith']);
    } else {
        header("HTTP/1.0 404 Not Found");
        echo json_encode(['error' => 'User not found']);
    }
});

// Get the request method and URI
$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

// Dispatch the request
$router->dispatch($method, $uri);
