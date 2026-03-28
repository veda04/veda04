<?php

// Database connection
function DBConnect($host, $port, $name, $user, $pass) {
    try {
        $conn = new PDO("mysql:host=$host;dbname=$name", $user, $pass);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch (PDOException $e) {
        echo 'Connection failed: ' . $e->getMessage();
    }
}

// Database query
function DBQuery($conn, $sql) {
    try {
        $stmt = $conn->query($sql);
        return $stmt;
    } catch (PDOException $e) {
        echo 'Query failed: ' . $e->getMessage();
    }
}

// Database fetch
function DBFetch($stmt) {
    try {
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result;
    } catch (PDOException $e) {
        echo 'Fetch failed: ' . $e->getMessage();
    }
}

// Database fetch all
function DBFetchAll($stmt) {
    try {
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    } catch (PDOException $e) {
        echo 'Fetch all failed: ' . $e->getMessage();
    }
}

// Database close
function DBClose($conn) {
    $conn = null;
}