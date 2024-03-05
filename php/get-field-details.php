<?php
// Include database connection code
include_once 'db_connect.php';

// Check if doctor type ID is provided
if (isset($_POST['doctorTypeID'])) {
    // Retrieve and sanitize doctor type ID
    $doctorTypeID = mysqli_real_escape_string($conn, $_POST['doctorTypeID']);
    
    // Fetch field details from the database
    $query = "SELECT * FROM doctortypes WHERE DoctorTypeID = '$doctorTypeID'";
    $result = mysqli_query($conn, $query);
    
    if ($row = mysqli_fetch_assoc($result)) {
        // Return field details as JSON response
        echo json_encode([
            'field_id' => $row['DoctorTypeID'],
            'field_name' => $row['TypeName'],
            'description' => $row['Description']
        ]);
        exit();
    } else {
        // Doctor type ID not found
        echo json_encode(['error' => 'Doctor type ID not found']);
        exit();
    }
} else {
    // Doctor type ID not provided
    echo json_encode(['error' => 'Doctor type ID not provided']);
    exit();
}
?>
