<?php
// Include database connection code
include_once 'db_connect.php';

// Check if the user_id session variable is set
session_start();
if (isset($_SESSION['user_id'])) {
    // Sanitize the input
    $user_id = $_SESSION['user_id'];

    // Prepare and execute the query to fetch account details
    $stmt = $conn->prepare("SELECT * FROM patients_list WHERE PatientID = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if the query was successful
    if ($result->num_rows > 0) {
        // Fetch the account details
        $row = $result->fetch_assoc();

        // Create an array to hold the account details
        $account_details = array(
            'id' => $row['PatientID'],
            'username' => $row['Username'],
            'password' => $row['Password'],
            'full_name' => $row['FullName'],
            'email' => $row['Email'],
            'age' => $row['Age'],
            'type' => $row['Gender'],
            'address' => $row['Address']
        );

        // Return the account details as JSON
        echo json_encode($account_details);
    } else {
        // If no matching record found, return an empty JSON object
        echo json_encode(array());
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
} else {
    // If user_id session variable is not set, return an error message
    echo json_encode(array('error' => 'user_id session variable is not set'));
}
?>
