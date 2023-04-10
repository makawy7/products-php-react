<?php

require_once 'Router/Router.php';
require_once 'Router/routes.php';

$router = new Router();

registerRoutes($router);

// Get the request method and URI
$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

// Dispatch the request
$router->dispatch($method, $uri);
