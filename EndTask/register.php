<?php

$userName = $_POST["userName"];
$email = $_POST["Email"];
$password = $_POST["Password"];


//DB Connection
$connection = new mysqli("localhost", "root", "", "validateuser");
if ($connection->connect_error) {
    echo "$connection->connect_error";
    die("Connection Failed : " . $connection->connect_error);
} else {
    $statement = $connection->prepare("insert into registration(userName, email, password) values(?, ?, ?)");
    $statement->bind_param("sss", $userName, $email, $password);
    $execvalue = $statement->execute();
    echo "Your Registration Is Succesfull!";
    $statement->close();
    $connection->close();
}
