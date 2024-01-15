<?php

include "db.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class ImageUpload extends DB {

    private $rawData;

    public function __construct() {
        parent::__construct();
        $this->rawData = file_get_contents('php://input');
    }

    public function uploadImage() {

        $decodedData = json_decode($this->rawData, true);

        $base64Image = isset($decodedData['base64Image']) ? $decodedData['base64Image'] : null;
        $eventID = isset($decodedData['eventID']) ? $decodedData['eventID'] : null;

        if ($base64Image !== null && $eventID !== null) {
            $imageData = base64_decode($base64Image);
            $filename = $eventID . '_image.jpg'; 

            // Specify the directory where you want to save the uploaded images
            $uploadDir = __DIR__ . '/images/';

            // Ensure the directory exists and is writable
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }

            // Construct the full path to the upload directory
            $uploadPath = $uploadDir . $filename;

            // Save the image to the specified directory
            if (file_put_contents($uploadPath, $imageData)) {
                // Successful image upload
                echo json_encode(array('success' => true, 'filename' => $filename));
            } else {
                // Error in image upload
                echo json_encode(array('success' => false, 'message' => 'Error uploading image'));
            }
        } else {
            // Handle the case where $base64Image or $eventID is null
            echo json_encode(array('success' => false, 'message' => 'Invalid image data or event ID'));
        }
    }
}

$imageUpload = new ImageUpload();
$imageUpload->uploadImage();
?>
