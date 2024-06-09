<?php
// Include database connection code
include_once 'db_connect.php';

// Check if the appointment_id and status are set
if (isset($_POST['appointment_id'], $_POST['status'])) {
    // Sanitize the inputs
    $appointment_id = $_POST['appointment_id'];
    $status = $_POST['status'];

    // Update the pat_app in the database
    $query = "UPDATE medical_appointment SET pat_app = 'yes' WHERE appointment_id = '$appointment_id'";
    $result = mysqli_query($conn, $query);

    if ($result) {
        // Check if both doc_app and pat_app are 'yes'
        $check_query = "SELECT doc_app FROM medical_appointment WHERE appointment_id = '$appointment_id' AND pat_app = 'yes' AND doc_app = 'yes'";
        $check_result = mysqli_query($conn, $check_query);

        if (mysqli_num_rows($check_result) > 0) {
            // If both doc_app and pat_app are 'yes', set status to 'confirmed'
            $update_status_query = "UPDATE medical_appointment SET status = '$status' WHERE appointment_id = '$appointment_id'";
            $update_status_result = mysqli_query($conn, $update_status_query);

            if ($update_status_result) {
                echo "Appointment status updated to confirmed successfully.";
            } else {
                echo "Error updating appointment status: " . mysqli_error($conn);
            }
        } else {
            echo "Patient appointment updated successfully.";
        }
    } else {
        // If update fails, send an error response
        echo "Error updating patient appointment status: " . mysqli_error($conn);
    }
} else {
    // If appointment_id or status is not set, send an error response
    echo "Error: appointment_id or status not provided.";
}
?>
