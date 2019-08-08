<?php
    $phone = $_GET["phone"];
    $gid = $_GET["gid"];
    $comment1 = $_GET["comment1"];
    $db = mysqli_connect("127.0.0.1","root","","project");
    mysqli_query($db,"SET NAMES utf8");
    $sql = 'insert into comment (phone,gid,comment1) values ("'.$phone.'","'.$gid.'","'.$comment1.'")';
    mysqli_query($db,$sql);

    mysqli_close($db);



?>