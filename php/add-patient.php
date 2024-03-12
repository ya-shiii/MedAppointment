<?php
// Include the database connection file
include_once 'db_connect.php';

// Initialize response array
$response = array('success' => false, 'message' => '');

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

    // Execute the SQL statement to insert a new patient
    $query_insert_patient = "INSERT INTO patients_list (Username, `Password`, FullName, Email, Age, Gender, `Address`) 
                              VALUES ('$username', '$password', '$fullName', '$email', $age, '$gender', '$address')";

    if (mysqli_query($conn, $query_insert_patient)) {
        // Upload image
        $target_dir = "../patient/";
        $target_file = $target_dir . str_replace(' ', '_', $fullName) . ".jpg"; // Change file extension if needed
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
        $uploadOk = 1;

        // Check if file is an actual image or fake image
        $check = getimagesize($_FILES["add_image"]["tmp_name"]);
        if ($check === false) {
            $response['message'] = 'File is not an image.';
            $uploadOk = 0;
        }

        // Check file size
        if ($_FILES["add_image"]["size"] > 500000) {
            $response['message'] = 'Sorry, your file is too large.';
            $uploadOk = 0;
        }

        // Allow only certain file formats
        if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
            $response['message'] = 'Sorry, only JPG, JPEG, PNG & GIF files are allowed.';
            $uploadOk = 0;
        }

        // Check if file already exists, if yes, overwrite it
        if (file_exists($target_file)) {
            unlink($target_file); // Remove existing file
        }

        // Upload the new file
        if ($uploadOk == 1) {
            if (move_uploaded_file($_FILES["add_image"]["tmp_name"], $target_file)) {
                $response['success'] = true;
                $response['message'] = 'The file ' . htmlspecialchars(basename($_FILES["add_image"]["name"])) . ' has been uploaded.';
            } else {
                $response['message'] = 'Sorry, there was an error uploading your file.';
            }
        }

        // If the insertion and image upload are successful, set success to true
        $response['success'] = true;
        $response['message'] = 'Patient added successfully!';
    } else {
        // If an error occurs, display an error message
        $response['message'] = "Error: " . mysqli_error($conn);
    }
} else {
    // If the form is not submitted via POST method, set an error message
    $response['message'] = 'Invalid request method.';
}

// Output JSON response
echo json_encode($response);
?>
