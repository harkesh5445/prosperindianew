<?php

require_once ('../includes/header.php');
if (!in_array('admin', $permissions) || !in_array('all', $permissions)) {
    header(BASE_URL . 'dashboard/index.php');
}

?>
<style>
    .btn.btn-sm,
    .btn-group-sm>.btn {
        font-size: 0.875rem;
        padding: 0.25rem 1rem;
    }

    @media screen and (max-width: 768px) {
        .pgetitle {
            margin-top: 50px;
        }
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
                <h1 class="font-weight-bold m-4">Prosper India Contacts</h1>
            </div>
            <!-- <div class="row">
                <div class="col-md-12 grid-margin">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h4 class="font-weight-bold mb-0 pgetitle">Prosper India Contacts</h4>
                        </div>
                    </div>
                </div>
            </div> -->




            <!------Roles------->
            <div class="col-lg-12 grid-margin stretch-card mt-5">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Contacts</h4>

                        <div class="table-responsive">
                            <div class="filter-container">
                                <input type="text" id="filterInput" placeholder="Search...">
                            </div>
                            <table class="table table-striped table-hover" id="dataTable">
                                <thead class="table-dark">
                                    <tr>
                                        <th data-sort="id">
                                            Id <button class="sort-btn btn btn-sm btn-outline-light">&#8597;</button>
                                        </th>
                                        <th data-sort="name">
                                            Name <button class="sort-btn btn btn-sm btn-outline-light">&#8597;</button>
                                        </th>
                                        <th data-sort="email">
                                            Email <button class="sort-btn btn btn-sm btn-outline-light">&#8597;</button>
                                        </th>
                                        <th data-sort="phone">
                                            Phone <button class="sort-btn btn btn-sm btn-outline-light">&#8597;</button>
                                        </th>
                                        <th data-sort="message">
                                            Message <button
                                                class="sort-btn btn btn-sm btn-outline-light">&#8597;</button>
                                        </th>
                                        <th data-sort="created_at">
                                            Created At <button
                                                class="sort-btn btn btn-sm btn-outline-light">&#8597;</button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                            <div class="pagination">
                                <!-- Pagination buttons will be appended here -->
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
<!-- page-body-wrapper ends -->
<?php

require_once ('../includes/footer.php');

?>