<?php

/**
 * index.php
 * 
 * The entry point of the application.
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// autoload classes
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config.php';

use Abdallah\Scanditask\Router\Router;
use Abdallah\Scanditask\Controllers\ProductController;
use Abdallah\Scanditask\Repositories\ProductRepository;
use Abdallah\Scanditask\Database\DatabaseConnection;

// database connection
$dbHost = isset($dotenv['DB_HOST']) ? $dotenv['DB_HOST'] : 'localhost';
$dbName = isset($dotenv['DB_NAME']) ? $dotenv['DB_NAME'] : 'scanditask';
$dbUser = isset($dotenv['DB_USER']) ? $dotenv['DB_USER'] : 'root';
$dbPassword = isset($dotenv['DB_PASSWORD']) ? $dotenv['DB_PASSWORD'] : '';
$databaseConnection = new DatabaseConnection($dbHost, $dbName, $dbUser, $dbPassword);

// product repository and controller  
$productRepository = new ProductRepository($databaseConnection);
$productController = new ProductController($productRepository);

// set routes
$router = new Router();
$router->addRoute('GET', '#^/api/products$#', [$productController, 'getAllProducts']);
$router->addRoute('POST', '#^/api/product/create$#', [$productController, 'createProduct']);
$router->addRoute('DELETE', '#^/api/products/delete$#', [$productController, 'deleteProducts']);

// get the request method and URI
$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

// handle preflight request
if ($method === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// dispatch the request
$router->dispatch($method, $uri);
