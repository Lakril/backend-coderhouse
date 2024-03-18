const content = document.querySelector('#content');
// console.log(content);

window.addEventListener('load', async function () {
    const accessToken = localStorage.getItem('token');
    console.log('here', accessToken);

    if (!accessToken) {
        alert('no estas logueado!');
        window.location.href = '/register';
    } else {
        // console.log(accessToken)
        const response = await fetch('/api/users/current', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.status === 200) {
            const { payload: user } = await response.json();
            // console.log(JSON.stringify(user));

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
                localStorage.removeItem('token');
                window.location.reload();
            };
            content?.appendChild(aLogout);
        } else {
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
    }
});
