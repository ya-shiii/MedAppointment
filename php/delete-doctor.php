<?php
// Include database connection code
include_once 'db_connect.php';

// Check if doctorId is set in POST request
if (isset($_POST['doctorId'])) {
    // Sanitize and validate input
    $doctorId = mysqli_real_escape_string($conn, $_POST['doctorId']);

    // Construct SQL query to delete doctor from database
    $query = "DELETE FROM doctor_list WHERE DoctorID = '$doctorId'";

    // Execute query
    if (mysqli_query($conn, $query)) {
        $query1 = "DELETE FROM medical_appointment WHERE doctor_id = '$doctorId'";
        // Deletion successful
        if (mysqli_query($conn, $query1)) {
            echo json_encode(['success' => true, 'message' => '']);
        }
    } else {
        // Deletion failed
        echo json_encode(['success' => false, 'message' => '']);
    }
} else {
    // doctorId not set in POST request
    echo json_encode(['success' => false, 'message' => '']);
}
?>
