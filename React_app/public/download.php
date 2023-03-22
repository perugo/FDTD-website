<?php

$filename="/home/perugo/html2_project/inputfol/bitmap_info.txt";
$filename2="/home/perugo/html2_project/inputfol/info.txt";
$filename3="/home/perugo/html2_project/test.mp4";
$jarFilePath = "/home/perugo/html2_project/FDTDVideo.jar";

$bitmap=$_POST['bitmap'];
$xnum=$_POST['xnum'];
$ynum=$_POST['ynum'];
$dx=$_POST['dx'];
$frequency=$_POST['frequency'];
$source_x=$_POST['source_x'];
$source_y=$_POST['source_y'];

if(isset($bitmap) && isset($xnum) && isset($ynum) && isset($dx) && isset($frequency)  && isset($source_x) && isset($source_y)){
$fp = fopen($filename,"wb");
    fwrite($fp,$bitmap);
    fclose($fp);
    $fp2 = fopen($filename2,"wb");
    $data=$xnum . "\n" . $ynum . "\n" . $dx . "\n". $frequency . "\n" . $source_x . "\n" . $source_y;
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
