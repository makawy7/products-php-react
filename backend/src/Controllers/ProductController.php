<?php

namespace Abdallah\Scanditask\Controllers;

use Abdallah\Scanditask\Interfaces\ProductInterface;

class ProductController
{
    private $productRepository;

    public function __construct(ProductInterface $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function sendJsonResponse($data, $statusCode = 200)
    {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    public function getAllProducts()
    {
        $products = $this->productRepository->getAllProducts();

        if (empty($products)) {
            return $this->sendJsonResponse(['error' => 'No products found'], 404);
        }

        return $this->sendJsonResponse($products);
    }
}
