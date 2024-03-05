<?php
// Include database connection code
include_once 'db_connect.php';

// Check if doctor type ID is provided
if (isset($_POST['doctor_id'])) {
    // Retrieve and sanitize doctor type ID
    $doctorID = mysqli_real_escape_string($conn, $_POST['doctor_id']);
    
    // Fetch field details from the database
    $query = "SELECT * FROM doctor_list WHERE DoctorID = '$doctorID'";
    $result = mysqli_query($conn, $query);
    
    if ($row = mysqli_fetch_assoc($result)) {
        // Return field details as JSON response
        echo json_encode([
            'doctor_id' => $row['DoctorID'],
            'full_name' => $row['FullName'],
            'email' => $row['Email'],
            'phone' => intval($row['Phone']),
            'address' => $row['ClinicAddress'],
            'type' => $row['DoctorType'],
            'username' => $row['Username'],
            'password' => $row['Password']
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
