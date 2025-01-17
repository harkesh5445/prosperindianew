<?php
require_once '../db.php';

if (empty($_SESSION['uid']) && !$_SESSION) {
    header("location:" . BASE_URL . 'login.html');
    exit();
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


if (!in_array('topology', $permissions) && !in_array('all', $permissions)) {
    header('Location: ' . BASE_URL . 'dashboard/index.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tf-Map</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ti-icons@0.1.2/css/themify-icons.min.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>css/bootstrap.min.css">

    <style>
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
            text-decoration: none;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html,
        body {
            height: 100%;
            width: 100%;
            padding: 0;
            margin: 0;
        }


        .container-wrapper {
            height: 100vh;
            width: 100vw;
            display: flex;
            flex-direction: column;
        }



        #map {
            height: 100%;
            width: 99%;
            transition: height 0.3s;
        }

        #elevation-div {
            height: 25%;
            width: 100vw;
            font: 12px/1.5 "Helvetica Neue", Arial, Helvetica, sans-serif;
        }

        .elevation-control {
            height: 0;
            width: 100vw;
            transition: height 0.3s;
        }

        .pegman-control {
            display: none;
        }

        .leaflet-control-easyPrint {
            display: none;
        }

        .leaflet-control-layers-base label:nth-child(even) {
            display: none;
        }

        .leaflet-routing-container {
            background-color: #d5d5d5 !important;
        }

        .routeWrapper {
            height: 90%;
            display: block;
            position: absolute;
            bottom: 5%;
            right: 0;
            z-index: 1111;
            overflow-y: auto;
            /**     
    max-height: 40%;
    */
        }

        .routeContainer {
            display: block;
            position: relative;
            background: #d5d5d5;
            margin-top: 10px;
            /** 
            position: absolute;
            bottom: 5%;
            right: 0;
            padding: 10px 0 0 10px;
            z-index: 1111;
            max-height: 40%;
            */
            max-height: 300px;
            max-width: 320px;
            padding: 7px;
            overflow-y: auto;
        }

        .collapsed-div {
            float: right;
            width: 40px;
        }

        .collapsed-div .routeDetailsSubtitle,
        .collapsed-div .routeDetailsContent,
        .collapsed-div .eraseExistingRoute {
            display: none !important;
        }

        .collapsed-div .routeDetails .routeDetailsHeader .routeDetailsTitle-info {
            display: none !important;
        }

        .routeDetailsHeader {
            display: flex;
            justify-content: space-between;
        }

        .routeDetailsContent-table-tbody-row td {
            font: 12px / 1.5 "Helvetica Neue", Arial, Helvetica, sans-serif;
        }

        .routeDetailsContent-table-tbody-row :nth-child(2) {
            padding: 0 4px;
        }

        .routeDetailsContent-table-tbody-row :nth-child(1) {
            background-image: url('./dist/images/routeDirection.png');
            -webkit-background-size: 240px 20px;
            background-size: 240px 20px;
            background-repeat: no-repeat;
            margin: 0;
            content: '';
            display: inline-block;
            vertical-align: top;
            width: 20px;
            height: 20px;
        }

        .routeDetailsContent-table-icon {
            height: 20px;
            width: 20px;
        }

        .routeDetailsSubtitleTitle {
            font-size: 12px;
            font-weight: normal;
        }

        .routeDetailsContent {

            max-height: 80%;

        }

        table {
            border-collapse: collapse;
        }

        .routeDetailsContent table {
            cursor: pointer;
        }

        .eraseExistingRoute {
            cursor: pointer;
            margin: 10px;
            float: right;
            color: #e71c1c;
            background: #1d1313;
            padding: 2px 5px;
            border-radius: 4px;
        }

        .customRouteTBL {
            height: 100%;
        }

        .customRouteTBL tr:hover {
            border-radius: 14px;
            background-color: #fff;
        }

        .customRouteTBL tr:hover td:nth-child(1) {
            border-top-left-radius: 14px;
            border-bottom-left-radius: 14px;
        }

        .customRouteTBL tr:hover td:nth-child(4) {
            border-top-right-radius: 14px;
            border-bottom-right-radius: 14px;
        }

        .routeDetailsContent-table-distance {
            width: 50px;
        }

        .routeDetailsTitle-info {
            font-size: 14px;
            font-weight: bold;
        }

        .routeDetailsTitle {
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
        }

        .routeDetailsSubtitle {
            margin: 5px 0
        }

        .routeSeparator {
            height: 10px;
        }

        .leaflet-routing-icon-continue {
            background-position: 0 0;
        }

        .leaflet-routing-icon-sharp-right {
            background-position: -20px 0;
        }

        .leaflet-routing-icon-turn-right {
            background-position: -40px 0;
        }

        .leaflet-routing-icon-bear-right {
            background-position: -60px 0;
        }

        .leaflet-routing-icon-u-turn {
            background-position: -80px 0;
        }

        .leaflet-routing-icon-sharp-left {
            background-position: -100px 0;
        }

        .leaflet-routing-icon-turn-left {
            background-position: -120px 0;
        }

        .leaflet-routing-icon-bear-left {
            background-position: -140px 0;
        }

        .leaflet-routing-icon-depart {
            background-position: -160px 0;
        }

        .leaflet-routing-icon-enter-roundabout {
            background-position: -180px 0;
        }

        .leaflet-routing-icon-arrive {
            background-position: -200px 0;
        }

        .leaflet-routing-icon-via {
            background-position: -220px 0;
        }

        /** loader */

        .container {
            --uib-size: 45px;
            --uib-color: #180d14;
            --uib-speed: 1.75s;
            --uib-bg-opacity: .1;
            height: 31.25px;
            width: 50px;
            transform-origin: center;
            overflow: visible;
        }

        .car {
            stroke: var(--uib-color);
            stroke-dasharray: 100;
            stroke-dashoffset: 0;
            stroke-linecap: round;
            stroke-linejoin: round;
            animation:
                travel var(--uib-speed) ease-in-out infinite,
                fade var(--uib-speed) ease-out infinite;
            will-change: stroke-dasharray, stroke-dashoffset;
            transition: stroke 0.5s ease;
        }

        .track {
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke: var(--uib-color);
            opacity: var(--uib-bg-opacity);
        }

        @keyframes travel {
            0% {
                stroke-dashoffset: 100;
            }

            75% {
                stroke-dashoffset: 0;
            }
        }

        @keyframes fade {
            0% {
                opacity: 0;
            }

            20%,
            55% {
                opacity: 1;
            }

            100% {
                opacity: 0;
            }
        }

        .loader {
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            height: 100vh;
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        }

        .container {
            --uib-size: 35px;
            --uib-color: black;
            --uib-speed: 1s;
            --uib-stroke: 3.5px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: var(--uib-size);
            height: calc(var(--uib-size) * 0.9);
        }

        .bar {
            width: var(--uib-stroke);
            height: 100%;
            background-color: var(--uib-color);
            transition: background-color 0.3s ease;
        }

        .bar:nth-child(1) {
            animation: grow var(--uib-speed) ease-in-out calc(var(--uib-speed) * -0.45) infinite;
        }

        .bar:nth-child(2) {
            animation: grow var(--uib-speed) ease-in-out calc(var(--uib-speed) * -0.3) infinite;
        }

        .bar:nth-child(3) {
            animation: grow var(--uib-speed) ease-in-out calc(var(--uib-speed) * -0.15) infinite;
        }

        .bar:nth-child(4) {
            animation: grow var(--uib-speed) ease-in-out infinite;
        }

        @keyframes grow {

            0%,
            100% {
                transform: scaleY(0.3);
            }

            50% {
                transform: scaleY(1);
            }
        }

        .custom-btn {
            position: absolute;
            left: 15px;
            /**
            bottom: 25%;
          */
            bottom: clamp(17%, 20vh, 25%);
            z-index: 401;
        }

        .plot-direction {
            background-color: white;
            height: 30px;
            width: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
            cursor: pointer;
            border-radius: 1.2px;
            box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);
        }

        .plot-direction :hover {
            scale: 1.01;
            background-color: #f1f1f1 !important;
        }

        .plot-direction img {}

        /* Modal styles */
        .myModal {
            display: none;
            flex-direction: column;
            min-width: 155px;
            position: absolute;
            z-index: 1002;
            background-color: rgba(255, 255, 255, 0.9);
            transition: all 0.3s ease-in-out;
            border-radius: 2px;
            box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .myModal div:nth-child(2) {
            margin-top: 6px;
        }

        .myModal div:nth-child(1) {
            margin-top: 0px;
            background-color: 'none';
        }

        .marker-action {
            font-size: .8em;
            font-weight: 500;
            cursor: pointer;
            margin-bottom: 5px;
            margin-right: 24px;
            padding: 2px 5px 2px 8px;
        }

        /**
        .myModal div:hover:not(:first-child) {
            background-color: 'red';
        }    */
        .myModal div:hover {
            background-color: #eee;
        }

        .myModal div:hover:first-child {
            background-color: initial;
            /* Reset the background color for the first child */
        }


        .close {
            color: #aaa;
            position: absolute;
            right: 0;
            padding-right: 5px;
            float: right;
            font-size: 20px;
            font-weight: bold;
            transition: all 0.5s ease-in-out;
        }

        .close:hover,
        .close:focus {
            scale: 1.3;
            color: black;
            text-decoration: none;
            cursor: pointer;
        }

        .routeLine-label {
            font-size: 13px;
            font-weight: bold;
            fill: #1d1313;
            background-color: white;
        }
    </style>
    <!-- leaflet-ui -->
    <!-- <script src="https://unpkg.com/leaflet@1.3.2/dist/leaflet.js"></script> -->
    <script src="./dist/leaflet.js"></script>
    <!-- <script src="https://unpkg.com/leaflet-ui@0.2.0/dist/leaflet-ui.js"></script> -->
    <script src="./dist/leafletUi.js"></script>
    <!-- leaflet-elevation -->
    <!-- <link rel="stylesheet" href="https://unpkg.com/@raruto/leaflet-elevation/dist/leaflet-elevation.css" /> -->
    <link rel="stylesheet" href="./dist/leafletElevation.css" />
    <script src="https://unpkg.com/@raruto/leaflet-elevation/dist/leaflet-elevation.js"></script>
    <!-- <script src="./dist/leafletElevation.js"></script> -->

    <!--leaflet-routing  -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css" />
    <script src="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js"></script>

    <!-- Web-page guide -->
    <script src="./dist/driverLib.js"></script>
    <link rel="stylesheet" href="./dist/driverLib.css">
    <!-- <script src="https://cdn.jsdelivr.net/npm/driver.js@1.0.1/dist/driver.js.iife.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/driver.js@1.0.1/dist/driver.css" /> -->
    <style>
        .navbar .navbar-brand-wrapper .navbar-brand img {
            width: calc(290px - 130px) !important;
            max-width: 100%;
            height: 50px !important;
            margin: auto;
            vertical-align: middle;
        }

        .dsmnone22 {
            display: none;
        }

        @media screen and (max-width: 992px) {
            .dsmnone {
                display: none;
            }
        }



        .active {
            color: white !important;
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
    </style>
</head>

<body>
    <div class="container-scroller">

        <!-- partial:partials/_navbar.html -->
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
                        <div class="mx-1" id="u_name">
                            <?= isset($_SESSION['userData']['name']) ? $_SESSION['userData']['name'] : 'User' ?> </div>
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="profileDropdown">
                            <img src="../images/profile.png" alt="profile" />
                        </a>
                        <div class="dropdown-menu dropdown-menu-right navbar-dropdown"
                            aria-labelledby="profileDropdown">
                            <a class="dropdown-item">
                                <i class="ti-settings text-primary"></i>
                                Settings
                            </a>
                            <?php if (in_array('admin', $permissions) || in_array('all', $permissions)) { ?>
                                <a class="dropdown-item" id="adminConsole" href="../dashboard/adminConsole.php">
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
        <div class="container-fluid page-body-wrapper">

            <div class="main-panel">

                <!-- <div class="row shadow shadow-color-lite   p-3 m-2" >
                    <ul class="navbar-nav d-flex flex-row" id="navLinksContainer" style="font-size: 18px;">

                    </ul>
                </div> -->


                <div class="container-wrapper" id="container-wrapper">
                    <div class="p-5 mr-2" id="map">
                        <!--  Display the route details -->
                        <div class="routeWrapper" id="routeWrapper">
                            <!-- <div id="routeContainer" class="routeContainer">
                    <div id="routeDetails" class="routeDetails">
                        <div id="routeDetailsHeader" class="routeDetailsHeader">
                            <h1 id="routeDetailsTitle" class="routeDetailsTitle">Road-info..</h1>
                        </div>
                        <div class="routeDetailsSubtitle">
                            <h2 id="routeDetailsSubtitleTitle" class="routeDetailsSubtitleTitle">12.8 km, 24 min</h2>
                        </div>
                        <div id="routeDetailsContent" class="routeDetailsContent">
                            <table>
                                <colgroup>
                                    <col class="routeDetailsContent-table-icon">
                                    <col class="routeDetailsContent-table-text">
                                    <col class="routeDetailsContent-table-distance">
                                </colgroup>
                                <tbody id="customRouteTBL" class="customRouteTBL">
                                    <tr class="routeDetailsContent-table-tbody-row">
                                        <td>icon</td>
                                        <td>text-content</td>
                                        <td>dist km</td>
                                    </tr>
                                    <tr class="routeDetailsContent-table-tbody-row">
                                        <td>icon</td>
                                        <td>text-content</td>
                                        <td>dist km</td>
                                    </tr>
                                    <tr class="routeDetailsContent-table-tbody-row">
                                        <td>icon</td>
                                        <td>text-content</td>
                                        <td>dist km</td>
                                    </tr>
                                    <tr class="routeDetailsContent-table-tbody-row">
                                        <td>icon</td>
                                        <td>text-content</td>
                                        <td>dist km</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
    
                    </div>
                    <div id="eraseExistingRoute" class="eraseExistingRoute">erase
                    </div>
                </div> -->

                        </div>

                        <!-- Custom button  -->
                        <div class="custom-btn" id="custom-btn">

                            <!-- <div id="getRoute" style="background-color: aquamarine;height: 40px;width:100px;display:block">
                    Get Routes</div> -->
                            <div id="eraseRoute" class="plot-direction" title="Erase route...">
                                <img src="./dist/images/removeRoute.png" />
                            </div>
                            <div id="plot" class="plot-direction" title="Plot elevation...">
                                <img src="./dist/images/plot.png" />
                            </div>
                            <!-- <div id="plot" style="background-color: rgb(171, 181, 89);height: 40px;width:100px;display:block"
                            onclick="plotElevation()">
                            Plot Elevation</div> -->
                            <div id="displayCustomRoute" class="plot-direction" title="Find directions..">
                                <img src="./dist/images/direction.png" />
                            </div>
                        </div>
                    </div>
                </div>


                <footer class="footer">
                    <div class="d-sm-flex justify-content-center">
                        <div> © 2024 Prosper India Foundation. All rights reserved. </div>
                    </div>
                </footer>

            </div>
        </div>
    </div>

    <!--  SHOW MODAL AT MARKER POSITION -->
    <div class="myModal" id="myModal">
    </div>


    <!-- LOADER -->
    <div class="loader" id="loader1" style="display: none;">
        <svg class="container" x="0px" y="0px" viewBox="0 0 50 31.25" height="31.25" width="50"
            preserveAspectRatio='xMidYMid meet'>
            <path class="track" stroke-width="4" fill="none" pathlength="100"
                d="M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25" />
            <path class="car" stroke-width="4" fill="none" pathlength="100"
                d="M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25" />
        </svg>
    </div>
    <div class="loader" id="loader2" style="display: none;">
        <div class="container">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>
    </div>
    <!-- <script src="https://unpkg.com/esri-leaflet/dist/esri-leaflet.js"></script> -->
    <script>
        let value = localStorage.getItem('guided');
        console.log('value :>> ', JSON.parse(value));
        const driver = window.driver.js.driver;

        const driverObj = driver({
            showProgress: true,
            onHighlightStarted: (element) => {
                console.log('Highlighting started:', element);
            },
            onHighlighted: (element) => {
                console.log('onHighlighted :', element);
                if (element === undefined) {
                    return;
                }
                let targetClass = 'leaflet-marker-icon';

                let classListArray = Array.from(element.classList);
                if (classListArray.length > 0 && classListArray.includes(targetClass)) {
                    console.log('reached :>> ',);
                    console.log('make-an-API-call :>> ',);
                    let value = localStorage.setItem('guided', 1);
                }

            },
            onDeselected: (element) => {
                console.log('Deselected element:', element);
                // get the class and match with the last array element 
                let className = 'leaflet-marker-icon';

                // let classNameArr = element.getAttribute('class'); console.log('classNameArr :>> ', classNameArr);
            },
            onNext: (element) => {
                console.log('Moved to next step:', element);
            },
            onPrevious: (element) => {
                console.log('Moved to previous step:', element);
            },
            onReset: (element) => {
                console.log('Tour reset or ended.');
            },
            steps: [
                {
                    element: '.leaflet-container',
                    popover: {
                        title: 'Welcome to the Map Explorer',
                        description: 'Explore the powerful features of our interactive map. Start by learning about the different tools and functionalities available to you.'
                    }
                },
                {
                    element: '.leaflet-control-layers-list',
                    popover: {
                        title: 'View Options',
                        description: 'Switch between different map views to get the perspective you need. Choose from satellite, terrain, and more.'
                    }
                },
                {
                    element: '.leaflet-control-zoom-fullscreen',
                    popover: {
                        title: 'FullScreen Mode',
                        description: 'Immerse yourself in a full-screen view of the map for a more detailed and comprehensive exploration.'
                    }
                },
                {
                    element: '.leaflet-control-search',
                    popover: {
                        title: 'Search Locations',
                        description: 'Quickly find any location on the map by using the search feature. Enter an address, landmark, or coordinates.'
                    }
                },
                {
                    element: '.leaflet-control-locate',
                    popover: {
                        title: 'Find Your Location',
                        description: 'Use this tool to locate yourself on the map. Great for getting directions or understanding your current surroundings.'
                    }
                },
                {
                    element: '.leaflet-control-zoom-in',
                    popover: {
                        title: 'Zoom In',
                        description: 'Get a closer look at the map by zooming in. Perfect for examining details at a smaller scale.'
                    }
                },
                {
                    element: '.leaflet-control-zoom-out',
                    popover: {
                        title: 'Zoom Out',
                        description: 'Zoom out to see a broader view of the map. Ideal for getting a sense of the larger area.'
                    }
                },
                {
                    element: '#displayCustomRoute',
                    popover: {
                        title: 'Route Directions',
                        description: 'Plan your route by marking points on the map. This feature helps you find the best path between multiple locations.'
                    }
                },
                {
                    element: '#plot',
                    popover: {
                        title: 'Elevation Plot',
                        description: 'After defining your route, use this feature to generate an elevation plot. Understand the terrain and elevation changes along your path.'
                    }
                },
                {
                    element: '#eraseRoute',
                    popover: {
                        title: 'Reset Map',
                        description: 'Clear all markings and routes from the map to start fresh. Use this to reset your map for new analysis or planning.'
                    }
                },
                {
                    element: '.leaflet-marker-icon',
                    popover: {
                        title: 'Marker Icon',
                        description: 'On right click you have options to pin the marker, measure the distance and ....'
                    }
                }


            ]
        });
        if (!value) {
            driverObj.drive();
        }
        /** document.getElementsByClassName('driver-overlay')[0].addEventListener('click', () => {
            console.log('overlay :>> ',);
        }) */
    </script>

    <script src="../js/vendor.bundle.base.js"></script>
    <script src="../js/off-canvas.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="../js/script.js"></script>
    <script type="module" src="./index.js"></script>
</body>

</html>