$(document).ready(function () {
  $(".loader").css("display", "none");
  $(".loader1").css("display", "none");

  $("#send").click(function (event) {
    $("#content").addClass("blur-page");
    $(".loader").css("display", "block");
    event.preventDefault();
    var isValid = true;
    $("#contact-form input, #contact-form textarea").each(function () {
      var fieldName = $(this).attr("name");
      if (fieldName === "email") {
        return true;
      }

      if ($(this).val().trim() === "") {
        isValid = false;
        $("#" + fieldName).css("border", "1px solid red");
      } else {
        $("#" + fieldName).css("border", "1px solid #95fdff");
      }
    });

    if (isValid) {
      var formData = $("#contact-form").serialize();
      $.ajax({
        type: "POST",
        url: "./contact.php",
        data: formData,
        cache: false,
        success: function (response) {
          $("#content").removeClass("blur-page");
          $(".loader").css("display", "none");
          console.log(response);
          var data = JSON.parse(response);
          if (data.status === true) {
            $("#response").html(
              ` <div class="alert1 success1">${data.message}</div>`
            );
            showAlert(".success1", 5000);

            $("#contact-form")[0].reset();
          } else {
            $("#response").html(
              ` <div class="alert1 failed1">${data.message}</div>`
            );
            showAlert(".failed1", 5000);
          }
        },
        error: function () {
          $("#response").html(
            ` <div class="alert1 failed1">${data.message}</div>`
          );
          showAlert(".failed1", 5000);
        },
      });
    }
  });

  $("#loginbtn").click(function (event) {
    event.preventDefault();
    var isValid = true;
    $("#login-form input").each(function () {
      var fieldName = $(this).attr("name");

      if ($(this).val().trim() === "") {
        isValid = false;
        $("#" + fieldName).css("border", "1px solid red");
      } else {
        $("#" + fieldName).css("border", "1px solid #95fdff");
      }
    });

    if (isValid) {
      var formData = $("#login-form").serialize();
      $.ajax({
        type: "POST",
        url: "auth.php",
        data: formData,
        cache: false,
        success: function (response) {
          console.log(response);
          var data = JSON.parse(response);
          if (data.status === true) {
            var permissionArr = data.data.permissions;
            console.log(permissionArr);
            //if (permissionArr) {
            sessionStorage.clear();
            $("#response").html(
              ` <div class="alert1 success1">${data.message}</div>`
            );
            showAlert(".success1", 5000);
            if (data.data !== undefined) {
              redirect = data.base_url + "dashboard/";
              window.location.replace(redirect);
            }
            // } else {
            //     $('#response').html(` <div class="alert1 failed1">You don't have permission to login!</div>`);
            //     showAlert('.failed1', 5000);
            // }
          } else {
            $("#response").html(
              ` <div class="alert1 failed1">${data.message}</div>`
            );
            showAlert(".failed1", 5000);
          }
        },
        error: function () {
          $("#response").html(
            ` <div class="alert1 failed1">${data.message}</div>`
          );
          showAlert(".failed1", 5000);
        },
      });
    }
  });

  $("#signup-form").submit(function (event) {
    $("#content").addClass("blur-page");
    $(".loader1").css("display", "block");
    event.preventDefault();
    var isValid = true;
    $("#signup-form input").each(function () {
      var fieldName = $(this).attr("name");
      if ($(this).val().trim() === "") {
        isValid = false;
        $("#" + fieldName).css("border", "1px solid red");
      } else {
        $("#" + fieldName).css("border", "1px solid #95fdff");
      }
    });

    if (isValid) {
      var len = $("#password").val().length;
      if (len >= 8) {
        if ($("#password").val() === $("#c_password").val()) {
          var formData = $("#signup-form").serialize();
          $.ajax({
            type: "POST",
            url: "auth.php",
            data: formData,
            cache: false,
            success: function (response) {
              $("#content").removeClass("blur-page");
              $(".loader1").css("display", "none");
              console.log(response);
              var data = JSON.parse(response);
              if (data.status === true) {
                $("#signupMessage").html(data.message);
                $("#staticBackdrop").modal("show");
                $("#signup-form")[0].reset();
              } else {
                $("#response").html(
                  ` <div class="alert1 failed1">${data.message}</div>`
                );
                showAlert(".failed1", 5000);
              }
            },
            error: function () {
              $("#response").html(
                ` <div class="alert1 failed1">${data.message}</div>`
              );
              showAlert(".failed1", 5000);
            },
          });
        } else {
          $(".errmsg").html("Password does not match. ");
        }
      } else {
        $(".errmsg").html("Password should be 8 character long. ");
      }
    }
  });

  $("#update-pass-form").submit(function (event) {
    event.preventDefault();
    var isValid = true;
    $("#update-pass-form input").each(function () {
      var fieldName = $(this).attr("id");
      if ($(this).val().trim() === "") {
        isValid = false;
        $("#" + fieldName).css("border", "1px solid red");
      } else {
        $("#" + fieldName).css("border", "1px solid #95fdff");
      }
    });

    if (isValid) {
      var len = $("#npass").val().length;
      if (len >= 8) {
        if ($("#npass").val() === $("#cpass").val()) {
          var formData = $("#update-pass-form").serialize();
          $.ajax({
            type: "POST",
            url: "../auth.php",
            data: formData,
            cache: false,
            success: function (response) {
              console.log(response);
              var data = JSON.parse(response);
              if (data.status === true) {
                $("#response").html(
                  ` <div class="alert1 success1">${data.message}</div>`
                );
                showAlert(".success1", 5000);
                setInterval(() => {
                  window.location.href = data.base_url + "login.html";
                }, 3000);
                $("#update-pass-form")[0].reset();
              } else {
                $("#response").html(
                  ` <div class="alert1 failed1">${data.message}</div>`
                );
                showAlert(".failed1", 5000);
              }
            },
            error: function () {
              $("#response").html(
                ` <div class="alert1 failed1">${data.message}</div>`
              );
              showAlert(".failed1", 5000);
            },
          });
        } else {
          $("#response").html(
            ` <div class="alert1 failed1">Password does not match.</div>`
          );
          showAlert(".failed1", 5000);
        }
      } else {
        $("#response").html(
          ` <div class="alert1 failed1">Password should be 8 character long. </div>`
        );
        showAlert(".failed1", 5000);
      }
    }
  });

  // update pass using token
  $("#resetPasswordForm").submit(function (event) {
    event.preventDefault();
    var isValid = true;
    $("#resetPasswordForm input").each(function () {
      var fieldName = $(this).attr("id");
      if ($(this).val().trim() === "") {
        isValid = false;
        $("#" + fieldName).css("border", "1px solid red");
      } else {
        $("#" + fieldName).css("border", "1px solid #95fdff");
      }
    });

    if (isValid) {
      var len = $("#password").val().length;
      if (len >= 8) {
        if ($("#password").val() === $("#confirm_password").val()) {
          var formData = $("#resetPasswordForm").serialize();
          $.ajax({
            type: "POST",
            url: "./auth.php",
            data: formData,
            cache: false,
            success: function (response) {
              console.log(response);
              var data = JSON.parse(response);
              if (data.status === true) {
                $("#response").html(
                  ` <div class="alert1 success1">${data.message}</div>`
                );
                showAlert(".success1", 5000);
              } else {
                $("#response").html(
                  ` <div class="alert1 failed1">${data.message}</div>`
                );
                showAlert(".failed1", 5000);
              }
            },
            error: function () {
              $("#response").html(
                ` <div class="alert1 failed1">${data.message}</div>`
              );
              showAlert(".failed1", 5000);
            },
          });
        } else {
          $("#response").html(
            ` <div class="alert1 failed1">Password does not match.</div>`
          );
          showAlert(".failed1", 5000);
        }
      } else {
        $("#response").html(
          ` <div class="alert1 failed1">Password should be 8 character long. </div>`
        );
        showAlert(".failed1", 5000);
      }
    }
  });

  $(".loader").css("display", "none");
  // password reset link send
  $("#requestResetForm").submit(function (event) {
    $("#content").addClass("blur-page");
    $(".loader").css("display", "block");

    event.preventDefault();
    var isValid = true;
    $("#requestResetForm input").each(function () {
      var fieldName = $(this).attr("id");
      if ($(this).val().trim() === "") {
        isValid = false;
        $("#" + fieldName).css("border", "1px solid red");
      } else {
        $("#" + fieldName).css("border", "1px solid #95fdff");
      }
    });

    if (isValid) {
      var email = $("#email").val();
      var formData = {
        email: email,
        action: "resetRequest",
      };
      $.ajax({
        type: "POST",
        url: "./auth.php",
        data: formData,
        cache: false,
        success: function (response) {
          $("#content").removeClass("blur-page");
          $(".loader").css("display", "none");
          console.log(response);
          var data = JSON.parse(response);

          if (data.status === true) {
            $("#response").html(
              ` <div class="alert1 success1">${data.message}</div>`
            );
            showAlert(".success1", 5000);
          } else {
            $("#response").html(
              ` <div class="alert1 failed1">${data.message}</div>`
            );
            showAlert(".failed1", 5000);
          }
        },
        error: function () {
          $("#response").html(
            ` <div class="alert1 failed1">${data.message}</div>`
          );
          showAlert(".failed1", 5000);
        },
      });
    }
  });

  $("#logout").click(function (event) {
    event.preventDefault();
    var action = "logOut";
    $.ajax({
      type: "POST",
      url: "../auth.php",
      data: { action: action },
      cache: false,
      success: function (response) {
        console.log(response);
        var data = JSON.parse(response);
        if (data.status === true) {
          $("#response").html(
            ` <div class="alert1 success1">${data.message}</div>`
          );
          redirect = data.base_url;
          window.location.replace(redirect);
        } else {
          $("#response").html(
            ` <div class="alert1 failed1">${data.message}</div>`
          );
          showAlert(".failed1", 5000);
        }
      },
      error: function () {
        $("#response").html(
          ` <div class="alert1 failed1">${data.message}</div>`
        );
        showAlert(".failed1", 5000);
      },
    });
  });

  function showAlert(selector, duration) {
    $(selector)
      .addClass("show")
      .delay(duration)
      .queue(function () {
        $(this).removeClass("show").dequeue();
      });
  }
});

function test(id) {
  $("#" + id).css("border", "1px solid #95fdff");
  if (id === "c_password") {
    $(".errmsg").html("");
  }
}

function check(cpass, pass) {
  var password = $("#" + pass).val();
  var confirm_password = $("#" + cpass).val();
  if (password !== confirm_password && confirm_password !== "") {
    $(".errmsg").html("* Password does not match. ");
  } else {
    $(".errmsg").html("");
  }
}
