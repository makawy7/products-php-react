<?php

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
            if ($method === $route['method'] && preg_match($route['pattern'], $uri, $matches)) {
                array_shift($matches);
                return call_user_func_array($route['callback'], $matches);
            }
        }

        header("HTTP/1.0 404 Not Found");
        echo '404 Not Found';
    }
}
