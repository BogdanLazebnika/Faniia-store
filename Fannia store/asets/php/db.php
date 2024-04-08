<?php

$servername = "localhost";
$username = "root";
$password = "Brhalt14";
$dbname = "faniia";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed" . mysqli_connect_error());
} else {
    "Connected successfully";
}
?>