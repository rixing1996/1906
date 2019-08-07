<?php
    $phone = $_GET["phone"];
    $db = mysqli_connect("127.0.0.1","root","","project");
    mysqli_query($db,"SET NAMES utf8");
    $sql = 'select * from gouwuche where phone="'.$phone.'"';
    $exe = mysqli_query($db,$sql);
    $result = mysqli_fetch_all($exe,MYSQLI_ASSOC);
    echo json_encode($result,JSON_UNESCAPED_UNICODE);


    mysqli_close($db);


?>