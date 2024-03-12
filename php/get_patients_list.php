<?php
// Include database connection code
include_once 'db_connect.php';

$query = "SELECT * FROM patients_list";
$result = mysqli_query($conn, $query);

$patientList = array();
if(mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $patientList[] = $row;
    }
}

echo json_encode($patientList);
?>
