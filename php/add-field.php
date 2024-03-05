<?php
// Include database connection code
include_once 'db_connect.php';

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data and sanitize
    $field_name = mysqli_real_escape_string($conn, $_POST['field_name']);
    $description = mysqli_real_escape_string($conn, $_POST['description']);
    
    // Check for duplicate field name
    $check_query = "SELECT * FROM doctortypes WHERE TypeName = '$field_name'";
    $check_result = mysqli_query($conn, $check_query);

    if (mysqli_num_rows($check_result) > 0) {
        // Duplicate field name found, redirect back to the same page with error message
        echo "<script>alert('Field Name already exists!');</script>";
        echo "<script>window.location.href = '../admin-fields.html';</script>";
        exit();
    }

    // Insert new field into the table
    $insert_query = "INSERT INTO doctortypes (TypeName, `Description`) VALUES ('$field_name', '$description')";
    if (mysqli_query($conn, $insert_query)) {
        // Field added successfully, redirect back to the same page
        echo "<script>alert('Field added successfully!');</script>";
        echo "<script>window.location.href = '../admin-fields.html';</script>";
        exit();
    } else {
        // Error occurred while adding field, display error message
        echo "<script>alert('Error occurred while adding field!');</script>";
        echo "<script>window.location.href = '../admin-fields.html';</script>";
        exit();
    }
}
?>
