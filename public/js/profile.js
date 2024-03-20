// @ts-nocheck
const formLogout = document.querySelector('form');

window.addEventListener('load', async () => {
    // get tocken from headers
    const accessToken = localStorage.getItem('token');
    console.log('here profile', accessToken);
    const response = await fetch('/api/users/current', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    console.log(response);

    if (response.status === 200) {
        // Add your code here
        const { payload: user } = await response.json();
        // console.log(user);

        const profile = document.querySelector('.profile');
        profile.innerHTML = '';
        user.username && (profile.innerHTML += `<p>Username: ${user.username}</p>`);
        user.email && (profile.innerHTML += `<p>Email: ${user.email}</p>`);
        user.name && (profile.innerHTML += `<p>First Name: ${user.name}</p>`);
        user.lastname && (profile.innerHTML += `<p>Last Name: ${user.lastname}</p>`);
        user.role && (profile.innerHTML += `<p>Role: ${user.role}</p>`);

        // for (const key in user) {
        //     profile.innerHTML += `<p>${key}: ${user[key]}</p>`;
        // }
    } else {
        const error = await response.json();
        alert(error.message);
        window.location.href = '/login';
    }
});

// window.addEventListener('DOMContentLoaded', async () => {
//     const response = await fetch('/api/users/current');

//     const data = await response.json();
//     console.log(data);

//     if (response.status === 200) {
//         const profile = document.querySelector('#profile');
//         profile.innerHTML = `<a href="/profile">${data.email}</a>`;
//     } else {
//         const profile = document.querySelector('#profile');
//         profile.innerHTML = `<a href="/login">Login</a>`;
//     }
// });

formLogout?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await fetch('/api/users/current', {
        method: 'DELETE',
    });

    if (response.status === 204) {
        window.location.href = '/login';
    } else {
        const error = await response.json();
        alert(error.message);
    }
});
