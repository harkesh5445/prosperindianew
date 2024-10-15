<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Prosper India Foundation - Empowering India's Future</title>

    <!-- Meta Description -->
    <meta
      name="description"
      content="Prosper India Foundation is a non-profit organization focused on solving India's most pressing challenges in economy, education, and military power. Join us in our mission to build a prosperous future for India."
    />

    <!-- Meta Keywords -->
    <meta
      name="keywords"
      content="Prosper India Foundation, India economy, India education, India military, non-profit organization, NGOs in India, Indian democracy, human capital, sustainable development, social impact, nation building"
    />

    <!-- Meta Author -->
    <meta name="author" content="Prosper India Foundation" />

    <!-- Open Graph Meta Tags (for social sharing) -->
    <meta
      property="og:title"
      content="Prosper India Foundation - Empowering India's Future"
    />
    <meta
      property="og:description"
      content="Join Prosper India Foundation in solving India's biggest challenges. Learn about our initiatives in economy, education, and military power."
    />
    <!-- <meta property="og:image" content="https://example.com/path-to-your-image.jpg"> Update with your actual image URL -->
    <!-- <meta property="og:url" content="https://example.com/your-page-url"> Update with your actual URL -->
    <meta property="og:type" content="website" />
    <!-- Bootstrap CSS -->
    <link
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
    />
    <link rel="stylesheet" href="css/style.css" />
    <script src="js/authCheck.js"></script>
  </head>

  <body>
    <header id="myHeader">
      <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid">
          <!-- <a class="navbar-brand" href="#">Prosper India Foundation</a> -->
          <div class="row">
            <div class="col-12 moblogo">
              <a class="navbar-brand" href="#"
                ><img src="images/pip.png" class="cuslogo" alt=""
              /></a>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item scrl">
                <a class="nav-link" href="index.html">Home</a>
              </li>

              <!-- <li class="nav-item scrl">
                  <a class="nav-link" onclick="appendStyle('power')" href="#power"
                    >Military</a
                  >
                </li> -->

              <!-- Defense & Safety Dropdown -->
              <li class="nav-item dropdown">
                <a
                  class="dropdown-toggle nav-link"
                  href="#"
                  id="areasOfInterestDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Focus Areas
                </a>
                <ul
                  class="dropdown-menu"
                  aria-labelledby="areasOfInterestDropdown"
                >
                  <li>
                    <a class="dropdown-item" href="women_safety.html"
                      >Women Safety</a
                    >
                  </li>
                  <li class="dropdown-submenu">
                    <a
                      class="dropdown-item dropdown-toggle"
                      href="#"
                      id="healthEnvironmentDropdown"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Health & Environment <i class="fas fa-angle-right"></i>
                    </a>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="healthEnvironmentDropdown"
                    >
                      <li>
                        <a
                          class="dropdown-item"
                          onclick="appendStyle('foodAdulteration')"
                          href="food_adulteration.html"
                          >Food Adulteration</a
                        >
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      onclick="appendStyle('Education')"
                      href="index.html#Education"
                      >Education</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      onclick="appendStyle('economy')"
                      href="index.html#economy"
                      >Economy</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      onclick="appendStyle('power')"
                      href="index.html#power"
                      >Military</a
                    >
                  </li>
                </ul>
              </li>

              <li class="nav-item scrl">
                <a class="nav-link" href="about.html">About Us</a>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="contact.html">Contact Us</a>
              </li>

              <li class="nav-item">
                <a
                  class="btn btn-outline-dark btn-round m-lg-1"
                  id="myBtn"
                  href="login.html"
                  >Login</a
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>