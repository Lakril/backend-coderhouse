const formResetPwd = document.querySelector('form');

formResetPwd?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await fetch('/api/sessions/resetpassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

        // send the form data by URLSearchParams
        body: new URLSearchParams(new FormData(formResetPwd)),
    });

    if (response.status === 200) {
        alert('Password reset successfully');
        window.location.href = '/login';
    } else {
        const error = await response.json();
        alert(error.message);
    }
});
