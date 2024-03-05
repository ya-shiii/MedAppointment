<?php
// Include the database connection script
include 'db_connect.php';

// Check if the doctor type is provided
if (isset($_POST['doctor_type'])) {
    // Sanitize the input
    $doctor_type = $_POST['doctor_type'];

    // Prepare and execute the SQL query to fetch doctors based on the doctor type
    $stmt = $conn->prepare("SELECT DoctorID, FullName FROM doctor_list WHERE DoctorType = ?");
    $stmt->bind_param("s", $doctor_type);
    $stmt->execute();

    // Get the result
    $result = $stmt->get_result();

    // Fetch the results as an associative array
    $doctors = $result->fetch_all(MYSQLI_ASSOC);

    // Return the results as JSON
    echo json_encode($doctors);
} else {
    // If doctor type is not provided, return an empty array
    echo json_encode([]);
}

// Close the database connection
$conn->close();
?>
