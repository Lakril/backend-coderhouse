const formLogin = document.querySelector('form');
console.log(formLogin);

formLogin?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

        // @ts-ignore
        body: new URLSearchParams(new FormData(formLogin)),
    });
    console.log(response);

    if (response.status === 201) {
        const sesion = await response.json();
        alert(JSON.stringify(sesion));
        window.location.href = '/api/products';
    } else {
        const error = await response.json();
        alert(error.message);
    }
});
