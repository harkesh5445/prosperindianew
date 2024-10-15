<?php
date_default_timezone_set("Asia/Calcutta");
ini_set('session.gc_maxlifetime', 345600);
ini_set('session.cookie_lifetime', 345600);
session_set_cookie_params(345600);

ob_start();
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

$currentHostname = $_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'] ?? 'unknown';

$ip = $_SERVER['REMOTE_ADDR'];
if (($currentHostname == 'localhost') && ($ip == '::1')) {
    define('BASE_URL', 'http://localhost/pif/');
    define('SITE_NAME', 'Prosper India');
    define('DB_HOST', 'localhost');
    define('DB_NAME', 'education');
    define('DB_USER', 'root');
    define('DB_PASSWORD', '');
    define('DEV_MAIL', 'hkumar@techferry.com');

} elseif (($currentHostname == 'prosperindia.org') || ($currentHostname == 'www.prosperindia.org')) {
    define('BASE_URL', 'https://prosperindia.org/');
    define('SITE_NAME', 'Prosper India');
    define('DB_HOST', 'localhost');
    define('DB_NAME', 'pif');
    define('DB_USER', 'pif_user');
    define('DB_PASSWORD', 'pif!$W6wi2');
    define('DEV_MAIL', 'dmalik@techferry.com');
}

//database tables
define('CONTACT_US', 'Contact_Us');
define('LOGIN_LOGS', 'Login_Logs');
define('USERS', 'Users');
define('ROLES', 'Roles');
define('PERMISSIONS', 'Permissions');
define('USER_PERMISSIONS', 'User_Permissions');

 $curren_link = $_SERVER['SCRIPT_NAME'];

 // yOUTUBE
 define('YOUTUBE_KEY','AIzaSyBp01wdq2l2Bj4tMfp_JBBSl59IXI1sang');





