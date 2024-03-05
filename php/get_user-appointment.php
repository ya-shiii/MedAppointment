<?php
// Include database connection code
include_once 'db_connect.php';

// Start the session
session_start();

// Get the session patient ID
$patientId = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;

// Check if the patient ID is set
if ($patientId !== null) {
    // Prepare the SQL query with a WHERE clause to filter by patient ID
    $query = "SELECT * FROM medical_appointment WHERE patient_id = '$patientId' AND `status` = 'pending'";
    
    // Execute the query
    $result = mysqli_query($conn, $query);

    // Initialize an array to store the appointment data
    $appointments = array();

    // Check if there are any rows returned
    if (mysqli_num_rows($result) > 0) {
        // Loop through each row and add it to the appointments array
        while ($row = mysqli_fetch_assoc($result)) {
            $appointments[] = $row;
        }
    }

    // Encode the appointments array as JSON and echo it
    echo json_encode($appointments);
} else {
    // If the patient ID is not set, return an empty array
    echo json_encode(array());
}
?>
