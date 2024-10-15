fetch('auth.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({ action: 'checkAuth' })
})
    .then(response => response.json())
    .then(res1 => {
        if (res1.status === true) {
            window.location.href = res1.redirectUrl;
        }
    })
    .catch(error => console.error('Error:', error));