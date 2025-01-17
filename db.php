<?php
require_once 'config.php';
class ConnectionPool
{
    private $pool = [];
    private $maxConnections;
    private $dsn;
    private $username;
    private $password;
    private $options;

    public function __construct($dsn, $username, $password, $options = [], $maxConnections = 10)
    {
        $this->dsn = $dsn;
        $this->username = $username;
        $this->password = $password;
        $this->options = $options;
        $this->maxConnections = $maxConnections;
    }

    public function getConnection()
    {

        if (!empty($this->pool)) {
            return array_pop($this->pool);
        }

        if (count($this->pool) < $this->maxConnections) {
            return new PDO($this->dsn, $this->username, $this->password, $this->options);
        }

        throw new Exception("Maximum number of connections reached.");
    }

    public function releaseConnection($connection)
    {
        if (count($this->pool) < $this->maxConnections) {
            $this->pool[] = $connection;
        }
    }

    public function getPoolSize()
    {
        return count($this->pool);
    }

    public function execute($con, $sql, $params = [])
    {
        try {
            $stmt = $con->prepare($sql);
            $stmt->execute($params);
            $this->releaseConnection($con);
            return $stmt;
        } catch (PDOException $e) {
            exit('Query execution failed: ' . $e->getMessage());
        }
    }

    public function create($con, $table, $data)
    {
        $columns = implode(',', array_keys($data));
        $values = implode(',', array_fill(0, count($data), '?'));
        $sql = "INSERT INTO $table ($columns) VALUES ($values)";
        $this->execute($con, $sql, array_values($data));
        return $con->lastInsertId();
    }


    public function fetchByIds($con, $col, $table, $id_list, $params = [])
    {
        $ids = explode(',', $id_list);
        $placeholders = implode(',', array_fill(0, count($ids), '?'));
        $sql = "SELECT $col FROM $table WHERE id IN ($placeholders)";
        $stmt = $con->prepare($sql);
        foreach ($ids as $index => $id) {
            $stmt->bindValue($index + 1, trim($id), PDO::PARAM_INT);
        }
        $stmt->execute($params);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $data = [];
        foreach ($results as $row) {
            $data[] = $row[$con];
        }
        return $data;
    }


    public function fetch($con, $table, $conditions = [], $params = [])
    {
        $sql = "SELECT * FROM $table";
        if (!empty($conditions)) {
            $conditionClauses = [];
            foreach ($conditions as $column => $value) {
                $conditionClauses[] = "$column = ?";
                $params[] = $value;
            }
            $sql .= " WHERE " . implode(' AND ', $conditionClauses);
        }
        $sql .= " ORDER BY id desc";
        $stmt = $this->execute($con, $sql, $params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function fetchGroupByData($con, $table, $groupBy = '', $conditions = [], $params = [])
    {
        $sql = "SELECT * FROM $table";
        if (!empty($conditions)) {
            $conditionClauses = [];
            foreach ($conditions as $column => $value) {
                $conditionClauses[] = "$column = ?";
                $params[] = $value;
            }
            $sql .= " WHERE " . implode(' AND ', $conditionClauses);
        }
        if (!empty($groupBy)) {
            $sql .= " GROUP BY $groupBy";
        }
        $sql .= " ORDER BY id desc ";

        $stmt = $this->execute($con, $sql, $params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getLimitData($con, $table,$offset,$end,$key,$order,$conditions = [], $params = [])
    {
        $sql = "SELECT * FROM $table";
        if (!empty($conditions)) {
            $conditionClauses = [];
            foreach ($conditions as $column => $value) {
                $conditionClauses[] = "$column = ?";
                $params[] = $value;
            }
            $sql .= " WHERE " . implode(' AND ', $conditionClauses);
        }

        $sql .= " ORDER BY ".$key.' '.$order;
        
        $sql .= " LIMIT $offset,$end";
        //echo $sql;die;
        $stmt = $this->execute($con, $sql, $params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function delete($con, $table, $conditions = [], $params = [])
    {
        $sql = "DELETE FROM $table";
        if (!empty($conditions)) {
            $conditionClauses = [];
            foreach ($conditions as $column => $value) {
                $conditionClauses[] = "$column = ?";
                $params[] = $value;
            }
            $sql .= " WHERE " . implode(' AND ', $conditionClauses);
        }

        $stmt = $this->execute($con, $sql, $params);
        return true;
    }

    public function update($con, $table, $data, $conditions, $params = [])
    {
        $setClause = implode('=?, ', array_keys($data)) . '=?';
        $sql = "UPDATE $table SET $setClause";

        $conditionClauses = [];
        foreach ($conditions as $column => $value) {
            $conditionClauses[] = "$column = ?";
            $params[] = $value;
        }
        $sql .= " WHERE " . implode(' AND ', $conditionClauses);

        $values = array_merge(array_values($data), $params);
        return $this->execute($con, $sql, $values);
    }

    function exist($con, $email, $table)
    {
        $sql = "SELECT * FROM " . $table . " WHERE email = :email";
        $stmt = $con->prepare($sql);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        if ($stmt->rowCount() >= 1) {
            return true;
        } else {
            return false;
        }
    }
    function numRows($con, $table) {
       if (!preg_match('/^[a-zA-Z0-9_]+$/', $table)) {
            throw new InvalidArgumentException("Invalid table name.");
        }
        $sql = "SELECT COUNT(*) FROM $table";
        $stmt = $con->prepare($sql);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ? intval($row['COUNT(*)']) : false;
    }
    





}


$dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
$username = DB_USER;
$password = DB_PASSWORD;
$options = [
    PDO::ATTR_PERSISTENT => true,
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

$db = new ConnectionPool($dsn, $username, $password, $options);
$con = $db->getConnection();





