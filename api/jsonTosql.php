<?php
    $data = file_get_contents("../data/list1.json");
    $result = json_decode($data, true);
    $db = mysqli_connect("127.0.0.1", "root", "", "project");
    mysqli_query($db, "SET NAMES utf8");
    for ($i = 0; $i < count($result); $i++) {
        $sql = 'insert into good1 (desc1,other,imgUrl1,price1,count,imgUrl2,desc2,gcode,price2,price3,brand,type,grade,comment,type2,address)
                    values ("'.$result[$i]['desc1'].'","'.$result[$i]['other'].'","'.$result[$i]['imgUrl1'].'","'. $result[$i]['price1'].'","'. $result[$i]['count'].'",
                    "'.$result[$i]['imgUrl2'].'","'.$result[$i]['desc2'].'","'.$result[$i]['gcode'].'","'.$result[$i]['price2'].'","'.$result[$i]['price3'].'",
                    "'.$result[$i]['brand'].'","'.$result[$i]['type1'].'","'.$result[$i]['grade'].'","'.$result[$i]['comment'].'","'.$result[$i]['type2'].'",
                    "'.$result[$i]['address'].'")';
        $res = mysqli_query($db,$sql);
        echo $res;
    }
    mysqli_close($db);
?>
