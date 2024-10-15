$(document).ready(function () {
    let currentPage = 1;
    const rowsPerPage = 10;
    let totalDataCount = 0;
    let data = [];
    let filteredData = [];
    let sortKey = '';
    let sortOrder = 'asc';

    async function fetchData(page) {
        const start = (page - 1) * rowsPerPage;
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'POST',
                url: '../user.php',
                data: {
                    action: 'getLimitData',
                    start: start,
                    end: rowsPerPage,
                    sortKey: sortKey,
                    sortOrder: sortOrder
                },
                success: function (response) {
                    var parsedResponse = JSON.parse(response);
                    if (parsedResponse && parsedResponse.status) {
                        resolve(parsedResponse.data);
                    } else {
                        resolve(false);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    reject(`AJAX request failed: ${textStatus}, ${errorThrown}`);
                }
            });
        });
    }

    async function fetchTotalDataCount() {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'POST',
                url: '../user.php',
                data: { action: 'getTableCount', table: 'Login_Logs' },
                success: function (response) {
                    var parsedResponse = JSON.parse(response);
                    if (parsedResponse && parsedResponse.status) {
                        resolve(parsedResponse.count);
                    } else {
                        resolve(false);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    reject(`AJAX request failed: ${textStatus}, ${errorThrown}`);
                }
            });
        });
    }

    async function loadData(query = '') {
        var loader = document.getElementById('loader');
       loader.style.display = 'block';
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
        }else{
            const $tableBody = $("#dataTable tbody");
            $tableBody.html(
              '<tr><td colspan="100%"><h3 class="text-center">Logs not found</h3></td></tr>'
            );
        }
        } catch (error) {
            console.error('Error loading data:', error);
        }finally{
            loader.style.display = 'none';
        }
    }

    function renderTable(page) {
        const $tableBody = $('#dataTable tbody');
        $tableBody.empty();

        $.each(filteredData, function (index, item) {
            const $row = $('<tr>');
            $('<td>').text(item.id).appendTo($row);
            $('<td>').text(item.browser).appendTo($row);
            $('<td>').text(item.platform).appendTo($row);
            $('<td>').text(item.ip).appendTo($row);
            $('<td>').text(item.last_login).appendTo($row);
            $tableBody.append($row);
        });
    }

    function renderPagination() {
        const totalPages = Math.ceil(totalDataCount / rowsPerPage);
        const $pagination = $('.pagination');
        $pagination.empty();

        // Previous button
        if (currentPage > 1) {
            const $prevButton = $('<button>').html('<i class="ti-angle-left"></i>').addClass('btn btn-secondary mx-1');
            $prevButton.on('click', function () {
                currentPage--;
                loadData();
            });
            $pagination.append($prevButton);
        }

        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        for (let i = startPage; i <= endPage; i++) {
            const $button = $('<button>').text(i).addClass('btn btn-secondary mx-1');
            if (i === currentPage) {
                $button.addClass('btn-primary').attr('disabled', true);
            }
            $button.on('click', function () {
                currentPage = i;
                loadData();
            });
            $pagination.append($button);
        }

        // Next button
        if (currentPage < totalPages) {
            const $nextButton = $('<button>').html('<i class="ti-angle-right"></i>').addClass('btn btn-secondary mx-1');
            $nextButton.on('click', function () {
                currentPage++;
                loadData();
            });
            $pagination.append($nextButton);
        }
    }

    function filterData(query) {
        return data.filter((item) => {
            return Object.values(item).some((val) =>
                String(val).toLowerCase().includes(query.toLowerCase())
            );
        });
    }

    $('#dataTable th').on('click', function () {
        sortKey = $(this).data('sort');
        sortOrder = $(this).data('sort-order') === 'asc' ? 'desc' : 'asc';
        $(this).data('sort-order', sortOrder);
        currentPage = 1; // Reset to first page when sorting changes
        loadData();
    });

    $('#filterInput').on('input', function () {
        const query = $(this).val();
        filteredData = filterData(query);
        renderTable(currentPage);
    });

    loadData();
});
