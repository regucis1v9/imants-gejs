<?php
include "db.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class Logout extends DB {
    private $rawData;

    public function __construct() {
        parent::__construct();
    }

    public function Logout() {
        $username = $_GET['username'];
        $sql = "UPDATE users SET token = '' WHERE username = '$username'";
        $result = $this->conn->query($sql);
    
        if ($result) {
            echo json_encode(array('success' => 'Logout successful'));
        } else {
            echo json_encode(array('error' => 'Failed to update token'));
        }
        
    }
    
}

$Logout = new Logout();

$Logout->Logout();
?>