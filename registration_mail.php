<?php
// email_templates/user_registration_template.php

/**
 * Generates the HTML content for the User Registration Notification email.
 *
 * @param string $userName
 * @param string $userEmail
 * @param string $registrationDate
 * @param string $adminDashboardUrl
 * @return string
 */
function userRegistrationTemplate($userName, $userEmail, $registrationDate) {
    $year = date('Y');
    $Url = 'http://localhost/pif/login.html';
    return "
    <!DOCTYPE html>
    <html lang='en'>
    <head>
      <meta charset='UTF-8'>
      <meta name='viewport' content='width=device-width, initial-scale=1'>
      <title>New User Registration Alert</title>
      <style>
        /* Include the same styles as provided in the User Registration Notification */
        /* ... (styles from the User Registration Template above) ... */
      </style>
    </head>
    <body>
      <table class='email-container' width='100%' cellpadding='0' cellspacing='0'>
        <!-- Header -->
        <tr>
          <td class='email-header'>
            <h1>New User Registration</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td class='email-body'>
            <p>Hi, </p>
            <p>A new user has just registered on your platform. Here are the details:</p>
            <ul>
              <li><strong>Name:</strong> $userName</li>
              <li><strong>Email:</strong> $userEmail</li>
              <li><strong>Registration Date:</strong> $registrationDate</li>
            </ul>
            <p>You can manage the user’s account by accessing the admin panel.</p>
            <a href='$Url' class='btn'>Login</a>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td class='email-footer'>
            <p>&copy; $year Prosper India Foundation. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>";
}
