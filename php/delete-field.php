<?php
// Include database connection code
include_once 'db_connect.php';

// Check if doctor type ID is provided
if (isset($_POST['doctorTypeID'])) {
    // Retrieve and sanitize doctor type ID
    $doctorTypeID = mysqli_real_escape_string($conn, $_POST['doctorTypeID']);
    
    // Delete the field from the database
    $delete_query = "DELETE FROM doctortypes WHERE DoctorTypeID = '$doctorTypeID'";
    if (mysqli_query($conn, $delete_query)) {
        // Field deleted successfully
        echo json_encode(['success' => true]);
        exit();
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
