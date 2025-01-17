<?php

require_once ('../includes/header.php');
if (!in_array('admin', $permissions) && !in_array('all', $permissions)) {
    header('Location: ' . BASE_URL . 'dashboard/index.php');
    exit;
}

?>
<style>
    .card {
        -webkit-box-shadow: 0px 2px 9px 2px #c7c5d8 !important;
        border: none !important;
    }

    .p2 {
        padding: 4px 20px 8px 20px !important;
    }

    .sort-btn {
        background: none;
        border: none;
        cursor: pointer;
    }

  

    .container-fluid, .container-lg, .container-md, .container-sm, .container-xl {
       padding-right: 0px;
    }

    .btn.btn-sm, .btn-group-sm > .btn {
    font-size: 0.875rem;
    padding: 0.25rem 1rem;
   }
   .profile-card {
        border: none;
        background: #f8f9fa;
    }
    .profile-card img {
        height: 100px;
        width: 100px;
        border-radius: 50%;
    }

    .form-label {
        font-weight: bold;
    }
    .modal-header {
        background-color: #f8f9fa;
        border-bottom: 1px solid #dee2e6;
    }
    .modal-title {
        font-weight: bold;
    }
    /* .btn-close {
        background: transparent;
        border: none;
    } */
    .select2-container--default .select2-selection--multiple {
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
    }
    .bg-dark {
        background-color: #babfc4 !important;
    }
</style>
<div class="container-fluid page-body-wrapper">
    <div class="main-panel">

        <div class="content-wrapper">
        <div class="header">
                <h1 class="font-weight-bold m-4">Prosper India Users</h1>
            </div>
            <!-- <div class="row">
                <div class="col-md-12 grid-margin">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h4 class="font-weight-bold mb-0">Prosper India Users</h4>
                        </div>
                    </div>
                </div>
            </div> -->

            <!----- users ------->
            <div class="col-lg-12 grid-margin stretch-card mt-5">
                <!-- <div class="container my-5"> -->
                    <div class="card shadow-lg">
                        <div class="card-body">
                            <div class="d-flex flex-column flex-md-row justify-content-between mb-3">
                                <div class="filter-container mb-3">
                                    <input type="text" id="filterInput" class="form-control" placeholder="Search...">
                                </div>
                                <div>
                                    <button class="btn btn-primary mb-2 mb-md-0 me-2" onclick="showAddUserModal()">Add
                                        User</button>
                                    <button class="btn btn-danger" onclick="showDeletedUsers()">Deleted Users</button>
                                </div>
                            </div>

                            <div class="table-responsive">
                                <table class="table table-striped table-hover" id="dataTable">
                                    <thead class="table-dark">
                                        <tr>
                                            <th data-sort="id">ID <button
                                                    class="sort-btn btn btn-sm btn-outline-light">&#8597;</button></th>
                                            <th data-sort="name">Name <button
                                                    class="sort-btn btn btn-sm btn-outline-light">&#8597;</button></th>
                                            <th data-sort="email">Email <button
                                                    class="sort-btn btn btn-sm btn-outline-light">&#8597;</button></th>
                                            <th data-sort="phone">Phone <button
                                                    class="sort-btn btn btn-sm btn-outline-light">&#8597;</button></th>
                                            <th data-sort="is_verified">Verified <button
                                                    class="sort-btn btn btn-sm btn-outline-light">&#8597;</button></th>
                                            <th data-sort="status">Status <button
                                                    class="sort-btn btn btn-sm btn-outline-light">&#8597;</button></th>
                                            <th data-sort="status"><button
                                                    class="sort-btn btn btn-sm btn-outline-light">Actions</button></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- Table data will be dynamically inserted here -->
                                    </tbody>
                                </table>
                            </div>

                            <div class="pagination justify-content-center mt-4">
                                <!-- Pagination buttons will be appended here -->
                            </div>
                        </div>
                    </div>
                <!-- </div> -->

                <style>
                    .sort-btn {
                        background: none;
                        border: none;
                        cursor: pointer;
                    }
                </style>

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