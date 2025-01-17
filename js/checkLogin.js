document.addEventListener('DOMContentLoaded', function () {
    //return;s

    const navLinksContainer = document.getElementById('navLinksContainer');
    const currentUrl = window.location.href;

    const previousUrl = sessionStorage.getItem('previousUrl') || '';

    let historyStack = JSON.parse(sessionStorage.getItem('historyStack')) || [];
    if (previousUrl && previousUrl !== currentUrl && !historyStack.includes(previousUrl)) {
        historyStack.push(previousUrl);
    }
    sessionStorage.setItem('previousUrl', currentUrl);
    sessionStorage.setItem('historyStack', JSON.stringify(historyStack));
    navLinksContainer.innerHTML = '';
    historyStack.forEach((page, index) => {
        let pageArr = page.split('/');
        let label = pageArr[pageArr.length - 1];
        let folder = pageArr[pageArr.length - 2];

        let labelName;
        if (folder === 'TfMap') {
            labelName = 'Topo Map';
        } else {
            let labelArr = label.split('.');
            labelName = (labelArr[0] === 'index') ? 'Home' : capitalizeFirstLetter(labelArr[0]);
        }

        if (labelName) {
            let listItem = document.createElement('li');
            listItem.classList.add('breadcrumb-item');
            let link = document.createElement('a');
            link.href = page;
            link.textContent = labelName;
            listItem.appendChild(link);
            navLinksContainer.appendChild(listItem);
        }
    });

    // Append current page link if it's not the home page or a duplicate
    if (currentUrl !== previousUrl && !historyStack.includes(currentUrl)) {
        let currentPageArr = currentUrl.split('/');
        let currentPageLabel = currentPageArr[currentPageArr.length - 1];
        let currentPageFolder = currentPageArr[currentPageArr.length - 2];

        let currentPageLabelName;
        if (currentPageFolder === 'TfMap') {
            currentPageLabelName = 'Topo Map';
        } else {
            let currentPageLabelArr = currentPageLabel.split('.');
            currentPageLabelName = (currentPageLabelArr[0] === 'index') ? 'Home' : capitalizeFirstLetter(currentPageLabelArr[0]);
        }

        if (currentPageLabelName) {
            let currentItem = document.createElement('li');
            currentItem.classList.add('breadcrumb-item');
            currentItem.classList.add('active');
            currentItem.setAttribute('aria-current', 'page');
            currentItem.textContent = currentPageLabelName;
            navLinksContainer.appendChild(currentItem);
        }
    }


    fetch('../auth.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ action: 'checkAuth' })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(res1 => {
            if (res1.status === false) {
                window.location.href = res1.redirectUrl;
            } else {
                var data = res1.data;
                console.log(data);

                if ((currentUrl.includes('adminConsole') || currentUrl.includes('contacts') || currentUrl.includes('users') || currentUrl.includes('logs') || currentUrl.includes('permissions') || currentUrl.includes('roles')) && (!data.isAdmin && !data.isAll)) {
                    window.location.href = res1.redirectUrl;
                }
    
                if (currentUrl.includes('TfMap') && (!data.isTopo && !data.isAll)) {
                    window.location.href = res1.redirectUrl;
                }


                const uName = document.getElementById('u_name');
                if (uName) {
                    uName.textContent = data.name;
                } else {
                    console.error('Element with id "u_name" is missing from the DOM.');
                }

                const adminConsole = document.getElementById('adminConsole');
                const tfMap = document.getElementById('TfMap');
                const pifPermissions = document.getElementById('pifPermissions');
                const pifRoles = document.getElementById('pifRoles');

                if (adminConsole) {
                    if (data.isAdmin || data.isAll) {
                        adminConsole.classList.add("dropdown-item");
                        adminConsole.style.display = 'block';
                    } else {
                        adminConsole.classList.remove("dropdown-item");
                        adminConsole.style.display = 'none';
                   }
                } else {
                    console.error('Element with id "adminConsole" is missing from the DOM.');
                }

                if (tfMap) {
                    if (data.isTopo || data.isAll) {
                        tfMap.style.display = 'block';
                    } else {
                        tfMap.style.display = 'none';
                   }
                }

                if (pifPermissions) {
                    if (data.isAll) {
                        pifPermissions.style.display = 'block';
                    } else {
                        pifPermissions.style.display = 'none';
                    }
                }

                if (pifRoles) {
                    if (data.isAll) {
                        pifRoles.style.display = 'block';
                    } else {
                        pifRoles.style.display = 'none';
                    }
                }
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
     });


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    