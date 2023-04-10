<?php
require_once 'Router.php';

function registerRoutes(Router $router)
{
    $router->addRoute('GET', '#^/api/users$#', function () {
        echo "Hello World";
    });

    $router->addRoute('GET', '#^/api/users/(\d+)$#', function ($id) {
        echo "Hello user $id";
    });
}
