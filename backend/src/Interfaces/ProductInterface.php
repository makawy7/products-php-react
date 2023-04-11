<?php

namespace Abdallah\Scanditask\Interfaces;

interface ProductInterface
{
    public function getAllProducts();
    public function createProduct($type, $sku, $name, $price, $size, $weight, $height, $width, $length);
}
