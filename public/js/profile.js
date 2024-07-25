// @ts-nocheck
const formLogout = document.querySelector('form');

window.addEventListener('load', async () => {
    // get tocken from headers

    const response = await fetch('/api/users/current');
    console.log(response);

    if (response.status === 401) {
        alert('necesitas loguearte para ver esta info!');
        return (window.location.href = '/login');
    }

    // Add your code here
    const { payload: user } = await response.json();
    console.log(`User: ${user}`);

    const profile = document.querySelector('.profile');
    profile.innerHTML = '';
    user.username && (profile.innerHTML += `<p>Username: ${user.username}</p>`);
    user.email && (profile.innerHTML += `<p>Email: ${user.email}</p>`);
    user.name && (profile.innerHTML += `<p>First Name: ${user.name}</p>`);
    user.lastname && (profile.innerHTML += `<p>Last Name: ${user.lastname}</p>`);
    user.age && (profile.innerHTML += `<p>Role: ${user.age}</p>`);
    user.role && (profile.innerHTML += `<p>Role: ${user.role}</p>`);

    // for (const key in user) {
    //     profile.innerHTML += `<p>${key}: ${user[key]}</p>`;
    // }
});

formLogout?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await fetch('/api/sessions/current', {
        method: 'DELETE',
    });

    if (response.status === 200) {
        window.location.href = '/login';
    } else {
        const error = await response.json();
        alert(error.message);
    }
});
