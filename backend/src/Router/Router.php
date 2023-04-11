<?php

namespace Abdallah\Scanditask\Router;

/**
 * Router class
 * 
 * Represents a router.
 */
class Router
{
    /**
     * The array of routes that have been added to the router.
     *
     * @var array
     */
    private $routes = [];

    /**
     * Adds a new route to the router.
     *
     * @param string $method The HTTP method (e.g. GET, POST)
     * @param string $pattern The URI pattern to match (e.g. /api/products)
     * @param callable $callback The callback function to call when the route is matched
     * @return void
     */

    public function addRoute($method, $pattern, $callback): void
    {
        $this->routes[] = [
            'method' => $method,
            'pattern' => $pattern,
            'callback' => $callback,
        ];
    }

    /**
     * Dispatches the current HTTP request to the appropriate callback function based on the HTTP method and URI pattern.
     *
     * @param string $method The HTTP method (e.g. GET, POST)
     * @param string $uri The URI of the current request
     * @return void
     */
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
