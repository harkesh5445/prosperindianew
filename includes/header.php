<?php
require_once '../db.php';

if (empty($_SESSION['uid']) && !$_SESSION) {
    header("location:" . BASE_URL . 'login.html');
}
$permissions = array();
$USER_PERMISSIONS = $db->fetch($con, USER_PERMISSIONS, array('user_id' => $_SESSION['uid'], 'status' => 1));

if ($USER_PERMISSIONS) {
    foreach ($USER_PERMISSIONS as $key => $value) {
        $res = $db->fetch($con, PERMISSIONS, array('id' => $value['permission_id']));
        $permissions[] = $res[0]['name'];
    }
    array_values($permissions);
}

//print_r($permissions);die();

?>

<!DOCTYPE html>
<html lang="en">
<div id="response"></div>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Prosper India</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ti-icons@0.1.2/css/themify-icons.min.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>css/style1.css">

    <!-- users -->
    <?php if (!empty($curren_link) && strpos($curren_link, 'users.php')) { ?>
        <link rel="stylesheet" href="<?= BASE_URL ?>css/users.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/css/select2.min.css">
    <?php } ?>
    <!-- users -->

    <style>
        .alert1 {

            position: fixed;
            top: 50%;
            left: 70%;
            transform: translate(-50%, -50%);
            padding: 30px 70px;
            border-radius: 5px;
            font-weight: bold;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.5s;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

        }

        .success1 {

            color: green;
            background-color: #d4edda;
            border: 1px solid #c3e6cb;

        }

        .failed1 {

            color: red;
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;

        }

        .show {
            opacity: 1;
        }

        .navbar .navbar-menu-wrapper {

            background: #2c4197 !important;

        }

        .navbar .navbar-brand-wrapper {

            background: #2c4197 !important;

        }

        .navbar .navbar-brand-wrapper .navbar-brand img {

            width: calc(290px - 130px) !important;
            max-width: 100%;
            height: 50px !important;
            margin: auto;
            vertical-align: middle;

        }

        a {

            text-decoration: none !important;

        }

        .active {
            color: white !important;
            font-weight: 400 !important;
            font-weight: 400 !important;
        }

        .breadcrumb-item a {
            color: #6c757d !important;
            font-weight: 400 !important;
            font-weight: 400 !important;
        }

        .breadcrumb-item a:hover {
            color: #0d6efd !important;
        }

        .dsmnone22 {
            display: none;
        }

        @media screen and (max-width: 992px) {
            .dsmnone {
                display: none;
            }
        }
    </style>
</head>

<body>

    <div class="container-scroller">
        <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <a class="navbar-brand brand-logo me-5" href="<?= BASE_URL ?>dashboard/"><img src="../images/pip.png"
                        class="me-2" alt="logo" /></a>
                <a class="navbar-brand brand-logo-mini" href="<?= BASE_URL ?>dashboard/"><img src="../images/pip.png"
                        alt="logo" /></a>
            </div>
            <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                <span class="dsmnone">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb" id="dynamicBreadcrumb" style="background-color: transparent!important;">
                            <li class="breadcrumb-item"><a href="<?= BASE_URL; ?>dashboard/">Home </a></li>
                        </ol>
                    </nav>
                </span>
                <script>
                    <?php
                    if (strpos(BASE_URL, 'localhost') !== false) {
                        $baseUrl = "/pif/";
                        $path = "window.location.pathname";
                    } else {
                        $baseUrl = BASE_URL;
                        $path = "window.location.href";
                    }
                    ?>

                    const baseUrl = '<?php echo $baseUrl; ?>';
                    const path = <?php echo $path; ?>;
                    const homePage = 'dashboard';

                    function formatPageName(name) {
                        var pagename = name.split('.')[0];
                        return capitalizeFirstLetter(pagename);
                    }

                    function updateBreadcrumb() {
                        const breadcrumb = document.getElementById('dynamicBreadcrumb');
                        const fullPath = path;
                        console.log(fullPath);
                        const relativePath = fullPath.substring(baseUrl.length);
                        const items = relativePath.split('/').filter(item => item !== '');

                        breadcrumb.innerHTML = '';

                        // Add Home
                        const homeLi = document.createElement('li');
                        homeLi.classList.add('breadcrumb-item');
                        const homeLink = document.createElement('a');
                        homeLink.href = baseUrl + homePage + '/';
                        homeLink.textContent = 'Home';
                        homeLi.appendChild(homeLink);
                        breadcrumb.appendChild(homeLi);

                        // Process items
                        let currentPath = baseUrl;
                        items.forEach((item, index) => {
                            if (['users.php', 'roles.php', 'permissions.php', 'logs.php', 'contacts.php'].includes(item)) {
                                // Handle admin console case
                                currentPath += 'adminConsole.php';
                                const li = document.createElement('li');
                                li.classList.add('breadcrumb-item');
                                const a = document.createElement('a');
                                a.href = currentPath;
                                a.textContent = 'AdminConsole';
                                li.appendChild(a);
                                breadcrumb.appendChild(li);
                            }

                            // Normal item handling
                            currentPath += item + '/';
                            if (item !== homePage) {
                                const li = document.createElement('li');
                                li.classList.add('breadcrumb-item');
                                const formattedName = (index === items.length - 1) ? formatPageName(item) : '';

                                if (index === items.length - 1) {
                                    li.classList.add('active');
                                    li.setAttribute('aria-current', 'page');
                                    li.textContent = formattedName;
                                } else {
                                    const a = document.createElement('a');
                                    a.href = currentPath;
                                    a.textContent = formattedName;
                                    li.appendChild(a);
                                }

                                breadcrumb.appendChild(li);
                            }
                        });
                    }

                    // Call the function when the page loads
                    document.addEventListener('DOMContentLoaded', updateBreadcrumb);
                    // Update breadcrumbs when the URL changes without a page reload (for single-page applications)
                    window.addEventListener('popstate', updateBreadcrumb);

                    function capitalizeFirstLetter(string) {
                        return string.charAt(0).toUpperCase() + string.slice(1);
                    }
                </script>
                <ul class="navbar-nav navbar-nav-right">
                    <li class="nav-item nav-profile dropdown">
                        <div class="mx-1">
                            <?= isset($_SESSION['userData']['name']) ? $_SESSION['userData']['name'] : 'User' ?>
                        </div>
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="profileDropdown">
                            <img src="../images/profile.png" alt="profile" />
                        </a>
                        <div class="dropdown-menu dropdown-menu-right navbar-dropdown"
                            aria-labelledby="profileDropdown">
                            <a class="dropdown-item" href="<?= BASE_URL ?>dashboard/userSetting.php">
                                <i class="ti-settings text-primary"></i>
                                Settings
                            </a>
                            <?php if (in_array('admin', $permissions) || in_array('all', $permissions)) { ?>
                                <a class="dropdown-item" id="adminConsole" href="<?= BASE_URL ?>dashboard/adminConsole.php">
                                    <i class="ti-user text-primary"></i>
                                    Admin Console
                                </a>
                            <?php } ?>
                            <a class="dropdown-item" id="logout" href="#">
                                <i class="ti-power-off text-primary"></i>
                                Logout
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
        <style>
            #loader {
                display: none;
                position: fixed;
                top: 50%;
                left: 50%;
                height: 50px;
                width: 50px;
                border: 7px solid #1c25b4;
                border-top: 7px solid #fff;
                border-radius: 50%;
                z-index: 999;
                animation: spin 1s linear 0.1s infinite;
            }

            @keyframes spin {
                0% {
                    rotate: 0deg;
                }

                100% {
                    rotate: 360deg;
                }

            }
        </style>

        <div id="loader">

        </div>