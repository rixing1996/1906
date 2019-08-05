<?php
    $type = $_GET["type"];
    $db = mysqli_connect("127.0.0.1","root","","project");
    mysqli_query($db,"SET NAMES utf8");
    $sql = 'select * from good1 where type2="'.$type.'"';
    $exe = mysqli_query($db,$sql);
    $result = mysqli_fetch_all($exe,MYSQLI_ASSOC);
    echo json_encode($result,JSON_UNESCAPED_UNICODE);

    mysqli_close($db);


?>