<?php
// Include database connection code
include_once 'db_connect.php';

// Check if doctor type ID is provided
if (isset($_POST['patient_id'])) {
    // Retrieve and sanitize doctor type ID
    $patient_id = mysqli_real_escape_string($conn, $_POST['patient_id']);

    // Delete the field from the database
    $delete_query = "DELETE FROM patients_list WHERE PatientID = '$patient_id'";
    if (mysqli_query($conn, $delete_query)) {
        $delete_query1 = "DELETE FROM medical_appointment WHERE patient_id = '$patient_id'";
        if (mysqli_query($conn, $delete_query1)) {
            // Field deleted successfully
            echo json_encode(['success' => true]);
            exit();
        }
    } else {
        // Error occurred while deleting field
        echo json_encode(['success' => false, 'message' => 'Error occurred while deleting field']);
        exit();
    }
} else {
    // Doctor type ID not provided
    echo json_encode(['success' => false, 'message' => 'Doctor type ID not provided']);
    exit();
}
?>