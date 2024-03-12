<?php
include 'db_connect.php'; // Adjust the path based on your file structure

// Initialize the response array
$response = array('success' => false, 'message' => '');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve data from POST
    $username = mysqli_real_escape_string($conn, $_POST['addUsername']);
    $password = mysqli_real_escape_string($conn, $_POST['addPassword']);
    $full_name = mysqli_real_escape_string($conn, $_POST['addFullName']);
    $email = mysqli_real_escape_string($conn, $_POST['addEmail']);
    $age = (int) $_POST['addAge']; // Ensure age is an integer
    $gender = mysqli_real_escape_string($conn, $_POST['addGender']);
    $address = mysqli_real_escape_string($conn, $_POST['addAddress']);

    // Check if username is 'admin'
    if ($username === 'admin') {
        $response['message'] = 'Username "admin" is not allowed';
    }

    // Check for duplicates in patients list
    $duplicateCheckQuery = "SELECT * FROM patients_list WHERE Username = '$username' OR Email = '$email'";
    $duplicateCheckResult = mysqli_query($conn, $duplicateCheckQuery);

    if (mysqli_num_rows($duplicateCheckResult) > 0) {
        $response['message'] = 'Username or email already exists';
    } else {
        // Check for duplicates in doctors list
        $duplicateCheckQuery1 = "SELECT * FROM doctor_list WHERE Username = '$username' OR Email = '$email'";
        $duplicateCheckResult1 = mysqli_query($conn, $duplicateCheckQuery1);

        if (mysqli_num_rows($duplicateCheckResult1) > 0) {
            $response['message'] = 'Username or email already exists';
        } else {
            // Upload image
            $target_dir = "../patient/";
            $target_file = $target_dir . str_replace(' ', '_', $username) . ".jpg"; // Change file extension if needed
            $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
            $uploadOk = 1;

            // Check if image file is a actual image or fake image
            if (isset($_POST["submit"])) {
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
                $response['message'] = 'Sorry, your file is too large.';
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
                $response['message'] = 'Sorry, your file was not uploaded.';
            } else {
                if (move_uploaded_file($_FILES["add_image"]["tmp_name"], $target_file)) {
                    $response['message'] = 'The file ' . htmlspecialchars(basename($_FILES["add_image"]["name"])) . ' has been uploaded.';
                } else {
                    $response['message'] = 'Sorry, there was an error uploading your file.';
                }
            }

            // Perform the insertion into the database
            $insertQuery = "INSERT INTO patients_list (Username, `Password`, FullName, Email, Age, Gender, `Address`) 
                VALUES ('$username', '$password', '$full_name', '$email', $age, '$gender', '$address')";

            $insertResult = mysqli_query($conn, $insertQuery);

            if ($insertResult) {
                $response['success'] = true;
                $response['message'] = 'User added successfully';
            } else {
                $response['message'] = ': ' . mysqli_error($conn);
            }
        }
    }
} else {
    // Handle non-POST requests
    $response['message'] = 'Invalid request method';
}

// Send JSON response
echo json_encode($response);
?>
