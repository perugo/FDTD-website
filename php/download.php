<?php
/*
$filename2="info.txt";
if(isset($_POST['history'])){
    echo $_POST['history'];
    $filename2="info.txt";
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="'.basename($filename2).'"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($filename2));
    readfile($filename2);
    exit;
    
    echo "fafa";
    //some php operation
}else{
    
    $filename2="myText.txt";
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="'.basename($filename2).'"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($filename2));
    readfile($filename2);
    exit;
    
    echo "download.php : data is not registered";
}
*/
echo 'before  post----';
$bitmap=$_POST['bitmap'];
$xnum=$_POST['xnum'];
$znum=$_POST['znum'];
$resolution=$_POST['resolution'];
$frequency_coefficient=$_POST['frequency_coefficient'];
$frequency_power=$_POST['frequency_power'];

$filename="bitmap_info.txt";
$filename2="info.txt";
$filegomi="myText.txt";
$filename3="test.mp4";
echo 'download.php is here -----';
/*
$fp = fopen($filegomi,"wb");
fwrite($fp,"reading");
fclose($fp);
*/
if(isset($bitmap) && isset($xnum) && isset($znum) && isset($resolution) && isset($frequency_coefficient) && isset($frequency_power)){
    $fp = fopen($filename,"wb");
    fwrite($fp,$bitmap);
    fclose($fp);
    $fp2 = fopen($filename2,"wb");
    $data=$xnum . "\n" . $znum . "\n" . $resolution . "\n" .$frequency_coefficient . "\n" . $frequency_power;
    fwrite($fp2,$data);
    fclose($fp2);

    $jarFilePath = "C:/Users/girar/Downloads/FDTDVideo.jar";

    $cmd = escapeshellcmd("java -jar " . $jarFilePath);
    shell_exec($cmd);

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
    echo 'wronging';
    $fp = fopen($filegomi,"wb");
fwrite($fp,"error");
fclose($fp);
    /*
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="'.basename($filename2).'"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($filename2));
    readfile($filename2);
    exit;
    */
}


?>