<?php
// Start the session
session_start();

// Unset all of the session variables
$_SESSION = array();

// Delete the session cookie
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Destroy the session
session_destroy();

// Delete user-related cookies
setcookie('user_id', '', time() - 3600, '/');
setcookie('last_name', '', time() - 3600, '/');

// Redirect to the login page or home page
header('Location: ../'); // Adjust the path based on your file structure
exit();
?>
