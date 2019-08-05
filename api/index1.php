<?php
    $type = $_GET["typeC"];
    $db = mysqli_connect("127.0.0.1","root","","project");
    mysqli_query($db,"SET NAMES utf8");
    if($type == 0){
        $sql = 'select * from good1 where type2="'.$type.'"';
        $result = mysqli_query($db,$sql);
        $res = mysqli_fetch_all($result,MYSQLI_ASSOC);
        echo json_encode($res,JSON_UNESCAPED_UNICODE);
    } 

    mysqli_close($db);
?>