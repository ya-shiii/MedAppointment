<?php
// Include database connection code
include_once 'db_connect.php';

// Initialize the response array
$response = array('success' => false, 'message' => '');

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
        $updatePatientQuery = "UPDATE medical_appointment SET patient_name = '$edit_full_name' WHERE patient_id = $edit_id";
        if (mysqli_query($conn, $updatePatientQuery)) {
            // Check if a new image file is uploaded
            if (isset($_FILES['edit_image']) && $_FILES['edit_image']['error'] !== UPLOAD_ERR_NO_FILE) {
                // Upload image
                $target_dir = "../patient/";
                $target_file = $target_dir . str_replace(' ', '_', $edit_full_name) . ".jpg"; // Change file extension if needed

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
            $response['message'] = 'Patient updated successfully!';
            
            // Output JSON response
            echo json_encode($response);
            // JavaScript alert message and redirect
            //echo "<script>alert('Patient updated successfully!'); window.location.href = '../admin-patients.html';</script>";
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
