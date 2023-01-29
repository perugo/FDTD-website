<?php

$filename="/home/your-username/html2_project/inputfol/bitmap_info.txt";
$filename2="/home/your_username/html2_project/inputfol/info.txt";
$filename3="/home/your_username/html2_project/test.mp4";
$jarFilePath = "/home/your_username/html2_project/FDTDVideo.jar";

$bitmap=$_POST['bitmap'];
$xnum=$_POST['xnum'];
$znum=$_POST['znum'];
$resolution=$_POST['resolution'];
$frequency_coefficient=$_POST['frequency_coefficient'];
$frequency_power=$_POST['frequency_power'];


if(isset($bitmap) && isset($xnum) && isset($znum) && isset($resolution) && isset($frequency_coefficient) && isset($frequency_power)){
$fp = fopen($filename,"wb");
    fwrite($fp,$bitmap);
    fclose($fp);
    $fp2 = fopen($filename2,"wb");
    $data=$xnum . "\n" . $znum . "\n" . $resolution . "\n" .$frequency_coefficient . "\n" . $frequency_power;
    fwrite($fp2,$data);
    fclose($fp2);
    

    $cmd = escapeshellcmd("java -jar " . $jarFilePath);
    $result=shell_exec($cmd);
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="'.basename($filename3).'"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($filename3));
    readfile($filename3);
    
    exit;
}else{
}


?>
