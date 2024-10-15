<?php
require_once 'db.php';

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

require 'contact_us_mail.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

global $db;
global $con;

$response = array();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (!empty($_POST)) {

        $data = array(
            'firstname' => $_POST['name'],
            'lastname' => $_POST['lastname'],
            'email' => isset($_POST['email']) ? $_POST['email'] : '',
            'phone' => $_POST['country_code'] . $_POST['phone'],
            'message' => $_POST['message']
        );

        if (!empty($_POST['email']) && (validateEmail($_POST['email']) == false)) {
            $response = array('status' => false, 'message' => 'Please enter valid email.');
            echo json_encode($response);
            die;
        }

        $email_data = array(
            'from' => $_POST['email'],
            'subject' => 'Contact message',
            'name'=>  $_POST['name'].' '.$_POST['lastname'],
            'body'=>$_POST['message']
        );
        
        if (send_mail($email_data)) {
            if (validatePhone($_POST['phone'])) {
                if ($db->create($con, CONTACT_US, $data)) {
                 $response = array('status' => true, 'message' => 'Your message has been sent successfully. We will contact you soon.');
                } else {

                    $response = array('status' => false, 'message' => 'Your message could not be sent.');
                }
            } else {
                $response = array('status' => false, 'message' => 'Please enter valid phone number.');
            }
        } else {
            $response = array('status' => false, 'message' => 'Something went wrong. ');
        }
    } else {
        $response = array('status' => false, 'message' => 'Invalid data.');
    }

    echo json_encode($response);
    die;
}

function validateEmail($email)
{
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return true;
    } else {
        return false;
    }
}



function validatePhone($phone)
{
    $phone = preg_replace('/[\s\-\(\)]+/', '', $phone);
    if (preg_match('/^\d{10}$/', $phone)) {
        return true;
    } else {
        return false;
    }
}

function send_mail($email_data)
{
    $to = DEV_MAIL;
    $from = $email_data['from'];
    $subject = $email_data['subject'];
    $message = $email_data['body'];
    $name = $email_data['name'];
    $body = contactUsTemplate($name, $from, $subject,$message);
    $mail = new PHPMailer(true);
    //$mail->SMTPDebug = 3; 
    $mail->IsSMTP();
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = "ssl";
    //$mail->Host = "smtp-relay.brevo.com";
    $mail->Host = "smtp.gmail.com";
    $mail->Port = 465;
    //$mail->Username = "74ef22001@smtp-brevo.com";Z
    //$mail->Password = "RXfpI239KBHZ0UTG";
    $mail->Username = "harkesh5445@gmail.com";
    $mail->Password = "bjwpkzzarmpxyfhv";
    $mail->AddAddress($to);
    $mail->SetFrom($from, "Prosper India Foundation");
    $mail->isHTML(true); 
    $mail->Subject = $subject;
    $mail->Body = $body;

    try {
        $mail->Send();
        return true;
    } catch (Exception $e) {
        echo "Fail - " . $mail->ErrorInfo;
    }
}
