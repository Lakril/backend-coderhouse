const formRegister = document.querySelector('form');

formRegister?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(new FormData(formRegister)),
    });

    // 201 - Created
    if (response.status === 201) {
        const { payload: user } = await response.json();
        // console.log('user register.js', user);
        // it is a good practice to store the token in the local storage
        // localStorage.setItem('accessToken', token);
        alert(JSON.stringify(user, null, 2));
        window.location.href = '/profile';
    } else {
        const error = await response.json();
        console.log(JSON.stringify(error));
        alert(error.message);
    }
});
