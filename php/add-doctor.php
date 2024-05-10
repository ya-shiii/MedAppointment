<?php
// Include database connection code
include_once 'db_connect.php';

// Initialize response array
$response = array('success' => false, 'message' => '');

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

// If duplicate found in either table, set error message in response
if ($patient_exists || $doctor_exists) {
    $response['message'] = 'Username or Email already exists';
} else {
    // Upload image
    $target_dir = "../img/";
    $target_file = $target_dir . str_replace(' ', '_', $fullName) . ".jpg"; // Change file extension if needed
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    $uploadOk = 1;

    // Check if image file is a actual image or fake image
    if (isset($_FILES["add_image"])) {
        $check = getimagesize($_FILES["add_image"]["tmp_name"]);
        if ($check !== false) {
            $uploadOk = 1;
        } else {
            $response['message'] = 'File is not an image.';
            $uploadOk = 0;
        }
    }

    // Check if file already exists
    if (file_exists($target_file)) {
        $response['message'] = 'Sorry, file already exists.';
        $uploadOk = 0;
    }

    // Check file size
    if ($_FILES["add_image"]["size"] > 500000) {
        $response['message'] = 'Sorry, your file is too large';
        $uploadOk = 0;
    }

    // Allow only certain file formats
    if (
        $imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif"
    ) {
        $response['message'] = 'Sorry, only JPG, JPEG, PNG & GIF files are allowed.';
        $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        $response['message'] = 'Sorry, your file was not uploaded';
        // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["add_image"]["tmp_name"], $target_file)) {
            $response['message'] = 'File has been uploaded';
        } else {
            $response['message'] = 'Sorry, there was an error uploading your file.';
        }
    }

    // If file upload is successful, proceed with database insertion
    if ($uploadOk == 1) {
        // Insert data into the database
        $insertQuery = "INSERT INTO doctor_list (Username, `Password`, FullName, Email, Phone, ClinicAddress, DoctorType) VALUES ('$username', '$password', '$fullName', '$email', '$phone', '$address', '$type')";

        if (mysqli_query($conn, $insertQuery)) {
            // Data inserted successfully
            $response['success'] = true;
            $response['message'] = 'Doctor added successfully';
        } else {
            // Error occurred
            $response['message'] = 'Error occurred while adding doctor';
        }
    }
}

// Close database connection
mysqli_close($conn);

// Output JSON response
echo json_encode($response);
?>
