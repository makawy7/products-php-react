<?php

namespace Abdallah\Scanditask\Controllers;

use Abdallah\Scanditask\Interfaces\ProductInterface;
use Abdallah\Scanditask\Validators\Validator;

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

    public function createProduct()
    {
        $inputData = json_decode(file_get_contents('php://input'), true);
        // get inputs
        $type = $inputData['type'] ?? null;
        $sku = $inputData['sku'] ?? null;
        $name = $inputData['name'] ?? null;
        $price = $inputData['price'] ?? null;
        $size = $inputData['size'] ?? null;
        $weight = $inputData['weight'] ?? null;
        $height = $inputData['height'] ?? null;
        $width = $inputData['width'] ?? null;
        $length = $inputData['length'] ?? null;

        try {
            // validate inputs
            Validator::validateProductData($type, $sku, $name, $price, $size, $weight, $height, $width, $length);
            try {
                $product = $this->productRepository->createProduct($type, $sku, $name, $price, $size, $weight, $height, $width, $length);
                return $this->sendJsonResponse($product, 201);
            } catch (\Exception $e) {
                // SKU already exists
                return $this->sendJsonResponse(['error' => $e->getMessage()], 400);
            }
        } catch (\InvalidArgumentException $e) {
            // invalid inputs
            return $this->sendJsonResponse(['error' => $e->getMessage()], 400);
        }
    }
}
