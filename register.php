<?php
include "db.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class Register extends DB {
    private $rawData;

    public function __construct() {
        parent::__construct();
        $this->rawData = file_get_contents('php://input');
    }

    public function registerUser() {
        $decodedData = json_decode($this->rawData, true);

        if ($decodedData !== null && isset($decodedData['username'], $decodedData['password'], $decodedData['email'])) {
            $username = strip_tags($decodedData['username']);
            $password = strip_tags($decodedData['password']);
            $email = strip_tags($decodedData['email']);

            // Validate the email address
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                echo json_encode(["message" => "Invalid email address"]);
                return;
            }

            // Hash the password using a strong hashing algorithm (e.g., bcrypt)
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

            // Check if the username already exists
            $checkUsernameQuery = "SELECT * FROM `users` WHERE username = '$username'";
            $checkUsernameResult = $this->conn->query($checkUsernameQuery);

            // Check if the email already exists
            $checkEmailQuery = "SELECT * FROM `users` WHERE email = '$email'";
            $checkEmailResult = $this->conn->query($checkEmailQuery);

            if ($checkUsernameResult->num_rows > 0) {
                echo json_encode(["message" => "Username already exists"]);
            } else if ($checkEmailResult->num_rows > 0) {
                echo json_encode(["message" => "Email already exists"]);
            } else {
                $insertQuery = "INSERT INTO `users`(`username`, `email`, `password`, `verified`, `role`, token) VALUES ('$username', '$email', '$hashedPassword', 'no', 'user', '')";
                $insertResult = $this->conn->query($insertQuery);

                if ($insertResult === true) {
                    echo json_encode([
                        "message" => "Registration successful"]);
                } else {
                    echo json_encode(["message" => "Error: " . $this->conn->error]);
                }
            }
        } else {
            echo json_encode(["message" => "Invalid data received"]);
        }
    }
}

// Create an instance of the Register class
$Register = new Register();

// Process the raw POST data
$Register->registerUser();
?>