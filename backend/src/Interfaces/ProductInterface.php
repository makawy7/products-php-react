<?php

namespace Abdallah\Scanditask\Interfaces;

/**
 * Product interface
 * 
 * Represents a product interface.
 */
interface ProductInterface
{
    /**
     * getAllProducts function
     *
     * @return array $products
     */
    public function getAllProducts(): array;

    /**
     * createProduct function
     *
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

    public function createProduct($type, $sku, $name, $price, $size, $weight, $height, $width, $length): array;

    /**
     * deleteProducts function
     *
     * @param [array] $ids
     * @return void
     */

    public function deleteProducts($ids): void;
}
