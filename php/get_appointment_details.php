<?php
// Include database connection code
include_once 'db_connect.php';

// Check if the appointment ID is provided via POST
if (isset($_POST['appointment_id'])) {
    // Sanitize the input to prevent SQL injection
    $appointment_id = mysqli_real_escape_string($conn, $_POST['appointment_id']);
    
    // Prepare the SQL query
    $query = "SELECT * FROM medical_appointment WHERE appointment_id = '$appointment_id'";
    
    // Execute the query
    $result = mysqli_query($conn, $query);
    
    // Check if a row is returned
    if ($result && mysqli_num_rows($result) > 0) {
        // Fetch the appointment details
        $appointment = mysqli_fetch_assoc($result);
        
        // Encode the appointment details as JSON and echo it
        echo json_encode($appointment);
    } else {
        // If no appointment is found, return an empty object
        echo json_encode((object) array());
    }
} else {
    // If appointment ID is not provided, return an empty object
    echo json_encode((object) array());
}
?>
