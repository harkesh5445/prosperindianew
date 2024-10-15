<?php

require_once ('../includes/header.php');

if (!in_array('admin', $permissions) || !in_array('all', $permissions)) {
    header(BASE_URL . 'dashboard/index.php');
}

global $db;
global $con;

$roles = $db->fetch($con, ROLES, array('isDeleted' => 0));
if ($_SESSION['is_superadmin'] == 1) {
    $users = $db->fetch($con, USERS, array('isDeleted' => 0));
} else {
    $users = $db->fetch($con, USERS, array('isDeleted' => 0, 'is_superadmin' => 0));
}

$login_logs = $db->fetch($con, LOGIN_LOGS);
$permissions = $db->fetch($con, PERMISSIONS, array('isDeleted' => 0));
$contact_us = $db->fetch($con, CONTACT_US);

$total_roles = !empty($roles) ? count($roles) : 0;
$total_users = !empty($users) ? count($users) : 0;
$total_logs = !empty($login_logs) ? count($login_logs) : 0;
$total_permissions = !empty($permissions) ? count($permissions) : 0;
$total_contacts = !empty($contact_us) ? count($contact_us) : 0;

?>
<style>
    
    body {
        font-family: 'Arial', sans-serif;
        background-color: #f8f9fa;
    }

    .container-fluid {
     /* padding: 2rem; */
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    /* .main-panel {
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 1rem;
        flex-grow: 1;
    } */

    .content-wrapper {
        margin: 0 auto;
        max-width: 1200px;
        background: none !important;
    }

    .header {
        padding: 1rem 0;
    }

    .header h1 {
        font-size: 2.5rem;
        margin: 0;
        color: #333;
        text-align: left;
    }

    .row {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .col-md-4 {
        flex: 1 1 calc(33.333% - 1rem);
        max-width: calc(33.333% - 1rem);
    }

    .card {
        background-color: #fff;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s, box-shadow 0.2s;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 1.5rem;
    }

    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .card .icon {
        font-size: 3rem;
        color: #007bff;
        margin-bottom: 1rem;
    }

    .card-title {
        font-size: 1.5rem;
        color: #333;
        margin-bottom: 0.5rem;
    }

    .card h3 {
        font-size: 2rem;
        color: #007bff;
        margin: 0.5rem 0;
    }

    .card a {
        text-decoration: none;
        color: inherit;
    }

    footer.footer {
        text-align: center;
        padding: 1rem;
        background-color: #fff;
        border-top: 1px solid #dee2e6;
        margin-top: 2rem;
        flex-shrink: 0;
    }

    @media (max-width: 768px) {
        .col-md-4 {
            flex: 1 1 100%;
            max-width: 100%;
        }

        .header h1 {
            font-size: 2rem;
        }

        .card .icon {
            font-size: 2.5rem;
        }

        .card-title {
            font-size: 1.25rem;
        }

        .card h3 {
            font-size: 1.75rem;
        }
    }
</style>
<div class="container-fluid page-body-wrapper">
    <div class="main-panel">
        <div class="content-wrapper">
            <div class="header mb-4">
                <h1>Prosper India Admin Dashboard</h1>
            </div>

            <div class="row">
                <?php if ($_SESSION['is_superadmin'] == 1) { ?>
                    <div class="col-md-4">
                        <div class="card">
                            <a href="<?= BASE_URL ?>dashboard/roles.php">
                                <div class="icon"><i class="ti-calendar"></i></div>
                                <p class="card-title">Roles</p>
                                <h3 id="rcount"><?= $total_roles; ?></h3>
                            </a>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="card">
                            <a href="<?= BASE_URL ?>dashboard/permissions.php">
                                <div class="icon"><i class="ti-lock"></i></div>
                                <p class="card-title">Permissions</p>
                                <h3 id="pcount"><?= $total_permissions; ?></h3>
                            </a>
                        </div>
                    </div>
                <?php } ?>

                <div class="col-md-4">
                    <div class="card">
                        <a href="<?= BASE_URL ?>dashboard/users.php">
                            <div class="icon"><i class="ti-user"></i></div>
                            <p class="card-title">Users</p>
                            <h3 id="ucount"><?= $total_users; ?></h3>
                        </a>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card">
                        <a href="<?= BASE_URL ?>dashboard/contacts.php">
                            <div class="icon"><i class="ti-email"></i></div>
                            <p class="card-title">Contacts</p>
                            <h3 id="ccount"><?= $total_contacts; ?></h3>
                        </a>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card">
                        <a href="<?= BASE_URL ?>dashboard/logs.php">
                            <div class="icon"><i class="ti-agenda"></i></div>
                            <p class="card-title">Login Logs</p>
                            <h3 id="lcount"><?= $total_logs; ?></h3>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <footer class="footer">
            <div>© 2024 Prosper India Foundation. All rights reserved.</div>
        </footer>
    </div>
</div>
<?php

require_once ('../includes/footer.php');

?>