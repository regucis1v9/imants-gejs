<?php

include "db.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class Verify extends DB {

    private $rawData;

    public function __construct() {
        parent::__construct();
        $this->rawData = file_get_contents('php://input');
    }

    public function verify() {

        $decodedData = json_decode($this->rawData, true);
        $token = $decodedData['token'];

        $selectToken = "SELECT * FROM `verification` WHERE `token` = '$token'";
        $tokenResult = $this->conn->query($selectToken);

        if ($tokenResult->num_rows === 1) {
            $row = $tokenResult->fetch_assoc();
            $userID = $row['userID'];

            // Update the 'verified' column in the 'users' table
            $updateUser = "UPDATE `users` SET `verified` = 'yes' WHERE `id` = '$userID'";
            $this->conn->query($updateUser);

            // Delete the row from the 'verification' table
            $deleteToken = "DELETE FROM `verification` WHERE `token` = '$token'";
            $deleteResult = $this->conn->query($deleteToken);

            if ($deleteResult) {
                // Successful update and deletion
                echo json_encode(array('success' => true));
            } else {
                // Error in deletion
                echo json_encode(array('success' => false, 'message' => 'Error deleting token'));
            }
        } else {
            // Token not found
            echo json_encode(array('success' => false, 'message' => 'Token not found'));
        }
    }

}

$login = new Verify();

$login->verify();
?>
