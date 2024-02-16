const formRegister = document.querySelector('form');
// console.log(formRegister);

formRegister?.addEventListener('submit', async (event) => {
    event.preventDefault();
    // const formData = new URLSearchParams(new FormData(formRegister));
    // console.log(formData);

    const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        // @ts-ignore
        body: new URLSearchParams(new FormData(formRegister)),
    });

    if (response.status === 201) {
        const { payload: usuario } = await response.json();
        alert(JSON.stringify(usuario));
        window.location.href = '/login';
    } else {
        const error = await response.json();
        alert(error.message);
    }
});
