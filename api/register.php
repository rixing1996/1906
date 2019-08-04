<?php
    $phone = $_GET["phone"];
    $db = mysqli_connect("127.0.0.1","root","","project");
    mysqli_query($db,"SET NAMES utf8");
    $sql = "select * from register where phone=".$phone;
    $result = mysqli_query($db,$sql);
    $res = mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
    mysqli_close($db);

?>