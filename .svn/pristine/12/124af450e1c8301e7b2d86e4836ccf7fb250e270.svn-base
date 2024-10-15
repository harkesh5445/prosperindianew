$(document).ready(function () {
  
    let currentPage = 1;
    const rowsPerPage = 10;
    let data = [];

    function renderTable(page) {
        const start = (page - 1) * rowsPerPage;
        const end = page * rowsPerPage;
        const paginatedData = data.slice(start, end);
        const $tableBody = $('#dataTable tbody');
        $tableBody.empty();

        $.each(paginatedData, function (index, item) {
            const $row = $('<tr>');
            $('<td>').text(item.id).appendTo($row);
            $('<td>').text(item.name).appendTo($row);
            $('<td>').text(item.created_by).appendTo($row);
            $('<td>').text(item.role_id).appendTo($row);
            $('<td>').html((item.isDeleted == 1) ? `<span id="ustatus-${item.id}" style="color:red">Deleted<span>` : (item.status == 1) ? `<span id="ustatus-${item.id}" style="color:green">Active<span>` : `<span id="ustatus-${item.id}" style="color:gray">Disabled<span>`).appendTo($row);
            // $('<td>').html(`<span id="rm-${item.id}"><a onclick="showEditModal('${item.id}')"><i class="ti-pencil menu-icon btn btn-success p-2 m-1"></i></a> <a><i onclick="deletePermission('${item.id}')" class="ti-trash menu-icon btn btn-danger p-2 m-1"></i></a></span>`).appendTo($row);
            $tableBody.append($row);
        });

        renderPagination();
    }

    function renderPagination() {
        const totalPages = Math.ceil(data.length / rowsPerPage);
        const $pagination = $('.pagination');
        $pagination.empty();

        for (let i = 1; i <= totalPages; i++) {
            const $button = $('<button>').text(i);
            if (i === currentPage) {
                $button.attr('disabled', true);
            }
            $button.on('click', function () {
                currentPage = i;
                renderTable(currentPage);
            });
            $pagination.append($button);
        }
    }

    function sortData(sortKey, sortOrder) {
        data.sort((a, b) => {
            if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
            if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        renderTable(currentPage);
    }

    function filterData(query) {
        const filteredData = data.filter(item => {
            return Object.values(item).some(val =>
                String(val).toLowerCase().includes(query.toLowerCase())
            );
        });
        data = filteredData;
        renderTable(currentPage);
    }

    $('#dataTable th').on('click', function () {
        const sortKey = $(this).data('sort');
        const sortOrder = $(this).data('sort-order') === 'asc' ? 'desc' : 'asc';
        $(this).data('sort-order', sortOrder);
        sortData(sortKey, sortOrder);
    });

    $('#filterInput').on('input', function () {
        const query = $(this).val();
        loadUsers(query);
    });

    function loadUsers(query = '') {
        var loader = document.getElementById('loader');
        loader.style.display = 'block';
        $.ajax({
            type: 'POST',
            url: '../user.php',
            data: { action: 'getAllPermissions' },
            success: function (response) {
                try {
                    var parsedResponse = JSON.parse(response);
                    console.log("Data received from server:", parsedResponse);

                    if (parsedResponse.status === true && Array.isArray(parsedResponse.data)) {
                        data = parsedResponse.data;
                        if (query) {
                            filterData(query);
                        } else {
                            renderTable(currentPage);
                        }
                    } else {
                        console.error('Invalid data format received:', parsedResponse);
                    }
                } catch (error) {
                    console.error('Error parsing JSON response:', error);
                }finally{
                   
                    loader.style.display = 'none';
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('There was a problem with the AJAX request:', textStatus, errorThrown);
            }
        });
    }


    loadUsers();

    $('#edit-permission-form').submit(function (event) {
        event.preventDefault();
        var isValid = true;
        var value = $('#role1').val();
        if (value.trim() === '') {
            isValid = false;
            $('#role1').css('border', '1px solid red');
        } else {
            $('#role1').css('border', '1px solid #95fdff');
        }
        if (isValid) {

            var formData = $('#edit-permission-form').serialize();
            $.ajax({
                type: 'POST',
                url: '../user.php',
                data: formData,
                cache: false,
                success: function (response) {
                    console.log(response);
                    var data = JSON.parse(response);
                    if (data.status === true) {
                        loadUsers();
                        $('#message1').html(` <div class="alert alert-success" role="alert">${data.message}</div>`);
                        setTimeout(() => {
                            $('#message1').html(``);
                        }, 3000)
                    } else {
                        $('#message1').html(` <div class="alert alert-danger" role="alert">${data.message}</div>`);
                        setTimeout(() => {
                            $('#message1').html(``);
                        }, 3000)
                    }
                },
                error: function () {
                    $('#message1').html(` <div class="alert alert-danger" role="alert">${data.message}</div>`);
                    setTimeout(() => {
                        $('#message1').html(``);
                    }, 3000)
                }
            });
        }

    })


    $('#add-permission-form').submit(function (event) {
        event.preventDefault();
        var isValid = true;
        var value = $('#permission').val();
        if (value.trim() === '') {
            isValid = false;
            $('#permission').css('border', '1px solid red');
        } else {
            $('#permission').css('border', '1px solid #95fdff');
        }
        if (isValid) {

            var formData = $('#add-permission-form').serialize();
            $.ajax({
                type: 'POST',
                url: '../user.php',
                data: formData,
                cache: false,
                success: function (response) {
                    console.log(response);
                    var data = JSON.parse(response);
                    if (data.status === true) {
                        loadUsers();
                        $('#message').html(` <div class="alert alert-success" role="alert">${data.message}</div>`);
                        setTimeout(() => {
                            $('#message').html(``);
                        }, 3000)
                        $("#add-role-form")[0].reset();
                    } else {
                        $('#message').html(` <div class="alert alert-danger" role="alert">${data.message}</div>`);
                        setTimeout(() => {
                            $('#message').html(``);
                        }, 3000)
                    }
                },
                error: function () {
                    $('#message').html(` <div class="alert alert-danger" role="alert">${data.message}</div>`);
                    setTimeout(() => {
                        $('#message').html(``);
                    }, 3000)
                }
            });
        }

    })



});




function showAlert(selector, duration) {
    $(selector)
        .addClass('show')
        .delay(duration)
        .queue(function () {
            $(this).removeClass('show').dequeue();
        });
}

function showAddModal() {

    var formData = {action: 'showAddModal'};

    $.ajax({
        type: 'POST',
        url: '../user.php',
        data: formData,
        cache: false,
        success: function (response) {
            //console.log(response);
            var parsedResponse = JSON.parse(response);
            if (parsedResponse.status === true) {
                var roles = parsedResponse.data.roles;
               var roleOpt = `<option value="">Please select</option>`;
                $.each(roles, function (key, role) {
                    roleOpt += `<option value="${role.id}">${role.name}</option>`;
                });
                $('#role').html(roleOpt);
                $('#addPermission').modal('show');
            }
        },
    })
    
   
}

function showEditModal(id) {
    //alert(id);
    var formData = { id: id, action: 'showEditModal' };
    $.ajax({
        type: 'POST',
        url: '../user.php',
        data: formData,
        cache: false,
        success: function (response) {
            console.log(response); 
            var parsedResponse = JSON.parse(response);
            if (parsedResponse.status === true) {
                var roles = parsedResponse.data.roles;
                var permissions = parsedResponse.data.permissions[0];
                var roleOpt = `<option value="">Please select</option>`;
                $.each(roles, function (key, role) {
                    roleOpt += `<option value="${role.id}" ${permissions.role_id == role.id ? 'selected' : ''}>${role.name}</option>`;
                });
                $('#role1').html(roleOpt);
                $('#permission1').val(permissions.name); 
                $('#prmsn_id').val(permissions.id); 
                $('#editPermission').modal('show');
            }
        },
    });
}


function deletePermission(id) {

    var formData = { id: id, action: 'deletePermission' };
    $.ajax({
        type: 'POST',
        url: '../user.php',
        data: formData,
        cache: false,
        success: function (response) {
            console.log(response);
            var data = JSON.parse(response);
            if (data.status === true) {
                $('#rm-' + id).closest('tr').remove();
                $('#message2').html(` <div class="alert alert-success" role="alert">${data.message}</div>`);
                setTimeout(() => {
                    $('#message2').html(``);
                }, 3000)
            } else {
                $('#message2').html(` <div class="alert alert-danger" role="alert">${data.message}</div>`);
                setTimeout(() => {
                    $('#message2').html(``);
                }, 3000)
            }
        },
    })
}





