<?php
// Include the database connection script
include 'db_connect.php';

// Check if the doctor_id is set in the POST data
if (isset($_POST['doctor_id'])) {
    // Retrieve the doctor_id from the POST data
    $doctor_id = $_POST['doctor_id'];

    // Execute a SELECT query to fetch the doctor information
    $sql = "SELECT FullName, ClinicAddress FROM doctor_list WHERE DoctorID = '$doctor_id'";

    // Perform the query
    $result = $conn->query($sql);

    // Check if the query was successful
    if ($result) {
        // Fetch the result as an associative array
        $row = $result->fetch_assoc();

        // Check if a row was returned
        if ($row) {
            // Encode the row as JSON and echo it
            echo json_encode($row);
        } else {
            // Doctor not found
            echo json_encode(array('error' => 'Doctor not found'));
        }
    } else {
        // Error executing the query
        echo json_encode(array('error' => 'Error executing query'));
    }

    // Free the result set
    $result->free();
} else {
    // doctor_id parameter not set
    echo json_encode(array('error' => 'doctor_id parameter not set'));
}

// Close the database connection
$conn->close();
?>
