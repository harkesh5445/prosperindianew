<?php
// email_templates/contact_us_template.php

/**
 * Generates the HTML content for the Contact Us Notification email.
 *
 * @param string $userName
 * @param string $userEmail
 * @param string $subject
 * @param string $message
 * @return string
 */
function contactUsTemplate($userName, $userEmail, $subject, $message) {
    $year = date('Y');
    return "
    <!DOCTYPE html>
    <html lang='en'>
    <head>
      <meta charset='UTF-8'>
      <meta name='viewport' content='width=device-width, initial-scale=1'>
      <title>New Contact Us Message</title>
      <style>
        /* Include the same styles as provided in the Contact Us Notification */
        /* ... (styles from the Contact Us Template above) ... */
      </style>
    </head>
    <body>
      <table class='email-container' width='100%' cellpadding='0' cellspacing='0'>
        <!-- Header -->
        <tr>
          <td class='email-header'>
            <h1>New Contact Us Message</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td class='email-body'>
            <p>Hi, </p>
            <p>You have received a new message through the contact form. Here are the details:</p>
            <ul>
              <li><strong>Name:</strong> $userName</li>
              <li><strong>Email:</strong> $userEmail</li>
              <li><strong>Subject:</strong> $subject</li>
              <li><strong>Message:</strong> $message</li>
            </ul>
            <p>Please follow up with the user at your earliest convenience.</p>
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
