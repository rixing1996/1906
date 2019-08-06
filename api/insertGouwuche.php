<?php
    $phone = $_GET["phone"];
    $gid = $_GET["gid"];
    $url = $_GET["url"];
    $desc = $_GET["desc"];
    $price1 = $_GET["price1"];
    $price2 = $_GET["price2"];
    $db = mysqli_connect("127.0.0.1","root","","project");
    mysqli_query($db,"SET NAMES utf8");
    $sql = 'select * from gouwuche where phone="'.$phone.'" and gid="'.$gid.'"';
    $result = mysqli_query($db,$sql);
    $num = mysqli_num_rows($result);
    echo $num;
    


    mysqli_close($db);



?>