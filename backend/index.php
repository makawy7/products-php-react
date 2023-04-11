<?php
// autoload classes
require_once __DIR__ . '/vendor/autoload.php';

use Abdallah\Scanditask\Router\Router;
use Abdallah\Scanditask\Controllers\ProductController;
use Abdallah\Scanditask\Repositories\ProductRepository;
use Abdallah\Scanditask\Database\DatabaseConnection;

// database connection
$databaseConnection = new DatabaseConnection('localhost', 'scanditask', 'root', '');

// product repository and controller  
$productRepository = new ProductRepository($databaseConnection);
$productController = new ProductController($productRepository);

// set routes
$router = new Router();
$router->addRoute('GET', '#^/api/products$#', [$productController, 'getAllProducts']);
// $router->addRoute('GET', '#^/api/users/(\d+)$#', [ProductController::class, $method]);

// Get the request method and URI
$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

// Dispatch the request
$router->dispatch($method, $uri);
