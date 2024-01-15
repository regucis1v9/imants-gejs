<?php

include "db.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class EventCreation extends DB {

    private $rawData;

    public function __construct() {
        parent::__construct();
        $this->rawData = file_get_contents('php://input');
    }

    public function createEvent() {
        $decodedData = json_decode($this->rawData, true);

        $title = strip_tags($decodedData['title']);
        $description = strip_tags($decodedData['description']);
        $startDate = $decodedData['startDate'];
        $endDate = $decodedData['endDate'];
        $location = strip_tags($decodedData['location']);

        // Check if required fields are not empty
        if (empty($title) || empty($description) || empty($startDate) || empty($endDate) || empty($location)) {
            echo json_encode(["message" => "Error: All fields must be filled out"]);
            return;
        }

        // Vulnerable to SQL injection, be cautious
        $sql = "INSERT INTO `events` (title, `description`, `start_date`, `end_date`, `location`) VALUES ('$title', '$description', '$startDate', '$endDate', '$location')";
        $result = $this->conn->query($sql);

        if ($result === true) {
            $lastInsertId = $this->conn->insert_id;
            echo json_encode(["message" => "Creation successful", "eventId" => $lastInsertId]);
        } else {
            echo json_encode(["message" => "Error: " . $this->conn->error]);
        }
    }

}

$eventCreation = new EventCreation();
$eventCreation->createEvent();
?>
