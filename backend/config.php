<?php

// Load environment variables
$dotenv = [];
if (file_exists(__DIR__ . '/.env')) {
    $dotenv = array_reduce(
        array_filter(
            explode(PHP_EOL, file_get_contents(__DIR__ . '/.env'))
        ),
        function ($result, $line) {
            list($key, $value) = explode('=', $line, 2);
            $result[$key] = $value;
            return $result;
        },
        []
    );
}
