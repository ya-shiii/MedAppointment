<?php
// Include database connection code
include_once 'db_connect.php';

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve form data
    $field_id = $_POST['edit-field_id'];
    $field_name = $_POST['edit-field_name'];
    $description = $_POST['edit-description'];

    // Perform validation if needed

    // Update the field in the database
    $query = "UPDATE doctortypes SET TypeName = '$field_name', `Description` = '$description' WHERE DoctorTypeID = '$field_id'";
    $result = mysqli_query($conn, $query);

    if ($result) {
        // If update is successful, redirect to the page where the form is submitted from
        echo "<script>alert('Specialization Field updated!');</script>";
        echo "<script>window.location.href = '../admin-fields.html';</script>";
        exit();
    } else {
        // If update fails, display an error message
        echo "Error updating field: " . mysqli_error($conn);
        echo "<script>window.location.href = '../admin-fields.html';</script>";
    }
} else {
    // If the form is not submitted via POST method, redirect to index or another appropriate page
    header("Location: index.php");
    exit();
}
?>
