<?php
    $phone = $_GET["phone"];
    $gid = $_GET["gid"];
    $num = $_GET["num"];
    $db = mysqli_connect("127.0.0.1","root","","project");
    mysqli_query($db,"SET NAMES utf8");
    $sql = 'update gouwuche set num="'.$num.'" where phone="'.$phone.'" and gid="'.$gid.'"';
    mysqli_query($db,$sql);

    mysqli_close($db);


?>