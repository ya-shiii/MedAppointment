<?php
// Include the database connection file
include_once 'db_connect.php';

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data
    $username = $_POST['add_username'];
    $password = $_POST['add_password'];
    $fullName = $_POST['full_name'];
    $email = $_POST['add_email'];
    $age = $_POST['add_age'];
    $gender = $_POST['add_type'];
    $address = $_POST['add_address'];

    // Check for duplicates in patients_list table
    $query_patient = "SELECT * FROM patients_list WHERE Username = '$username' OR Email = '$email'";
    $result_patient = mysqli_query($conn, $query_patient);
    $patient_exists = mysqli_num_rows($result_patient) > 0;

    // Check for duplicates in doctor_list table
    $query_doctor = "SELECT * FROM doctor_list WHERE Username = '$username' OR Email = '$email'";
    $result_doctor = mysqli_query($conn, $query_doctor);
    $doctor_exists = mysqli_num_rows($result_doctor) > 0;

    // If duplicate found in either table, display error message
    if ($patient_exists || $doctor_exists) {
        echo "<script>alert('Username or Email already exists.'); window.location.href = document.referrer;</script>";
        exit();
    }

    // Execute the SQL statement to insert a new patient
    $query_insert_patient = "INSERT INTO patients_list (Username, `Password`, FullName, Email, Age, Gender, `Address`) 
                              VALUES ('$username', '$password', '$fullName', '$email', $age, '$gender', '$address')";
    
    if (mysqli_query($conn, $query_insert_patient)) {
        // If the insertion is successful, redirect back to the page where the form was submitted from
        echo "<script>alert('Patient added successfully'); window.location.href = document.referrer;</script>";
        exit();
    } else {
        // If an error occurs, display an error message
        echo "Error: " . mysqli_error($conn);
    }
}
?>
