<?php

require_once 'db.php';

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

require 'registration_mail.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Create a new PHPMailer instance

$response = array();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (($_POST['action'] === 'userLogin')) {

        $response = Login($_POST);
        echo json_encode($response);
        die();
    }

    if (($_POST['action'] === 'userSignup')) {

        $response = userSignup($_POST);
        echo json_encode($response);
        die();
    }

    if (($_POST['action'] === 'logOut')) {

        $response = Logout();
        echo json_encode($response);
        die();
    }

    if (($_POST['action'] === 'checkAuth')) {

        $response = checkAuth();
        echo json_encode($response);
        die();
    }

    if (($_POST['action'] === 'checkPermission')) {
        $response = checkPermission($_POST);
        echo json_encode($response);
        die();
    }

    if (($_POST['action'] === 'getCurrentUser')) {
        $response = getCurrentUser();
        echo json_encode($response);
        die();
    }

    if (($_POST['action'] === 'updatePass')) {
        $response = updatePass($_POST);
        echo json_encode($response);
        die();
    }

    if (($_POST['action'] === 'resetRequest')) {
        $response = resetRequest($_POST);
        echo json_encode($response);
        die();
    }

    if (($_POST['action'] === 'resetPass')) {
        $response = resetPass($_POST);
        echo json_encode($response);
        die();
    }
}


function resetRequest($data)
{
    global $db;
    global $con;
    $response = ['status' => false, 'message' => 'Enter valid email'];
    if (!empty($data)) {
        $email =  $data['email'];
        $user = $db->fetch($con, USERS, array('email' => $email, 'isDeleted' => 0));
        if (!empty($user)) {
            if (sendLink($email)) {
                return ['status' => true, 'message' => 'Link sent successfully. '];
            } else {
                return $response;
            }
        } else {
            return ['status' => false, 'message' => 'User does not exists. '];
        }
    }
    return $response;
}

function sendLink($userEmail)
{

    $mail = new PHPMailer(true);
    $token = bin2hex(random_bytes(50));
    try {
        $mail->IsSMTP();
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = "ssl";
        $mail->Host = "smtp.gmail.com";
        $mail->Port = 465;
        $mail->Username = "harkesh5445@gmail.com";
        $mail->Password = "bjwpkzzarmpxyfhv";
        $mail->setFrom(DEV_MAIL, 'Prosper India Foundation');
        $mail->addAddress($userEmail);
        $mail->isHTML(true);
        $mail->Subject = 'Password Reset Request';
        $mailBody = file_get_contents('password_reset_template.html');
        $resetLink = BASE_URL . "reset_password.html?email=" . $userEmail . "&token=" . $token;
        $mailBody = str_replace('{{reset_link}}', $resetLink, $mailBody);

        // Assign the body
        $mail->Body = $mailBody;

        // Send the email
        $mail->send();
        $_SESSION['token'] = $token;
        return true;
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}

function resetPass($data)
{
    global $db;
    global $con;
   // print_r($_SESSION['token']);die();
    if (isset($_SESSION['token']) && (strcmp($_SESSION['token'], $data['token']) == 0)) {
       // die("==========");
        if (!empty($data['password']) && !empty($data['confirm_password'])) {
            if ($data['password'] == $data['confirm_password']) {
                $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
                $db->update($con, USERS, array('password' => $data['password']), array('email' => $data['email']));
                $_SESSION['token'] = "";
                return array('status' => true, 'message' => 'Password Updated Successfully', 'base_url' => BASE_URL);
            }
            return array('status' => false, 'message' => 'Password not matched. ');
        }
        return array('status' => false, 'message' => 'Please enter password and confirm password. ');
    }
    return array('status' => false, 'message' => 'Link expired');
}

// ee0aa19b0c3a0d532989fd44581bb2e2da371098df418de5e4d48acbafa907b18c07f5d9d7484e736384841981a624e82ccb
// ee0aa19b0c3a0d532989fd44581bb2e2da371098df418de5e4d48acbafa907b18c07f5d9d7484e736384841981a624e82ccb

function updatePass($data)
{
    global $db;
    global $con;
    if (isset($_SESSION['uid']) && !empty($_SESSION)) {

        $user = $db->fetch($con, USERS, array('id' => $_SESSION['uid'], 'isDeleted' => 0));
        if (!empty($user)) {
            if (!empty($data['oldpassword'])) {
                if (password_verify($data['oldpassword'], $user[0]['password'])) {

                    if (!empty($data['newpassword']) && !empty($data['cpassword'])) {
                        if ($data['newpassword'] == $data['cpassword']) {
                            $data['newpassword'] = password_hash($data['newpassword'], PASSWORD_DEFAULT);
                            $db->update($con, USERS, array('password' => $data['newpassword']), array('id' => $_SESSION['uid'], 'isDeleted' => 0));
                            Logout();
                            return array('status' => true, 'message' => 'Password Updated Successfully', 'base_url' => BASE_URL);
                        }
                        return array('status' => false, 'message' => 'Password not matched. ');
                    }
                    return array('status' => false, 'message' => 'Please enter password and confirm password. ');
                }
                return array('status' => false, 'message' => 'Incorrect old password. ');
            }
            return array('status' => false, 'message' => 'Enter old password. ');
        }
        return array('status' => false, 'message' => 'User not found. ');
    }
}




function getCurrentUser()
{
    if (isset($_SESSION['uid']) && !empty($_SESSION)) {
        return array('status' => true, 'userId' => $_SESSION['uid'], 'base_url' => BASE_URL);
    }
}

function checkPermission($data)
{

    $response = array('status' => false);


    if (isset($_SESSION['uid']) && !empty($_SESSION)) {
        $permissions = $_SESSION['permissions'];
        $url = $data['url'];

        if (strpos($url, 'TfMap') !== false) {
            if (in_array('TfMap', $permissions)) {
                $response['status'] = true;
            }
        } elseif (
            strpos($url, 'adminConsole') !== false || strpos($url, 'users') !== false ||
            strpos($url, 'roles') !== false || strpos($url, 'permissions') !== false ||
            strpos($url, 'logs') !== false || strpos($url, 'contacts') !== false
        ) {
            if (in_array('admin', $permissions)) {
                $response['status'] = true;
            }
        }
    }

    return $response;
}


function checkAuth()
{
    global $db;
    global $con;
    $permissions = array();
    if (isset($_SESSION['uid']) && !empty($_SESSION)) {

        return array('status' => true, 'redirectUrl' => BASE_URL . 'dashboard/');
    } else {

        return array('status' => false, 'redirectUrl' => BASE_URL . 'login.html');
    }
}

function Logout()
{
    if (isset($_SESSION['uid']) && !empty($_SESSION)) {
        session_unset();
        session_destroy();
        return array('status' => true, 'base_url' => BASE_URL, 'message' => 'Logout successfully.');
    } else {
        return array('status' => true, 'base_url' => BASE_URL, 'message' => 'Logout successfully.');
    }
}
function Login($data)
{

    global $db;
    global $con;
    if (!empty($data['email']) && !empty($data['password'])) {
        $email = $data['email'];
        $password = $data['password'];
        if ($row = $db->fetch($con, USERS, array('email' => $email))) {
            $row = $row[0];
            if ($row['is_verified'] == 1) {
                if ($row['status'] == 1) {
                    if ($row['isDeleted'] == 0) {
                        if (password_verify($password, $row['password'])) {
                            $_SESSION['uid'] = (int) $row['id'];
                            $_SESSION['is_superadmin'] = (int) $row['is_superadmin'];
                            $_SESSION['userData'] = $row;

                            $user_permissions = $db->fetch($con, USER_PERMISSIONS, array('user_id' => $row['id'], 'status' => 1));
                            if (!empty($user_permissions)) {
                                $permissions = array();
                                $roles = array();
                                foreach ($user_permissions as $key => $value) {
                                    $permissionData = $db->fetch($con, PERMISSIONS, array('id' => $value['permission_id']));
                                    // print_r($permissionData);die;
                                    $permissions[] = $permissionData[0]['name'];
                                    $roleData = $db->fetch($con, ROLES, array('id' => $value['role_id']));
                                    //print_r($roleData);
                                    $roles[] = isset($roleData[0]['name']) ?: '';
                                }
                                // die;
                                $_SESSION['permissions'] = array_values($permissions);
                                $_SESSION['roles'] = array_values($roles);
                            }
                            // print_r($response);die;
                            updateLogs($row);
                            return array('status' => true, 'base_url' => BASE_URL, 'data' => $_SESSION, 'message' => 'Login successfully.');
                        }
                        return array('status' => false, 'message' => 'Login failed. The password may be wrong.');
                    }
                    return array('status' => false, 'message' => 'Login failed. Your account is deleted.');
                }
                return array('status' => false, 'message' => 'Login failed. Your account is disabled.');
            }
            return array('status' => false, 'message' => 'Login failed. Your account is not verified.');
        }
        return array('status' => false, 'message' => 'Login failed.  Please check your email and password.');
    }
    return array('status' => false, 'message' => 'Please enter valid email or password.');
}


function userSignup($data)
{
    global $db;
    global $con;

    if (!empty($data)) {
        // Validate email
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return array('status' => false, 'message' => 'Please enter a valid email address.');
        }

        // Validate phone number
        if (!validatePhone($data['phone'])) {
            return array('status' => false, 'message' => 'Please enter a valid phone number.');
        }

        if ((strlen($data['password']) >= 8) && ($data['password'] === $data['c_password'])) {

            $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);


            if ($db->exist($con, $data['email'], USERS)) {
                return array('status' => false, 'message' => 'Email already exists.');
            }

            $insertArr = array(

                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => '+91' . $data['phone'],
                'password' => $data['password']
            );
            $result = $db->create($con, USERS, $insertArr);

            if ($result) {
                // $insert = array('user_id' => $result, 'permission_id' => 2, 'role_id' => 2);
                // $db->create($con, USER_PERMISSIONS, $insert);

                $email_data = array(
                    'name' => $data['name'],
                    'from' => $data['email'],
                    'subject' => 'Registration Mail',
                    'body' => 'I hope this message finds you well. My name is ' . $data['name'] . ', and I am writing to request registration for an account on your platform.'
                );
                if (send_mail($email_data)) {
                    return array('status' => true, 'uid' => $result, 'message' => 'Your email has been registered successfully. You will be able to log in after your account is verified.');
                }
            } else {
                return array('status' => false, 'message' => 'Failed to add user.');
            }
        } else {
            return array('status' => false, 'message' => 'Password does not match.');
        }
    } else {
        return array('status' => false, 'message' => 'Invalid data.');
    }
}


function getBrowserAndOS($userAgent)
{

    $browsers = [
        'Edge' => 'Edge',
        'Trident' => 'Internet Explorer',
        'MSIE' => 'Internet Explorer',
        'Opera Mini' => 'Opera Mini',
        'Opera|OPR' => 'Opera',
        'Firefox' => 'Firefox',
        'Chrome' => 'Chrome',
        'Safari' => 'Safari',
    ];

    $osArray = [
        'Windows NT 10.0' => 'Windows 10',
        'Windows NT 6.3' => 'Windows 8.1',
        'Windows NT 6.2' => 'Windows 8',
        'Windows NT 6.1' => 'Windows 7',
        'Windows NT 6.0' => 'Windows Vista',
        'Windows NT 5.1' => 'Windows XP',
        'Windows NT 5.0' => 'Windows 2000',
        'Mac OS X' => 'Mac OS X',
        'Android' => 'Android',
        'Linux' => 'Linux',
        'iPhone' => 'iPhone',
        'iPad' => 'iPad',
    ];

    $browser = 'Unknown';
    $os = 'Unknown';

    // Detect Browser
    foreach ($browsers as $key => $value) {
        if (preg_match('/' . $key . '/i', $userAgent)) {
            $browser = $value;
            break;
        }
    }

    // Detect Operating System
    foreach ($osArray as $key => $value) {
        if (preg_match('/' . $key . '/i', $userAgent)) {
            $os = $value;
            break;
        }
    }

    return ['browser' => $browser, 'os' => $os];
}

function updateLogs($data)
{
    global $db;
    global $con;

    $userAgent = $_SERVER['HTTP_USER_AGENT'];
    $info = getBrowserAndOS($userAgent);
    $browser = $info['browser'];
    $os = $info['os'];
    $now = date("Y-m-d H:i:s");
    $id = $data['id'];

    $array = array(
        'user_id' => $id,
        'ip' => $_SERVER['REMOTE_ADDR'],
        'browser' => $browser,
        'platform' => $os,
        'last_login' => $now
    );

    $db->create($con, LOGIN_LOGS, $array);
    return true;
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
    $userName = $email_data['name'];
    $subject = $email_data['subject'];
    $Date = date('Y-m-d H:i:s');
    $body = userRegistrationTemplate($userName, $from, $Date);

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
