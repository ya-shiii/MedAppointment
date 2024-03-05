<?php
// Include database connection code
include_once 'db_connect.php';

// Check if the appointment date and time are sent via POST
if (isset($_POST['appointment_date']) && isset($_POST['appointment_time'])) {
    // Retrieve the appointment date and time from the POST data
    $appointment_date = $_POST['appointment_date'];
    $appointment_time = $_POST['appointment_time'];

    // Prepare the SQL query to check for existing appointments at the selected date and time
    $query = "SELECT * FROM medical_appointment WHERE appointment_date = '$appointment_date' AND time = '$appointment_time'";

    // Execute the query
    $result = mysqli_query($conn, $query);

    // Initialize an array to store the existing appointments
    $existing_appointments = array();

    // Check if there are any rows returned
    if (mysqli_num_rows($result) > 0) {
        // Loop through each row and add it to the existing appointments array
        while ($row = mysqli_fetch_assoc($result)) {
            $existing_appointments[] = $row;
        }
    }

    // Encode the existing appointments array as JSON and echo it
    echo json_encode($existing_appointments);
} else {
    // If the appointment date and time are not provided, return an empty array
    echo json_encode(array());
}
?>
