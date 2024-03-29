const formRegister = document.querySelector('form');
// console.log(formRegister);

formRegister?.addEventListener('submit', async (event) => {
    event.preventDefault();
    // const formData = new URLSearchParams(new FormData(formRegister));
    // console.log(formData);

    const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'auth-token': this.token,
        },

        body: new URLSearchParams(new FormData(formRegister)),
    });

    console.log(response);
    // 201 - Created
    if (response.status === 201) {
        const { payload: user, token: token } = await response.json();
        console.log(user);
        // console.log(token);
        // it is a good practice to store the token in the local storage
        localStorage.setItem('token', token);
        alert(JSON.stringify(user, null, 2));
        window.location.href = '/';
    } else {
        const error = await response.json();
        console.log(JSON.stringify(error));
        alert(error.message);
    }
});
