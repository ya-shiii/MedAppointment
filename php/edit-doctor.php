<?php
// Include the database connection file
include_once 'db_connect.php';

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data
    $doctorId = $_POST['edit_id'];
    $username = $_POST['edit_username'];
    $password = $_POST['edit_password'];
    $fullName = $_POST['edit_full_name'];
    $email = $_POST['edit_email'];
    $phone = $_POST['edit_phone'];
    $address = $_POST['edit_address'];
    $type = $_POST['edit_type'];

    // Update the doctor's information in the database
    $query = "UPDATE doctor_list SET Username = '$username', Password = '$password', FullName = '$fullName', Email = '$email', Phone = '$phone', ClinicAddress = '$address', DoctorType = '$type' WHERE DoctorID = $doctorId";

    // Execute the query
    if (mysqli_query($conn, $query)) {
        // If the update is successful, redirect back to the page where the form was submitted from
        echo '<script>alert("Doctor information updated successfully!"); window.location.href="../admin-doctors.html";</script>';
        exit();
    } else {
        // If an error occurs, display an error message
        echo "Error updating record: " . mysqli_error($conn);
    }
}
?>
