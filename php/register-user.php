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
        $response = array('success' => false, 'message' => 'Username "admin" is not allowed');
        echo '<script>alert("Username \"admin\" is not allowed. Please choose a different username."); window.location.href = "../";</script>';
        exit;
    }

    // Check for duplicates in patients list
    $duplicateCheckQuery = "SELECT * FROM patients_list WHERE Username = '$username' OR Email = '$email'";
    $duplicateCheckResult = mysqli_query($conn, $duplicateCheckQuery);

    if (mysqli_num_rows($duplicateCheckResult) > 0) {
        $response = array('success' => false, 'message' => 'Username or email already exists');
        echo '<script>alert("Username or email already exists. Please try again."); window.location.href = "../";</script>';
        exit;
    } else {
        // Check for duplicates in doctors list
        $duplicateCheckQuery1 = "SELECT * FROM doctor_list WHERE Username = '$username' OR Email = '$email'";
        $duplicateCheckResult1 = mysqli_query($conn, $duplicateCheckQuery1);

        if (mysqli_num_rows($duplicateCheckResult1) > 0) {
            $response = array('success' => false, 'message' => 'Username or email already exists');
            echo '<script>alert("Username or email already exists. Please try again."); window.location.href = "../";</script>';
            exit;
        } else {
            // Perform the insertion into the database
            $insertQuery = "INSERT INTO patients_list (Username, `Password`, FullName, Email, Age, Gender, `Address`) 
                VALUES ('$username', '$password', '$full_name', '$email', $age, '$gender', '$address')";

            $insertResult = mysqli_query($conn, $insertQuery);

            if ($insertResult) {
                $response = array('success' => true, 'message' => 'User added successfully');
                echo '<script>alert("Registered successfully."); window.location.href = "../";</script>';
                exit;
            } else {
                $response = array('success' => false, 'message' => ': ' . mysqli_error($conn));
                echo '<script>alert("Error registering user ' . mysqli_error($conn) . '"); window.location.href = "../";</script>';
                exit;
            }
        }
    }

} else {
    // Handle non-POST requests
    $response = array('success' => false, 'message' => 'Invalid request method');
    echo '<script>alert("Invalid request method"); window.location.href = "../../";</script>';
    exit;

}
?>