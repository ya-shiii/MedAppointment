<?php
// Include the database connection file
include_once 'db_connect.php';

// Initialize the response array
$response = array('success' => false, 'message' => '');

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
        $updateAppointmentQuery = "UPDATE medical_appointment SET doctor_name = '$fullName' WHERE doctor_id = $doctorId";
        if (mysqli_query($conn, $updateAppointmentQuery)) {
            if (isset($_FILES['edit_image']) && $_FILES['edit_image']['error'] !== UPLOAD_ERR_NO_FILE) {
                // Upload image
                $target_dir = "../img/";
                $target_file = $target_dir . str_replace(' ', '_', $fullName) . ".jpg"; // Change file extension if needed

                // Check if the file already exists
                if (file_exists($target_file)) {
                    // If the file exists, delete it before uploading the new one
                    unlink($target_file);
                }

                // Upload the new image file
                if (move_uploaded_file($_FILES["edit_image"]["tmp_name"], $target_file)) {
                    $response['success'] = true;
                    $response['message'] = "The file " . htmlspecialchars(basename($_FILES["edit_image"]["name"])) . " has been uploaded.";
                } else {
                    $response['message'] = "Sorry, there was an error uploading your file.";
                }
            }
            $response['success'] = true;
            $response['message'] = "Doctor updated succesfully.";
            // Output JSON response
            echo json_encode($response);
            exit();
        }
    } else {
        // If update fails, display an error message
        $response['message'] = "Error updating patient: " . mysqli_error($conn);
    }
} else {
    // If the form is not submitted via POST method, redirect to index or another appropriate page
    header("Location: index.php");
    exit();
}

// Output JSON response
echo json_encode($response);
?>