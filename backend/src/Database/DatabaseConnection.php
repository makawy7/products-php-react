<?php
namespace Abdallah\Scanditask\Database;
/**
 * class DatabaseConnection
 * 
 * Represents a connection to a MySQL database.
 */
class DatabaseConnection
{
    private $pdo;

    /**
     * DatabaseConnection constructor.
     *
     * @param [string] $host the host name of the database server
     * @param [string] $dbname the name of the database
     * @param [string] $username the username to connect to the database
     * @param [string] $password the password to connect to the database
     */
    public function __construct($host, $dbname, $username, $password)
    {
        try {
            $this->pdo = new \PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        } catch (\PDOException $e) {
            die($e->getMessage());
        }
    }
    /**
     * Returns the PDO object
     *
     * @return \PDO The PDO instance.
     */
    public function getPdo()
    {
        return $this->pdo;
    }
}
