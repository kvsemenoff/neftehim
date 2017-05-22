<?php
$to = "test@yandex.ru ";
$phone = $_POST['phone'];
$email = $_POST['email'];
$uname = $_POST['uname'];
$text = $_POST['message'];
$nameorg = $_POST['nameorg'];
$city = $_POST['city'];
$nameprod = $_POST['nameprod'];
$amountprod = $_POST['amountprod'];
$date = $_POST['date'];
$contactface = $_POST['contactface'];
$contactinfo = $_POST['contactinfo'];
$comment = $_POST['comment'];
// Формирование заголовка письма
$subject  = "Новое сообщение";
$headers  = "From: info@starlight.space" . "\r\n";
$headers .= "Reply-To: info@starlight.space".  "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";
// Формирование тела письма
$msg  = "<html><body>";
$msg .= "<h2>Новое сообщение</h2>\r\n";
if (isset($phone)){
	$msg .= "<p><strong>Телефон:</strong> ".$phone."</p>\r\n";
}
if (isset($uname)){
	$msg .= "<p><strong>Имя:</strong> ".$uname."</p>\r\n";
}
if (isset($email)){
	$msg .= "<p><strong>Email:</strong> ".$email."</p>\r\n";
}

if (isset($nameorg)){
	$msg .= "<p><strong>Название организации:</strong> ".$city."</p>\r\n";
}
if (isset($city)){
	$msg .= "<p><strong>Город:</strong> ".$city."</p>\r\n";
}
if (isset($nameprod)){
	$msg .= "<p><strong>Наименование продукта:</strong> ".$nameprod."</p>\r\n";
}
if (isset($amountprod)){
	$msg .= "<p><strong>Требуемый объем продукта:</strong> ".$amountprod."</p>\r\n";
}
if (isset($date)){
	$msg .= "<p><strong>Дата отгрузки:</strong> ".$date."</p>\r\n";
}
if (isset($contactinfo)){
	$msg .= "<p><strong>Контактное лицо:</strong> ".$contactinfo."</p>\r\n";
}
if (isset($text)){
	$msg .= "<p><strong>Сообщение:</strong> ".$text."</p>\r\n";
}
if (isset($contactinfo)){
	$msg .= "<p><strong>Контактная информация:</strong> ".$contactinfo."</p>\r\n";
}
if (isset($comment)){
	$msg .= "<p><strong>Комментарий:</strong> ".$comment."</p>\r\n";
}
$msg .= "</body></html>";
// отправка сообщения
@mail($to, $subject, $msg, $headers);
?>