<?php
    $gid = $_GET["gid"];
    $db = mysqli_connect("127.0.0.1","root","","project");
    mysqli_query($db,"SET NAMES utf8");
    $sql = 'select * from good1 where gid="'.$gid.'"';
    $exe = mysqli_query($db,$sql);
    $res = mysqli_fetch_assoc($exe);
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
    mysqli_close($db);

?>