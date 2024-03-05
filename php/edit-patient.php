<?php
// Include database connection code
include_once 'db_connect.php';

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve form data
    $edit_username = $_POST['edit_username'];
    $edit_password = $_POST['edit_password'];
    $edit_full_name = $_POST['edit_full_name'];
    $edit_email = $_POST['edit_email'];
    $edit_age = $_POST['edit_age'];
    $edit_type = $_POST['edit_type'];
    $edit_address = $_POST['edit_address'];
    $edit_id = $_POST['edit_id'];

    // Perform validation if needed

    // Update the patient in the database
    $query = "UPDATE patients_list SET Username = '$edit_username', `Password` = '$edit_password', FullName = '$edit_full_name', 
                Email = '$edit_email', Age = $edit_age, Gender = '$edit_type', `Address` = '$edit_address' WHERE PatientID = $edit_id";
    
    // Execute the query
    $result = mysqli_query($conn, $query);

    // Check if the update was successful
    if ($result) {
        // If update is successful, redirect to the page where the form is submitted from
        echo "<script>alert('Patient updated successfully!');</script>";
        echo "<script>window.location.href = '../admin-patients.html';</script>";
        exit();
    } else {
        // If update fails, display an error message
        echo "Error updating patient: " . mysqli_error($conn);
        echo "<script>window.location.href = '../admin-patients.html';</script>";
    }
} else {
    // If the form is not submitted via POST method, redirect to index or another appropriate page
    header("Location: index.php");
    exit();
}
?>
