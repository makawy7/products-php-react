<?php

namespace Abdallah\Scanditask\Repositories;

use Abdallah\Scanditask\Interfaces\ProductInterface;
use Abdallah\Scanditask\Database\DatabaseConnection;

class ProductRepository implements ProductInterface
{
    private $pdo;

    public function __construct(DatabaseConnection $db)
    {
        $this->pdo = $db->getPdo();
    }
    public function getAllProducts()
    {
        $stmt = $this->pdo->query("
        SELECT 
            products.*,
            dvds.size_mb,
            books.weight_kg,
            furniture.height,
            furniture.width,
            furniture.length
        FROM products
        LEFT JOIN dvds ON products.id = dvds.product_id
        LEFT JOIN books ON products.id = books.product_id
        LEFT JOIN furniture ON products.id = furniture.product_id");

        $products = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        return array_map(function ($product) {
            return array_filter($product, function ($value) {
                return $value !== null;
            });
        }, $products);
    }

    function createProduct($type, $sku, $name, $price, $size, $weight, $height, $width, $length)
    {

        $stmt = $this->pdo->prepare("SELECT * FROM products WHERE sku = :sku");
        $stmt->execute(['sku' => $sku]);
        $existingProduct = $stmt->fetch(\PDO::FETCH_ASSOC);

        if ($existingProduct) {
            throw new \Exception("The SKU '{$sku}' has already been taken.");
        }

        $this->pdo->beginTransaction();

        $stmt = $this->pdo->prepare("
        INSERT INTO products (sku, name, price, type)
        VALUES (:sku, :name, :price, :type)");

        $stmt->execute([
            'sku' => $sku,
            'name' => $name,
            'price' => $price,
            'type' => $type
        ]);

        $productId = $this->pdo->lastInsertId();

        $typeMappings = [
            'dvd' => ['table' => 'dvds', 'attributes' => ['size_mb' => $size]],
            'book' => ['table' => 'books', 'attributes' => ['weight_kg' => $weight]],
            'furniture' => ['table' => 'furniture', 'attributes' => ['height' => $height, 'width' => $width, 'length' => $length]],
        ];

        $mapping = $typeMappings[$type];

        $columns = implode(', ', array_keys($mapping['attributes']));
        $values = ':' . implode(', :', array_keys($mapping['attributes']));
        $sql = "INSERT INTO {$mapping['table']} (product_id, {$columns}) VALUES (:product_id, {$values})";

        $stmt = $this->pdo->prepare($sql);
        $attributes = array_merge(['product_id' => $productId], $mapping['attributes']);
        $stmt->execute($attributes);

        $this->pdo->commit();

        // fetch the created product
        $stmt = $this->pdo->prepare("
            SELECT 
                products.*,
                dvds.size_mb,
                books.weight_kg,
                furniture.height,
                furniture.width,
                furniture.length
            FROM products
            LEFT JOIN dvds ON products.id = dvds.product_id
            LEFT JOIN books ON products.id = books.product_id
            LEFT JOIN furniture ON products.id = furniture.product_id
            WHERE products.id = :product_id");

        $stmt->execute(['product_id' => $productId]);

        $product = $stmt->fetch(\PDO::FETCH_ASSOC);

        return array_filter($product, function ($value) {
            return $value !== null;
        });
    }
}
