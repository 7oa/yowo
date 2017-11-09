<?
if(isset($_POST['email'])&&$_POST['email']!=""){
    $email = $_POST['email'];

    //запись в файл
    $file = 'emails.txt';
    $current = file_get_contents($file);
    $current .= $email."\n";
    file_put_contents($file, $current);

    //отправка email
    $to = $email;
    $subject = 'Заголовок';
    $message = file_get_contents('template.html');
    $headers = "Content-type: text/html; charset=utf-8 \r\n";
    $headers .= "From: Отправитель <from@example.com>\r\n";
    mail($to, $subject, $message, $headers);
    echo $email;
}
?>