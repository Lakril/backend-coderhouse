const formLogin = document.querySelector('form');

formLogin?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

        body: new URLSearchParams(new FormData(formLogin)),
    });
    // console.log(new URLSearchParams(new FormData(formLogin)));

    if (response.status === 201) {
        // Created
        const { payload: user } = await response.json();
        console.log(user);
        localStorage.setItem('token', user.token);
        alert(JSON.stringify(user));
        window.location.href = '/';
    } else {
        const error = await response.json();
        // console.log(JSON.stringify(error));
        alert(error.message);
    }
});
