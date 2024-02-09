const formLogout = document.querySelector('form');

formLogout?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await fetch('/api/logout', {
        method: 'DELETE',
    });

    if (response.status === 204) {
        window.location.href = '/api/login';
    } else {
        const error = await response.json();
        alert(error.message);
    }
});
