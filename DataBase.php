<?php
function getDbConnection() {
    $hostname = "localhost";
    $username = "root";
    $password = ""; // Change this if your root user has a password
    $database = "nibmaestro"; // Change this to your actual database name
    $port = 3308; // Default MySQL port (change if needed)

    $conn = new mysqli($hostname, $username, $password, $database, $port);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    // else {
    //     echo "Connected successfully"; // Uncomment for debugging
    // }
    
    return $conn; // Return the connection object
}

// Example usage:
// $db = getDbConnection();
?>
