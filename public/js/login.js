const formLogin = document.querySelector('form');

formLogin?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(formLogin)),
    });
    console.log('response', response);

    if (response.status === 201) {
        window.location.href = '/profile';
    } else {
        const error = await response.json();
        console.log(JSON.stringify(error));
        alert(error.message);
    }
});
