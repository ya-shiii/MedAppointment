<?php
// Include database connection code
include_once 'db_connect.php';

// Fetch data from doctortypes table
$query = "SELECT * FROM doctortypes";
$result = mysqli_query($conn, $query);

$doctortypes = array();
if(mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $doctortypes[] = $row;
    }
}

// Return the data as JSON
echo json_encode($doctortypes);
?>
