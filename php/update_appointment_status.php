<?php
// Include database connection code
include_once 'db_connect.php';

// Check if the appointment_id and status are set
if (isset($_POST['appointment_id'], $_POST['status'])) {
    // Sanitize the inputs
    $appointment_id = $_POST['appointment_id'];
    $status = $_POST['status'];

    // Update the status in the database
    $query = "UPDATE medical_appointment SET status = '$status' WHERE appointment_id = '$appointment_id'";
    $result = mysqli_query($conn, $query);

    if ($result) {
        // If update is successful, send a success response
        echo "Appointment status updated successfully.";
    } else {
        // If update fails, send an error response
        echo "Error updating appointment status: " . mysqli_error($conn);
    }
} else {
    // If appointment_id or status is not set, send an error response
    echo "Error: appointment_id or status not provided.";
}
?>
