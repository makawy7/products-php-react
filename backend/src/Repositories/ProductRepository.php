<?php

namespace Abdallah\Scanditask\Repositories;

use Abdallah\Scanditask\Interfaces\ProductInterface;
use Abdallah\Scanditask\Database\DatabaseConnection;

/**
 * class ProductRepository
 * 
 * Represents a repository for products.
 */
class ProductRepository implements ProductInterface
{
    /**
     * @var \PDO The PDO instance.
     */
    private $pdo;

    /**
     * ProductRepository constructor
     *
     * @param DatabaseConnection $db
     */
    public function __construct(DatabaseConnection $db)
    {
        $this->pdo = $db->getPdo();
    }

    /**
     * getAllProducts function
     * retrieves all products from the database
     * @return array $products
     */

    public function getAllProducts(): array
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

    /**
     * createProduct function
     * creates a new product in the database
     * @param [string] $type
     * @param [string] $sku
     * @param [string] $name
     * @param [float] $price
     * @param [float] $size
     * @param [float] $weight
     * @param [float] $height
     * @param [float] $width
     * @param [float] $length
     * @return array $product
     */

    function createProduct($type, $sku, $name, $price, $size, $weight, $height, $width, $length): array
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

    /**
     * deleteProducts function
     * deletes products from the database
     * @param [array] $ids
     * @return void
     */

    public function deleteProducts($ids): void
    {
        $ids = array_map(function ($id) {
            return (int) $id;
        }, $ids);

        $ids = implode(', ', $ids);

        $this->pdo->beginTransaction();

        $stmt = $this->pdo->prepare("DELETE FROM products WHERE id IN ({$ids})");
        $stmt->execute();

        $stmt = $this->pdo->prepare("DELETE FROM dvds WHERE product_id IN ({$ids})");
        $stmt->execute();

        $stmt = $this->pdo->prepare("DELETE FROM books WHERE product_id IN ({$ids})");
        $stmt->execute();

        $stmt = $this->pdo->prepare("DELETE FROM furniture WHERE product_id IN ({$ids})");
        $stmt->execute();

        $this->pdo->commit();
    }
}
