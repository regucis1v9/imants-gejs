<?php

include "db.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class Login extends DB{
    private $rawData;
    public function __construct() {
        parent::__construct();
        $this->rawData = file_get_contents('php://input');
    }

    public function loginData(){

            $decodedData = json_decode($this->rawData, true);

            $username = htmlspecialchars(trim($decodedData['username']));
            $password = htmlspecialchars(trim($decodedData['password']));

        
            if ($decodedData !== null && isset($decodedData['username'], $decodedData['password'])) {
                $username = strip_tags($decodedData['username']);
                $password = strip_tags($decodedData['password']);
    
                // Fetch the hashed password and user data from the database for the given username
                $sql = "SELECT * FROM users WHERE username = '$username'";
    
                $result = $this->conn->query($sql);
    
                if ($result->num_rows === 1) {
                    $row = $result->fetch_assoc();
                    $hashedPassword = $row['password'];
                    $verified = $row['verified'];
    
                    // Verify the entered password against the hashed password
                    if (password_verify($password, $hashedPassword)) {
                        // Successful login, return user data
                        unset($row['password']); // Remove the password hash from the response
                        $rand_byte = random_bytes(32);
                            $token = bin2hex($rand_byte);
                            $sql = "UPDATE `users` SET `token` = '$token' WHERE `username` = '$username'";
                            $result = $this->conn->query($sql);
                            $selectRole = "SELECT `role` FROM `users` WHERE `username` = '$username'";
                            $roleResult = $this->conn->query($selectRole);
                            $roleRow = $roleResult->fetch_assoc();
                            $role = $roleRow['role'];
                        
                            if ($result === true) {
                                   echo json_encode(
                                       [
                                        "message" => "Successfully logged in.",
                                        'status' => 200,
                                        'verified' => $verified,
                                        'username' => $username, 
                                        'role' => $role,
                                        'token' => $token,
                                    ]
                                );
                            }else {
                                echo json_encode(
                                    [
                                        "message" => "Failed to log in.",
                                        'status'=>403
                                    ]
                                );
                            }
                    } else {
                        echo json_encode(["message" => "Invalid password"]);
                    }
                } else {
                    echo json_encode(["message" => "User not found"]);
                }
            } else {
                echo json_encode(["message" => "Invalid data received"]);
            }
    }
             
}


$login = new Login();

$login->loginData();
?>