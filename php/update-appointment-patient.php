<?php
// Start session
session_start();

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Include database connection code
    include_once 'db_connect.php';
    
    // Get data from the form
    $edit_id = $_POST['edit_id'];
    $edit_app_date = $_POST['edit_app_date'];
    $edit_app_time = $_POST['edit_app_time'];

    // Validate and sanitize data
    $edit_id = mysqli_real_escape_string($conn, $edit_id);
    $edit_app_date = mysqli_real_escape_string($conn, $edit_app_date);
    $edit_app_time = mysqli_real_escape_string($conn, $edit_app_time);

    // SQL to update appointment
    $sql = "UPDATE medical_appointment SET appointment_date = '$edit_app_date', time = '$edit_app_time', doc_app='pending', pat_app ='yes' WHERE appointment_id = '$edit_id'";

    // Execute the query
    if (mysqli_query($conn, $sql)) {
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
