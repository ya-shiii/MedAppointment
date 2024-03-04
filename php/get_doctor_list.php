<?php
// Include database connection code
include_once 'db_connect.php';

$query = "SELECT * FROM doctor_list";
$result = mysqli_query($conn, $query);

$doctorList = array();
if(mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $doctorList[] = $row;
    }
}

echo json_encode($doctorList);
?>
