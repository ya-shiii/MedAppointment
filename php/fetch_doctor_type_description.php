<?php
// Include database connection code
include_once 'db_connect.php';

// Check if the doctor type is provided via POST request
if (isset($_POST['doctor_type'])) {
    // Sanitize and retrieve the doctor type
    $doctorType = mysqli_real_escape_string($conn, $_POST['doctor_type']);

    // Prepare and execute the SQL query to fetch the description based on the doctor type
    $query = "SELECT Description FROM doctortypes WHERE TypeName = '$doctorType'";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        // Fetch the description from the result set
        $row = mysqli_fetch_assoc($result);
        $description = $row['Description'];

        // Return the description as JSON
        echo json_encode(array('description' => $description));
    } else {
        // If no description is found, return an empty response
        echo json_encode(array('description' => ''));
    }
} else {
    // If doctor type is not provided, return an error message
    echo json_encode(array('error' => 'Doctor type not specified'));
}
?>
