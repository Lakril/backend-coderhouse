const content = document.querySelector('#content');

window.addEventListener('load', async function () {
    const response = await fetch('/api/session/current');
    console.log(response);
    if (response.status === 200) {
        const { payload: user } = await response.json();
        console.log(JSON.stringify(user));
        const pInfo = document.createElement('p');
        pInfo.innerHTML = '';
        pInfo.innerHTML += `username: ${user.username}<br>`;
        pInfo.innerHTML += `name: ${user.name}<br>`;
        pInfo.innerHTML += `lastname: ${user.lastname}<br>`;
        pInfo.innerHTML += `email: ${user.email}<br>`;
        pInfo.innerHTML += `role: ${user.role}<br>`;
        content?.appendChild(pInfo);

        const aLogout = document.createElement('a');
        aLogout.innerHTML = 'logout';
        aLogout.href = '#';
        aLogout.onclick = () => {
            fetch('/api/sessions/current', {
                method: 'DELETE',
            })
                .then((response) => {
                    if (response.status === 204) {
                        window.location.href = '/login';
                    } else {
                        response.json().then((error) => {
                            console.log(error);
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        content?.appendChild(aLogout);
    } else {
        // //             content?.appendChild(aLogout); else {
        const error = await response.json();
        console.log(JSON.stringify(error));

        const pInfo = document.createElement('p');
        pInfo.innerHTML = 'no estas logueado!';
        content?.appendChild(pInfo);

        const aLogin = document.createElement('a');
        aLogin.innerHTML = 'login';
        aLogin.href = '/login';
        content?.appendChild(aLogin);
    }
});
