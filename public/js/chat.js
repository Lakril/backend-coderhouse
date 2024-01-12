// eslint-disable-next-line
const socketClient = io({});

const form = document.querySelector('form');
const inputMessage = document.querySelector('input');
const ulMessages = document.querySelector('ul');

// eslint-disable-next-line
Swal.fire({
    title: 'Welcome to Chat',
    html: `
        <input id="swal-input1" class="swal2-input" placeholder="Username">
        <input id="swal-input2" class="swal2-input" placeholder="E-mail">
        `,
    showCancelButton: true,
    confirmButtonText: 'Get in',
    allowOutsideClick: false,
    preConfirm: () => {
        const username = document.getElementById('swal-input1').value;
        const email = document.getElementById('swal-input2').value;
        if (!username || !email) {
            // eslint-disable-next-line no-undef
            Swal.showValidationMessage('Please enter username and email');
        }
        return { username, email };
    },
}).then((result) => {
    if (result.isConfirmed) {
        const { username, email } = result.value;
        startChat({ username, email });
    }
});

const startChat = (data) => {
    console.log(data.username, data.email);
    form?.addEventListener('submit', (event) => {
        event.preventDefault();
        const message = inputMessage?.value;
        if (message) {
            socketClient.emit('chat-messages', {
                user: data.username,
                email: data.email,
                message,
            });
            form.reset();
        }
    });
    socketClient.on('chat-messages', (data) => {
        ulMessages.innerHTML = '';
        data.forEach((message) => {
            let date = new Date(message.timestamp);
            // eslint-disable-next-line
            let formattedDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(
                -2
            )}-${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${(
                '0' + date.getMinutes()
            ).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
            ulMessages.innerHTML += `
                        <li>
                            <span>${formattedDate}</span>
                            <strong>${message.user}</strong>:
                            <span>${message.message}</span>
                        </li>`;
        });
    });
    socketClient.on('user-connected', (username) => {
        // eslint-disable-next-line no-undef
        Swal.fire({
            text: `${username} has joined the chat`,
            icon: 'info',
            toast: true,
            position: 'top-right',
        });
    });

    socketClient.on('disconnect', (disconnect) => {
        console.log(disconnect);
        // eslint-disable-next-line no-undef
        Swal.fire({
            text: `${disconnect} has left the chat`,
            icon: 'info',
            toast: true,
            position: 'top-right',
        });
    });
};
