<?php
session_start();

// Check if session full name is set
if (isset($_SESSION['full_name'])) {
    // Return session full name as JSON
    echo json_encode(array('fullname' => $_SESSION['full_name']));
} else {
    // Return an error message if session full name is not set
    echo json_encode(array('error' => 'Session full name not found'));
}
?>
