<?php
// Include database connection code
include_once 'db_connect.php';
session_start();
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
    $edit_id = $_SESSION['user_id']; // Using the session ID for the user

    // Perform validation if needed

    // Update the patient in the database
    $query = "UPDATE patients_list SET Username = ?, `Password` = ?, FullName = ?, Email = ?, Age = ?, Gender = ?, `Address` = ? WHERE PatientID = ?";
    
    // Prepare the statement
    $stmt = $conn->prepare($query);
    // Bind parameters
    $stmt->bind_param("ssssisss", $edit_username, $edit_password, $edit_full_name, $edit_email, $edit_age, $edit_type, $edit_address, $edit_id);
    // Execute the query
    if ($stmt->execute()) {
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
                $response['message'] = "The image has been uploaded successfully.";
            } else {
                $response['message'] = "Sorry, there was an error uploading your file.";
            }
        } else {
            $response['success'] = true;
            $response['message'] = 'Account updated successfully!';
        }
    } else {
        // If update fails, display an error message
        $response['message'] = "Error updating account: " . $conn->error;
    }
    
    // Close statement
    $stmt->close();
} else {
    // If the form is not submitted via POST method, return an error message
    $response['message'] = 'Invalid request method';
}

// Output JSON response
echo json_encode($response);
?>
