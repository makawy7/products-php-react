<?php


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

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    function createProduct($type, $sku, $name, $price, $size, $weight, $height, $width, $length)
    {
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

        switch ($type) {
            case 'dvd':
                $stmt = $this->pdo->prepare("
                INSERT INTO dvds (product_id, size_mb)
                VALUES (:product_id, :size_mb)");

                $stmt->execute([
                    'product_id' => $productId,
                    'size_mb' => $size
                ]);
                break;
            case 'book':
                $stmt = $this->pdo->prepare("
                INSERT INTO books (product_id, weight_kg)
                VALUES (:product_id, :weight_kg)");

                $stmt->execute([
                    'product_id' => $productId,
                    'weight_kg' => $weight
                ]);
                break;
            case 'furniture':
                $stmt = $this->pdo->prepare("
                INSERT INTO furniture (product_id, height, width, length)
                VALUES (:product_id, :height, :width, :length)");

                $stmt->execute([
                    'product_id' => $productId,
                    'height' => $height,
                    'width' => $width,
                    'length' => $length
                ]);
                break;
        }

        $this->pdo->commit();
    }
}
