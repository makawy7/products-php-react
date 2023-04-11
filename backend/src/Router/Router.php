<?php

namespace Abdallah\Scanditask\Router;

class Router
{
    private $routes = [];

    public function addRoute($method, $pattern, $callback)
    {
        $this->routes[] = [
            'method' => $method,
            'pattern' => $pattern,
            'callback' => $callback,
        ];
    }

    public function dispatch($method, $uri)
    {
        foreach ($this->routes as $route) {
            if ($route['method'] == $method && preg_match($route['pattern'], $uri, $matches)) {
                array_shift($matches);
                call_user_func_array($route['callback'], $matches);
                return;
            }
        }

        header("HTTP/1.0 404 Not Found");
        echo 'Not found';
    }
}
