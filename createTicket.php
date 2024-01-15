<?php

include "db.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class TicketCreation extends DB
{
    private $rawData;

    public function __construct()
    {
        parent::__construct();
        $this->rawData = file_get_contents('php://input');
    }

    public function createTicket()
    {
        $decodedData = json_decode($this->rawData, true);
        $name = strip_tags($decodedData['name']);
        $price = strip_tags($decodedData['price']);
        $quantity = strip_tags($decodedData['quantity']);
        $eventID = strip_tags($decodedData['eventID']);

        // Initialize an array to store error messages
        $errors = [];

        // Validate inputs
        if (empty($name) || empty($quantity) || empty($price) || empty($eventID)) {
            $errors[] = "All fields must be filled.";
        } elseif (!is_numeric($quantity) || $quantity <= 0 || floor($quantity) != $quantity) {
            $errors[] = "Quantity must be a numeric value greater than 0 and a whole number.";
        } elseif (!is_numeric($price) || $price <= 0 || number_format($price, 2, '.', '') != $price) {
            $errors[] = "Price must be a numeric value greater than 0 with at least 2 decimal places.";
        }

        // Check if there are any errors
        if (!empty($errors)) {
            // Return JSON-encoded error messages
            echo json_encode(['error' => $errors]);
        } else {
            // All checks passed, proceed with the SQL query
            $sql = "INSERT INTO `tickets` (`ticketName`, `ticketAmount`, `ticketPrice`, `eventID`)
                    VALUES ('$name', '$quantity', '$price', '$eventID')";
            $result = $this->conn->query($sql);

            if ($result) {
                // Return eventID on success
                echo json_encode(['success' => $eventID]);
            } else {
                // Return error message on failure
                echo json_encode(['error' => 'Failed to insert data into the database']);
            }
        }
    }
}

$TicketCreation = new TicketCreation();
$TicketCreation->createTicket();
?>
