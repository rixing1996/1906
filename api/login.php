<?php
    $phone = $_GET["phone"];
    $pwd = $_GET["pwd"];
    $email = $_GET["email"];
    $db = mysqli_connect("127.0.0.1","root","","project");
    mysqli_query($db,"SET NAMES utf8");
    $sql = 'insert into register (phone,pwd,email) values ("'.$phone.'","'.$pwd.'","'.$email.'")';
    $res = mysqli_query($db,$sql);
    echo $res;
    mysqli_close($db);

?>