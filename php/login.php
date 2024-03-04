<?php
include 'db_connect.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve form data
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Check if username is 'admin' and password is 'admin'
    if ($username === 'admin' && $password === 'admin') {
        // Set session variables for admin
        $_SESSION['user_id'] = 'admin';
        $_SESSION['full_name'] = 'Admin';

        // Set cookies for admin
        setcookie('user_id', 'admin', time() + 3600, '/');
        setcookie('full_name', 'Admin', time() + 3600, '/');

        // Redirect to the admin dashboard
        echo '<script>window.location.href = "../admin-doctors.html";</script>';
        exit();
    } else if ($username === 'admin' && $password !== 'admin') {
        echo "<script>alert('Invalid password for admin'); window.location.href='../';</script>";
    } else {

        $username = mysqli_real_escape_string($conn, $_POST['username']);
        $password = $_POST['password'];

        // Check in patients_list
        $query = "SELECT * FROM patients_list WHERE Username = '$username'";
        $result = mysqli_query($conn, $query);

        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            // Verify password
            if ($row['Password'] === $password) {
                // Set session variables for patient
                $_SESSION['user_id'] = $row['PatientID'];
                $_SESSION['full_name'] = $row['FullName'];

                // Alert session ID and full name
                // echo "<script>alert('Session ID: " . $_SESSION['user_id'] . ", Full Name: " . $_SESSION['full_name'] . "');</script>";

                // Redirect to the patient dashboard
                echo '<script>window.location.href = "../dashboard.html";</script>';
                exit();
            }
        }

        // If not found in patients_list, check in doctor_list
        $query = "SELECT * FROM doctor_list WHERE Username = '$username'";
        $result = mysqli_query($conn, $query);

        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            // Verify password
            if ($row['Password'] === $password) {
                // Set session variables for doctor
                $_SESSION['user_id'] = $row['DoctorID'];
                $_SESSION['full_name'] = $row['FullName'];

                // Alert session ID and full name
                // echo "<script>alert('Session ID: " . $_SESSION['user_id'] . ", Full Name: " . $_SESSION['full_name'] . "');</script>";

                // Redirect to the doctor dashboard
                echo '<script>window.location.href = "../home.html";</script>';
                exit();
            }
        }

        // If not found in both tables, alert the user and redirect to index
        echo '<script>alert("Username not found");</script>';
        echo '<script>window.location.href = "../index.html";</script>';
        exit();
    }
}
?>