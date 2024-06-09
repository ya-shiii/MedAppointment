<?php
// Start or resume a session
session_start();

// Include the database connection script
include 'db_connect.php';

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $patient_id = $_SESSION['user_id'];
    $patient_name = $_SESSION['full_name'];
    $doctor_id = $_POST['add_doctor_id'];
    $doctor_name = $_POST['add_doctor_name'];
    $doctor_type = $_POST['add_doctor_type'];
    $clinic_address = $_POST['add_clinic_address'];
    $appointment_date = $_POST['add_app_date'];
    $appointment_time = $_POST['add_app_time'];
    $status = 'pending';
    $approval = 'yes';

    // Perform any necessary validation here

    // Check for existing appointments with the same date, time, and doctor_id
    $existing_stmt = $conn->prepare("SELECT * FROM medical_appointment WHERE appointment_date = ? AND doctor_id = ? AND status = 'pending'");
    $existing_stmt->bind_param("ss", $appointment_date, $doctor_id);
    $existing_stmt->execute();
    $existing_result = $existing_stmt->get_result();

    // Check if there are any existing appointments
    if ($existing_result->num_rows > 0) {
        // Existing appointment found
        echo "<script>alert('Invalid request: Duplicate appointment. Please select a different date/time or doctor.'); window.location.href = document.referrer;</script>";
    } else {
        // Insert the appointment into the database
        $stmt = $conn->prepare("INSERT INTO medical_appointment (patient_id, patient_name, doctor_id, doctor_name, doctor_type, clinic_address, appointment_date, time, status, pat_app) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("isssssssss", $patient_id, $patient_name, $doctor_id, $doctor_name, $doctor_type, $clinic_address, $appointment_date, $appointment_time, $status, $approval);

        // Check if the insertion was successful
        if ($stmt->execute()) {
            // Appointment added successfully
            echo "<script>alert('Appointment added successfully'); window.location.href = document.referrer;</script>";
        } else {
            // Error occurred
            echo "<script>alert('Error adding appointment'); window.location.href = document.referrer;</script>";
        }

        // Close the statement
        $stmt->close();
    }

    // Close the existing statement
    $existing_stmt->close();
}

// Close the database connection
$conn->close();
?>
