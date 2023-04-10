<?php

class Validator
{
    public static function validateProductData($type, $sku, $name, $price, $size, $weight, $height, $width, $length)
    {
        // Check for missing mandatory parameters
        if (empty($sku) || empty($name) || empty($price)) {
            throw new InvalidArgumentException('Missing mandatory parameter: SKU, Name, and Price are required');
        }

        // Check for valid product type
        $validTypes = ['dvd', 'book', 'furniture'];
        if (!in_array($type, $validTypes)) {
            throw new InvalidArgumentException('Invalid product type: Must be one of ' . implode(', ', $validTypes));
        }

        // Check for product-specific attributes
        switch ($type) {
            case 'dvd':
                if (empty($size)) {
                    throw new InvalidArgumentException('Missing mandatory parameter: Size is required for DVD');
                }
                break;
            case 'book':
                if (empty($weight)) {
                    throw new InvalidArgumentException('Missing mandatory parameter: Weight is required for Book');
                }
                break;
            case 'furniture':
                if (empty($height) || empty($width) || empty($length)) {
                    throw new InvalidArgumentException('Missing mandatory parameter: Height, Width, and Length are required for Furniture');
                }
                break;
        }
    }
}
