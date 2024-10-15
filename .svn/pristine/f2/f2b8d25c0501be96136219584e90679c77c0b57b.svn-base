</div>
<script src="<?= BASE_URL ?>js/vendor.bundle.base.js?v=<?= rand(); ?>"></script>
<script src="<?= BASE_URL ?>js/off-canvas.js?v=<?= rand(); ?>"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="<?= BASE_URL ?>js/script.js?v=<?= rand(); ?>"></script>

<!---- users---->
<?php if (!empty($curren_link) && strpos($curren_link, 'users.php')) { ?>
    <script src="<?= BASE_URL ?>js/users.js?v=<?= rand(); ?>"></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>
        // $('#loader').hide();
        $(document).ready(function () {
            $(".select2").select2({
                placeholder: "select data-structures",
                tags: true,
            });

        })

    </script>
<?php } ?>

<!---- roles---->
<?php if (!empty($curren_link) && strpos($curren_link, 'roles.php')) { ?>
    <script src="<?= BASE_URL ?>js/roles.js?v=<?= rand(); ?>"></script>
<?php } ?>

<!---- permissions---->
<?php if (!empty($curren_link) && strpos($curren_link, 'permissions.php')) { ?>
    <script src="<?= BASE_URL ?>js/permissions.js?v=<?= rand(); ?>"></script>
<?php } ?>

<!---- logs---->
<?php if (!empty($curren_link) && strpos($curren_link, 'logs.php')) { ?>
    <script src="<?= BASE_URL ?>js/logs.js?v=<?= rand(); ?>"></script>
<?php } ?>

<!---- contacts---->
<?php if (!empty($curren_link) && strpos($curren_link, 'contacts.php')) { ?>
    <script src="<?= BASE_URL ?>js/contacts.js?v=<?= rand(); ?>"></script>
<?php } ?>



</body>

</html>


<?php if (!empty($curren_link) && strpos($curren_link, 'users.php')) { ?>
    <!-- <Edit Users Modal> -->
    <div class="modal fade" id="editUserModal" aria-hidden="true" aria-labelledby="editUserModalLabel" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editUserModalLabel">Edit User</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="response1"></div>
                   
                    <div class="row shadow p-4 m-3">
                       <div class="col-md-5 mb-3">
                            <label for="password" class="form-label">New Password</label>
                            <input type="text" class="form-control" name="password" id="password"
                                placeholder="Enter password">
                                <input type="hidden" id="uid" value="">
                        </div>
                        <div class="col-md-5 mb-3">
                            <label for="confirm_password" class="form-label">Confirm New Password</label>
                            <input type="text" class="form-control" name="confirm_password" id="confirm_password"
                                placeholder="Confirm password">
                        </div>
                        <div class="col-md-2 d-flex align-items-end mb-3">
                            <input type="button" id="changepass" class="btn btn-primary w-100" value="Update">
                        </div>
                    </div>

                    <form id="update-user" class="shadow p-4">
                        <div class="row g-3">
                            <!-- Form Section -->
                            <div class="col-lg-7 col-md-6">
                                <div class="mb-3">
                                    <label for="name" class="form-label">Name</label>
                                    <input type="text" class="form-control" name="name" id="name" placeholder="Enter name">
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" class="form-control" name="email" id="email"
                                        placeholder="Enter email">
                                </div>
                                <div class="mb-3">
                                    <label for="phone" class="form-label">Phone</label>
                                    <input type="text" class="form-control" name="phone" id="phone"
                                        placeholder="Enter phone number">
                                </div>
                                <div class="mb-3">
                                    <label for="role" class="form-label">Role</label>
                                    <select class="select2 form-control" multiple name="roles[]" id="role">
                                        <!-- Options will be dynamically populated -->
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="permissions" class="form-label">Permissions</label>
                                    <select class="select2 form-control" name="permissions[]" multiple id="permissions">
                                        <!-- Options will be dynamically populated -->
                                    </select>
                                </div>
                            </div>
                            <!-- Profile Card Section -->
                            <div class="col-lg-5 col-md-6">
                                <div class="card profile-card text-center">
                                    <img src="../images/profile.png" class="card-img-top mx-auto mt-4" alt="Profile Image"
                                        style="height: 100px; width: 100px; border-radius: 50%;">
                                    <div class="card-body">
                                        <h5 class="card-title" id="uName">User Name</h5>
                                        <p class="card-text" id="uEmail">Email: user@example.com</p>
                                        <div class="form-check form-switch mb-3">
                                            <input class="form-check-input" type="checkbox" name="is_verified"
                                                id="emailVerified">
                                            <label class="form-check-label" for="emailVerified">Verified</label>
                                        </div>
                                        <div class="form-check form-switch mb-3">
                                            <input class="form-check-input" name="isDeleted" type="checkbox"
                                                id="deleteUser">
                                            <label class="form-check-label" for="deleteUser">Deleted</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input type="hidden" name="action" value="updateUser">
                        <input type="hidden" name="id" value="" id="userId">
                        <div class="d-flex justify-content-end mt-3">
                            <button type="submit" class="btn btn-primary">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>




    <!-- <Add Users Modal> -->

    <div class="modal fade" id="addUser" aria-hidden="true" aria-labelledby="addUserModalLabel" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addUserModalLabel">Add User</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="message"></div>
                    <form class="forms-sample shadow p-4" id="add-user-form">
                        <input type="hidden" name="action" value="addUser">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="exampleInputName1" class="form-label">Name</label>
                                    <input type="text" name="name" class="form-control" id="exampleInputName1"
                                        placeholder="Name">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="exampleInputEmail3" class="form-label">Email address</label>
                                    <input type="email" name="email" class="form-control" id="exampleInputEmail3"
                                        placeholder="Email">
                                </div>
                            </div>
                        </div>
                        <div class="row g-3">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="exampleInputPassword4" class="form-label">Password</label>
                                    <input type="password" name="password" class="form-control" id="pass"
                                        placeholder="Password">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="exampleInputPassword4" class="form-label">Confirm Password</label>
                                    <input type="password" name="password_confirmation" class="form-control" id="cpass"
                                        placeholder="Password">
                                </div>
                            </div>
                        </div>
                        <div class="row g-3">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="uphone" class="form-label">Contact No</label>
                                    <input type="text" name="phone" maxlength="10" class="form-control" id="uphone"
                                        placeholder="Contact no">
                                </div>
                            </div>
                        </div>
                        <div class="row g-3">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="userRole" class="form-label">Roles</label>
                                    <select class="select2 form-control" name="roles[]" id="userRole" multiple>
                                        <!-- Options will be dynamically populated -->
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="userPermission" class="form-label">Permissions</label>
                                    <select class="select2 form-control" name="permissions[]" id="userPermission" multiple>
                                        <!-- Options will be dynamically populated -->
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end mt-4">
                            <button type="button" class="btn btn-primary me-2" onclick="addUser(event)">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>


    <div class="modal fade" id="showdeletedusers" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalToggleLabel">Deleted Users</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="table-responsive">
                    <table class="table table-striped table-hover" id="dataTable1">
                        <thead class="table-dark">
                            <tr>
                                <th data-sort="id">
                                    <button class="sort-btn btn btn-sm btn-outline-light">Id</button>
                                </th>
                                <th data-sort="Name">
                                    <button class="sort-btn btn btn-sm btn-outline-light">Name</button>
                                </th>
                                <th data-sort="Email">
                                    <button class="sort-btn btn btn-sm btn-outline-light">Email</button>
                                </th>
                                <th data-sort="Contact">
                                    <button class="sort-btn btn btn-sm btn-outline-light">Contact No</button>
                                </th>
                                <th data-sort="Verification">
                                    <button class="sort-btn btn btn-sm btn-outline-light">Verification</button>
                                </th>
                                <th data-sort="Status">
                                    <button class="sort-btn btn btn-sm btn-outline-light">Status</button>
                                </th>
                                <th data-sort="Action">
                                    <button class="sort-btn btn btn-sm btn-outline-light">Action</button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Table rows go here -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<?php } ?>

<!-- roles -->

<?php if (!empty($curren_link) && strpos($curren_link, 'roles.php')) { ?>

    <div class="modal fade" id="addRole" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalToggleLabel">Add Role</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="message"></div>
                    <div class="col-12 grid-margin stretch-card">

                        <div class="card-body">

                            <form class="forms-sample" id="add-role-form">
                                <input type="hidden" name="action" value="addRole">

                                <div class="form-group">
                                    <label for="role">Role</label>
                                    <input type="text" name="role" class="form-control" id="role" placeholder="Enter role">
                                </div>


                                <button type="submit" class="btn btn-primary me-2 float-end"
                                    onclick="//addRole(event)">Submit</button>
                            </form>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>

    <div class="modal fade" id="editRole" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalToggleLabel">Add Role</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="message1"></div>
                    <div class="col-12 grid-margin stretch-card">

                        <div class="card-body">

                            <form class="forms-sample" id="edit-role-form">
                                <div class="form-group">
                                    <label for="role">Role</label>
                                    <input type="text" name="role" class="form-control" id="role1" placeholder="Enter role">
                                    <input type="hidden" name="id" class="form-control" id="role_id"
                                        placeholder="Enter role">
                                    <input type="hidden" name="action" value="editRole" class="form-control" id="role_id"
                                        placeholder="Enter role">
                                </div>


                                <button type="submit" class="btn btn-primary me-2 float-end"
                                    onclick="//editRole(event)">Submit</button>
                            </form>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>

<?php } ?>
<!-- permissions -->
<?php if (!empty($curren_link) && strpos($curren_link, 'permissions.php')) { ?>
    <div class="modal fade" id="addPermission" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalToggleLabel">Add Permission</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="message"></div>
                    <div class="col-12 grid-margin stretch-card">

                        <div class="card-body">

                            <form class="forms-sample" id="add-permission-form">
                                <input type="hidden" name="action" value="addPermission">

                                <div class="form-group">
                                    <label for="role">Role</label>
                                    <select class="form-control" name="role_id" id="role">

                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="permission">Permission</label>
                                    <input type="text" name="permissions" class="form-control" id="permission"
                                        placeholder="Enter permission">
                                </div>


                                <button type="submit" class="btn btn-primary me-2 float-end">Submit</button>
                            </form>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>

    <div class="modal fade" id="editPermission" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalToggleLabel">Edit Permission</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="message1"></div>
                    <div class="col-12 grid-margin stretch-card">

                        <div class="card-body">

                            <form class="forms-sample" id="edit-permission-form">

                                <input type="hidden" name="action" value="editPermission">
                                <input type="hidden" name="prmsn_id" id="prmsn_id" value="">

                                <div class="form-group">
                                    <label for="role">Role</label>
                                    <select class="form-control" name="role_id" id="role1">

                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="permission">Permission</label>
                                    <input type="text" name="permissions" class="form-control" id="permission1"
                                        placeholder="Enter permission">
                                </div>


                                <button type="submit" class="btn btn-primary me-2 float-end">Submit</button>

                            </form>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
<?php }
ob_end_flush();
?>