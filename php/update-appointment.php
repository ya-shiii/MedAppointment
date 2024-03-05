<?php
// Include database connection code
include_once 'db_connect.php';

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve form data
    $edit_id = $_POST['edit_id'];
    $edit_username = $_POST['edit_username'];
    $app_date = $_POST['app_date'];
    $app_time = $_POST['app_time'];

    // Perform any additional validation if needed

    // Update the appointment in the database
    $query = "UPDATE medical_appointment SET appointment_date = '$app_date', `time` = '$app_time' WHERE appointment_id = '$edit_id'";
    $result = mysqli_query($conn, $query);

    if ($result) {
        // If update is successful, redirect to the appropriate page
        echo "<script>alert('Appointment updated successfully!');</script>";
        echo "<script>window.location.href = document.referrer;</script>";
        exit();
    } else {
        // If update fails, display an error message
        echo "Error updating appointment: " . mysqli_error($conn);
        echo "<script>alert('Error updating appointment.');</script>";
        echo "<script>window.location.href = document.referrer;</script>";
    }
} else {
    // If the form is not submitted via POST method, redirect to an appropriate page
    header("Location: index.php");
    exit();
}
?>
