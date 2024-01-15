<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './src/Exception.php';
require './src/PHPMailer.php';
require './src/SMTP.php';
require 'db.php';

class EmailVerify extends DB
{
    private $rawData;

    public function __construct()
    {
        parent::__construct();
        $this->rawData = file_get_contents('php://input');
    }

    public function sendPasswordResetEmail()
    {
        $decodedData = json_decode($this->rawData, true);

        if ($decodedData !== null && isset($decodedData['email'])) {
            $recipientEmail = strip_tags($decodedData['email']);

            // Check if the email is in a valid format
            if (!filter_var($recipientEmail, FILTER_VALIDATE_EMAIL)) {
                echo json_encode(['status' => 'error', 'message' => 'Invalid email format']);
                return;
            }

            $sql = "SELECT * FROM `users` WHERE `email` = '$recipientEmail'";
            $result = $this->conn->query($sql);

            if ($result && $result->num_rows > 0) {
                // Retrieve user ID from the result
                $user = $result->fetch_assoc();
                $userId = $user['id'];

                $verificationToken = substr(str_shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 16);

                $mail = new PHPMailer(true);

                try {
                    $mail->isSMTP();
                    $mail->Host       = 'smtp.gmail.com';
                    $mail->SMTPAuth   = true;
                    $mail->Username   = 'ipa21.r.klavins@vtdt.edu.lv';
                    $mail->Password   = 'kela wrej zoxi xkns'; 
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                    $mail->Port       = 587;

                    $mail->setFrom('ipa21.r.klavins@vtdt.edu.lv', 'Ticketer');
                    $mail->addAddress($recipientEmail);

                    $mail->isHTML(true);
                    $mail->Subject = "Email verification";

                    // Replace YOUR_BASE_URL with the actual base URL of your application
                    $verificationLink = 'http://localhost:3000/verification/' . $verificationToken;
                    $mail->Body = '<html><head><style>body{font-family:Arial,sans-serif;background-color:#f4f4f4;color:#333;}.container{max-width:600px;margin:0 auto;padding:20px;background-color:#1a1a1a;border-radius:5px;box-shadow:0 0 10px rgba(0,0,0,0.1);}h1{color:#00a2ff;}p{color:#fff}</style></head><body><div class="container"><h1>Email Verification</h1><p>Please click the following link to verify your email: <a href="' . $verificationLink . '">' . $verificationLink . '</a></p></div></body></html>';

                    $mail->send();

                    // Insert token and user ID into the verification table
                    $setTokenQuery = "INSERT INTO `verification`(`token`, `userID`) VALUES ('$verificationToken', '$userId')";
                    $setToken = $this->conn->query($setTokenQuery);

                    echo json_encode(['status' => 'success', 'message' => 'Email sent successfully', 'token' => $verificationToken]);
                } catch (Exception $e) {
                    echo json_encode(['email' => $recipientEmail, 'status' => 'error', 'message' => 'Error sending email: ' . $mail->ErrorInfo]);
                }
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Email not found']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid data received']);
        }
    }
}

// Create an instance of the EmailVerify class
$emailVerify = new EmailVerify();

// Process the raw POST data
$emailVerify->sendPasswordResetEmail();
