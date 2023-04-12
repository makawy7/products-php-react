<?php

namespace Abdallah\Scanditask\Controllers;

use Abdallah\Scanditask\Interfaces\ProductInterface;
use Abdallah\Scanditask\Validators\Validator;

/**
 * ProductController class
 * 
 * Represents a controller for products.
 */
class ProductController
{
    /**
     * @var ProductInterface $productRepository An instance of a class that implements ProductInterface
     */
    private ProductInterface $productRepository;

    /**
     * ProductController constructor
     *
     * @param ProductInterface $productRepository An instance of a class that implements ProductInterface
     */
    public function __construct(ProductInterface $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    /**
     * sendJsonResponse function
     * Sends a JSON response with the provided data and status code
     *
     * @param array $data The data to be encoded to JSON
     * @param int $statusCode The HTTP status code of the response (default: 200)
     * @return void
     */

    public function sendJsonResponse($data, $statusCode = 200): void
    {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    /**
     * getAllProducts function
     * Retrieves all products and returns a JSON response
     * @return void
     */

    public function getAllProducts(): void
    {
        $products = $this->productRepository->getAllProducts();

        if (empty($products)) {
            $this->sendJsonResponse(['error' => 'No products found'], 404);
        }

        $this->sendJsonResponse($products);
    }

    /**
     * createProduct function
     * Creates a new product and returns a JSON response
     *
     * @return void
     */

    public function createProduct(): void
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
                $productName = $product['name'];
                $this->sendJsonResponse(['success' => "Product $productName has been created."], 201);
            } catch (\Exception $e) {
                // SKU already exists
                $this->sendJsonResponse(['error' => $e->getMessage()], 400);
            }
        } catch (\InvalidArgumentException $e) {
            // invalid inputs
            $this->sendJsonResponse(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * deleteProducts function
     * Deletes products and returns a JSON response
     *
     * @return void
     */
    public function deleteProducts()
    {
        $inputData = json_decode(file_get_contents('php://input'), true);
        // get inputs
        $ids = $inputData['ids'] ?? null;

        try {
            // validate inputs
            Validator::validateIds($ids);
            $this->productRepository->deleteProducts($ids);
            $this->sendJsonResponse(['success' => 'Products have been deleted.', 200]);
        } catch (\InvalidArgumentException $e) {
            // invalid inputs
            $this->sendJsonResponse(['error' => $e->getMessage()], 400);
        }
    }
}
