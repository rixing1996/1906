<?php
    $phone = $_GET["phone"];
    $gid = $_GET["gid"];
    $url = $_GET["url"];
    $desc = $_GET["desc"];
    $price1 = $_GET["price1"];
    $price2 = $_GET["price2"];
    $num1 = $_GET["num"];
    $db = mysqli_connect("127.0.0.1","root","","project");
    mysqli_query($db,"SET NAMES utf8");
    $sql = 'select * from gouwuche where phone="'.$phone.'" and gid="'.$gid.'"';
    $result = mysqli_query($db,$sql);
    $num = mysqli_num_rows($result);
    if($num == 0){
        $sql1 = 'insert into gouwuche (phone,gid,url,desc1,price1,price2,num) values ("'.$phone.'","'.$gid.'","'.$url.'","'.$desc.'","'.$price1.'","'.$price2.'","'.$num1.'")';
    } else if($num == 1){
        $sql1 = 'update gouwuche set num=num+"'.$num1.'" where phone="'.$phone.'" and gid="'.$gid.'"';
    }
    $back = mysqli_query($db,$sql1);
    echo $num1;
    


    mysqli_close($db);

?>
