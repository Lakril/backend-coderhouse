const formEdit = document.querySelector('form');
const inputs = document.querySelectorAll('input');

window.addEventListener('load', async () => {
    const response = await fetch('/api/users/current');
    if (response.status === 403) {
        alert('necesitas loguearte para modificar tus datos!');
        return (window.location.href = '/login');
    }

    const result = await response.json();
    const usuario = result.payload;

    inputs[0].value = usuario.username;
    inputs[1].value = usuario.name;
    inputs[2].value = usuario.lastname;
    inputs[3].value = usuario.email;
});

formEdit?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(formEdit);
    // console.log(formData);

    const body = new URLSearchParams(formData);

    const response = await fetch('/api/users/current', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
    });

    if (response.status === 200) {
        window.location.href = '/profile';
    } else {
        const error = await response.json();
        alert(error.message);
    }
});
