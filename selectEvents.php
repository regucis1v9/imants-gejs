<?php

include "db.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class SelectEvents extends DB {

    private $rawData;

    public function __construct() {
        parent::__construct();
    }

    public function SelectEvents() {
        $filter = $_GET['filter'];

        if ($filter === 'newest') {
            $sql = "SELECT * FROM `events` ORDER BY `id` DESC LIMIT 5";
        } elseif ($filter === 'upcoming') {
            $today = date('Y-m-d H:i');
            $sql = "SELECT * FROM `events` WHERE `start_date` > '$today' ORDER BY `start_date` LIMIT 5";
        } elseif ($filter === 'random') {
            $sql = "SELECT * FROM `events` ORDER BY RAND() LIMIT 5";
        } else {
            $sql = "SELECT * FROM `events`";
        }

        $result = $this->conn->query($sql);

        if ($result) {
            $data = $result->fetch_all(MYSQLI_ASSOC);
            // Echo the data as JSON
            echo json_encode($data);
        } else {
            // Handle the case where the query fails
            echo json_encode(['error' => 'Query failed']);
        }
    }
}

$SelectEvents = new SelectEvents();
$SelectEvents->SelectEvents();
?>
