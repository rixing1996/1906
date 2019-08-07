<?php
    $phone = $_GET["phone"];
    $db = mysqli_connect("127.0.0.1","root","","project");
    mysqli_query($db,"SET NAMES utf8");
    $sql = 'delete from gouwuche where phone="'.$phone.'"';
    mysqli_query($db,$sql);

    mysqli_close($db);




?>