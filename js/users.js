$(document).ready(function () {
  let currentPage = 1;
  const rowsPerPage = 10;
  let totalDataCount = 0;
  let data = [];
  let filteredData = [];
  let sortKey = "";
  let sortOrder = "asc";

  async function fetchData(page) {
    const start = (page - 1) * rowsPerPage;
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "POST",
        url: "../user.php",
        data: {
          action: "getUsers",
          start: start,
          end: rowsPerPage,
          sortKey: sortKey,
          sortOrder: sortOrder,
        },
        success: function (response) {
          var parsedResponse = JSON.parse(response);
          if (parsedResponse && parsedResponse.status) {
            resolve(parsedResponse.data);
          } else {
            reject("Failed to fetch data");
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          reject(`AJAX request failed: ${textStatus}, ${errorThrown}`);
        },
      });
    });
  }

  async function fetchTotalDataCount() {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "POST",
        url: "../user.php",
        data: { action: "getTableCount", table: "Users" },
        success: function (response) {
          var parsedResponse = JSON.parse(response);
          if (parsedResponse && parsedResponse.status) {
            resolve(parsedResponse.count);
          } else {
            reject("Failed to fetch total data count");
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          reject(`AJAX request failed: ${textStatus}, ${errorThrown}`);
        },
      });
    });
  }

  async function loadData(query = "") {
    var loader = document.getElementById('loader');
    loader.style.display = 'block';
   // delay(1000);
    try {
      totalDataCount = await fetchTotalDataCount();
      data = await fetchData(currentPage);
      if (totalDataCount && data) {
        filteredData = data; // Use fetched data as initial filtered data
        if (query) {
          filteredData = filterData(query);
        }
        renderTable(currentPage);
        renderPagination();
      } else {
        const $tableBody = $("#dataTable tbody");
        $tableBody.html(
          '<tr><td colspan="100%"><h3 class="text-center">Users not found</h3></td></tr>'
        );
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }finally{
      loader.style.display = 'none';
    }
  }

  function renderTable(page) {
    const $tableBody = $("#dataTable tbody");
    $tableBody.empty();

    $.each(filteredData, function (index, item) {
      const $row = $("<tr>");
      $("<td>").text(item.id).appendTo($row);
      $("<td>").text(item.name).appendTo($row);
      $("<td>").text(item.email).appendTo($row);
      $("<td>").text(item.phone).appendTo($row);
      $("<td>")
        .html(
          item.is_verified == 1
            ? `<span style="color:green">Verified<span>`
            : `<span style="color:red">Unverified<span>`
        )
        .appendTo($row);
      $("<td>")
        .html(
          item.status == 1
            ? `<span id="ustatus-${item.id}" style="color:green">Active<span>`
            : `<span id="ustatus-${item.id}" style="color:gray">Disabled<span>`
        )
        .appendTo($row);
      $("<td>")
        .html(
          `<a onclick="editUser('${item.id}')"><i class="ti-pencill menu-icon btn btn-success p2 m-1">Edit</i></a> <a><i onclick="deleteUser('${item.id}')" class="ti-trashh menu-icon btn btn-danger p2 m-1">Delete</i></a>`
        )
        .appendTo($row);
      $tableBody.append($row);
    });
  }

  // function renderPagination() {
  //     const totalPages = Math.ceil(totalDataCount / rowsPerPage);
  //     const $pagination = $('.pagination');
  //     $pagination.empty();

  //     for (let i = 1; i <= totalPages; i++) {
  //         const $button = $('<button>').text(i);
  //         if (i === currentPage) {
  //             $button.attr('disabled', true);
  //         }
  //         $button.on('click', function () {
  //             currentPage = i;
  //             loadData();
  //         });
  //         $pagination.append($button);
  //     }
  // }

  function renderPagination() {
    const totalPages = Math.ceil(totalDataCount / rowsPerPage);
    const $pagination = $(".pagination");
    $pagination.empty();

    // Previous button
    if (currentPage > 1) {
      const $prevButton = $("<button>")
        .html('<i class="ti-angle-left"></i>')
        .addClass("btn btn-secondary mx-1");
      $prevButton.on("click", function () {
        currentPage--;
        loadData();
      });
      $pagination.append($prevButton);
    }

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      const $button = $("<button>").text(i).addClass("btn btn-secondary mx-1");
      if (i === currentPage) {
        $button.addClass("btn-primary").attr("disabled", true);
      }
      $button.on("click", function () {
        currentPage = i;
        loadData();
      });
      $pagination.append($button);
    }

    // Next button
    if (currentPage < totalPages) {
      const $nextButton = $("<button>")
        .html('<i class="ti-angle-right"></i>')
        .addClass("btn btn-secondary mx-1");
      $nextButton.on("click", function () {
        currentPage++;
        loadData();
      });
      $pagination.append($nextButton);
    }
  }

  function sortData(sortKey, sortOrder) {
    filteredData.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    renderTable(currentPage);
  }

  function filterData(query) {
    return data.filter((item) => {
      return Object.values(item).some((val) =>
        String(val).toLowerCase().includes(query.toLowerCase())
      );
    });
  }

  $("#dataTable th").on("click", ".sort-btn", function () {
    const $th = $(this).closest("th");
    sortKey = $th.data("sort");
    sortOrder = sortOrder === "asc" ? "desc" : "asc";
    $(this).removeClass("asc desc").addClass(sortOrder);
    currentPage = 1;
    sortData(sortKey, sortOrder);
  });

  $("#filterInput").on("input", function () {
    const query = $(this).val();
    filteredData = filterData(query);
    renderTable(currentPage);
  });

  loadData();

  // Handle unselect event
  $("#permissions").on("select2:unselect", function (e) {
    console.log(e);
    var Ids = e.params.data.id;
    var userid = $("#userId").val();

    jsonData = { Ids: Ids, userid: userid, action: "deleteUserPermission" };
    $.ajax({
      type: "POST",
      url: "../user.php",
      data: jsonData,
      cache: false,
      success: function (response) {
        var parsedResponse = JSON.parse(response);
        if (parsedResponse.status == true) {
          return true;
        } else {
          return false;
        }
      },
    });
  });

  $("#role").on("select2:unselect", function (e) {
    console.log(e);
    var deselectedRole = e.params.data.text;
    $('#permissions optgroup[label="' + deselectedRole + '"]').remove();
  });

  // Handle select event
  $("#role").on("select2:select", function (e) {
    var selectedRoleId = e.params.data.id;
    var selectedRoleName = e.params.data.text;

    if (selectedRoleId && selectedRoleId !== "undefined") {
      var jsonData = { role_id: selectedRoleId, action: "getPermission" };

      $.ajax({
        type: "POST",
        url: "../user.php",
        data: jsonData,
        cache: false,
        success: function (response) {
          var parsedResponse = JSON.parse(response);
          if (
            parsedResponse.status === true &&
            Array.isArray(parsedResponse.data)
          ) {
            var permissions = parsedResponse.data;
            var permissionOpt = `<optgroup label="${selectedRoleName}">`;
            $.each(permissions, function (i, permission) {
              permissionOpt += `<option value="${
                selectedRoleId + "-" + permission.id
              }">${permission.name}</option>`;
            });
            permissionOpt += `</optgroup>`;
            $("#permissions").append(permissionOpt);
          }
        },
        error: function (xhr, status, error) {
          console.error("AJAX Error: " + status + error);
        },
      });
    }
  });

  // Event handler for role unselect
  $("#userRole").on("select2:unselect", function (e) {
    var deselectedRole = e.params.data.text;
    $('#userPermission optgroup[label="' + deselectedRole + '"]').remove();
  });

  $("#userRole").on("select2:select", function () {
    var roleId = $(this).find("option:selected").last().val();

    if (roleId !== "" && roleId !== "undefined") {
      const selectedName = $(this).find("option:selected").last().text();
      console.log(selectedName);
      var jsonData = { role_id: roleId, action: "getPermission" };

      $.ajax({
        type: "POST",
        url: "../user.php",
        data: jsonData,
        cache: false,
        success: function (response) {
          var parsedResponse = JSON.parse(response);
          console.log(parsedResponse);
          if (
            parsedResponse.status === true &&
            Array.isArray(parsedResponse.data)
          ) {
            var permissions = parsedResponse.data;
            var permissionOpt = `<optgroup label="${selectedName}">`;
            $.each(permissions, function (i, permission) {
              permissionOpt += `<option value="${
                roleId + "-" + permission.id
              }">${permission.name}</option>`;
            });
            permissionOpt += `</optgroup>`;
            $("#userPermission").append(permissionOpt);
          }
        },
        error: function (xhr, status, error) {
          console.error("AJAX Error: " + status + error);
        },
      });
    }
  });

  $("#update-user").submit(function (event) {
    event.preventDefault();
    var isValid = true;
    $("#update-user input").each(function () {
      var inpId = $(this).attr("id");
      if ($(this).val().trim() === "") {
        isValid = false;
        $("#" + inpId).css("border", "1px solid red");
      } else {
        $("#" + inpId).css("border", "1px solid #95fdff");
      }
    });
    // alert('++++++++++++');
    if (isValid) {
      //alert('++++rijuykmyuk++++++++');
      var formData = $("#update-user").serialize();

      $.ajax({
        type: "POST",
        url: "../user.php",
        data: formData,
        cache: false,
        success: function (response) {
          console.log(response);
          var data = JSON.parse(response);
          if (data.status === true) {
            let isChecked = $("#emailVerified").prop("checked");
            let isDisabled = $("#emailVerified").prop("disabled");
            if (isChecked && !isDisabled) {
              $("#emailVerified").prop("disabled", true);
            }

            $("#response1").html(
              `<div class="alert alert-success" role="alert">${data.message}</div>`
            );
            setTimeout(function () {
              $("#response1").html(``);
            }, 2000);
            location.reload();
          } else {
            alert("update-user");
            $("#response1").html(
              ` <div class="alert alert-danger" role="alert">${data.message}</div>`
            );
          }
        },
        error: function () {
          $("#response1").html(
            ` <div class="alert alert-danger" role="alert">An error occurred while updating the user. </div>`
          );
          setTimeout(function () {
            $("#response1").html(``);
          }, 2000);
        },
      });
    }
  });

  $("#changepass").click(function (event) {
    event.preventDefault();
    var password = $("#password").val();
    var confirm_password = $("#confirm_password").val();
    var id = $("#uid").val();
    if (password !== "" && confirm_password !== "") {
      if (password === confirm_password) {
        let len = password.length;
        if (len >= 8) {
          var formData = {
            password: password,
            confirm_password: confirm_password,
            id: id,
            action: "changePass",
          };

          $.ajax({
            type: "POST",
            url: "../user.php",
            data: formData,
            cache: false,
            success: function (response) {
              console.log(response);
              var data = JSON.parse(response);
              if (data.status === true) {
                $("#response1").html(
                  `<div class="alert alert-success" role="alert">${data.message}</div>`
                );
                setTimeout(function () {
                  $("#response1").html(``);
                }, 2000);
              } else {
                $("#response1").html(
                  ` <div class="alert alert-danger" role="alert">${data.message}</div>`
                );
                setTimeout(function () {
                  $("#response1").html(``);
                }, 2000);
              }
            },
            error: function () {
              $("#response1").html(
                ` <div class="alert alert-danger" role="alert">An error occurred while updating the password. </div>`
              );
              setTimeout(function () {
                $("#response1").html(``);
              }, 2000);
            },
          });
        } else {
          $("#response1").html(
            ` <div class="alert alert-danger" role="alert">Password should be 8 character long. </div>`
          );
          setTimeout(function () {
            $("#response1").html(``);
          }, 2000);
        }
      } else {
        $("#response1").html(
          ` <div class="alert alert-danger" role="alert">Password does not match. </div>`
        );
        setTimeout(function () {
          $("#response1").html(``);
        }, 2000);
      }
    } else {
      $("#password").css("border", "1px solid red");
      $("#confirm_password").css("border", "1px solid red");
    }
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

function editUser(id) {
  var jsonData = { id: id, action: "editUser" };
  $.ajax({
    type: "POST",
    url: "../user.php",
    data: jsonData,
    cache: false,
    success: function (response) {
      try {
        var parsedResponse = JSON.parse(response);
        console.log("Parsed Response:", parsedResponse);

        if (
          parsedResponse.status === true &&
          typeof parsedResponse.data === "object"
        ) {
          var data = parsedResponse.data;

          // Parse roles
          var roles = data.roles;
          var userRoles = data.userRoles.map(Number); // Ensure userRoles are numbers
          console.log("Roles:", roles);
          console.log("User Roles:", userRoles);

          var roleOpt = `<option value="">Please select</option>`;
          $.each(roles, function (key, role) {
            var isSelected = userRoles.includes(parseInt(role.id))
              ? "selected"
              : "";
            roleOpt += `<option value="${role.id}" ${isSelected}>${role.name}</option>`;
          });
          $("#role").html(roleOpt).trigger("change"); // Initialize Select2 for roles

          // Parse permissions
          var permissions = data.permissions;
          var permissionOpt = ``;
          $.each(permissions, function (role, perms) {
            permissionOpt += `<optgroup label="${role}">`;
            $.each(perms, function (i, permission) {
              permissionOpt += `<option value="${
                permission.role_id + "-" + permission.id
              }" selected>${permission.permission}</option>`;
            });
            permissionOpt += `</optgroup>`;
          });
          $("#permissions").html(permissionOpt).trigger("change"); // Initialize Select2 for permissions
          $("#permissions").select2();

          // Populate user details
          $("#userId").val(data.id);
          $("#name").val(data.name);
          $("#email").val(data.email);
          $("#phone").val(data.phone);
          $("#uName").html(data.name);
          $("#uEmail").html(data.email);

          // is_verified checkbox
          const emailVerified = document.getElementById("emailVerified");
          if (parseInt(data.is_verified) === 1) {
            emailVerified.checked = true;
            emailVerified.disabled = true;
          } else {
            emailVerified.checked = false;
            emailVerified.disabled = false;
          }

          // isDeleted checkbox
          const deleteUser = document.getElementById("deleteUser");
          if (parseInt(data.isDeleted) === 1) {
            deleteUser.checked = true;
            deleteUser.disabled = true;
          } else {
            deleteUser.checked = false;
            deleteUser.disabled = false;
          }

          // Reinitialize Select2 elements after setting the options
          $("#uid").val(id);

          $("#role").select2();
          $("#permissions").select2();

          $("#editUserModal").modal("show");
        } else {
          $("#response").html(
            `<div class="alert alert-danger">${parsedResponse.message}!</div>`
          );
          showAlert(".alert-danger", 5000);
        }
      } catch (error) {
        console.error("Error parsing JSON response:", error);
        $("#response").html(
          `<div class="alert alert-danger">An error occurred while processing the response!</div>`
        );
        showAlert(".alert-danger", 5000);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("AJAX request failed:", textStatus, errorThrown);
      $("#response").html(
        `<div class="alert alert-danger">An error occurred while fetching user data!</div>`
      );
      showAlert(".alert-danger", 5000);
    },
  });
}

function deleteUser(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You want to delete it! ",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        type: "POST",
        url: "../user.php",
        data: { id: id, action: "deleteUser" },
        cache: false,
        success: function (response) {
          console.log(response);
          var data = JSON.parse(response);
          if (data.status === true) {
            $("#ustatus-" + id)
              .closest("tr")
              .remove();
            $("#response").html(
              ` <div class="alert1 success1">${data.message}!</div>`
            );
            showAlert(".success1", 3000);
            loadUsers("");
          } else {
            $("#response").html(
              ` <div class="alert1 failed1">${data.message}!</div>`
            );
            showAlert(".failed1", 5000);
          }
        },
        error: function () {
          $("#response").html(
            ` <div class="alert1 failed1">${data.message}!</div>`
          );
          showAlert(".failed1", 5000);
        },
      });
    }
  });
}

function reStoreUser(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You want to restore it! ",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, restore it!",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        type: "POST",
        url: "../user.php",
        data: { id: id, action: "reStoreUser" },
        cache: false,
        success: function (response) {
          console.log(response);
          var data = JSON.parse(response);
          if (data.status === true) {
            location.reload();
          } else {
            $("#response").html(
              ` <div class="alert1 failed1">${data.message}!</div>`
            );
            showAlert(".failed1", 5000);
          }
        },
        error: function () {
          $("#response").html(
            ` <div class="alert1 failed1">${data.message}!</div>`
          );
          showAlert(".failed1", 5000);
        },
      });
    }
  });
}

function showAddUserModal() {
  var jsonData = { action: "showAddUserModal" };
  $.ajax({
    type: "POST",
    url: "../user.php",
    data: jsonData,
    cache: false,
    success: function (response) {
      var parsedResponse = JSON.parse(response);
      if (parsedResponse.status === true) {
        var roles = parsedResponse.data;
        var roleOpt = `<option value="">Please select</option>`;
        $.each(roles, function (key, role) {
          roleOpt += `<option value="${role.id}">${role.name}</option>`;
        });
        $("#userRole").html(roleOpt);
        var permissionOpt = `<option value="">Please select</option>`;
        $("#userPermission").html(permissionOpt);
        $("#addUser").modal("show");
      }
    },
  });
}

function showDeletedUsers() {
  var jsonData = { action: "showDeletedUsers" };
  $.ajax({
    type: "POST",
    url: "../user.php",
    data: jsonData,
    cache: false,
    success: function (response) {
      var parsedResponse = JSON.parse(response);
      if (parsedResponse.status === true) {
        const $tableBody = $("#dataTable1 tbody");
        $tableBody.empty();

        $.each(parsedResponse.data, function (index, item) {
          const $row = $("<tr>");
          $("<td>").text(item.id).appendTo($row);
          $("<td>").text(item.name).appendTo($row);
          $("<td>").text(item.email).appendTo($row);
          $("<td>").text(item.phone).appendTo($row);
          // $('<td>').text(item.roles).appendTo($row);
          // $('<td>').text(item.permissions).appendTo($row);
          $("<td>")
            .html(
              item.is_verified == 1
                ? `<span style="color:green">Verified<span>`
                : `<span style="color:red">Unverified<span>`
            )
            .appendTo($row);
          $("<td>")
            .html(
              item.isDeleted == 1
                ? `<span id="ustatus-${item.id}" style="color:red">Deleted<span>`
                : ``
            )
            .appendTo($row);
          $("<td>")
            .html(
              `<a onclick="reStoreUser('${item.id}')"><i class="ti-reloadd menu-icon btn btn-success p2 m-1">Restore</i></a>`
            )
            .appendTo($row);
          $tableBody.append($row);
        });
        $("#showdeletedusers").modal("show");
      } else {
        const $tableBody = $("#dataTable1 tbody");
        $tableBody.html(
          '<tr><td colspan="100%"><h3 class="text-center">Deleted users not found</h3></td></tr>'
        );
        $("#showdeletedusers").modal("show");
      }
    },
  });
}

function addUser() {
  var isValid = true;
  $("#add-user-form input").each(function () {
    var fieldId = $(this).attr("id");
    var value = $(this).val();
    if (value.trim() === "") {
      isValid = false;
      $("#" + fieldId).css("border", "1px solid red");
    } else {
      $("#" + fieldId).css("border", "1px solid #95fdff");
    }
    //}
  });

  if (isValid) {
    var len = $("#pass").val().length;
    if (len >= 8) {
      if ($("#pass").val() === $("#cpass").val()) {
        var formData = $("#add-user-form").serialize();
        $.ajax({
          type: "POST",
          url: "../user.php",
          data: formData,
          cache: false,
          success: function (response) {
            console.log(response);
            var data = JSON.parse(response);
            if (data.status === true) {
              $("#message").html(
                ` <div class="alert alert-success" role="alert">${data.message}</div>`
              );
              setTimeout(() => {
                $("#message").html(``);
                location.reload();
              }, 3000);
              $("#add-user-form")[0].reset();
            } else {
              $("#message").html(
                ` <div class="alert alert-danger" role="alert">${data.message}</div>`
              );
              setTimeout(() => {
                $("#message").html(``);
              }, 3000);
            }
          },
          error: function () {
            $("#message").html(
              ` <div class="alert alert-danger" role="alert">${data.message}</div>`
            );
            setTimeout(() => {
              $("#message").html(``);
            }, 3000);
          },
        });
      } else {
        $("#message").html(
          ` <div class="alert alert-danger" role="alert">Password does not match. </div>`
        );
        setTimeout(() => {
          $("#message").html(``);
        }, 3000);
        $(".errmsg").html("");
      }
    } else {
      $("#message").html(
        ` <div class="alert alert-danger" role="alert">Password should be 8 character long.</div>`
      );
      setTimeout(() => {
        $("#message").html(``);
      }, 3000);
    }
  }
}
