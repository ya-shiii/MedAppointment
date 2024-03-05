<?php
// Include database connection code
include_once 'db_connect.php';

// Check if doctor type ID is provided
if (isset($_POST['patient_id'])) {
    // Retrieve and sanitize doctor type ID
    $patient_id = mysqli_real_escape_string($conn, $_POST['patient_id']);
    
    // Fetch field details from the database
    $query = "SELECT * FROM patients_list WHERE PatientID = '$patient_id'";
    $result = mysqli_query($conn, $query);
    
    if ($row = mysqli_fetch_assoc($result)) {
        // Return field details as JSON response
        echo json_encode([
            'patient_id' => $row['PatientID'],
            'username' => $row['Username'],
            'password' => $row['Password'],
            'full_name' => $row['FullName'],
            'email' => $row['Email'],
            'age' => $row['Age'],
            'gender' => $row['Gender'],
            'address' => $row['Address']
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
