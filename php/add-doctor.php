<?php
// Include database connection code
include_once 'db_connect.php';

// Retrieve form data
$username = $_POST['add_username'];
$password = $_POST['add_password'];
$fullName = $_POST['full_name'];
$email = $_POST['add_email'];
$phone = $_POST['add_phone'];
$address = $_POST['add_address'];
$type = $_POST['add_type'];

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

// Upload image
$target_dir = "../img/";
$target_file = $target_dir . str_replace(' ', '_', $fullName) . ".jpg"; // Change file extension if needed
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
$uploadOk = 1;

// Check if image file is a actual image or fake image
if (isset($_POST["submit"])) {
    $check = getimagesize($_FILES["add_image"]["tmp_name"]);
    if ($check !== false) {
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
}

// Check if file already exists
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}

// Check file size
if ($_FILES["add_image"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}

// Allow only certain file formats
if (
    $imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
    && $imageFileType != "gif"
) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
    // if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["add_image"]["tmp_name"], $target_file)) {
        echo "The file " . htmlspecialchars(basename($_FILES["add_image"]["name"])) . " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}

// Insert data into the database
$insertQuery = "INSERT INTO doctor_list (Username, `Password`, FullName, Email, Phone, ClinicAddress, DoctorType) VALUES ('$username', '$password', '$fullName', '$email', '$phone', '$address', '$type')";

if (mysqli_query($conn, $insertQuery)) {
    // Data inserted successfully
    echo '<script>alert("Doctor added successfully"); window.location.href="../admin-doctors.html";</script>';
} else {
    // Error occurred
    echo '<script>alert("Error occurred while adding doctor"); window.location.href="../admin-doctors.html";</script>';
}

// Close database connection
mysqli_close($conn);
?>