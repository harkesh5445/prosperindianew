<?php
require_once ('../includes/header.php');
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
        background-color: #fff !important;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s, box-shadow 0.2s;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
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
            <div class="header">
                <h1 class="font-weight-bold">Prosper India Dashboard</h1>
            </div>

            <div class="container mt-4">
                <div class="row">
                    <?php if (in_array('topology', $permissions) || in_array('all', $permissions)) { ?>
                        <div class="col-md-4 mb-4">
                            <div class="card bg-primary text-white shadow-sm">
                                <a href="<?= BASE_URL ?>TfMap/" class="text-white text-decoration-none">
                                    <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                        <div class="icon"><i class="ti-map-alt"></i></div>
                                        <p class="card-title text-center">Topo-Map</p>
                                        <p class="card-description text-center">View and analyze geographical data on the
                                            interactive map.</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    <?php } ?>

                    <div class="col-md-4 mb-4">
                        <div class="card bg-success text-white shadow-sm">
                            <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                <div class="icon"><i class="ti-bar-chart"></i></div>
                                <p class="card-title text-center">Economy</p>
                                <p class="card-description text-center">Explore economic data and trends for strategic
                                    insights.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 mb-4">
                        <div class="card bg-info text-white shadow-sm">
                            <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                <div class="icon"><i class="ti-book"></i></div>
                                <p class="card-title text-center">Education</p>
                                <p class="card-description text-center">Access educational resources and statistical
                                    data.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 mb-4">
                        <div class="card bg-warning text-white shadow-sm">
                            <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                <div class="icon"><i class="ti-shield"></i></div>
                                <p class="card-title text-center">Military</p>
                                <p class="card-description text-center">View data and insights related to military
                                    statistics.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 mb-4">
                        <div class="card bg-danger text-white shadow-sm">
                            <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                <div class="icon"><i class="ti-info"></i></div>
                                <p class="card-title text-center">About</p>
                                <p class="card-description text-center">Learn more about the Prosper India Foundation
                                    and
                                    its mission.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 mb-4">
                        <div class="card bg-secondary text-white shadow-sm">
                            <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                <div class="icon"><i class="ti-email"></i></div>
                                <p class="card-title text-center">Contact</p>
                                <p class="card-description text-center">Get in touch with us for more information or
                                    support.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer class="footer">
                <div>© 2024 Prosper India Foundation. All rights reserved.</div>
            </footer>
        </div>
    </div>
</div>

<?php
require_once ('../includes/footer.php');
?>