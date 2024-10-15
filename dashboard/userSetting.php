<?php

require_once ('../includes/header.php');

?>
<style>
    .card {
    -webkit-box-shadow: 0px 2px 9px 2px #c7c5d8 !important;
    border: none!important;
}
.bg-dark {
        background-color: #babfc4 !important;
    }

    .text-center {
        flex: 1;
    }

    .font-weight-bold {
        font-weight: 700 !important;
    }

    h1 {
        font-size: 2.5rem;
        /* Adjust as needed for larger text */
    }

    .shadow-sm {
        box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
    }

    .rounded {
        border-radius: 0.5rem;
    }
</style>
<div class="container-fluid page-body-wrapper">
    <div class="main-panel">

        <div class="content-wrapper">

        <div class="header">
                <h1 class="font-weight-bold m-4">Prosper India User Setting</h1>
            </div>

            <!-- <div class="row">
                <div class="col-md-12 grid-margin">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h4 class="font-weight-bold mb-0">Prosper India User Settings</h4>
                        </div>
                    </div>
                </div>
            </div> -->

            <!----- users ------->
            <div class="col-lg-12 grid-margin stretch-card mt-4">
                <div class="container my-5">
                    <div class="card shadow-lg">
                        <div class="card-body">
                            <div class="row">
                                <!-- User Profile Section -->
                                <div class="col-lg-6 col-md-12 mb-4">
                                    <div class="text-center">
                                        <img src="../images/profile.png" class="rounded-circle img-fluid mb-4"
                                            style="height: 100px; width: 100px;" alt="Profile Image">
                                        <h2 id="uName">
                                            <?= isset($_SESSION['userData']['name']) ? $_SESSION['userData']['name'] : 'User' ?>
                                        </h2>
                                        <h4 id="uEmail">Email:
                                            <?= isset($_SESSION['userData']['email']) ? $_SESSION['userData']['email'] : 'User' ?>
                                        </h4>
                                    </div>
                                    <div class="card mt-4 p-3">
                                        <div class="card-body">
                                            <h3>Permissions</h3>
                                            <ul class="list-group list-group-flush">
                                                <?php foreach ($permissions as $val) { ?>
                                                    <li class="list-group-item"><?= $val ?></li>
                                                <?php } ?>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <!-- Update Password Section -->
                                <div class="col-lg-6 col-md-12 mb-4">
                                    <h3 class="text-center">Update Password</h3>
                                    <div class="card mt-4 p-3 shadow-sm">
                                        <div class="card-body">
                                            <form class="forms-sample" id="update-pass-form">
                                                <input type="hidden" name="action" value="updatePass">

                                                <div class="form-group mb-3">
                                                    <label for="oldPassword">Old Password</label>
                                                    <input type="password" name="oldpassword" onfocus="test('pass')"
                                                        class="form-control" id="oldPassword"
                                                        placeholder="Enter Old Password">
                                                </div>

                                                <div class="form-group mb-3">
                                                    <label for="newPassword">New Password</label>
                                                    <input type="password" name="newpassword" onfocus="test('npass')"
                                                        class="form-control" id="newPassword"
                                                        placeholder="Enter New Password">
                                                </div>

                                                <div class="form-group mb-3">
                                                    <label for="confirmPassword">Confirm New Password</label>
                                                    <input type="password" name="cpassword" onfocus="test('cpass')"
                                                        class="form-control" id="confirmPassword"
                                                        placeholder="Enter Confirm Password">
                                                </div>
                                                <button type="submit" class="btn btn-primary w-100">Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>



</div>
<footer class="footer">
    <div class="d-sm-flex justify-content-center">
        <div> © 2024 Prosper India Foundation. All rights reserved. </div>
    </div>
</footer>
<!-- partial -->
</div>
<!-- main-panel ends -->
</div>

<?php

require_once ('../includes/footer.php');

?>